import clsx from "clsx";

export const getStyles = (isAndroid?: boolean) => ({
  number: clsx("w-5 text-white text-center", {
    "text-[8px]": isAndroid,
  }),
  name: clsx("text-[14px]", {
    "text-[8px]": isAndroid,
  }),
  photo: clsx("w-10 h-10 rounded-full", {
    "w-9 h-9": isAndroid,
  }),
  playerGoal: clsx("text-white text-[8px] text-center", {
    "text-[4px]": isAndroid,
  }),
});
