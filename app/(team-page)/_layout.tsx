import { Stack } from "expo-router";

import { Nav } from "@/components";

import Header from "./header";

export default function Layout() {
  return (
    <>
      <Header />

      <Nav
        fourRoute="/squad"
        firstRoute="/matches"
        fourRouteText="squad"
        secondRoute="/standings"
        firstRouteText="matches"
        secondRouteText="standings"
        thirdRouteText="player stats"
        thirdRoute="/playerStatistics"
      />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="matches" />
        <Stack.Screen name="standings" />
        <Stack.Screen name="playerStatistics" />
        <Stack.Screen name="squad" />
      </Stack>
    </>
  );
}
