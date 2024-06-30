import axios from "axios";
import { getCurrentSeason } from "@/hooks";

const year = getCurrentSeason();

const getAllMatchesForSeasonByLeagueId = async (
  season: number,
  leagueId: number
) => {
  try {
    const response = await axios.get(
      `https://v3.football.api-sports.io/fixtures?league=${leagueId}&season=${season}&timezone=Europe/Kiev`,
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

const PremierLeagueAllMatches = async () => {
  return await getAllMatchesForSeasonByLeagueId(year, 39);
};

const LaLigaAllMatches = async () => {
  return await getAllMatchesForSeasonByLeagueId(year, 140);
};

const BundesligaAllMatches = async () => {
  return await getAllMatchesForSeasonByLeagueId(year, 78);
};

const SerieAAllMatches = async () => {
  return await getAllMatchesForSeasonByLeagueId(year, 135);
};

const Ligue1AllMatches = async () => {
  return await getAllMatchesForSeasonByLeagueId(year, 61);
};

const ChampionsLeagueAllMatches = async () => {
  return await getAllMatchesForSeasonByLeagueId(year, 2);
};

const EuropaLeagueAllMatches = async () => {
  return await getAllMatchesForSeasonByLeagueId(year, 3);
};

const EuroAllMatches = async () => {
  return await getAllMatchesForSeasonByLeagueId(
    getCurrentSeason("Euro Championship"),
    4
  );
};

const WorldCup = async () => {
  return await getAllMatchesForSeasonByLeagueId(
    getCurrentSeason("World Cup"),
    1
  );
};

export {
  WorldCup,
  EuroAllMatches,
  LaLigaAllMatches,
  SerieAAllMatches,
  Ligue1AllMatches,
  BundesligaAllMatches,
  EuropaLeagueAllMatches,
  PremierLeagueAllMatches,
  ChampionsLeagueAllMatches,
  getAllMatchesForSeasonByLeagueId,
};
