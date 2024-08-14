import clsx from "clsx";

import { StylesProps } from "./types";

export const getStyles = ({ status, isAndroid }: StylesProps) => ({
  wrapper: clsx(
    "relative flex-row justify-center items-center h-[50px] p-[12px] w-[360px] border-t border-Black",
    {
      "p-[10px] h-[45px]": isAndroid,
    }
  ),
  status: clsx("absolute top-[4px] flex items-center justify-center", {
    "top-0 text-[6px]": isAndroid,
  }),
  statusText: clsx("text-center text-[7px] text-red text-white", {
    "text-Grey": status === "FT" || status === "NS" || status === "PEN",
  }),
  homeTeamWrapper: "flex flex-row items-center justify-end pr-[10px] w-[35%]",
  awayTeamWrapper: "flex flex-row items-center justify-start pl-[10px] w-[35%]",
  logoWrapper: "w-6 h-[20px]",
  logo: "h-[20px] w-[20px]",
  scoreWrapper:
    "flex-row items-center justify-center w-[15%] font-500 text-white",
  score: "flex-row items-center",
  scoreText: clsx("text-white", {
    "text-[10px]": isAndroid,
  }),
  penScore: clsx("flex-row items-center justify-center text-[8px] text-white", {
    "text-[6px]": isAndroid,
  }),
  text: clsx("h-fit text-[11px] text-white font-extraligh", {
    "p-1 text-[8px]": isAndroid,
  }),
});
