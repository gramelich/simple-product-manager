import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, UserCheck } from "lucide-react";

const customers = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    status: "Ativo",
    lastPurchase: "2024-02-15",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "(11) 98888-8888",
    status: "Ativo",
    lastPurchase: "2024-02-10",
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    phone: "(11) 97777-7777",
    status: "Inativo",
    lastPurchase: "2024-01-20",
  },
];

export default function Customers() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-3xl font-bold">Clientes</h1>
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar clientes..." className="pl-8 w-full md:w-[300px]" />
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="hidden md:table-cell">Telefone</TableHead>
                      <TableHead className="hidden md:table-cell">Status</TableHead>
                      <TableHead className="hidden md:table-cell">Última Compra</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell className="hidden md:table-cell">{customer.phone}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center">
                            <UserCheck className="mr-2 h-4 w-4 text-green-500" />
                            {customer.status}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {new Date(customer.lastPurchase).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}