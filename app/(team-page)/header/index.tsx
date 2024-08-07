import React from "react";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Image, ImageBackground } from "expo-image";

import { TeamBg } from "@/assets/img";

const Header = () => {
  const { name, icon } = useLocalSearchParams();

  return (
    <ImageBackground
      alt="team"
      source={TeamBg}
      className="flex-col items-center justify-center h-[110px] bg-gray-800"
    >
      <Image
        alt="alt"
        source={icon}
        contentFit="contain"
        className="w-12 h-12"
      />

      <Text className="text-white">{name}</Text>
    </ImageBackground>
  );
};

export default Header;
