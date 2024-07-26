import { PlayerSStatistics } from "@/types/teamPlayersStats";

export interface FilteredPlayersProps {
  name: string;
  photo: string;
  nation: string;
  stat: string | number;
}

export interface PlayerStatProps {
  type: string;
  playersStats: PlayerSStatistics[];
}
