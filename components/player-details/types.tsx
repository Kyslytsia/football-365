import { PlayerStatistics } from "@/types/teamPlayersStats";

export interface PlayerDetailsProps {
  number?: number | null;
  nationalityLogo: string;
  stat: PlayerStatistics[] | [];
}
