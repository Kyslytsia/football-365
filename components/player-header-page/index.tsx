import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";

import { PlayerHeaderProps } from "./types";

export const PlayerHeader = ({ pos, name, icon }: PlayerHeaderProps) => {
  return (
    <View className="flex-col items-center justify-center h-[110px] bg-gray-800">
      <Image
        alt="alt"
        source={icon}
        contentFit="contain"
        className="w-12 h-12 rounded-full"
      />

      <Text className="text-white">{name}</Text>
      <Text className="text-Grey">{pos}</Text>
    </View>
  );
};
