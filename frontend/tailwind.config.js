// This file is used to configure Tailwind CSS for the frontend codebase.
// It specifies the content paths and extends the default theme with custom colors and fonts.

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00205B',  // deep navy
        accent: '#00A9E0',   // vibrant cyan
        'text-dark': '#1A1A1A',
        'bg-light': '#F5F7FA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
