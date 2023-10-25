/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        top: "0px -4px 6px -1px rgba(0, 0, 0, 0.1)",
      },
    },
    screens: {
      '3xs': '320px',

      '2xs': '448px',

      'xs': '580px',

      'sm': '640px',

      'md': '768px',

      '2md': '896px',

      'lg': '1024px',

      'xl': '1152px',

      '2xl': '1280px',

      '3xl': '1440px',

      '4xl': '1536px',
    },
  },
  corePlugins: { preflight: false },
  darkMode: ['class', '[data-mode="dark"]'],
  plugins: [],
};
