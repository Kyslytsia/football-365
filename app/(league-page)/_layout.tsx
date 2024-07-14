import "react-native-reanimated";
import { Stack, useGlobalSearchParams } from "expo-router";

import { Nav } from "@/components/nav";

import Header from "./header";

export default function Layout() {
  const { name, icon } = useGlobalSearchParams();

  return (
    <>
      <Header icon={icon as string} leagueName={name as string} />

      <Nav
        rightText="table"
        leftText="matches"
        rightRoute="/table"
        classNameWrapper="p-2"
        leftRoute="/league-matches"
      />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="league-matches/index" />
        <Stack.Screen name="table/index" />
      </Stack>
    </>
  );
}
