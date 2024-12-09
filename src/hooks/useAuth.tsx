import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Tenant {
  id: string;
  name: string;
  slug: string;
}

interface User {
  id: string;
  email: string;
}

export function useAuth() {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserAndTenant = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      if (currentUser) {
        const { data: tenantUsers } = await supabase
          .from('tenant_users')
          .select('tenant:tenants(*)')
          .eq('user_id', currentUser.id)
          .single();

        if (tenantUsers?.tenant) {
          setTenant(tenantUsers.tenant as Tenant);
        }
        
        setUser({
          id: currentUser.id,
          email: currentUser.email || '',
        });
      }
    };

    fetchUserAndTenant();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async () => {
      await fetchUserAndTenant();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, tenant };
}