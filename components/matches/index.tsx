import React, { memo } from "react";
import { View } from "react-native";

import { Matches as MatchesProps } from "@/types/groupedMatches";

import { Match } from "../match";

export const Matches = memo(({ matches }: { matches: MatchesProps[] }) => {
  return (
    <>
      {matches.map((league) => {
        return (
          <View
            key={league.leagueName}
            className="rounded-[10px] bg-matches-bg"
          >
            {league.matches.map((match) => {
              return <Match key={match.fixture.id} match={match} />;
            })}
          </View>
        );
      })}
    </>
  );
});
