/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        fin: {
          primary: '#1E40AF',
          'primary-hover': '#1D4ED8',
          secondary: '#475569',
          'secondary-hover': '#334155',
          danger: '#DC2626',
          'danger-hover': '#B91C1C',
          success: '#16A34A',
          warning: '#D97706',
          info: '#2563EB',
          surface: '#F8FAFC',
          border: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
