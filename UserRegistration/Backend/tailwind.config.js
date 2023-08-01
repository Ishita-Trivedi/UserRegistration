module.exports = {
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
      "./src/**/*.{html,js}",
      "./build/**/*.{js,jsx,ts,tsx,pug,html}",
      "./public/**/*.{js,jsx,ts,tsx,pug,html}"
    ],
    theme: {
      extend: {},
    },
    plugins: [
      {
        tailwindcss: {},
        autoprefixer: {},
      },
    ],
  };