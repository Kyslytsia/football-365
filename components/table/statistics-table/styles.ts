import clsx from "clsx";

export const getStyles = (isAndroid?: boolean) => ({
  statWrapper: clsx("flex justify-center items-center w-8", {
    "w-6": isAndroid,
  }),
  statText: clsx("text-white text-sx text-center", {
    "text-[8px]": isAndroid,
  }),
  formWrapper:
    "flex justify-center items-center w-[18px] h-[18px] rounded-full",
  formText: clsx("text-[12px] text-white text-center", {
    "text-[8px]": isAndroid,
  }),
});
