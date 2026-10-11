import React, { useState, useEffect } from 'react';
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
  Compass,
  CheckCheck
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

  // Initial state is naturally reset on project change via key prop in App.tsx
  // Handle Escape key to close modal
  useEffect(() => {
    if (!idea) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [idea, onClose]);

  if (!idea) return null;

  // Ensure current step index is always valid for the selected project
  const safeStepIndex = Math.min(Math.max(0, currentStepIndex), idea.steps.length - 1);
  const currentStep = idea.steps[safeStepIndex];
  const isCurrentStepDone = completedSteps.includes(safeStepIndex);

  const toggleStepCompleted = (index: number) => {
    if (completedSteps.includes(index)) {
      const updated = completedSteps.filter((i) => i !== index);
      setCompletedSteps(updated);
      // Immediately reset completion state if any step is unchecked
      setHasFinished(false);
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
          colors: ['#253247', '#C96F52', '#D6AD64', '#E2EBF0'],
        });
      }
    }
  };

  const handleCompleteAllSteps = () => {
    const allIndices = idea.steps.map((_, i) => i);
    setCompletedSteps(allIndices);
    setHasFinished(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#253247', '#C96F52', '#D6AD64', '#E2EBF0'],
    });
  };

  const nextStep = () => {
    if (safeStepIndex < idea.steps.length - 1) {
      setCurrentStepIndex(safeStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (safeStepIndex > 0) {
      setCurrentStepIndex(safeStepIndex - 1);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-navy-900/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-4xl bg-paper rounded-3xl overflow-hidden border border-navy/20 shadow-2xl my-8 max-h-[92vh] flex flex-col"
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy/10 bg-paper-100 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-navy font-semibold">
            <BookOpen className="w-4 h-4 text-coral" />
            <span id="guide-modal-title">Interactive Atelier Maker Guide // Blueprint #{idea.id}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              title="Print Blueprint"
              aria-label="Print making blueprint"
              className="p-1.5 rounded-full text-charcoal-muted hover:text-navy hover:bg-navy/10 transition-colors hidden sm:block focus:outline-none focus-visible:ring-2 focus-visible:ring-denim"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close making guide dialog"
              className="p-1.5 rounded-full text-charcoal-muted hover:text-navy hover:bg-navy/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-denim"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-grow">
          
          {/* Top Title Banner */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-navy/10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-navy text-paper">
                  {idea.category}
                </span>
                <span className="text-xs font-mono text-coral font-semibold">
                  {idea.difficulty} • {idea.timeEstimate}
                </span>
              </div>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-navy">
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
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface border border-navy/10 sm:max-w-xs flex-shrink-0 shadow-2xs">
              <img
                src={fabric.imageUrl}
                alt={fabric.name}
                className="w-12 h-12 rounded-xl object-cover border border-navy/15"
              />
              <div className="text-xs">
                <span className="text-[10px] uppercase font-mono text-charcoal-muted block">Active Remnant</span>
                <p className="font-serif font-bold text-navy truncate max-w-[150px]">{fabric.name}</p>
                <p className="text-[11px] text-coral font-mono">{fabric.dimensions.width}×{fabric.dimensions.height} {fabric.dimensions.unit}</p>
              </div>
            </div>
          </div>

          {/* Cutting Layout Blueprint Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-bluegray border border-bluegray-300">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-base font-bold text-navy flex items-center gap-2">
                <Compass className="w-4 h-4 text-coral" />
                Zero-Waste Geometric Cutting Blueprint
              </h3>
              <span className="text-[11px] font-mono text-navy bg-paper px-2.5 py-0.5 rounded-full font-semibold border border-navy/10">
                Required: {idea.fabricRequired}
              </span>
            </div>
            
            <p className="text-xs text-charcoal leading-relaxed font-mono bg-paper p-3.5 rounded-xl border border-navy/10">
              📐 Pattern Plan: {idea.patternNotes}
            </p>
          </div>

          {/* Required Tools & Materials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-surface border border-navy/10 shadow-2xs">
              <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5 text-coral" />
                Required Tools
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {idea.toolsNeeded.map((tool, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-paper border border-navy/10 text-xs text-charcoal font-medium">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-navy/10 shadow-2xs">
              <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                Materials & Yardage
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {idea.materialsNeeded.map((mat, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-paper border border-navy/10 text-xs text-charcoal font-medium">
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Step-by-Step Interactive Guide */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg font-bold text-navy">
                Step-by-Step Construction ({safeStepIndex + 1} of {idea.steps.length})
              </h3>
              <div className="text-xs font-mono text-coral font-semibold">
                {completedSteps.length} of {idea.steps.length} Steps Completed
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="grid grid-cols-5 gap-2 mb-6" role="tablist" aria-label="Step progress">
              {idea.steps.map((step: StepInstruction, idx: number) => {
                const isCompleted = completedSteps.includes(idx);
                const isCurrent = safeStepIndex === idx;

                return (
                  <button
                    key={step.step}
                    onClick={() => setCurrentStepIndex(idx)}
                    role="tab"
                    aria-selected={isCurrent}
                    aria-label={`Step ${step.step}: ${step.title}`}
                    className={`h-2 rounded-full transition-all duration-300 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-denim ${
                      isCompleted 
                        ? 'bg-navy' 
                        : isCurrent 
                        ? 'bg-coral' 
                        : 'bg-navy/20'
                    }`}
                    title={`Step ${step.step}: ${step.title}`}
                  />
                );
              })}
            </div>

            {/* Current Step Card */}
            {currentStep && (
              <div className="p-6 rounded-2xl bg-surface border-2 border-navy/20 shadow-sm space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-navy text-paper font-serif font-bold text-sm flex items-center justify-center flex-shrink-0">
                      {currentStep.step}
                    </span>
                    <div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-navy">
                        {currentStep.title}
                      </h4>
                      <span className="text-[11px] font-mono text-charcoal-muted">
                        Phase {currentStep.step}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleStepCompleted(safeStepIndex)}
                    aria-label={isCurrentStepDone ? "Mark step as incomplete" : "Mark step as completed"}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-denim ${
                      isCurrentStepDone
                        ? 'bg-navy text-paper'
                        : 'bg-paper border border-navy/30 text-navy hover:bg-navy/5'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isCurrentStepDone ? 'Completed' : 'Mark Done'}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-charcoal leading-relaxed pt-2 border-t border-navy/10">
                  {currentStep.description}
                </p>

                {/* Artisan Pro Tip */}
                {currentStep.tip && (
                  <div className="p-3.5 rounded-xl bg-bluegray border border-bluegray-300 text-xs text-navy flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-coral flex-shrink-0 mt-0.5" />
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
                disabled={safeStepIndex === 0}
                className="px-4 py-2.5 rounded-xl border border-navy/20 text-xs font-semibold text-navy hover:bg-navy/5 transition-colors disabled:opacity-40 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-denim"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCompleteAllSteps}
                  className="px-4 py-2.5 rounded-xl border border-navy/20 bg-paper text-navy text-xs font-semibold hover:bg-navy/5 transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-denim"
                >
                  <CheckCheck className="w-4 h-4 text-coral" />
                  <span>Complete All Steps</span>
                </button>

                {safeStepIndex < idea.steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-5 py-2.5 rounded-xl bg-navy text-paper text-xs font-semibold hover:bg-navy-700 transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-denim"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => toggleStepCompleted(safeStepIndex)}
                    className="px-5 py-2.5 rounded-xl bg-coral text-paper text-xs font-semibold hover:bg-coral-dark transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-denim"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isCurrentStepDone ? 'Step Completed' : 'Finish Final Step'}</span>
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Celebratory Completion Box */}
          {hasFinished && (
            <div className="p-6 rounded-3xl bg-bluegray border-2 border-navy/20 text-center space-y-3 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-navy text-paper mx-auto flex items-center justify-center shadow">
                <CheckCircle2 className="w-6 h-6 text-coral" />
              </div>
              <h3 className="font-serif text-xl font-bold text-navy">
                Congratulations, Circular Artisan!
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto leading-relaxed">
                All {idea.steps.length} construction phases completed! You saved {fabric.name} from municipal waste and converted discarded yardage into a durable, handmade heirloom.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-navy text-paper text-xs font-semibold hover:bg-navy-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-denim"
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
