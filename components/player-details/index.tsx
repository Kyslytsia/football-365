import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";

import { Wrapper } from "../wrapper";
import { PlayerDetailsProps } from "./types";

export const PlayerDetails = ({
  stat,
  number,
  nationalityLogo,
}: PlayerDetailsProps) => {
  return (
    <Wrapper
      wrapperClass="mb-4"
      childrenClass="flex flex-col items-center  border-t border-Black"
      title={<Text className="text-white">player details</Text>}
    >
      <View className="flex flex-row justify-center p-2">
        <View className="flex flex-col justify-center items-center gap-y-1 w-1/2">
          <Image
            alt="nationality"
            contentFit="cover"
            source={nationalityLogo ?? ""}
            className="w-[60px] h-[60px] rounded-full"
          />

          <Text className="text-white">{stat?.[0]?.player?.nationality}</Text>
        </View>

        <View className="h-full w-[1px] bg-Grey rounded-md" />

        <View className="flex flex-col justify-center items-center gap-y-1 p-2 w-1/2">
          <Image
            alt="team"
            className="w-[60px] h-[60px]"
            source={stat?.[0]?.statistics?.[0].team.logo}
          />

          <Text className="text-white">
            {stat?.[0]?.statistics?.[0].team.name}
          </Text>
        </View>
      </View>

      <View className="flex flex-row justify-center items-center p-2">
        <View className="flex flex-col  items-center text-white w-1/3 text-[16px]">
          {stat.length > 0 && (
            <Text className="text-white text-[18px]">
              age: {stat?.[0]?.player?.age}
            </Text>
          )}

          <Text className="text-Grey">
            {stat?.[0]?.player?.birth.date ?? "date of birth"}
          </Text>
        </View>

        <View className="flex flex-col items-center w-1/3 text-white text-[16px]">
          {stat.length > 0 && (
            <Text className="text-white text-[18px]">
              {stat?.[0]?.player?.height}
            </Text>
          )}

          <Text className="text-Grey">height</Text>
        </View>

        <View className="flex flex-col items-center w-1/3">
          {number !== null && (
            <Text className="text-white text-[18px]">{number}</Text>
          )}

          <Text className="text-Grey">number</Text>
        </View>
      </View>
    </Wrapper>
  );
};
