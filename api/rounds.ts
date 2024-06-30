import axios from "axios";

const getRounds = async (season: number, leagueId: number) => {
  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/fixtures/rounds?season=${season}&league=${leagueId}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "a9e25ccda5106259432cf3588c6b858b",
        },
      }
    );

    return response.data.response;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};

export { getRounds };
