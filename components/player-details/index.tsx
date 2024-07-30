import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";

import { Wrapper } from "../wrapper";
import { PlayerDetailsProps } from "./types";

export const PlayerDetails = ({ stat, number }: PlayerDetailsProps) => {
  return (
    <Wrapper
      wrapperClass="mb-4"
      childrenClass="flex flex-row items-center  border-t border-Black"
      title={<Text className="text-white">player details</Text>}
    >
      <View className="flex flex-col justify-center w-1/2 p-2">
        <Text className="text-white text-[16px]">
          {stat[0].player.nationality}
        </Text>

        <Text className="text-white text-[16px]">
          number: <Text className="text-Grey">{number}</Text>
        </Text>

        <Text className="text-white text-[16px]">
          height: <Text className="text-Grey">{stat[0].player.height}</Text>
        </Text>

        <Text className="text-white text-[16px]">
          age: {stat[0].player.age}{" "}
          <Text className="text-Grey">{stat[0].player.birth.date}</Text>
        </Text>
      </View>

      <View className="h-[80%] w-[1px] bg-Grey rounded-md" />

      <View className="flex flex-col justify-center items-center gap-y-1 p-2 w-1/2">
        <Image
          alt="team"
          className="w-[60px] h-[60px]"
          source={stat[0].statistics[0].team.logo}
        />

        <Text className="text-Grey">{stat[0].statistics[0].team.name}</Text>
      </View>
    </Wrapper>
  );
};
