import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Events, Match } from "@/types/matchPage";

import { Event } from "./event";
import { Wrapper } from "../wrapper";
import { Timer } from "../../assets/icon";

export const MatchEvents = ({ match }: { match?: Match[] | [] }) => {
  const [firstHalf, setFirstHalf] = useState<Events[]>([]);
  const [secondHalf, setSecondHalf] = useState<Events[]>([]);
  const [extraTime, setExtraTime] = useState<Events[]>([]);
  const [penalty, setPenalty] = useState<Events[]>([]);
  const [nav, setNav] = useState<string>("top");
  const [initialHeight, setInitialHeight] = useState<number>(0);

  const matchData = match?.[0];
  const homeTeam = match?.[0]?.teams.home.name;
  const awayTeam = match?.[0]?.teams.away.name;
  const heightView = useSharedValue(0);

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
    let height = 0;

    const pen = allPenaltyEvents.filter((el) => el.type === "Goal").length;
    const extra = extraTime.filter((el) => el.type === "Goal").length;
    const second = secondHalf.filter((el) => el.type === "Goal").length;
    const first = secondHalf.filter((el) => el.type === "Goal").length;

    if (first > 0) height = first * 36 + 17.5;
    if (second > 0) height = second * 36 + 17.5 + height;
    if (extra > 0) height = extra * 36 + 17.5 + height;
    if (pen > 0) height = pen * 36 + 17.5 + height;

    heightView.value = height;
    setInitialHeight(height);
  }, [matchData]);

  return (
    <Wrapper
      wrapperClass="mb-4"
      title={<Text className="text-white">match events</Text>}
    >
      <Animated.View
        style={useAnimatedStyle(() => {
          return {
            maxHeight: heightView.value,
            minHeight: nav === "top" ? heightView.value : undefined,
          };
        })}
        className="relative flex flex-col pb-[30px]"
      >
        <View className="absolute top-0 left-[49.8%] w-[1px] h-full bg-Grey" />

        <View className="flex flex-row items-center bg-wrapper-bg pb-1">
          <Pressable
            onPress={() => toggleNav("top")}
            className={`w-1/2 border-b border-Grey ${
              nav === "top"
                ? "!border-nav-active"
                : "border-wrapper-borderBottom"
            }`}
          >
            <Text className="flex items-center p-2 text-white text-center">
              top
            </Text>
          </Pressable>

          <Pressable
            onPress={() => toggleNav("all")}
            className={`w-1/2 border-b border-Grey ${
              nav === "all"
                ? "!border-nav-active"
                : "border-wrapper-borderBottom"
            }`}
          >
            <Text className="flex items-center p-2 text-white text-center">
              all
            </Text>
          </Pressable>
        </View>

        <View className="flex">
          {penalty.length !== 0 && (
            <View>
              <Text className="text-white text-center bg-wrapper-bg">
                penalty {matchData?.score.penalty.home} -
                {matchData?.score.penalty.away}
              </Text>

              {[...allPenaltyEvents].reverse().map((el, index) => (
                <Event key={index} event={el} homeTeam={homeTeam} />
              ))}
            </View>
          )}

          {extraTime.length !== 0 && (
            <View>
              <Text className="text-Grey text-center bg-wrapper-bg">
                extra time {matchData?.goals.home} - {matchData?.goals.away}
              </Text>

              {[...extraTime]
                .reverse()
                .filter((el) => (nav === "top" ? el.type === "Goal" : el))
                .map((el, index) => (
                  <Event key={index} event={el} homeTeam={homeTeam} />
                ))}
            </View>
          )}

          {secondHalf.length !== 0 && (
            <View>
              <Text className="text-Grey text-center bg-wrapper-bg">
                full time {matchData?.goals.home} - {matchData?.goals.away}
              </Text>

              {[...secondHalf]
                .reverse()
                .filter((el) => (nav === "top" ? el.type === "Goal" : el))
                .map((el, index) => (
                  <Event key={index} event={el} homeTeam={homeTeam} />
                ))}
            </View>
          )}

          {firstHalf.length !== 0 && (
            <View>
              <Text className="text-Grey text-center bg-wrapper-bg">
                first half {matchData?.score.halftime.home} -
                {matchData?.score.halftime.away}
              </Text>

              {[...firstHalf]
                .reverse()
                .filter((el) => (nav === "top" ? el.type === "Goal" : el))
                .map((el, index) => (
                  <Event key={index} event={el} homeTeam={homeTeam} />
                ))}
            </View>
          )}
        </View>

        <View className="absolute bottom-2 left-[48%]">
          <Timer width={14} height={14} />
        </View>
      </Animated.View>
    </Wrapper>
  );
};
