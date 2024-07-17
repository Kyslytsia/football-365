import React, { useEffect, useState } from "react";

import { useGlobalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { StandingProps } from "@/types/standings";
import { getStandings } from "@/api/standings";
import { getCurrentSeason } from "@/hooks";
import { Table } from "@/components";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Groups = () => {
  const [standings, setStandings] = useState<StandingProps[][]>([]);
  const { id, name } = useGlobalSearchParams();

  const year = getCurrentSeason(name as string);

  const ID = Number(id);

  useEffect(() => {
    (async () => {
      try {
        const storageData = await AsyncStorage.getItem(`${name} standings`);

        if (storageData && storageData !== "[]") {
          setStandings(JSON.parse(storageData));
        } else {
          const response = await getStandings(year, ID, name as string);
          await AsyncStorage.setItem(
            `${name} standings`,
            JSON.stringify(response)
          );
          setStandings(response);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    })();
  }, []);

  console.log(standings);

  return (
    <ScrollView>
      <View className="flex-col gap-y-2 py-2 mx-auto w-[360px]">
        {standings.map((group, index) => (
          <Table championship standings={group} key={index + "championship"} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Groups;
