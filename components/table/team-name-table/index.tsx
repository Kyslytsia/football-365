import { memo } from "react";
import { View, Text } from "react-native";

import { modifyDescription } from "@/hooks";

import { TeamNameTableProps } from "./types";

export const TeamNameTable = memo(
  ({ standings, isChampion, championship }: TeamNameTableProps) => {
    const getStatusStyle = (status: string) => {
      switch (status) {
        case "Champions League":
        case "Won title":
        case "Euro":
          return "text-table-status-ucl";
        case "Europa League":
        case "Ranking of third-placed teams":
          return "text-table-status-uel";
        case "Conference League":
        case "Europa Conference League":
          return "text-table-status-ecl";
        case "Relegation":
          return "text-table-status-rl";
        default:
          return {};
      }
    };

    return (
      <View className="ml-10">
        <View className="flex-row items-center h-8">
          <Text className="text-[8px] text-white text-center min-w-[115px] ml-[8px] justify-center">
            {championship && standings[0].group}
          </Text>
        </View>

        {standings.map((team, index) => (
          <View
            key={index + "teamName"}
            className="flex-row pl-2 h-8 border-t border-table-border"
          >
            <View className="flex-col items-start justify-center">
              <Text className="pl-1 text-xs text-white leading-3">
                {team.team.name}
              </Text>

              {team.description !== null && (
                <Text
                  className={`pl-1 text-[8px] 
                  ${getStatusStyle(modifyDescription(team, isChampion))}`}
                >
                  {modifyDescription(team, isChampion)}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>
    );
  }
);
