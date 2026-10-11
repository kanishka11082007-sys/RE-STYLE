import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  BookOpen, 
  HelpCircle,
  Tag,
  Scissors
} from 'lucide-react';
import { UPCYCLING_IDEAS } from '../data/upcyclingIdeas';
import type { UpcycleIdea } from '../data/upcyclingIdeas';
import type { FabricSample } from '../data/mockFabrics';

interface RecommendationsGalleryProps {
  currentFabric: FabricSample;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSelectIdeaForGuide: (idea: UpcycleIdea) => void;
}

export const RecommendationsGallery: React.FC<RecommendationsGalleryProps> = ({
  currentFabric,
  selectedCategory,
  onCategoryChange,
  onSelectIdeaForGuide,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Bags & Carry', 'Accessories', 'Home Goods', 'Art & Living'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Artisan'];

  // Calculate simple, explainable match score from fabric data & dimensions
  const calculateExplainableScore = (idea: UpcycleIdea, fabric: FabricSample): number => {
    // Convert dimensions to approximate cm² area
    const widthCm = fabric.dimensions.unit === 'in' ? fabric.dimensions.width * 2.54 : fabric.dimensions.width;
    const heightCm = fabric.dimensions.unit === 'in' ? fabric.dimensions.height * 2.54 : fabric.dimensions.height;
    const areaCm2 = widthCm * heightCm;

    let score = 84;

    // Area heuristic
    if (areaCm2 >= 1200) {
      score += 6; // Ample yardage for any blueprint
    } else if (areaCm2 >= 600) {
      score += idea.category === 'Bags & Carry' ? 3 : 8; // Great for accessories and home goods
    } else {
      score += idea.category === 'Accessories' ? 10 : -4; // Small scraps best fit small accessories
    }

    // Material keyword affinity
    const matLower = fabric.material.toLowerCase();
    if (idea.tags.some((tag) => matLower.includes(tag.toLowerCase()))) {
      score += 4;
    }

    // Condition heuristic
    if (fabric.condition === 'Crisp Remnant' || fabric.condition === 'Gently Washed') {
      score += 3;
    }

    return Math.min(99, Math.max(76, Math.round(score)));
  };

  // Filter recommendations
  const filteredIdeas = UPCYCLING_IDEAS.filter((idea: UpcycleIdea) => {
    const matchesCategory = selectedCategory === 'All' || idea.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || idea.difficulty === selectedDifficulty;
    const matchesSearch = 
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <section id="recommendations-section" className="py-20 lg:py-28 bg-paper relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bluegray text-navy text-xs font-semibold uppercase tracking-wider mb-3 border border-bluegray-200">
              <Sparkles className="w-3.5 h-3.5 text-coral" />
              <span>Generative Blueprint Catalog</span>
            </div>
            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl text-navy font-semibold leading-tight">
              Upcycling blueprints matched to your remnant.
            </h2>
            <p className="mt-3 text-base text-charcoal-muted max-w-2xl">
              Calculated for{' '}
              <span className="font-bold text-navy underline decoration-coral decoration-2">
                {currentFabric.name}
              </span>{' '}
              ({currentFabric.material}, {currentFabric.dimensions.width}×{currentFabric.dimensions.height} {currentFabric.dimensions.unit}).
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-charcoal-muted bg-surface p-2.5 rounded-2xl border border-navy/10 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-denim animate-pulse"></span>
            <span>{filteredIdeas.length} Zero-Waste Patterns Ready</span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-surface border border-navy/15 mb-10 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blueprints (e.g. tote, boro, sleeve, sashiko)..."
                aria-label="Search upcycling blueprints"
                className="w-full bg-paper border border-navy/20 rounded-xl px-4 py-2.5 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-navy/30"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0" role="toolbar" aria-label="Difficulty level filter">
              <span className="text-xs font-mono uppercase text-charcoal-muted mr-1">Skill:</span>
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-denim ${
                    selectedDifficulty === diff
                      ? 'bg-navy text-paper font-semibold'
                      : 'bg-paper text-charcoal hover:bg-navy/10 border border-navy/15'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-navy/10" role="tablist" aria-label="Category tabs">
            <span className="text-xs font-mono uppercase text-charcoal-muted mr-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-coral" />
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-denim ${
                  selectedCategory === cat
                    ? 'bg-navy text-paper font-semibold shadow-xs'
                    : 'bg-paper text-charcoal hover:bg-navy/5 border border-navy/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIdeas.map((idea: UpcycleIdea) => {
            const calculatedScore = calculateExplainableScore(idea, currentFabric);

            return (
              <motion.div
                key={idea.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="group bg-surface rounded-3xl overflow-hidden border border-navy/15 shadow-warm hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Visual Hero Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-paper-200">
                    <img
                      src={idea.imageUrl}
                      alt={idea.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-60" />

                    {/* Match Score Badge with explainable label */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span 
                        className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-bold bg-paper/95 backdrop-blur-md text-navy border border-navy/20 shadow-xs"
                        title="Score estimated from remnant area dimensions and textile structure suitability"
                      >
                        {calculatedScore}% Surface Fit
                      </span>
                    </div>

                    {/* Category Label on Image */}
                    <div className="absolute bottom-3 left-3 text-paper text-xs font-serif font-bold drop-shadow">
                      {idea.category}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-navy group-hover:text-coral transition-colors">
                        {idea.title}
                      </h3>
                      <p className="text-xs text-charcoal-muted mt-1 italic">
                        {idea.subtitle}
                      </p>
                      <p className="text-xs text-charcoal-muted mt-2 line-clamp-2 leading-relaxed">
                        {idea.suitabilityReason}
                      </p>
                    </div>

                    {/* Specs / Meta Badges */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded-lg bg-paper border border-navy/10 font-mono text-[11px] text-charcoal">
                        {idea.difficulty}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-paper border border-navy/10 font-mono text-[11px] text-charcoal flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-charcoal-muted" />
                        {idea.timeEstimate}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-bluegray border border-bluegray-300 font-mono text-[11px] text-navy font-semibold flex items-center gap-1">
                        <Scissors className="w-3.5 h-3.5 text-coral" />
                        {idea.fabricRequired}
                      </span>
                    </div>

                    {/* Blueprint Notes */}
                    <div className="p-3 rounded-xl bg-paper border border-navy/10 text-xs">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-muted block mb-0.5">
                        Cutting & Construction Blueprint
                      </span>
                      <p className="text-navy font-medium line-clamp-1 font-mono text-[11px]">
                        {idea.patternNotes}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0">
                  <button
                    type="button"
                    onClick={() => onSelectIdeaForGuide(idea)}
                    className="w-full py-3.5 px-4 rounded-2xl bg-navy text-paper text-xs sm:text-sm font-semibold hover:bg-navy-700 transition-all duration-300 flex items-center justify-center gap-2 active:scale-98 group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-denim"
                  >
                    <BookOpen className="w-4 h-4 text-coral" />
                    <span>Open Step-by-Step Making Guide</span>
                    <ArrowRight className="w-4 h-4 text-gold group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredIdeas.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-surface border border-navy/15 max-w-lg mx-auto space-y-4 shadow-sm">
            <HelpCircle className="w-10 h-10 text-coral mx-auto" />
            <h3 className="font-serif text-lg font-bold text-navy">No matching blueprints found</h3>
            <p className="text-xs text-charcoal-muted">
              Try adjusting your search query or reset your filters to explore all atelier creations.
            </p>
            <button
              onClick={() => {
                onCategoryChange('All');
                setSelectedDifficulty('All');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-full bg-navy text-paper text-xs font-semibold hover:bg-navy-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-denim"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
