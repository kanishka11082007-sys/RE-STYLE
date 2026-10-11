import React, { useState } from 'react';
import { 
  Droplets, 
  CloudRain, 
  Scissors, 
  Trash, 
  RefreshCw, 
  Sparkles,
  TreePine
} from 'lucide-react';

export const ImpactSection: React.FC = () => {
  const [scrapWeightGrams, setScrapWeightGrams] = useState<number>(450);

  // Ecological formula calculations based on fashion textile research:
  // - 1kg virgin textile production consumes ~10,000L of water (cotton average)
  // - 1kg textile generates ~15kg CO2e emissions (weaving, processing, dyeing, transport)
  // - 1kg kept from landfill saves municipal waste processing and methane generation
  const waterSavedLiters = Math.round((scrapWeightGrams / 1000) * 8500);
  const carbonSavedKg = ((scrapWeightGrams / 1000) * 12.8).toFixed(1);
  const landfillSavedKg = (scrapWeightGrams / 1000).toFixed(2);
  const equivalentDaysDrinkingWater = Math.round(waterSavedLiters / 2.5);

  return (
    <section id="impact-section" className="py-20 lg:py-28 bg-forest text-ivory relative overflow-hidden">
      
      {/* Decorative Textile Grid & Organic Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-sage/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-terracotta/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ivory/10 border border-ivory/20 text-ivory-100 text-xs font-mono uppercase tracking-wider mb-4">
            <TreePine className="w-3.5 h-3.5 text-sage" />
            <span>Ecological Accounting Engine</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-ivory">
            Calculate the earth spared by your stitch.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-ivory-200/90 leading-relaxed font-normal">
            Every square inch of deadstock or denim remnant diverted from a landfill saves the immense water, pesticide, and carbon cost of manufacturing virgin fiber.
          </p>
        </div>

        {/* Interactive Scrap Weight Slider Card */}
        <div className="bg-forest-800/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-ivory/15 shadow-2xl max-w-4xl mx-auto mb-14">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono tracking-wider uppercase text-sage font-semibold">
                Adjust Remnant Weight in Your Atelier
              </span>
              <h3 className="font-serif text-2xl font-bold text-ivory mt-1">
                {scrapWeightGrams} Grams of Repurposed Fabric
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {[150, 450, 1000, 2500].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setScrapWeightGrams(preset)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    scrapWeightGrams === preset
                      ? 'bg-terracotta text-ivory font-bold'
                      : 'bg-ivory/10 hover:bg-ivory/20 text-ivory-200'
                  }`}
                >
                  {preset < 1000 ? `${preset}g` : `${preset / 1000}kg`}
                </button>
              ))}
            </div>
          </div>

          {/* Slider Control */}
          <div className="space-y-2">
            <input
              type="range"
              min="50"
              max="3000"
              step="25"
              value={scrapWeightGrams}
              onChange={(e) => setScrapWeightGrams(Number(e.target.value))}
              className="w-full h-2.5 bg-forest-900 rounded-lg appearance-none cursor-pointer accent-terracotta"
            />
            <div className="flex justify-between text-[11px] font-mono text-ivory-200/70">
              <span>Small Pocket Scrap (50g)</span>
              <span>1 Pair of Denim Jeans (~700g)</span>
              <span>Heavy Blanket Yardage (3,000g)</span>
            </div>
          </div>

          {/* Interactive Calculation Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-ivory/10">
            
            {/* Water Saved */}
            <div className="p-5 rounded-2xl bg-forest-900/60 border border-ivory/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-sage/20 text-sage flex items-center justify-center mb-3">
                  <Droplets className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-sage block">Water Conserved</span>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-ivory mt-1 block">
                  {waterSavedLiters.toLocaleString()} L
                </span>
              </div>
              <p className="text-xs text-ivory-200/80 mt-3 pt-3 border-t border-ivory/10">
                Equivalent to ~{equivalentDaysDrinkingWater} days of human drinking water.
              </p>
            </div>

            {/* Carbon Avoided */}
            <div className="p-5 rounded-2xl bg-forest-900/60 border border-ivory/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-terracotta/20 text-terracotta flex items-center justify-center mb-3">
                  <CloudRain className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-terracotta block">CO₂e Abatement</span>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-ivory mt-1 block">
                  {carbonSavedKg} kg
                </span>
              </div>
              <p className="text-xs text-ivory-200/80 mt-3 pt-3 border-t border-ivory/10">
                Avoids energy-intensive agricultural cultivation & synthetic chemical dyes.
              </p>
            </div>

            {/* Landfill Diverted */}
            <div className="p-5 rounded-2xl bg-forest-900/60 border border-ivory/10 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-ivory/20 text-ivory flex items-center justify-center mb-3">
                  <Trash className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-ivory-200 block">Landfill Diverted</span>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-ivory mt-1 block">
                  {landfillSavedKg} kg
                </span>
              </div>
              <p className="text-xs text-ivory-200/80 mt-3 pt-3 border-t border-ivory/10">
                100% circular zero-waste yield through geometric tessellation layouts.
              </p>
            </div>

          </div>

        </div>

        {/* Circular Design Principles Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          <div className="p-6 rounded-2xl bg-forest-800/40 border border-ivory/10 text-center">
            <Scissors className="w-6 h-6 text-terracotta mx-auto mb-3" />
            <h4 className="font-serif text-lg font-bold text-ivory">Zero-Waste Patterning</h4>
            <p className="text-xs text-ivory-200/80 mt-2 leading-relaxed">
              Every cutting layout is tessellated with zero corner waste. Trimmings smaller than 3cm become bias tape or needle felt.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-forest-800/40 border border-ivory/10 text-center">
            <RefreshCw className="w-6 h-6 text-sage mx-auto mb-3" />
            <h4 className="font-serif text-lg font-bold text-ivory">Heirloom Durability</h4>
            <p className="text-xs text-ivory-200/80 mt-2 leading-relaxed">
              We encourage Japanese sashiko and French seam reinforcement so upcycled pieces outlast fast-fashion virgin garments.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-forest-800/40 border border-ivory/10 text-center">
            <Sparkles className="w-6 h-6 text-terracotta mx-auto mb-3" />
            <h4 className="font-serif text-lg font-bold text-ivory">Generative Craft</h4>
            <p className="text-xs text-ivory-200/80 mt-2 leading-relaxed">
              ReStylee pairs algorithmic cutting layout optimization with warm human artisanal sewing guidance.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
