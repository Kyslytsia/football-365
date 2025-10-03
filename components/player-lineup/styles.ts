import clsx from "clsx";

export const getStyles = (isAndroid?: boolean) => ({
  number: clsx("w-5 text-white text-center h-[16px]", {
    "text-[8px]": isAndroid,
  }),
  name: clsx("text-[14px]", {
    "text-[8px]": isAndroid,
  }),
  playerGoal: clsx("text-white text-[8px] text-center", {
    "text-[4px]": isAndroid,
  }),
});
