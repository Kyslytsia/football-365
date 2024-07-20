import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Table } from "@/components";
import { getCurrentSeason } from "@/hooks";
import { getStandings } from "@/api/standings";
import { StandingProps } from "@/types/standings";

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

  return (
    <FlashList
      data={standings}
      estimatedItemSize={300}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString() + "championship"}
      renderItem={({ item }) => (
        <View className="flex-col my-2">
          <Table championship standings={item} />
        </View>
      )}
    />
  );
};

export default Groups;
