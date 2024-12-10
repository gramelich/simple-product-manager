import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

export type Sale = Database["public"]["Tables"]["sales"]["Row"];

export const salesService = {
  getSales: async (): Promise<Sale[]> => {
    const { data, error } = await supabase
      .from("sales")
      .select("*, product:products(name)")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  createSale: async (sale: {
    product_id: string;
    quantity: number;
    price: number;
    customer: string;
    tenant_id: string;
  }): Promise<Sale> => {
    const { data, error } = await supabase
      .from("sales")
      .insert([{
        product_id: sale.product_id,
        quantity: sale.quantity,
        price: sale.price,
        customer: sale.customer,
        tenant_id: sale.tenant_id,
        sale_date: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};