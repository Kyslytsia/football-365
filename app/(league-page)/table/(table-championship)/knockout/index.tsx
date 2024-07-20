import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Loading } from "@/components";
import { MatchProps } from "@/types/match";
import {
  getFinalMatch,
  getRoundOf16Matches,
  getSemiFinalsMatches,
  getQuarterFinalsMatches,
} from "@/api/matchesRounds";

import { UCLKnockout } from "./UCL-knockout";
import { UELKnockout } from "./UEL-knockout";
import { UEROKnockout } from "./EURO-knockout";

const Knockout = () => {
  const [roundOf16, setRoundOf16] = useState<MatchProps[]>([]);
  const [quarterFinals, setQuarterFinals] = useState<MatchProps[]>([]);
  const [semiFinals, setSemiFinals] = useState<MatchProps[]>([]);
  const [final, setFinal] = useState<MatchProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { id, name } = useGlobalSearchParams();

  const ID = Number(id);

  useEffect(() => {
    (async () => {
      try {
        const roundNames = [
          "Round of 16",
          "Quarter Finals",
          "Semi Finals",
          "Final",
        ];

        const storageData = await Promise.all(
          roundNames.map((round) => AsyncStorage.getItem(`${name} ${round}`))
        );

        const [
          storageRoundOf16,
          storageQuarterFinals,
          storageSemiFinals,
          storageFinal,
        ] = storageData;

        if (!storageQuarterFinals || storageQuarterFinals === "[]") {
          const rounds = await Promise.allSettled([
            getRoundOf16Matches(ID, name as string),
            getQuarterFinalsMatches(ID, name as string),
            getSemiFinalsMatches(ID, name as string),
            getFinalMatch(ID, name as string),
          ]);

          rounds.forEach(async (el, index) => {
            if (el.status === "fulfilled") {
              if (index === 0) setRoundOf16(el.value);
              if (index === 1) setQuarterFinals(el.value);
              if (index === 2) setSemiFinals(el.value);
              if (index === 3) setFinal(el.value);

              await AsyncStorage.setItem(
                `${name} ${roundNames[index]}`,
                JSON.stringify(el.value)
              );
            }
          });
        } else {
          if (storageRoundOf16 && storageRoundOf16 !== "[]") {
            setRoundOf16(JSON.parse(storageRoundOf16));
          }

          if (storageQuarterFinals && storageQuarterFinals !== "[]") {
            setQuarterFinals(JSON.parse(storageQuarterFinals));
          }

          if (storageSemiFinals && storageSemiFinals !== "[]") {
            setSemiFinals(JSON.parse(storageSemiFinals));
          }

          if (storageFinal && storageFinal !== "[]") {
            setFinal(JSON.parse(storageFinal));
          }
        }
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {name === "UEFA Champions League" && (
            <UCLKnockout
              final={final}
              roundOf16={roundOf16}
              semiFinals={semiFinals}
              quarterFinals={quarterFinals}
            />
          )}

          {name === "UEFA Europa League" && (
            <UELKnockout
              final={final}
              roundOf16={roundOf16}
              semiFinals={semiFinals}
              quarterFinals={quarterFinals}
            />
          )}

          {name === "Euro Championship" && (
            <UEROKnockout
              final={final}
              roundOf16={roundOf16}
              semiFinals={semiFinals}
              quarterFinals={quarterFinals}
            />
          )}
        </ScrollView>
      )}
    </>
  );
};

export default Knockout;
