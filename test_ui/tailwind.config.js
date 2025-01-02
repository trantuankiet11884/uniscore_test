/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right,#203397 , #122690, #091557)',
        'custom-gradient-chart': 'linear-gradient(to right, #0A1F5566, #102C7366, #0C1A4C66)',
        'custom-gradient-matchList': 'linear-gradient(to right, #0A1F5566, #102C7366, #0C1A4C66)',
        'custom-gradient-matchList-score': 'linear-gradient(to bottom, #091557, #001F7B, #00289F)',
      },
    },
  },
  plugins: [],
};
