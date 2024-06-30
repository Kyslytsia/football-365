import axios from "axios";

const getStandings = async (
  season: number,
  leagueId: number,
  leagueName?: string
) => {
  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/standings?league=${leagueId}&season=${season}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "a9e25ccda5106259432cf3588c6b858b",
        },
      }
    );

    if (
      leagueName === "Euro Championship" ||
      leagueName === "UEFA Europa League" ||
      leagueName === "UEFA Champions League"
    ) {
      return response.data.response[0].league.standings;
    } else {
      return response.data.response[0].league.standings[0];
    }
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};

export { getStandings };
