/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Editorial Palette: Vintage Denim, Paper, & Warm Stitching
        paper: {
          50: '#FAF8F4',
          100: '#F7F4EE',
          DEFAULT: '#F7F4EE',
          200: '#EFEAE0',
          300: '#E4DDD0',
          400: '#D5CBB9',
        },
        navy: {
          50: '#F0F3F7',
          100: '#DCE4ED',
          600: '#3A4B66',
          700: '#2E3D54',
          DEFAULT: '#253247',
          800: '#1E293B',
          900: '#151D2A',
        },
        denim: {
          50: '#F1F6FA',
          100: '#DEEAF2',
          200: '#B8D1E3',
          300: '#8FB5D1',
          DEFAULT: '#496E8A',
          600: '#3D5E77',
          700: '#324C60',
          800: '#273C4C',
        },
        bluegray: {
          50: '#F6F9FA',
          100: '#EBF1F5',
          DEFAULT: '#E2EBF0',
          200: '#D2DFE6',
          300: '#BDCFD8',
          400: '#A3B9C4',
        },
        coral: {
          50: '#FCF5F3',
          100: '#F8E7E2',
          200: '#F2CEC4',
          DEFAULT: '#C96F52',
          dark: '#AC583E',
          600: '#B85E42',
          700: '#9E4C33',
          800: '#7F3C28',
        },
        gold: {
          50: '#FAF6EE',
          100: '#F4ECD8',
          DEFAULT: '#D6AD64',
          dark: '#BC9347',
          600: '#C2984F',
          700: '#A37D39',
        },
        charcoal: {
          DEFAULT: '#27313D',
          muted: '#596575',
          light: '#7A8798',
          faint: '#A5B0BF',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          elevated: '#FCFBF9',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        editorial: ['"Cormorant Garamond"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      scale: {
        '98': '0.98',
      },
      boxShadow: {
        '2xs': '0 1px 2px 0 rgba(37, 50, 71, 0.05)',
        'xs': '0 1px 2px 0 rgba(37, 50, 71, 0.06)',
        'warm': '0 20px 40px -15px rgba(37, 50, 71, 0.09)',
        'warm-lg': '0 30px 60px -15px rgba(37, 50, 71, 0.14)',
        'craft': '0 4px 20px rgba(37, 50, 71, 0.06)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.25s ease-out forwards',
      },
      backgroundImage: {
        'linen': 'radial-gradient(rgba(37, 50, 71, 0.04) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}
