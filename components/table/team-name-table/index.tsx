import { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";

import { modifyDescription } from "@/hooks";

import { TeamNameTableProps } from "./types";

export const TeamNameTable = memo(
  ({ standings, isChampion, championship }: TeamNameTableProps) => {
    const navigation = useNavigation<any>();

    const getStatusStyle = (status: string) => {
      switch (status) {
        case "Champions League":
        case "Won title":
        case "Euro":
        case "(League A - Play Offs)":
        case "(League A)":
        case "(League B)":
        case "(League C)":
          return "text-table-status-ucl";
        case "Europa League":
        case "Ranking of third-placed teams":
          return "text-table-status-uel";
        case "Conference League":
        case "Europa Conference League":
          return "text-table-status-ecl";
        case "Relegation":
        case "(League C - Play Out)":
          return "text-table-status-rl";
        default:
          return {};
      }
    };

    const handleNavigate = (id: number, name: string, icon: string) => {
      console.log("asdf");

      navigation.push("(team-page)", {
        id: id,
        name: name,
        icon: icon,
      });
    };

    return (
      <View className="ml-10">
        <View className="flex-row items-center h-8">
          <Text className="text-[8px] text-white text-center min-w-[115px] ml-[8px] justify-center">
            {championship && standings[0].group}
          </Text>
        </View>

        {standings.map((team, index) => (
          <TouchableOpacity
            key={index + "teamName"}
            className="flex-row pl-2 h-8 border-t border-table-border"
            onPressIn={() => {
              console.log("asdf");

              handleNavigate(
                team?.team.id as number,
                team?.team.name as string,
                team?.team.logo as string
              );
            }}
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
          </TouchableOpacity>
        ))}
      </View>
    );
  }
);
