import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Trophies } from "@/types/trophies";
import { Transfer } from "@/types/transfers";
import { getPlayerInfo } from "@/api/getPlayerInfo";
import { PlayerStatistics } from "@/types/teamPlayersStats";
import {
  CareerTable,
  PlayerDetails,
  TrophiesTable,
  PlayerStatTable,
} from "@/components";

const PlayerPage = () => {
  const { id, name } = useGlobalSearchParams();

  const [stat, setStat] = useState<PlayerStatistics[] | []>([]);
  const [number, setNumber] = useState<number | null>(null);
  const [nationalityLogo, setNationalityLogo] = useState<string>("");
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [trophies, setTrophies] = useState<Trophies[]>([]);

  useEffect(() => {
    (async () => {
      const storagePlayer = await AsyncStorage.getItem(`${name}`);

      try {
        if (storagePlayer) {
          setStat(JSON.parse(storagePlayer).stat);
          setNumber(JSON.parse(storagePlayer).number);
          setTrophies(JSON.parse(storagePlayer).trophies);
          setTransfers(JSON.parse(storagePlayer).transfers);
          setNationalityLogo(JSON.parse(storagePlayer).nationalityLogo);
        }

        if (!storagePlayer) {
          const response = await getPlayerInfo(id as string);

          await AsyncStorage.setItem(`${name}`, JSON.stringify(response));

          setStat(response?.stat);
          setNumber(response?.number);
          setTrophies(response?.trophies);
          setTransfers(response?.transfers);
          setNationalityLogo(response?.nationalityLogo);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <View className="py-4">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex flex-col"
      >
        <PlayerDetails
          stat={stat}
          number={number}
          nationalityLogo={nationalityLogo}
        />

        <PlayerStatTable stat={stat} />

        <CareerTable transfers={transfers} />

        <TrophiesTable trophies={trophies} />
      </ScrollView>
    </View>
  );
};

export default PlayerPage;
