import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, FlatList, ListRenderItemInfo } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GroupedMatches } from "@/types/groupedMatches";
import { AllLeaguesMatches, Loading } from "@/components";
import {
  scrollToMatchDay,
  getFormattedDate,
  groupMatchesByDateAndLeague,
} from "@/hooks";
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

const MainPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [matches, setMatches] = useState<GroupedMatches[]>([]);

  const flatListRef = useRef<FlatList<GroupedMatches>>(null);

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

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  useEffect(() => {
    scrollToMatchDay(matches, flatListRef);
  }, [matches, flatListRef]);

  const onScrollToIndexFailed = async (info: any) => {
    console.warn("Scroll to index failed", info);
    console.log("Scroll to index failed", info);

    const wait = new Promise((resolve) => setTimeout(resolve, 1000));
    await wait;
    flatListRef.current?.scrollToIndex({
      index: info.index,
      animated: true,
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={matches}
          ref={flatListRef}
          onScrollToIndexFailed={onScrollToIndexFailed}
          keyExtractor={(group, index) => `${group.date}_${index}`}
          renderItem={({ item, index }: ListRenderItemInfo<GroupedMatches>) => (
            <View className="m-auto w-[360px]">
              <Text className="p-[50px_0_10px] text-Grey text-[18px] font-extralight text-center">
                - {getFormattedDate(item.date)} -
              </Text>

              <AllLeaguesMatches matches={item.matches} />
            </View>
          )}
        />
      )}
    </>
  );
};

export default MainPage;
