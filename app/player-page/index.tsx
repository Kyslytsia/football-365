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
  Loading,
} from "@/components";

const PlayerPage = () => {
  const { id, name } = useGlobalSearchParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [info, setInfo] = useState<PlayerStatistics[] | []>([]);
  const [number, setNumber] = useState<number | null>(null);
  const [nationalityLogo, setNationalityLogo] = useState<string>("");
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [trophies, setTrophies] = useState<Trophies[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const storagePlayer = await AsyncStorage.getItem(`${name} info`);

      try {
        if (storagePlayer) {
          setInfo(JSON.parse(storagePlayer).info);
          setNumber(JSON.parse(storagePlayer).number);
          setTrophies(JSON.parse(storagePlayer).trophies);
          setTransfers(JSON.parse(storagePlayer).transfers);
          setNationalityLogo(JSON.parse(storagePlayer).nationalityLogo);
        }

        if (!storagePlayer) {
          const response = await getPlayerInfo(id as string);

          await AsyncStorage.setItem(`${name} info`, JSON.stringify(response));

          setInfo(response?.info);
          setNumber(response?.number);
          setTrophies(response?.trophies);
          setTransfers(response?.transfers);
          setNationalityLogo(response?.nationalityLogo);
        }
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <View className="py-4">
      <ScrollView
        className="flex flex-col"
        showsVerticalScrollIndicator={false}
      >
        <PlayerDetails
          number={number}
          playerInfo={info}
          nationalityLogo={nationalityLogo}
        />

        <PlayerStatTable stat={info} />

        {transfers && <CareerTable transfers={transfers} />}

        {trophies && <TrophiesTable trophies={trophies} />}
      </ScrollView>
    </View>
  );
};

export default PlayerPage;
