import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Platform } from "@/hooks";
import { Events, Match } from "@/types/matchPage";

import { Event } from "./event";
import { getStyles } from "./styles";
import { Wrapper } from "../wrapper";
import { Timer } from "../../assets/icon";

export const MatchEvents = ({ match }: { match?: Match[] | [] }) => {
  const [firstHalf, setFirstHalf] = useState<Events[]>([]);
  const [secondHalf, setSecondHalf] = useState<Events[]>([]);
  const [extraTime, setExtraTime] = useState<Events[]>([]);
  const [penalty, setPenalty] = useState<Events[]>([]);
  const [nav, setNav] = useState<string>("top");
  const [initialHeight, setInitialHeight] = useState<number>(0);

  const isAndroid = Platform().android;
  const styles = getStyles(isAndroid);
  const matchData = match?.[0];
  const homeTeam = match?.[0]?.teams.home.name;
  const awayTeam = match?.[0]?.teams.away.name;
  const isExtra = match?.[0]?.score.extratime.home !== null;
  const heightView = useSharedValue(initialHeight);

  const homePenaltyEvents = penalty.filter(
    (event) => event.team.name === homeTeam
  );
  const awayPenaltyEvents = penalty.filter(
    (event) => event.team.name === awayTeam
  );

  const allPenaltyEvents: Events[] = [];

  for (let i = 0; i < 5; i++) {
    if (homePenaltyEvents[i]) {
      allPenaltyEvents.push(homePenaltyEvents[i]);
    }
    if (awayPenaltyEvents[i]) {
      allPenaltyEvents.push(awayPenaltyEvents[i]);
    }
  }

  useEffect(() => {
    const firstHalf: Events[] = [];
    const secondHalf: Events[] = [];
    const extraTime: Events[] = [];
    const penalty: Events[] = [];

    matchData?.events.forEach((el) => {
      if (el.time.elapsed <= 45) {
        firstHalf.push(el);
      }

      if (el.time.elapsed === 45 && el.time.extra !== null) {
        firstHalf.push(el);
      }

      if (
        el.time.elapsed >= 45 &&
        el.time.elapsed <= 90 &&
        el.time.extra === null
      ) {
        secondHalf.push(el);
      }

      if (el.time.elapsed === 90 && el.time.extra !== null) {
        secondHalf.push(el);
      }

      if (
        el.time.elapsed > 90 &&
        el.time.elapsed <= 120 &&
        el.time.extra === null
      ) {
        extraTime.push(el);
      }

      if (el.time.elapsed >= 120 && el.time.extra !== null) {
        penalty.push(el);
      }
    });

    setFirstHalf(firstHalf);
    setSecondHalf(secondHalf);
    setExtraTime(extraTime);
    setPenalty(penalty);
  }, [matchData]);

  const toggleNav = (srt: string) => {
    setNav(srt);
    heightView.value = withTiming(srt === "top" ? initialHeight : 1500, {
      duration: 300,
    });
  };

  useEffect(() => {
    let height = 35;

    const pen = allPenaltyEvents.filter((el) => el.type === "Goal").length;
    const extra = extraTime.filter((el) => el.type === "Goal").length;
    const second = secondHalf.filter((el) => el.type === "Goal").length;
    const first = firstHalf.filter((el) => el.type === "Goal").length;

    if (first > 0) height = height + first * 36;
    if (second > 0) height = height + second * 36;
    if (extra > 0) height = height + 17.5 + extra * 36;
    if (pen > 0) height = height + 17.5 + pen * 36;
    if (isExtra && extra === 0) height = height + 17.5;

    heightView.value = height;
    setInitialHeight(height);
  }, [match, initialHeight]);

  return (
    <Wrapper
      wrapperClass="mb-4"
      childrenClass="border-t border-Black"
      title={
        <Text className={`${isAndroid && "text-[10px]"} text-white`}>
          match events
        </Text>
      }
    >
      <View className="relative flex flex-col pb-[30px]">
        <View className="absolute top-0 left-[49.8%] w-[1px] h-full bg-Grey" />

        <View className="flex flex-row items-center bg-wrapper-bg pb-1">
          <TouchableOpacity
            onPress={() => toggleNav("top")}
            className={`${styles.navWrapper} ${
              nav === "top" ? styles.navActive : styles.navNotActive
            }`}
          >
            <Text className={styles.navText}>top</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => toggleNav("all")}
            className={`${styles.navWrapper} ${
              nav === "all" ? styles.navActive : styles.navNotActive
            }`}
          >
            <Text className={styles.navText}>all</Text>
          </TouchableOpacity>
        </View>

        <Animated.View
          style={useAnimatedStyle(() => {
            return {
              maxHeight: heightView.value,
              minHeight: nav === "top" ? heightView.value : undefined,
            };
          })}
          className="flex-col"
        >
          {penalty.length !== 0 && (
            <View>
              <Text className={styles.eventText}>
                penalty {matchData?.score.penalty.home}
                <Text> - </Text>
                {matchData?.score.penalty.away}
              </Text>

              {[...allPenaltyEvents].reverse().map((el, index) => (
                <Event key={index} event={el} homeTeam={homeTeam} />
              ))}
            </View>
          )}

          {isExtra && (
            <View>
              <Text className={styles.eventText}>
                extra time {matchData?.goals.home ?? 0}
                <Text> - </Text>
                {matchData?.goals.away ?? 0}
              </Text>

              {[...extraTime]
                .reverse()
                .filter((el) => (nav === "top" ? el.type === "Goal" : el))
                .map((el, index) => (
                  <Event key={index} event={el} homeTeam={homeTeam} />
                ))}
            </View>
          )}

          <View>
            <Text className={styles.eventText}>
              full time {matchData?.goals.home} - {matchData?.goals.away}
            </Text>

            {[...secondHalf]
              .reverse()
              .filter((el) => (nav === "top" ? el.type === "Goal" : el))
              .map((el, index) => (
                <Event key={index} event={el} homeTeam={homeTeam} />
              ))}
          </View>

          <View>
            <Text className={styles.eventText}>
              first half {matchData?.score.halftime.home}
              <Text> - </Text>
              {matchData?.score.halftime.away}
            </Text>

            {[...firstHalf]
              .reverse()
              .filter((el) => (nav === "top" ? el.type === "Goal" : el))
              .map((el, index) => (
                <Event key={index} event={el} homeTeam={homeTeam} />
              ))}
          </View>
        </Animated.View>

        <View className="absolute bottom-2 left-[48%]">
          <Timer width={14} height={14} />
        </View>
      </View>
    </Wrapper>
  );
};
