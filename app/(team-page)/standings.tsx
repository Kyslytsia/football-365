import React, { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { StandingProps } from "@/types/standings";
import { getLeagueForTeamOnId } from "@/api/getLeagueForTeamOnId";

import NationalTable from "../(league-page)/table/table-national";
import Groups from "../(league-page)/table/(table-championship)/group";

const Standings = () => {
  const { id, name } = useGlobalSearchParams();

  const [data, setData] = useState<number | StandingProps[][]>();

  useEffect(() => {
    (async () => {
      try {
        const storageLeagueId = await AsyncStorage.getItem(`${name} league`);

        // if (storageLeagueId) setData(JSON.parse(storageLeagueId));

        // if (!storageLeagueId) {
        const response = await getLeagueForTeamOnId(id as string);

        setData(response);

        await AsyncStorage.setItem(`${name} league`, JSON.stringify(response));
        // }
      } catch (error: any) {
        console.error(error.message);
      }
    })();
  }, []);

  return (
    <>
      {data && typeof data === "number" && <NationalTable leagueId={data} />}

      {data && Array.isArray(data) && <Groups standingsData={data} />}
    </>
  );
};

export default Standings;
