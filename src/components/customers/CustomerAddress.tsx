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

  const fetchAddressByCep = async (cep: string) => {
    const formattedCep = cep.replace(/\D/g, "");
    
    if (formattedCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${formattedCep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          // Create synthetic events for each field
          const createSyntheticEvent = (name: string, value: string): React.ChangeEvent<HTMLInputElement> => ({
            target: {
              name,
              value,
              getAttribute: () => name,
              setAttribute: () => {},
            } as unknown as HTMLInputElement,
            currentTarget: {} as HTMLInputElement,
            nativeEvent: new Event('change'),
            bubbles: true,
            cancelable: true,
            defaultPrevented: false,
            eventPhase: 0,
            isTrusted: true,
            preventDefault: () => {},
            isDefaultPrevented: () => false,
            stopPropagation: () => {},
            isPropagationStopped: () => false,
            persist: () => {},
            timeStamp: Date.now(),
            type: 'change'
          });

          handleInputChange(createSyntheticEvent("address.street", data.logradouro));
          handleInputChange(createSyntheticEvent("address.neighborhood", data.bairro));
          handleInputChange(createSyntheticEvent("address.city", data.localidade));
          handleInputChange(createSyntheticEvent("address.state", data.uf));
          setIsCepValid(true);
        } else {
          setIsCepValid(false);
        }
      } catch (error) {
        setIsCepValid(false);
      }
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleInputChange(e);
    fetchAddressByCep(value);
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
          onChange={handleCepChange}
          required
        />
        {!isCepValid && <p className="text-red-500">CEP inválido. Tente novamente.</p>}
      </div>
    </div>
  );
}