import { memo } from "react";
import { ScrollView, Text, View } from "react-native";

import { StandingProps } from "@/types/standings";

import { StatisticsTableProps } from "./types";
import { getStyles } from "./styles";

export const StatisticsTable = memo(
  ({ navValue, standings }: StatisticsTableProps) => {
    const styles = getStyles();

    const change = (el?: StandingProps) => {
      if (navValue && navValue === "home" && el) {
        return el.home;
      }
      if (navValue && navValue === "away" && el) {
        return el.away;
      }
      return el?.all;
    };

    const getFormStyle = (letter: string) => {
      switch (letter) {
        case "W":
          return "bg-table-form-win";
        case "D":
          return "bg-table-form-draw";
        case "L":
          return "bg-table-form-lose";
        case "N":
          return "bg-gray-500";
        default:
          return {};
      }
    };

    return (
      <ScrollView
        horizontal
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        className="absolute top-0 w-full z-2 overflow-x-auto"
      >
        <View className="flex flex-row justify-end w-[565px]">
          <View>
            <View className={`flex-row h-8`}>
              {["PT", "P", "F:A", "+/-", "W", "D", "L", "Form"].map(
                (header, index) => (
                  <View
                    key={index}
                    className={`flex justify-center items-center h-full ${
                      header === "Form" ? "w-[140px]" : "w-8"
                    }`}
                  >
                    <Text className="text-xs text-white">{header}</Text>
                  </View>
                )
              )}
            </View>

            {standings.map((team, index) => (
              <View
                key={index + "statistics"}
                className="flex-row h-8 bg-table-bg border-l border-t border-table-border"
              >
                <View className={styles.statWrapper}>
                  <Text className={styles.statText}>{team.points}</Text>
                </View>

                <View className={styles.statWrapper}>
                  <Text className={styles.statText}>
                    {change(team)?.played ?? 0}
                  </Text>
                </View>

                <View className={styles.statWrapper}>
                  <Text className={styles.statText}>
                    {change(team)?.goals.for ?? 0}:
                    {change(team)?.goals.against ?? 0}
                  </Text>
                </View>

                <View className={styles.statWrapper}>
                  <Text className={styles.statText}>{team.goalsDiff}</Text>
                </View>

                <View className={styles.statWrapper}>
                  <Text className={styles.statText}>
                    {change(team)?.win ?? 0}
                  </Text>
                </View>

                <View className={styles.statWrapper}>
                  <Text className={styles.statText}>
                    {change(team)?.draw ?? 0}
                  </Text>
                </View>

                <View className={styles.statWrapper}>
                  <Text className={styles.statText}>
                    {change(team)?.lose ?? 0}
                  </Text>
                </View>

                <View className="flex-row justify-around items-center h-full w-[140px] px-1">
                  {team.form?.split("").map((letter, index) => (
                    <View
                      key={index + "form"}
                      className={`
                     ${styles.formWrapper}
                      ${getFormStyle(letter)}
                    `}
                    >
                      <Text className={styles.formText}>{letter}</Text>
                    </View>
                  ))}
                  {!team.form &&
                    ["N", "N", "N", "N", "N"].map((letter, index) => (
                      <View
                        key={index + "form"}
                        className={`${styles.formWrapper}
                        ${getFormStyle(letter)}
                      `}
                      >
                        <Text className={styles.formText}>{letter}</Text>
                      </View>
                    ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
);
