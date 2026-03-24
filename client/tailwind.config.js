/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { 
    extend: {
      colors: {
        darkBackground: "var(--color-darkBackground)",
        lightBackground: "var(--color-lightBackground)",
        accent: "var(--color-accent)",
      },
    },
  },
  plugins: [],
}