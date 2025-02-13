import { Stack } from "expo-router";
import { HeaderCoachPage } from "@/components";

export default function Layout() {
  return (
    <>
      <HeaderCoachPage />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
}
