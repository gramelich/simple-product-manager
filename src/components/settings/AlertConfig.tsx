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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";
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
      title: "Sucesso",
      description: "Configuração de alerta adicionada com sucesso",
    });
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast({
      title: "Sucesso",
      description: "Configuração de alerta removida com sucesso",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Alertas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo de Alerta</Label>
            <Select
              value={newAlert.type}
              onValueChange={(value) => setNewAlert({ ...newAlert, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de alerta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new_lead">Novo Lead</SelectItem>
                <SelectItem value="new_sale">Nova Venda</SelectItem>
                <SelectItem value="low_stock">Estoque Baixo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label>Modelo da Mensagem</Label>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">Variáveis Disponíveis:</h4>
                    <ul className="text-sm space-y-1">
                      <li><code>{"{nome_lead}"}</code> - Nome do lead/cliente</li>
                      <li><code>{"{data}"}</code> - Data do evento</li>
                      <li><code>{"{produto}"}</code> - Nome do produto</li>
                      <li><code>{"{quantidade}"}</code> - Quantidade vendida/disponível</li>
                      <li><code>{"{valor}"}</code> - Valor da venda</li>
                    </ul>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            <Input
              value={newAlert.template}
              onChange={(e) => setNewAlert({ ...newAlert, template: e.target.value })}
              placeholder="Ex: Novo lead: {nome_lead} - Produto: {produto}"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Agendamento (formato cron)</Label>
            <Input
              value={newAlert.schedule}
              onChange={(e) => setNewAlert({ ...newAlert, schedule: e.target.value })}
              placeholder="*/15 * * * * (a cada 15 minutos)"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Disparar Quando</Label>
            <Select
              value={newAlert.triggerOn}
              onValueChange={(value: 'created' | 'sold') => setNewAlert({ ...newAlert, triggerOn: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o gatilho" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created">Quando Criado</SelectItem>
                <SelectItem value="sold">Quando Vendido</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handleAddAlert}>Adicionar Configuração de Alerta</Button>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id}>
              <CardContent className="pt-6 flex justify-between items-center">
                <div>
                  <p className="font-medium">{alert.type}</p>
                  <p className="text-sm text-muted-foreground">{alert.template}</p>
                  <p className="text-sm text-muted-foreground">Agendamento: {alert.schedule}</p>
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
                    Excluir
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