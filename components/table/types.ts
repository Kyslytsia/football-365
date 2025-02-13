import { StandingProps } from "@/types/standings";
import { ReactNode } from "react";

export interface TableProps {
  navValue?: string;
  isChampion?: boolean;
  championship?: boolean;
  withOutScroll?: boolean;
  standings: StandingProps[];
  component?: ReactNode | string;
}
