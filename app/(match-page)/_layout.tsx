import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Nav } from "@/components";
import { getMatchId } from "@/api/match";
import { Match } from "@/types/matchPage";

import { Header } from "./header";

const MatchPage = () => {
  const [match, setMatch] = useState<Match[]>([]);

  const { id } = useLocalSearchParams();

  const ID = Number(id);
  const matchNotStarted =
    match.length > 0 && match?.[0].fixture.status.short === "NS";

  useEffect(() => {
    (async () => {
      try {
        const storageMatch = await AsyncStorage.getItem(`${id} match`);

        if (storageMatch && storageMatch !== "[]")
          setMatch(JSON.parse(storageMatch));

        if (!storageMatch) {
          const match = await getMatchId(ID);

          setMatch(match);

          await AsyncStorage.setItem(`${id} match`, JSON.stringify(match));
        }
      } catch (error: any) {
        console.error(error.message);
      }
    })();
  }, []);

  return (
    <>
      <Header match={match} />

      <Nav
        firstRoute="/details"
        secondRoute="/lineups"
        classNameWrapper="p-2"
        firstRouteText="details"
        secondRouteText="lineups"
        disabled={matchNotStarted}
      />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="details" />
        <Stack.Screen name="lineups/index" />
      </Stack>
    </>
  );
};

export default MatchPage;
