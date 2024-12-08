import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { CustomerDialog } from "@/components/customers/CustomerDialog";
import { CustomerFilter } from "@/components/customers/CustomerFilter";
import { CustomerHeader } from "@/components/customers/CustomerHeader";
import { CustomerTable } from "@/components/customers/CustomerTable";
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
            <CustomerHeader 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onFilterClick={() => setIsFilterOpen(true)}
              onNewCustomerClick={() => {
                setSelectedCustomer(null);
                setIsDialogOpen(true);
              }}
            />

            <Card>
              <CardContent className="p-0">
                <CustomerTable 
                  customers={filteredCustomers}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
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
