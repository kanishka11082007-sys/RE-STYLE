import React, { useState } from 'react';
import { Sparkles, Clock, Repeat } from 'lucide-react';
import { COMMUNITY_MAKES } from '../data/communityMakes';

export const CommunityShowcase: React.FC = () => {
  const [activeViews, setActiveViews] = useState<Record<string, 'after' | 'before'>>({
    'make-1': 'after',
    'make-2': 'after',
    'make-3': 'after',
  });

  const toggleView = (id: string) => {
    setActiveViews((prev) => ({
      ...prev,
      [id]: prev[id] === 'after' ? 'before' : 'after',
    }));
  };

  return (
    <section id="community-section" className="py-20 lg:py-28 bg-ivory-100 border-t border-forest/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 text-forest text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              <span>Community Atelier Gallery</span>
            </div>
            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl text-forest font-semibold leading-tight">
              Before Scraps. After Wonders.
            </h2>
            <p className="mt-3 text-base text-charcoal-muted max-w-2xl">
              See what independent makers and sustainable ateliers crafted using ReStylee zero-waste blueprints. Toggle between the raw remnant and the finished piece.
            </p>
          </div>

          <div className="text-xs text-charcoal-muted font-mono bg-ivory p-3 rounded-2xl border border-forest/10 flex items-center gap-2">
            <Repeat className="w-4 h-4 text-terracotta" />
            <span>Click &quot;Flip View&quot; on any card to see original scraps</span>
          </div>
        </div>

        {/* 3-Column Community Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COMMUNITY_MAKES.map((make) => {
            const currentView = activeViews[make.id] || 'after';

            return (
              <div
                key={make.id}
                className="bg-ivory rounded-3xl overflow-hidden border border-forest/15 shadow-warm hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  
                  {/* Image View with Toggle Button */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-ivory-200">
                    <img
                      src={currentView === 'after' ? make.afterMakeUrl : make.beforeScrapUrl}
                      alt={make.projectName}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent opacity-80" />

                    {/* Floating Toggle View Pill */}
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => toggleView(make.id)}
                        className="px-3 py-1.5 rounded-full bg-ivory/90 backdrop-blur-md text-forest text-xs font-semibold shadow hover:bg-forest hover:text-ivory transition-colors flex items-center gap-1.5"
                      >
                        <Repeat className="w-3 h-3 text-terracotta" />
                        <span>Flip: {currentView === 'after' ? 'Show Raw Scrap' : 'Show Finished Make'}</span>
                      </button>
                    </div>

                    {/* State Tag */}
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold bg-forest/80 text-ivory backdrop-blur-xs border border-ivory/20">
                        {currentView === 'after' ? '★ Finished Creation' : '✂ Original Raw Remnant'}
                      </span>
                    </div>

                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    
                    {/* Maker Info */}
                    <div className="flex items-center gap-3">
                      <img
                        src={make.avatarUrl}
                        alt={make.makerName}
                        className="w-10 h-10 rounded-full object-cover border border-forest/20"
                      />
                      <div>
                        <h4 className="font-serif text-sm font-bold text-forest">{make.makerName}</h4>
                        <span className="text-[11px] text-charcoal-muted font-mono">{make.makerHandle}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-serif text-lg font-bold text-forest leading-snug">
                        {make.projectName}
                      </h3>
                      <p className="text-xs text-charcoal-muted mt-1 font-mono">
                        Source: {make.fabricOrigin}
                      </p>
                    </div>

                    {/* Quote */}
                    <blockquote className="p-3.5 rounded-xl bg-ivory-100 border border-forest/10 text-xs text-charcoal leading-relaxed italic">
                      &ldquo;{make.quote}&rdquo;
                    </blockquote>

                  </div>

                </div>

                {/* Footer Metrics */}
                <div className="p-6 pt-0 border-t border-forest/10 mt-2 flex items-center justify-between text-xs text-charcoal-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-sage-600" />
                    {make.timeSpent}
                  </span>
                  <span className="font-mono text-terracotta font-semibold">
                    +{make.fabricSavedGrams}g Saved from Landfill
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
