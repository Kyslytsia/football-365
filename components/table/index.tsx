import React, { memo } from "react";
import { ScrollView, View } from "react-native";

import { TableProps } from "./types";
import { RankLogoTable } from "./rank-logo-table";
import { TeamNameTable } from "./team-name-table";
import { StatisticsTable } from "./statistics-table";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Platform } from "@/hooks";

export const Table = memo(
  ({
    navValue,
    component,
    standings,
    isChampion,
    championship,
  }: TableProps) => {
    const isAndroid = Platform().android;

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <GestureHandlerRootView>
          <View
            className={`${
              isAndroid ? "w-[340px]" : "w-[360px]"
            } flex-row relative mx-auto bg-wrapper-bg rounded-[12px] overflow-hidden`}
          >
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
        </GestureHandlerRootView>

        {component}
      </ScrollView>
    );
  }
);
