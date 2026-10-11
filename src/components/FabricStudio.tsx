import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Trash2, 
  RefreshCw, 
  Sparkles, 
  Sliders, 
  Ruler, 
  Check, 
  Scan, 
  HelpCircle,
  Eye
} from 'lucide-react';
import { SAMPLE_FABRICS } from '../data/mockFabrics';
import type { FabricSample } from '../data/mockFabrics';

interface FabricStudioProps {
  currentFabric: FabricSample;
  onFabricChange: (fabric: FabricSample) => void;
  onAnalyze: (fabric: FabricSample) => void;
  isAnalyzing: boolean;
}

export const FabricStudio: React.FC<FabricStudioProps> = ({
  currentFabric,
  onFabricChange,
  onAnalyze,
  isAnalyzing,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [width, setWidth] = useState<number>(currentFabric.dimensions.width);
  const [height, setHeight] = useState<number>(currentFabric.dimensions.height);
  const [unit, setUnit] = useState<'cm' | 'in'>(currentFabric.dimensions.unit);
  const [condition, setCondition] = useState<FabricSample['condition']>(currentFabric.condition);
  const [intendedUse, setIntendedUse] = useState<string>('Any Creative Project');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file drop / upload
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const processUploadedFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const customSample: FabricSample = {
        id: `custom-upload-${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Uploaded Fabric Remnant',
        material: 'Natural Cotton & Linen Blend (Detected)',
        weave: 'Plain Weave Textile',
        weightGsm: 210,
        condition: condition,
        dimensions: { width, height, unit },
        colorPalette: [
          { name: 'Warm Taupe', hex: '#8C7A6B' },
          { name: 'Natural Ecru', hex: '#F7F3EB' },
          { name: 'Forest Shadow', hex: '#183D32' },
          { name: 'Clay Terracotta', hex: '#C87556' },
        ],
        texture: 'Medium-weight tactile weave with natural organic hand-feel',
        imageUrl: result,
        tagline: 'Custom uploaded piece analyzed for circular reconstruction.',
      };
      onFabricChange(customSample);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: FabricSample) => {
    setWidth(sample.dimensions.width);
    setHeight(sample.dimensions.height);
    setUnit(sample.dimensions.unit);
    setCondition(sample.condition);
    onFabricChange(sample);
  };

  const handleTriggerAnalysis = () => {
    const updated: FabricSample = {
      ...currentFabric,
      dimensions: { width, height, unit },
      condition: condition,
    };
    onFabricChange(updated);
    onAnalyze(updated);
  };

  return (
    <section id="studio-section" className="py-20 lg:py-28 bg-ivory-100 border-y border-forest/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 text-forest text-xs font-semibold uppercase tracking-wider mb-3">
            <Scan className="w-3.5 h-3.5 text-terracotta" />
            <span>Interactive Fabric Studio</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl text-forest font-semibold leading-tight">
            Feed the studio with your scraps.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-muted leading-relaxed">
            Drop an image of your textile remnant or test right away using curated studio specimens. Our pattern engine evaluates fiber tensile, weight, and cut yield to suggest circular blueprints.
          </p>
        </div>

        {/* Quick Test Samples Bar */}
        <div className="mb-10 p-5 rounded-2xl bg-ivory border border-forest/15 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 pb-3 border-b border-forest/10">
            <div>
              <h3 className="font-serif text-lg font-bold text-forest">
                Try Evaluator Scraps <span className="text-sm font-sans font-normal text-charcoal-muted">(1-Click Test)</span>
              </h3>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Click any specimen below to immediately load authentic fabric data & imagery into the studio.
              </p>
            </div>
            <span className="text-xs font-mono text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
              4 Specimens Ready
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SAMPLE_FABRICS.map((sample) => {
              const isSelected = currentFabric.id === sample.id;
              return (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`group text-left p-3 rounded-xl border transition-all duration-200 relative overflow-hidden ${
                    isSelected 
                      ? 'border-forest bg-forest/5 ring-2 ring-forest/20 shadow-md' 
                      : 'border-forest/15 bg-ivory hover:border-forest/40 hover:bg-forest/[0.02]'
                  }`}
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden mb-2.5 bg-ivory-200 relative">
                    <img 
                      src={sample.imageUrl} 
                      alt={sample.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-forest text-ivory flex items-center justify-center shadow">
                        <Check className="w-3 h-3 text-ivory" />
                      </div>
                    )}
                  </div>
                  <p className="font-serif text-sm font-bold text-forest truncate group-hover:text-terracotta transition-colors">
                    {sample.name}
                  </p>
                  <p className="text-[11px] text-charcoal-muted truncate mt-0.5">
                    {sample.material}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5 text-[10px] font-mono text-forest/70">
                    <span>{sample.dimensions.width}×{sample.dimensions.height} {sample.dimensions.unit}</span>
                    <span>•</span>
                    <span>{sample.weightGsm} GSM</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Studio Interactive Workspace: 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Drag & Drop Dropzone + Live Preview */}
          <div className="lg:col-span-7">
            <div className="bg-ivory rounded-3xl p-6 sm:p-8 border border-forest/15 shadow-warm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-mono tracking-wider text-forest font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-terracotta"></span>
                  Active Fabric Remnant
                </span>
                {currentFabric && (
                  <span className="text-xs text-charcoal-muted font-medium">
                    {currentFabric.dimensions.width} × {currentFabric.dimensions.height} {currentFabric.dimensions.unit}
                  </span>
                )}
              </div>

              {/* Upload Drop Area */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 min-h-[300px] sm:min-h-[360px] flex flex-col items-center justify-center border-2 border-dashed ${
                  isDragging 
                    ? 'border-terracotta bg-terracotta/5 scale-[0.99]' 
                    : 'border-forest/25 hover:border-forest/50 bg-ivory-50'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  accept="image/*"
                  className="hidden"
                />

                {currentFabric.imageUrl ? (
                  <div className="relative w-full h-full min-h-[320px] sm:min-h-[360px] group">
                    <img
                      src={currentFabric.imageUrl}
                      alt={currentFabric.name}
                      className="w-full h-full object-cover min-h-[320px] sm:min-h-[360px]"
                    />
                    
                    {/* Dark gradient overlay on hover */}
                    <div className="absolute inset-0 bg-forest/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-xs">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className="px-4 py-2 rounded-full bg-ivory text-forest text-xs font-semibold flex items-center gap-1.5 shadow hover:bg-forest hover:text-ivory transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Replace Photo
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectSample(SAMPLE_FABRICS[0]);
                        }}
                        className="px-4 py-2 rounded-full bg-terracotta text-ivory text-xs font-semibold flex items-center gap-1.5 shadow hover:bg-terracotta-dark transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Reset Specimen
                      </button>
                    </div>

                    {/* Bottom metadata chip */}
                    <div className="absolute bottom-3 left-3 right-3 bg-ivory/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-forest/10 flex items-center justify-between text-xs text-charcoal">
                      <span className="font-serif font-bold text-forest truncate">{currentFabric.name}</span>
                      <span className="font-mono text-[11px] text-terracotta font-semibold uppercase">{currentFabric.condition}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center max-w-sm space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-forest/10 text-forest mx-auto flex items-center justify-center">
                      <UploadCloud className="w-7 h-7 text-terracotta" />
                    </div>
                    <p className="font-serif text-lg font-bold text-forest">
                      Drop your fabric scrap photo here
                    </p>
                    <p className="text-xs text-charcoal-muted leading-relaxed">
                      Supports JPG, PNG, WEBP. Lay your remnant flat under natural daylight for maximum texture precision.
                    </p>
                    <span className="inline-block px-4 py-2 rounded-full bg-forest text-ivory text-xs font-medium mt-2">
                      Browse Files
                    </span>
                  </div>
                )}
              </div>

              {/* Action buttons under dropzone */}
              <div className="mt-4 flex items-center justify-between text-xs text-charcoal-muted">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-sage" />
                  High-res macro photography supported
                </span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-forest hover:text-terracotta font-medium transition-colors underline"
                >
                  Upload custom file
                </button>
              </div>

            </div>
          </div>

          {/* Right: Specimen Parameters & Analysis Trigger */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-ivory rounded-3xl p-6 sm:p-8 border border-forest/15 shadow-warm space-y-6">
              
              <div className="border-b border-forest/10 pb-4">
                <h3 className="font-serif text-xl font-bold text-forest flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-terracotta" />
                  Textile Parameters
                </h3>
                <p className="text-xs text-charcoal-muted mt-1">
                  Provide estimated physical metrics to unlock tailored cutting patterns.
                </p>
              </div>

              {/* Dimensions Input with Unit Toggle */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-terracotta" />
                    Fabric Dimensions
                  </label>
                  
                  {/* Unit switcher */}
                  <div className="flex bg-ivory-200 rounded-lg p-0.5 border border-forest/15 text-xs">
                    <button
                      type="button"
                      onClick={() => setUnit('cm')}
                      className={`px-2.5 py-0.5 rounded-md font-mono text-[11px] transition-colors ${
                        unit === 'cm' ? 'bg-forest text-ivory font-bold' : 'text-charcoal-muted hover:text-forest'
                      }`}
                    >
                      CM
                    </button>
                    <button
                      type="button"
                      onClick={() => setUnit('in')}
                      className={`px-2.5 py-0.5 rounded-md font-mono text-[11px] transition-colors ${
                        unit === 'in' ? 'bg-forest text-ivory font-bold' : 'text-charcoal-muted hover:text-forest'
                      }`}
                    >
                      INCH
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-charcoal-muted block mb-1">Width</span>
                    <div className="relative">
                      <input
                        type="number"
                        min="5"
                        max="300"
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                        className="w-full bg-ivory-50 border border-forest/20 rounded-xl px-3.5 py-2.5 text-sm font-mono text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/30"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-charcoal-muted font-mono">{unit}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] text-charcoal-muted block mb-1">Length / Height</span>
                    <div className="relative">
                      <input
                        type="number"
                        min="5"
                        max="300"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        className="w-full bg-ivory-50 border border-forest/20 rounded-xl px-3.5 py-2.5 text-sm font-mono text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/30"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-charcoal-muted font-mono">{unit}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fabric Condition Selector */}
              <div>
                <label className="text-xs font-bold text-forest uppercase tracking-wider block mb-2">
                  Remnant Condition
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Crisp Remnant', 'Gently Washed', 'Vintage Worn', 'Frayed Scrap'] as const).map((cond) => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => setCondition(cond)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-colors flex items-center justify-between ${
                        condition === cond
                          ? 'border-forest bg-forest text-ivory'
                          : 'border-forest/20 bg-ivory-50 text-charcoal hover:border-forest/40'
                      }`}
                    >
                      <span>{cond}</span>
                      {condition === cond && <Check className="w-3.5 h-3.5 text-terracotta" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Intended Use (Optional) */}
              <div>
                <label className="text-xs font-bold text-forest uppercase tracking-wider block mb-2">
                  Intended Project Goal <span className="text-charcoal-muted font-normal lowercase">(optional)</span>
                </label>
                <select
                  value={intendedUse}
                  onChange={(e) => setIntendedUse(e.target.value)}
                  className="w-full bg-ivory-50 border border-forest/20 rounded-xl px-3.5 py-2.5 text-xs font-medium text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/30"
                >
                  <option value="Any Creative Project">Any Creative Project (All Categories)</option>
                  <option value="Bags & Carry">Bags, Sleeves & Market Totes</option>
                  <option value="Accessories">Small Hair & Pocket Accessories</option>
                  <option value="Home Goods">Cushions, Mats & Table Goods</option>
                  <option value="Art & Living">Wall Tapestry & Textile Artwork</option>
                </select>
              </div>

              {/* Color Swatch Preview from Fabric */}
              <div>
                <span className="text-[11px] font-bold text-forest uppercase tracking-wider block mb-1.5">
                  Extracted Atelier Tones
                </span>
                <div className="flex items-center gap-2">
                  {currentFabric.colorPalette.map((col, idx) => (
                    <div key={idx} className="flex-1 group relative">
                      <div 
                        className="h-7 rounded-lg border border-forest/15 shadow-2xs cursor-pointer transition-transform group-hover:scale-105" 
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="text-[9px] font-mono block text-center mt-1 text-charcoal-muted truncate">
                        {col.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Big Discover Possibilities CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleTriggerAnalysis}
                  disabled={isAnalyzing}
                  className="w-full relative group overflow-hidden py-4 px-6 rounded-2xl bg-forest text-ivory text-base font-semibold shadow-warm hover:bg-forest-800 hover:shadow-warm-lg active:scale-98 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-80"
                >
                  <Sparkles className="w-5 h-5 text-terracotta animate-spin" style={{ animationDuration: '4s' }} />
                  <span>
                    {isAnalyzing ? 'Scanning & Weaving Blueprints...' : 'Discover Possibilities'}
                  </span>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out" />
                </button>

                <p className="text-[11px] text-charcoal-muted text-center mt-2.5 flex items-center justify-center gap-1">
                  <HelpCircle className="w-3 h-3 text-sage" />
                  Instant generative blueprint matching based on weave parameters
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
