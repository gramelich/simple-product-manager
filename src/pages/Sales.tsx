import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useQuery } from "@tanstack/react-query";
import { salesService } from "@/services/salesService";
import { SaleForm } from "@/components/sales/SaleForm";
import { ShoppingCart, Plus, Search, Menu } from "lucide-react";
import { format } from "date-fns";

export default function Sales() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(1)), // First day of current month
    to: new Date(),
  });

  const { data: sales = [] } = useQuery({
    queryKey: ['sales'],
    queryFn: salesService.getSales,
  });

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const saleDate = new Date(sale.sale_date);
    const isInDateRange = saleDate >= dateRange.from && saleDate <= dateRange.to;
    return matchesSearch && isInDateRange;
  });

  const totalSales = filteredSales.reduce((acc, sale) => acc + Number(sale.price) * sale.quantity, 0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <SidebarTrigger className="md:hidden">
                  <Menu className="h-6 w-6" />
                </SidebarTrigger>
                <h1 className="text-3xl font-bold">Vendas</h1>
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <DateRangePicker
                  value={dateRange}
                  onChange={(newRange) => {
                    if (newRange?.from && newRange?.to) {
                      setDateRange({ from: newRange.from, to: newRange.to });
                    }
                  }}
                />
                <div className="relative flex-1 md:flex-none">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar vendas..." 
                    className="pl-8 w-full md:w-[300px]" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button onClick={() => setIsDialogOpen(true)} className="whitespace-nowrap">
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Venda
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Vendas do Período
                  </CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(totalSales)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {format(dateRange.from, 'dd/MM/yyyy')} até {format(dateRange.to, 'dd/MM/yyyy')}
                  </p>
                </CardContent>
              </Card>
            </div>

            {isDialogOpen && <SaleForm onClose={() => setIsDialogOpen(false)} />}

            <Card>
              <CardHeader>
                <CardTitle>Últimas Vendas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2">Data</th>
                        <th className="px-4 py-2">Cliente</th>
                        <th className="px-4 py-2">Produto</th>
                        <th className="px-4 py-2">Quantidade</th>
                        <th className="px-4 py-2">Valor Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSales.map((sale) => (
                        <tr key={sale.id} className="border-b">
                          <td className="px-4 py-2">
                            {format(new Date(sale.sale_date), 'dd/MM/yyyy HH:mm')}
                          </td>
                          <td className="px-4 py-2">{sale.customer}</td>
                          <td className="px-4 py-2">{(sale.product as any)?.name}</td>
                          <td className="px-4 py-2">{sale.quantity}</td>
                          <td className="px-4 py-2">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(Number(sale.price) * sale.quantity)}
                          </td>
                        </tr>
                      ))}
                      {filteredSales.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                            Nenhuma venda encontrada
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}