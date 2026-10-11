import React, { useState } from 'react';
import { Scissors, ArrowUp, Send, Info } from 'lucide-react';

const CURRENT_YEAR = 2026;

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submittedDemo, setSubmittedDemo] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmittedDemo(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-paper-200 text-charcoal border-t border-navy/15 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-navy/10">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-paper">
                <Scissors className="w-4 h-4 text-coral" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-navy">
                ReStylee
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-charcoal-muted max-w-sm leading-relaxed">
              An AI-augmented creative atelier and circular pattern simulator transforming textile offcuts into bespoke, functional goods. Waste is a design opportunity.
            </p>

            <div className="pt-2 text-[11px] font-mono text-charcoal-muted space-y-1">
              <p>Studio Edition // Built for Sustainable Fashion</p>
              <p>Tailored for denim, linen, and artisanal deadstock fibers</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-navy">
              Studio Navigation
            </h4>
            <ul className="space-y-2 text-xs text-charcoal-muted">
              <li>
                <a href="#studio-section" className="hover:text-navy transition-colors">
                  Interactive Fabric Studio
                </a>
              </li>
              <li>
                <a href="#recommendations-section" className="hover:text-navy transition-colors">
                  Upcycling Pattern Blueprints
                </a>
              </li>
              <li>
                <a href="#impact-section" className="hover:text-navy transition-colors">
                  Ecological Impact Model
                </a>
              </li>
              <li>
                <a href="#community-section" className="hover:text-navy transition-colors">
                  Community Maker Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Concept Form (Prototype) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-navy">
              The Circular Dispatch <span className="text-[10px] text-coral font-normal lowercase">(prototype form)</span>
            </h4>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Bi-weekly zero-waste pattern releases, boro stitch tutorials, and deadstock sourcing drops.
            </p>

            {submittedDemo ? (
              <div className="p-3 rounded-xl bg-bluegray border border-bluegray-300 text-xs text-navy flex items-start gap-2 animate-fadeIn">
                <Info className="w-4 h-4 text-denim flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Prototype notice:</strong> Thank you for testing. Subscription service is not connected in this demonstration.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <label htmlFor="newsletter-email-input" className="sr-only">Newsletter Email</label>
                <input
                  id="newsletter-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="atelier@domain.com"
                  required
                  className="flex-grow bg-paper border border-navy/20 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-navy"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-navy text-paper text-xs font-semibold hover:bg-navy-700 transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-denim"
                >
                  <span>Join</span>
                  <Send className="w-3 h-3 text-coral" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-muted">
          <p>© {CURRENT_YEAR} ReStylee. All rights reserved. Zero-waste circular design prototype.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-navy transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-denim"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-coral" />
          </button>
        </div>

      </div>
    </footer>
  );
};
