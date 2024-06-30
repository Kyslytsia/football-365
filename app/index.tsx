import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GroupedMatches } from "@/types/groupedMatches";
import { groupMatchesByDateAndLeague } from "@/hooks/groupMatchesByDateAndLeague";
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

import { getStyles } from "./styles";

const MainPage = () => {
  const [matches, setMatches] = useState<GroupedMatches[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const styles = getStyles();

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
  console.log(matches);

  return (
    <View className={styles.view}>
      <Text className={styles.text}>MainPage</Text>

      <Link href="/league-page">
        <Text className={styles.text}>League</Text>
      </Link>

      <Link href="/match-page">
        <Text className={styles.text}>Match</Text>
      </Link>
    </View>
  );
};

export default MainPage;
