import axios from "axios";
import { getCurrentSeason } from "@/hooks";

const year = getCurrentSeason();

export const getPlayerInfo = async (id: string) => {
  try {
    const playerInfo = await axios.get(
      `https://v3.football.api-sports.io/players?id=${id}&season=${year}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "a9e25ccda5106259432cf3588c6b858b",
        },
      }
    );

    const nation = playerInfo.data.response[0].player.nationality;
    const idTeam = playerInfo.data.response[0].statistics[0].team.id;

    const nationality = await axios.get(
      `https://v3.football.api-sports.io/teams?name=${nation}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "a9e25ccda5106259432cf3588c6b858b",
        },
      }
    );

    const squad = await axios.get(
      `https://v3.football.api-sports.io/players/squads?team=${idTeam}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "a9e25ccda5106259432cf3588c6b858b",
        },
      }
    );

    const transfers = await axios.get(
      `https://v3.football.api-sports.io/transfers?player=${id}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "a9e25ccda5106259432cf3588c6b858b",
        },
      }
    );

    const trophies = await axios.get(
      `https://v3.football.api-sports.io/trophies?player=${id}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "a9e25ccda5106259432cf3588c6b858b",
        },
      }
    );

    const player = squad?.data?.response?.[0].players.filter(
      (player: any) => player.id === playerInfo.data.response[0].player.id
    );

    return {
      number: player[0].number,
      info: playerInfo?.data?.response,
      trophies: trophies.data.response,
      transfers: transfers?.data?.response[0].transfers,
      nationalityLogo: nationality?.data?.response?.[0].team.logo,
    };
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};
