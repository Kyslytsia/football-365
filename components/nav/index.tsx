import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

import { NavProps } from "./type";
import { getStyles } from "./styles";

export const Nav = ({
  leftText,
  rightText,
  leftRoute,
  rightRoute,
  underline = false,
  classNameWrapper = "",
}: NavProps) => {
  const [selectedTab, setSelectedTab] = useState(leftText);
  const route = useRouter();

  const isLeftRoute = selectedTab === leftText;
  const isRightRoute = selectedTab === rightText;

  const styles = getStyles(underline, classNameWrapper);

  const handleNavigate = (path: string, text: string) => {
    if (text !== selectedTab) {
      setSelectedTab(text);
      route.replace(path);
    }
  };

  console.log(underline, rightText);

  return (
    <View className={styles.wrapper}>
      <Pressable
        className={`${styles.nav} ${isLeftRoute ? styles.active : ""}`}
        onPress={() => handleNavigate(leftRoute, leftText)}
      >
        <Text className="text-white">{leftText}</Text>
      </Pressable>

      <Pressable
        className={`${styles.nav} ${isRightRoute ? styles.active : ""}`}
        onPress={() => handleNavigate(rightRoute, rightText)}
      >
        <Text className="text-white">{rightText}</Text>
      </Pressable>
    </View>
  );
};
