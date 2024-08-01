interface Team {
  id: number;
  logo: string;
  name: string;
}

export interface Transfer {
  date: string;
  teams: {
    in: Team;
    out: Team;
  };
  type: string;
}
