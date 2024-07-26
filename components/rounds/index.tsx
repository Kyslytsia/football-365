import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalSearchParams } from "expo-router";
import Animated, { withTiming, useSharedValue } from "react-native-reanimated";

import { getRounds } from "@/api/rounds";
import { getCurrentSeason } from "@/hooks";

import { getStyles } from "./styles";
import { RoundsProps } from "./types";

export const Rounds = ({ value, setValue }: RoundsProps) => {
  const [rounds, setRounds] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { id, name } = useGlobalSearchParams();
  const ID = Number(id);
  const year = getCurrentSeason(name as string);
  const heightWrapper = useSharedValue(0);
  const heightScroll = useSharedValue(0);
  const styles = getStyles({ heightScroll, heightWrapper });

  const newValue = (value?: string) => {
    return value &&
      value !== "all matches" &&
      name !== "Euro Championship" &&
      name !== "UEFA Europa League" &&
      name !== "UEFA Champions League" &&
      name !== "World Cup"
      ? value.split(" ").slice(-1) + " round"
      : value;
  };

  const change = (round: string) => {
    setValue(round);
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    heightScroll.value = withTiming(isOpen ? 0 : 300, { duration: 200 });
    heightWrapper.value = withTiming(isOpen ? 0 : 700, { duration: 200 });
  };

  useEffect(() => {
    (async () => {
      try {
        const storageRounds = await AsyncStorage.getItem(`${name} Rounds`);

        if (storageRounds && storageRounds !== "[]") {
          setRounds(JSON.parse(storageRounds));
        } else {
          const response = await getRounds(year, ID);
          await AsyncStorage.setItem(
            `${name} Rounds`,
            JSON.stringify(["all matches", ...response])
          );
          setRounds(["all matches", ...response]);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    })();
  }, []);

  return (
    <View className="relative mb-4 mx-auto w-[360px] z-50">
      <TextInput
        readOnly
        onPress={toggleOpen}
        value={newValue(value)}
        className="p-[10px] rounded-[10px] bg-round-bg border border-Black text-white overflow-hidden"
      />

      <Pressable onPressIn={toggleOpen}>
        <Animated.View
          className={styles.wrapper}
          style={styles.animatedWrapper}
        >
          <Animated.ScrollView
            className={styles.scroll}
            style={styles.animatedScroll}
          >
            <View>
              {rounds.map((round) => (
                <Text
                  key={round}
                  onPress={() => change(round)}
                  className="flex justify-center items-center p-3 text-white text-center"
                >
                  {newValue(round)}
                </Text>
              ))}
            </View>
          </Animated.ScrollView>
        </Animated.View>
      </Pressable>
    </View>
  );
};
