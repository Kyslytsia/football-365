import React, { memo } from "react";
import { View, Text } from "react-native";

import { getFormattedDate } from "@/hooks";
import { AllLeaguesMatches } from "@/components";
import { GroupedMatches } from "@/types/groupedMatches";

export const RenderList = memo(({ item }: { item: GroupedMatches }) => (
  <View key={item.date + "date"} className="m-auto w-[360px]">
    <Text className="p-[50px_0_25px] text-Grey text-[18px] font-extralight text-center">
      - {getFormattedDate(item.date)} -
    </Text>

    <AllLeaguesMatches matches={item.matches} />
  </View>
));
