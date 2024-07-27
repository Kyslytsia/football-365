import React, { memo } from "react";
import { View, ScrollView } from "react-native";

import { TableProps } from "./types";
import { RankLogoTable } from "./rank-logo-table";
import { TeamNameTable } from "./team-name-table";
import { StatisticsTable } from "./statistics-table";

export const Table = memo(
  ({
    navValue,
    component,
    standings,
    isChampion,
    championship,
  }: TableProps) => {
    return (
      <ScrollView
        className="mx-auto w-[360px]"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row relative mx-auto w-[360px] bg-wrapper-bg rounded-[12px]">
          <RankLogoTable
            standings={standings}
            isChampion={isChampion}
            championship={championship}
          />

          <TeamNameTable
            standings={standings}
            isChampion={isChampion}
            championship={championship}
          />

          <StatisticsTable navValue={navValue} standings={standings} />
        </View>

        {component}
      </ScrollView>
    );
  }
);
