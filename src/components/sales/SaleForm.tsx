import { useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import { salesService } from "@/services/salesService";
import { customerService } from "@/services/customerService";
import { X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { PaymentMethodForm } from "./PaymentMethodForm";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PaymentMethod {
  method: string;
  amount: number;
}

interface SaleFormProps {
  onClose: () => void;
}

export function SaleForm({ onClose }: SaleFormProps) {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [customerSearchOpen, setCustomerSearchOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [searchCustomer, setSearchCustomer] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { tenant } = useAuth();

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });

  const { data: customers = [] } = useQuery({
    queryKey: ['customers'],
    queryFn: customerService.getCustomers,
  });

  const createSaleMutation = useMutation({
    mutationFn: salesService.createSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      toast({
        title: "Sucesso",
        description: "Venda registrada com sucesso",
      });
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = products.find(p => p.id === selectedProduct);

    if (!product || !tenant?.id || !selectedCustomer || paymentMethods.length === 0) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const totalPrice = product.unit_price * Number(quantity);
    const totalPaid = paymentMethods.reduce((sum, payment) => sum + payment.amount, 0);

    if (totalPaid !== totalPrice) {
      toast({
        title: "Erro",
        description: "O valor total pago deve ser igual ao valor do produto.",
        variant: "destructive",
      });
      return;
    }

    createSaleMutation.mutate({
      product_id: selectedProduct,
      quantity: Number(quantity),
      price: product.unit_price,
      customer: selectedCustomer,
      tenant_id: tenant.id,
      payment_methods: paymentMethods
    });
  };

  const selectedProductData = products.find(p => p.id === selectedProduct);
  const totalPrice = selectedProductData ? selectedProductData.unit_price * Number(quantity) : 0;

  return (
    <Card className="w-full md:max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Nova Venda</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Produto</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um produto" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} (Estoque: {product.stock}) - {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(product.unit_price)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Quantidade</Label>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Cliente</Label>
            <Popover open={customerSearchOpen} onOpenChange={setCustomerSearchOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={customerSearchOpen}
                  className="w-full justify-between"
                >
                  {selectedCustomer
                    ? customers.find((customer) => customer.name === selectedCustomer)?.name
                    : "Selecione um cliente..."}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Buscar cliente..." />
                  <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                  <CommandGroup>
                    {customers.map((customer) => (
                      <CommandItem
                        key={customer.id}
                        onSelect={() => {
                          setSelectedCustomer(customer.name);
                          setCustomerSearchOpen(false);
                        }}
                      >
                        {customer.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {selectedProduct && quantity && Number(quantity) > 0 && (
            <PaymentMethodForm
              paymentMethods={paymentMethods}
              onAddPayment={(payment) => setPaymentMethods([...paymentMethods, payment])}
              totalPrice={totalPrice}
            />
          )}

          <div className="flex justify-between items-center pt-4 border-t">
            <div>
              <span className="text-sm text-muted-foreground">Total:</span>
              <span className="ml-2 text-lg font-bold">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(totalPrice)}
              </span>
            </div>
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={
                  createSaleMutation.isPending || 
                  !selectedProduct || 
                  !quantity || 
                  !selectedCustomer || 
                  paymentMethods.reduce((sum, p) => sum + p.amount, 0) !== totalPrice
                }
              >
                {createSaleMutation.isPending ? "Salvando..." : "Registrar Venda"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}