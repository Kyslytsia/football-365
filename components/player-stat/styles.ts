import clsx from "clsx";

export const getStyles = (isAndroid?: boolean) => ({
  title: clsx("text-white", {
    "text-[10px]": isAndroid,
  }),
  name: clsx("text-white", {
    "text-[10px]": isAndroid,
  }),
  nation: clsx("text-Grey text-[10px]", {
    "text-[8px]": isAndroid,
  }),
  playerGoal: clsx("text-white text-[8px] text-center", {
    "text-[4px]": isAndroid,
  }),
  stat: clsx("w-full text-center text-white", {
    "text-[10px]": isAndroid,
  }),
});
