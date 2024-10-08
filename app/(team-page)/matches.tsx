import { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Loading } from "@/components";
import { groupMatchesByDateAndLeague } from "@/hooks";
import { getTeamMatches } from "@/api/getTeamMatches";
import { GroupedMatches } from "@/types/groupedMatches";
import LeagueMatches from "../(league-page)/league-matches";

const Matches = () => {
  const { id, name } = useGlobalSearchParams();
  const [matches, setMatches] = useState<GroupedMatches[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const storageTeamMatches = await AsyncStorage.getItem(`${name} matches`);

      try {
        if (storageTeamMatches) {
          const groupedMatches = groupMatchesByDateAndLeague(
            JSON.parse(storageTeamMatches)
          );

          setMatches(groupedMatches);
        }

        if (!storageTeamMatches) {
          const response = await getTeamMatches(id as string);

          await AsyncStorage.setItem(
            `${name} matches`,
            JSON.stringify(response)
          );

          const groupedMatches = groupMatchesByDateAndLeague(response);

          setMatches(groupedMatches);
        }
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loading />;

  return <LeagueMatches matchesData={matches} />;
};

export default Matches;
