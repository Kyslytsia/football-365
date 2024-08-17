import React from "react";
import { View, Text } from "react-native";

import { Platform } from "@/hooks";
import { Trophies } from "@/types/trophies";

import { Wrapper } from "../wrapper";
import { getStyles } from "./styles";
import { TrophiesTableProps } from "./types";

export const TrophiesTable = ({ coach, trophies }: TrophiesTableProps) => {
  const isAndroid = Platform().android;
  const styles = getStyles(isAndroid);

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
      title={
        <Text className={styles.title}>
          {coach ? "coach trophies" : "player trophies"}
        </Text>
      }
    >
      {Object.entries(wins).map(([league, count]) => (
        <View key={league} className="p-1">
          <Text className={styles.greyText}>
            {league}: <Text className={styles.whiteText}>{count}</Text>
          </Text>
        </View>
      ))}
    </Wrapper>
  );
};
