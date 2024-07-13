import "react-native-reanimated";
import { useGlobalSearchParams } from "expo-router";
import { View } from "react-native";
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
