import { useState } from "react";
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
import { Search, UserPlus, Edit, Trash, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerDialog } from "@/components/customers/CustomerDialog";
import { CustomerFilter } from "@/components/customers/CustomerFilter";
import { useToast } from "@/components/ui/use-toast";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  category: "Regular" | "VIP";
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-9999",
    category: "Regular",
    address: {
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 45",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567"
    }
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "(11) 98888-8888",
    category: "VIP",
    address: {
      street: "Avenida Brasil",
      number: "456",
      complement: "",
      neighborhood: "Jardim",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-568"
    }
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    phone: "(11) 97777-7777",
    category: "Regular",
    address: {
      street: "Rua das Palmeiras",
      number: "789",
      complement: "Casa 1",
      neighborhood: "Vila Nova",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-569"
    }
  },
];

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const { toast } = useToast();

  const handleDelete = (customerId: number) => {
    setCustomers(customers.filter(customer => customer.id !== customerId));
    toast({
      title: "Cliente removido",
      description: "O cliente foi removido com sucesso.",
    });
  };

  const handleEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDialogOpen(true);
  };

  const handleSave = (customer: Customer) => {
    if (selectedCustomer) {
      setCustomers(customers.map(c => c.id === customer.id ? customer : c));
    } else {
      setCustomers([...customers, { ...customer, id: customers.length + 1 }]);
    }
    setIsDialogOpen(false);
    setSelectedCustomer(null);
    toast({
      title: selectedCustomer ? "Cliente atualizado" : "Cliente cadastrado",
      description: selectedCustomer 
        ? "As informações do cliente foram atualizadas com sucesso."
        : "O novo cliente foi cadastrado com sucesso.",
    });
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-8">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-3xl font-bold">Clientes</h1>
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Buscar clientes..." 
                    className="pl-8 w-full md:w-[300px]" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFilterOpen(true)}
                >
                  <Filter className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => {
                    setSelectedCustomer(null);
                    setIsDialogOpen(true);
                  }}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Novo Cliente
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead className="hidden md:table-cell">Email</TableHead>
                      <TableHead className="hidden md:table-cell">Telefone</TableHead>
                      <TableHead className="hidden md:table-cell">Categoria</TableHead>
                      <TableHead className="hidden md:table-cell">Cidade/Estado</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell className="hidden md:table-cell">{customer.email}</TableCell>
                        <TableCell className="hidden md:table-cell">{customer.phone}</TableCell>
                        <TableCell className="hidden md:table-cell">{customer.category}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {customer.address.city}/{customer.address.state}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(customer)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(customer.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredCustomers.length === 0 && (
                      <TableRow>
                        <TableCell 
                          colSpan={6} 
                          className="text-center py-8 text-muted-foreground"
                        >
                          Nenhum cliente encontrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <CustomerDialog 
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            customer={selectedCustomer}
            onSave={handleSave}
          />

          <CustomerFilter
            open={isFilterOpen}
            onOpenChange={setIsFilterOpen}
          />
        </main>
      </div>
    </SidebarProvider>
  );
}
