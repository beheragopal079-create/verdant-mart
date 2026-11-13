import React, { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { CategoryId, PageRoute, SortOption } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ShopPageProps {
  initialCategory?: CategoryId | 'All';
  initialOffersOnly?: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigate: (route: PageRoute) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory = 'All',
  initialOffersOnly = false,
  searchQuery,
  onSearchChange,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'All'>(initialCategory);
  const [offersOnly, setOffersOnly] = useState(initialOffersOnly);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setOffersOnly(initialOffersOnly);
  }, [initialOffersOnly]);

  const triggerFilterTransition = (fn: () => void) => {
    setIsLoading(true);
    fn();
    window.setTimeout(() => setIsLoading(false), 160);
  };

  const activeCategoryMeta = CATEGORIES.find((c) => c.id === selectedCategory);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = PRODUCTS.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (offersOnly && !p.originalPrice) return false;
      if (q) {
        const hay = `${p.name} ${p.category} ${p.origin} ${p.shortDescription}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const sorted = [...list];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'discount') {
      const getDisc = (p: (typeof PRODUCTS)[number]) =>
        p.originalPrice ? (p.originalPrice - p.price) / p.originalPrice : 0;
      sorted.sort((a, b) => getDisc(b) - getDisc(a));
    }
    return sorted;
  }, [selectedCategory, offersOnly, searchQuery, sortBy]);

  const resetAll = () => {
    onSearchChange('');
    setOffersOnly(false);
    setSortBy('featured');
    onNavigate({ page: 'shop', category: 'All', offersOnly: false });
  };

  return (
    <div className="py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pb-8 border-b border-[#E0DBD0]">
          <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#525B56]">
            Verdant Market Catalogue
          </p>
          <div className="mt-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-5xl font-medium text-[#1C2420]">
                {selectedCategory === 'All' ? 'Shop All Produce & Pantry' : selectedCategory}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#525B56]">
                {activeCategoryMeta
                  ? activeCategoryMeta.description
                  : 'Thoughtfully sourced fresh produce, dairy, bakery, and pantry essentials.'}
              </p>
            </div>
            <p className="text-xs font-medium tabular-nums text-[#525B56]">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="py-6 border-b border-[#E0DBD0] space-y-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() =>
                triggerFilterTransition(() => {
                  setSelectedCategory('All');
                  onNavigate({ page: 'shop', category: 'All', offersOnly });
                })
              }
              className={`px-4 py-2 min-h-[40px] rounded-sm text-xs font-medium tracking-wide transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory === 'All'
                  ? 'bg-[#173D32] text-[#F8F6EF]'
                  : 'bg-[#FBF9F4] border border-[#E0DBD0] text-[#3D4641] hover:border-[#173D32]/50'
              }`}
            >
              All ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() =>
                  triggerFilterTransition(() => {
                    setSelectedCategory(cat.id);
                    onNavigate({ page: 'shop', category: cat.id, offersOnly });
                  })
                }
                className={`px-4 py-2 min-h-[40px] rounded-sm text-xs font-medium tracking-wide transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-[#173D32] text-[#F8F6EF]'
                    : 'bg-[#FBF9F4] border border-[#E0DBD0] text-[#3D4641] hover:border-[#173D32]/50'
                }`}
              >
                {cat.id}
              </button>
            ))}
          </div>

          {/* Search + Offers + Price Sort Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#525B56] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by product, farm origin, or category..."
                aria-label="Filter products by keyword"
                className="w-full pl-10 pr-9 py-2.5 min-h-[42px] rounded-sm bg-[#FBF9F4] border border-[#D4CEC0] text-sm text-[#1C2420] placeholder-[#6B746E] focus:outline-none focus:border-[#173D32]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#525B56] hover:text-[#1C2420] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => triggerFilterTransition(() => setOffersOnly((prev) => !prev))}
                className={`inline-flex items-center gap-2 px-3.5 py-2 min-h-[42px] rounded-sm border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  offersOnly
                    ? 'bg-[#173D32] text-[#F8F6EF] border-[#173D32]'
                    : 'bg-[#FBF9F4] text-[#3D4641] border-[#D4CEC0] hover:border-[#173D32]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Special Offers Only</span>
              </button>

              <label className="inline-flex items-center gap-2 text-xs text-[#525B56]">
                <span className="whitespace-nowrap">Sort by</span>
                <select
                  value={sortBy}
                  onChange={(e) => triggerFilterTransition(() => setSortBy(e.target.value as SortOption))}
                  aria-label="Sort products"
                  className="px-3 py-2 min-h-[42px] rounded-sm bg-[#FBF9F4] border border-[#D4CEC0] text-xs font-medium text-[#1C2420] focus:outline-none focus:border-[#173D32] cursor-pointer"
                >
                  <option value="featured">Featured Harvest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="discount">Savings & Offers First</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="pt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" aria-label="Loading products">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm overflow-hidden animate-pulse"
                >
                  <div className="aspect-[4/3] bg-[#E8E3D8]" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 w-28 bg-[#E8E3D8] rounded-sm" />
                    <div className="h-5 w-4/5 bg-[#E8E3D8] rounded-sm" />
                    <div className="h-3 w-1/2 bg-[#E8E3D8] rounded-sm" />
                    <div className="pt-4 border-t border-[#E8E3D8] flex justify-between">
                      <div className="h-6 w-16 bg-[#E8E3D8] rounded-sm" />
                      <div className="h-9 w-24 bg-[#E8E3D8] rounded-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm px-6">
              <h2 className="font-display text-2xl font-medium text-[#1C2420]">
                No products match your selection
              </h2>
              <p className="mt-2 text-sm text-[#525B56] max-w-md mx-auto">
                Try clearing your search query or viewing all eight market departments.
              </p>
              <button
                type="button"
                onClick={resetAll}
                className="mt-6 px-6 py-3 rounded-sm bg-[#173D32] text-[#F8F6EF] hover:bg-[#0E2720] text-sm font-medium transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenProduct={(id) => onNavigate({ page: 'product', productId: id })}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
