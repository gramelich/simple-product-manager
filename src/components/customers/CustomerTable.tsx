import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  category: string;
  address: {
    city: string;
    state: string;
  };
}

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customerId: number) => void;
}

export function CustomerTable({
  customers,
  onEdit,
  onDelete,
}: CustomerTableProps) {
  return (
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
        {customers.map((customer) => (
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
                  onClick={() => onEdit(customer)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(customer.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
        {customers.length === 0 && (
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
  );
}