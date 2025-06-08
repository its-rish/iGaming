/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          500: '#a3b949',
        },
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        anton: ['var(--font-anton)'],
      },
    },
  },
  plugins: [],
};
