import React from "react";
import { useLocalSearchParams } from "expo-router";

import { PlayerHeader } from "../player-header-page";

export const HeaderCoachPage = () => {
  const { pos, name, icon } = useLocalSearchParams();

  return (
    <PlayerHeader
      pos={pos as string}
      icon={icon as string}
      name={name as string}
    />
  );
};
