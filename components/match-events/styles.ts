import clsx from "clsx";

export const getStyles = (isAndroid?: boolean) => ({
  navWrapper: "w-1/2 border-b",
  navText: clsx("flex items-center p-2 text-white text-center", {
    "text-[10px]": isAndroid,
  }),
  navActive: "border-nav-active",
  navNotActive: "border-wrapper-borderBottom",
  eventText: clsx("text-Grey text-center bg-wrapper-bg", {
    "text-[10px]": isAndroid,
  }),
});
