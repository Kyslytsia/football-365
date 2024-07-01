import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GroupedMatches } from "@/types/groupedMatches";
import { AllLeaguesMatches } from "@/components/all-league-matches";
import { getFormattedDate, groupMatchesByDateAndLeague } from "@/hooks";
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

  console.log(loading);
  // console.log(matches);

  return (
    <ScrollView>
      {matches.map((group) => (
        <View key={group.date} className="m-auto w-[360px]">
          <Text className="p-[10px_0_50px] text-greyText text-[18px] font-extralight text-center">
            - {getFormattedDate(group.date)} -
          </Text>

          <AllLeaguesMatches matches={group.matches} />
        </View>
      ))}
    </ScrollView>
  );
};

export default MainPage;
