import { Match } from "@/types/matchPage";

export interface PreviousMeetingsProps {
  homeId: number;
  awayId: number;
  logoHome: string;
  logoAway: string;
  homeName: string;
  awayName: string;
  matches?: Match[] | [];
}
