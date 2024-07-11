import { StandingProps } from "@/types/standings";

export interface TableProps {
  navValue?: string;
  isChampion?: boolean;
  championship?: boolean;
  withOutScroll?: boolean;
  standings: StandingProps[];
}
