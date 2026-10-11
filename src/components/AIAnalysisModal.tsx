import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Cpu, 
  ArrowRight, 
  X,
  Info,
  Palette
} from 'lucide-react';
import type { FabricSample } from '../data/mockFabrics';
import { UPCYCLING_IDEAS } from '../data/upcyclingIdeas';

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
    'Evaluating uploaded remnant outline & geometric dimensions...',
    'Estimating tensile density & cutting suitability...',
    'Checking zero-waste tessellation & folding models...',
    'Synthesizing matching atelier pattern blueprints...',
  ];

  // Reset scan state and run interval when opened
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setScanStepIndex((prev) => {
        if (prev < scanSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => setPhase('complete'), 500);
          return prev;
        }
      });
    }, 700);

    return () => clearInterval(interval);
  }, [isOpen, scanSteps.length]);

  // Handle Escape key to close dialog
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-navy-900/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="analysis-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl bg-paper rounded-3xl overflow-hidden border border-navy/20 shadow-2xl"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy/10 bg-paper-100">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-navy font-semibold">
            <Cpu className="w-4 h-4 text-coral animate-pulse" />
            <span id="analysis-modal-title">Interactive Prototype Simulator // Pattern Diagnostics</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close diagnostics dialog"
            className="p-1.5 rounded-full text-charcoal-muted hover:text-navy hover:bg-navy/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-denim"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {phase === 'scanning' ? (
            <div className="space-y-6 text-center py-4">
              {/* Scanning visual box with animated laser beam line */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-2xl overflow-hidden border-2 border-navy/20 shadow-warm bg-paper-200">
                <img
                  src={fabric.imageUrl}
                  alt={fabric.name}
                  className="w-full h-full object-cover filter contrast-105"
                />
                
                {/* Laser scan line overlay */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-coral via-paper to-coral shadow-[0_0_12px_#c96f52] animate-scan-line z-10" />
                <div className="absolute inset-0 bg-navy/10 pointer-events-none" />

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#25324715_1px,transparent_1px),linear-gradient(to_bottom,#25324715_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
              </div>

              <div>
                <h4 className="font-serif text-xl font-bold text-navy">
                  Evaluating Remnant Parameters...
                </h4>
                <p className="text-xs font-mono text-coral mt-2 h-5">
                  {scanSteps[scanStepIndex]}
                </p>
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2">
                {scanSteps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx <= scanStepIndex ? 'w-6 bg-navy' : 'w-2 bg-navy/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Top Banner: Verification Success */}
              <div className="p-4 rounded-2xl bg-bluegray border border-bluegray-300 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-navy text-paper flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-coral" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-navy">
                      Simulation Complete & Indexed
                    </h4>
                    <p className="text-xs text-charcoal-muted">
                      Matched {UPCYCLING_IDEAS.length} zero-waste blueprints using remnant parameters.
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-muted block">Status</span>
                  <span className="text-xs font-mono font-bold text-navy">Demo Mode</span>
                </div>
              </div>

              {/* Grid of Remnant Properties */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-paper-100 border border-navy/10">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal-muted block">Material Profile</span>
                  <p className="font-serif text-sm font-bold text-navy mt-0.5">{fabric.material}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-paper-100 border border-navy/10">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal-muted block">Weave Structure</span>
                  <p className="font-serif text-sm font-bold text-navy mt-0.5">{fabric.weave}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-paper-100 border border-navy/10">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal-muted block">Weight Estimate</span>
                  <p className="font-serif text-sm font-bold text-navy mt-0.5">{fabric.weightGsm} GSM</p>
                </div>

                <div className="p-3.5 rounded-xl bg-paper-100 border border-navy/10">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal-muted block">Condition</span>
                  <p className="font-serif text-sm font-bold text-coral mt-0.5">{fabric.condition}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-paper-100 border border-navy/10">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal-muted block">Usable Surface</span>
                  <p className="font-serif text-sm font-bold text-navy mt-0.5">
                    {fabric.dimensions.width}×{fabric.dimensions.height} {fabric.dimensions.unit}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-paper-100 border border-navy/10">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-charcoal-muted block">Pattern Match</span>
                  <p className="font-serif text-sm font-bold text-navy mt-0.5">Geometric Fold</p>
                </div>
              </div>

              {/* Texture & Tactile Notes */}
              <div className="p-4 rounded-xl bg-paper-50 border border-navy/10 text-xs">
                <span className="font-bold text-navy block mb-1">Textile Profile & Notes:</span>
                <p className="text-charcoal-muted leading-relaxed">
                  {fabric.texture}. {fabric.tagline}
                </p>
              </div>

              {/* Extracted Color Palette */}
              <div>
                <span className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Palette className="w-3.5 h-3.5 text-coral" />
                  Atelier Chromatic Palette <span className="text-charcoal-muted font-normal lowercase">(illustrative preset)</span>
                </span>
                <div className="flex gap-2">
                  {fabric.colorPalette.map((col, idx) => (
                    <div key={idx} className="flex-1 text-center">
                      <div
                        className="h-8 rounded-lg border border-navy/15 shadow-2xs"
                        style={{ backgroundColor: col.hex }}
                        title={`${col.name} (${col.hex})`}
                      />
                      <span className="text-[10px] font-mono text-charcoal-muted block mt-1 truncate">
                        {col.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Honest Prototype Disclosure */}
              <div className="text-[11px] text-charcoal-muted bg-paper-200/60 p-3 rounded-xl border border-navy/10 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-denim flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Prototype Demo Notice:</strong> Simulated textile diagnostic for interface evaluation. No external AI API or computer-vision backend is connected. Fiber, weave, and palette properties represent demonstration attributes.
                </span>
              </div>

              {/* CTA to view recommendations */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onViewRecommendations();
                }}
                className="w-full py-4 px-6 rounded-2xl bg-navy text-paper text-base font-semibold shadow-warm hover:bg-navy-700 transition-all duration-300 flex items-center justify-center gap-2 active:scale-98 focus:outline-none focus-visible:ring-2 focus-visible:ring-denim"
              >
                <span>Explore Matched Upcycling Blueprints</span>
                <ArrowRight className="w-4 h-4 text-coral" />
              </button>

            </div>
          )}

        </div>

      </motion.div>
    </div>
  );
};
