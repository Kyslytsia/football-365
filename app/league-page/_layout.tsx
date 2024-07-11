import "react-native-reanimated";
import { Stack, useGlobalSearchParams } from "expo-router";

import { Nav } from "@/components/nav";

import Header from "./header";

export default function Layout() {
  const { icon, name } = useGlobalSearchParams();

  return (
    <>
      <Header icon={icon as string} leagueName={name as string} />
      <Nav
        rightText="table"
        leftText="matches"
        rightRout="table/index"
        leftRout="league-matches/index"
      />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="league-matches/index" />
        <Stack.Screen name="table/index" />
      </Stack>
    </>
  );
}
