import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { withTiming, useSharedValue } from "react-native-reanimated";

import { getRounds } from "@/api/rounds";
import { getCurrentSeason, Platform } from "@/hooks";

import { getStyles } from "./styles";
import { RoundsProps } from "./types";

export const Rounds = ({ value, setValue }: RoundsProps) => {
  const [rounds, setRounds] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [initialHeight, setInitialHeight] = useState<number>(0);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const { id, name } = useGlobalSearchParams();
  const ID = Number(id);
  const year = getCurrentSeason(name as string);
  const heightScroll = useSharedValue(0);
  const isAndroid = Platform().android;
  const styles = getStyles({ isAndroid, heightScroll });

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
    setIsModalActive(!isOpen);
    heightScroll.value = withTiming(
      isModalActive ? 0 : initialHeight > 300 ? 300 : initialHeight,
      { duration: 200 }
    );
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

  useEffect(() => {
    const initialHeight = rounds.length * 41;
    setInitialHeight(initialHeight);
  }, [rounds]);

  return (
    <View className={styles.wrapper}>
      <Pressable onPress={toggleOpen}>
        <TextInput
          readOnly
          onPress={toggleOpen}
          value={newValue(value)}
          className={styles.inputText}
        />
      </Pressable>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalActive}
        onRequestClose={() => setIsModalActive(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setIsModalActive(!isModalActive)}
        >
          <View className="flex-1 items-center justify-center bg-[#00000080]">
            <Animated.ScrollView
              className={styles.scroll}
              style={styles.animatedScroll}
              showsVerticalScrollIndicator={false}
            >
              {rounds.map((round) => (
                <Text
                  key={round}
                  className={styles.round}
                  onPress={() => change(round)}
                >
                  {newValue(round)}
                </Text>
              ))}
            </Animated.ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
