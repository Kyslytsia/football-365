import axios from "axios";
import { getCurrentSeason } from "@/hooks";

const year = getCurrentSeason();

export const getSquad = async (id: string) => {
  try {
    const squad = await axios.get(
      `https://v3.football.api-sports.io/players/squads?team=${id}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "a9e25ccda5106259432cf3588c6b858b",
        },
      }
    );

    const coach = await axios.get(
      `https://v3.football.api-sports.io/coachs?team=${id}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "a9e25ccda5106259432cf3588c6b858b",
        },
      }
    );

    return {
      coach: coach.data.response,
      players: squad.data.response[0].players,
    };
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};
