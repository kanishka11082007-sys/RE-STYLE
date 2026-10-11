import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FabricStudio } from './components/FabricStudio';
import { AIAnalysisModal } from './components/AIAnalysisModal';
import { RecommendationsGallery } from './components/RecommendationsGallery';
import { MakingGuideModal } from './components/MakingGuideModal';
import { ImpactSection } from './components/ImpactSection';
import { CommunityShowcase } from './components/CommunityShowcase';
import { ManifestoSection } from './components/ManifestoSection';
import { Footer } from './components/Footer';
import { SAMPLE_FABRICS } from './data/mockFabrics';
import type { FabricSample } from './data/mockFabrics';
import type { UpcycleIdea } from './data/upcyclingIdeas';
import { generateDesigns, type DesignConcept } from './api/generateDesigns';

export const App: React.FC = () => {
  const [currentFabric, setCurrentFabric] = useState<FabricSample>(SAMPLE_FABRICS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [selectedIdeaForGuide, setSelectedIdeaForGuide] = useState<UpcycleIdea | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiDesigns, setAiDesigns] = useState<DesignConcept[]>([]);
  const [aiTrends, setAiTrends] = useState<Array<{ title: string; snippet: string; url: string }>>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Smooth scroll helpers
  const scrollToStudio = () => {
    document.getElementById('studio-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToIdeas = () => {
    document.getElementById('recommendations-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToImpact = () => {
    document.getElementById('impact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCommunity = () => {
    document.getElementById('community-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectSampleFromHero = (sampleId: string) => {
    const found = SAMPLE_FABRICS.find((f) => f.id === sampleId);
    if (found) {
      setCurrentFabric(found);
      scrollToStudio();
    }
  };

  const handleAnalyze = async (fabricToAnalyze: FabricSample) => {
    setIsAnalyzing(true);
    setIsAnalysisModalOpen(true);
    setIsAiLoading(true);

    try {
      const preferredFiber = fabricToAnalyze.material && !fabricToAnalyze.material.includes('User Defined')
        ? fabricToAnalyze.material
        : fabricToAnalyze.name;

      const response = await generateDesigns({
        fabricType: preferredFiber,
        quantity: `${fabricToAnalyze.dimensions.width}×${fabricToAnalyze.dimensions.height} ${fabricToAnalyze.dimensions.unit} remnant (${fabricToAnalyze.weightGsm} GSM)`,
        cost: '$14.00/meter',
        preferences: fabricToAnalyze.tagline || 'Zero-waste contemporary silhouettes and circular accessories',
        image: fabricToAnalyze.imageUrl,
      });

      if (response.success && response.designs) {
        setAiDesigns(response.designs);
        setAiTrends(response.trends || []);
      }
    } catch (err) {
      console.warn('[Re:Style API Notice] Backend not reached or fallback mode active:', err);
    } finally {
      setIsAiLoading(false);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper text-charcoal font-sans selection:bg-bluegray selection:text-navy">
      {/* Sticky Navigation */}
      <Navbar
        onScrollToStudio={scrollToStudio}
        onScrollToIdeas={scrollToIdeas}
        onScrollToImpact={scrollToImpact}
        onScrollToCommunity={scrollToCommunity}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* Editorial Hero Section */}
        <HeroSection
          onStartUpload={scrollToStudio}
          onExploreIdeas={scrollToIdeas}
          onSelectSampleFabric={handleSelectSampleFromHero}
        />

        {/* Fabric Studio Upload & Parameter Customization */}
        <FabricStudio
          currentFabric={currentFabric}
          onFabricChange={setCurrentFabric}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Dynamic Upcycling Recommendations Gallery */}
        <RecommendationsGallery
          currentFabric={currentFabric}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onSelectIdeaForGuide={(idea) => setSelectedIdeaForGuide(idea)}
        />

        {/* Interactive Ecological Impact Simulator */}
        <ImpactSection />

        {/* Community Makers Showcase with Before/After Flips */}
        <CommunityShowcase />

        {/* Circular Design Manifesto Spread */}
        <ManifestoSection />

      </main>

      {/* Detail / Making Guide Modal */}
      <MakingGuideModal
        key={selectedIdeaForGuide?.id ?? 'none'}
        idea={selectedIdeaForGuide}
        fabric={currentFabric}
        onClose={() => setSelectedIdeaForGuide(null)}
      />

      {/* Prototype Scanning & Simulation Modal */}
      <AIAnalysisModal
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        fabric={currentFabric}
        onViewRecommendations={scrollToIdeas}
        aiDesigns={aiDesigns}
        liveTrends={aiTrends}
        isAiLoading={isAiLoading}
      />

      {/* Warm Editorial Footer */}
      <Footer />
    </div>
  );
};

export default App;
