import React, { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { PlayerDetails, PlayerStatTable } from "@/components";
import { getPlayerInfo } from "@/api/getPlayerInfo";
import { PlayerStatistics } from "@/types/teamPlayersStats";
import { View } from "react-native";

const PlayerPage = () => {
  const { id, name } = useGlobalSearchParams();

  const [stat, setStat] = useState<PlayerStatistics[]>([]);
  const [number, setNumber] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const storagePlayer = await AsyncStorage.getItem(`${name}`);

      try {
        if (storagePlayer) {
          setStat(JSON.parse(storagePlayer).stat);
          setNumber(JSON.parse(storagePlayer).number);
        }

        if (!storagePlayer) {
          const response = await getPlayerInfo(id as string);

          await AsyncStorage.setItem(`${name}`, JSON.stringify(response));

          setStat(response.stat);
          setNumber(response.number);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    })();
  }, []);

  return (
    <View className="flex flex-col gap-y-2 pt-4">
      {stat.length > 0 && <PlayerDetails stat={stat} number={number} />}

      <PlayerStatTable stat={stat} />
    </View>
  );
};

export default PlayerPage;
