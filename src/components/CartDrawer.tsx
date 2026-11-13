import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { FREE_DELIVERY_THRESHOLD, formatINR, useStore } from '../context/StoreContext';
import { PageRoute } from '../types';

interface CartDrawerProps {
  onNavigate: (route: PageRoute) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const {
    isCartOpen,
    setIsCartOpen,
    detailedCartItems,
    totalItems,
    subtotal,
    deliveryFee,
    grandTotal,
    totalSavings,
    amountToFreeDelivery,
    updateQuantity,
    removeFromCart,
  } = useStore();

  if (!isCartOpen) return null;

  const progress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  const go = (route: PageRoute) => {
    setIsCartOpen(false);
    onNavigate(route);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping Bag">
      <div
        className="fixed inset-0 bg-[#0E2720]/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <aside className="relative z-10 w-full max-w-md bg-[#F8F6EF] h-full flex flex-col border-l border-[#E0DBD0] shadow-2xl">
        {/* Header */}
        <div className="px-6 h-16 border-b border-[#E0DBD0] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <h2 className="font-display text-lg font-medium text-[#1C2420]">Shopping Bag</h2>
            <span className="text-xs text-[#525B56] tabular-nums">· {totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close shopping bag"
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#525B56] hover:text-[#1C2420] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free delivery meter */}
        {detailedCartItems.length > 0 && (
          <div className="px-6 py-3.5 bg-[#F1EDE2] border-b border-[#E0DBD0]">
            <p className="text-xs text-[#1C2420]">
              {amountToFreeDelivery === 0 ? (
                <span className="font-medium text-[#173D32]">
                  Complimentary chilled delivery unlocked.
                </span>
              ) : (
                <span>
                  Add <strong className="tabular-nums font-semibold text-[#173D32]">{formatINR(amountToFreeDelivery)}</strong> more for complimentary chilled delivery.
                </span>
              )}
            </p>
            <div className="mt-2 h-1 w-full bg-[#DDD7C8] overflow-hidden rounded-full">
              <div
                className="h-full bg-[#173D32] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {detailedCartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 rounded-sm bg-[#EFEBE0] border border-[#E0DBD0] flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-[#173D32]" />
              </div>
              <h3 className="font-display text-xl font-medium text-[#1C2420]">Your bag is empty</h3>
              <p className="mt-2 text-sm text-[#525B56] max-w-xs">
                Explore morning-harvested produce, stone-hearth sourdough, and pantry staples.
              </p>
              <button
                type="button"
                onClick={() => go({ page: 'shop', category: 'All' })}
                className="mt-6 px-6 py-3 rounded-sm bg-[#173D32] text-[#F8F6EF] hover:bg-[#0E2720] text-sm font-medium transition-colors cursor-pointer"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[#E0DBD0]">
              {detailedCartItems.map(({ product, quantity, lineTotal }) => (
                <li key={product.id} className="py-4 flex gap-4">
                  <button
                    type="button"
                    onClick={() => go({ page: 'product', productId: product.id })}
                    className="w-20 h-16 rounded-sm overflow-hidden bg-[#EFEBE0] shrink-0 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <button
                          type="button"
                          onClick={() => go({ page: 'product', productId: product.id })}
                          className="text-sm font-medium text-[#1C2420] hover:text-[#173D32] text-left leading-snug cursor-pointer"
                        >
                          {product.name}
                        </button>
                        <p className="text-xs text-[#525B56] mt-0.5">{product.unit}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="p-1.5 text-[#6B746E] hover:text-[#1C2420] cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-[#D4CEC0] rounded-sm bg-[#FBF9F4] h-8">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label={`Decrease ${product.name} quantity`}
                          className="w-8 h-full flex items-center justify-center text-[#1C2420] hover:bg-[#EFEBE0] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold tabular-nums">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          aria-label={`Increase ${product.name} quantity`}
                          className="w-8 h-full flex items-center justify-center text-[#1C2420] hover:bg-[#EFEBE0] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-semibold tabular-nums text-[#1C2420]">
                        {formatINR(lineTotal)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer totals */}
        {detailedCartItems.length > 0 && (
          <div className="p-6 border-t border-[#E0DBD0] bg-[#FBF9F4] space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-[#525B56]">
                <span>Subtotal</span>
                <span className="tabular-nums text-[#1C2420]">{formatINR(subtotal)}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex items-center justify-between text-[#173D32]">
                  <span>Seasonal Savings</span>
                  <span className="tabular-nums">−{formatINR(totalSavings)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-[#525B56]">
                <span>Chilled Delivery</span>
                <span className="tabular-nums text-[#1C2420]">
                  {deliveryFee === 0 ? 'Complimentary' : formatINR(deliveryFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E0DBD0] flex items-center justify-between font-semibold text-[#1C2420] text-base">
                <span>Total</span>
                <span className="tabular-nums">{formatINR(grandTotal)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => go({ page: 'cart' })}
                className="px-4 py-3 rounded-sm border border-[#173D32] text-[#173D32] hover:bg-[#EFEBE0] text-xs font-medium tracking-wide transition-colors cursor-pointer whitespace-nowrap"
              >
                View Cart
              </button>
              <button
                type="button"
                onClick={() => go({ page: 'checkout' })}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-sm bg-[#173D32] text-[#F8F6EF] hover:bg-[#0E2720] text-xs font-medium tracking-wide transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
