import React, { useState } from 'react';
import { Scissors, ArrowUp, Send, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-ivory-200/90 text-charcoal border-t border-forest/15 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-forest/10">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-forest flex items-center justify-center text-ivory">
                <Scissors className="w-4 h-4 text-terracotta" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-forest">
                ReStylee
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-charcoal-muted max-w-sm leading-relaxed">
              An AI-augmented creative atelier and pattern engine transforming textile waste into bespoke, functional goods. Waste is a design opportunity.
            </p>

            <div className="pt-2 text-[11px] font-mono text-charcoal-muted space-y-1">
              <p>Studio Edition 2025 // Built for Circular Design</p>
              <p>Designed with natural cotton, linen & deadstock fibers</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-forest">
              Studio Navigation
            </h4>
            <ul className="space-y-2 text-xs text-charcoal-muted">
              <li>
                <a href="#studio-section" className="hover:text-forest transition-colors">
                  Interactive Fabric Studio
                </a>
              </li>
              <li>
                <a href="#recommendations-section" className="hover:text-forest transition-colors">
                  Upcycling Pattern Blueprints
                </a>
              </li>
              <li>
                <a href="#impact-section" className="hover:text-forest transition-colors">
                  Ecological Impact Simulator
                </a>
              </li>
              <li>
                <a href="#community-section" className="hover:text-forest transition-colors">
                  Community Maker Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-forest">
              The Circular Dispatch
            </h4>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Bi-weekly zero-waste pattern releases, boro stitch tutorials, and deadstock sourcing drops.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-sage/20 border border-sage/40 text-xs text-forest flex items-center gap-2">
                <Check className="w-4 h-4 text-forest" />
                <span>Subscribed! Welcome to the circular atelier dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="atelier@domain.com"
                  required
                  className="flex-grow bg-ivory border border-forest/20 rounded-xl px-3.5 py-2.5 text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-forest"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-forest text-ivory text-xs font-semibold hover:bg-forest-800 transition-colors flex items-center gap-1.5"
                >
                  <span>Join</span>
                  <Send className="w-3 h-3 text-terracotta" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-muted">
          <p>© {new Date().getFullYear()} ReStylee. All rights reserved. Zero-waste circular design prototype.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-forest transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-terracotta" />
          </button>
        </div>

      </div>
    </footer>
  );
};
