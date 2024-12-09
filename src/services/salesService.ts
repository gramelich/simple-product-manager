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

  createSale: async (sale: Omit<Sale, "id" | "created_at" | "updated_at" | "sale_date">): Promise<Sale> => {
    const { data, error } = await supabase
      .from("sales")
      .insert([sale])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};