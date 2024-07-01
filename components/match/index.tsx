import { Text, View } from "react-native";
import { Link } from "expo-router";
import { Image } from "expo-image";

import { MatchTime } from "@/hooks";
import { MatchProps } from "@/types/match";

import { getStyles } from "./styles";
import { memo } from "react";

export const MatchComponent = ({ match }: { match: MatchProps }) => {
  const id = match.fixture.id;
  const time = match.fixture.status.elapsed;
  const matchStatusLong = match.fixture.status.long;
  const matchStatusShort = match.fixture.status.short;
  const matchEnded = match.fixture.status.short === "FT";
  const matchNotStarted = match.fixture.status.short === "NS";
  const matchEndedOnPenalties = match.fixture.status.short === "PEN";

  const styles = getStyles(matchStatusShort);

  return (
    <View className="relative">
      <Link
        className="absolute w-full min-h-full z-10"
        href={{
          pathname: "/match-page",
          params: {
            id: `${id}`,
          },
        }}
      />

      <View className={styles.wrapper}>
        <View className={styles.status}>
          <Text className={styles.statusText}>
            {matchEnded && matchStatusLong}
            {matchStatusShort === "1H" && time + "'"}
            {matchStatusShort === "2H" && time + "'"}
            {matchEndedOnPenalties && "Ended on penalties"}
          </Text>
        </View>

        <View className={styles.homeTeamWrapper}>
          <Text className="pr-[7px] leading-3 text-[11px] text-right text-white font-extraligh">
            {match.teams.home.name}
          </Text>

          <Image
            contentFit="contain"
            className={styles.logo}
            alt={match.teams.home.name}
            source={match.teams.home.logo}
          />
        </View>

        <View className={styles.scoreWrapper}>
          {matchNotStarted ? (
            <Text className="text-white">{MatchTime(match.fixture.date)}</Text>
          ) : (
            <View className={styles.score}>
              <Text className={styles.penScore}>
                {matchEndedOnPenalties && `(${match.score.penalty.home})`}
              </Text>

              <Text className="pr-[5px] font-500 text-white">
                {match.goals.home ?? "0"}
              </Text>

              <Text className="text-white">:</Text>

              <Text className="pl-[5px] font-500 text-white">
                {match.goals.away ?? "0"}
              </Text>

              <Text className={styles.penScore}>
                {matchEndedOnPenalties && `(${match?.score?.penalty?.away})`}
              </Text>
            </View>
          )}
        </View>

        <View className={styles.awayTeamWrapper}>
          <Image
            contentFit="contain"
            className={styles.logo}
            alt={match.teams.away.name}
            source={match.teams.away.logo}
          />

          <Text className="pl-[7px] leading-3 text-[11px] text-start text-white font-extraligh">
            {match.teams.away.name}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const Match = memo(MatchComponent);
