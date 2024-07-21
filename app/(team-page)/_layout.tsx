import { Stack } from "expo-router";
import Header from "./header";

export default function Layout() {
  return (
    <>
      <Header />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </>
  );
}
