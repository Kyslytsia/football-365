import "react-native-reanimated";
import { Stack, useGlobalSearchParams } from "expo-router";

import Header from "./header";

export default function Layout() {
  const params = useGlobalSearchParams();
  return (
    <>
      <Header icon={params.icon as string} leagueName={params.name as string} />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="table" />
      </Stack>
    </>
  );
}
