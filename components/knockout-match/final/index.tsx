import React from "react";
import { View, Text, Image } from "react-native";
import { useGlobalSearchParams } from "expo-router";

import { FinalProps } from "./types";
import { DefaultClub, Star } from "@/assets/icon";

export const Final = ({
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
    <View className="relative flex flex-col items-center justify-center my-5 w-55 h-25 bg-gray-800 rounded-lg border border-gray-400">
      {finalEndedOnPenalties && (
        <Text className="absolute top-0.5 text-xs text-gray-400">
          after pen
        </Text>
      )}

      {finalNotStarted && (
        <Text className="absolute top-0.5 text-xs text-gray-400">
          not started
        </Text>
      )}

      <View className="relative flex justify-around items-center px-1 w-full h-3/4">
        <View className="flex flex-col justify-center items-center flex-42% px-1 w-full h-full">
          {!final ? (
            <DefaultClub width="45px" height="45px" />
          ) : (
            <Image
              source={{ uri: homeTeamLogo }}
              style={{ width: 45, height: 45 }}
            />
          )}
          <Text
            className={`text-xs ${
              winner === "1" ? "text-yellow-400" : "text-gray-400"
            } whitespace-nowrap`}
          >
            {scorePenaltyHome}
          </Text>
        </View>

        <View
          className={`absolute top-0 ${
            winner === "1" ? "left-6.5 opacity-100" : "left-0 opacity-0"
          }`}
        >
          <Star width="7px" height="7px" />
        </View>

        {!finalNotStarted && final !== null && (
          <View className="flex justify-center items-center flex-14% pb-1.5 h-4.5 text-sm text-gray-400">
            {finalEndedOnPenalties && (
              <Text className="text-xs text-gray-400">
                ({scorePenaltyHome})
              </Text>
            )}
            <Text>
              {goalsFirstTeam} - {goalsSecondTeam}
            </Text>
            {finalEndedOnPenalties && (
              <Text className="text-xs text-gray-400">
                ({scorePenaltyAway})
              </Text>
            )}
          </View>
        )}

        <View className="flex flex-col justify-center items-center flex-42% px-1 w-full h-full">
          {!final ? (
            <DefaultClub width="45px" height="45px" />
          ) : (
            <Image
              source={{ uri: awayTeamLogo }}
              style={{ width: 45, height: 45 }}
            />
          )}
          <Text
            className={`text-xs ${
              winner === "2" ? "text-yellow-400" : "text-gray-400"
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
};
