import { Text } from "react-native";

import { Match } from "@/types/matchPage";
import { getFormattedDate, MatchTime } from "@/hooks";
import { Calendar, Location, Whistle } from "@/assets/icon";

import { Wrapper } from "../wrapper";
import { Info } from "./info";
import { Image } from "expo-image";

export const MatchInfo = ({ match }: { match?: Match[] | [] }) => {
  const fixtures = match?.[0]?.fixture;
  const league = match?.[0]?.league;

  return (
    <Wrapper
      wrapperClass="mb-[20px]"
      title={<Text className="text-white">match info</Text>}
    >
      <Info
        info={getFormattedDate(fixtures?.date ?? "")}
        icon={<Calendar width="25px" height="25px" />}
        additionalInfo={MatchTime(fixtures?.date ?? "")}
      />

      <Info
        info={league?.round}
        additionalInfo={league?.name}
        icon={
          <Image
            alt={league?.name}
            contentFit="contain"
            source={league?.logo}
            className="w-[25px] h-[25px]"
          />
        }
      />

      <Info
        info={fixtures?.referee}
        icon={<Whistle width="25px" height="22px" />}
        additionalInfo={"referee"}
      />

      <Info
        info={fixtures?.venue.name}
        icon={<Location width="25px" height="22px" />}
        additionalInfo={fixtures?.venue.city}
      />
    </Wrapper>
  );
};
