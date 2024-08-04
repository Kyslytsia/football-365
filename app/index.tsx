import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Loading } from "@/components";
import { GroupedMatches } from "@/types/groupedMatches";
import { groupMatchesByDateAndLeague, matchDayIndex } from "@/hooks";
import {
  WorldCup,
  EuroAllMatches,
  LaLigaAllMatches,
  Ligue1AllMatches,
  SerieAAllMatches,
  BundesligaAllMatches,
  EuropaLeagueAllMatches,
  PremierLeagueAllMatches,
  ChampionsLeagueAllMatches,
} from "@/api/allMatchesLeague";

import { RenderList } from "./RenderList";
import { Button } from "react-native";

const MainPage = () => {
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [matches, setMatches] = useState<GroupedMatches[]>([]);

  const flashListRef = useRef<FlashList<GroupedMatches>>(null);
  const itemHeightsRef = useRef<{ [key: number]: number }>({});

  const loadMatches = useCallback(async () => {
    try {
      const storageAllMatches = await AsyncStorage.getItem("allMatches");
      const allMatches: any[] = [];

      if (!storageAllMatches || storageAllMatches === "[]") {
        const allMatchesLeagues = await Promise.allSettled([
          WorldCup(),
          EuroAllMatches(),
          LaLigaAllMatches(),
          SerieAAllMatches(),
          Ligue1AllMatches(),
          BundesligaAllMatches(),
          EuropaLeagueAllMatches(),
          PremierLeagueAllMatches(),
          ChampionsLeagueAllMatches(),
        ]);

        allMatchesLeagues.forEach((league) => {
          if (league.status === "fulfilled") allMatches.push(...league.value);
        });

        await AsyncStorage.setItem("allMatches", JSON.stringify(allMatches));
        const groupedMatches = groupMatchesByDateAndLeague(allMatches);
        setMatches(groupedMatches);
      } else {
        const groupedMatches = groupMatchesByDateAndLeague(
          JSON.parse(storageAllMatches)
        );
        setMatches(groupedMatches);
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const overrideItemLayout = useCallback(
    (layout: any, item: any, index: number) => {
      const height = itemHeightsRef.current[index];
      layout.size = height;
    },
    [itemHeightsRef]
  );

  const scrollToCurrentMatch = useCallback(() => {
    if (flashListRef.current && index) {
      flashListRef.current.scrollToIndex({
        index: index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }, [flashListRef.current]);

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  useEffect(() => {
    matches.map((el, index) => {
      let leagues: number = el.matches.length;
      let matchesPerLeague: number = 0;

      el.matches.map((el) => {
        matchesPerLeague = matchesPerLeague + el.matches.length;
      });
      itemHeightsRef.current[index] = leagues * 45 + matchesPerLeague * 50 + 97;
    });

    matchDayIndex(matches, setIndex);
  }, [matches]);

  if (loading) return <Loading />;

  return (
    <>
      <FlashList
        data={matches}
        ref={flashListRef}
        estimatedItemSize={500}
        initialScrollIndex={index}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        overrideItemLayout={overrideItemLayout}
        keyExtractor={(group, index) => `${group.date}_${index}`}
        renderItem={({ item }: any) => <RenderList item={item} />}
      />

      <Button title="Scroll to current match" onPress={scrollToCurrentMatch} />
    </>
  );
};

export default MainPage;
