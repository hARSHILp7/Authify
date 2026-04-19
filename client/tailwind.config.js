/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { 
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
      colors: {
        paper: "var(--color-paper)",
        stone: "var(--color-stone)",
        coral: "var(--color-coral)",
        black: "var(--color-black)",
        red: "var(--color-red)",
      },
    },
  },
  plugins: [],
}