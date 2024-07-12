import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation, useRouter, usePathname } from "expo-router";

import { NavProps } from "./typex";
import { getStyles } from "./styles";

export const Nav = ({ leftRout, leftText, rightRout, rightText }: NavProps) => {
  const pathname = usePathname();
  const route = useRouter();

  const isLeftRuot = pathname === leftRout || pathname === "/";
  const isRightRuot = pathname === rightRout;

  const styles = getStyles();

  const navigation = useNavigation<any>();
  const handleNavigate = (path: string, text: string) => {
    route.replace(path);
  };

  return (
    <View className="flex-row justify-center items-center gap-[20px] p-4">
      <Pressable
        className={`${styles.nav} ${isLeftRuot ? styles.active : ""}`}
        onPress={() => handleNavigate(leftRout, leftText)}
      >
        <Text className="text-white">{leftText}</Text>
      </Pressable>

      <Pressable
        className={`${styles.nav} ${isRightRuot ? styles.active : ""}`}
        onPress={() => handleNavigate(rightRout, rightText)}
      >
        <Text className="text-white">{rightText}</Text>
      </Pressable>
    </View>
  );
};
