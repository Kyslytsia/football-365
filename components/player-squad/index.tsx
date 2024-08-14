import React, { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";

import { Platform } from "@/hooks";

import { getStyles } from "./styles";
import { PlayerSquadProps } from "./types";

export const PlayerSquad = memo(
  ({ id, name, photo, coach, number, position }: PlayerSquadProps) => {
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
        onPress={() => handleNavigate(id, position, name, photo)}
        className="flex-row items-center justify-between px-2 h-10 border-t border-Black"
      >
        <View className="flex-row gap-x-3">
          <Image source={photo} alt={name} className="h-8 w-8 rounded-full" />

          <View>
            <Text className={styles.name}>{name}</Text>
            <Text className={styles.position}>{position}</Text>
          </View>
        </View>

        {number && (
          <View className={styles.statWrapper}>
            <Text className={styles.stat}>{number}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
);
