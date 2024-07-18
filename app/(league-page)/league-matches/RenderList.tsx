import React, { memo } from "react";
import { Text, View } from "react-native";

import { getFormattedDate } from "@/hooks";
import { Matches, Wrapper } from "@/components";
import { GroupedMatches } from "@/types/groupedMatches";

export const RenderList = memo(({ item }: { item: GroupedMatches }) => {
  return (
    <View className="m-auto w-[360px]">
      <Wrapper
        wrapperClass="mb-[20px]"
        title={
          <Text className="text-white">{getFormattedDate(item.date)}</Text>
        }
      >
        <Matches matches={item.matches} />
      </Wrapper>
    </View>
  );
});
