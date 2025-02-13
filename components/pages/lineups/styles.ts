import clsx from "clsx";

export const getStyles = (isAndroid?: boolean) => ({
  btnWrapper: "flex items-center justify-center p-1 w-1/2 rounded-full",
  btnActive: "bg-nav-active",
  text: clsx("text-white", {
    "text-[10px]": isAndroid,
  }),
});
