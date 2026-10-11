export interface FabricSample {
  id: string;
  name: string;
  material: string;
  weave: string;
  weightGsm: number;
  condition: 'Crisp Remnant' | 'Gently Washed' | 'Vintage Worn' | 'Frayed Scrap';
  dimensions: { width: number; height: number; unit: 'cm' | 'in' };
  colorPalette: { name: string; hex: string }[];
  texture: string;
  imageUrl: string;
  tagline: string;
}

export const SAMPLE_FABRICS: FabricSample[] = [
  {
    id: 'scrap-indigo-denim',
    name: 'Vintage Selvedge Indigo Denim',
    material: '100% Organic Raw Cotton',
    weave: '3x1 Right-Hand Twill',
    weightGsm: 340,
    condition: 'Gently Washed',
    dimensions: { width: 45, height: 35, unit: 'cm' },
    colorPalette: [
      { name: 'Deep Indigo', hex: '#1e293b' },
      { name: 'Washed Navy', hex: '#334155' },
      { name: 'Ecru Selvedge', hex: '#f1ede4' },
      { name: 'Copper Stitch', hex: '#c87556' },
    ],
    texture: 'Sturdy, structured, tactile rib texture with authentic fading',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
    tagline: 'Ideal for structured utility cases, reinforced bags, and sashiko boro mending.',
  },
  {
    id: 'scrap-linen-sage',
    name: 'Washed European Flax Linen',
    material: '100% Belgian Flax',
    weave: 'Breathable Plain Weave',
    weightGsm: 185,
    condition: 'Crisp Remnant',
    dimensions: { width: 60, height: 40, unit: 'cm' },
    colorPalette: [
      { name: 'Muted Sage', hex: '#a7b7a0' },
      { name: 'Oatmeal', hex: '#e8e2d5' },
      { name: 'Forest Shadow', hex: '#183d32' },
      { name: 'Linen Flax', hex: '#d4cebe' },
    ],
    texture: 'Softly slubbed, airy drape with natural crumpled texture',
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    tagline: 'Effortless relaxed drape, perfect for tea ceremony coasters, bento wraps, and table goods.',
  },
  {
    id: 'scrap-terracotta-corduroy',
    name: 'Warm Terracotta Wide-Wale Corduroy',
    material: 'Cotton & Spandex Blend (98/2)',
    weave: 'Cut Weft Pile (8-Wale)',
    weightGsm: 290,
    condition: 'Crisp Remnant',
    dimensions: { width: 35, height: 25, unit: 'cm' },
    colorPalette: [
      { name: 'Spiced Terracotta', hex: '#c87556' },
      { name: 'Burnt Amber', hex: '#a6563a' },
      { name: 'Warm Cream', hex: '#f7f3eb' },
      { name: 'Earth Ochre', hex: '#d99777' },
    ],
    texture: 'Velvety ribbed surface, tactile warmth and structured body',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    tagline: 'Plush hand-feel suited for pocket organizers, scrunchies, and cozy pouch linings.',
  },
  {
    id: 'scrap-botanical-cotton',
    name: 'Hand-Block Printed Dabu Cotton',
    material: 'Hand-Spun Khadi Cotton',
    weave: 'Artisanal Handloom',
    weightGsm: 140,
    condition: 'Vintage Worn',
    dimensions: { width: 50, height: 50, unit: 'cm' },
    colorPalette: [
      { name: 'Natural Cotton', hex: '#f7f3eb' },
      { name: 'Indigo Leaf', hex: '#203a43' },
      { name: 'Madder Root', hex: '#9e4734' },
      { name: 'Clay White', hex: '#ede8dc' },
    ],
    texture: 'Lightweight, gentle softness with distinctive hand-stamped character',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    tagline: 'Artisanal organic motifs, ideal for patchwork accents, quilted masks, and headband twists.',
  },
];
