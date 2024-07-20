import { View, Text } from "react-native";

import { InfoProps } from "./types";

export const Info = ({ icon, info, additionalInfo }: InfoProps) => {
  return (
    <View className="flex flex-row items-center gap-x-2 p-2 border-t border-Black">
      <View className="flex items-center justify-center">{icon}</View>

      <View className="flex flex-col items-start justify-center leading-[17px]">
        <Text className="text-xs text-white">{info}</Text>
        <Text className="text-xs text-[#a6b8c9]">{additionalInfo}</Text>
      </View>
    </View>
  );
};
