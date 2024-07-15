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
              getRoundOf16Matches(ID, name as string),
              getQuarterFinalsMatches(ID, name as string),
              getSemiFinalsMatches(ID, name as string),
              getFinalMatch(ID, name as string),
            ]);

          [roundOf16, quarterFinals, semiFinals, final].forEach(async (el) => {
            if (el.status === "fulfilled") {
              setRoundOf16(el.value);
              await AsyncStorage.setItem(
                `${name} Round of 16`,
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
        <>
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
        </>
      )}
    </>
  );
};

export default Knockout;
