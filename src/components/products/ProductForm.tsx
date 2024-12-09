import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/productService";

interface ProductFormProps {
  onClose: () => void;
}

export function ProductForm({ onClose }: ProductFormProps) {
  const { toast } = useToast();
  const [isAvailable, setIsAvailable] = useState(true);
  const queryClient = useQueryClient();

  const createProductMutation = useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Success",
        description: "Product saved successfully",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save product",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    createProductMutation.mutate({
      name: formData.get('name') as string,
      sku: formData.get('sku') as string,
      stock: Number(formData.get('stock')),
      unit_price: Number(formData.get('price')),
      serial_number: formData.get('serialNumber') as string,
      engine_number: formData.get('engineNumber') as string,
      purchase_date: formData.get('purchaseDate') as string,
      dollar_rate: Number(formData.get('dollarRate')),
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      is_available: isAvailable,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>New Product</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" placeholder="Enter product name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" name="sku" placeholder="Enter SKU code" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Unit Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Current Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                placeholder="0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input id="serialNumber" name="serialNumber" placeholder="Enter serial number" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="engineNumber">Engine Number</Label>
              <Input id="engineNumber" name="engineNumber" placeholder="Enter engine number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Purchase Date</Label>
              <Input id="purchaseDate" name="purchaseDate" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dollarRate">Dollar Rate at Purchase</Label>
              <Input
                id="dollarRate"
                name="dollarRate"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="forklifts">Forklifts</SelectItem>
                  <SelectItem value="parts">Parts</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Available for Sale</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  name="status"
                  checked={isAvailable}
                  onCheckedChange={setIsAvailable}
                />
                <Label htmlFor="status">
                  {isAvailable ? "Yes" : "No"}
                </Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter product description"
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={createProductMutation.isPending}>
              {createProductMutation.isPending ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}