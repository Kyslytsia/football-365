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
      <View className="ml-12">
        <View className="flex-row h-8">
          <Text className="text-xs text-white min-w-[50px] ml-[-5px] justify-center">
            {championship && standings[0].group}
          </Text>
        </View>

        {standings.map((team, index) => (
          <View
            key={index + "teamName"}
            className="flex-row pl-2 h-8 border-t border-table-border"
          >
            <View className="flex-col items-start justify-center">
              <Text className="text-xs text-white leading-3">
                {team.team.name}
              </Text>

              {team.description !== null && (
                <Text
                  className={`text-[8px] 
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
