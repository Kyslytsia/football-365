import clsx from "clsx";

export const getStyles = (isAndroid?: boolean) => ({
  wrapper: "p-2 w-20 rounded-[20px]",
  text: clsx("text-center text-white", {
    "text-[8px]": isAndroid,
  }),
});
