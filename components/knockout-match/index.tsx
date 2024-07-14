import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { DefaultClub, Star } from "@/assets/icon";

import { Final } from "./final";
import { KnockoutMatchProps } from "./types";

export const KnockoutMatch = ({ match, isFinal }: KnockoutMatchProps) => {
  const [winner, setWinner] = useState<string>("");

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

  return (
    <>
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
        <View className="relative flex flex-col items-center justify-center p-1 my-5 w-17.5 h-17.5 bg-gray-800 rounded-lg border border-gray-400">
          {matchEndedOnPenalties && (
            <Text className="absolute top-0.5 text-xs text-gray-400">
              after pen
            </Text>
          )}

          {matchNotStarted && (
            <Text className="absolute top-0.5 text-xs text-gray-400">
              not started
            </Text>
          )}

          <View className="relative flex justify-around items-center px-1 w-full h-full">
            {!game ? (
              <DefaultClub width="25px" height="25px" />
            ) : (
              <Image
                source={{ uri: game?.teams.home.logo }}
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

            {!game ? (
              <DefaultClub width="25px" height="25px" />
            ) : (
              <Image
                source={{ uri: game?.teams.away.logo }}
                style={{ width: 25, height: 25 }}
              />
            )}
          </View>

          {!matchNotStarted && match.length > 0 && (
            <View className="flex items-center pb-1.5 h-4.5 text-sm text-gray-400">
              {matchEndedOnPenalties && (
                <Text className="text-xs text-gray-400">
                  ({game?.score?.penalty?.away})
                </Text>
              )}

              <Text>
                {goalsFirstTeam} - {goalsSecondTeam}
              </Text>

              {matchEndedOnPenalties && (
                <Text className="text-xs text-gray-400">
                  ({game?.score?.penalty?.home})
                </Text>
              )}
            </View>
          )}
        </View>
      )}
    </>
  );
};
