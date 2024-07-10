import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import { GroupedMatches } from "@/types/groupedMatches";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlashList } from "@shopify/flash-list";

import { getAllMatchesForSeasonByLeagueId } from "@/api/allMatchesLeague";
import {
  getCurrentSeason,
  groupedMatchesByRound,
  groupMatchesByDateAndLeague,
  matchDayIndex,
} from "@/hooks";
import RenderList from "./RenderList";

const LeagueMatches = () => {
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("all matches");
  const [matches, setMatches] = useState<GroupedMatches[]>([]);
  const [roundMatches, setRoundMatches] = useState<GroupedMatches[]>([]);

  const params = useGlobalSearchParams();
  const itemHeightsRef = useRef<{ [key: number]: number }>({});
  const ID = Number(params.id);
  const year = getCurrentSeason(params.name as string);
  const isMatches = roundMatches.length !== 0 ? roundMatches : matches;

  const overrideItemLayout = useCallback(
    (layout: any, item: any, index: number) => {
      const height = itemHeightsRef.current[index];
      layout.size = height;
    },
    [itemHeightsRef]
  );

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
        } else if (!storageLeagueMatches && value === "all matches") {
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

  useEffect(() => {
    matchDayIndex(matches, setIndex);

    matches.map((el, index) => {
      let matchesDate: number = 0;

      el.matches.map((el) => (matchesDate = matchesDate + el.matches.length));

      itemHeightsRef.current[index] = 20 + matchesDate * 50 + 27;
    });
  }, [matches]);

  console.log({ itemHeightsRef });
  console.log(index);

  return (
    <FlashList
      data={matches}
      estimatedItemSize={500}
      initialScrollIndex={index}
      removeClippedSubviews={false}
      overrideItemLayout={overrideItemLayout}
      keyExtractor={(group, index) => `${group.date}_${index}`}
      renderItem={({ item }: any) => <RenderList item={item} />}
    />
  );
};

export default LeagueMatches;
