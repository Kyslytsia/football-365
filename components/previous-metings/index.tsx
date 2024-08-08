import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";

import { Wrapper } from "../wrapper";
import { getStyles } from "./styles";
import { PreviousMeetingsProps } from "./types";

export const PreviousMeetings = ({
  homeId,
  awayId,
  matches,
  logoHome,
  logoAway,
}: PreviousMeetingsProps) => {
  const homeNameTeam = matches?.find((el) => el.teams.home.id === homeId);
  const awayNameTeam = matches?.find((el) => el.teams.away.id === awayId);
  const styles = getStyles();

  const winsAndDraws = () => {
    let team1Wins = 0;
    let team2Wins = 0;
    let draws = 0;

    matches?.forEach((match) => {
      if (match.teams.away.id === homeId && match.teams.away.winner) {
        ++team1Wins;
      } else if (match.teams.home.id === homeId && match.teams.home.winner)
        ++team1Wins;

      if (match.teams.away.id === awayId && match.teams.away.winner) {
        ++team2Wins;
      } else if (match.teams.home.id === awayId && match.teams.home.winner)
        ++team2Wins;

      if (!match.teams.home.winner && !match.teams.away.winner) ++draws;
    });

    return { team1Wins, team2Wins, draws };
  };

  const navigation = useNavigation<any>();

  const handleNavigate = (id: number, name: string, icon: string) => {
    navigation.push("(team-page)", {
      id: id,
      name: name,
      icon: icon,
    });
  };

  return (
    <Wrapper
      wrapperClass="mb-[20px]"
      title={<Text className={styles.text}>previous meetings</Text>}
    >
      <View className="flex flex-row items-center justify-between p-7">
        <Pressable
          onPress={() =>
            handleNavigate(
              homeId,
              homeNameTeam?.teams.home.name as string,
              logoHome
            )
          }
        >
          <Image
            alt="1"
            source={logoHome}
            contentFit="contain"
            className="h-12 w-12"
          />
        </Pressable>

        <View className="flex flex-row items-center justify-center gap-2.5">
          <View className={styles.statWrapper}>
            <Text className={styles.text}>{winsAndDraws().team1Wins}</Text>
            <Text className={styles.text}>wins</Text>
          </View>

          <View className={styles.statWrapper}>
            <Text className={styles.text}>{winsAndDraws().draws}</Text>
            <Text className={styles.text}>draw</Text>
          </View>

          <View className={styles.statWrapper}>
            <Text className={styles.text}>{winsAndDraws().team2Wins}</Text>
            <Text className={styles.text}>wins</Text>
          </View>
        </View>

        <Pressable
          onPress={() =>
            handleNavigate(
              awayId,
              awayNameTeam?.teams.away.name as string,
              logoAway
            )
          }
        >
          <Image
            alt="2"
            source={logoAway}
            contentFit="contain"
            className="h-12 w-12"
          />
        </Pressable>
      </View>
    </Wrapper>
  );
};
