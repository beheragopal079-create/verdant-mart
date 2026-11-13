import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE, STORY_IMAGE } from '../data/products';
import { PageRoute } from '../types';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* Header */}
      <section className="py-14 lg:py-20 border-b border-[#E0DBD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#173D32]">
              Our Story · About VERDANT MARKET
            </p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl font-medium leading-[1.1] text-[#1C2420] text-balance">
              Rebuilding the bridge between conscientious growers and the daily table.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-[#525B56] leading-relaxed">
              Founded in 2024 across Bengaluru and Mumbai, VERDANT MARKET is an independent food purveyor built on a simple observation: great cooking begins with produce that has not spent a week under fluorescent warehouse lights.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial photo & narrative */}
      <section className="py-14 lg:py-20 border-b border-[#E0DBD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-[#E0DBD0]">
              <img
                src={STORY_IMAGE}
                alt="Freshly harvested produce at our partner farm"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-display text-3xl font-medium text-[#1C2420]">
              Harvested to order, never stockpiled.
            </h2>
            <p className="text-base text-[#3D4641] leading-relaxed">
              Every evening at 6:00 PM, our farm coordinators transmit the next morning’s harvest sheet directly to forty-two partner orchards, poly-houses, and regenerative vegetable plots—from Ratnagiri mango groves to Nilgiri berry slopes.
            </p>
            <p className="text-base text-[#3D4641] leading-relaxed">
              Produce is picked at sunrise, cooled gently within two hours of cutting, and packed into breathable paper and returnable insulated crates. By the time it reaches your doorstep, every tomato stem still smells of the vine.
            </p>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-14 lg:py-20 border-b border-[#E0DBD0] bg-[#F3EFE4]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-medium text-[#1C2420] mb-10">
            Our Three Sourcing Standards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#173D32]">01. Provenance</p>
              <h3 className="mt-2 font-display text-xl font-medium text-[#1C2420]">Single-Origin Transparency</h3>
              <p className="mt-3 text-sm text-[#525B56] leading-relaxed">
                Every item carries the exact region, farm or creamery name, and harvest window—whether Dehradun aged basmati or Idukki estate cacao.
              </p>
            </div>
            <div className="p-7 bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#173D32]">02. Craftsmanship</p>
              <h3 className="mt-2 font-display text-xl font-medium text-[#1C2420]">Unrushed Preparation</h3>
              <p className="mt-3 text-sm text-[#525B56] leading-relaxed">
                48-hour sourdough fermentation, slow bilona cultured ghee, and first-press cold extraction—never industrial shortcuts or artificial stabilizers.
              </p>
            </div>
            <div className="p-7 bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm">
              <p className="text-xs font-semibold tracking-wider uppercase text-[#173D32]">03. Stewardship</p>
              <h3 className="mt-2 font-display text-xl font-medium text-[#1C2420]">Plastic-Light Logistics</h3>
              <p className="mt-3 text-sm text-[#525B56] leading-relaxed">
                Glass jars, dark UV bottles, molded pulp cartons, and reusable beeswax wraps keep single-use plastics out of your kitchen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <h2 className="font-display text-3xl font-medium text-[#1C2420]">
              Taste the difference in this week’s harvest.
            </h2>
            <p className="mt-3 text-base text-[#525B56]">
              Explore all twenty-four curated pantry, bakery, dairy, and orchard selections.
            </p>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'shop', category: 'All' })}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-[#173D32] text-[#F8F6EF] hover:bg-[#0E2720] text-sm font-medium transition-colors cursor-pointer"
            >
              <span>Shop the Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-[16/9] rounded-sm overflow-hidden border border-[#E0DBD0]">
              <img
                src={HERO_IMAGE}
                alt="Curated basket of seasonal vegetables and pantry staples"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
