import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, FlatList } from "react-native";
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
  const [matches, setMatches] = useState<GroupedMatches[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  const onScrollToIndexFailed = (info: any) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 2000));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
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
          keyExtractor={(item, index) => `${item.date}_${index}`}
          onScrollToIndexFailed={onScrollToIndexFailed}
          initialScrollIndex={259}
          renderItem={({ item: group }) => (
            <View className="m-auto w-[360px]">
              <Text className="p-[50px_0_10px] text-Grey text-[18px] font-extralight text-center">
                - {getFormattedDate(group.date)} -
              </Text>

              <AllLeaguesMatches matches={group.matches} />
            </View>
          )}
        />
      )}
    </>
  );
};

export default MainPage;
