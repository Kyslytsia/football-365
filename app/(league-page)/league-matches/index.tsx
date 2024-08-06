import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { useGlobalSearchParams } from "expo-router";
import { GroupedMatches } from "@/types/groupedMatches";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Loading, Rounds, ScrollToDateBtn } from "@/components";
import { getAllMatchesForSeasonByLeagueId } from "@/api/allMatchesLeague";
import {
  matchDayIndex,
  getCurrentSeason,
  getFormattedDate,
  groupedMatchesByRound,
  groupMatchesByDateAndLeague,
} from "@/hooks";

import { RenderList } from "./RenderList";

const LeagueMatches = ({ matchesData }: { matchesData?: GroupedMatches[] }) => {
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("all matches");
  const [matches, setMatches] = useState<GroupedMatches[]>([]);
  const [roundMatches, setRoundMatches] = useState<GroupedMatches[]>([]);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

  const { id, name } = useGlobalSearchParams();
  const ID = Number(id);
  const flashListRef = useRef<FlashList<GroupedMatches>>(null);
  const itemHeightsRef = useRef<{ [key: number]: number }>({});
  const year = getCurrentSeason(name as string);
  const isMatches = roundMatches.length !== 0 ? roundMatches : matches;
  const isMatchesData = matchesData ? matchesData : isMatches;

  const overrideItemLayout = useCallback(
    (layout: any, item: any, index: number) => {
      const height = itemHeightsRef.current[index];
      layout.size = height;
    },
    [itemHeightsRef]
  );

  const scrollToCurrentMatch = useCallback(() => {
    if (flashListRef.current && index) {
      flashListRef.current.scrollToIndex({
        index: index,
        animated: true,
      });
    }
  }, [index]);

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: any) => {
      const visibleIndexes = viewableItems.map((item: any) => item.index);
      const isIndexNotVisible = !visibleIndexes.includes(index);

      setShowScrollButton(isIndexNotVisible);
    },
    [index]
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      const storageLeagueMatches = await AsyncStorage.getItem(`${name}`);

      try {
        if (!matchesData) {
          if (
            storageLeagueMatches &&
            storageLeagueMatches !== "[]" &&
            value === "all matches"
          ) {
            const groupedMatches = groupMatchesByDateAndLeague(
              JSON.parse(storageLeagueMatches)
            );

            setRoundMatches([]);
            setMatches(groupedMatches);
          } else if (!storageLeagueMatches && value === "all matches") {
            const response = await getAllMatchesForSeasonByLeagueId(year, ID);
            await AsyncStorage.setItem(`${name}`, JSON.stringify(response));
            const groupedMatches = groupMatchesByDateAndLeague(response);

            setRoundMatches([]);
            setMatches(groupedMatches);
          } else {
            const roundMatches = groupedMatchesByRound(value, matches);
            setRoundMatches(roundMatches);
          }
        }
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 100);
      }
    })();
  }, [value]);

  useEffect(() => {
    matchDayIndex(isMatchesData, setIndex);

    isMatchesData.map((el, index) => {
      let matchesDate: number = 0;

      el.matches.map((el) => (matchesDate = matchesDate + el.matches.length));

      itemHeightsRef.current[index] = 20 + matchesDate * 50 + 27;
    });
  }, [isMatchesData]);

  if (loading) return <Loading />;

  return (
    <>
      {!matchesData && <Rounds value={value} setValue={setValue} />}

      <FlashList
        ref={flashListRef}
        data={isMatchesData}
        estimatedItemSize={500}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        overrideItemLayout={overrideItemLayout}
        onViewableItemsChanged={handleViewableItemsChanged}
        initialScrollIndex={value === "all matches" ? index : 0}
        keyExtractor={(group, index) => `${group.date}_${index}`}
        renderItem={({ item }: any) => <RenderList item={item} />}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />

      {showScrollButton && (
        <ScrollToDateBtn
          onPress={scrollToCurrentMatch}
          wrapperClass={matchesData ? "" : "top-14"}
          date={getFormattedDate(isMatchesData[index].date)}
        />
      )}
    </>
  );
};

export default LeagueMatches;
