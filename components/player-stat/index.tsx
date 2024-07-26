import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Wrapper } from "../wrapper";
import { FilteredPlayersProps, PlayerStatProps } from "./types";

export const PlayerStat = ({ type, playersStats }: PlayerStatProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredPlayers, setFilteredPlayers] = useState<
    FilteredPlayersProps[]
  >([]);

  const heightWrapper = useSharedValue(200);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    heightWrapper.value = withTiming(isOpen ? 200 : 2000, { duration: 300 });
  };

  useEffect(() => {
    const playersData = playersStats.map((player) => {
      let stat = 0;

      player.statistics.forEach((el) => {
        if (type === "goals") {
          if (el?.goals.total !== null) {
            stat += el.goals.total;
          }

          return;
        }

        if (type === "assist") {
          if (el?.goals.assists !== null) {
            stat += el.goals.assists;
          }

          return;
        }

        if (type === "yellow card") {
          if (el?.cards.yellow) {
            stat += el.cards.yellow;
          }

          return;
        }

        if (type === "red card") {
          if (el?.cards.red !== null) {
            stat += el.cards.red;
          }

          return;
        }
      });

      return {
        stat: stat,
        name: player.player.name,
        photo: player.player.photo,
        nation: player.player.nationality,
      };
    });

    const filteredData = playersData.sort((a, b) => b.stat - a.stat);

    setFilteredPlayers(filteredData);
  }, [playersStats]);

  return (
    <Wrapper
      wrapperClass="mb-4"
      title={<Text className="text-white">{type}</Text>}
    >
      <Animated.View
        className="max-h-[200px]"
        style={useAnimatedStyle(() => {
          return {
            maxHeight: heightWrapper.value,
          };
        })}
      >
        {filteredPlayers.map((player) => {
          return (
            <View
              key={player.name + "stat"}
              className="flex-row items-center justify-between px-2 h-10 border-t border-Black"
            >
              <View className="flex-row gap-x-2">
                <Image
                  source={player.photo}
                  alt={player.name}
                  className="h-8 w-8 rounded-full"
                />

                <View>
                  <Text className="text-white">{player.name}</Text>
                  <Text className="text-Grey text-[10px]">{player.nation}</Text>
                </View>
              </View>

              <View className="flex-row items-center w-6">
                <Text className="w-full text-center text-white">
                  {player.stat}
                </Text>
              </View>
            </View>
          );
        })}
      </Animated.View>

      <Pressable
        onPress={toggleOpen}
        className="bg-table-bg border-t border-Black"
      >
        <Text className="p-2 text-white text-center">view all</Text>
      </Pressable>
    </Wrapper>
  );
};
