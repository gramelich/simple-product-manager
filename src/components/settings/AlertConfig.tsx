import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface AlertConfig {
  id: string;
  type: string;
  template: string;
  schedule: string;
  enabled: boolean;
  triggerOn: 'created' | 'sold';
}

export function AlertConfig() {
  const [alerts, setAlerts] = useState<AlertConfig[]>([]);
  const [newAlert, setNewAlert] = useState<Omit<AlertConfig, 'id'>>({
    type: '',
    template: '',
    schedule: '',
    enabled: true,
    triggerOn: 'created'
  });
  const { toast } = useToast();

  const handleAddAlert = () => {
    const alert: AlertConfig = {
      ...newAlert,
      id: crypto.randomUUID()
    };
    setAlerts([...alerts, alert]);
    setNewAlert({
      type: '',
      template: '',
      schedule: '',
      enabled: true,
      triggerOn: 'created'
    });
    toast({
      title: "Success",
      description: "Alert configuration added successfully",
    });
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast({
      title: "Success",
      description: "Alert configuration deleted successfully",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alert Configurations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Alert Type</Label>
            <Select
              value={newAlert.type}
              onValueChange={(value) => setNewAlert({ ...newAlert, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select alert type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new_lead">New Lead</SelectItem>
                <SelectItem value="new_sale">New Sale</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Message Template</Label>
            <Input
              value={newAlert.template}
              onChange={(e) => setNewAlert({ ...newAlert, template: e.target.value })}
              placeholder="Use {lead_name}, {date}, {product} as variables"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Schedule (cron format)</Label>
            <Input
              value={newAlert.schedule}
              onChange={(e) => setNewAlert({ ...newAlert, schedule: e.target.value })}
              placeholder="*/15 * * * * (every 15 minutes)"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Trigger On</Label>
            <Select
              value={newAlert.triggerOn}
              onValueChange={(value: 'created' | 'sold') => setNewAlert({ ...newAlert, triggerOn: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select trigger" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created">When Created</SelectItem>
                <SelectItem value="sold">When Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handleAddAlert}>Add Alert Configuration</Button>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id}>
              <CardContent className="pt-6 flex justify-between items-center">
                <div>
                  <p className="font-medium">{alert.type}</p>
                  <p className="text-sm text-muted-foreground">{alert.template}</p>
                  <p className="text-sm text-muted-foreground">Schedule: {alert.schedule}</p>
                </div>
                <div className="space-x-2">
                  <Switch
                    checked={alert.enabled}
                    onCheckedChange={(checked) => {
                      setAlerts(alerts.map(a => 
                        a.id === alert.id ? { ...a, enabled: checked } : a
                      ));
                    }}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteAlert(alert.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}