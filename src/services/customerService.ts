import { supabase } from "@/integrations/supabase/client";
import type { Customer, CustomerInput } from "@/types/customer.types";

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
      ...customer,
      address: customer.address || null
    })) as Customer[];
  },

  createCustomer: async (customer: CustomerInput): Promise<Customer> => {
    const { data, error } = await supabase
      .from('customers')
      .insert([{
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address || null
      }])
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }

    return {
      ...data,
      address: data.address || null
    } as Customer;
  },

  updateCustomer: async (id: string, customer: Partial<CustomerInput>): Promise<Customer> => {
    const { data, error } = await supabase
      .from('customers')
      .update({
        ...customer,
        address: customer.address || null
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw error;
    }

    return {
      ...data,
      address: data.address || null
    } as Customer;
  }
};