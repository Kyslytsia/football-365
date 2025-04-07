import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getMatchId } from "@/api/match";
import { Match } from "@/types/matchPage";
import { getHeadToHead } from "@/api/headToHead";
import MatchStatistics from "@/components/match-statistics";
import {
  Loading,
  MatchEvents,
  MatchInfo,
  PreviousMeetings,
} from "@/components";

const Details = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [matchData, setMatchData] = useState<Match[]>([]);
  const [headToHead, setHeadToHead] = useState<Match[]>([]);
  const homeId = matchData?.[0]?.teams.home.id.toString();
  const awayId = matchData?.[0]?.teams.away.id.toString();
  const notStarted =
    matchData?.[0]?.fixture.status.short === "TBD" ||
    matchData?.[0]?.fixture.status.short === "NS";

  const { id } = useGlobalSearchParams();

  const ID = Number(id);

  useEffect(() => {
    const fetchHeadToHead = async () => {
      setLoading(true);

      try {
        const h2h = await AsyncStorage.getItem(`${id} H2H`);
        const storageMatch = await AsyncStorage.getItem(`${id} match`);

        const isStorage = h2h && storageMatch;

        if (isStorage && isStorage !== "[]") {
          setHeadToHead(JSON.parse(h2h));
          setMatchData(JSON.parse(storageMatch));
        }

        if (!isStorage) {
          const match = await getMatchId(ID);
          setMatchData(match);
          await AsyncStorage.setItem(`${id} match`, JSON.stringify(match));

          const headToHead = await getHeadToHead(homeId, awayId);
          setHeadToHead(headToHead);
          await AsyncStorage.setItem(`${id} H2H`, JSON.stringify(headToHead));
        }
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeadToHead();
  }, [homeId, awayId]);

  if (loading) return <Loading />;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-col gap-y-[10px] mx-auto mt-2">
        {!notStarted && (
          <>
            <MatchEvents match={matchData} />

            {matchData[0]?.statistics?.length > 0 && (
              <MatchStatistics match={matchData} />
            )}
          </>
        )}

        <MatchInfo match={matchData} />

        <PreviousMeetings
          matches={headToHead}
          homeId={Number(homeId) ?? null}
          awayId={Number(awayId) ?? null}
          homeName={matchData?.[0]?.teams.home.name}
          awayName={matchData?.[0]?.teams.away.name}
          logoHome={matchData?.[0]?.teams.home.logo ?? ""}
          logoAway={matchData?.[0]?.teams.away.logo ?? ""}
        />
      </View>
    </ScrollView>
  );
};

export default Details;
