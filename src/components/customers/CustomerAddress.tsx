import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CustomerAddressProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CustomerAddress({
  formData,
  handleInputChange,
}: CustomerAddressProps) {
  const [isCepValid, setIsCepValid] = useState(true);

  // Função para buscar o endereço com base no CEP
  const fetchAddressByCep = async (cep: string) => {
    // Remover qualquer formatação do CEP (ex: 12345-678 -> 12345678)
    const formattedCep = cep.replace(/\D/g, "");
    
    if (formattedCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${formattedCep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          // Preencher os campos com os dados do endereço
          handleInputChange({
            target: { name: "address.street", value: data.logradouro },
          });
          handleInputChange({
            target: { name: "address.neighborhood", value: data.bairro },
          });
          handleInputChange({
            target: { name: "address.city", value: data.localidade },
          });
          handleInputChange({
            target: { name: "address.state", value: data.uf },
          });
          setIsCepValid(true);
        } else {
          setIsCepValid(false);
        }
      } catch (error) {
        setIsCepValid(false);
      }
    }
  };

  // Função para tratar a mudança no campo de CEP
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleInputChange(e); // Atualiza o valor no formulário
    fetchAddressByCep(value); // Chama a função de busca do endereço
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="address.street">Rua *</Label>
        <Input
          id="address.street"
          name="address.street"
          value={formData.address.street}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address.number">Número *</Label>
        <Input
          id="address.number"
          name="address.number"
          value={formData.address.number}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address.complement">Complemento</Label>
        <Input
          id="address.complement"
          name="address.complement"
          value={formData.address.complement}
          onChange={handleInputChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address.neighborhood">Bairro *</Label>
        <Input
          id="address.neighborhood"
          name="address.neighborhood"
          value={formData.address.neighborhood}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address.city">Cidade *</Label>
        <Input
          id="address.city"
          name="address.city"
          value={formData.address.city}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address.state">Estado *</Label>
        <Input
          id="address.state"
          name="address.state"
          value={formData.address.state}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address.zipCode">CEP *</Label>
        <Input
          id="address.zipCode"
          name="address.zipCode"
          value={formData.address.zipCode}
          onChange={handleCepChange} // Modificado para chamar a função de busca
          required
        />
        {!isCepValid && <p className="text-red-500">CEP inválido. Tente novamente.</p>} {/* Mensagem de erro */}
      </div>
    </div>
  );
}
