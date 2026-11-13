export type CategoryId =
  | 'Fresh Fruits'
  | 'Vegetables'
  | 'Dairy & Eggs'
  | 'Bakery'
  | 'Snacks'
  | 'Beverages'
  | 'Pantry Essentials'
  | 'Household';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  price: number;
  originalPrice?: number;
  unit: string;
  origin: string;
  availability: 'In Stock' | 'Seasonal Harvest' | 'Low Stock';
  inStock: boolean;
  bestseller?: boolean;
  seasonal?: boolean;
  specialOffer?: boolean;
  image: string;
  shortDescription: string;
  tastingNotes: string;
  storageGuide: string;
  harvestWindow: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface DemoOrder {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  deliverySlot: string;
  paymentMethod: 'Cash on Delivery (Demo)' | 'UPI Simulation (Demo)';
  items: Array<{
    productId: string;
    name: string;
    unit: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  subtotal: number;
  deliveryFee: number;
  savings: number;
  total: number;
}

export type PageRoute =
  | { page: 'home' }
  | { page: 'shop'; category?: CategoryId | 'All'; offersOnly?: boolean }
  | { page: 'product'; productId: string }
  | { page: 'about' }
  | { page: 'contact' }
  | { page: 'cart' }
  | { page: 'checkout' }
  | { page: 'faq' }
  | { page: 'account' };

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'discount';
