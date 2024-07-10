import "react-native-reanimated";
import { Stack, useGlobalSearchParams } from "expo-router";

import { Nav } from "@/components/nav";

import Header from "./header";

export default function Layout() {
  const params = useGlobalSearchParams();

  return (
    <>
      <Header icon={params.icon as string} leagueName={params.name as string} />
      <Nav
        rightText="table"
        rightRout="table/index"
        leftText="matches"
        leftRout="league-matches/index"
      />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="league-matches/index" />
        <Stack.Screen name="table/index" />
      </Stack>
    </>
  );
}
