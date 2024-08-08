import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Match } from "@/types/matchPage";

import { getStyles } from "./styles";
import { Wrapper } from "../wrapper";
import { BallPossession } from "./ball-passesion";

interface MatchStatisticsProps {
  match?: Match[] | [];
}

const MatchStatistics: React.FC<MatchStatisticsProps> = ({ match }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const styles = getStyles();
  const firstTeamStat = match?.[0]?.statistics?.[0]?.statistics;
  const secondTeamStat = match?.[0]?.statistics?.[1]?.statistics;
  const heightView = useSharedValue(180);

  const data = firstTeamStat?.map((homeStat) => {
    const awayStat = secondTeamStat?.find((s) => s?.type === homeStat?.type);
    const homeValue = homeStat?.value ?? "0";
    const awayValue = awayStat?.value ?? "0";
    const percentageHome = homeStat?.value
      ? parseFloat(homeStat?.value.toString().replace("%", ""))
      : 0;
    const percentageAway = awayStat?.value
      ? parseFloat(awayStat?.value.toString().replace("%", ""))
      : 0;
    const isPercentage =
      homeStat?.type.includes("%") ||
      homeStat?.type.includes("Ball Possession");

    return {
      homeValue,
      awayValue,
      isPercentage,
      label: homeStat?.type,
      homePercentage: isNaN(percentageHome) ? 0 : percentageHome,
      awayPercentage: isNaN(percentageAway) ? 0 : percentageAway,
    };
  });

  const statsData = data?.filter((el) => el.label !== "Ball Possession");
  const ballPossession = data?.find((el) => el.label === "Ball Possession");

  const toggle = (bol: boolean) => {
    setIsOpen(bol);
    heightView.value = withTiming(isOpen ? 180 : 1500, {
      duration: 300,
    });
  };

  return (
    <Wrapper
      wrapperClass="mb-4"
      childrenClass="flex-col py-4 border-t border-Black"
      title={<Text className="text-white">match statistics</Text>}
    >
      <BallPossession
        colorAway="blue"
        colorHome="green"
        label="Possession"
        valueHome={ballPossession?.homeValue ?? "0"}
        valueAway={ballPossession?.awayValue ?? "0"}
        percentageHome={ballPossession?.homePercentage ?? 0}
        percentageAway={ballPossession?.awayPercentage ?? 0}
      />

      <Animated.View
        className="p-4 overflow-hidden"
        style={useAnimatedStyle(() => {
          return {
            maxHeight: heightView.value,
          };
        })}
      >
        {statsData?.map((stat, index) => (
          <View key={index} className="flex items-center justify-between py-2">
            <View className="flex-row justify-between w-full">
              <Text className={styles.text}>{stat.homeValue}</Text>
              <Text className={styles.text}>{stat.label}</Text>
              <Text className={styles.text}>{stat.awayValue}</Text>
            </View>

            <View className="flex-row mt-1">
              <View
                className={`${styles.statWrapper} justify-end rounded-l-md`}
              >
                <View
                  className={`h-full bg-green-700`}
                  style={{
                    width: `${
                      stat.isPercentage
                        ? stat.homePercentage
                        : (stat.homePercentage /
                            (stat.homePercentage + stat.awayPercentage)) *
                          100
                    }%`,
                  }}
                />
              </View>

              <View
                className={`${styles.statWrapper} justify-start rounded-r-md`}
              >
                <View
                  className={`h-full bg-blue-700`}
                  style={{
                    width: `${
                      stat.isPercentage
                        ? stat.awayPercentage
                        : (stat.awayPercentage /
                            (stat.homePercentage + stat.awayPercentage)) *
                          100
                    }%`,
                  }}
                />
              </View>
            </View>
          </View>
        ))}
      </Animated.View>

      <Pressable className="p-2 cursor-pointer" onPress={() => toggle(!isOpen)}>
        <Text className={styles.text}>{!isOpen ? "Show more" : "Close"}</Text>
      </Pressable>
    </Wrapper>
  );
};

export default MatchStatistics;
