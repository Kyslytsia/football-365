import clsx from "clsx";

export const getStyles = (isAndroid?: boolean) => ({
  statWrapper: "flex justify-center items-center w-8",
  statText: clsx("text-white text-sx text-center", {
    "text-[8px]": isAndroid,
  }),
  formWrapper:
    "flex justify-center items-center w-[18px] h-[18px] rounded-full",
  formText: clsx("text-[12px] text-white text-center", {
    "text-[8px]": isAndroid,
  }),
});
