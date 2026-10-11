import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Cpu, 
  ArrowRight, 
  X,
  ShieldCheck,
  Palette
} from 'lucide-react';
import type { FabricSample } from '../data/mockFabrics';

interface AIAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  fabric: FabricSample;
  onViewRecommendations: () => void;
}

export const AIAnalysisModal: React.FC<AIAnalysisModalProps> = ({
  isOpen,
  onClose,
  fabric,
  onViewRecommendations,
}) => {
  const [phase, setPhase] = useState<'scanning' | 'complete'>('scanning');
  const [scanStepIndex, setScanStepIndex] = useState(0);

  const scanSteps = [
    'Deconvolving microscopic warp & weft weave structure...',
    'Extracting organic pigment values & harmonized palette...',
    'Evaluating tensile density and GSM weight tolerance...',
    'Cross-referencing circular zero-waste pattern repository...',
  ];

  useEffect(() => {
    if (isOpen) {
      setPhase('scanning');
      setScanStepIndex(0);

      const interval = setInterval(() => {
        setScanStepIndex((prev) => {
          if (prev < scanSteps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => setPhase('complete'), 600);
            return prev;
          }
        });
      }, 750);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-forest-900/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl bg-ivory rounded-3xl overflow-hidden border border-forest/20 shadow-2xl"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-forest/10 bg-ivory-100">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-forest font-semibold">
            <Cpu className="w-4 h-4 text-terracotta animate-pulse" />
            <span>Neural Textile Diagnostics // Studio Analysis</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-charcoal-muted hover:text-forest hover:bg-forest/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {phase === 'scanning' ? (
            <div className="space-y-6 text-center py-4">
              {/* Scanning visual box with animated laser beam line */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-2xl overflow-hidden border-2 border-forest/20 shadow-warm bg-ivory-200">
                <img
                  src={fabric.imageUrl}
                  alt={fabric.name}
                  className="w-full h-full object-cover filter contrast-105"
                />
                
                {/* Laser scan line overlay */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-terracotta via-ivory to-terracotta shadow-[0_0_12px_#c87556] animate-scan-line z-10" />
                <div className="absolute inset-0 bg-forest/10 pointer-events-none" />

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#183d3215_1px,transparent_1px),linear-gradient(to_bottom,#183d3215_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              </div>

              <div>
                <h4 className="font-serif text-xl font-bold text-forest">
                  Analyzing Textile Remnant...
                </h4>
                <p className="text-xs font-mono text-terracotta mt-2 h-5">
                  {scanSteps[scanStepIndex]}
                </p>
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2">
                {scanSteps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx <= scanStepIndex ? 'w-6 bg-forest' : 'w-2 bg-forest/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Top Banner: Verification Success */}
              <div className="p-4 rounded-2xl bg-sage/20 border border-sage/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-forest text-ivory flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-terracotta" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-forest">
                      Analysis Complete & Indexed
                    </h4>
                    <p className="text-xs text-charcoal-muted">
                      Synthesized 7 circular design blueprints tailored to this specimen.
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-muted block">Confidence</span>
                  <span className="text-sm font-mono font-bold text-forest">96.8%</span>
                </div>
              </div>

              {/* Grid of Detected Properties */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-ivory-100 border border-forest/10">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal-muted block">Identified Fiber</span>
                  <p className="font-serif text-sm font-bold text-forest mt-0.5">{fabric.material}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-ivory-100 border border-forest/10">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal-muted block">Weave Geometry</span>
                  <p className="font-serif text-sm font-bold text-forest mt-0.5">{fabric.weave}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-ivory-100 border border-forest/10">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal-muted block">Weight & Density</span>
                  <p className="font-serif text-sm font-bold text-forest mt-0.5">{fabric.weightGsm} GSM</p>
                </div>

                <div className="p-3.5 rounded-xl bg-ivory-100 border border-forest/10">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal-muted block">Evaluated Condition</span>
                  <p className="font-serif text-sm font-bold text-terracotta mt-0.5">{fabric.condition}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-ivory-100 border border-forest/10">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal-muted block">Usable Surface</span>
                  <p className="font-serif text-sm font-bold text-forest mt-0.5">
                    {fabric.dimensions.width}×{fabric.dimensions.height} {fabric.dimensions.unit}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-ivory-100 border border-forest/10">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal-muted block">Tensile Suitability</span>
                  <p className="font-serif text-sm font-bold text-forest mt-0.5">High Durability</p>
                </div>
              </div>

              {/* Texture & Tactile Notes */}
              <div className="p-4 rounded-xl bg-ivory-50 border border-forest/10 text-xs">
                <span className="font-bold text-forest block mb-1">Tactile & Structural Synthesis:</span>
                <p className="text-charcoal-muted leading-relaxed">
                  {fabric.texture}. {fabric.tagline}
                </p>
              </div>

              {/* Extracted Color Palette */}
              <div>
                <span className="text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Palette className="w-3.5 h-3.5 text-terracotta" />
                  Harmonious Chromatic Spectrum
                </span>
                <div className="flex gap-2">
                  {fabric.colorPalette.map((col, idx) => (
                    <div key={idx} className="flex-1 text-center">
                      <div
                        className="h-8 rounded-lg border border-forest/15 shadow-2xs"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="text-[10px] font-mono text-charcoal-muted block mt-1 truncate">
                        {col.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transparent Mock Disclaimer (honesty required by user guidelines) */}
              <div className="text-[11px] text-charcoal-muted/80 bg-ivory-200/50 p-2.5 rounded-lg border border-forest/5 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-forest flex-shrink-0" />
                <span>
                  Simulated neural analysis for frontend prototype. In production, connects to fine-tuned fabric segmentation models.
                </span>
              </div>

              {/* CTA to view recommendations */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onViewRecommendations();
                }}
                className="w-full py-4 px-6 rounded-2xl bg-forest text-ivory text-base font-semibold shadow-warm hover:bg-forest-800 transition-all duration-300 flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Explore Matched Upcycling Creations</span>
                <ArrowRight className="w-4 h-4 text-terracotta" />
              </button>

            </div>
          )}

        </div>

      </motion.div>
    </div>
  );
};
