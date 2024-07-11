import "react-native-reanimated";
import { Stack, useGlobalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { NationalTable } from "./table-national";

export default function Layout() {
  const { name } = useGlobalSearchParams();

  return (
    <>
      <View>
        <NationalTable />
      </View>
    </>
  );
}
