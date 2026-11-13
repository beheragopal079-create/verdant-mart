import React, { useEffect, useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { PageRoute } from './types';
import { CinematicIntro } from './components/CinematicIntro';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { AccountPage } from './pages/AccountPage';
import { Check, X } from 'lucide-react';

const INTRO_SESSION_KEY = 'verdant_intro_seen_v1';

const StorefrontShell: React.FC = () => {
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      const seen = sessionStorage.getItem(INTRO_SESSION_KEY);
      return !seen;
    } catch {
      return true;
    }
  });

  const [route, setRoute] = useState<PageRoute>({ page: 'home' });
  const [searchQuery, setSearchQuery] = useState('');
  const { toastMessage, dismissToast, setIsCartOpen } = useStore();

  const handleNavigate = (next: PageRoute) => {
    setRoute(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setIsCartOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6EF] text-[#1C2420] overflow-x-hidden">
      {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}

      <Navbar
        currentRoute={route}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {route.page === 'home' && <HomePage onNavigate={handleNavigate} />}
        {route.page === 'shop' && (
          <ShopPage
            initialCategory={route.category ?? 'All'}
            initialOffersOnly={route.offersOnly ?? false}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onNavigate={handleNavigate}
          />
        )}
        {route.page === 'product' && (
          <ProductDetailPage productId={route.productId} onNavigate={handleNavigate} />
        )}
        {route.page === 'cart' && <CartPage onNavigate={handleNavigate} />}
        {route.page === 'checkout' && <CheckoutPage onNavigate={handleNavigate} />}
        {route.page === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {route.page === 'contact' && <ContactPage />}
        {route.page === 'faq' && <FaqPage onNavigate={handleNavigate} />}
        {route.page === 'account' && <AccountPage onNavigate={handleNavigate} />}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onReplayIntro={() => setShowIntro(true)}
      />

      <CartDrawer onNavigate={handleNavigate} />

      {/* Subtle Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-3 px-4 py-3 rounded-sm bg-[#173D32] text-[#F8F6EF] border border-[#A8B99A]/30 shadow-xl text-xs font-medium"
        >
          <Check className="w-4 h-4 text-[#A8B99A] shrink-0" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={dismissToast}
            aria-label="Dismiss notification"
            className="p-1 text-[#A8B99A] hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StorefrontShell />
    </StoreProvider>
  );
}
