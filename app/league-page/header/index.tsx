import React from "react";
import { View, ImageBackground } from "react-native";
import { Image } from "expo-image";

import { HeaderProps } from "./types";
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

const Header = ({ icon, leagueName }: HeaderProps) => {
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
    <View className="sticky h-[100px]">
      <ImageBackground
        source={getBackgroundImage()}
        className="flex justify-center items-center w-full h-full"
      >
        <Image
          source={icon}
          alt={leagueName}
          contentFit="contain"
          className="mt-2 w-[60px] h-[60px]"
        />
      </ImageBackground>
    </View>
  );
};

export default Header;
