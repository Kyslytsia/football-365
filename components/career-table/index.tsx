import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";

import { RightArrow } from "@/assets/icon";
import { Transfer } from "@/types/transfers";

import { Wrapper } from "../wrapper";

export const CareerTable = ({ transfers }: { transfers: Transfer[] }) => {
  return (
    <Wrapper title={<Text className="text-white">player career</Text>}>
      {transfers.map((transfer) => {
        return (
          <View
            key={transfer.date}
            className="flex flex-row items-center justify-between p-2"
          >
            <Text className="w-1/3 text-Grey">{transfer.date.slice(0, 4)}</Text>

            <View className="flex flex-row items-center justify-between w-[80px]">
              <Image
                alt="outTeam"
                className="w-[20px] h-[20px]"
                source={transfer.teams.out.logo}
              />

              <RightArrow width={20} height={20} />

              <Image
                alt="inTeam"
                className="w-[20px] h-[20px]"
                source={transfer.teams.in.logo}
              />
            </View>

            <Text className="w-1/3 text-white text-right">{transfer.type}</Text>
          </View>
        );
      })}
    </Wrapper>
  );
};
