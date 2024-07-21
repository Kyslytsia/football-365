import { Stack } from "expo-router";
import Header from "./header";
import { Nav } from "@/components";

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
        thirdRouteText="player stat"
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
