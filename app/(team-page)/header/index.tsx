import React from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Image, ImageBackground } from "expo-image";

import { Platform } from "@/helpers";
import { TeamBg } from "@/assets/img";
import { BackBtn } from "@/components";

const Header = () => {
  const { name, icon } = useLocalSearchParams();
  const isAndroid = Platform().android;

  return (
    <ImageBackground alt="team" source={TeamBg}>
      <View
        className={`${
          isAndroid ? "pt-8 h-[130px]" : "pt-8"
        } flex-col items-center justify-center h-[140px]`}
      >
        <BackBtn className="mt-8" />

        <Image
          alt="alt"
          source={icon}
          contentFit="contain"
          style={{ width: 40, height: 40 }}
        />

        <Text className="text-white">{name}</Text>
      </View>
    </ImageBackground>
  );
};

export default Header;
