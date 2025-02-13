interface Birth {
  date: string;
  place: string;
  country: string;
}

interface Player {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  birth: Birth;
  nationality: string;
  height: string;
  weight: string;
  injured: boolean;
  photo: string;
}

interface Cards {
  yellow: number;
  yellowred: number;
  red: number;
}

interface Dribbles {
  attempts: number;
  success: number;
  past: number | null;
}

interface Duels {
  total: number;
  won: number;
}

interface Fouls {
  drawn: number | null;
  committed: number | null;
}

interface Games {
  appearences: number;
  lineups: number;
  minutes: number;
  number: number | null;
  position: string;
  rating: string;
  captain: boolean;
}

interface Goals {
  total: number;
  conceded: number;
  assists: number | null;
  saves: number | null;
}

interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
}

interface Passes {
  total: number;
  key: number;
  accuracy: number;
}

interface Penalty {
  won: number | null;
  commited: number | null;
  scored: number;
  missed: number;
  saved: number | null;
}

interface Shots {
  total: number | null;
  on: number | null;
}

interface Substitutes {
  in: number;
  out: number;
  bench: number;
}

interface Tackles {
  total: number;
  blocks: number | null;
  interceptions: number | null;
}

interface Team {
  id: number;
  name: string;
  logo: string;
}

interface Statistics {
  cards: Cards;
  dribbles: Dribbles;
  duels: Duels;
  fouls: Fouls;
  games: Games;
  goals: Goals;
  league: League;
  passes: Passes;
  penalty: Penalty;
  shots: Shots;
  substitutes: Substitutes;
  tackles: Tackles;
  team: Team;
}

export interface PlayerStatistics {
  player: Player;
  statistics: Statistics[];
}
