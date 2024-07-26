import axios from "axios";
import { getCurrentSeason } from "@/hooks";

const year = getCurrentSeason();

export const getPlayersOfTeamStats = async (id: string) => {
  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/players?team=${id}&season=2023`,
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
