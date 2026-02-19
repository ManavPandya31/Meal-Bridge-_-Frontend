/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Restrict scanning to the src folder
    "./components/**/*.{js,jsx,ts,tsx}", // Include your components
    "./pages/**/*.{js,jsx,ts,tsx}", // If using Next.js
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          100: "#f5f5dc",
          200: "#f5e1b3",
          300: "#e0c99d",
          400: "#FAEBD7",
        },
        antiquewhite: {
          100: "#FAEBD7"
        },
      },
    },
  },
  plugins: [],
};
