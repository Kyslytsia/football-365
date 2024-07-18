import { getHeadToHead } from "@/api/headToHead";
import { getMatchId } from "@/api/match";
import { MatchEvents } from "@/components/match-events";
import { Match } from "@/types/matchPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const Details = () => {
  const [matchData, setMatchData] = useState<Match[]>([]);
  const [headToHead, setHeadToHead] = useState<Match[]>([]);
  const notStarted = matchData?.[0]?.fixture.status.short;
  const homeId = matchData?.[0]?.teams.home.id.toString();
  const awayId = matchData?.[0]?.teams.away.id.toString();

  const { id } = useGlobalSearchParams();

  const ID = Number(id);

  useEffect(() => {
    const fetchHeadToHead = async () => {
      try {
        const h2h = await AsyncStorage.getItem("H2H");
        const storageMatch = await AsyncStorage.getItem("match");

        const isStorage = h2h && storageMatch;

        if (isStorage) {
          setHeadToHead(JSON.parse(h2h));
          setMatchData(JSON.parse(storageMatch));
        }

        if (!isStorage) {
          const match = await getMatchId(ID);
          setMatchData(match);
          await AsyncStorage.setItem("match", JSON.stringify(match));

          const response = await getHeadToHead(homeId, awayId);
          setHeadToHead(response);
          console.log("headToHead", response);
          await AsyncStorage.setItem("H2H", JSON.stringify(response));
        }
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchHeadToHead();
  }, [homeId, awayId]);

  console.log({ matchData });

  return (
    <ScrollView>
      <View className="mx-auto mt-2">
        {notStarted !== "NS" && <MatchEvents match={matchData} />}

        {/* <MatchInfo match={match} /> */}

        {/* <PreviousMeetings
          matches={headToHead}
          homeId={Number(homeId) ?? null}
          awayId={Number(awayId) ?? null}
          logoHome={match?.[0]?.teams.home.logo ?? ""}
          logoAway={match?.[0]?.teams.away.logo ?? ""}
        /> */}
      </View>
    </ScrollView>
  );
};

export default Details;
