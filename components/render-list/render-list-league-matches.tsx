import React, { memo } from "react";
import { Text, View } from "react-native";

import { getFormattedDate, Platform } from "@/helpers";
import { GroupedMatches } from "@/types/groupedMatches";

import { Wrapper } from "../wrapper";
import { Matches } from "../matches";

export const RenderListLeagueMatches = memo(
  ({ item }: { item: GroupedMatches }) => {
    const isAndroid = Platform().android;

    return (
      <View className="m-auto w-[360px]">
        <Wrapper
          wrapperClass="mb-[20px]"
          title={
            <Text className={`${isAndroid && "text-[10px]"} text-white`}>
              {getFormattedDate(item.date)}
            </Text>
          }
        >
          <Matches matches={item.matches} />
        </Wrapper>
      </View>
    );
  }
);
