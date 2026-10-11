import React, { useState } from 'react';
import { Scissors, Sparkles, Menu, X, ArrowUpRight, Leaf } from 'lucide-react';

interface NavbarProps {
  onScrollToStudio: () => void;
  onScrollToIdeas: () => void;
  onScrollToImpact: () => void;
  onScrollToCommunity: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onScrollToStudio,
  onScrollToIdeas,
  onScrollToImpact,
  onScrollToCommunity,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-ivory/90 backdrop-blur-md border-b border-forest/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Atelier Tag */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center text-ivory shadow-md transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
                <Scissors className="w-5 h-5 text-terracotta transition-transform group-hover:scale-110" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-forest flex items-center gap-1.5">
                  ReStylee
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-terracotta"></span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-charcoal-muted font-medium">
                  Fabric Upcycling Studio
                </span>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-forest text-xs font-medium border border-sage/40">
              <Leaf className="w-3.5 h-3.5 text-forest" />
              <span>Waste is a design opportunity</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-charcoal">
            <button
              onClick={onScrollToStudio}
              className="text-charcoal hover:text-forest transition-colors flex items-center gap-1 hover:translate-y-[-1px]"
            >
              Fabric Studio
            </button>
            <button
              onClick={onScrollToIdeas}
              className="text-charcoal hover:text-forest transition-colors flex items-center gap-1 hover:translate-y-[-1px]"
            >
              Upcycling Ideas
            </button>
            <button
              onClick={onScrollToImpact}
              className="text-charcoal hover:text-forest transition-colors flex items-center gap-1 hover:translate-y-[-1px]"
            >
              Impact
            </button>
            <button
              onClick={onScrollToCommunity}
              className="text-charcoal hover:text-forest transition-colors flex items-center gap-1 hover:translate-y-[-1px]"
            >
              Makers
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onScrollToStudio}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest text-ivory text-sm font-medium transition-all duration-300 hover:bg-forest-800 hover:shadow-warm active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-terracotta animate-pulse" />
              <span>Scan Your Fabric</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-forest hover:bg-forest/5 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-forest/10 bg-ivory px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <button
            onClick={() => {
              onScrollToStudio();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-base font-medium text-charcoal hover:text-forest"
          >
            Fabric Studio
          </button>
          <button
            onClick={() => {
              onScrollToIdeas();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-base font-medium text-charcoal hover:text-forest"
          >
            Upcycling Ideas
          </button>
          <button
            onClick={() => {
              onScrollToImpact();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-base font-medium text-charcoal hover:text-forest"
          >
            Impact Calculator
          </button>
          <button
            onClick={() => {
              onScrollToCommunity();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-base font-medium text-charcoal hover:text-forest"
          >
            Community Makers
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                onScrollToStudio();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-forest text-ivory text-sm font-medium"
            >
              <Sparkles className="w-4 h-4 text-terracotta" />
              <span>Scan Your Fabric Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
