/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        customBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'bounce-slow': 'customBounce 1s ease-in-out infinite',
        'bounce-fast': 'customBounce 0.3s ease-in-out infinite',
        'bounce-once': 'customBounce 0.4s ease-in-out 1',
      },
      fontFamily: {
        sans: ['Catamaran', 'serif'],
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


