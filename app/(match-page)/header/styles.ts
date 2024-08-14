import clsx from "clsx";

export const getStyles = (isAndroid?: boolean) => ({
  league: clsx("absolute top-8 w-full text-[10px] text-white text-center", {
    "text-[8px]": isAndroid,
  }),
  status: clsx(
    "absolute bottom-[-12px] whitespace-nowrap w-full text-center text-[10px] text-white",
    {
      "text-[8px]": isAndroid,
    }
  ),
  teamName: clsx("text-white text-[11px]", {
    "text-[9px]": isAndroid,
  }),
  score: clsx("text-[25px] font-[500] text-white", {
    "text-[20px]": isAndroid,
  }),
});
