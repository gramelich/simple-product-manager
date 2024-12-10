import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

export type Sale = Database["public"]["Tables"]["sales"]["Row"];
export type Customer = Database["public"]["Tables"]["customers"]["Row"];

export const salesService = {
  getSales: async (): Promise<Sale[]> => {
    const { data, error } = await supabase
      .from("sales")
      .select("*, product:products(name)")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  getCustomers: async (): Promise<Customer[]> => {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("name");

    if (error) throw error;
    return data;
  },

  createSale: async (sale: {
    product_id: string;
    quantity: number;
    price: number;
    customer_id: string;
    payment_methods: Array<{ method: string; amount: number }>;
    tenant_id: string;
  }): Promise<Sale> => {
    const { data, error } = await supabase
      .from("sales")
      .insert([sale])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};