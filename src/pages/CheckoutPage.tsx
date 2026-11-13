import React, { useState } from 'react';
import { Check, Info, ArrowRight, ShoppingBag } from 'lucide-react';
import { formatINR, useStore } from '../context/StoreContext';
import { DemoOrder, PageRoute } from '../types';

interface CheckoutPageProps {
  onNavigate: (route: PageRoute) => void;
}

const DELIVERY_SLOTS = [
  'Tomorrow Morning (7:00 AM – 10:00 AM)',
  'Tomorrow Midday (11:00 AM – 2:00 PM)',
  'Tomorrow Evening (5:00 PM – 8:00 PM)',
];

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const {
    detailedCartItems,
    subtotal,
    deliveryFee,
    totalSavings,
    grandTotal,
    placeDemoOrder,
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Bengaluru');
  const [pincode, setPincode] = useState('');
  const [deliverySlot, setDeliverySlot] = useState(DELIVERY_SLOTS[0]);
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery (Demo)' | 'UPI Simulation (Demo)'>(
    'Cash on Delivery (Demo)'
  );
  const [formError, setFormError] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<DemoOrder | null>(null);

  if (confirmedOrder) {
    return (
      <div className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm p-8 sm:p-10 space-y-6">
            <div className="flex items-start gap-4 pb-6 border-b border-[#E0DBD0]">
              <div className="w-11 h-11 rounded-sm bg-[#173D32] text-[#F8F6EF] flex items-center justify-center shrink-0">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#173D32]">
                  Demo Order Receipt · No Real Order Placed
                </p>
                <h1 className="mt-1 font-display text-2xl sm:text-3xl font-medium text-[#1C2420]">
                  Order {confirmedOrder.id} Confirmed (Demo)
                </h1>
                <p className="mt-1.5 text-sm text-[#525B56]">
                  Thank you, {confirmedOrder.customerName}. This confirmation simulates our chilled dispatch receipt and has been saved to your local Account history.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#525B56]">Delivery Recipient</p>
                <p className="mt-1 font-medium text-[#1C2420]">{confirmedOrder.customerName}</p>
                <p className="text-[#525B56] tabular-nums">{confirmedOrder.phone}</p>
                <p className="mt-1 text-[#3D4641]">
                  {confirmedOrder.address}, {confirmedOrder.city} — {confirmedOrder.pincode}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#525B56]">Scheduled Window & Method</p>
                <p className="mt-1 font-medium text-[#1C2420]">{confirmedOrder.deliverySlot}</p>
                <p className="mt-1 text-[#525B56]">{confirmedOrder.paymentMethod}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E0DBD0]">
              <p className="text-xs uppercase tracking-wider text-[#525B56] mb-3">Items Summary</p>
              <ul className="divide-y divide-[#E8E3D8] text-sm">
                {confirmedOrder.items.map((item) => (
                  <li key={item.productId} className="py-2.5 flex items-center justify-between gap-4">
                    <span className="text-[#1C2420]">
                      {item.name} <span className="text-[#525B56]">({item.unit}) × {item.quantity}</span>
                    </span>
                    <span className="tabular-nums font-medium text-[#1C2420]">
                      {formatINR(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-[#E0DBD0] space-y-1.5 text-sm">
                <div className="flex justify-between text-[#525B56]">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{formatINR(confirmedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#525B56]">
                  <span>Chilled Delivery</span>
                  <span className="tabular-nums">
                    {confirmedOrder.deliveryFee === 0 ? 'Complimentary' : formatINR(confirmedOrder.deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-base text-[#1C2420] pt-1">
                  <span>Demo Order Total</span>
                  <span className="tabular-nums">{formatINR(confirmedOrder.total)}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onNavigate({ page: 'shop', category: 'All' })}
                className="px-6 py-3 rounded-sm bg-[#173D32] text-[#F8F6EF] hover:bg-[#0E2720] text-sm font-medium transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
              <button
                type="button"
                onClick={() => onNavigate({ page: 'account' })}
                className="px-6 py-3 rounded-sm border border-[#D4CEC0] text-[#1C2420] hover:bg-[#EFEBE0] text-sm font-medium transition-colors cursor-pointer"
              >
                View Demo Order History
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || customerName.trim().length < 2) {
      setFormError('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!address.trim() || address.trim().length < 8) {
      setFormError('Please enter a complete street and apartment delivery address.');
      return;
    }
    if (!/^\d{6}$/.test(pincode.trim())) {
      setFormError('Please enter a valid 6-digit PIN code.');
      return;
    }

    setFormError('');
    const order = placeDemoOrder({
      customerName: customerName.trim(),
      phone: cleanPhone,
      address: address.trim(),
      city: city.trim(),
      pincode: pincode.trim(),
      deliverySlot,
      paymentMethod,
    });
    setConfirmedOrder(order);
  };

  return (
    <div className="py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Explicit Demo Banner */}
        <div className="mb-8 p-4 rounded-sm bg-[#EFEBE0] border border-[#173D32]/30 flex items-start gap-3">
          <Info className="w-5 h-5 text-[#173D32] shrink-0 mt-0.5" />
          <div className="text-sm text-[#1C2420]">
            <p className="font-semibold text-[#173D32]">
              DEMO CHECKOUT — Simulation Mode Only
            </p>
            <p className="text-xs text-[#3D4641] mt-0.5">
              This is a demonstration checkout for VERDANT MARKET. No payment credentials are collected, no charges are made, and no real delivery is dispatched.
            </p>
          </div>
        </div>

        <div className="pb-6 border-b border-[#E0DBD0]">
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-[#1C2420]">
            Demo Checkout
          </h1>
        </div>

        {detailedCartItems.length === 0 ? (
          <div className="my-10 py-16 px-6 bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm text-center">
            <ShoppingBag className="w-8 h-8 text-[#173D32] mx-auto mb-3" />
            <h2 className="font-display text-2xl font-medium text-[#1C2420]">
              Your basket is empty
            </h2>
            <p className="mt-2 text-sm text-[#525B56]">
              Add fresh produce or pantry items to test the demo checkout flow.
            </p>
            <button
              type="button"
              onClick={() => onNavigate({ page: 'shop', category: 'All' })}
              className="mt-6 px-6 py-3 rounded-sm bg-[#173D32] text-[#F8F6EF] text-sm font-medium cursor-pointer"
            >
              Browse Shop
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Customer & Delivery Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="font-display text-xl font-medium text-[#1C2420]">
                  1. Customer & Delivery Details
                </h2>
                <p className="mt-1 text-xs text-[#525B56]">
                  All fields below are used strictly to generate your sample demo receipt.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="vm-name" className="block text-xs font-medium text-[#3D4641] mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="vm-name"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ananya Deshmukh"
                    className="w-full px-3.5 py-3 rounded-sm bg-[#F8F6EF] border border-[#D4CEC0] text-sm text-[#1C2420] focus:outline-none focus:border-[#173D32]"
                  />
                </div>

                <div>
                  <label htmlFor="vm-phone" className="block text-xs font-medium text-[#3D4641] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    id="vm-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-3 rounded-sm bg-[#F8F6EF] border border-[#D4CEC0] text-sm text-[#1C2420] tabular-nums focus:outline-none focus:border-[#173D32]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="vm-address" className="block text-xs font-medium text-[#3D4641] mb-1.5">
                  Delivery Address
                </label>
                <textarea
                  id="vm-address"
                  rows={3}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House / Flat No., Building, Street, Landmark"
                  className="w-full px-3.5 py-3 rounded-sm bg-[#F8F6EF] border border-[#D4CEC0] text-sm text-[#1C2420] focus:outline-none focus:border-[#173D32]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="vm-city" className="block text-xs font-medium text-[#3D4641] mb-1.5">
                    City
                  </label>
                  <select
                    id="vm-city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-sm bg-[#F8F6EF] border border-[#D4CEC0] text-sm text-[#1C2420] focus:outline-none focus:border-[#173D32]"
                  >
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Chennai">Chennai</option>
                    <option value="New Delhi">New Delhi</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="vm-pin" className="block text-xs font-medium text-[#3D4641] mb-1.5">
                    PIN Code
                  </label>
                  <input
                    id="vm-pin"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="e.g. 560038"
                    className="w-full px-3.5 py-3 rounded-sm bg-[#F8F6EF] border border-[#D4CEC0] text-sm text-[#1C2420] tabular-nums focus:outline-none focus:border-[#173D32]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E0DBD0]">
                <h2 className="font-display text-xl font-medium text-[#1C2420] mb-3">
                  2. Chilled Delivery Information
                </h2>
                <div className="space-y-2.5">
                  {DELIVERY_SLOTS.map((slot) => (
                    <label
                      key={slot}
                      className={`flex items-center gap-3 p-3.5 rounded-sm border cursor-pointer transition-colors ${
                        deliverySlot === slot
                          ? 'bg-[#EFEBE0] border-[#173D32]'
                          : 'bg-[#F8F6EF] border-[#D4CEC0] hover:border-[#173D32]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deliverySlot"
                        checked={deliverySlot === slot}
                        onChange={() => setDeliverySlot(slot)}
                        className="accent-[#173D32]"
                      />
                      <span className="text-sm text-[#1C2420]">{slot}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E0DBD0]">
                <h2 className="font-display text-xl font-medium text-[#1C2420] mb-3">
                  3. Demo Payment Selection (No Credentials Needed)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(['Cash on Delivery (Demo)', 'UPI Simulation (Demo)'] as const).map((method) => (
                    <label
                      key={method}
                      className={`flex items-center gap-3 p-3.5 rounded-sm border cursor-pointer transition-colors ${
                        paymentMethod === method
                          ? 'bg-[#EFEBE0] border-[#173D32]'
                          : 'bg-[#F8F6EF] border-[#D4CEC0] hover:border-[#173D32]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                        className="accent-[#173D32]"
                      />
                      <span className="text-sm text-[#1C2420]">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formError && (
                <div className="p-3.5 rounded-sm bg-[#FDF2F2] border border-[#E5A9A9] text-xs font-medium text-[#8E2424]">
                  {formError}
                </div>
              )}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-sm bg-[#173D32] text-[#F8F6EF] hover:bg-[#0E2720] text-sm font-medium tracking-wide transition-colors cursor-pointer"
              >
                <span>Place Demo Order — {formatINR(grandTotal)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Right: Order Summary */}
            <aside className="lg:col-span-5 bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm p-6 sm:p-8 space-y-5 lg:sticky lg:top-24">
              <h2 className="font-display text-xl font-medium text-[#1C2420]">Order Summary</h2>

              <ul className="divide-y divide-[#E8E3D8] max-h-80 overflow-y-auto pr-1">
                {detailedCartItems.map(({ product, quantity, lineTotal }) => (
                  <li key={product.id} className="py-3.5 flex items-center gap-3.5">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-12 rounded-sm object-cover bg-[#EFEBE0] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1C2420] truncate">{product.name}</p>
                      <p className="text-xs text-[#525B56] tabular-nums">
                        {product.unit} × {quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold tabular-nums text-[#1C2420]">
                      {formatINR(lineTotal)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-[#E0DBD0] space-y-2.5 text-sm">
                <div className="flex justify-between text-[#525B56]">
                  <span>Items Subtotal</span>
                  <span className="tabular-nums text-[#1C2420]">{formatINR(subtotal)}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-[#173D32]">
                    <span>Seasonal Offers Savings</span>
                    <span className="tabular-nums">−{formatINR(totalSavings)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#525B56]">
                  <span>Insulated Delivery Fee</span>
                  <span className="tabular-nums text-[#1C2420]">
                    {deliveryFee === 0 ? 'Complimentary' : formatINR(deliveryFee)}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#E0DBD0] flex justify-between font-semibold text-lg text-[#1C2420]">
                  <span>Total (Demo)</span>
                  <span className="tabular-nums">{formatINR(grandTotal)}</span>
                </div>
              </div>

              <div className="p-4 rounded-sm bg-[#F1EDE2] border border-[#E0DBD0] text-xs text-[#3D4641] leading-relaxed">
                Complimentary chilled delivery applies automatically on baskets of ₹999 or more. Returnable crates are collected on your next order.
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};
