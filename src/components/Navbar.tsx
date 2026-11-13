import React, { useEffect, useRef, useState } from 'react';
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import { CategoryId, PageRoute } from '../types';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { formatINR, useStore } from '../context/StoreContext';
import { VerdantCartEmblem } from './VerdantEmblem';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  searchQuery,
  onSearchChange,
}) => {
  const { totalItems, setIsCartOpen, wishlist } = useStore();
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      const timer = window.setTimeout(() => searchInputRef.current?.focus(), 60);
      return () => window.clearTimeout(timer);
    }
  }, [searchOpen]);

  const quickResults = searchQuery.trim()
    ? PRODUCTS.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q)
        );
      }).slice(0, 5)
    : [];

  const go = (route: PageRoute) => {
    setCategoriesOpen(false);
    setMobileMenuOpen(false);
    setSearchOpen(false);
    onNavigate(route);
  };

  const isNavActive = (page: PageRoute['page']) => currentRoute.page === page;

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F8F6EF]/95 backdrop-blur-md border-b border-[#E0DBD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark + Emblem */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#1C2420] hover:text-[#173D32] cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => go({ page: 'home' })}
              className="inline-flex items-center gap-2.5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173D32] rounded-sm whitespace-nowrap shrink-0"
              aria-label="VERDANT MARKET Home"
            >
              <VerdantCartEmblem variant="editorial" className="w-8 h-7 shrink-0" />
              <span className="font-display text-lg sm:text-xl font-semibold tracking-[0.06em] text-[#173D32] whitespace-nowrap">
                VERDANT MARKET
              </span>
            </button>
          </div>

          {/* Zone 2: Clean single-line navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#3D4641]" aria-label="Primary Navigation">
            <button
              type="button"
              onClick={() => go({ page: 'home' })}
              className={`py-1 whitespace-nowrap shrink-0 border-b transition-colors cursor-pointer ${
                isNavActive('home')
                  ? 'text-[#173D32] border-[#173D32]'
                  : 'border-transparent hover:text-[#173D32] hover:border-[#A8B99A]'
              }`}
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => go({ page: 'shop', category: 'All' })}
              className={`py-1 whitespace-nowrap shrink-0 border-b transition-colors cursor-pointer ${
                isNavActive('shop') && (!('category' in currentRoute) || currentRoute.category === 'All')
                  ? 'text-[#173D32] border-[#173D32]'
                  : 'border-transparent hover:text-[#173D32] hover:border-[#A8B99A]'
              }`}
            >
              Shop
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setCategoriesOpen((prev) => !prev)}
                aria-expanded={categoriesOpen}
                className={`inline-flex items-center gap-1 py-1 whitespace-nowrap shrink-0 border-b transition-colors cursor-pointer ${
                  isNavActive('shop') && 'category' in currentRoute && currentRoute.category !== 'All'
                    ? 'text-[#173D32] border-[#173D32]'
                    : 'border-transparent hover:text-[#173D32] hover:border-[#A8B99A]'
                }`}
              >
                <span>Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${categoriesOpen ? 'rotate-180' : ''}`} />
              </button>

              {categoriesOpen && (
                <div className="absolute left-0 top-full mt-3 w-72 bg-[#F8F6EF] border border-[#E0DBD0] rounded-sm shadow-[0_18px_40px_-15px_rgba(23,61,50,0.2)] p-3 z-50">
                  <div className="grid grid-cols-1 gap-0.5">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => go({ page: 'shop', category: cat.id as CategoryId })}
                        className="w-full text-left px-3 py-2.5 rounded-sm hover:bg-[#EFEBE0] transition-colors flex items-center justify-between gap-2 cursor-pointer"
                      >
                        <span className="text-sm font-medium text-[#1C2420]">{cat.id}</span>
                        <span className="text-[11px] text-[#525B56] truncate">{cat.description.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => go({ page: 'about' })}
              className={`py-1 whitespace-nowrap shrink-0 border-b transition-colors cursor-pointer ${
                isNavActive('about')
                  ? 'text-[#173D32] border-[#173D32]'
                  : 'border-transparent hover:text-[#173D32] hover:border-[#A8B99A]'
              }`}
            >
              Our Story
            </button>

            <button
              type="button"
              onClick={() => go({ page: 'contact' })}
              className={`py-1 whitespace-nowrap shrink-0 border-b transition-colors cursor-pointer ${
                isNavActive('contact')
                  ? 'text-[#173D32] border-[#173D32]'
                  : 'border-transparent hover:text-[#173D32] hover:border-[#A8B99A]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Search, Account & Shopping Bag */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen((prev) => !prev)}
              aria-label="Search products"
              className="inline-flex items-center gap-1.5 px-2.5 py-2 min-h-[40px] rounded-sm text-[#1C2420] hover:bg-[#EFEBE0] transition-colors cursor-pointer text-sm whitespace-nowrap shrink-0"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-xs font-medium">Search</span>
            </button>

            <button
              type="button"
              onClick={() => go({ page: 'account' })}
              aria-label="Account and saved wishlist"
              className={`inline-flex items-center gap-1.5 px-2.5 py-2 min-h-[40px] rounded-sm transition-colors cursor-pointer text-sm whitespace-nowrap shrink-0 ${
                isNavActive('account') ? 'bg-[#EFEBE0] text-[#173D32]' : 'text-[#1C2420] hover:bg-[#EFEBE0]'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="hidden xl:inline text-xs font-medium">
                Account{wishlist.length > 0 ? ` (${wishlist.length})` : ''}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Open shopping bag with ${totalItems} items`}
              className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-sm bg-[#173D32] text-[#F8F6EF] hover:bg-[#0E2720] text-xs font-medium tracking-wide transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Bag</span>
              <span className="tabular-nums font-semibold">({totalItems})</span>
            </button>
          </div>
        </div>

        {/* Expandable live search bar */}
        {searchOpen && (
          <div className="border-t border-[#E0DBD0] bg-[#FBF9F4]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  go({ page: 'shop', category: 'All' });
                }}
                className="relative flex items-center gap-3"
              >
                <Search className="w-4 h-4 text-[#525B56] shrink-0" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search Alphonso mangoes, sourdough, A2 ghee, Darjeeling tea..."
                  className="w-full bg-transparent text-sm text-[#1C2420] placeholder-[#6B746E] focus:outline-none py-1.5"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="text-xs text-[#525B56] hover:text-[#1C2420] px-2 py-1 cursor-pointer whitespace-nowrap"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 rounded-sm bg-[#173D32] text-[#F8F6EF] text-xs font-medium cursor-pointer whitespace-nowrap"
                >
                  View All
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                  className="p-2 text-[#525B56] hover:text-[#1C2420] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>

              {searchQuery.trim() && (
                <div className="mt-3 pt-3 border-t border-[#E0DBD0]">
                  {quickResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                      {quickResults.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => go({ page: 'product', productId: p.id })}
                          className="flex items-center gap-3 p-2 rounded-sm hover:bg-[#EFEBE0] text-left transition-colors cursor-pointer"
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-10 object-cover rounded-sm shrink-0 bg-[#EFEBE0]"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-[#1C2420] truncate">{p.name}</p>
                            <p className="text-xs text-[#525B56] tabular-nums">{formatINR(p.price)} · {p.unit}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#525B56]">
                      No matches found for “{searchQuery}”. Try browsing all categories in Shop.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#0E2720]/55 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative z-10 w-80 max-w-[85vw] h-full bg-[#F8F6EF] border-r border-[#E0DBD0] flex flex-col overflow-y-auto">
            <div className="px-5 h-16 border-b border-[#E0DBD0] flex items-center justify-between">
              <span className="font-display text-base font-semibold tracking-wider text-[#173D32]">
                VERDANT MARKET
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#1C2420] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-6">
              <div className="space-y-1">
                {[
                  { label: 'Home', route: { page: 'home' } as PageRoute },
                  { label: 'Shop All', route: { page: 'shop', category: 'All' } as PageRoute },
                  { label: 'Our Story', route: { page: 'about' } as PageRoute },
                  { label: 'Contact Us', route: { page: 'contact' } as PageRoute },
                  { label: 'Account & Wishlist', route: { page: 'account' } as PageRoute },
                  { label: 'Shopping Cart', route: { page: 'cart' } as PageRoute },
                  { label: 'FAQ', route: { page: 'faq' } as PageRoute },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => go(item.route)}
                    className="w-full text-left px-3 py-3 min-h-[44px] text-sm font-medium text-[#1C2420] hover:bg-[#EFEBE0] rounded-sm transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E0DBD0]">
                <p className="px-3 text-xs font-semibold tracking-wider uppercase text-[#525B56] mb-2">
                  Shop by Category
                </p>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => go({ page: 'shop', category: cat.id })}
                      className="w-full text-left px-3 py-2.5 min-h-[40px] text-sm text-[#3D4641] hover:bg-[#EFEBE0] hover:text-[#173D32] rounded-sm transition-colors cursor-pointer"
                    >
                      {cat.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
