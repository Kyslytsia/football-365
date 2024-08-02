import React from "react";
import { View, Text } from "react-native";

import { Trophies } from "@/types/trophies";

import { Wrapper } from "../wrapper";

export const TrophiesTable = ({ trophies }: { trophies: Trophies[] }) => {
  const countWins = (trophies: Trophies[]) => {
    const result: Record<string, number> = {};

    trophies.forEach((trophy) => {
      if (trophy.place === "Winner") {
        result[trophy.league] = (result[trophy.league] || 0) + 1;
      }
    });

    return result;
  };

  const wins = countWins(trophies);

  return (
    <Wrapper
      childrenClass="p-1"
      title={<Text className="text-white">player trophies</Text>}
    >
      {Object.entries(wins).map(([league, count]) => (
        <View key={league} className="p-1">
          <Text className="text-Grey text-[12px]">
            {league}: <Text className="text-white">{count}</Text>
          </Text>
        </View>
      ))}
    </Wrapper>
  );
};
