import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";

import { PlayerSquadProps } from "./types";

export const PlayerSquad = ({
  id,
  name,
  photo,
  number,
  position,
}: PlayerSquadProps) => {
  const navigation = useNavigation<any>();

  const handleNavigate = (id: number, name: string, icon: string) => {
    navigation.push("player-page", {
      id,
      name,
      icon,
    });
  };

  return (
    <TouchableOpacity
      onPress={() => handleNavigate(id, name, photo)}
      className="flex-row items-center justify-between px-2 h-10"
    >
      <View className="flex-row gap-x-3">
        <Image source={photo} alt={name} className="h-8 w-8 rounded-full" />

        <View>
          <Text className="text-white">{name}</Text>
          <Text className="text-Grey text-[10px]">{position}</Text>
        </View>
      </View>

      {number && (
        <View className="flex-row items-center justify-center w-5 h-5 bg-white rounded-full">
          <Text className="text-black text-center text-[10px]">{number}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
