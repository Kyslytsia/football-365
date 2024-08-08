import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getCurrentSeason } from "@/hooks";
import { Loading, Table } from "@/components";
import { getStandings } from "@/api/standings";
import { StandingProps } from "@/types/standings";

import { GroupsProps } from "./types";

const Groups = ({ leagueName, standingsData }: GroupsProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [standings, setStandings] = useState<StandingProps[][]>([]);

  const { id, name } = useGlobalSearchParams();
  const ID = Number(id);
  const year = getCurrentSeason(name as string);
  const isStandingsData = standingsData ?? standings;

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        if (!standingsData) {
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
    <>
      {leagueName && (
        <Text className="p-2 text-white text-center">{leagueName}</Text>
      )}

      {!isStandingsData.length ? (
        <>
          <Text className="text-white text-[20px] text-center">
            The draw hasn't happened yet
          </Text>
        </>
      ) : (
        <FlashList
          data={isStandingsData}
          estimatedItemSize={300}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString() + "championship"}
          renderItem={({ item }) => (
            <View className="flex-col my-2">
              <Table championship standings={item} />
            </View>
          )}
        />
      )}
    </>
  );
};

export default Groups;
