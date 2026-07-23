export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription?: string;
  price: number;
  salePrice?: number;
  category: 'templates' | 'boilerplates' | 'ui-kits' | 'plugins' | 'tools';
  features: string[];
  technologies: string[];
  version: string;
  lastUpdated: string;
  images: string[];
  thumbnail: string;
  liveDemoUrl?: string;
  repositoryUrl?: string;
  rating: number;
  reviewCount: number;
  isPopular?: boolean;
  isNew?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
  paymentIntentId?: string;
}

export interface License {
  id: string;
  orderId: string;
  productId: string;
  userId: string;
  licenseKey: string;
  type: 'single' | 'extended' | 'unlimited';
  status: 'active' | 'revoked' | 'expired';
  issuedAt: string;
  expiresAt?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercentage: number;
  maxUses: number;
  usesCount: number;
  expiresAt: string;
  isActive: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  licenseType: 'single' | 'extended' | 'unlimited';
  price: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
}
