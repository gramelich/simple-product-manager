import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CustomerBasicInfo } from "./CustomerBasicInfo";
import { CustomerAddress } from "./CustomerAddress";
import { customerService } from "@/services/customerService";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: any | null;
  onSave?: (customer: any) => void;
}

export function CustomerDialog({ 
  open, 
  onOpenChange, 
  customer, 
  onSave 
}: CustomerDialogProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(customer || {
    name: "",
    email: "",
    phone: "",
    category: "Regular",
    address: {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: ""
    }
  });

  const createCustomerMutation = useMutation({
    mutationFn: async (data: any) => {
      return customerService.createCustomer(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({
        title: "Sucesso",
        description: "Cliente cadastrado com sucesso",
      });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCustomerMutation.mutateAsync(formData);
      if (onSave) onSave(formData);
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {customer ? "Editar Cliente" : "Novo Cliente"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <CustomerBasicInfo 
            formData={formData}
            handleInputChange={handleInputChange}
            setFormData={setFormData}
          />
          
          <CustomerAddress 
            formData={formData}
            handleInputChange={handleInputChange}
          />

          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              disabled={createCustomerMutation.isPending}
            >
              {createCustomerMutation.isPending 
                ? "Salvando..." 
                : customer ? "Salvar Alterações" : "Cadastrar Cliente"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}