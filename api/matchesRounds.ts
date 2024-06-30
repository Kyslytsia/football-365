import axios from "axios";

import { getCurrentSeason } from "@/hooks";

const year = getCurrentSeason();

const getMatchesRounds = async (
  round: string,
  season: number,
  leagueId: number
) => {
  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/fixtures?league=${leagueId}&season=${season}&round=${round}`,
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

const getRoundOf16Matches = async (id: number) => {
  return await getMatchesRounds("Round%20of%2016", year, id);
};

const getQuarterFinalsMatches = async (id: number) => {
  return await getMatchesRounds("Quarter-finals", year, id);
};

const getSemiFinalsMatches = async (id: number) => {
  return await getMatchesRounds("Semi-finals", year, id);
};

const getFinalMatch = async (id: number) => {
  return await getMatchesRounds("Final", year, id);
};

export {
  getFinalMatch,
  getMatchesRounds,
  getRoundOf16Matches,
  getSemiFinalsMatches,
  getQuarterFinalsMatches,
};
