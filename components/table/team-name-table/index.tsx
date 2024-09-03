import { memo } from "react";
import { View, Text, Pressable } from "react-native";
import { useGlobalSearchParams, useNavigation } from "expo-router";

import { modifyDescription, Platform } from "@/hooks";

import { TeamNameTableProps } from "./types";

export const TeamNameTable = memo(
  ({ standings, isChampion, championship }: TeamNameTableProps) => {
    const navigation = useNavigation<any>();
    const { name } = useGlobalSearchParams();

    const teamName = name;
    const isAndroid = Platform().android;

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
        case "UEFA Europa League":
        case "Ranking of third-placed teams":
          return "text-table-status-uel";
        case "Conference League":
        case "Conference League Qualification":
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
      if (teamName === name) return;

      navigation.push("(team-page)", {
        id: id,
        name: name,
        icon: icon,
      });
    };

    return (
      <View className="ml-10 w-full">
        <View className="flex-row items-center h-8">
          <Text className="text-[8px] text-white text-center min-w-[115px] ml-[8px] justify-center">
            {championship && standings[0].group}
          </Text>
        </View>

        {standings.map((team, index) => (
          <Pressable
            key={index + "teamName"}
            className="flex-row pl-2 h-8 border-t border-table-border"
            onPress={() =>
              handleNavigate(
                team?.team.id as number,
                team?.team.name as string,
                team?.team.logo as string
              )
            }
          >
            <View className="flex-col items-start justify-center">
              <Text
                className={`${
                  isAndroid ? "text-[8px]" : "text-xs"
                } pl-1 text-white leading-3`}
              >
                {team.team.name}
              </Text>

              {team.description !== null && (
                <Text
                  className={`${isAndroid ? "text-[6px]" : "text-[8px]"} pl-1 
                  ${getStatusStyle(modifyDescription(team, isChampion))}`}
                >
                  {modifyDescription(team, isChampion)}
                </Text>
              )}
            </View>
          </Pressable>
        ))}
      </View>
    );
  }
);
