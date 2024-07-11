import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";

import { NavProps } from "./typex";
import { getStyles } from "./styles";

export const Nav = ({ leftRout, leftText, rightRout, rightText }: NavProps) => {
  const [selectedTab, setSelectedTab] = useState(leftText);

  const rout = useRoute();

  const isLeftRuot = selectedTab === leftText;
  const isRightRuot = selectedTab === rightText;

  const styles = getStyles();

  const navigation = useNavigation<any>();
  const handleNavigate = (path: string, text: string) => {
    setSelectedTab(text);
    navigation.navigate(`${path}`);
  };

  console.log({ rout });

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
