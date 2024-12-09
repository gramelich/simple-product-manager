import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, DollarSign, Target } from "lucide-react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export function DashboardMetrics() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(1)),
    to: new Date(),
  });

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <DatePickerWithRange date={date} setDate={handleDateChange} />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">+20% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.234</div>
            <p className="text-xs text-muted-foreground">+15% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 45.231</div>
            <p className="text-xs text-muted-foreground">+25% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Ativos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+10% em relação ao mês anterior</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}