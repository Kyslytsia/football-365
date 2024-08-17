import clsx from "clsx";

export const getStyles = (isAndroid?: boolean) => ({
  title: clsx("text-white", {
    "text-[10px]": isAndroid,
  }),
  whiteText: clsx("text-white text-[18px]", {
    "text-[12px]": isAndroid,
  }),
  grayText: clsx("text-Grey", {
    "text-[10px]": isAndroid,
  }),
});
