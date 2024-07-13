const casper = "#a6b8c9";
const balticSea = "#21202a";
const balticSea2 = "#26242e";
const charade = "#252535";
const tune = "#1b1a22";
const loading = "#0000ff";
const cornflowerBlue = "#6a75f1";
const malachite = "#1ee119";
const moonRaker = "#d3c9f2";
const alizarinCrimson = "#e92020";
const goldenDream = "#f2ec2c";
const flamingo = "#f66731";
export const mainTheme = "rgb(31, 33, 43)";

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
