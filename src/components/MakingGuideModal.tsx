import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Check, 
  Sparkles, 
  Scissors, 
  BookOpen, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  Printer,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { UpcycleIdea, StepInstruction } from '../data/upcyclingIdeas';
import type { FabricSample } from '../data/mockFabrics';

interface MakingGuideModalProps {
  idea: UpcycleIdea | null;
  fabric: FabricSample;
  onClose: () => void;
}

export const MakingGuideModal: React.FC<MakingGuideModalProps> = ({
  idea,
  fabric,
  onClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [hasFinished, setHasFinished] = useState(false);

  if (!idea) return null;

  const currentStep = idea.steps[currentStepIndex];
  const isCurrentStepDone = completedSteps.includes(currentStepIndex);

  const toggleStepCompleted = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter((i) => i !== index));
    } else {
      const updated = [...completedSteps, index];
      setCompletedSteps(updated);

      if (updated.length === idea.steps.length) {
        setHasFinished(true);
        // Trigger celebrational slow-fashion confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#183D32', '#C87556', '#A7B7A0', '#F7F3EB'],
        });
      }
    }
  };

  const nextStep = () => {
    if (currentStepIndex < idea.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-forest-900/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-4xl bg-ivory rounded-3xl overflow-hidden border border-forest/20 shadow-2xl my-8 max-h-[92vh] flex flex-col"
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-forest/10 bg-ivory-100 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-forest font-semibold">
            <BookOpen className="w-4 h-4 text-terracotta" />
            <span>Interactive Atelier Maker Guide // Blueprint #{idea.id}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              title="Print Blueprint"
              className="p-1.5 rounded-full text-charcoal-muted hover:text-forest hover:bg-forest/10 transition-colors hidden sm:block"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-charcoal-muted hover:text-forest hover:bg-forest/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-grow">
          
          {/* Top Title Banner */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-forest/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-forest text-ivory">
                  {idea.category}
                </span>
                <span className="text-xs font-mono text-terracotta font-semibold">
                  {idea.difficulty} • {idea.timeEstimate}
                </span>
              </div>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-forest">
                {idea.title}
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-1 italic">
                {idea.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-2 max-w-xl leading-relaxed">
                {idea.suitabilityReason}
              </p>
            </div>

            {/* Fabric Remnant Companion Chip */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-ivory-100 border border-forest/10 sm:max-w-xs flex-shrink-0">
              <img
                src={fabric.imageUrl}
                alt={fabric.name}
                className="w-12 h-12 rounded-xl object-cover border border-forest/15"
              />
              <div className="text-xs">
                <span className="text-[10px] uppercase font-mono text-charcoal-muted block">Active Remnant</span>
                <p className="font-serif font-bold text-forest truncate max-w-[150px]">{fabric.name}</p>
                <p className="text-[11px] text-terracotta font-mono">{fabric.dimensions.width}×{fabric.dimensions.height} {fabric.dimensions.unit}</p>
              </div>
            </div>
          </div>

          {/* Cutting Layout Blueprint Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-forest/5 border border-forest/15">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-base font-bold text-forest flex items-center gap-2">
                <Compass className="w-4 h-4 text-terracotta" />
                Zero-Waste Geometric Cutting Blueprint
              </h3>
              <span className="text-[11px] font-mono text-forest bg-sage/30 px-2.5 py-0.5 rounded-full font-semibold">
                Required: {idea.fabricRequired}
              </span>
            </div>
            
            <p className="text-xs text-charcoal leading-relaxed font-mono bg-ivory p-3.5 rounded-xl border border-forest/10">
              📐 Pattern Plan: {idea.patternNotes}
            </p>
          </div>

          {/* Required Tools & Materials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-ivory-100 border border-forest/10">
              <h4 className="text-xs font-bold text-forest uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5 text-terracotta" />
                Required Tools
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {idea.toolsNeeded.map((tool, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-ivory border border-forest/10 text-xs text-charcoal font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-ivory-100 border border-forest/10">
              <h4 className="text-xs font-bold text-forest uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sage" />
                Materials & Yardage
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {idea.materialsNeeded.map((mat, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-ivory border border-forest/10 text-xs text-charcoal font-medium">
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Step-by-Step Interactive Guide */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-bold text-forest">
                Step-by-Step Construction ({currentStepIndex + 1} of {idea.steps.length})
              </h3>
              <div className="text-xs font-mono text-terracotta font-semibold">
                {completedSteps.length}/{idea.steps.length} Completed
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="grid grid-cols-5 gap-2 mb-6">
              {idea.steps.map((step: StepInstruction, idx: number) => {
                const isCompleted = completedSteps.includes(idx);
                const isCurrent = currentStepIndex === idx;

                return (
                  <button
                    key={step.step}
                    onClick={() => setCurrentStepIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 relative ${
                      isCompleted 
                        ? 'bg-forest' 
                        : isCurrent 
                        ? 'bg-terracotta' 
                        : 'bg-forest/20'
                    }`}
                    title={`Step ${step.step}: ${step.title}`}
                  />
                );
              })}
            </div>

            {/* Current Step Card */}
            {currentStep && (
              <div className="p-6 rounded-2xl bg-ivory-50 border-2 border-forest/20 shadow-sm space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-forest text-ivory font-serif font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {currentStep.step}
                    </span>
                    <div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-forest">
                        {currentStep.title}
                      </h4>
                      <span className="text-[11px] font-mono text-charcoal-muted">
                        Phase {currentStep.step}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleStepCompleted(currentStepIndex)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isCurrentStepDone
                        ? 'bg-forest text-ivory'
                        : 'bg-ivory border border-forest/30 text-forest hover:bg-forest/5'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isCurrentStepDone ? 'Completed' : 'Mark Done'}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-charcoal leading-relaxed pt-2 border-t border-forest/10">
                  {currentStep.description}
                </p>

                {/* Artisan Pro Tip */}
                {currentStep.tip && (
                  <div className="p-3.5 rounded-xl bg-sage/20 border border-sage/40 text-xs text-forest flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Artisan Atelier Pro-Tip:</span>
                      <span className="text-charcoal-muted">{currentStep.tip}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step Navigation Controls */}
            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStepIndex === 0}
                className="px-4 py-2.5 rounded-xl border border-forest/20 text-xs font-semibold text-forest hover:bg-forest/5 transition-colors disabled:opacity-40 flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              <div className="flex items-center gap-2">
                {currentStepIndex < idea.steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-5 py-2.5 rounded-xl bg-forest text-ivory text-xs font-semibold hover:bg-forest-800 transition-colors flex items-center gap-1.5"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => toggleStepCompleted(currentStepIndex)}
                    className="px-5 py-2.5 rounded-xl bg-terracotta text-ivory text-xs font-semibold hover:bg-terracotta-dark transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete All Steps</span>
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Celebratory Completion Box */}
          {hasFinished && (
            <div className="p-6 rounded-3xl bg-sage/25 border-2 border-forest/20 text-center space-y-3 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-forest text-ivory mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-terracotta" />
              </div>
              <h3 className="font-serif text-xl font-bold text-forest">
                Congratulations, Circular Artisan!
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto leading-relaxed">
                You saved {fabric.name} from landfill and converted discarded yardage into a durable, handmade heirloom. Share your creation with the ReStylee community!
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-forest text-ivory text-xs font-semibold hover:bg-forest-800 transition-colors"
              >
                Return to Atelier Gallery
              </button>
            </div>
          )}

        </div>

      </motion.div>
    </div>
  );
};
