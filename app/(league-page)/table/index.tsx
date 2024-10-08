import { useEffect } from "react";
import { useRouter, useGlobalSearchParams } from "expo-router";

import NationalTable from "./table-national";

const Table = () => {
  const { name } = useGlobalSearchParams();
  const route = useRouter();

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
