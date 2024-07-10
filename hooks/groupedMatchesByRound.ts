import { GroupedMatches } from "@/types/groupedMatches";

export const groupedMatchesByRound = (
  round: string,
  groupedMatches: GroupedMatches[]
) => {
  return groupedMatches
    .map((group) => {
      const filteredLeagueMatches = group.matches.filter(
        (leagueMatches) => leagueMatches.leagueRound === round
      );

      if (filteredLeagueMatches.length > 0) {
        return { ...group, matches: filteredLeagueMatches };
      }
      return null;
    })
    .filter((group): group is GroupedMatches => group !== null);
};
