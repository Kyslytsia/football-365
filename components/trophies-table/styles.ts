import clsx from "clsx";

export const getStyles = (isAndroid?: boolean) => ({
  title: clsx("text-white", {
    "text-[10px]": isAndroid,
  }),
  whiteText: clsx("text-white", {
    "text-[10px]": isAndroid,
  }),
  greyText: clsx("text-Grey text-[12px]", {
    "text-[10px]": isAndroid,
  }),
});
