import { memo } from "react";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";

import { Matches } from "@/types/groupedMatches";

import { Match } from "../match";
import { Wrapper } from "../wrapper";
import { getStyles } from "./styles";

export const AllLeaguesMatchesComponent = ({
  matches,
}: {
  matches: Matches[];
}) => {
  const styles = getStyles();

  return (
    <>
      {matches.map((league) => {
        return (
          <Wrapper
            margin="m-[15px_0_15px]"
            key={league.leagueName}
            title={
              <View className={styles.title}>
                <Image
                  contentFit="contain"
                  alt={league.leagueLogo}
                  className={styles.logo}
                  source={league.leagueLogo}
                />

                <Link
                  asChild
                  className={styles.text}
                  href={{
                    pathname: "/league-page",
                    params: {
                      id: `${league.leagueId}`,
                      name: `${league.leagueName}`,
                    },
                  }}
                >
                  <Text className="w-full text-white">{league.leagueName}</Text>
                </Link>
              </View>
            }
          >
            <View>
              {league.matches.map((match) => {
                return <Match match={match} key={match.fixture.id} />;
              })}
            </View>
          </Wrapper>
        );
      })}
    </>
  );
};

export const AllLeaguesMatches = memo(AllLeaguesMatchesComponent);
