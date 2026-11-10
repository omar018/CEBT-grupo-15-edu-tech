/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        unal: {
          50: '#F4F9F2',
          100: '#E4F2DE',
          200: '#C7E4BE',
          300: '#94B43B', // Lima institucional UNAL
          400: '#6FA42F',
          500: '#4D8B28',
          600: '#2F7523',
          700: '#006837', // Verde institucional clásico UNAL
          800: '#00522B',
          900: '#003D20',
          950: '#081E12', // Fondo oscuro verde petróleo
        },
        surface: {
          50: '#FAFBF9',
          100: '#F3F6F1',
          200: '#E6ECE2',
          300: '#D5DFD0',
          800: '#17221B',
          900: '#0E1712',
          950: '#070C09',
        },
        border: 'hsl(var(--border) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: '1rem',
        md: '0.75rem',
        sm: '0.5rem',
        xs: '0.375rem',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 104, 55, 0.04), 0 1px 2px -1px rgba(0, 104, 55, 0.04)',
        'elevated': '0 8px 30px -4px rgba(0, 104, 55, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 25px -5px rgba(148, 180, 59, 0.35)',
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }
    },
  },
  plugins: [],
}
