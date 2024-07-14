import "react-native-reanimated";
import { Stack, useGlobalSearchParams } from "expo-router";

import { Nav } from "@/components/nav";

export default function Layout() {
  const { name, icon } = useGlobalSearchParams();

  return (
    <>
      <Nav
        leftText="group"
        rightText="knockout"
        leftRoute="/table/group"
        rightRoute="/table/knockout"
      />

      <Stack initialRouteName="group" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="group" />
        <Stack.Screen name="knockout/index" />
      </Stack>
    </>
  );
}
