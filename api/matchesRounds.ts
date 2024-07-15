import axios from "axios";

import { getCurrentSeason } from "@/hooks";

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

const getRoundOf16Matches = async (id: number, name: string) => {
  return await getMatchesRounds("Round%20of%2016", getCurrentSeason(name), id);
};

const getQuarterFinalsMatches = async (id: number, name: string) => {
  return await getMatchesRounds("Quarter-finals", getCurrentSeason(name), id);
};

const getSemiFinalsMatches = async (id: number, name: string) => {
  return await getMatchesRounds("Semi-finals", getCurrentSeason(name), id);
};

const getFinalMatch = async (id: number, name: string) => {
  return await getMatchesRounds("Final", getCurrentSeason(name), id);
};

export {
  getFinalMatch,
  getMatchesRounds,
  getRoundOf16Matches,
  getSemiFinalsMatches,
  getQuarterFinalsMatches,
};
