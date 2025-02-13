import { MatchProps } from "@/types/match";

export interface FinalProps {
  winner: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  homeTeamName?: string;
  awayTeamName?: string;
  goalsFirstTeam: number;
  goalsSecondTeam: number;
  finalNotStarted: boolean;
  final: MatchProps | null;
  finalEndedOnPenalties: boolean;
  scorePenaltyHome?: number | null;
  scorePenaltyAway?: number | null;
}
