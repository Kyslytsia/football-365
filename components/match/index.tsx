import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "expo-router";
import { Image } from "expo-image";

import { MatchTime } from "@/hooks";
import { MatchProps } from "@/types/match";

import { getStyles } from "./styles";

export const Component = ({ match }: { match: MatchProps }) => {
  const id = match.fixture.id;
  const time = match.fixture.status.elapsed;
  const matchStatusLong = match.fixture.status.long;
  const matchStatusShort = match.fixture.status.short;
  const matchEnded = match.fixture.status.short === "FT";
  const matchNotStarted = match.fixture.status.short === "NS";
  const matchEndedOnPenalties = match.fixture.status.short === "PEN";

  const styles = getStyles(matchStatusShort);
  const navigation = useNavigation<any>();

  const handleNavigate = () => {
    navigation.navigate("league-page/index", {
      id: id,
    });
  };

  return (
    <Pressable onPress={handleNavigate}>
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
    </Pressable>
  );
};

export const Match = memo(Component);
