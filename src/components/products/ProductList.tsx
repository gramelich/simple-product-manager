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
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import { useState } from "react";

export function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.serial_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search products..." 
          className="pl-8" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(product.unit_price)}
              </TableCell>
              <TableCell>{product.serial_number}</TableCell>
              <TableCell>{new Date(product.purchase_date).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
          {filteredProducts.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No products found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}