import React, { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getRounds } from "@/api/rounds";
import { Table } from "@/components/table";
import { getCurrentSeason } from "@/hooks";
import { getStandings } from "@/api/standings";
import { StandingProps } from "@/types/standings";

import { Nav } from "./nav";
import { TableInfo } from "@/components/table-info";

const NationalTable = () => {
  const [standings, setStandings] = useState<StandingProps[]>([]);
  const [navValue, setNavValue] = useState<string>("overall");
  const [round, setRound] = useState<string[]>([""]);
  const [isChampion, setIsChampion] = useState<boolean>(false);
  const { id, name } = useGlobalSearchParams();

  const ID = Number(id);
  const year = getCurrentSeason(name as string);

  const calculateChampion = (
    standings: StandingProps[],
    totalRounds: number
  ) => {
    if (standings.length < 2) return false;

    const team1 = standings[0];
    const team2 = standings[1];

    const remainingRounds2Team = totalRounds - team2.all.played;

    const maxPointsTeam2 = team2.points + remainingRounds2Team * 3;

    return team1.points > maxPointsTeam2;
  };

  useEffect(() => {
    (async () => {
      try {
        const storageStandings = await AsyncStorage.getItem(
          `${name} standings`
        );
        const storageRounds = await AsyncStorage.getItem(`${name} Rounds`);

        if (
          storageStandings &&
          storageStandings !== "[]" &&
          storageRounds &&
          storageRounds !== "[]"
        ) {
          setStandings(JSON.parse(storageStandings));
          setRound(JSON.parse(storageRounds));
        } else {
          const [standings, rounds] = await Promise.all([
            getStandings(year, ID),
            getRounds(year, ID),
          ]);

          setStandings(standings);
          setRound(rounds);
          if (standings.length !== 0) {
            await AsyncStorage.setItem(
              `${name} standings`,
              JSON.stringify(standings)
            );
          }
        }
      } catch (error: any) {
        console.error(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    const totalRound = +round[round.length - 1].split(" ").slice(-1);
    const champion = calculateChampion(standings, totalRound);
    setIsChampion(champion);
  }, [round]);

  return (
    <>
      <Nav setValue={setNavValue} />

      <Table
        navValue={navValue}
        standings={standings}
        isChampion={isChampion}
        component={<TableInfo />}
      />
    </>
  );
};

export default NationalTable;
