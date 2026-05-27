/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#185FA5',
          50: '#EDF4FC',
          100: '#B5D4F4',
          400: '#378ADD',
          500: '#185FA5',
          700: '#0F4377',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F4F5F7',
          border: '#E5E7EB',
        },
        ink: {
          DEFAULT: '#111827',
          muted: '#6B7280',
          light: '#9CA3AF',
        },
      },
      fontWeight: {
        title: '500',
      },
    },
  },
  plugins: [],
};
