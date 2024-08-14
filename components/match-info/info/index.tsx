import { View, Text } from "react-native";

import { Platform } from "@/hooks";

import { InfoProps } from "./types";

export const Info = ({ icon, info, additionalInfo }: InfoProps) => {
  const isAndroid = Platform().android;
  const text = isAndroid ? "text-[10px]" : "text-xs";

  return (
    <View className="flex flex-row items-center gap-x-2 p-2 border-t border-Black">
      <View className="flex items-center justify-center">{icon}</View>

      <View className="flex flex-col items-start justify-center leading-[17px]">
        <Text className={`${text} text-white`}>{info}</Text>
        <Text className={`${text} text-Grey`}>{additionalInfo}</Text>
      </View>
    </View>
  );
};
