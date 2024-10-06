import React from "react";
import { Text } from "react-native";
import { Image, ImageBackground } from "expo-image";

import { Platform } from "@/hooks";
import { PlayerBg } from "@/assets/img";

import { BackBtn } from "../back-btn";
import { PlayerHeaderProps } from "./types";

export const PlayerHeader = ({ pos, name, icon }: PlayerHeaderProps) => {
  const isAndroid = Platform().android;
  const text = isAndroid && "text-[8px]";
  const photo = isAndroid ? "w-10 h-10" : "w-12 h-12";

  return (
    <ImageBackground
      alt="player"
      source={PlayerBg}
      className={`${
        isAndroid ? "pt-8 h-[130px]" : "pt-8"
      } flex-col items-center justify-center h-[140px]`}
    >
      <BackBtn />

      <Image
        alt="alt"
        source={icon}
        contentFit="contain"
        className={`${photo} rounded-full`}
      />

      <Text className={`${text} text-white`}>{name}</Text>
      <Text className={`${text} text-white`}>{pos}</Text>
    </ImageBackground>
  );
};
