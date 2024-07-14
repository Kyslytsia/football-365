import clsx from "clsx";

export const getStyles = (className: string) => ({
  wrapper: clsx("flex-row justify-center items-center gap-[20px]", {
    [`${className}`]: className,
  }),
  nav: "flex justify-center items-center p-[8px] w-[100px] rounded-[20px]",
  active: "border border-nav-active",
});
