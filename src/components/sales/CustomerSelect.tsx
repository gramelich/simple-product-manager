import { useQuery } from "@tanstack/react-query";
import { customerService } from "@/services/customerService";
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface CustomerSelectProps {
  selectedCustomer: string;
  onSelectCustomer: (customer: string) => void;
}

export function CustomerSelect({ selectedCustomer, onSelectCustomer }: CustomerSelectProps) {
  const [customerSearchOpen, setCustomerSearchOpen] = useState(false);

  const { data: customers = [] } = useQuery({
    queryKey: ['customers'],
    queryFn: customerService.getCustomers,
  });

  return (
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
            {selectedCustomer || "Selecione um cliente..."}
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
                    onSelectCustomer(customer.name);
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
  );
}