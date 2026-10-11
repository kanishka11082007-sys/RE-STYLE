export interface FabricDesignRequest {
  fabricType: string;
  quantity: string;
  cost: string;
  preferences: string;
  image?: string;
}

export interface DesignConcept {
  id: string;
  title: string;
  description: string;
  estimatedFabricUsage: string;
  estimatedProductionCost: string;
  potentialSellingPrice: string;
  wasteReductionImpact: string;
  sourcesUsed: string[];
}

export interface GenerateDesignsResponse {
  success: boolean;
  fabric: FabricDesignRequest;
  trendsCount: number;
  trends: Array<{
    title: string;
    snippet: string;
    url: string;
  }>;
  designs: DesignConcept[];
  error?: string;
  details?: string;
}

export interface FabricInspectionResult {
  success: boolean;
  inspection?: {
    fiberType: string;
    weave?: string;
    weightGsm?: number;
    texture?: string;
    condition?: 'Crisp Remnant' | 'Gently Washed' | 'Vintage Worn' | 'Frayed Scrap';
    suggestedName?: string;
    tagline?: string;
    colorPalette?: Array<{ name: string; hex: string } | string>;
  };
  error?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Calls Gemini Multimodal Vision on backend to inspect textile swatch image
 */
export async function inspectFabricImage(imageData: string): Promise<FabricInspectionResult> {
  const response = await fetch(`${API_BASE_URL}/api/inspect-fabric-image`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: imageData }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      errorBody.details || errorBody.error || `HTTP ${response.status}`
    );
  }

  return response.json();
}

/**
 * Calls the Re:Style backend to retrieve live TinyFish trend-backed Gemini design concepts
 */
export async function generateDesigns(
  data: FabricDesignRequest
): Promise<GenerateDesignsResponse> {
  const response = await fetch(`${API_BASE_URL}/api/generate-designs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'fabric type': data.fabricType,
      quantity: data.quantity,
      cost: data.cost,
      preferences: data.preferences,
      image: data.image,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(
      errorBody.details || errorBody.error || `HTTP ${response.status}`
    );
  }

  return response.json();
}
