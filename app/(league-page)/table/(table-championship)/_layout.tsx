import "react-native-reanimated";
import { Stack } from "expo-router";

import { View } from "react-native";
import { Nav } from "@/components/nav";

import { mainTheme } from "@/constants/Colors";

export default function Layout() {
  return (
    <View style={{ flex: 1, backgroundColor: mainTheme }}>
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
        <Stack.Screen name="knockout" />
      </Stack>
    </View>
  );
}
