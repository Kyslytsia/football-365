import "react-native-reanimated";
import { Stack, useGlobalSearchParams } from "expo-router";

import { HeaderLeaguePage, Nav } from "@/components";

export default function Layout() {
  const { name, icon } = useGlobalSearchParams();

  return (
    <>
      <HeaderLeaguePage icon={icon as string} leagueName={name as string} />

      <Nav
        secondRoute="/table"
        classNameWrapper="p-4"
        secondRouteText="table"
        firstRouteText="matches"
        firstRoute="/league-matches"
      />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="league-matches" />
        <Stack.Screen name="table" />
      </Stack>
    </>
  );
}
