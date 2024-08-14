import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";

import { Platform } from "@/hooks";

import { Wrapper } from "../wrapper";
import { getStyles } from "./styles";
import { PreviousMeetingsProps } from "./types";

export const PreviousMeetings = ({
  homeId,
  awayId,
  matches,
  logoHome,
  logoAway,
  homeName,
  awayName,
}: PreviousMeetingsProps) => {
  const isAndroid = Platform().android;
  const styles = getStyles(isAndroid);

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
      childrenClass="border-t border-Black"
      title={<Text className={styles.text}>previous meetings</Text>}
    >
      <View className="flex flex-row items-center justify-between p-7">
        <Pressable onPress={() => handleNavigate(homeId, homeName, logoHome)}>
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

        <Pressable onPress={() => handleNavigate(awayId, awayName, logoAway)}>
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
