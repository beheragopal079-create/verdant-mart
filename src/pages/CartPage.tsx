import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { FREE_DELIVERY_THRESHOLD, formatINR, useStore } from '../context/StoreContext';
import { PageRoute } from '../types';

interface CartPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    detailedCartItems,
    totalItems,
    subtotal,
    totalSavings,
    deliveryFee,
    grandTotal,
    amountToFreeDelivery,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useStore();

  const progress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-8 border-b border-[#E0DBD0] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#525B56]">
              Your Basket
            </p>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-medium text-[#1C2420]">
              Shopping Cart ({totalItems})
            </h1>
          </div>
          {detailedCartItems.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs text-[#525B56] hover:text-[#1C2420] underline underline-offset-4 cursor-pointer self-start sm:self-auto"
            >
              Clear Basket
            </button>
          )}
        </div>

        {detailedCartItems.length === 0 ? (
          <div className="my-12 py-20 px-6 bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm text-center">
            <div className="w-16 h-16 mx-auto rounded-sm bg-[#EFEBE0] border border-[#E0DBD0] flex items-center justify-center mb-5">
              <ShoppingBag className="w-7 h-7 text-[#173D32]" />
            </div>
            <h2 className="font-display text-2xl font-medium text-[#1C2420]">Your shopping cart is empty</h2>
            <p className="mt-2 text-sm text-[#525B56] max-w-md mx-auto">
              Start building your weekly harvest crate with seasonal fruits, leafy greens, freshly baked sourdough, and pantry essentials.
            </p>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'shop', category: 'All' })}
              className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-[#173D32] text-[#F8F6EF] hover:bg-[#0E2720] text-sm font-medium transition-colors cursor-pointer"
            >
              <span>Browse Fresh Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Items */}
            <div className="lg:col-span-8 bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm divide-y divide-[#E0DBD0]">
              {detailedCartItems.map(({ product, quantity, lineTotal }) => (
                <div key={product.id} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'product', productId: product.id })}
                    className="w-28 h-22 rounded-sm overflow-hidden bg-[#EFEBE0] shrink-0 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#525B56]">{product.category} · {product.unit}</p>
                    <button
                      type="button"
                      onClick={() => onNavigate({ page: 'product', productId: product.id })}
                      className="mt-0.5 font-display text-lg font-medium text-[#1C2420] hover:text-[#173D32] text-left cursor-pointer"
                    >
                      {product.name}
                    </button>
                    <p className="mt-1 text-xs text-[#525B56] tabular-nums">
                      Unit price: {formatINR(product.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-5">
                    <div className="inline-flex items-center border border-[#D4CEC0] rounded-sm bg-[#F8F6EF] h-10">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label={`Decrease quantity of ${product.name}`}
                        className="w-9 h-full flex items-center justify-center text-[#1C2420] hover:bg-[#EFEBE0] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold tabular-nums">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label={`Increase quantity of ${product.name}`}
                        className="w-9 h-full flex items-center justify-center text-[#1C2420] hover:bg-[#EFEBE0] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-base font-semibold tabular-nums text-[#1C2420] min-w-[72px] text-right">
                      {formatINR(lineTotal)}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      aria-label={`Remove ${product.name} from cart`}
                      className="p-2 text-[#6B746E] hover:text-[#1C2420] cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <aside className="lg:col-span-4 bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm p-6 space-y-5 lg:sticky lg:top-24">
              <h2 className="font-display text-xl font-medium text-[#1C2420]">Order Summary</h2>

              <div className="p-3.5 bg-[#F1EDE2] rounded-sm border border-[#E0DBD0]">
                <p className="text-xs text-[#1C2420]">
                  {amountToFreeDelivery === 0 ? (
                    <span className="font-medium text-[#173D32]">
                      Complimentary chilled delivery unlocked.
                    </span>
                  ) : (
                    <span>
                      Add <strong className="tabular-nums">{formatINR(amountToFreeDelivery)}</strong> more for free delivery.
                    </span>
                  )}
                </p>
                <div className="mt-2 h-1 w-full bg-[#DDD7C8] rounded-full overflow-hidden">
                  <div className="h-full bg-[#173D32] transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[#525B56]">
                  <span>Subtotal</span>
                  <span className="tabular-nums text-[#1C2420]">{formatINR(subtotal)}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-[#173D32]">
                    <span>Seasonal Offers Savings</span>
                    <span className="tabular-nums">−{formatINR(totalSavings)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#525B56]">
                  <span>Insulated Chilled Delivery</span>
                  <span className="tabular-nums text-[#1C2420]">
                    {deliveryFee === 0 ? 'Complimentary' : formatINR(deliveryFee)}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#E0DBD0] flex justify-between font-semibold text-base text-[#1C2420]">
                  <span>Total</span>
                  <span className="tabular-nums">{formatINR(grandTotal)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate({ page: 'checkout' })}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm bg-[#173D32] text-[#F8F6EF] hover:bg-[#0E2720] text-sm font-medium tracking-wide transition-colors cursor-pointer"
              >
                <span>Proceed to Demo Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate({ page: 'shop', category: 'All' })}
                className="w-full text-center text-xs text-[#173D32] hover:underline underline-offset-4 cursor-pointer"
              >
                Continue Shopping
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};
