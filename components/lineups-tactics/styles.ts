import clsx from "clsx";

export const getStyles = (isAndroid?: boolean) => ({
  rating: clsx("text-white text-[10px] text-center", {
    "text-[6px]": isAndroid,
  }),
  number: clsx("text-[8px] text-center", {
    "text-[5px]": isAndroid,
  }),
});
