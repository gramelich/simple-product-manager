import { supabase } from "@/integrations/supabase/client";

export const customerService = {
  getCustomers: async () => {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("name");

    if (error) throw error;
    return data;
  },
};