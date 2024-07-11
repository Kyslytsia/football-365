import { StandingProps } from "@/types/standings";

import { StatisticsTableProps } from "./types";
import { ScrollView, Text, View } from "react-native";

const StatisticsTable = ({ navValue, standings }: StatisticsTableProps) => {
  const change = (el?: StandingProps) => {
    if (navValue && navValue === "home" && el) {
      return el.home;
    }
    if (navValue && navValue === "away" && el) {
      return el.away;
    }
    return el?.all;
  };

  return (
    <ScrollView
      horizontal
      className="absolute top-0 w-full z-20"
      showsHorizontalScrollIndicator={false}
    >
      <View className="flex-row justify-end w-[157%]">
        <View>
          <View className={`flex-row h-8`}>
            {["PT", "P", "F:A", "+/-", "W", "D", "L", "Form"].map(
              (header, index) => (
                <View
                  key={index}
                  className="flex justify-center items-center h-full w-8"
                >
                  <Text className="text-xs text-white">{header}</Text>
                </View>
              )
            )}
          </View>

          {standings.map((team, index) => (
            <View
              key={index + "statistics"}
              className="flex-row h-8 bg-[#26242e] border-l border-t border-[#1b1a22]"
            >
              <View className="flex justify-center items-center w-8">
                <Text className="text-white text-xs border-t border-[#1b1a22]">
                  {team.points}
                </Text>
              </View>

              <View className="flex justify-center items-center w-8">
                <Text className="text-white text-xs border-t border-[#1b1a22]">
                  {change(team)?.played ?? 0}
                </Text>
              </View>

              <View className="flex justify-center items-center w-8">
                <Text className="text-white text-xs border-t border-[#1b1a22]">
                  {change(team)?.goals.for ?? 0}:
                  {change(team)?.goals.against ?? 0}
                </Text>
              </View>

              <View className="flex justify-center items-center w-8">
                <Text className="text-white text-xs border-t border-[#1b1a22]">
                  {team.goalsDiff}
                </Text>
              </View>

              <View className="flex justify-center items-center w-8">
                <Text className="text-white text-xs border-t border-[#1b1a22]">
                  {change(team)?.win ?? 0}
                </Text>
              </View>

              <View className="flex justify-center items-center w-8">
                <Text className="text-white text-xs border-t border-[#1b1a22]">
                  {change(team)?.draw ?? 0}
                </Text>
              </View>

              <View className="flex justify-center items-center w-8">
                <Text className="text-white text-xs border-t border-[#1b1a22]">
                  {change(team)?.lose ?? 0}
                </Text>
              </View>

              <View className="flex-row justify-around items-center h-full w-[130px] px-3">
                {team.form?.split("").map((letter, index) => (
                  <View
                    key={index + "form"}
                    className={`
                     flex justify-center items-center w-[20px] h-4.5 rounded-full
                      ${getFormStyle(letter)}
                    `}
                  >
                    <Text className="text-xs text-white">{letter}</Text>
                  </View>
                ))}
                {!team.form &&
                  ["N", "N", "N", "N", "N"].map((letter, index) => (
                    <View
                      key={index + "form"}
                      className={`flex justify-center items-center w-4.5 h-4.5 rounded-full
                        ${getFormStyle(letter)}
                      `}
                    >
                      <Text className="text-xs text-white">{letter}</Text>
                    </View>
                  ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const getFormStyle = (letter: string) => {
  switch (letter) {
    case "W":
      return "bg-[#1ee11e]";
    case "D":
      return "bg-[#f2ec2c]";
    case "L":
      return "bg-[#f66731]";
    case "N":
      return "bg-gray-500";
    default:
      return {};
  }
};

export default StatisticsTable;
