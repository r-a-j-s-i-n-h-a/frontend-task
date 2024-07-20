/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'page1': "url('/src/assets/images/image 7.png')",
        'page2': "url('/src/assets/images/image 8.png')",
        'page3': "url('/src/assets/images/image 9.png')",
        'page4': "url('/src/assets/images/Reset-Password-Success.jpg')",
      },
      colors: {
        cOrange: '#FE8C00',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        spin75: 'spin75 1.5s linear infinite',
      },
      keyframes: {
        spin75: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
