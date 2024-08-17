import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";

import { Platform } from "@/hooks";

import { Wrapper } from "../wrapper";
import { PlayerDetailsProps } from "./types";
import { getStyles } from "./styles";

export const PlayerDetails = ({
  coach,
  number,
  coachInfo,
  playerInfo,
  nationalityLogo,
}: PlayerDetailsProps) => {
  const isAndroid = Platform().android;
  const styles = getStyles(isAndroid);

  return (
    <Wrapper
      wrapperClass="mb-4"
      childrenClass="flex flex-col items-center border-t border-Black"
      title={
        <Text className={styles.title}>
          {coach ? "coach details" : "player details"}
        </Text>
      }
    >
      <View className="flex flex-row justify-center p-2">
        <View className="flex flex-col justify-between items-center gap-y-1 pb-2 pt-4 w-1/2">
          <Image
            alt="nationality"
            contentFit="cover"
            source={nationalityLogo ?? ""}
            className="w-[60px] h-[40px]"
          />

          <Text className={styles.whiteText}>
            {coachInfo?.[0]?.nationality ??
              playerInfo?.[0]?.player?.nationality}
          </Text>
        </View>

        <View className="h-full w-[1px] bg-Grey rounded-md" />

        <View className="flex flex-col justify-center items-center gap-y-1 p-2 w-1/2">
          <Image
            alt="team"
            className="w-[60px] h-[60px]"
            source={
              coachInfo?.[0]?.team?.logo ??
              playerInfo?.[0]?.statistics?.[0].team.logo
            }
          />

          <Text className={styles.whiteText}>
            {coachInfo?.[0]?.team.name ??
              playerInfo?.[0]?.statistics?.[0].team.name}
          </Text>
        </View>
      </View>

      <View className="flex flex-row justify-center items-center p-2">
        <View className="flex flex-col items-center text-white w-1/3 text-[16px]">
          <Text className={styles.whiteText}>
            age: {coachInfo?.[0]?.age ?? playerInfo?.[0]?.player?.age}
          </Text>

          <Text className={styles.grayText}>
            {coachInfo?.[0]?.birth.date ??
              playerInfo?.[0]?.player?.birth.date ??
              "date of birth"}
          </Text>
        </View>

        <View className="flex flex-col items-center w-1/3 text-white text-[16px]">
          <Text className={styles.whiteText}>
            {coachInfo?.[0]?.height ?? playerInfo?.[0]?.player?.height}
          </Text>

          <Text className={styles.grayText}>height</Text>
        </View>

        {!coach && (
          <View className="flex flex-col items-center w-1/3">
            {number !== null && (
              <Text className={styles.whiteText}>{number}</Text>
            )}

            <Text className={styles.grayText}>number</Text>
          </View>
        )}
      </View>
    </Wrapper>
  );
};
