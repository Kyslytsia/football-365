import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Trophies } from "@/types/trophies";
import { getCoachInfo } from "@/api/getCoachInfo";
import { PlayerStatistics } from "@/types/teamPlayersStats";
import { CareerTable, PlayerDetails, TrophiesTable } from "@/components";

const CoachPage = () => {
  const { id, name } = useGlobalSearchParams();

  const [info, setInfo] = useState<any[] | []>([]);
  const [nationalityLogo, setNationalityLogo] = useState<string>("");
  const [trophies, setTrophies] = useState<Trophies[]>([]);

  useEffect(() => {
    (async () => {
      const storageCoach = await AsyncStorage.getItem(`${name} info`);

      try {
        if (storageCoach) {
          setInfo(JSON.parse(storageCoach).info);
          setTrophies(JSON.parse(storageCoach).trophies);
          setNationalityLogo(JSON.parse(storageCoach).nationalityLogo);
        }

        if (!storageCoach) {
          const response = await getCoachInfo(id as string);

          await AsyncStorage.setItem(`${name} info`, JSON.stringify(response));

          setInfo(response?.info);
          setTrophies(response?.trophies);
          setNationalityLogo(response?.nationalityLogo);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    })();
  }, []);

  console.log(info);

  return (
    <View className="py-4">
      <ScrollView
        className="flex flex-col"
        showsVerticalScrollIndicator={false}
      >
        <PlayerDetails
          coach
          coachInfo={info}
          nationalityLogo={nationalityLogo}
        />

        {/* <CareerTable coach transfers={transfers} /> */}

        {/* <TrophiesTable coach trophies={trophies} /> */}
      </ScrollView>
    </View>
  );
};

export default CoachPage;
