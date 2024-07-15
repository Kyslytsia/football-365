import "react-native-reanimated";
import { useRouter, useGlobalSearchParams } from "expo-router";

import NationalTable from "./table-national";
import { useEffect } from "react";

const Table = () => {
  const { name } = useGlobalSearchParams();
  const route = useRouter();

  console.log(name);

  useEffect(() => {
    if (
      name === "Euro Championship" ||
      name === "UEFA Europa League" ||
      name === "UEFA Champions League" ||
      name === "World Cup"
    ) {
      route.replace("/table/(table-championship)");
    }
  }, []);

  return <NationalTable />;
};

export default Table;
