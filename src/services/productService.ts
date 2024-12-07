// Simulating a backend API with localStorage
const PRODUCTS_KEY = 'products';

export interface Product {
  id: string;
  name: string;
  sku: string;
  stock: number;
  unitPrice: number;
  serialNumber: string;
  engineNumber?: string;
  purchaseDate: string;
  dollarRate: number;
  category: string;
  description?: string;
  isAvailable: boolean;
}

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    const products = localStorage.getItem(PRODUCTS_KEY);
    return products ? JSON.parse(products) : [];
  },

  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const products = await productService.getProducts();
    const newProduct = {
      ...product,
      id: crypto.randomUUID(),
    };
    
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify([...products, newProduct]));
    return newProduct;
  },
};