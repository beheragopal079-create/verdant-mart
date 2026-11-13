import React from 'react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { formatINR, useStore } from '../context/StoreContext';
import { PageRoute } from '../types';
import { ProductCard } from '../components/ProductCard';

interface AccountPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({ onNavigate }) => {
  const { wishlist, orders } = useStore();
  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <div className="pb-8 border-b border-[#E0DBD0]">
          <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#525B56]">
            Personal Pantry
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl font-medium text-[#1C2420]">
            Saved Wishlist & Demo Orders
          </h1>
          <p className="mt-2 text-sm text-[#525B56]">
            Your saved items and demonstration order receipts are stored locally in your browser.
          </p>
        </div>

        {/* Saved Wishlist */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-medium text-[#1C2420]">
              Saved Wishlist ({savedProducts.length})
            </h2>
            {savedProducts.length > 0 && (
              <button
                type="button"
                onClick={() => onNavigate({ page: 'shop', category: 'All' })}
                className="text-xs font-medium text-[#173D32] hover:underline underline-offset-4 cursor-pointer"
              >
                Browse More
              </button>
            )}
          </div>

          {savedProducts.length === 0 ? (
            <div className="p-10 bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm text-center">
              <Heart className="w-7 h-7 text-[#173D32]/60 mx-auto mb-3" />
              <p className="font-display text-xl text-[#1C2420]">No saved items yet</p>
              <p className="mt-1.5 text-sm text-[#525B56]">
                Tap the heart icon on any product to save it for your next weekly basket.
              </p>
              <button
                type="button"
                onClick={() => onNavigate({ page: 'shop', category: 'All' })}
                className="mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-[#173D32] text-[#F8F6EF] text-xs font-medium cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {savedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenProduct={(id) => onNavigate({ page: 'product', productId: id })}
                />
              ))}
            </div>
          )}
        </section>

        {/* Demo Order History */}
        <section className="pt-8 border-t border-[#E0DBD0]">
          <h2 className="font-display text-2xl font-medium text-[#1C2420] mb-6">
            Demo Order History ({orders.length})
          </h2>

          {orders.length === 0 ? (
            <div className="p-10 bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm text-center">
              <ShoppingBag className="w-7 h-7 text-[#173D32]/60 mx-auto mb-3" />
              <p className="font-display text-xl text-[#1C2420]">No demo orders placed yet</p>
              <p className="mt-1.5 text-sm text-[#525B56]">
                Complete a simulation order through Demo Checkout to see your receipt archived here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-6 bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E8E3D8]">
                    <div>
                      <p className="font-display text-lg font-medium text-[#1C2420]">
                        {order.id} · Demo Order
                      </p>
                      <p className="text-xs text-[#525B56]">
                        {new Date(order.createdAt).toLocaleString('en-IN', {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}{' '}
                        · {order.deliverySlot}
                      </p>
                    </div>
                    <p className="text-base font-semibold tabular-nums text-[#173D32]">
                      {formatINR(order.total)}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#525B56]">
                    <div>
                      <p className="font-medium text-[#1C2420]">{order.customerName}</p>
                      <p>{order.address}, {order.city} — {order.pincode}</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#1C2420]">{order.paymentMethod}</p>
                      <p>{order.items.map((i) => `${i.name} × ${i.quantity}`).join(', ')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
