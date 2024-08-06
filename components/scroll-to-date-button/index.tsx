import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { getStyles } from "./styles";
import { DateBtnProps } from "./types";

export const ScrollToDateBtn = ({
  date,
  onPress,
  wrapperClass,
}: DateBtnProps) => {
  const styles = getStyles(wrapperClass);

  return (
    <TouchableOpacity onPress={onPress} className={styles.wrapper}>
      <View className="flex flex-row items-center mx-auto px-3 h-full rounded-[14px] bg-cyan-500">
        <Text className="text-white">{date}</Text>
      </View>
    </TouchableOpacity>
  );
};
