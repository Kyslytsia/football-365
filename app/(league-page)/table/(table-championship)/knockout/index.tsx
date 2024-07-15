import React, { useEffect, useState } from "react";
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
        const storageRoundOf16 = await AsyncStorage.getItem(
          `${name} Round of 16`
        );
        const storageQuarterFinals = await AsyncStorage.getItem(
          `${name} Quarter Finals`
        );
        const storageSemiFinals = await AsyncStorage.getItem(
          `${name} Semi Finals`
        );
        const storageFinal = await AsyncStorage.getItem(`${name} Final`);

        if (!storageQuarterFinals || storageQuarterFinals === "[]") {
          const [roundOf16, quarterFinals, semiFinals, final] =
            await Promise.allSettled([
              getRoundOf16Matches(ID),
              getQuarterFinalsMatches(ID),
              getSemiFinalsMatches(ID),
              getFinalMatch(ID),
            ]);

          if (
            roundOf16.status === "fulfilled" &&
            Array.isArray(roundOf16.value) &&
            roundOf16.value.length > 0
          ) {
            setRoundOf16(roundOf16.value);
            await AsyncStorage.setItem(
              `${name} Round of 16`,
              JSON.stringify(roundOf16.value)
            );
          }

          if (
            quarterFinals.status === "fulfilled" &&
            Array.isArray(quarterFinals.value) &&
            quarterFinals.value.length > 0
          ) {
            setQuarterFinals(quarterFinals.value);
            await AsyncStorage.setItem(
              `${name} Quarter Finals`,
              JSON.stringify(quarterFinals.value)
            );
          }

          if (
            semiFinals.status === "fulfilled" &&
            Array.isArray(semiFinals.value) &&
            semiFinals.value.length > 0
          ) {
            setSemiFinals(semiFinals.value);
            await AsyncStorage.setItem(
              `${name} Semi Finals`,
              JSON.stringify(semiFinals.value)
            );
          }

          if (
            final.status === "fulfilled" &&
            Array.isArray(final.value) &&
            final.value.length > 0
          ) {
            setFinal(final.value);
            await AsyncStorage.setItem(
              `${name} Final`,
              JSON.stringify(final.value)
            );
          }
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

  console.log("round of 16", roundOf16);
  console.log("quarterFinals", quarterFinals);
  console.log("semiFinals", semiFinals);
  console.log("final", final);

  return (
    <>
      {loading && <Loading />}

      {name === "UEFA Champions League" && (
        <UCLKnockout
          final={final}
          roundOf16={roundOf16}
          semiFinals={semiFinals}
          quarterFinals={quarterFinals}
        />
      )}

      {/* {name === "UEFA Europa League" && (
        <UELKnockout
          final={final}
          roundOf16={roundOf16}
          semiFinals={semiFinals}
          quarterFinals={quarterFinals}
        />
      )} */}

      {/* {name === "Euro Championship" && (
        <UEROKnockout
          final={final}
          roundOf16={roundOf16}
          semiFinals={semiFinals}
          quarterFinals={quarterFinals}
        />
      )} */}
    </>
  );
};

export default Knockout;
