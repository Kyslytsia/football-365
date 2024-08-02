export interface PlayerProps {
  id: number;
  name: string;
  coach?: boolean;
  number?: number;
  playerPhoto: string;
  playerSubsName?: string;
  playerRedCard?: boolean;
  playerSubsNumber?: number;
  playerYellowCard?: boolean;
  playerSubs?: number | string;
  playerGoal?: number | string;
  stat?: React.ReactNode | string | number;
}
