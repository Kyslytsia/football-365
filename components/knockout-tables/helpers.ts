import { MatchProps } from "@/types/match";

export const getMatches = (
  roundOf16: MatchProps[],
  quarterFinals: MatchProps[]
) => {
  const findTeam = (el?: MatchProps) => {
    if (!el) return [];

    const found1Match = roundOf16.find(
      (team) => team.teams.home.name === el.teams.home.name
    );

    const found2Match = found1Match
      ? roundOf16.find(
          (team) => team.teams.away.name === found1Match.teams.home.name
        )
      : undefined;

    const filteredMatches = [found1Match, found2Match].filter(
      (match): match is MatchProps => match !== undefined
    );

    const sortedMatches = filteredMatches.sort((a, b) => {
      const dateA = new Date(a.fixture.date);
      const dateB = new Date(b.fixture.date);
      return dateA.getTime() - dateB.getTime();
    });

    return sortedMatches;
  };

  return (el?: MatchProps, index?: number, index2?: number) => {
    if (quarterFinals.length > 0) {
      return findTeam(el);
    }

    if (roundOf16.length > 0 && index !== undefined && index2 !== undefined) {
      return roundOf16.slice(index, index2);
    }

    return [];
  };
};
