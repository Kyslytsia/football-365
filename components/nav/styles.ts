import clsx from "clsx";

export const getStyles = (underline: boolean, className: string) => ({
  wrapper: clsx("flex-row justify-center items-center gap-x-[20px]", {
    [`${className}`]: className,
  }),
  nav: clsx(
    "flex justify-center items-center p-[8px] w-[100px] rounded-[20px]",
    {
      "rounded-none": underline,
    }
  ),
  active: clsx("border border-nav-active", {
    "border-0 !border-b border-nav-active ": underline,
  }),
});
