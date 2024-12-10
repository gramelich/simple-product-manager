import { supabase } from "@/integrations/supabase/client";
import type { Customer, CustomerInput } from "@/types/customer.types";
import type { CustomerAddress } from "@/types/customer.types";
import type { DatabaseCustomer } from "@/integrations/supabase/database.types";

const isValidAddress = (address: unknown): address is CustomerAddress => {
  if (!address || typeof address !== 'object') return false;
  const a = address as Partial<CustomerAddress>;
  return typeof a.street === 'string' &&
         typeof a.number === 'string' &&
         typeof a.neighborhood === 'string' &&
         typeof a.city === 'string' &&
         typeof a.state === 'string' &&
         typeof a.zipCode === 'string';
};

const mapDatabaseCustomerToCustomer = (dbCustomer: DatabaseCustomer): Customer => ({
  id: dbCustomer.id,
  created_at: dbCustomer.created_at,
  updated_at: dbCustomer.updated_at,
  name: dbCustomer.name,
  email: dbCustomer.email,
  phone: dbCustomer.phone,
  address: isValidAddress(dbCustomer.address) ? dbCustomer.address : null
});

export const customerService = {
  getCustomers: async (): Promise<Customer[]> => {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('name');

    if (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }

    return (data as DatabaseCustomer[]).map(mapDatabaseCustomerToCustomer);
  },

  createCustomer: async (customer: CustomerInput): Promise<Customer> => {
    const { data, error } = await supabase
      .from('customers')
      .insert([{
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address
      }])
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }

    return mapDatabaseCustomerToCustomer(data as DatabaseCustomer);
  },

  updateCustomer: async (id: string, customer: Partial<CustomerInput>): Promise<Customer> => {
    const { data, error } = await supabase
      .from('customers')
      .update({
        ...customer,
        address: customer.address
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw error;
    }

    return mapDatabaseCustomerToCustomer(data as DatabaseCustomer);
  }
};