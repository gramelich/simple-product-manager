export interface CustomerAddress {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Customer {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: CustomerAddress | null;
}

export type CustomerInput = Omit<Customer, 'id' | 'created_at' | 'updated_at'>;