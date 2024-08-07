import React, { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Loading } from "@/components";
import { StandingProps } from "@/types/standings";
import { getLeagueForTeamOnId } from "@/api/getLeagueForTeamOnId";

import NationalTable from "../(league-page)/table/table-national";
import Groups from "../(league-page)/table/(table-championship)/group";

interface TeamData {
  nameLeague: string;
  data: number | StandingProps[][];
}

const Standings = () => {
  const { id, name } = useGlobalSearchParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [teamData, setTeamData] = useState<TeamData>();

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const storageLeagueId = await AsyncStorage.getItem(
          `${name} league info`
        );

        if (storageLeagueId) setTeamData(JSON.parse(storageLeagueId));

        if (!storageLeagueId) {
          const response = await getLeagueForTeamOnId(id as string);

          setTeamData(response);

          await AsyncStorage.setItem(
            `${name} league info`,
            JSON.stringify(response)
          );
        }
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      {teamData && typeof teamData.data === "number" && (
        <NationalTable
          leagueId={teamData.data}
          leagueName={teamData.nameLeague}
        />
      )}

      {teamData && Array.isArray(teamData.data) && (
        <Groups
          standingsData={teamData.data}
          leagueName={teamData.nameLeague}
        />
      )}
    </>
  );
};

export default Standings;
