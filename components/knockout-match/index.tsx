import React, { memo, useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";

import { Platform } from "@/hooks";
import { DefaultClub, Star } from "@/assets/icon";

import { Final } from "./final";
import { KnockoutMatchProps } from "./types";

export const KnockoutMatch = memo(({ match, isFinal }: KnockoutMatchProps) => {
  const [winner, setWinner] = useState<string>("");
  const navigation = useNavigation<any>();

  const isAndroid = Platform().android;

  const game = match.length > 0 ? match[0] : null;

  const goalsFirstTeam = game?.goals?.home ?? 0;
  const goalsSecondTeam = game?.goals?.away ?? 0;

  const matchEnded = game?.fixture?.status?.short === "FT";
  const matchNotStarted = game?.fixture?.status?.short === "NS";
  const matchEndedOnPenalties = game?.fixture?.status?.short === "PEN";

  useEffect(() => {
    if (matchEnded) {
      if (goalsFirstTeam < goalsSecondTeam) {
        setWinner("2");
      }

      if (goalsFirstTeam > goalsSecondTeam) {
        setWinner("1");
      }
    }

    if (matchEndedOnPenalties) {
      const penaltyHome = game?.score?.penalty?.home;
      const penaltyAway = game?.score?.penalty?.away;

      if (penaltyHome !== null && penaltyAway !== null) {
        if (penaltyHome < penaltyAway) {
          setWinner("2");
        } else if (penaltyHome > penaltyAway) {
          setWinner("1");
        }
      }
    }
  }, [
    matchEnded,
    goalsFirstTeam,
    goalsSecondTeam,
    matchEndedOnPenalties,
    game?.score.penalty.home,
    game?.score.penalty.away,
    game?.fixture.status.short,
  ]);

  const handleNavigate = (id: number, name: string, icon: string) => {
    if (!game) return;

    navigation.push("(match-page)", {
      id: id,
      name: name,
      icon: icon,
    });
  };

  return (
    <Pressable
      onPress={() =>
        handleNavigate(
          game?.fixture.id as number,
          game?.league.name as string,
          game?.league.logo as string
        )
      }
    >
      {isFinal ? (
        <Final
          final={game}
          winner={winner}
          goalsFirstTeam={goalsFirstTeam}
          goalsSecondTeam={goalsSecondTeam}
          finalNotStarted={matchNotStarted}
          homeTeamLogo={game?.teams.home.logo}
          awayTeamLogo={game?.teams.away.logo}
          homeTeamName={game?.teams.home.name}
          awayTeamName={game?.teams.away.name}
          scorePenaltyHome={game?.score?.penalty?.home}
          scorePenaltyAway={game?.score?.penalty?.away}
          finalEndedOnPenalties={matchEndedOnPenalties}
        />
      ) : (
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

          {matchNotStarted && (
            <Text
              className={`${
                isAndroid ? "text-[8px]" : "text-[10px]"
              } absolute bottom-0.5 text-Grey`}
            >
              not started
            </Text>
          )}

          <View className="relative flex-row justify-around items-center gap-1 px-1">
            {!game ? (
              <DefaultClub width="25px" height="25px" />
            ) : (
              <Image
                contentFit="contain"
                style={{ width: 25, height: 25 }}
                source={{ uri: game?.teams.home.logo }}
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

            {!game ? (
              <DefaultClub width="25px" height="25px" />
            ) : (
              <Image
                contentFit="contain"
                style={{ width: 25, height: 25 }}
                source={{ uri: game?.teams.away.logo }}
              />
            )}
          </View>

          {!matchNotStarted && match.length > 0 && (
            <View className="flex-row items-center pb-1.5 h-4.5">
              {matchEndedOnPenalties && (
                <Text
                  className={`${
                    isAndroid ? "text-[6px]" : "text-[10px]"
                  } text-Grey`}
                >
                  ({game?.score?.penalty?.home})
                </Text>
              )}

              <Text className={`${isAndroid && "text-[10px]"} text-Grey`}>
                {goalsFirstTeam} - {goalsSecondTeam}
              </Text>

              {matchEndedOnPenalties && (
                <Text
                  className={`${
                    isAndroid ? "text-[6px]" : "text-[10px]"
                  } text-Grey`}
                >
                  ({game?.score?.penalty?.away})
                </Text>
              )}
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
});
