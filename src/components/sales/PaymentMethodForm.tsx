import { useState } from "react";
import { Button } from "@/components/ui/button";
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

interface PaymentMethod {
  method: string;
  amount: number;
}

interface PaymentMethodFormProps {
  paymentMethods: PaymentMethod[];
  onAddPayment: (payment: PaymentMethod) => void;
  totalPrice: number;
}

export function PaymentMethodForm({ 
  paymentMethods, 
  onAddPayment,
  totalPrice 
}: PaymentMethodFormProps) {
  const [newPaymentMethod, setNewPaymentMethod] = useState("");
  const [newPaymentAmount, setNewPaymentAmount] = useState("");
  const { toast } = useToast();

  const handleAddPayment = () => {
    if (!newPaymentMethod || !newPaymentAmount || Number(newPaymentAmount) <= 0) {
      toast({
        title: "Erro",
        description: "Selecione uma forma de pagamento válida e insira um valor válido.",
        variant: "destructive",
      });
      return;
    }

    const totalPaid = paymentMethods.reduce((sum, payment) => sum + payment.amount, 0);
    if (totalPaid + Number(newPaymentAmount) > totalPrice) {
      toast({
        title: "Erro",
        description: "O valor total pago não pode ultrapassar o valor do produto.",
        variant: "destructive",
      });
      return;
    }

    onAddPayment({
      method: newPaymentMethod,
      amount: Number(newPaymentAmount)
    });
    
    setNewPaymentMethod("");
    setNewPaymentAmount("");
  };

  const remainingAmount = totalPrice - paymentMethods.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Forma de Pagamento</Label>
        <Select value={newPaymentMethod} onValueChange={setNewPaymentMethod}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a forma de pagamento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cash">Dinheiro</SelectItem>
            <SelectItem value="credit_card">Cartão de Crédito</SelectItem>
            <SelectItem value="debit_card">Cartão de Débito</SelectItem>
            <SelectItem value="pix">PIX</SelectItem>
            <SelectItem value="bank_transfer">Transferência Bancária</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Valor (Restante: {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(remainingAmount)})</Label>
        <Input
          type="number"
          min="0"
          step="0.01"
          value={newPaymentAmount}
          onChange={(e) => setNewPaymentAmount(e.target.value)}
          placeholder="Valor do pagamento"
        />
      </div>

      <Button 
        type="button" 
        variant="outline" 
        onClick={handleAddPayment}
        className="w-full"
      >
        Adicionar Pagamento
      </Button>

      <div className="mt-4 space-y-2">
        <Label>Pagamentos Registrados</Label>
        <ul className="space-y-2">
          {paymentMethods.map((payment, index) => (
            <li key={index} className="flex justify-between items-center bg-secondary/20 p-2 rounded">
              <span>{payment.method === 'cash' ? 'Dinheiro' : 
                     payment.method === 'credit_card' ? 'Cartão de Crédito' :
                     payment.method === 'debit_card' ? 'Cartão de Débito' :
                     payment.method === 'pix' ? 'PIX' : 'Transferência Bancária'}</span>
              <span>{new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(payment.amount)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}