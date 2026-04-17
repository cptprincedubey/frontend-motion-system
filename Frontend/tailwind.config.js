/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { keyframes: {
      scrollLine: {
        "0%":   { transform: "translateY(-100%)" },
        "100%": { transform: "translateY(200%)" },
      },
    },
    animation: {
      scrollLine: "scrollLine 2s ease-in-out infinite",
    },},
  },
  plugins: [],
}






