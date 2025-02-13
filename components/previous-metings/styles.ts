import clsx from "clsx";

export const getStyles = (isAndroid?: boolean) => ({
  statWrapper: "flex flex-col items-center justify-center text-white",
  text: clsx("text-white", {
    "text-[10px]": isAndroid,
  }),
});
