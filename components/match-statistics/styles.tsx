import clsx from "clsx";

export const getStyles = (isAndroid?: boolean) => ({
  statWrapper: "flex-row w-1/2 h-1 bg-gray-700 overflow-hidden",
  text: clsx("text-white text-center", {
    "text-[10px]": isAndroid,
  }),
});
