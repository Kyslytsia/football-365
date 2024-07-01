import { MutableRefObject } from "react";
import { FlatList } from "react-native";
import { isAfter, isToday, parseISO } from "date-fns";

import { GroupedMatches } from "@/types/groupedMatches";

export const scrollToMatchDay = (
  matches: GroupedMatches[],
  flatListRef: MutableRefObject<FlatList<GroupedMatches> | null>
) => {
  let todayMatchIndex = -1;
  let nextMatchIndex = -1;

  matches.forEach((group, index) => {
    if (isToday(parseISO(group.date))) {
      todayMatchIndex = index;
    } else if (
      nextMatchIndex === -1 &&
      isAfter(parseISO(group.date), new Date())
    ) {
      nextMatchIndex = index;
    }
  });

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  if (todayMatchIndex !== -1) {
    scrollToIndex(todayMatchIndex);
  } else if (nextMatchIndex !== -1) {
    scrollToIndex(nextMatchIndex);
  } else {
    const lastMatchIndex = matches.length - 1;
    scrollToIndex(lastMatchIndex);
  }
};
