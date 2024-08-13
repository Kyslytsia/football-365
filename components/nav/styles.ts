import clsx from "clsx";

export const getStyles = (
  isAndroid: boolean,
  underline: boolean,
  className: string
) => ({
  wrapper: clsx("flex-row justify-center items-center", {
    [`${className}`]: className,
  }),
  nav: clsx(
    "flex justify-center items-center p-[8px] w-[90px] rounded-[20px]",
    {
      "rounded-none": underline,
      "p-[5px] w-[85px]": isAndroid,
    }
  ),
  active: clsx("border border-nav-active", {
    "border-0 !border-b border-nav-active ": underline,
  }),
  text: clsx("text-[12px] text-white", {
    "text-[8px]": isAndroid,
  }),
});
