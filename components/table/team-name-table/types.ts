import { StandingProps } from "@/types/standings";

export interface TeamNameTableProps {
  isChampion?: boolean;
  championship?: boolean;
  standings: StandingProps[];
}
