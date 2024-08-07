import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import { Match } from "@/types/matchPage";
import { useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getMatchId } from "@/api/match";
import { LineupBench, LineupTactics, Loading } from "@/components";

const Lineups = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [match, setMatch] = useState<Match[]>([]);
  const [team, setTeam] = useState<number>(0);
  const homeTeam = match?.[0]?.teams.home.name;
  const awayTeam = match?.[0]?.teams.away.name;
  const tactics = match?.[0]?.lineups[team]?.formation ?? "";

  const { id } = useGlobalSearchParams();

  const ID = Number(id);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const storageMatch = await AsyncStorage.getItem(`${id} match`);

        const isMatch = storageMatch && storageMatch !== "[]";

        if (isMatch) setMatch(JSON.parse(storageMatch));

        if (!isMatch) {
          const response = await getMatchId(ID);

          setMatch(response);

          await AsyncStorage.setItem(`${id} match`, JSON.stringify(response));
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex flex-col gap-y-4 py-2"
    >
      <View className="flex-row items-center justify-center px-1 mx-auto w-[360px]">
        <TouchableOpacity
          onPress={() => setTeam(0)}
          className={`flex items-center justify-center p-1 w-1/2 rounded-full ${
            team === 0 ? "bg-nav-active" : "bg-transparent"
          }`}
        >
          <Text className="text-white">{homeTeam}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTeam(1)}
          className={`flex items-center justify-center p-1 w-1/2 rounded-full ${
            team === 1 ? "bg-nav-active" : "bg-transparent"
          }`}
        >
          <Text className="text-white">{awayTeam}</Text>
        </TouchableOpacity>
      </View>

      {!match[0]?.lineups.length && !match[0]?.players.length ? (
        <Text className="text-white text-center text-[20px]">
          There's no tactic information on this match.
        </Text>
      ) : (
        <View className="flex flex-col gap-y-4">
          <View
            className={`flex-row items-center w-full ${
              team === 1 ? "justify-end" : "justify-start"
            }`}
          >
            <View
              className={`flex-row items-center justify-center w-20 bg-[#384042] ${
                team === 1 ? "rounded-l-full" : "rounded-r-full"
              }`}
            >
              <Text className="text-white">{tactics}</Text>
            </View>
          </View>

          <View>
            <LineupTactics team={team} match={match} />
          </View>

          <View>
            <LineupBench team={team} match={match} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Lineups;
