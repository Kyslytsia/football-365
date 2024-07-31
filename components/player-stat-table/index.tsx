import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { Ball, FootballShoe, Star } from "@/assets/icon";
import { PlayerStatistics } from "@/types/teamPlayersStats";

import { Wrapper } from "../wrapper";
import { PlayerStatTableProps } from "./types";

export const PlayerStatTable = ({
  stat,
}: {
  stat: PlayerStatistics[] | [];
}) => {
  const [playerStat, setPlayerStat] = useState<PlayerStatTableProps>();
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
      childrenClass="flex flex-row py-6 border-t border-Black"
      title={<Text className="text-white">player statistics</Text>}
    >
      <View className="flex flex-col items-center gap-y-2 w-1/3">
        <Ball width={25} height={25} />

        <Text className="text-white text-[18px] font-medium">
          {playerStat?.goals}
        </Text>

        <Text className="text-Grey text-[12px]">goals</Text>
      </View>

      <View className="h-full w-[1px] bg-Grey" />

      <View className="flex flex-col items-center gap-y-2 w-1/3">
        <FootballShoe width={25} height={25} />

        <Text className="text-white text-[18px] font-medium">
          {playerStat?.assists}
        </Text>

        <Text className="text-Grey text-[12px]">assists</Text>
      </View>

      <View className="h-full w-[1px] bg-Grey" />

      <View className="flex flex-col items-center gap-y-2 w-1/3">
        <Star width={25} height={25} />

        <Text className="text-white text-[18px] font-medium">
          {playerStat?.rating}
        </Text>

        <Text className="text-Grey text-[12px]">rating</Text>
      </View>
    </Wrapper>
  );
};
