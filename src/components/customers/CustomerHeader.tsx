import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Filter } from "lucide-react";

interface CustomerHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
  onNewCustomerClick: () => void;
}

export function CustomerHeader({
  searchTerm,
  onSearchChange,
  onFilterClick,
  onNewCustomerClick,
}: CustomerHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h1 className="text-3xl font-bold">Clientes</h1>
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar clientes..." 
            className="pl-8 w-full md:w-[300px]" 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onFilterClick}
        >
          <Filter className="h-4 w-4" />
        </Button>
        <Button onClick={onNewCustomerClick}>
          <UserPlus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>
    </div>
  );
}