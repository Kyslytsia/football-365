import axios from "axios";
import { getCurrentSeason } from "@/hooks";

const year = getCurrentSeason();

export const getTeamMatches = async (teamId: string) => {
  try {
    const teamInfo = await axios.get(
      `https://v3.football.api-sports.io/teams?id=${teamId}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "a9e25ccda5106259432cf3588c6b858b",
        },
      }
    );

    const isNational = teamInfo.data.response[0].team.national;
    const witchYear = isNational ? year + 1 : year;

    const matches = await axios.get(
      `https://v3.football.api-sports.io/fixtures?&team=${teamId}&season=${witchYear}&timezone=Europe/Kiev`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "a9e25ccda5106259432cf3588c6b858b",
        },
      }
    );

    return matches.data.response;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};
