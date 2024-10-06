import React from "react";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Image, ImageBackground } from "expo-image";

import { Platform } from "@/hooks";
import { TeamBg } from "@/assets/img";
import { BackBtn } from "@/components";

const Header = () => {
  const { name, icon } = useLocalSearchParams();
  const isAndroid = Platform().android;

  return (
    <ImageBackground
      alt="team"
      source={TeamBg}
      className={`${
        isAndroid ? "pt-8 h-[130px]" : "pt-6"
      } flex-col items-center justify-center h-[140px] bg-gray-800`}
    >
      <BackBtn />

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
