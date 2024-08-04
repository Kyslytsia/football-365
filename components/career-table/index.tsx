import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";

import { RightArrow } from "@/assets/icon";
import { CareerTableProps } from "./types";

import { Wrapper } from "../wrapper";

export const CareerTable = ({ coach, career, transfers }: CareerTableProps) => {
  const isCareer = career && career.length > 0;
  const isTransfers = transfers && transfers.length > 0;
  return (
    <Wrapper
      wrapperClass="mb-4"
      childrenClass="border-t border-Black"
      title={
        <Text className="text-white">
          {coach ? "coach career" : "player career"}
        </Text>
      }
    >
      {isTransfers &&
        transfers.map((transfer) => {
          return (
            <View
              key={transfer.date}
              className="flex flex-row items-center justify-between p-2"
            >
              <Text className="w-1/3 text-Grey">
                {transfer.date.slice(0, 4)}
              </Text>

              <View className="flex flex-row items-center justify-between w-[80px]">
                <Image
                  alt="outTeam"
                  contentFit="contain"
                  className="w-[20px] h-[20px]"
                  source={transfer.teams.out.logo}
                />

                <RightArrow width={20} height={20} />

                <Image
                  alt="inTeam"
                  contentFit="contain"
                  className="w-[20px] h-[20px]"
                  source={transfer.teams.in.logo}
                />
              </View>

              <Text className="w-1/3 text-white text-right">
                {transfer.type}
              </Text>
            </View>
          );
        })}

      {isCareer &&
        career.map((el) => {
          return (
            <View
              key={el.team.id + el.start}
              className="flex flex-row items-center justify-between py-1 px-2"
            >
              <View className="flex flex-row items-center justify-center gap-x-2">
                <Image
                  contentFit="contain"
                  source={el.team.logo}
                  className="h-[20px] w-[20px]"
                />

                <Text className="text-white">{el.team.name}</Text>
              </View>

              <View className="flex flex-row items-center justify-between w-[110px]">
                <Text className="text-Grey text-center w-1/3">
                  {el.start.slice(0, 4)}
                </Text>

                <Text className="text-Grey text-center w-1/3">-</Text>

                <Text className="text-Grey w-1/3">
                  {el.end?.slice(0, 4) || "now"}
                </Text>
              </View>
            </View>
          );
        })}
    </Wrapper>
  );
};
