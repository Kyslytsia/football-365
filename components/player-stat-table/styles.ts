import clsx from "clsx";

export const getStyles = (isAndroid?: boolean) => ({
  title: clsx("text-white", {
    "text-[10px]": isAndroid,
  }),
  wrapper: "flex items-center gap-y-2 w-1/3 text-white text-[18px] font-medium",
  whiteText: clsx("text-white text-[18px] font-medium", {
    "text-[12px]": isAndroid,
  }),
  greyText: clsx("text-Grey text-[14px]", {
    "text-[10px]": isAndroid,
  }),
});
