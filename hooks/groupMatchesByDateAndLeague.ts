import { format } from "date-fns";

import { MatchProps } from "@/types/match";
import { GroupedMatches } from "@/types/groupedMatches";

export const groupMatchesByDateAndLeague = (matches: MatchProps[]) => {
  const groupedMatches: GroupedMatches[] = [];

  matches.forEach((match) => {
    const matchDate = new Date(match.fixture.date);
    const dateKey = format(matchDate, "yyyy-MM-dd");
    const leagueId = match.league.id;
    const leagueName = match.league.name;
    const leagueLogo = match.league.logo;
    const leagueRound = match.league.round;

    let dateGroup = groupedMatches.find((group) => group.date === dateKey);

    if (!dateGroup) {
      dateGroup = {
        date: dateKey,
        dayOfWeek: matchDate.getDay(),
        matches: [],
      };

      groupedMatches.push(dateGroup);
    }

    const leagueGroup = dateGroup.matches.find(
      (group) => group.leagueName === leagueName
    );

    if (leagueGroup) {
      leagueGroup.matches.push(match);
    } else {
      dateGroup.matches.push({
        leagueId: leagueId,
        leagueName: leagueName,
        leagueLogo: leagueLogo,
        leagueRound: leagueRound,
        matches: [match],
      });
    }

    console.log(dateKey);
  });

  groupedMatches
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    })
    .map((el) =>
      el.matches.map((el) =>
        el.matches.sort((a, b) => {
          const dateA = new Date(a.fixture.date);
          const dateB = new Date(b.fixture.date);
          return dateA.getTime() - dateB.getTime();
        })
      )
    );

  return groupedMatches;
};
