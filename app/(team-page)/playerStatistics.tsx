import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useGlobalSearchParams } from "expo-router";

import { PlayerSStatistics } from "@/types/teamPlayersStats";
import { getPlayersOfTeamStats } from "@/api/getPlayersOfTeamStats";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";

interface FilteredPlayersProps {
  name: string;
  photo: string;
  nation: string;
  stat: string | number;
}

const PlayerStatistics = () => {
  const { id, name } = useGlobalSearchParams();

  const [playersStats, setPlayersStats] = useState<PlayerSStatistics[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<
    FilteredPlayersProps[]
  >([]);

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

  useEffect(() => {
    const playersData = playersStats.map((player) => {
      let stat = 0;

      player.statistics.forEach((el) => {
        if (el?.goals.total !== null && el?.goals.total !== 0) {
          stat += el.goals.total;
        }
      });

      return {
        stat: stat,
        name: player.player.name,
        photo: player.player.photo,
        nation: player.player.nationality,
      };
    });

    const filteredData = playersData.filter(
      (el) => el.stat !== null && el?.stat !== 0
    );

    console.log({ filteredData });

    setFilteredPlayers(filteredData);
  }, [playersStats]);

  return (
    <ScrollView>
      <View className="flex gap-y-4 mx-auto w-[360px]">
        {filteredPlayers.map((player) => {
          return (
            <View key={player.stat + player.name} className="flex-row">
              <Image
                source={player.photo}
                alt={player.name}
                className="h-10 w-10"
              />
              <Text>{player.name}</Text>
              <Text> {player.nation}</Text>
              <Text> {player.stat}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default PlayerStatistics;
