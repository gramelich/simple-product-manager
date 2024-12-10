import { useState } from "react";
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
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomerSelectProps {
  selectedCustomer: string;
  onSelectCustomer: (customer: string) => void;
}

export function CustomerSelect({ selectedCustomer, onSelectCustomer }: CustomerSelectProps) {
  const [open, setOpen] = useState(false);

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: customerService.getCustomers,
    staleTime: 60000, // Cache por 1 minuto para evitar múltiplas requisições
  });

  return (
    <div className="space-y-2">
      <Label>Cliente</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedCustomer 
              ? customers.find((customer) => customer.id === selectedCustomer)?.name 
              : "Selecione um cliente..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Buscar cliente..." />
            <CommandEmpty>
              {isLoading ? "Carregando..." : "Nenhum cliente encontrado."}
            </CommandEmpty>
            <CommandGroup>
              {customers.map((customer) => (
                <CommandItem
                  key={customer.id}
                  value={customer.id}
                  onSelect={() => {
                    onSelectCustomer(customer.id); // Salva o ID do cliente
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCustomer === customer.id ? "opacity-100" : "opacity-0"
                    )}
                  />
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
