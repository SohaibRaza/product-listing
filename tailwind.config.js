/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'top': '0px -4px 6px -1px rgba(0, 0, 0, 0.1)',
        // You can adjust the shadow properties as needed.
      },
    },
  },
  corePlugins: { preflight: false },
  plugins: [],
};
