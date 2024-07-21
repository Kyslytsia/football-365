import "react-native-reanimated";
import { Stack } from "expo-router";

import { Nav } from "@/components/nav";

export default function Layout() {
  return (
    <>
      <Nav
        underline
        firstRouteText="group"
        classNameWrapper="pb-4"
        firstRoute="/table/group"
        secondRouteText="knockout"
        secondRoute="/table/knockout"
      />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="group" />
        <Stack.Screen name="knockout/index" />
      </Stack>
    </>
  );
}
