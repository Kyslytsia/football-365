import React, { memo } from "react";
import { Image } from "expo-image";
import { Text, View } from "react-native";

import { modifyDescription } from "@/hooks";

import { RankLogoTableProps } from "./types";
import { Crown } from "@/assets/icon";

export const RankLogoTable = memo(
  ({ isChampion, standings }: RankLogoTableProps) => {
    const getStatusStyle = (status: string) => {
      switch (status) {
        case "Champions League":
          return `bg-table-status-ucl`;
        case "Europa League":
          return `bg-table-status-uel`;
        case "Conference League":
        case "Europa Conference League":
          return `bg-table-status-ecl`;
        case "Relegation":
          return `bg-table-status-rl`;
        default:
          return {};
      }
    };

    return (
      <View className="absolute top-0 left-0 z-30 bg-table-bg">
        <View className="flex-row justify-center h-8">
          <Text className="w-5 text-xs"></Text>
          <Text className="w-5 text-xs"></Text>
        </View>

        {standings.map((el, index) => (
          <View
            key={index + "rankLogo"}
            className="relative flex-row items-center justify-between p-[0_5px_0_8px] w-[55px] border-t border-table-border h-8"
          >
            <View
              className={`absolute left-0 h-full w-0.5
              ${getStatusStyle(modifyDescription(el))}`}
            />

            {isChampion && el.rank === 1 && (
              <View className="absolute top-0.5 left-[15px]">
                <Crown width={5} height={5} />
              </View>
            )}

            <View className="flex items-center justify-center w-5 h-5">
              <Text className="text-white text-xs">{el.rank}</Text>
            </View>

            <View className="flex items-center justify-center w-5 h-5">
              <Image
                alt={el.team.name}
                className="w-5 h-5"
                contentFit="contain"
                source={el.team.logo}
              />
            </View>
          </View>
        ))}
      </View>
    );
  }
);
