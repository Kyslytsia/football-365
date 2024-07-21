import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getMatchId } from "@/api/match";
import { Match } from "@/types/matchPage";

import { Header } from "./header";
import { Nav } from "@/components";

const MatchPage = () => {
  const [match, setMatch] = useState<Match[]>([]);

  const { id } = useLocalSearchParams();

  const ID = Number(id);

  useEffect(() => {
    (async () => {
      try {
        const storageMatch = await AsyncStorage.getItem(`${id} match`);

        const isMatch = storageMatch && storageMatch !== "[]";

        if (isMatch) setMatch(JSON.parse(storageMatch));

        if (!isMatch) {
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
      />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="details" />
        <Stack.Screen name="lineups" />
      </Stack>
    </>
  );
};

export default MatchPage;
