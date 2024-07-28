import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";

const Header = () => {
  const { name, icon } = useLocalSearchParams();

  return (
    <View className="flex-col items-center justify-center h-[110px] bg-gray-800">
      <Image
        alt="alt"
        source={icon}
        contentFit="contain"
        className="w-12 h-12"
      />

      <Text className="text-white">{name}</Text>
    </View>
  );
};

export default Header;
