import { KnockoutTable } from "@/components";

import { getMatches } from "../helpers";
import { KnockoutProps } from "../types";

export const UELKnockout = ({
  final,
  roundOf16,
  semiFinals,
  quarterFinals,
}: KnockoutProps) => {
  const matches = getMatches(roundOf16, quarterFinals);

  return (
    <KnockoutTable
      roundOf16_1={matches(quarterFinals[2], 14, 16)}
      roundOf16_2={matches(quarterFinals[3], 12, 14)}
      roundOf16_3={matches(quarterFinals[6], 10, 12)}
      roundOf16_4={matches(quarterFinals[7], 8, 10)}
      roundOf16_5={matches(quarterFinals[0], 6, 8)}
      roundOf16_6={matches(quarterFinals[1], 4, 6)}
      roundOf16_7={matches(quarterFinals[4], 2, 4)}
      roundOf16_8={matches(quarterFinals[5], 0, 2)}
      quarterFinals_1={quarterFinals.slice(2, 4)}
      quarterFinals_2={quarterFinals.slice(6, 8)}
      quarterFinals_3={quarterFinals.slice(0, 2)}
      quarterFinals_4={quarterFinals.slice(4, 6)}
      semiFinals_1={semiFinals.slice(0, 2)}
      semiFinals_2={semiFinals.slice(2, 4)}
      final={final}
    />
  );
};
