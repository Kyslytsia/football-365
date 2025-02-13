import React, { memo } from "react";
import { View, Text } from "react-native";

import { getFormattedDate } from "@/helpers";
import { GroupedMatches } from "@/types/groupedMatches";

import { AllLeaguesMatches } from "../all-league-matches";

export const RenderListMainItems = memo(
  ({ item }: { item: GroupedMatches }) => (
    <View key={item.date + "date"} className="m-auto w-[360px]">
      <Text className="p-[50px_0_25px] text-Grey text-[18px] font-extralight text-center">
        - {getFormattedDate(item.date)} -
      </Text>

      <AllLeaguesMatches matches={item.matches} />
    </View>
  )
);
