import axios from "axios";
import { getCurrentSeason } from "@/hooks";

const year = getCurrentSeason();

export const getPlayerInfo = async (id: string) => {
  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/players?id=${id}&season=${year}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "a9e25ccda5106259432cf3588c6b858b",
        },
      }
    );

    const idTeam = response.data.response[0].statistics[0].team.id;

    const squad = await axios.get(
      `https://v3.football.api-sports.io/players/squads?team=${idTeam}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "a9e25ccda5106259432cf3588c6b858b",
        },
      }
    );

    const player = squad.data.response[0].players.filter(
      (player: any) => player.id === response.data.response[0].player.id
    );

    console.log(idTeam);

    return {
      stat: response.data.response,
      number: player.number[0].number,
    };
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};
