import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function ProductList() {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search products..." className="pl-8" />
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Purchase Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Sample Product</TableCell>
            <TableCell>SKU-123</TableCell>
            <TableCell>10</TableCell>
            <TableCell>R$ 1.000,00</TableCell>
            <TableCell>SN-123456</TableCell>
            <TableCell>2024-03-19</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}