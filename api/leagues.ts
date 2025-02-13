import axios from "axios";

const leaguesApi = async (url?: string) => {
  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/standings?league=3&season=2023`,
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

const PremierLeague = async () => {
  return await leaguesApi("/leagues?id=39");
};

const LaLiga = async () => {
  return await leaguesApi("/leagues?id=140");
};

const Bundesliga = async () => {
  return await leaguesApi("/leagues?id=78");
};

const SerieA = async () => {
  return await leaguesApi("/leagues?id=135");
};

const Ligue1 = async () => {
  return await leaguesApi("/leagues?id=61");
};

export { leaguesApi, PremierLeague, LaLiga, Bundesliga, SerieA, Ligue1 };
