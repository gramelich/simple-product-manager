import { productService } from "./productService";

export interface Sale {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  customer: string;
  date: string;
}

const SALES_KEY = 'sales';

export const salesService = {
  getSales: async (): Promise<Sale[]> => {
    const sales = localStorage.getItem(SALES_KEY);
    return sales ? JSON.parse(sales) : [];
  },

  createSale: async (sale: Omit<Sale, 'id' | 'date'>): Promise<Sale> => {
    // Get current products
    const products = await productService.getProducts();
    const product = products.find(p => p.id === sale.productId);
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    if (product.stock < sale.quantity) {
      throw new Error('Insufficient stock');
    }
    
    // Update product stock
    const updatedProducts = products.map(p => 
      p.id === sale.productId 
        ? { ...p, stock: p.stock - sale.quantity }
        : p
    );
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    // Create sale record
    const newSale = {
      ...sale,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    
    const sales = await salesService.getSales();
    localStorage.setItem(SALES_KEY, JSON.stringify([...sales, newSale]));
    
    return newSale;
  },
};