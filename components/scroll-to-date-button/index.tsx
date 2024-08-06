import { BackArrow } from "@/assets/icon";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getStyles } from "./styles";

interface DateBtnProps {
  date: string;
  arrowPos: boolean;
  onPress: () => void;
  wrapperClass?: string;
}

export const ScrollToDateBtn = ({
  date,
  onPress,
  arrowPos,
  wrapperClass,
}: DateBtnProps) => {
  const styles = getStyles(wrapperClass);

  return (
    <TouchableOpacity onPress={onPress} className={styles.wrapper}>
      <View className="flex flex-row items-center gap-x-2 mx-auto px-2 h-full rounded-[14px] bg-cyan-500">
        <Text className="text-white">{date}</Text>

        <View
          className={`${
            arrowPos ? "rotate-[270deg]" : "rotate-90"
          }  transition-all ease-in-out duration-300`}
        >
          <BackArrow width={10} height={10} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
