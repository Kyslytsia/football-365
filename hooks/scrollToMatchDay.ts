import { MutableRefObject } from "react";
import { ScrollView, View } from "react-native";
import { isAfter, isToday, parseISO } from "date-fns";

import { GroupedMatches } from "@/types/groupedMatches";

export const scrollToMatchDay = (
  matches: GroupedMatches[],
  matchRefs: MutableRefObject<number[]>,
  scrollViewRef: MutableRefObject<ScrollView | null>
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

  if (todayMatchIndex !== -1) {
    scrollViewRef.current?.scrollTo({
      y: matchRefs.current[todayMatchIndex],
      animated: true,
    });
  } else if (nextMatchIndex !== -1) {
    scrollViewRef.current?.scrollTo({
      y: matchRefs.current[nextMatchIndex],
      animated: true,
    });
  } else {
    const lastMatchIndex = matches.length - 1;
    scrollViewRef.current?.scrollTo({
      y: matchRefs.current[lastMatchIndex],
      animated: true,
    });
  }
};
