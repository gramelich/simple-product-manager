import { supabase } from "@/integrations/supabase/client";
import type { Customer, CustomerInput } from "@/types/customer.types";
import type { CustomerAddress } from "@/types/customer.types";

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

    return (data || []).map(customer => ({
      id: customer.id,
      created_at: customer.created_at,
      updated_at: customer.updated_at,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address as CustomerAddress | null
    }));
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

    return {
      id: data.id,
      created_at: data.created_at,
      updated_at: data.updated_at,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address as CustomerAddress | null
    };
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

    return {
      id: data.id,
      created_at: data.created_at,
      updated_at: data.updated_at,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address as CustomerAddress | null
    };
  }
};