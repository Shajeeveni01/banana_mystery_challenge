// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Ensures Tailwind scans all files in src
  ],
  theme: {
    extend: {
      colors: {
        bananaYellow: '#FFE135',
        darkBrown: '#6B4226',
      },
    },
  },
  plugins: [],
};
