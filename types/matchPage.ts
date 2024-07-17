import { Fixture, Goals, League, Score, Teams } from "./match";

// For Event
export interface Assist {
  id: number | null;
  name: string | null;
}

export interface Player {
  id: number;
  name: string;
}

export interface Team {
  id: number;
  logo: string;
  name: string;
}

export interface Time {
  elapsed: number;
  extra: number | null;
}

export interface Events {
  assist: Assist;
  comments: string;
  detail: string;
  player: Player;
  team: Team;
  time: Time;
  type: string;
}

// For Statistics
export interface Statistic {
  type: string;
  value: number | string | null;
}

export interface Statistics {
  team: Team;
  statistics: Statistic[];
}

// For Lineups
export interface Team {
  id: number;
  name: string;
  logo: string;
  colors?: Colors;
}

export interface Colors {
  primary: string;
  secondary: string;
  text: string;
}

export interface Coach {
  id: number;
  name: string;
  photo: string;
}

export interface Player {
  grid: string | null;
  id: number;
  name: string;
  number: number;
  pos: string;
}

export interface StartXI {
  player: Player;
}

export interface Substitute {
  player: Player;
}

export interface Lineups {
  team: Team;
  coach: Coach;
  formation: string;
  startXI: StartXI[];
  substitutes: Substitute[];
}

// For Players
export interface PlayersData {
  team: Team;
  players: PlayerData[];
}

export interface Team {
  id: number;
  logo: string;
  name: string;
  update?: string;
}

export interface PlayerData {
  player: Player;
  statistics: PlayerStatistics[];
}

export interface Player {
  id: number;
  name: string;
  photo: string;
}

export interface PlayerStatistics {
  games: Games;
  goals: Goal;
  shots: Shots;
  passes: Passes;
  tackles: Tackles;
  duels: Duels;
  dribbles: Dribbles;
  fouls: Fouls;
  cards: Cards;
  penalty: Penalty;
  offsides: number | null;
}

export interface Games {
  minutes: number;
  number: number;
  position: string;
  rating: string;
  captain: boolean;
}

export interface Goal {
  total: number;
  conceded: number;
  assists: number;
  saves: number | null;
}

export interface Shots {
  total: number;
  on: number;
}

export interface Passes {
  total: number;
  key: number | null;
  accuracy: string;
}

interface Tackles {
  total: number;
  blocks: number | null;
  interceptions: number | null;
}

interface Duels {
  total: number;
  won: number;
}

interface Dribbles {
  attempts: number;
  success: number;
  past: number | null;
}

interface Fouls {
  drawn: number;
  committed: number;
}

interface Cards {
  yellow: number;
  red: number;
}

interface Penalty {
  won: number | null;
  commited: number | null;
  scored: number;
  missed: number;
  saved: number | null;
}

export interface Match {
  fixture: Fixture;
  goals: Goals;
  league: League;
  score: Score;
  teams: Teams;
  events: Events[];
  statistics: Statistics[];
  lineups: Lineups[];
  players: PlayersData[];
}
