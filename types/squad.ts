interface Birth {
  date: string;
  place: string;
  country: string;
}

interface Coach {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number;
  birth: Birth;
  nationality: string;
  height: string | null;
  weight: string | null;
  photo: string;
  career: Array<{
    start: string;
    end: string | null;
    team: string;
  }>;
}

export interface Player {
  id: number;
  name: string;
  age: number;
  number: number | null;
  position: string;
  photo: string;
}

export interface Squad {
  coach: Coach[];
  players: Player[];
}
