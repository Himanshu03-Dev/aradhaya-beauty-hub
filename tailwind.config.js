/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#140D10', soft: '#221619', mute: '#3A2A2E' },
        wine: { deep: '#360A1C', DEFAULT: '#5A0F2B', light: '#7C1739' },
        rouge: { DEFAULT: '#A8194E', soft: '#C4306A' },
        gold: { deep: '#9A7333', DEFAULT: '#C29B54', light: '#E3C88E' },
        champagne: '#E9DABE',
        ivory: '#FBF7F1',
        cream: '#F3EADC',
        sand: '#DFD0BC',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.2rem, 11vw, 10rem)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.6rem, 7vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(2rem, 4.6vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.6rem, 3vw, 2.5rem)', { lineHeight: '1.15' }],
        eyebrow: ['0.7rem', { lineHeight: '1', letterSpacing: '0.36em' }],
      },
      spacing: { section: 'clamp(5rem, 12vh, 9rem)' },
      maxWidth: { shell: '88rem' },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
        luxe: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translate3d(0,0,0)' }, '100%': { transform: 'translate3d(-50%,0,0)' } },
        shimmer: { '0%': { backgroundPosition: '200% 50%' }, '100%': { backgroundPosition: '-200% 50%' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        scrollDot: { '0%': { transform: 'translateY(-100%)', opacity: '0' }, '40%': { opacity: '1' }, '100%': { transform: 'translateY(220%)', opacity: '0' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
        floaty: 'floaty 7s ease-in-out infinite',
        scrollDot: 'scrollDot 2.4s cubic-bezier(0.65,0,0.35,1) infinite',
      },
    },
  },
  plugins: [],
}
