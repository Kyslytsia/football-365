import React from "react";
import { View, Text } from "react-native";
import { Match } from "@/types/matchPage";
import { getFormattedDate, MatchTime } from "@/hooks";
import { Image, ImageBackground } from "expo-image";
import { matchBg } from "@/assets/img";

export const Header = ({ match }: { match?: Match[] | [] }) => {
  const matchData = match?.[0];
  const time = matchData?.fixture.status.elapsed;
  const matchStatusLong = matchData?.fixture.status.long;
  const matchStatusShort = matchData?.fixture.status.short;
  const matchEnded = matchData?.fixture.status.short === "FT";
  const matchNotStarted = matchData?.fixture.status.short === "NS";
  const matchEndedOnPenalties = matchData?.fixture.status.short === "PEN";

  return (
    <ImageBackground
      source={matchBg}
      className="relative flex-row justify-around items-center py-2 h-[100px]"
    >
      <View className="flex flex-col justify-around items-center w-[120px]">
        <Image
          contentFit="contain"
          className="w-[50px] h-[50px]"
          alt={matchData?.teams?.home?.name}
          source={matchData?.teams?.home?.logo}
        />

        <Text className="text-[11px] text-white">
          {matchData?.teams?.home?.name}
        </Text>
      </View>

      <Text className="absolute top-5 w-full text-[8px] text-white text-center">
        {matchData?.league.name} {matchData?.league.round}
      </Text>

      <View className="relative flex-row justify-center items-center w-fit mx-auto">
        {matchNotStarted ? (
          <View className="flex flex-col justify-center items-center">
            <Text className="text-[25px] whitespace-nowrap font-[500] text-white">
              {getFormattedDate(
                new Date(matchData.fixture.date).toISOString().slice(0, 10)
              )}
            </Text>

            <Text>{MatchTime(matchData.fixture.date)}</Text>
          </View>
        ) : (
          <View className="relative flex-row justify-center items-center w-[100px] mx-auto">
            <Text className="flex items-center justify-center text-[8px] text-white">
              {matchEndedOnPenalties && `(${matchData?.score.penalty.home})`}
            </Text>

            <Text className="text-[25px] font-[500] text-white">
              {matchData?.goals.home ?? "0"}
            </Text>

            <Text className="text-[25px] font-[500] text-white"> - </Text>

            <Text className="absolute bottom-[-12px] whitespace-nowrap w-full text-center text-[8px] text-white">
              {matchEnded && matchStatusLong}
              {matchStatusShort === "1H" && time + "'"}
              {matchStatusShort === "2H" && time + "'"}
              {matchEndedOnPenalties && "Ended on penalties"}
            </Text>

            <Text className="text-[25px] font-[500] text-white">
              {matchData?.goals.away ?? "0"}
            </Text>

            <Text className="flex items-center justify-center text-[8px] text-white">
              {matchEndedOnPenalties && `(${matchData?.score?.penalty?.away})`}
            </Text>
          </View>
        )}
      </View>

      <View className="flex flex-col justify-around items-center w-[120px]">
        <Image
          contentFit="contain"
          className="w-[50px] h-[50px]"
          alt={matchData?.teams?.away?.name}
          source={matchData?.teams?.away?.logo}
        />

        <Text className="text-[11px] text-white">
          {matchData?.teams?.away?.name}
        </Text>
      </View>
    </ImageBackground>
  );
};
