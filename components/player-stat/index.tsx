import React, { memo, useEffect, useState } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Platform } from "@/hooks";

import { Wrapper } from "../wrapper";
import { getStyles } from "./styles";
import { FilteredPlayersProps, PlayerStatProps } from "./types";

export const PlayerStat = memo(({ type, playersStats }: PlayerStatProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredPlayers, setFilteredPlayers] = useState<
    FilteredPlayersProps[]
  >([]);

  const isAndroid = Platform().android;
  const styles = getStyles(isAndroid);

  const heightWrapper = useSharedValue(200);
  const navigation = useNavigation<any>();

  const handleNavigate = (
    id: number,
    pos: string,
    name: string,
    icon: string
  ) => {
    navigation.push("player-page", {
      id: id,
      pos: pos,
      name: name,
      icon: icon,
    });
  };

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
        id: player.player.id,
        name: player.player.name,
        photo: player.player.photo,
        nation: player.player.nationality,
        position: player.statistics[0].games.position,
      };
    });

    const filteredData = playersData.sort((a, b) => b.stat - a.stat);

    setFilteredPlayers(filteredData);
  }, [playersStats]);

  return (
    <Wrapper
      wrapperClass="mb-4"
      title={<Text className={styles.title}>{type}</Text>}
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
            <TouchableOpacity
              key={player.name + "stat"}
              onPress={() =>
                handleNavigate(
                  player.id,
                  player.position,
                  player.name,
                  player.photo
                )
              }
              className="flex-row items-center justify-between px-2 h-10 border-t border-Black"
            >
              <View className="flex-row gap-x-2">
                <Image
                  alt={player.name}
                  source={player.photo}
                  className={styles.photo}
                />

                <View>
                  <Text className={styles.name}>{player.name}</Text>
                  <Text className={styles.nation}>{player.nation}</Text>
                </View>
              </View>

              <View className="flex-row items-center w-6">
                <Text className={styles.stat}>{player.stat}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </Animated.View>

      <Pressable
        onPress={toggleOpen}
        className="bg-table-bg border-t border-Black"
      >
        <Text className={`${styles.title} p-2 text-center`}>view all</Text>
      </Pressable>
    </Wrapper>
  );
});
