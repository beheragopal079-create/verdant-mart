import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CartItem, DemoOrder, Product } from '../types';
import { PRODUCTS } from '../data/products';

const CART_STORAGE_KEY = 'verdant_cart_v1';
const WISHLIST_STORAGE_KEY = 'verdant_wishlist_v1';
const ORDERS_STORAGE_KEY = 'verdant_orders_v1';

export const FREE_DELIVERY_THRESHOLD = 999;
export const STANDARD_DELIVERY_FEE = 60;

interface StoreContextValue {
  cart: CartItem[];
  wishlist: string[];
  orders: DemoOrder[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  getCartQuantity: (productId: string) => number;
  placeDemoOrder: (details: {
    customerName: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    deliverySlot: string;
    paymentMethod: 'Cash on Delivery (Demo)' | 'UPI Simulation (Demo)';
  }) => DemoOrder;
  totalItems: number;
  subtotal: number;
  totalSavings: number;
  deliveryFee: number;
  grandTotal: number;
  amountToFreeDelivery: number;
  detailedCartItems: Array<{ product: Product; quantity: number; lineTotal: number }>;
  toastMessage: string | null;
  dismissToast: () => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => readStorage<CartItem[]>(CART_STORAGE_KEY, []));
  const [wishlist, setWishlist] = useState<string[]>(() => readStorage<string[]>(WISHLIST_STORAGE_KEY, []));
  const [orders, setOrders] = useState<DemoOrder[]>(() => readStorage<DemoOrder[]>(ORDERS_STORAGE_KEY, []));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const addToCart = (productId: string, quantity = 1) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    if (!prod) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: Math.min(25, item.quantity + quantity) } : item
        );
      }
      return [...prev, { productId, quantity: Math.min(25, Math.max(1, quantity)) }];
    });
    showToast(`Added ${prod.name} to your bag`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity: Math.min(25, quantity) } : item))
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        if (prod) showToast(`Removed ${prod.name} from saved items`);
        return prev.filter((id) => id !== productId);
      }
      if (prod) showToast(`Saved ${prod.name} to wishlist`);
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const getCartQuantity = (productId: string) =>
    cart.find((item) => item.productId === productId)?.quantity ?? 0;

  const detailedCartItems = useMemo(() => {
    return cart
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        if (!product) return null;
        return {
          product,
          quantity: item.quantity,
          lineTotal: product.price * item.quantity,
        };
      })
      .filter((entry): entry is { product: Product; quantity: number; lineTotal: number } => entry !== null);
  }, [cart]);

  const totalItems = useMemo(
    () => detailedCartItems.reduce((sum, item) => sum + item.quantity, 0),
    [detailedCartItems]
  );

  const subtotal = useMemo(
    () => detailedCartItems.reduce((sum, item) => sum + item.lineTotal, 0),
    [detailedCartItems]
  );

  const totalSavings = useMemo(
    () =>
      detailedCartItems.reduce((sum, item) => {
        if (item.product.originalPrice && item.product.originalPrice > item.product.price) {
          return sum + (item.product.originalPrice - item.product.price) * item.quantity;
        }
        return sum;
      }, 0),
    [detailedCartItems]
  );

  const deliveryFee = subtotal === 0 ? 0 : subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
  const grandTotal = subtotal + deliveryFee;
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const placeDemoOrder: StoreContextValue['placeDemoOrder'] = (details) => {
    const orderNumber = `VM-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: DemoOrder = {
      id: orderNumber,
      createdAt: new Date().toISOString(),
      ...details,
      items: detailedCartItems.map(({ product, quantity }) => ({
        productId: product.id,
        name: product.name,
        unit: product.unit,
        price: product.price,
        quantity,
        image: product.image,
      })),
      subtotal,
      deliveryFee,
      savings: totalSavings,
      total: grandTotal,
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        getCartQuantity,
        placeDemoOrder,
        totalItems,
        subtotal,
        totalSavings,
        deliveryFee,
        grandTotal,
        amountToFreeDelivery,
        detailedCartItems,
        toastMessage,
        dismissToast: () => setToastMessage(null),
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
