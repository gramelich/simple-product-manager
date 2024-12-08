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
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  );
}