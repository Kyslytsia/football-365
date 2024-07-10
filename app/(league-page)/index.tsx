import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import { GroupedMatches } from "@/types/groupedMatches";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getCurrentSeason,
  groupedMatchesByRound,
  groupMatchesByDateAndLeague,
} from "@/hooks";
import { getAllMatchesForSeasonByLeagueId } from "@/api/allMatchesLeague";

const LeagueMatches = () => {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [matches, setMatches] = useState<GroupedMatches[]>([]);
  const [roundMatches, setRoundMatches] = useState<GroupedMatches[]>([]);

  const params = useGlobalSearchParams();
  const ID = Number(params.id);
  const year = getCurrentSeason(params.name as string);
  const isMatches = roundMatches.length !== 0 ? roundMatches : matches;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const storageLeagueMatches = await AsyncStorage.getItem(`${params.name}`);

      try {
        if (
          storageLeagueMatches &&
          storageLeagueMatches !== "[]" &&
          value === "all matches"
        ) {
          const groupedMatches = groupMatchesByDateAndLeague(
            JSON.parse(storageLeagueMatches)
          );
          setRoundMatches([]);
          setMatches(groupedMatches);
        } else if (
          !storageLeagueMatches &&
          storageLeagueMatches === "[]" &&
          value === "all matches"
        ) {
          const response = await getAllMatchesForSeasonByLeagueId(year, ID);
          await AsyncStorage.setItem(
            `${params.name}`,
            JSON.stringify(response)
          );
          const groupedMatches = groupMatchesByDateAndLeague(response);
          setRoundMatches([]);
          setMatches(groupedMatches);
        } else {
          const roundMatches = groupedMatchesByRound(value, matches);
          setRoundMatches(roundMatches);
        }
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [value]);

  return (
    <View>
      <Text>League ID: {params.id}</Text>
      <Text>League Name: {params.name}</Text>
    </View>
  );
};

export default LeagueMatches;
