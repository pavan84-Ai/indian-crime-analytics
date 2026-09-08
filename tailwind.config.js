/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#008F68',
          dark: '#006B50',
          light: '#EAF8F2',
          50: '#EAF8F2',
          100: '#D2F0E2',
        },
        violet: {
          soft: '#F1EEFE',
          DEFAULT: '#7C6EF2',
        },
        ink: '#0F1E1A',
        muted: '#6B7A76',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
      },
      boxShadow: {
        card: '0 2px 10px rgba(15, 30, 26, 0.06)',
        soft: '0 8px 24px rgba(15, 30, 26, 0.08)',
      },
      keyframes: {
        'pop': { '0%': { transform: 'scale(1)' }, '40%': { transform: 'scale(1.3)' }, '100%': { transform: 'scale(1)' } },
        'slide-up': { '0%': { transform: 'translateY(12px)', opacity: 0 }, '100%': { transform: 'translateY(0)', opacity: 1 } },
        'fade-in': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        'shimmer': { '0%': { backgroundPosition: '-400px 0' }, '100%': { backgroundPosition: '400px 0' } },
      },
      animation: {
        'pop': 'pop 0.35s ease',
        'slide-up': 'slide-up 0.35s ease',
        'fade-in': 'fade-in 0.25s ease',
        'shimmer': 'shimmer 1.4s infinite linear',
      },
    },
  },
  plugins: [],
}
