import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

import { getStyles } from "./styles";

const MainPage = () => {
  const styles = getStyles();

  return (
    <View className={styles.view}>
      <Text className={styles.text}>MainPage</Text>

      <Link href="/league-page">
        <Text className={styles.text}>League</Text>
      </Link>

      <Link href="/match-page">
        <Text className={styles.text}>Match</Text>
      </Link>
    </View>
  );
};

export default MainPage;
