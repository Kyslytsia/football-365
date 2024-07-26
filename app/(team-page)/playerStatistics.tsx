import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useGlobalSearchParams } from "expo-router";

import { PlayerSStatistics } from "@/types/teamPlayersStats";
import { getPlayersOfTeamStats } from "@/api/getPlayersOfTeamStats";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerStat } from "@/components/player-stat";

const PlayerStatistics = () => {
  const { id, name } = useGlobalSearchParams();

  const [playersStats, setPlayersStats] = useState<PlayerSStatistics[]>([]);

  useEffect(() => {
    (async () => {
      const storageTeamPlatersStats = await AsyncStorage.getItem(
        `${name} platers stats`
      );

      try {
        if (storageTeamPlatersStats) {
          setPlayersStats(JSON.parse(storageTeamPlatersStats));
        }

        if (!storageTeamPlatersStats) {
          const response = await getPlayersOfTeamStats(id as string);

          await AsyncStorage.setItem(
            `${name} platers stats`,
            JSON.stringify(response)
          );

          setPlayersStats(response);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    })();
  }, []);

  console.log({ playersStats });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="py-2 mx-auto w-[360px]">
        <PlayerStat type="goals" playersStats={playersStats} />

        <PlayerStat type="assist" playersStats={playersStats} />

        <PlayerStat type="yellow card" playersStats={playersStats} />

        <PlayerStat type="red card" playersStats={playersStats} />
      </View>
    </ScrollView>
  );
};

export default PlayerStatistics;
