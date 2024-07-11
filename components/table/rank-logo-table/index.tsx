import { Image } from "expo-image";
import { Text, View } from "react-native";

import { modifyDescription } from "@/hooks";

import { RankLogoTableProps } from "./types";

const RankLogoTable = ({ isChampion, standings }: RankLogoTableProps) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Champions League":
        return `bg-[#1ee119]`;
      case "Europa League":
        return `bg-[#637ff8]`;
      case "Europa Conference League":
        return `bg-[#d3c9f2]`;
      case "Relegation":
        return `bg-[#e92020]`;
      default:
        return {};
    }
  };

  return (
    <View className="absolute top-0 left-0 z-30 bg-wrapper-bg">
      <View className="flex-row justify-center h-8">
        <Text className="w-5 text-xs"></Text>
        <Text className="w-5 text-xs"></Text>
      </View>

      {standings.map((el, index) => (
        <View
          key={index + "rankLogo"}
          className="relative flex-row items-center justify-between p-[0_5px_0_8px] w-[55px] border-t border-[#1b1a22] h-8"
        >
          <View
            className={`absolute left-0 h-full w-0.5
              ${getStatusStyle(modifyDescription(el))}`}
          />

          {isChampion && el.rank === 1 && (
            <View className="absolute top-[-12px] left-3"></View>
          )}

          <View className="flex items-center justify-center w-5 h-5">
            <Text className="text-white text-xs">{el.rank}</Text>
          </View>

          <View className="flex items-center justify-center w-5 h-5">
            <Image
              alt={el.team.name}
              className="w-5 h-5"
              source={{ uri: el.team.logo }}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default RankLogoTable;
