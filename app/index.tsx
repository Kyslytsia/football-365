import React, { useCallback, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GroupedMatches } from "@/types/groupedMatches";
import { RenderListMainItems, ScrollToDateBtn, Loading } from "@/components";
import {
  matchDayIndex,
  getFormattedDate,
  groupMatchesByDateAndLeague,
} from "@/helpers";
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
import { FlashList, FlashListRef } from "@shopify/flash-list";

const MainPage = () => {
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [matches, setMatches] = useState<GroupedMatches[]>([]);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

  const flashListRef = useRef<FlashListRef<GroupedMatches>>(null);
  const itemHeightsRef = useRef<{ [key: number]: number }>({});

  const loadMatches = useCallback(async () => {
    try {
      // await AsyncStorage.clear();

      // const allKeys = await AsyncStorage.getAllKeys();
      // console.log(allKeys);

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
    if (flashListRef.current) {
      flashListRef.current.scrollToIndex({
        index: index,
        animated: true,
      });
    }
  }, [index]);

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: any) => {
      const visibleIndexes = viewableItems.map((item: any) => item.index);
      const isIndexNotVisible = !visibleIndexes.includes(index);

      setShowScrollButton(isIndexNotVisible);
    },
    [index]
  );

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
      itemHeightsRef.current[index] = 97 + leagues * 51 + matchesPerLeague * 50;
    });

    matchDayIndex(matches, setIndex);
  }, [matches]);

  if (loading) return <Loading />;

  return (
    <>
      {index !== -1 && (
        <FlashList
          data={matches}
          ref={flashListRef}
          initialScrollIndex={index}
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}
          overrideItemLayout={overrideItemLayout}
          onViewableItemsChanged={handleViewableItemsChanged}
          keyExtractor={(group, index) => `${group.date}_${index}`}
          renderItem={({ item }: any) => <RenderListMainItems item={item} />}
        />
      )}

      {showScrollButton && (
        <ScrollToDateBtn
          wrapperClass="top-16"
          onPress={scrollToCurrentMatch}
          date={getFormattedDate(matches[index].date)}
        />
      )}
    </>
  );
};

export default MainPage;
