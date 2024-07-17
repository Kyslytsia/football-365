import "react-native-reanimated";
import { Stack } from "expo-router";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(league-page)" />
        <Stack.Screen name="(match-page)" />
      </Stack>
    </ThemeProvider>
  );
}
