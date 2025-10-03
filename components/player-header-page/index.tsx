import React from "react";
import { Text, View } from "react-native";
import { Image, ImageBackground } from "expo-image";

import { Platform } from "@/helpers";
import { PlayerBg } from "@/assets/img";

import { BackBtn } from "../back-btn";
import { PlayerHeaderProps } from "./types";

export const PlayerHeader = ({ pos, name, icon }: PlayerHeaderProps) => {
  const isAndroid = Platform().android;
  const text = isAndroid && "text-[8px]";
  const photo = isAndroid ? "w-10 h-10" : "w-12 h-12";

  return (
    <ImageBackground alt="player" source={PlayerBg}>
      <View
        className={`${
          isAndroid ? "pt-8 h-[130px]" : "pt-12"
        } flex-col items-center justify-center h-[140px]`}
      >
        <BackBtn className="mt-8" />

        <Image
          alt="alt"
          source={icon}
          contentFit="contain"
          style={{ width: 40, height: 40, borderRadius: 50 }}
        />

        <Text className={`${text} text-white`}>{name}</Text>
        <Text className={`${text} text-white`}>{pos}</Text>
      </View>
    </ImageBackground>
  );
};
