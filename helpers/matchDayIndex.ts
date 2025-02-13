import { isAfter, isToday, parseISO } from "date-fns";

import { GroupedMatches } from "@/types/groupedMatches";

export const matchDayIndex = (
  matches: GroupedMatches[],
  setIndex: (num: number) => void
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
    setIndex(todayMatchIndex);
  } else if (nextMatchIndex !== -1) {
    setIndex(nextMatchIndex);
  } else {
    const lastMatchIndex = matches.length - 1;
    setIndex(lastMatchIndex);
  }
};
