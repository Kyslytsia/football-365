import clsx from "clsx";

export const getStyles = (isAndroid?: boolean) => ({
  title: clsx("text-white", {
    "text-[10px]": isAndroid,
  }),
  text: clsx("w-1/3", {
    "text-[10px]": isAndroid,
  }),
  teamName: clsx("text-white", {
    "text-[10px]": isAndroid,
  }),
});
