import clsx from "clsx";

export const getStyles = (className?: string, isAndroid?: boolean) => ({
  wrapper: clsx("absolute py-3 h-[50px] w-full", {
    [`${className}`]: !!className,
  }),
  text: clsx("text-white", {
    "text-[10px]": isAndroid,
  }),
});
