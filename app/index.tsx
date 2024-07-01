import React, { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GroupedMatches } from "@/types/groupedMatches";
import { Loading, AllLeaguesMatches } from "@/components";
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

  const matchRefs = useRef<number[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  useEffect(() => {
    scrollToMatchDay(matches, matchRefs, scrollViewRef);
  }, [matches, matchRefs]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView ref={scrollViewRef}>
          {matches.map((group, index) => (
            <View
              key={group.date}
              className="m-auto w-[360px]"
              onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                matchRefs.current[index] = layout.y;
              }}
            >
              <Text className="p-[10px_0_50px] text-Grey text-[18px] font-extralight text-center">
                - {getFormattedDate(group.date)} -
              </Text>

              <AllLeaguesMatches matches={group.matches} />
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default MainPage;
