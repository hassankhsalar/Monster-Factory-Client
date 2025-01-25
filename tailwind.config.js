/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Catamaran', 'serif'], // Add Roboto as the default sans font
      },
      colors: {
        'text': '#03191c',
        'background': '#ffffff',
        'primary': '#2dc9e5',
        'secondary': '#9377ee',
        'accent': '#aa4de9',
       },
    },
  }, 
  plugins: [],
};


