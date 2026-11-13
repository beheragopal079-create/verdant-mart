import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/products';
import { PageRoute } from '../types';

interface FaqPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);
  const [filter, setFilter] = useState<'All' | 'Sourcing' | 'Delivery' | 'Orders & Demo'>('All');

  const visible = FAQ_ITEMS.filter((item) => (filter === 'All' ? true : item.category === filter));

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-8 border-b border-[#E0DBD0]">
          <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#173D32]">
            Help & Standards
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-[#1C2420]">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-base text-[#525B56]">
            Everything you need to know about our farm harvest windows, cold-chain delivery, and demo storefront.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {(['All', 'Sourcing', 'Delivery', 'Orders & Demo'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-sm text-xs font-medium transition-colors cursor-pointer ${
                filter === tab
                  ? 'bg-[#173D32] text-[#F8F6EF]'
                  : 'bg-[#FBF9F4] border border-[#E0DBD0] text-[#3D4641] hover:border-[#173D32]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8 bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm divide-y divide-[#E0DBD0]">
          {visible.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? '' : item.id)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#F3EFE4]/60 transition-colors"
                >
                  <div>
                    <span className="text-xs text-[#525B56] block mb-1">{item.category}</span>
                    <span className="font-display text-lg font-medium text-[#1C2420]">{item.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#173D32] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-[#3D4641] leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-6 bg-[#EFEBE0] border border-[#E0DBD0] rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-medium text-[#1C2420]">Still have a question?</h2>
            <p className="text-sm text-[#525B56] mt-0.5">Our concierge team is happy to assist you.</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate({ page: 'contact' })}
            className="px-5 py-3 rounded-sm bg-[#173D32] text-[#F8F6EF] hover:bg-[#0E2720] text-xs font-medium tracking-wide transition-colors cursor-pointer shrink-0"
          >
            Contact Concierge
          </button>
        </div>
      </div>
    </div>
  );
};
