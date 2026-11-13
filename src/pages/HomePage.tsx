import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { CATEGORIES, HERO_IMAGE, PRODUCTS, STORY_IMAGE, TESTIMONIALS } from '../data/products';
import { CategoryId, PageRoute } from '../types';
import { ProductCard } from '../components/ProductCard';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [editorialTab, setEditorialTab] = useState<'seasonal' | 'offers'>('seasonal');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const bestsellers = PRODUCTS.filter((p) => p.bestseller).slice(0, 4);
  const seasonalProducts = PRODUCTS.filter((p) => p.seasonal).slice(0, 4);
  const offerProducts = PRODUCTS.filter((p) => p.specialOffer).slice(0, 4);

  const displayedCurated = editorialTab === 'seasonal' ? seasonalProducts : offerProducts;

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setNewsletterError('');
    setNewsletterDone(true);
    setNewsletterEmail('');
  };

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="border-b border-[#E0DBD0] bg-[#F8F6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Editorial Copy */}
            <div className="lg:col-span-5 flex flex-col justify-center py-2 lg:py-6">
              <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#173D32]">
                Verdant Market · Freshness, thoughtfully delivered
              </p>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.08] tracking-tight text-[#1C2420] text-balance">
                A Better Way to Shop Fresh.
              </h1>
              <p className="mt-5 text-base sm:text-lg text-[#525B56] leading-relaxed max-w-lg">
                Discover thoughtfully selected everyday essentials, fresh produce and pantry favourites.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'shop', category: 'All' })}
                  className="inline-flex items-center gap-2 px-6 py-3.5 min-h-[44px] rounded-sm bg-[#173D32] text-[#F8F6EF] hover:bg-[#0E2720] text-sm font-medium tracking-wide transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'about' })}
                  className="inline-flex items-center px-6 py-3.5 min-h-[44px] rounded-sm border border-[#173D32]/35 text-[#173D32] hover:bg-[#EFEBE0] text-sm font-medium tracking-wide transition-colors cursor-pointer whitespace-nowrap"
                >
                  Our Story
                </button>
              </div>
            </div>

            {/* Large Photographic Composition */}
            <div className="lg:col-span-7">
              <div className="relative h-72 sm:h-96 lg:h-full min-h-[380px] rounded-sm overflow-hidden border border-[#E0DBD0] bg-[#EFEBE0]">
                <img
                  src={HERO_IMAGE}
                  alt="Freshly harvested heirloom tomatoes, leafy greens, Alphonso mangoes, sourdough bread and olive oil on limestone"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Full-width Value Strip below split */}
          <div className="mt-10 pt-8 border-t border-[#E0DBD0] grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="font-semibold text-[#1C2420] tabular-nums">18–36 Hour Harvest</p>
              <p className="mt-0.5 text-xs text-[#525B56]">Direct from partner orchards & farms</p>
            </div>
            <div>
              <p className="font-semibold text-[#1C2420] tabular-nums">Free Delivery Over ₹999</p>
              <p className="mt-0.5 text-xs text-[#525B56]">Insulated chilled crates to your door</p>
            </div>
            <div>
              <p className="font-semibold text-[#1C2420]">Morning Stone-Hearth Bake</p>
              <p className="mt-0.5 text-xs text-[#525B56]">48-hour fermented loaves dispatched at dawn</p>
            </div>
            <div>
              <p className="font-semibold text-[#1C2420]">Plastic-Light Packing</p>
              <p className="mt-0.5 text-xs text-[#525B56]">Breathable paper & returnable baskets</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories */}
      <section className="py-16 lg:py-20 border-b border-[#E0DBD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#525B56]">
                Curated Departments
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-medium text-[#1C2420]">
                Featured Categories
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'shop', category: 'All' })}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#173D32] hover:underline underline-offset-4 cursor-pointer self-start sm:self-auto"
            >
              <span>Shop all 24 items</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onNavigate({ page: 'shop', category: cat.id as CategoryId })}
                className="group text-left bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm overflow-hidden hover:border-[#173D32]/50 transition-all cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#EFEBE0]">
                  <img
                    src={cat.image}
                    alt={cat.id}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-base sm:text-lg font-medium text-[#1C2420] group-hover:text-[#173D32] transition-colors">
                    {cat.id}
                  </h3>
                  <p className="mt-1 text-xs text-[#525B56] line-clamp-1">{cat.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Bestselling Products */}
      <section className="py-16 lg:py-20 border-b border-[#E0DBD0] bg-[#F3EFE4]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#525B56]">
                Kitchen Staples
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-medium text-[#1C2420]">
                Bestselling Products
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'shop', category: 'All' })}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#173D32] hover:underline underline-offset-4 cursor-pointer self-start sm:self-auto"
            >
              <span>Browse full catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenProduct={(id) => onNavigate({ page: 'product', productId: id })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Seasonal Selections & Special Offers */}
      <section className="py-16 lg:py-20 border-b border-[#E0DBD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#525B56]">
                Curated Harvest Edit
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-medium text-[#1C2420]">
                {editorialTab === 'seasonal' ? 'Seasonal Selections' : 'Special Offers'}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="inline-flex p-1 bg-[#EFEBE0] border border-[#E0DBD0] rounded-sm">
                <button
                  type="button"
                  onClick={() => setEditorialTab('seasonal')}
                  className={`px-4 py-2 text-xs font-medium rounded-sm transition-colors cursor-pointer whitespace-nowrap ${
                    editorialTab === 'seasonal'
                      ? 'bg-[#173D32] text-[#F8F6EF]'
                      : 'text-[#525B56] hover:text-[#1C2420]'
                  }`}
                >
                  Seasonal Selections
                </button>
                <button
                  type="button"
                  onClick={() => setEditorialTab('offers')}
                  className={`px-4 py-2 text-xs font-medium rounded-sm transition-colors cursor-pointer whitespace-nowrap ${
                    editorialTab === 'offers'
                      ? 'bg-[#173D32] text-[#F8F6EF]'
                      : 'text-[#525B56] hover:text-[#1C2420]'
                  }`}
                >
                  Special Offers
                </button>
              </div>

              <button
                type="button"
                onClick={() =>
                  onNavigate({
                    page: 'shop',
                    category: 'All',
                    offersOnly: editorialTab === 'offers',
                  })
                }
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#173D32] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap"
              >
                <span>View all {editorialTab === 'offers' ? 'offers' : 'seasonal'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedCurated.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenProduct={(id) => onNavigate({ page: 'product', productId: id })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Brand Story Section */}
      <section className="py-16 lg:py-24 border-b border-[#E0DBD0] bg-[#173D32] text-[#F8F6EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-6">
              <div className="h-80 sm:h-96 lg:h-full min-h-[380px] rounded-sm overflow-hidden border border-[#A8B99A]/30">
                <img
                  src={STORY_IMAGE}
                  alt="Partner organic farm harvest table with fresh kale, heirloom tomatoes and purple carrots"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center py-2">
              <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#A8B99A]">
                Our Philosophy
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-medium leading-tight text-balance">
                Grown with patience, delivered with care.
              </h2>
              <p className="mt-5 text-base text-[#F8F6EF]/85 leading-relaxed">
                VERDANT MARKET began with a quiet conviction: everyday groceries deserve the same provenance and craftsmanship as a fine kitchen. We partner directly with forty-two smallholder orchards, pasture dairies, and artisan millers across India—eliminating middlemen warehouses so produce arrives crisp within hours of harvest.
              </p>

              <div className="mt-8 pt-8 border-t border-[#F8F6EF]/15 grid grid-cols-3 gap-6">
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-medium tabular-nums text-[#F8F6EF]">42</p>
                  <p className="mt-1 text-xs text-[#A8B99A]">Partner Family Farms</p>
                </div>
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-medium tabular-nums text-[#F8F6EF]">24h</p>
                  <p className="mt-1 text-xs text-[#A8B99A]">Avg. Field-to-Door Window</p>
                </div>
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-medium tabular-nums text-[#F8F6EF]">100%</p>
                  <p className="mt-1 text-xs text-[#A8B99A]">Origin-Traceable Lots</p>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'about' })}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-[#F8F6EF] text-[#173D32] hover:bg-[#EFEBE0] text-sm font-medium transition-colors cursor-pointer"
                >
                  <span>Read Our Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Testimonials */}
      <section className="py-16 lg:py-20 border-b border-[#E0DBD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#525B56]">
              From Our Kitchens
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-medium text-[#1C2420]">
              Trusted by Home Cooks & Chefs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item) => (
              <blockquote
                key={item.id}
                className="flex flex-col justify-between p-7 bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm"
              >
                <p className="text-sm sm:text-base text-[#1C2420] leading-relaxed">
                  “{item.quote}”
                </p>
                <footer className="mt-6 pt-5 border-t border-[#E8E3D8]">
                  <p className="font-display text-base font-medium text-[#1C2420]">{item.name}</p>
                  <p className="text-xs text-[#525B56] mt-0.5">
                    {item.role} · {item.city}
                  </p>
                  <p className="text-xs font-medium text-[#173D32] mt-2">{item.outcome}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Newsletter Subscription */}
      <section className="py-16 lg:py-20 bg-[#EFEBE0]/70">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#173D32]">
            The Weekly Harvest Letter
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-medium text-[#1C2420] text-balance">
            First word on seasonal arrivals and orchard drops.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#525B56] max-w-xl mx-auto">
            One calm Sunday morning note covering what just came into peak season—never daily promotional clutter.
          </p>

          {newsletterDone ? (
            <div className="mt-8 inline-flex items-center gap-2.5 px-6 py-4 rounded-sm bg-[#173D32] text-[#F8F6EF] text-sm font-medium">
              <Check className="w-4 h-4 text-[#A8B99A]" />
              <span>You are subscribed to the Sunday Harvest Letter.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="mt-8 max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  aria-label="Email address for weekly harvest letter"
                  className="flex-1 px-4 py-3.5 rounded-sm bg-[#F8F6EF] border border-[#D4CEC0] text-sm text-[#1C2420] placeholder-[#6B746E] focus:outline-none focus:border-[#173D32]"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 min-h-[44px] rounded-sm bg-[#173D32] text-[#F8F6EF] hover:bg-[#0E2720] text-sm font-medium tracking-wide transition-colors cursor-pointer whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              {newsletterError && <p className="mt-2 text-xs text-[#9B2C2C] text-left">{newsletterError}</p>}
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
