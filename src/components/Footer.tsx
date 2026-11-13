import React, { useState } from 'react';
import { PageRoute } from '../types';
import { CATEGORIES } from '../data/products';
import { VerdantCartEmblem } from './VerdantEmblem';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onReplayIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onReplayIntro }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#173D32] text-[#F8F6EF] border-t border-[#0E2720]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <VerdantCartEmblem variant="metallic" className="w-10 h-9 shrink-0" />
              <div>
                <p className="font-display text-xl font-semibold tracking-[0.06em] text-[#F8F6EF]">
                  VERDANT MARKET
                </p>
                <p className="text-xs text-[#A8B99A] tracking-wide">
                  Freshness, thoughtfully delivered.
                </p>
              </div>
            </div>
            <p className="text-sm text-[#F8F6EF]/80 leading-relaxed max-w-sm">
              An editorial neighbourhood grocer connecting regenerative Indian farms, artisan creameries, and stone-hearth bakers directly with mindful kitchens.
            </p>
            <button
              type="button"
              onClick={onReplayIntro}
              className="text-xs text-[#A8B99A] hover:text-[#F8F6EF] underline underline-offset-4 transition-colors cursor-pointer"
            >
              Replay Brand Intro
            </button>
          </div>

          {/* Categories column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A8B99A] mb-4">
              Departments
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'shop', category: cat.id })}
                    className="text-[#F8F6EF]/85 hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {cat.id}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Care column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A8B99A] mb-4">
              Storefront
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Shop All', route: { page: 'shop', category: 'All' } as PageRoute },
                { label: 'Our Story', route: { page: 'about' } as PageRoute },
                { label: 'Contact Us', route: { page: 'contact' } as PageRoute },
                { label: 'Shopping Cart', route: { page: 'cart' } as PageRoute },
                { label: 'Checkout (Demo)', route: { page: 'checkout' } as PageRoute },
                { label: 'FAQ', route: { page: 'faq' } as PageRoute },
                { label: 'Account & Wishlist', route: { page: 'account' } as PageRoute },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.route)}
                    className="text-[#F8F6EF]/85 hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#A8B99A] mb-4">
              Seasonal Harvest Dispatch
            </h3>
            <p className="text-sm text-[#F8F6EF]/80 leading-relaxed mb-4">
              Receive weekly notes on first-flush harvests, orchard arrivals, and kitchen recipes.
            </p>
            {subscribed ? (
              <div className="p-3.5 rounded-sm bg-[#0E2720] border border-[#A8B99A]/40 text-xs text-[#F8F6EF]">
                Thank you. You are subscribed to the Verdant Harvest Dispatch.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    aria-label="Email address for newsletter"
                    className="flex-1 min-w-0 px-3.5 py-2.5 rounded-sm bg-[#0E2720] border border-[#A8B99A]/35 text-sm text-[#F8F6EF] placeholder-[#A8B99A]/60 focus:outline-none focus:border-[#F8F6EF]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-sm bg-[#F8F6EF] text-[#173D32] hover:bg-[#EFEBE0] text-xs font-semibold tracking-wide transition-colors cursor-pointer shrink-0"
                  >
                    Join
                  </button>
                </div>
                {error && <p className="text-xs text-[#F5C6AA]">{error}</p>}
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-[#F8F6EF]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A8B99A]">
          <p>© {new Date().getFullYear()} VERDANT MARKET. All rights reserved.</p>
          <p>Bengaluru · Mumbai · Chilled Farm-to-Kitchen Delivery</p>
        </div>
      </div>
    </footer>
  );
};
