import { KnockoutTable } from "@/components";
import { KnockoutProps } from "../types";

export const UEROKnockout = ({
  final,
  roundOf16,
  semiFinals,
  quarterFinals,
}: KnockoutProps) => {
  return (
    <KnockoutTable
      isNational
      roundOf16_1={[roundOf16[4]]}
      roundOf16_2={[roundOf16[5]]}
      roundOf16_3={[roundOf16[6]]}
      roundOf16_4={[roundOf16[7]]}
      roundOf16_5={[roundOf16[0]]}
      roundOf16_6={[roundOf16[1]]}
      roundOf16_7={[roundOf16[2]]}
      roundOf16_8={[roundOf16[3]]}
      quarterFinals_1={[quarterFinals[2]]}
      quarterFinals_2={[quarterFinals[3]]}
      quarterFinals_3={[quarterFinals[0]]}
      quarterFinals_4={[quarterFinals[1]]}
      semiFinals_1={[semiFinals[1]]}
      semiFinals_2={[semiFinals[0]]}
      final={final}
    />
  );
};
