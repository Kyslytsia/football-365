import React, { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { PlayerDetails, PlayerStatTable } from "@/components";
import { getPlayerInfo } from "@/api/getPlayerInfo";
import { PlayerStatistics } from "@/types/teamPlayersStats";
import { View } from "react-native";

const PlayerPage = () => {
  const { id, name } = useGlobalSearchParams();

  const [stat, setStat] = useState<PlayerStatistics[] | []>([]);
  const [number, setNumber] = useState<number | null>(null);
  const [nationalityLogo, setNationalityLogo] = useState<string>("");

  useEffect(() => {
    (async () => {
      const storagePlayer = await AsyncStorage.getItem(`${name}`);

      try {
        if (storagePlayer) {
          setStat(JSON.parse(storagePlayer).stat);
          setNumber(JSON.parse(storagePlayer).number);
          setNationalityLogo(JSON.parse(storagePlayer).nationalityLogo);
        }

        if (!storagePlayer) {
          const response = await getPlayerInfo(id as string);

          await AsyncStorage.setItem(`${name}`, JSON.stringify(response));

          setStat(response?.stat);
          setNumber(response?.number);
          setNationalityLogo(response?.nationalityLogo);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <View className="flex flex-col gap-y-2 pt-4">
      <PlayerDetails
        stat={stat}
        number={number}
        nationalityLogo={nationalityLogo}
      />

      <PlayerStatTable stat={stat} />
    </View>
  );
};

export default PlayerPage;
