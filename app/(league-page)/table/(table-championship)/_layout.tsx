import "react-native-reanimated";
import { Stack } from "expo-router";

import { Nav } from "@/components/nav";

export default function Layout() {
  return (
    <>
      <Nav
        leftText="group"
        rightText="knockout"
        leftRoute="/table/group"
        rightRoute="/table/knockout"
      />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="group" />
        <Stack.Screen name="knockout/index" />
      </Stack>
    </>
  );
}
