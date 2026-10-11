import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Scissors } from 'lucide-react';
import { SAMPLE_FABRICS } from '../data/mockFabrics';

interface HeroSectionProps {
  onStartUpload: () => void;
  onExploreIdeas: () => void;
  onSelectSampleFabric: (sampleId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartUpload,
  onExploreIdeas,
  onSelectSampleFabric,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-ivory">
      
      {/* Editorial Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-sage/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-terracotta/5 blur-3xl pointer-events-none" />

      {/* Subtle Stitch Grid / Blueprint lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#183d3208_1px,transparent_1px),linear-gradient(to_bottom,#183d3208_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Manifesto */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest/5 border border-forest/15 text-forest text-xs font-mono tracking-wider uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              <span>AI Textile Atelier & Circular Pattern Engine</span>
            </motion.div>

            {/* Main Editorial Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-forest leading-[1.08] tracking-tight"
            >
              Every fabric scrap has a second life waiting.
            </motion.h1>

            {/* Refined Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-charcoal-muted max-w-2xl font-normal leading-relaxed"
            >
              Turn leftover denim, linen offcuts, and thrifted yardage into tailored bags, bespoke accessories, and functional heirlooms. Upload your fabric remnant to generate zero-waste cutting layouts and step-by-step maker blueprints.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={onStartUpload}
                className="px-7 py-4 rounded-full bg-forest text-ivory text-sm sm:text-base font-medium shadow-warm hover:bg-forest-800 hover:shadow-warm-lg transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-98 group"
              >
                <Scissors className="w-4 h-4 text-terracotta group-hover:rotate-12 transition-transform" />
                <span>Upload Fabric & Scan Remnant</span>
                <ArrowRight className="w-4 h-4 text-sage group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreIdeas}
                className="px-7 py-4 rounded-full bg-ivory-100 border border-forest/20 text-forest text-sm sm:text-base font-medium hover:bg-forest/5 hover:border-forest/40 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Browse Upcycling Ideas</span>
              </button>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 border-t border-forest/10 grid grid-cols-3 gap-4 max-w-lg"
            >
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-forest">0%</span>
                <span className="text-xs text-charcoal-muted font-sans">Fabric Waste Goal</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-forest">2,840L</span>
                <span className="text-xs text-charcoal-muted font-sans">Avg Water Saved</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-bold text-forest">42+</span>
                <span className="text-xs text-charcoal-muted font-sans">Modular Blueprints</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Layered Textile Hero Composition */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              
              {/* Main Editorial Image Frame */}
              <div className="relative rounded-3xl overflow-hidden bg-ivory-200 border-2 border-forest/20 shadow-warm-lg p-2.5 bg-gradient-to-b from-ivory to-ivory-200">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80"
                    alt="Textile artisan working with layered natural linen and denim scraps"
                    className="w-full h-full object-cover filter contrast-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent opacity-60" />

                  {/* Floating Micro Badge on Image */}
                  <div className="absolute top-3.5 left-3.5 bg-ivory/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-forest/15 shadow-sm text-xs font-mono text-forest flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-forest animate-pulse"></span>
                    <span>AI Pattern Scanner Active</span>
                  </div>

                  {/* Caption on Bottom */}
                  <div className="absolute bottom-4 left-4 right-4 text-ivory">
                    <p className="font-serif text-lg font-bold leading-tight">
                      Raw Selvage Remnant → Modular Tote & Patchwork Vest
                    </p>
                    <p className="text-xs text-ivory-100 font-mono mt-1 opacity-90">
                      Japanese Boro Technique // Zero Waste Cutting
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Interactive Scrap Picker Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-8 -left-6 sm:-left-10 bg-ivory/95 backdrop-blur-md p-4 rounded-2xl border border-forest/20 shadow-warm max-w-xs sm:max-w-sm hidden sm:block"
              >
                <div className="flex items-center justify-between gap-2 mb-2.5 pb-2 border-b border-forest/10">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-charcoal-muted font-semibold">
                    Specimens In Atelier
                  </span>
                  <span className="text-[10px] text-terracotta font-mono font-bold">Try 1-Click</span>
                </div>

                <div className="flex gap-2">
                  {SAMPLE_FABRICS.slice(0, 3).map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => onSelectSampleFabric(sample.id)}
                      title={`Select ${sample.name}`}
                      className="group relative flex-1 text-left rounded-lg overflow-hidden border border-forest/15 hover:border-forest hover:scale-105 transition-all"
                    >
                      <div className="aspect-square w-full">
                        <img
                          src={sample.imageUrl}
                          alt={sample.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="block text-[9px] font-mono text-forest truncate px-1 py-0.5 bg-ivory">
                        {sample.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Verified Circular Stamp */}
              <div className="absolute -top-4 -right-4 sm:-right-6 w-20 h-20 rounded-full bg-terracotta text-ivory flex flex-col items-center justify-center p-2 text-center shadow-lg rotate-12 border-2 border-ivory">
                <span className="text-[9px] font-mono tracking-widest uppercase font-bold">CIRCULAR</span>
                <span className="font-serif text-xs font-bold leading-none">100%</span>
                <span className="text-[8px] font-sans opacity-90">REPURPOSED</span>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
