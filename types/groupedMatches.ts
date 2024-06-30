import { MatchProps } from "./match";

export interface Matches {
  leagueId: number;
  leagueName: string;
  leagueLogo: string;
  leagueRound: string;
  matches: MatchProps[];
}

export interface GroupedMatches {
  date: string;
  dayOfWeek: number;
  matches: Matches[];
}
