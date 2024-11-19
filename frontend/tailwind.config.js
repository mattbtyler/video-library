/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'green-500': '#B4FE17'
      },
      fontFamily: {
        sans: ['"SFProDisplay"', 'system-ui'],
        yu: ['"Yu Gothic"', 'sans-serif']
      }
    }
  },
  plugins: []
};
