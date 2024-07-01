import clsx from "clsx";

export const getStyles = (status?: string) => ({
  wrapper:
    "relative flex-row justify-center gap-2 p-[12px] w-full border-t-black",
  status: "absolute flex items-center justify-center pl-[6px]",
  statusText: clsx("text-center text-[7px] text-red text-white", {
    "text-greyText": status === "FT" || status === "NS" || status === "PEN",
  }),
  homeTeamWrapper: "flex-row items-center justify-end pr-[10px] w-[35%]",
  awayTeamWrapper: "flex-row items-center justify-start pl-[10px] w-[35%]",
  logoWrapper: "relative w-6 h-[20px]",
  logo: "h-[20px] w-[20px]",
  scoreWrapper:
    "flex-row items-center justify-center w-[15%] font-500 text-white",
  score: "flex-row items-center",
  penScore: "flex-row items-center justify-center text-[8px] text-white",
});
