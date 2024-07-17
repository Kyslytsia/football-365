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
      <View className="py-2 mx-auto w-[360px]">
        {standings.map((group, index) => (
          <View className="flex-col my-2" key={index + "championship"}>
            <Table championship standings={group} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Groups;
