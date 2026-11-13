import React, { useState } from 'react';
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { PageRoute } from '../types';
import { formatINR, useStore } from '../context/StoreContext';
import { ProductImage } from '../components/ProductImage';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (route: PageRoute) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, onNavigate }) => {
  const product = PRODUCTS.find((p) => p.id === productId);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-3xl text-[#1C2420]">Product not found</h1>
        <p className="mt-2 text-sm text-[#525B56]">This item may have moved out of the current seasonal catalogue.</p>
        <button
          type="button"
          onClick={() => onNavigate({ page: 'shop', category: 'All' })}
          className="mt-6 px-6 py-3 rounded-sm bg-[#173D32] text-[#F8F6EF] text-sm font-medium cursor-pointer"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).concat(
    PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category)
  ).slice(0, 4);

  const handleAdd = () => {
    addToCart(product.id, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div className="py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#525B56] mb-8" aria-label="Breadcrumb">
          <button
            type="button"
            onClick={() => onNavigate({ page: 'shop', category: 'All' })}
            className="inline-flex items-center gap-1.5 hover:text-[#173D32] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Shop</span>
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            onClick={() => onNavigate({ page: 'shop', category: product.category })}
            className="hover:text-[#173D32] transition-colors cursor-pointer"
          >
            {product.category}
          </button>
          <span aria-hidden="true">/</span>
          <span className="text-[#1C2420] font-medium truncate">{product.name}</span>
        </nav>

        {/* Contiguous Purchase Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Sticky Photograph */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="rounded-sm overflow-hidden border border-[#E0DBD0] bg-[#FBF9F4]">
              <ProductImage src={product.image} alt={product.name} />
            </div>
          </div>

          {/* Right: Purchase & Provenance Details */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#525B56]">
                {product.category} · {product.origin}
              </p>
              <h1 className="mt-2 font-display text-3xl sm:text-4xl font-medium text-[#1C2420] text-balance">
                {product.name}
              </h1>
              <p className="mt-2 text-sm text-[#173D32] font-medium">
                {product.unit} · {product.availability}
              </p>
            </div>

            <div className="flex items-baseline gap-3 tabular-nums pb-6 border-b border-[#E0DBD0]">
              <span className="text-2xl sm:text-3xl font-semibold text-[#1C2420]">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-[#6B746E] line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                  {discountPercent !== null && (
                    <span className="text-xs font-semibold text-[#173D32]">
                      Save {discountPercent}%
                    </span>
                  )}
                </>
              )}
            </div>

            <p className="text-base text-[#3D4641] leading-relaxed">{product.shortDescription}</p>

            {/* Quantity + Primary CTA + Wishlist */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center border border-[#D4CEC0] rounded-sm bg-[#FBF9F4] h-12">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-11 h-full flex items-center justify-center text-[#1C2420] hover:bg-[#EFEBE0] cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-semibold tabular-nums">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                  aria-label="Increase quantity"
                  className="w-11 h-full flex items-center justify-center text-[#1C2420] hover:bg-[#EFEBE0] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 min-w-[200px] inline-flex items-center justify-center gap-2 px-6 h-12 rounded-sm bg-[#173D32] text-[#F8F6EF] hover:bg-[#0E2720] text-sm font-medium tracking-wide transition-colors cursor-pointer"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4 text-[#A8B99A]" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart — {formatINR(product.price * quantity)}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label={wishlisted ? 'Remove from saved wishlist' : 'Save to wishlist'}
                className={`h-12 px-4 inline-flex items-center justify-center gap-2 rounded-sm border text-sm font-medium transition-colors cursor-pointer ${
                  wishlisted
                    ? 'bg-[#EFEBE0] border-[#173D32] text-[#173D32]'
                    : 'bg-[#FBF9F4] border-[#D4CEC0] text-[#1C2420] hover:border-[#173D32]'
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">{wishlisted ? 'Saved' : 'Save'}</span>
              </button>
            </div>

            {/* Editorial provenance breakdown */}
            <div className="pt-6 border-t border-[#E0DBD0] space-y-5 text-sm">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#525B56]">
                  Tasting & Texture Notes
                </h2>
                <p className="mt-1.5 text-[#1C2420] leading-relaxed">{product.tastingNotes}</p>
              </div>
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#525B56]">
                  Storage & Care
                </h2>
                <p className="mt-1.5 text-[#1C2420] leading-relaxed">{product.storageGuide}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#E8E3D8]">
                <div>
                  <p className="text-xs text-[#525B56]">Harvest & Batch Window</p>
                  <p className="mt-0.5 font-medium text-[#1C2420]">{product.harvestWindow}</p>
                </div>
                <div>
                  <p className="text-xs text-[#525B56]">Chilled Delivery</p>
                  <p className="mt-0.5 font-medium text-[#1C2420]">Complimentary over ₹999</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-20 pt-14 border-t border-[#E0DBD0]">
          <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#1C2420] mb-8">
            Pair with your basket
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onOpenProduct={(id) => {
                  setQuantity(1);
                  onNavigate({ page: 'product', productId: id });
                }}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
