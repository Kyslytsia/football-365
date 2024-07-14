import "react-native-reanimated";
import { useRouter, useGlobalSearchParams } from "expo-router";

import { NationalTable } from "./table-national";

const Table = () => {
  const { name } = useGlobalSearchParams();
  const route = useRouter();

  if (
    name === "Euro Championship" ||
    name === "UEFA Europa League" ||
    name === "UEFA Champions League" ||
    name === "World Cup"
  ) {
    route.replace("/table/(table-championship)");
  } else {
    return <NationalTable />;
  }
};

export default Table;
