import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getMatchId } from "@/api/match";
import { Match } from "@/types/matchPage";

import { Header } from "./header";

const MatchPage = () => {
  const [match, setMatch] = useState<Match[]>([]);

  const { id } = useLocalSearchParams();

  const ID = Number(id);

  useEffect(() => {
    (async () => {
      try {
        const storageMatch = await AsyncStorage.getItem("match");

        const isMatch = storageMatch && storageMatch !== "[]";

        if (isMatch) setMatch(JSON.parse(storageMatch));

        if (!isMatch) {
          const match = await getMatchId(ID);

          setMatch(match);

          await AsyncStorage.setItem("match", JSON.stringify(match));
        }
      } catch (error: any) {
        console.error(error.message);
      }
    })();
  }, []);

  return (
    <>
      <Header match={match} />

      <View>
        <Text style={{ color: "white" }}>{id}</Text>
        <Text style={{ color: "white" }}>{id}</Text>
      </View>
    </>
  );
};

export default MatchPage;
