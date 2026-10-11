export interface CommunityMake {
  id: string;
  makerName: string;
  makerHandle: string;
  avatarUrl: string;
  projectName: string;
  fabricOrigin: string;
  beforeScrapUrl: string;
  afterMakeUrl: string;
  quote: string;
  timeSpent: string;
  fabricSavedGrams: number;
}

export const COMMUNITY_MAKES: CommunityMake[] = [
  {
    id: 'make-1',
    makerName: 'Elena Rostova',
    makerHandle: '@elena_atelier',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    projectName: 'Boro Patchwork Sashiko Chore Jacket',
    fabricOrigin: '3 damaged denim jeans + vintage linen offcuts',
    beforeScrapUrl: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
    afterMakeUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    quote: 'Instead of discarding fraying denim hem cutoffs, ReStylee showed me how to piece them into a wearable statement piece with running sashiko stitches.',
    timeSpent: '5.5 hours',
    fabricSavedGrams: 620,
  },
  {
    id: 'make-2',
    makerName: 'Marcus Chen',
    makerHandle: '@chen_craftworks',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    projectName: 'Japanese Knot Bag & Coaster Suite',
    fabricOrigin: 'Deadstock upholstery sample swatches',
    beforeScrapUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    afterMakeUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    quote: 'Interior design firms throw away thousands of fabric swatches every season. The AI scanner matched my samples to clean origami fold patterns.',
    timeSpent: '2.0 hours',
    fabricSavedGrams: 380,
  },
  {
    id: 'make-3',
    makerName: 'Amara Diop',
    makerHandle: '@amara_stitches',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    projectName: 'Zero-Waste Quilted Laptop Envelope',
    fabricOrigin: 'Factory offcut cotton velvet & linen lining',
    beforeScrapUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    afterMakeUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    quote: 'The step-by-step cutting layout blueprint saved me from making wasteful cuts. It feels like carrying a piece of textile art to meetings.',
    timeSpent: '1.5 hours',
    fabricSavedGrams: 290,
  }
];
