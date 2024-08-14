import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

import { Platform } from "@/hooks";

import { getStyles } from "./styles";

interface NavProps {
  setValue: (str: string) => void;
}

export const Nav = ({ setValue }: NavProps) => {
  const [active, setActive] = useState<string>("overall");

  const styles = getStyles(Platform().android);

  const handlePress = (value: string) => {
    setValue(value);
    setActive(value);
  };

  return (
    <View className="flex-row mx-auto p-3">
      <Pressable
        className={`${styles.wrapper} ${
          active === "overall" ? "bg-nav-active" : ""
        }`}
        onPress={() => handlePress("overall")}
      >
        <Text className={styles.text}>overall</Text>
      </Pressable>

      <Pressable
        className={`${styles.wrapper} ${
          active === "home" ? "bg-nav-active" : ""
        }`}
        onPress={() => handlePress("home")}
      >
        <Text className={styles.text}>home</Text>
      </Pressable>

      <Pressable
        className={`${styles.wrapper} ${
          active === "away" ? "bg-nav-active" : ""
        }`}
        onPress={() => handlePress("away")}
      >
        <Text className={styles.text}>away</Text>
      </Pressable>
    </View>
  );
};
