export interface PlayerSquadProps {
  id: number;
  name: string;
  photo: string;
  coach?: boolean;
  position: string;
  number?: string | number | null;
}
