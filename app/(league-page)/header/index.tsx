import React from "react";
import { View, ImageBackground } from "react-native";
import { Image } from "expo-image";

import { HeaderProps } from "./types";
import { Platform } from "@/hooks";
import {
  el,
  ucl,
  euro,
  laliga,
  ligue1,
  seriaA,
  bundesliga,
  premierleague,
} from "@/assets/img";
import { BackBtn } from "@/components";

const Header = ({ icon, leagueName }: HeaderProps) => {
  const isAndroid = Platform().android;

  const getBackgroundImage = () => {
    switch (leagueName) {
      case "UEFA Champions League":
        return ucl;
      case "UEFA Europa League":
        return el;
      case "Euro Championship":
        return euro;
      case "La Liga":
        return laliga;
      case "Premier League":
        return premierleague;
      case "Bundesliga":
        return bundesliga;
      case "Serie A":
        return seriaA;
      case "Ligue 1":
        return ligue1;
      default:
        return null;
    }
  };

  return (
    <View className={`${isAndroid ? "h-[130px] pt-2" : "h-[140px]"}`}>
      <ImageBackground
        source={getBackgroundImage()}
        className="flex justify-center items-center w-full h-full"
      >
        <BackBtn />

        <Image
          source={icon}
          alt={leagueName}
          contentFit="contain"
          className="mt-8 w-[60px] h-[60px]"
        />
      </ImageBackground>
    </View>
  );
};

export default Header;
