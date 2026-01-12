export enum UserRole { 
  ADMIN = 'ADMIN', 
  CASHIER = 'CASHIER',
  MANAGER = 'MANAGER',
  STAFF = 'STAFF'
}

export interface User {
  id: string;
  username: string;
  role: UserRole;
  name: string;
  email?: string;
  password?: string;
  status: 'active' | 'inactive' | 'on-leave';
  createdAt: string;
  updatedAt?: string;
  lastLogin?: string;
  cashierId?: string;
  terminalId?: string;
  isLoggedIn?: boolean;
  sessionId?: string;
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
  cashierName?: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  timestamp: number;
  paymentMethod: 'cash' | 'card' | 'gcash';
  date: string;
  time: string;
  change?: number;
  status?: 'pending' | 'completed' | 'failed' | 'refunded';
  discount?: number;
  discountType?: 'none' | 'pwd' | 'senior';
}

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
  name: string;
  products: ProductGroup[];
  children?: GenderCategory[];
}

export interface MainCategory {
  id: number;
  name: string;
  genders: GenderCategory[];
}

export interface CashierSession {
  sessionId: string;
  cashierId: string;
  terminalId: string;
  startTime: string;
  lastActivity: string;
  isActive: boolean;
}