export enum UserRole { ADMIN = 'ADMIN', CASHIER = 'CASHIER' }

export interface User {
  id: string;
  username: string;
  role: UserRole;
  name: string;
  email?: string; // Add email since it's used in your form
  status?: 'active' | 'inactive' | 'on-leave'; // Add status property
}

export interface SalesDataPoint {
  date: string;
  revenue: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description?: string;
  imageUrl?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Transaction {
  id: string;
  cashierId: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  timestamp: number;
  paymentMethod: 'cash' | 'card' | string;
  date: string;
  time: string;
  change?: number;
  status?: 'pending' | 'completed' | 'failed' | 'refunded'; // Add status property
}

// --- Hierarchical Types ---

export interface SubItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface ProductGroup {
  id: number;
  name: string;
  image: string;
  subitems: SubItem[];
}

export interface GenderCategory {
  name: string; // e.g., "Men", "Women"
  products: ProductGroup[];
  children?: GenderCategory[]; // Recursive for nested groups like Kids -> Boys
}

export interface MainCategory {
  id: number;
  name: string; // e.g., "Clothing"
  genders: GenderCategory[];
}