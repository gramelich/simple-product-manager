export type Customer = {
  id: string;
  created_at: string;
  name: string;
  email: string | null;
  phone: string | null;
  tenant_id: string | null;
  updated_at: string;
}

export type Tables = {
  customers: Customer;
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          tenant_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          tenant_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          tenant_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          }
        ]
      }
      payment_methods: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          tenant_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          tenant_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          tenant_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_methods_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          category: string
          created_at: string
          description: string | null
          dollar_rate: number | null
          engine_number: string | null
          id: string
          is_available: boolean | null
          name: string
          purchase_date: string
          serial_number: string | null
          sku: string
          stock: number
          tenant_id: string | null
          unit_price: number
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          dollar_rate?: number | null
          engine_number?: string | null
          id?: string
          is_available?: boolean | null
          name: string
          purchase_date: string
          serial_number?: string | null
          sku: string
          stock?: number
          tenant_id?: string | null
          unit_price: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          dollar_rate?: number | null
          engine_number?: string | null
          id?: string
          is_available?: boolean | null
          name?: string
          purchase_date?: string
          serial_number?: string | null
          sku?: string
          stock?: number
          tenant_id?: string | null
          unit_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          }
        ]
      }
      sales: {
        Row: {
          created_at: string
          customer: string
          id: string
          price: number
          product_id: string | null
          quantity: number
          sale_date: string
          tenant_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer: string
          id?: string
          price: number
          product_id?: string | null
          quantity: number
          sale_date?: string
          tenant_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer?: string
          id?: string
          price?: number
          product_id?: string | null
          quantity?: number
          sale_date?: string
          tenant_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          }
        ]
      }
      settings: {
        Row: {
          created_at: string
          description: string | null
          id: number
          key: string
          tenant_id: string | null
          updated_at: string
          value: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          key: string
          tenant_id?: string | null
          updated_at?: string
          value?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          key?: string
          tenant_id?: string | null
          updated_at?: string
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "settings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          }
        ]
      }
      tenant_users: {
        Row: {
          created_at: string
          id: string
          role: string
          tenant_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          role: string
          tenant_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          tenant_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenant_users_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          }
        ]
      }
      tenants: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
          primary_color: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          primary_color?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          primary_color?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          actual_amount: number | null
          amount: number
          barcode: string | null
          category: string
          created_at: string
          description: string
          due_date: string
          id: number
          invoice_number: string | null
          payment_date: string | null
          payment_method: string | null
          status: string
          supplier: string
          tenant_id: string | null
          type: string
          unit: string
          updated_at: string
        }
        Insert: {
          actual_amount?: number | null
          amount: number
          barcode?: string | null
          category: string
          created_at?: string
          description: string
          due_date: string
          id?: number
          invoice_number?: string | null
          payment_date?: string | null
          payment_method?: string | null
          status: string
          supplier: string
          tenant_id?: string | null
          type: string
          unit: string
          updated_at?: string
        }
        Update: {
          actual_amount?: number | null
          amount?: number
          barcode?: string | null
          category?: string
          created_at?: string
          description?: string
          due_date?: string
          id?: number
          invoice_number?: string | null
          payment_date?: string | null
          payment_method?: string | null
          status?: string
          supplier?: string
          tenant_id?: string | null
          type?: string
          unit?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_tenant_with_user: {
        Args: {
          p_name: string
          p_slug: string
          p_user_id: string
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
