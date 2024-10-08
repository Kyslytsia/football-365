import axios from "axios";
import { getCurrentSeason } from "@/hooks";

const year = getCurrentSeason();

export const getCoachInfo = async (id: string) => {
  try {
    const coachInfo = await axios.get(
      `https://v3.football.api-sports.io/coachs?id=${id}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "a9e25ccda5106259432cf3588c6b858b",
        },
      }
    );

    const nation = coachInfo.data.response[0].birth.country;

    const nationality = await axios.get(
      `https://v3.football.api-sports.io/teams?name=${nation}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "a9e25ccda5106259432cf3588c6b858b",
        },
      }
    );

    const trophies = await axios.get(
      `https://v3.football.api-sports.io/trophies?coach=${id}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "a9e25ccda5106259432cf3588c6b858b",
        },
      }
    );

    return {
      info: coachInfo.data.response,
      trophies: trophies.data.response,
      nationalityLogo: nationality?.data?.response?.[0].team.logo,
    };
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};
