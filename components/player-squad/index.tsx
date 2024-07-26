import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";

interface PlayerSquadProps {
  name: string;
  photo: string;
  position: string;
  number?: string | number | null;
}

export const PlayerSquad = ({
  name,
  photo,
  number,
  position,
}: PlayerSquadProps) => {
  return (
    <View className="flex-row items-center justify-between px-2 h-10">
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
    </View>
  );
};
