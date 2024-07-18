const mainTheme = "rgb(31, 33, 43)";
const alizarinCrimson = "#e92020";
const balticSea = "#21202a";
const balticSea2 = "#26242e";
const casper = "#a6b8c9";
const charade = "#252535";
const cornflowerBlue = "#6a75f1";
const flamingo = "#f66731";
const goldenDream = "#f2ec2c";
const loading = "#0000ff";
const malachite = "#1ee119";
const moonRaker = "#d3c9f2";
const tune = "#1b1a22";

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Grey: casper,
        Black: tune,
        Blue: loading,
        Green: malachite,
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
          bg: balticSea2,
          border: tune,
          status: {
            ucl: malachite,
            uel: cornflowerBlue,
            ecl: moonRaker,
            rl: alizarinCrimson,
          },
          form: {
            win: malachite,
            draw: goldenDream,
            lose: flamingo,
          },
        },
      },
    },
  },
  plugins: [],
};
