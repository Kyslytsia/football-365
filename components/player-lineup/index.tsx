import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";

import { Platform } from "@/hooks";
import { Ball, Substitution } from "@/assets/icon";

import { PlayerProps } from "./types";
import { getStyles } from "./styles";

export const PlayerLineup = ({
  id,
  name,
  stat,
  coach,
  number,
  position,
  playerSubs,
  playerGoal,
  playerPhoto,
  playerRedCard,
  playerSubsName,
  playerSubsNumber,
  playerYellowCard,
}: PlayerProps) => {
  const navigation = useNavigation<any>();
  const isAndroid = Platform().android;
  const styles = getStyles(isAndroid);

  const handleNavigate = (
    id: number,
    pos: string,
    name: string,
    icon: string
  ) => {
    if (coach) {
      navigation.push("coach-page", {
        id,
        pos,
        name,
        icon,
      });

      return;
    }

    navigation.push("player-page", {
      id,
      pos,
      name,
      icon,
    });
  };

  return (
    <TouchableOpacity
      onPress={() => handleNavigate(id, position, name, playerPhoto)}
      className="flex flex-row items-center gap-x-2 p-1 border-t border-table-border"
    >
      <Image alt={name} source={playerPhoto} className={styles.photo} />

      <View className="flex-1 flex-row justify-between items-center text-sm">
        <View className="flex flex-col leading-4">
          <View className="flex flex-row items-center gap-2">
            {number && <Text className={styles.number}>{number}</Text>}

            <Text
              className={`${playerSubs ? "text-Green" : "text-white"} ${
                styles.name
              }`}
            >
              {name}
            </Text>
          </View>

          {playerSubs && (
            <View className="flex flex-row items-center gap-2">
              <Text className={styles.number}>{playerSubsNumber}</Text>

              <Text
                className={`${playerSubs ? "text-LightRed" : "text-white"} ${
                  styles.name
                }`}
              >
                {playerSubsName}
              </Text>
            </View>
          )}
        </View>

        <View className="flex flex-row items-center justify-center gap-1">
          {playerYellowCard && <View className="h-4 w-2.5 bg-yellow-500" />}

          {playerRedCard && <View className="h-4 w-2.5 bg-red-500" />}

          {playerGoal && (
            <View className="relative">
              <View className="absolute top-[-4px] left-[-4px] w-2.5 h-2.5 rounded-full bg-blue-600 text-white text-2xs flex items-center justify-center z-10">
                <Text className={styles.playerGoal}>{playerGoal}</Text>
              </View>

              <Ball width="18px" height="18px" />
            </View>
          )}

          {playerSubs && (
            <View className="relative">
              <Text className="absolute top-0 right-[-4px] text-white text-[8px] font-bold z-10">
                {playerSubs}
              </Text>

              <Substitution
                width={isAndroid ? 25 : 30}
                height={isAndroid ? 25 : 30}
              />
            </View>
          )}

          <View>{stat}</View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
