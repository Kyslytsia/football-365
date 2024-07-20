import React, { memo } from "react";
import { Image } from "expo-image";
import { View, Text } from "react-native";
import { useGlobalSearchParams } from "expo-router";

import { FinalProps } from "./types";
import { DefaultClub } from "@/assets/icon";

export const Final = memo(
  ({
    final,
    winner,
    homeTeamLogo,
    awayTeamLogo,
    homeTeamName,
    awayTeamName,
    goalsFirstTeam,
    finalNotStarted,
    goalsSecondTeam,
    scorePenaltyHome,
    scorePenaltyAway,
    finalEndedOnPenalties,
  }: FinalProps) => {
    const { name } = useGlobalSearchParams();

    return (
      <View className="relative flex flex-col items-center justify-center p-4 w-[330px] h-[120px] bg-gray-800 rounded-lg border border-Grey">
        {finalEndedOnPenalties && (
          <Text className="absolute top-0.5 text-xs text-Grey">after pen</Text>
        )}

        {finalNotStarted && (
          <Text className="absolute top-0.5 text-xs text-Grey">
            not started
          </Text>
        )}

        <View className="relative flex-row justify-around items-center px-1 ">
          <View className="flex flex-col justify-center items-center px-1 w-[42%]">
            {!final ? (
              <DefaultClub width="45px" height="45px" />
            ) : (
              <Image
                contentFit="contain"
                source={{ uri: homeTeamLogo }}
                style={{ width: 45, height: 45 }}
              />
            )}
            <Text
              className={`text-xs ${
                winner === "1" ? "text-yellow-400" : "text-Grey"
              } whitespace-nowrap`}
            >
              {homeTeamName}
            </Text>
          </View>

          {!finalNotStarted && final !== null && (
            <View className="flex justify-center items-center flex-14% pb-1.5 h-4.5 w-[15%] text-sm text-gray-400">
              {finalEndedOnPenalties && (
                <Text className="text-xs text-Grey">({scorePenaltyHome})</Text>
              )}
              <Text className="text-Grey">
                {goalsFirstTeam} - {goalsSecondTeam}
              </Text>
              {finalEndedOnPenalties && (
                <Text className="text-xs text-Grey">({scorePenaltyAway})</Text>
              )}
            </View>
          )}

          <View className="flex flex-col justify-center items-center px-1  w-[42%]">
            {!final ? (
              <DefaultClub width="45px" height="45px" />
            ) : (
              <Image
                contentFit="contain"
                source={{ uri: awayTeamLogo }}
                style={{ width: 45, height: 45 }}
              />
            )}
            <Text
              className={`text-xs ${
                winner === "2" ? "text-yellow-400" : "text-Grey"
              } whitespace-nowrap`}
            >
              {awayTeamName}
            </Text>
          </View>
        </View>

        {final !== null && (
          <Text className="text-xs text-yellow-400">
            {winner === "2" ? awayTeamName : homeTeamName}
            <Text className="text-yellow-400"> won the {name}</Text>
          </Text>
        )}
      </View>
    );
  }
);
