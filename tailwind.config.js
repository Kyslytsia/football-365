const casper = "#a6b8c9";
const balticSea = "#21202a";
const balticSea2 = "#26242e";
const charade = "#252535";
const tune = "#1b1a22";
const loading = "#0000ff";
const cornflowerBlue = "#6a75f1";

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Grey: casper,
        Black: tune,
        Blue: loading,
        wrapper: {
          bg: balticSea2,
          bgTitle: charade,
          borderBottom: balticSea,
        },
        nav: {
          active: cornflowerBlue,
        },
        round: {
          bg: balticSea2,
        },
        table: {
          border: tune,
          status: {
            ucl: "#1ee119",
            uel: "#637ff8",
            ecl: "#d3c9f2",
            rl: "#e92020",
          },
          form: {
            win: "#1ee11e",
            draw: "#f2ec2c",
            lose: "#f66731",
          },
        },
      },
    },
  },
  plugins: [],
};
