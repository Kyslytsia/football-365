import React from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";

import { field } from "@/assets/img";
import { PlayerData } from "@/types/matchPage";
import { Ball, Substitution } from "@/assets/icon";

import { LineupTacticsProps } from "./types";

export const LineupTactics = ({ team, match }: LineupTacticsProps) => {
  const events = match?.[0]?.events ?? [];
  const startXI = match?.[0]?.players[team]?.players.slice(0, 11) ?? [];
  const tactics = "1-" + (match?.[0]?.lineups[team]?.formation ?? "");

  const distributePlayers = () => {
    const positions = tactics?.split("-").map(Number) ?? [];
    let index = 0;
    const result: any = [];

    positions?.forEach((count) => {
      result.push(startXI?.slice(index, index + count));
      index += count;
    });

    return result;
  };

  const getRatingColorClass = (rating: number) => {
    if (rating > 8.0) return "bg-blue-500";
    if (rating > 7.0) return "bg-green-500";
    if (rating > 6.0) return "bg-yellow-500";
    return "bg-orange-500";
  };

  const startPlayers = distributePlayers().reverse();

  return (
    <View className="relative">
      <View className="items-center overflow-hidden">
        <Image
          source={field}
          contentFit="contain"
          contentPosition="center"
          style={{
            width: "130%",
            aspectRatio: 480 / 300,
          }}
        />
      </View>

      <View className="absolute top-0 left-0 right-0 flex flex-col justify-between py-2.5 mx-auto h-[300px] z-2">
        {startPlayers?.map((players: PlayerData[], index: number) => (
          <View
            key={`startPlayers-${index}`}
            className="flex flex-row items-center justify-around"
          >
            {players
              ?.slice()
              .reverse()
              .map((player) => {
                const playerEvents = events?.find(
                  (event) => event.player.id === player.player.id
                );

                const playerYellowCard = events?.find(
                  (event) =>
                    event.player.id === player.player.id &&
                    event.detail === "Yellow Card"
                );

                const playerRedCard = events?.find(
                  (event) =>
                    event.player.id === player.player.id &&
                    event.detail === "Red Card"
                );

                const playerGoal = events?.find(
                  (event) =>
                    event.player.id === player.player.id &&
                    event.type === "Goal"
                );

                return (
                  <View
                    key={`player-${player.player.id}-${player.player.photo}`}
                    className="relative flex justify-center items-center text-xs"
                  >
                    {playerEvents && (
                      <View className="absolute bottom-0 left-7 flex justify-center items-center z-10">
                        <Substitution width="15px" height="15px" />
                      </View>
                    )}

                    <View className="absolute top-[-6px] left-[-3px] flex-row justify-center items-center w-3.5 h-3.5 rounded-full border border-gray-400 bg-white text-xxs z-10">
                      <Text className="text-[8px] text-center">
                        {player.statistics[0].games.number}
                      </Text>
                    </View>

                    <View
                      className={`absolute left-[-8px] bottom-0 flex items-center justify-center w-6 h-3.5 rounded-full z-10 ${getRatingColorClass(
                        +player.statistics[0].games.rating
                      )}`}
                    >
                      <Text className="text-white text-[10px] text-center">
                        {player.statistics[0].games.rating}
                      </Text>
                    </View>

                    <Image
                      source={player.player.photo}
                      className="flex justify-center items-center w-10 h-10 rounded-full overflow-hidden"
                    />

                    {playerEvents && playerYellowCard && !playerRedCard && (
                      <View className="absolute top-2.5 right-[-10px] h-3 w-2 bg-yellow-200 z-10" />
                    )}

                    {playerEvents && playerRedCard && (
                      <View className="absolute top-2.5 right-[-10px] h-3 w-2 bg-red-200 z-10" />
                    )}

                    {playerEvents && playerGoal && (
                      <View className="absolute top-[-5px] right-0 flex items-center justify-center w-3 h-3 rounded-full bg-white">
                        <Ball width="12px" height="12px" fill="black" />
                      </View>
                    )}
                  </View>
                );
              })}
          </View>
        ))}
      </View>
    </View>
  );
};
