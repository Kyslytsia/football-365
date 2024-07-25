import axios from "axios";
import { getCurrentSeason } from "@/hooks";

const year = getCurrentSeason();

export const getLeagueForTeamOnId = async (id: string) => {
  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/leagues?team=${id}`,
      {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "a9e25ccda5106259432cf3588c6b858b",
        },
      }
    );

    const league = response.data.response.find((el: any) =>
      el?.league?.type === "League"
        ? el?.league?.type === "League"
        : el?.league?.name === "UEFA Nations League"
    );

    console.log({ league });

    if (league.league.type === "League")
      return { nameLeague: league.league.name, data: league.league.id };

    if (league.league.name === "UEFA Nations League") {
      const currentDate = new Date().toISOString().split("T")[0];

      const seasons = league.seasons;
      const lastSeason = seasons[seasons.length - 1];
      const secondLastSeason = seasons[seasons.length - 2];

      const getYear = () => {
        if (currentDate >= lastSeason.start) {
          return lastSeason.year;
        } else {
          return secondLastSeason.year;
        }
      };

      const response = await axios.get(
        `https://v3.football.api-sports.io/standings?league=${
          league.league.id
        }&season=${getYear()}`,
        {
          headers: {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "a9e25ccda5106259432cf3588c6b858b",
          },
        }
      );

      return {
        nameLeague: league.league.name,
        data: response.data.response[0].league.standings,
      };
    }
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};
