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
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/productService";
import { salesService } from "@/services/salesService";
import { X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface SaleFormProps {
  onClose: () => void;
}

export function SaleForm({ onClose }: SaleFormProps) {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [customer, setCustomer] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [downPayment, setDownPayment] = useState<string>(""); // Entrada
  const [installments, setInstallments] = useState<string>(""); // Número de parcelas
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { tenant } = useAuth();

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });

  const { data: customers = [] } = useQuery({
    queryKey: ['customers'],
    queryFn: salesService.getCustomers, // Supondo que você tenha um serviço para pegar os clientes
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
    const selectedCustomer = customers.find(c => c.id === customer);

    // Verificando se todos os dados estão presentes
    if (!product || !tenant?.id || !selectedCustomer || !paymentMethod || !downPayment || !installments) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const totalPrice = product.unit_price * Number(quantity);
    const downPaymentValue = Number(downPayment);
    const remainingValue = totalPrice - downPaymentValue;
    const installmentValue = remainingValue / Number(installments);

    // Validar se o valor da entrada não é maior que o valor total
    if (downPaymentValue > totalPrice) {
      toast({
        title: "Erro",
        description: "O valor da entrada não pode ser maior que o valor total.",
        variant: "destructive",
      });
      return;
    }

    // Enviando a mutação com os dados corretos
    createSaleMutation.mutate({
      product_id: selectedProduct,
      quantity: Number(quantity),
      price: product.unit_price,
      customer_id: selectedCustomer.id,
      payment_method: paymentMethod,
      down_payment: downPaymentValue,
      remaining_value: remainingValue,
      installments: Number(installments),
      installment_value: installmentValue,
      tenant_id: tenant.id
    });
  };

  return (
    <Card className="w-full md:max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Nova Venda</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Produto</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um produto" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} (Estoque: {product.stock})
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
            <Select value={customer} onValueChange={setCustomer}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um cliente" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((cust) => (
                  <SelectItem key={cust.id} value={cust.id}>
                    {cust.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Forma de Pagamento</Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a forma de pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Dinheiro</SelectItem>
                <SelectItem value="credit_card">Cartão de Crédito</SelectItem>
                <SelectItem value="bank_transfer">Transferência Bancária</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Entrada</Label>
            <Input
              type="number"
              min="0"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="Valor da entrada"
            />
          </div>

          <div className="space-y-2">
            <Label>Parcelas</Label>
            <Input
              type="number"
              min="1"
              value={installments}
              onChange={(e) => setInstallments(e.target.value)}
              placeholder="Número de parcelas"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose} type="button">
              Cancelar
            </Button>
            <Button type="submit" disabled={createSaleMutation.isLoading}>
              {createSaleMutation.isLoading ? "Salvando..." : "Registrar Venda"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
