import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { getStyles } from "./styles";
import { DateBtnProps } from "./types";
import { Platform } from "@/hooks";

export const ScrollToDateBtn = ({
  date,
  onPress,
  wrapperClass,
}: DateBtnProps) => {
  const isAndroid = Platform().android;
  const styles = getStyles(wrapperClass, isAndroid);

  return (
    <TouchableOpacity onPress={onPress} className={styles.wrapper}>
      <View className="flex flex-row items-center mx-auto px-3 h-full rounded-[14px] bg-cyan-500">
        <Text className={styles.text}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};
