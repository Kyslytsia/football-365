import React, { memo } from "react";
import { Text, View } from "react-native";

import { getFormattedDate } from "@/hooks";
import { Matches, Wrapper } from "@/components";
import { GroupedMatches } from "@/types/groupedMatches";

const RenderList = ({ item }: { item: GroupedMatches }) => {
  return (
    <View className="m-auto w-[360px]">
      <Wrapper
        margin="mb-[20px]"
        title={
          <Text className="text-white">{getFormattedDate(item.date)}</Text>
        }
      >
        <Matches matches={item.matches} />
      </Wrapper>
    </View>
  );
};

export default memo(RenderList);
