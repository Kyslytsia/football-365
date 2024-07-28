import { PlayerStatistics } from "@/types/teamPlayersStats";

export interface FilteredPlayersProps {
  id: number;
  name: string;
  photo: string;
  nation: string;
  stat: string | number;
}

export interface PlayerStatProps {
  type: string;
  playersStats: PlayerStatistics[];
}
