import clsx from "clsx";

export const getStyles = (isAndroid?: boolean) => ({
  name: clsx("text-white", {
    "text-[10px]": isAndroid,
  }),
  position: clsx("text-Grey text-[10px]", {
    "text-[6px]": isAndroid,
  }),
  statWrapper: clsx(
    "flex-row items-center justify-center w-5 h-5 bg-white rounded-full",
    {
      "w-4 h-4": isAndroid,
    }
  ),
  stat: clsx("text-black text-center text-[10px]", {
    "text-[7px]": isAndroid,
  }),
});
