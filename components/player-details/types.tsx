import { Coach } from "@/types/coach";
import { PlayerStatistics } from "@/types/teamPlayersStats";

export interface PlayerDetailsProps {
  coach?: boolean;
  number?: number | null;
  nationalityLogo: string;
  coachInfo?: Coach[] | [];
  playerInfo?: PlayerStatistics[] | [];
}
