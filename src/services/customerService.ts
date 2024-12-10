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

    return data || [];
  },

  createCustomer: async (customer: CustomerInput): Promise<Customer> => {
    const { data, error } = await supabase
      .from('customers')
      .insert([customer])
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar cliente:', error);
      throw error;
    }

    return data;
  },

  updateCustomer: async (id: string, customer: Partial<CustomerInput>): Promise<Customer> => {
    const { data, error } = await supabase
      .from('customers')
      .update(customer)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw error;
    }

    return data;
  }
};