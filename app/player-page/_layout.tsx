import { Stack } from "expo-router";

import { HeaderPlayerPage } from "@/components";

export default function Layout() {
  return (
    <>
      <HeaderPlayerPage />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
}
