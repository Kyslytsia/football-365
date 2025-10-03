import React from "react";
import { useNavigation } from "expo-router";
import { Image, ImageBackground } from "expo-image";
import { View, Text, TouchableOpacity } from "react-native";

import { matchBg } from "@/assets/img";
import { Match } from "@/types/matchPage";
import { getFormattedDate, MatchTime, Platform } from "@/helpers";

import { BackBtn } from "../back-btn";
import { getStyles } from "./styles";

export const HeaderMatchPage = ({ match }: { match?: Match[] | [] }) => {
  const matchData = match?.[0];
  const time = matchData?.fixture.status.elapsed;
  const matchStatusLong = matchData?.fixture.status.long;
  const matchStatusShort = matchData?.fixture.status.short;
  const matchEnded = matchData?.fixture.status.short === "FT";
  const matchEndedOnPenalties = matchData?.fixture.status.short === "PEN";
  const matchNotStarted =
    matchData?.fixture.status.short === "NS" ||
    matchData?.fixture.status.short === "TBD";

  const isAndroid = Platform().android;
  const styles = getStyles(isAndroid);
  const navigation = useNavigation<any>();

  const handleNavigate = (id: number, name: string, icon: string) => {
    navigation.push("(team-page)", {
      id: id,
      name: name,
      icon: icon,
    });
  };

  return (
    <ImageBackground source={matchBg} className="relative">
      <View className="flex flex-row justify-around items-center w-full h-[140px]">
        <BackBtn className="mt-8" />

        <View className="flex flex-col justify-around items-center mt-4 w-[120px]">
          <TouchableOpacity
            onPress={() =>
              handleNavigate(
                matchData?.teams.home.id as number,
                matchData?.teams.home.name as string,
                matchData?.teams.home.logo as string
              )
            }
          >
            <Image
              contentFit="contain"
              style={{ width: 50, height: 50 }}
              alt={matchData?.teams?.home?.name}
              source={matchData?.teams?.home?.logo}
            />
          </TouchableOpacity>

          <Text className={styles.teamName}>
            {matchData?.teams?.home?.name}
          </Text>
        </View>

        <Text className={styles.league}>
          {matchData?.league.name} {matchData?.league.round}
        </Text>

        <View className="relative flex-row justify-center items-center pt-2 my-4 w-fit mx-auto">
          {matchNotStarted ? (
            <View
              className={`${
                isAndroid ? "pt-4" : "pt-4"
              } flex flex-col justify-center items-center`}
            >
              <Text
                className={`${
                  isAndroid ? "text-[12px]" : "text-[15px]"
                } whitespace-nowrap font-[500] text-white`}
              >
                {getFormattedDate(
                  new Date(matchData.fixture.date).toISOString().slice(0, 10)
                )}
              </Text>

              <Text className="text-white">
                {MatchTime(matchData.fixture.date)}
              </Text>
            </View>
          ) : (
            <View className="relative flex-row justify-center items-center pt-4 w-[100px] mx-auto">
              <Text className="flex items-center justify-center text-[8px] text-white">
                {matchEndedOnPenalties && `(${matchData?.score.penalty.home})`}
              </Text>

              <Text className={styles.score}>
                {matchData?.goals.home ?? "0"}
              </Text>

              <Text className={styles.score}> - </Text>

              <Text className={styles.status}>
                {matchEnded && matchStatusLong}
                {matchStatusShort === "1H" && time + "'"}
                {matchStatusShort === "2H" && time + "'"}
                {matchEndedOnPenalties && "Ended on penalties"}
              </Text>

              <Text className={styles.score}>
                {matchData?.goals.away ?? "0"}
              </Text>

              <Text className="flex items-center justify-center text-[8px] text-white">
                {matchEndedOnPenalties &&
                  `(${matchData?.score?.penalty?.away})`}
              </Text>
            </View>
          )}
        </View>

        <View className="flex flex-col justify-around items-center mt-4 w-[120px]">
          <TouchableOpacity
            onPress={() =>
              handleNavigate(
                matchData?.teams.away.id as number,
                matchData?.teams.away.name as string,
                matchData?.teams.away.logo as string
              )
            }
          >
            <Image
              contentFit="contain"
              style={{ width: 50, height: 50 }}
              alt={matchData?.teams?.away?.name}
              source={matchData?.teams?.away?.logo}
            />
          </TouchableOpacity>

          <Text className={styles.teamName}>
            {matchData?.teams?.away?.name}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};
