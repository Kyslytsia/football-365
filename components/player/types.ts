export interface PlayerProps {
  name: string;
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
