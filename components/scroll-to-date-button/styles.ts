import clsx from "clsx";

export const getStyles = (className?: string) => ({
  wrapper: clsx("absolute py-3 h-[50px] w-full", {
    [`${className}`]: !!className,
  }),
});
