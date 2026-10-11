/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF7',
          100: '#FAF7F0',
          DEFAULT: '#F7F3EB',
          200: '#EFE8DA',
          300: '#E2D8C3',
          400: '#D2C3A5',
        },
        forest: {
          600: '#235244',
          700: '#1D473A',
          DEFAULT: '#183D32',
          800: '#133329',
          900: '#0C201A',
        },
        sage: {
          100: '#EBF0E8',
          200: '#D5DFC8',
          DEFAULT: '#A7B7A0',
          400: '#8A9D82',
          600: '#64755C',
        },
        terracotta: {
          100: '#F9ECE7',
          200: '#F3D2C5',
          DEFAULT: '#C87556',
          600: '#B05F41',
          700: '#944C32',
        },
        charcoal: {
          DEFAULT: '#242923',
          muted: '#525C51',
          light: '#7B8579',
          faint: '#A6AFA4',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        editorial: ['"Cormorant Garamond"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'warm': '0 20px 40px -15px rgba(24, 61, 50, 0.08)',
        'warm-lg': '0 30px 60px -15px rgba(24, 61, 50, 0.12)',
        'craft': '0 4px 20px rgba(36, 41, 35, 0.06)',
      },
      backgroundImage: {
        'linen': 'radial-gradient(rgba(36, 41, 35, 0.04) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}
