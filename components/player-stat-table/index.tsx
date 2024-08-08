import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { Ball, FootballShoe, Star } from "@/assets/icon";
import { PlayerStatistics } from "@/types/teamPlayersStats";

import { getStyles } from "./styles";
import { Wrapper } from "../wrapper";
import { PlayerStatTableProps } from "./types";

export const PlayerStatTable = ({
  stat,
}: {
  stat: PlayerStatistics[] | [];
}) => {
  const [playerStat, setPlayerStat] = useState<PlayerStatTableProps>();

  const styles = getStyles();

  useEffect(() => {
    const playersData = () => {
      let goals = 0;
      let assists = 0;
      let ratings: string[] = [];

      stat.length > 0 &&
        stat[0]?.statistics.forEach((el) => {
          if (el?.goals.total !== null) {
            goals += el.goals.total;
          }

          if (el?.goals.assists !== null) {
            assists += el.goals.assists;
          }

          if (el?.games.rating) {
            ratings.push(el.games.rating);
          }
        });

      const rating =
        ratings.length === 0
          ? 0
          : ratings.reduce((total, rating) => total + parseFloat(rating), 0) /
            ratings.length;

      return {
        goals: goals,
        assists: assists,
        rating: rating?.toLocaleString().slice(0, 3).replace(",", "."),
      };
    };

    setPlayerStat(playersData());
  }, [stat]);

  return (
    <Wrapper
      wrapperClass="mb-4"
      childrenClass="flex flex-row py-6 border-t border-Black"
      title={<Text className="text-white">player statistics</Text>}
    >
      <View className={styles.wrapper}>
        <Ball width={25} height={25} />

        <Text className={styles.whiteText}>{playerStat?.goals}</Text>

        <Text className={styles.greyText}>goals</Text>
      </View>

      <View className="h-full w-[1px] bg-Grey" />

      <View className={styles.wrapper}>
        <FootballShoe width={25} height={25} />

        <Text className={styles.whiteText}>{playerStat?.assists}</Text>

        <Text className={styles.greyText}>assists</Text>
      </View>

      <View className="h-full w-[1px] bg-Grey" />

      <View className={styles.wrapper}>
        <Star width={25} height={25} />

        <Text className={styles.whiteText}>{playerStat?.rating}</Text>

        <Text className={styles.greyText}>rating</Text>
      </View>
    </Wrapper>
  );
};
