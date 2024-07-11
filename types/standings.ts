export interface Goals {
  against: number;
  for: number;
}

export interface Record {
  draw: number;
  goals: Goals;
  lose: number;
  played: number;
  win: number;
}

export interface Team {
  id: number;
  logo: string;
  name: string;
}

export interface StandingProps {
  all: Record;
  away: Record;
  description: string;
  form: string;
  goalsDiff: number;
  group: string;
  home: Record;
  points: number;
  rank: number;
  status: string;
  team: Team;
  update: string;
}
