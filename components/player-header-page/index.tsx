import React from "react";
import { Text } from "react-native";
import { Image, ImageBackground } from "expo-image";

import { PlayerBg } from "@/assets/img";

import { PlayerHeaderProps } from "./types";

export const PlayerHeader = ({ pos, name, icon }: PlayerHeaderProps) => {
  return (
    <ImageBackground
      alt="player"
      source={PlayerBg}
      className="flex-col items-center justify-center h-[120px]"
    >
      <Image
        alt="alt"
        source={icon}
        contentFit="contain"
        className="w-12 h-12 rounded-full"
      />

      <Text className="text-white">{name}</Text>
      <Text className="text-white">{pos}</Text>
    </ImageBackground>
  );
};
