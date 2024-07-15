/* eslint-disable react-hooks/exhaustive-deps */
import { KnockoutTable } from "@/components";

import { getMatches } from "../helpers";
import { UCLKnockoutProps } from "./types";

export const UCLKnockout = ({
  final,
  roundOf16,
  semiFinals,
  quarterFinals,
}: UCLKnockoutProps) => {
  const matches = getMatches(roundOf16, quarterFinals);

  return (
    <KnockoutTable
      roundOf16_1={matches(quarterFinals[4], 0, 2)}
      roundOf16_2={matches(quarterFinals[5], 2, 4)}
      roundOf16_3={matches(quarterFinals[6], 4, 6)}
      roundOf16_4={matches(quarterFinals[7], 6, 8)}
      roundOf16_5={matches(quarterFinals[0], 8, 10)}
      roundOf16_6={matches(quarterFinals[1], 10, 12)}
      roundOf16_7={matches(quarterFinals[2], 12, 14)}
      roundOf16_8={matches(quarterFinals[3], 14, 16)}
      quarterFinals_1={quarterFinals.slice(4, 6)}
      quarterFinals_2={quarterFinals.slice(6, 8)}
      quarterFinals_3={quarterFinals.slice(0, 2)}
      quarterFinals_4={quarterFinals.slice(2, 4)}
      semiFinals_1={semiFinals.slice(0, 2)}
      semiFinals_2={semiFinals.slice(2, 4)}
      final={final}
    />
  );
};
