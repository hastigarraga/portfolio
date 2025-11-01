/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // o 'media' si preferís automático
  content: ["./src/**/*.{html,ts,scss}"],
  safelist: [
    // agrega aquí utilidades generadas dinámicamente si aplica
    'bg-primary','text-primary','border-primary',
    'bg-secondary','text-secondary','border-secondary',
    'bg-bg'
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0EA5E9",
        secondary: "#8B5CF6",
        bg: "#0B0F17",
      },
      fontFamily: {
        heading: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      }
    },
  },
  plugins: [],
};
