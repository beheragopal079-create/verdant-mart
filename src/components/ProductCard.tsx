import React from 'react';
import { Heart, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { formatINR, useStore } from '../context/StoreContext';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  onOpenProduct: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenProduct }) => {
  const { addToCart, updateQuantity, getCartQuantity, toggleWishlist, isInWishlist } = useStore();
  const qty = getCartQuantity(product.id);
  const wishlisted = isInWishlist(product.id);

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <article className="group flex flex-col bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-14px_rgba(23,61,50,0.18)]">
      {/* Product photograph */}
      <div className="relative">
        <button
          type="button"
          onClick={() => onOpenProduct(product.id)}
          className="block w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173D32]"
          aria-label={`View details for ${product.name}`}
        >
          <ProductImage src={product.image} alt={product.name} />
        </button>

        {/* Wishlist toggle button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-sm bg-[#F8F6EF]/92 border border-[#E0DBD0] text-[#1C2420] hover:bg-[#173D32] hover:text-[#F8F6EF] hover:border-[#173D32] transition-colors cursor-pointer"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current text-[#173D32] group-hover:text-inherit' : ''}`} />
        </button>
      </div>

      {/* Card content */}
      <div className="flex-1 flex flex-col p-5">
        {/* Clean unboxed metadata */}
        <div className="flex items-center justify-between gap-2 text-xs text-[#525B56] tracking-wide">
          <span className="truncate">{product.category} · {product.unit}</span>
          {discountPercent !== null && (
            <span className="shrink-0 font-semibold text-[#173D32]">Save {discountPercent}%</span>
          )}
        </div>

        {/* Product title */}
        <h3 className="mt-1.5 font-display text-lg font-medium leading-snug text-[#1C2420]">
          <button
            type="button"
            onClick={() => onOpenProduct(product.id)}
            className="text-left hover:text-[#173D32] transition-colors cursor-pointer focus-visible:outline-none focus-visible:underline"
          >
            {product.name}
          </button>
        </h3>

        {/* Availability line with explicit text */}
        <p className="mt-1 text-xs text-[#525B56]">
          {product.origin} · <span className="text-[#173D32] font-medium">{product.availability}</span>
        </p>

        {/* Price + Action aligned at bottom */}
        <div className="mt-auto pt-4 border-t border-[#E8E3D8] flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2 tabular-nums">
            <span className="text-base font-semibold text-[#1C2420]">{formatINR(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-[#6B746E] line-through">{formatINR(product.originalPrice)}</span>
            )}
          </div>

          {qty === 0 ? (
            <button
              type="button"
              onClick={() => addToCart(product.id, 1)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-sm bg-[#173D32] text-[#F8F6EF] hover:bg-[#0E2720] text-xs font-medium tracking-wide transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          ) : (
            <div className="inline-flex items-center border border-[#173D32] rounded-sm bg-[#F8F6EF] h-10">
              <button
                type="button"
                onClick={() => updateQuantity(product.id, qty - 1)}
                aria-label={`Decrease quantity of ${product.name}`}
                className="w-9 h-full flex items-center justify-center text-[#173D32] hover:bg-[#173D32]/10 transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center text-xs font-semibold tabular-nums text-[#1C2420]">{qty}</span>
              <button
                type="button"
                onClick={() => updateQuantity(product.id, qty + 1)}
                aria-label={`Increase quantity of ${product.name}`}
                className="w-9 h-full flex items-center justify-center text-[#173D32] hover:bg-[#173D32]/10 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
