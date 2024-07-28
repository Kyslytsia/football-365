import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";

export const Header = () => {
  const { name, icon } = useLocalSearchParams();

  return (
    <View className="flex-col items-center justify-center h-[110px] bg-gray-800">
      <Image
        alt="alt"
        source={icon}
        contentFit="contain"
        className="w-12 h-12 rounded-full"
      />

      <Text className="text-white">{name}</Text>
    </View>
  );
};
