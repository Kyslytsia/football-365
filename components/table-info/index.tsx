import { View, Text } from "react-native";
import React from "react";

import { getStyles } from "./styles";

export const TableInfo = () => {
  const styles = getStyles();
  return (
    <View className={styles.wrapper}>
      <View className={styles.statusWrapper}>
        <View className={`${styles.dote} bg-table-status-ucl`} />
        <Text className={styles.text}>UEFA Champions League</Text>
      </View>

      <View className={styles.statusWrapper}>
        <View className={`${styles.dote} bg-table-status-uel`} />
        <Text className={styles.text}>UEFA Europa League</Text>
      </View>

      <View className={styles.statusWrapper}>
        <View className={`${styles.dote} bg-table-status-ecl`} />
        <Text className={styles.text}>UEFA Europa Conference League</Text>
      </View>

      <View className={styles.statusWrapper}>
        <View className={`${styles.dote} bg-table-status-rl`} />
        <Text className={styles.text}>Relegation</Text>
      </View>
    </View>
  );
};
