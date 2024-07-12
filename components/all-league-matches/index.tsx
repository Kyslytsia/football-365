import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import { useNavigation, useRouter } from "expo-router";

import { Matches } from "@/types/groupedMatches";

import { Match } from "../match";
import { Wrapper } from "../wrapper";

import { getStyles } from "./styles";

export const Component = ({ matches }: { matches: Matches[] }) => {
  const styles = getStyles();
  const route = useRouter();
  const navigation = useNavigation<any>();

  const handleNavigate = (id: number, name: string, icon: string) => {
    navigation.push("(league-page)", {
      id: id,
      name: name,
      icon: icon,
    });
  };

  return (
    <>
      {matches.map((league) => {
        return (
          <Wrapper
            margin="mb-[15px]"
            key={league.leagueName}
            title={
              <Pressable
                onPress={() =>
                  handleNavigate(
                    league.leagueId,
                    league.leagueName,
                    league.leagueLogo
                  )
                }
              >
                <View className={styles.title}>
                  <Image
                    contentFit="contain"
                    alt={league.leagueLogo}
                    className={styles.logo}
                    source={league.leagueLogo}
                  />

                  <Text className="w-full text-white">{league.leagueName}</Text>
                </View>
              </Pressable>
            }
          >
            <View>
              {league.matches.map((match) => {
                return <Match match={match} isBorder key={match.fixture.id} />;
              })}
            </View>
          </Wrapper>
        );
      })}
    </>
  );
};

export const AllLeaguesMatches = memo(Component);
