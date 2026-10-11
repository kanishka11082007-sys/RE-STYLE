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
  onSelectIdeaForGuide: (idea: UpcycleIdea) => void;
}

export const RecommendationsGallery: React.FC<RecommendationsGalleryProps> = ({
  currentFabric,
  onSelectIdeaForGuide,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Bags & Carry', 'Accessories', 'Home Goods', 'Art & Living'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Artisan'];

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
    <section id="recommendations-section" className="py-20 lg:py-28 bg-ivory relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 text-forest text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              <span>Generative Blueprint Catalog</span>
            </div>
            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl text-forest font-semibold leading-tight">
              Upcycling blueprints matched to your remnant.
            </h2>
            <p className="mt-3 text-base text-charcoal-muted max-w-2xl">
              Calculated for{' '}
              <span className="font-bold text-forest underline decoration-terracotta decoration-2">
                {currentFabric.name}
              </span>{' '}
              ({currentFabric.material}, {currentFabric.dimensions.width}×{currentFabric.dimensions.height} {currentFabric.dimensions.unit}).
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-charcoal-muted bg-ivory-100 p-2.5 rounded-2xl border border-forest/10">
            <span className="w-2.5 h-2.5 rounded-full bg-sage animate-pulse"></span>
            <span>{filteredIdeas.length} Zero-Waste Patterns Ready</span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-ivory-100 border border-forest/15 mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blueprints (e.g. tote, boro, sleeve, sashiko)..."
                className="w-full bg-ivory border border-forest/20 rounded-xl px-4 py-2.5 text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/30"
              />
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-mono uppercase text-charcoal-muted mr-1">Skill:</span>
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedDifficulty === diff
                      ? 'bg-forest text-ivory font-semibold'
                      : 'bg-ivory text-charcoal hover:bg-forest/10 border border-forest/15'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-forest/10">
            <span className="text-xs font-mono uppercase text-charcoal-muted mr-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-terracotta" />
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-forest text-ivory font-semibold shadow-xs'
                    : 'bg-ivory text-charcoal hover:bg-forest/5 border border-forest/15'
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
            return (
              <motion.div
                key={idea.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="group bg-ivory rounded-3xl overflow-hidden border border-forest/15 shadow-warm hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Visual Hero Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-ivory-200">
                    <img
                      src={idea.imageUrl}
                      alt={idea.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent opacity-60" />

                    {/* Match Score Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider font-bold bg-ivory/95 backdrop-blur-md text-forest border border-forest/20 shadow">
                        {idea.matchScore}% Specimen Fit
                      </span>
                    </div>

                    {/* Category Label on Image */}
                    <div className="absolute bottom-3 left-3 text-ivory text-xs font-serif font-bold drop-shadow">
                      {idea.category}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-forest group-hover:text-terracotta transition-colors">
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
                      <span className="px-2.5 py-1 rounded-lg bg-ivory-100 border border-forest/10 font-mono text-[11px] text-charcoal">
                        {idea.difficulty}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-ivory-100 border border-forest/10 font-mono text-[11px] text-charcoal flex items-center gap-1">
                        <Clock className="w-3 h-3 text-charcoal-muted" />
                        {idea.timeEstimate}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-sage/20 border border-sage/40 font-mono text-[11px] text-forest font-semibold flex items-center gap-1">
                        <Scissors className="w-3 h-3 text-terracotta" />
                        {idea.fabricRequired}
                      </span>
                    </div>

                    {/* Blueprint Notes */}
                    <div className="p-3 rounded-xl bg-ivory-100 border border-forest/10 text-xs">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal-muted block mb-0.5">
                        Cutting & Construction Blueprint
                      </span>
                      <p className="text-forest font-medium line-clamp-1 font-mono text-[11px]">
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
                    className="w-full py-3.5 px-4 rounded-2xl bg-forest text-ivory text-xs sm:text-sm font-semibold hover:bg-forest-800 transition-all duration-300 flex items-center justify-center gap-2 active:scale-98 group/btn"
                  >
                    <BookOpen className="w-4 h-4 text-terracotta" />
                    <span>Open Step-by-Step Making Guide</span>
                    <ArrowRight className="w-4 h-4 text-sage group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredIdeas.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-ivory-100 border border-forest/15 max-w-lg mx-auto space-y-4">
            <HelpCircle className="w-10 h-10 text-terracotta mx-auto" />
            <h3 className="font-serif text-lg font-bold text-forest">No matching blueprints found</h3>
            <p className="text-xs text-charcoal-muted">
              Try adjusting your search query or reset your difficulty filter to explore all atelier creations.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDifficulty('All');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-full bg-forest text-ivory text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
