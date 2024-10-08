import React, { memo, useEffect, useState } from "react";
import { Image } from "expo-image";
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { Platform } from "@/hooks";
import { MatchProps } from "@/types/match";
import { DefaultClub, Star } from "@/assets/icon";

import { Match } from "../match";

export const KnockoutMatches = memo(
  ({ matches }: { matches: MatchProps[] | [] }) => {
    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const [winner, setWinner] = useState<string>("");

    const isAndroid = Platform().android;

    const firstMatch = matches.length > 0 ? matches[0] : null;
    const secondMatch = matches.length > 1 ? matches[1] : null;

    const firstTeamGoals =
      (firstMatch?.goals?.home ?? 0) + (secondMatch?.goals?.away ?? 0);
    const secondTeamGoals =
      (firstMatch?.goals?.away ?? 0) + (secondMatch?.goals?.home ?? 0);

    const firstMatchNotStarted = firstMatch?.fixture?.status?.short === "NS";
    const secondMatchNotStarted = secondMatch?.fixture?.status?.short === "NS";
    const firstMatchEnded = firstMatch?.fixture?.status?.short === "FT";
    const secondMatchEnded = secondMatch?.fixture?.status?.short === "FT";
    const matchEndedOnPenalties = secondMatch?.fixture?.status?.short === "PEN";

    useEffect(() => {
      if (secondMatchEnded) {
        if (firstTeamGoals < secondTeamGoals) {
          setWinner("2");
        }
        if (firstTeamGoals > secondTeamGoals) {
          setWinner("1");
        }
      }
      if (matchEndedOnPenalties) {
        const penaltyHome = secondMatch?.score?.penalty?.home;
        const penaltyAway = secondMatch?.score?.penalty?.away;

        if (penaltyHome !== null && penaltyAway !== null) {
          if (penaltyHome < penaltyAway) {
            setWinner("1");
          } else if (penaltyHome > penaltyAway) {
            setWinner("2");
          }
        }
      }
    }, [
      firstTeamGoals,
      secondTeamGoals,
      secondMatch?.score?.penalty?.home,
      secondMatch?.score?.penalty?.away,
      secondMatch?.fixture?.status?.short,
    ]);

    return (
      <>
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
              <View className="w-[350px] bg-gray-800 rounded-lg overflow-hidden">
                {matches?.map((el, index) => (
                  <Match key={index} match={el} />
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <TouchableOpacity onPress={() => setIsModalActive(matches.length > 0)}>
          <View className="relative flex-col items-center justify-center gap-y-0.5 p-1 w-[70px] h-[70px] bg-gray-800 rounded-lg border border-Grey">
            {matchEndedOnPenalties && (
              <Text
                className={`${
                  isAndroid ? "text-[8px]" : "text-[10px]"
                } absolute bottom-0.5 text-Grey`}
              >
                after pen
              </Text>
            )}

            {firstMatchEnded && secondMatchNotStarted && (
              <Text className="absolute bottom-0.5 text-[10px] text-Grey">
                1 match
              </Text>
            )}

            {firstMatchNotStarted && (
              <Text className="absolute bottom-0.5 text-[10px] text-Grey">
                not started
              </Text>
            )}

            <View className="relative flex-row justify-around items-center gap-1 px-1">
              {!firstMatch ? (
                <DefaultClub width="25px" height="25px" />
              ) : (
                <Image
                  contentFit="contain"
                  style={{ width: 25, height: 25 }}
                  source={{ uri: matches[0]?.teams.home.logo }}
                />
              )}

              {winner.length > 0 && (
                <View
                  className={`absolute top-0 ${
                    winner === "1"
                      ? "left-[-2px] top-[-2px] opacity-100"
                      : "right-[-2px] top-[-2px] opacity-100"
                  }`}
                >
                  <Star width="7px" height="7px" />
                </View>
              )}

              {!secondMatch ? (
                <DefaultClub width="25px" height="25px" />
              ) : (
                <Image
                  contentFit="contain"
                  style={{ width: 25, height: 25 }}
                  source={{ uri: matches[0]?.teams.away.logo }}
                />
              )}
            </View>

            {!firstMatchNotStarted && matches.length > 0 && (
              <View className="flex-row items-center pb-1.5 h-4.5">
                {matchEndedOnPenalties && (
                  <Text
                    className={`${
                      isAndroid ? "text-[6px]" : "text-[10px]"
                    } text-Grey`}
                  >
                    ({secondMatch?.score?.penalty?.home})
                  </Text>
                )}

                <Text className={`${isAndroid && "text-[10px]"} text-Grey`}>
                  {firstTeamGoals} - {secondTeamGoals}
                </Text>

                {matchEndedOnPenalties && (
                  <Text
                    className={`${
                      isAndroid ? "text-[6px]" : "text-[10px]"
                    } text-Grey`}
                  >
                    ({secondMatch?.score?.penalty?.away})
                  </Text>
                )}
              </View>
            )}
          </View>
        </TouchableOpacity>
      </>
    );
  }
);
