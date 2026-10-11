import React from 'react';
import { Sparkles, Quote } from 'lucide-react';

export const ManifestoSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-paper border-t border-navy/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-surface rounded-3xl p-8 sm:p-14 border border-navy/15 relative overflow-hidden shadow-warm">
          
          {/* Subtle watermark quote */}
          <Quote className="absolute -bottom-10 -right-10 w-64 h-64 text-navy/[0.03] pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10">
            
            <div className="flex items-center gap-2 text-xs font-mono text-coral tracking-wider uppercase font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>The ReStylee Circular Manifesto</span>
            </div>

            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl text-navy font-semibold leading-tight">
              &ldquo;We don&apos;t need more virgin cotton. We need more imagination.&rdquo;
            </h2>

            <div className="space-y-4 text-base text-charcoal-muted leading-relaxed font-normal">
              <p>
                In standard commercial fashion, 15% of all woven textile yardage is discarded on cutting room floors before a garment ever reaches a hanger. At home, drawers are filled with worn-out denim, heirloom curtains, and linen napkins that have lost their pairs.
              </p>
              <p>
                ReStylee exists to close this circuit. By pairing geometric cutting layouts with time-tested repair traditions—such as Japanese <em>boro</em>, Indian <em>kantha</em>, and modular origami folding—we turn discarded offcuts into functional, durable heirlooms.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-navy font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-navy"></span>
                HONOR THE FIBER
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-coral"></span>
                CELEBRATE THE SEAM
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gold"></span>
                NEVER CONDEMN TO LANDFILL
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
