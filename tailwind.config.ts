import type { Config } from 'tailwindcss';

/**
 * NOIR & BLADE — Premium Urban Barber, Burnt-Copper-Akzent.
 *
 * Eine einzige Akzentfarbe: Copper (#C15A2A). Kein Gold, kein Brass,
 * kein knalliges Rot mehr.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core Backgrounds — warm, dunkel, geschlossen
        black: '#050504',
        ink: {
          DEFAULT: '#0B0A09',
          900: '#050504',
          800: '#151311',
          700: '#1C1815',
          600: '#241F1B',
        },
        charcoal: '#151311',
        panel: '#1C1815',

        // Text
        cream: {
          DEFAULT: '#F0E7D8',
          50: '#F6EFE2',
          100: '#F0E7D8',
        },
        muted: {
          DEFAULT: '#7E7468', // soft-muted (tertiäre Labels)
          cream: '#B6AA9A',   // muted-cream (sekundäre Texte)
        },

        // Signature Accent — Burnt Copper (einzige Akzentfarbe)
        copper: {
          DEFAULT: '#C15A2A',
          500: '#C15A2A',
          600: '#8E3E1F',
          dark: '#8E3E1F',
          muted: '#A65A37',
          soft: '#D17A4A',
        },

        // Lines
        line: {
          DEFAULT: 'rgba(240, 231, 216, 0.14)',
          strong: 'rgba(240, 231, 216, 0.26)',
        },
        overlay: 'rgba(5, 5, 4, 0.72)',
      },
      fontFamily: {
        display: ['var(--font-anton)', 'Impact', 'Oswald', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        script: ['var(--font-marker)', 'Brush Script MT', 'cursive'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      fontSize: {
        'mega': ['clamp(8rem, 22vw, 22rem)', { lineHeight: '0.82', letterSpacing: '-0.04em' }],
        'display-xl': ['clamp(3.5rem, 9vw, 8.5rem)', { lineHeight: '0.92', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '0.96', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 4.2vw, 3.75rem)', { lineHeight: '1.02', letterSpacing: '-0.018em' }],
        eyebrow: ['0.72rem', { lineHeight: '1', letterSpacing: '0.28em' }],
      },
      maxWidth: {
        'page': '1440px',
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'shimmer': 'shimmer 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
