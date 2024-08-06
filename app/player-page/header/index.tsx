import React from "react";
import { useLocalSearchParams } from "expo-router";

import { PlayerHeader } from "@/components";

export const Header = () => {
  const { pos, name, icon } = useLocalSearchParams();

  const getPosition = (pos: string) => {
    switch (pos) {
      case "D":
        return "Defender";
      case "M":
        return `Midfielder`;
      case "A":
        return "Attacker";
      default:
        return pos;
    }
  };

  return (
    <PlayerHeader
      icon={icon as string}
      name={name as string}
      pos={getPosition(pos as string)}
    />
  );
};
