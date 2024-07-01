const casper = "#a6b8c9";
const balticSea = "#21202a";
const balticSea2 = "#26242e";
const charade = "#252535";
const tune = "#1b1a22";

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Grey: casper,
        Black: tune,
        wrapper: {
          bg: balticSea2,
          bgTitle: charade,
          borderBottom: balticSea,
        },
      },
    },
  },
  plugins: [],
};
