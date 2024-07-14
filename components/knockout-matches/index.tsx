import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";

import { MatchProps } from "@/types/match";
import { DefaultClub, Star } from "@/assets/icon";

export const KnockoutMatches = ({
  matches,
}: {
  matches: MatchProps[] | [];
}) => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>("");

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
        visible={isModalActive}
        onRequestClose={() => setIsModalActive(false)}
      >
        <View>
          {/* Add your modal content here */}
          {/* {matches} */}
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setIsModalActive(matches.length > 0)}>
        <View className="relative flex flex-col items-center justify-center p-1 my-5 w-17.5 h-17.5 bg-gray-800 rounded-lg border border-gray-400">
          {matchEndedOnPenalties && (
            <Text className="absolute top-0.5 text-xs text-gray-400">
              after pen
            </Text>
          )}
          {firstMatchEnded && secondMatchNotStarted && (
            <Text className="absolute top-0.5 text-xs text-gray-400">
              1 match
            </Text>
          )}
          {firstMatchNotStarted && (
            <Text className="absolute top-0.5 text-xs text-gray-400">
              not started
            </Text>
          )}

          <View className="relative flex justify-around items-center px-1 w-full h-full">
            {!firstMatch ? (
              <DefaultClub width="25px" height="25px" />
            ) : (
              <Image
                source={{ uri: matches[0]?.teams.home.logo }}
                style={{ width: 25, height: 25 }}
              />
            )}

            <View
              className={`absolute top-0 ${
                winner === "1" ? "left-1.5 opacity-100" : "left-0 opacity-0"
              }`}
            >
              <Star width="7px" height="7px" />
            </View>

            {!secondMatch ? (
              <DefaultClub width="25px" height="25px" />
            ) : (
              <Image
                source={{ uri: matches[0]?.teams.away.logo }}
                style={{ width: 25, height: 25 }}
              />
            )}
          </View>

          {!firstMatchNotStarted && matches.length > 0 && (
            <View className="flex items-center pb-1.5 h-4.5 text-sm text-gray-400">
              {matchEndedOnPenalties && (
                <Text className="text-xs text-gray-400">
                  ({secondMatch?.score?.penalty?.away})
                </Text>
              )}
              <Text>
                {firstTeamGoals} - {secondTeamGoals}
              </Text>
              {matchEndedOnPenalties && (
                <Text className="text-xs text-gray-400">
                  ({secondMatch?.score?.penalty?.home})
                </Text>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};
