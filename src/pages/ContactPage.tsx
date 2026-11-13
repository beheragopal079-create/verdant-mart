import React, { useState } from 'react';
import { Check, Mail, MapPin, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Order & Delivery Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes('@') || message.trim().length < 10) {
      setError('Please complete your name, a valid email address, and a brief message.');
      return;
    }
    setError('');
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl pb-10 border-b border-[#E0DBD0]">
          <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#173D32]">
            Customer Care & Partnerships
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-[#1C2420]">
            Contact Us
          </h1>
          <p className="mt-3 text-base text-[#525B56]">
            Questions about seasonal harvest availability, chef wholesale crates, or your delivery window? Write to our kitchen concierge.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm space-y-5">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#173D32] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-[#1C2420]">Bengaluru Flagship Pantry</h2>
                  <p className="mt-1 text-sm text-[#525B56]">
                    12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#173D32] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-[#1C2420]">Mumbai Tasting Hub</h2>
                  <p className="mt-1 text-sm text-[#525B56]">
                    Pali Hill Lane, Bandra West, Mumbai 400050
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-5 h-5 text-[#173D32] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-[#1C2420]">Concierge Hours</h2>
                  <p className="mt-1 text-sm text-[#525B56]">
                    Monday – Sunday, 7:00 AM to 9:00 PM IST
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-[#173D32] shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-[#1C2420]">Direct Desk</h2>
                  <p className="mt-1 text-sm text-[#525B56]">care@verdantmarket.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7 bg-[#FBF9F4] border border-[#E0DBD0] rounded-sm p-6 sm:p-8">
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-sm bg-[#173D32] text-[#F8F6EF] flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h2 className="font-display text-2xl font-medium text-[#1C2420]">
                  Message Received
                </h2>
                <p className="text-sm text-[#525B56] max-w-md mx-auto">
                  Thank you for writing to VERDANT MARKET. Our concierge team replies within two hours during market operating hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-sm border border-[#173D32] text-[#173D32] text-xs font-medium hover:bg-[#EFEBE0] cursor-pointer"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-display text-2xl font-medium text-[#1C2420]">Send a Note</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-medium text-[#3D4641] mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full px-3.5 py-3 rounded-sm bg-[#F8F6EF] border border-[#D4CEC0] text-sm text-[#1C2420] focus:outline-none focus:border-[#173D32]"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-[#3D4641] mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full px-3.5 py-3 rounded-sm bg-[#F8F6EF] border border-[#D4CEC0] text-sm text-[#1C2420] focus:outline-none focus:border-[#173D32]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-topic" className="block text-xs font-medium text-[#3D4641] mb-1.5">
                    Inquiry Topic
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-sm bg-[#F8F6EF] border border-[#D4CEC0] text-sm text-[#1C2420] focus:outline-none focus:border-[#173D32]"
                  >
                    <option>Order & Delivery Inquiry</option>
                    <option>Farm & Producer Partnerships</option>
                    <option>Restaurant & Kitchen Wholesale</option>
                    <option>Freshness Guarantee Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-msg" className="block text-xs font-medium text-[#3D4641] mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can our market concierge help?"
                    className="w-full px-3.5 py-3 rounded-sm bg-[#F8F6EF] border border-[#D4CEC0] text-sm text-[#1C2420] focus:outline-none focus:border-[#173D32]"
                  />
                </div>

                {error && <p className="text-xs font-medium text-[#8E2424]">{error}</p>}

                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-sm bg-[#173D32] text-[#F8F6EF] hover:bg-[#0E2720] text-sm font-medium transition-colors cursor-pointer"
                >
                  Submit Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
