import clsx from "clsx";

import { StylesProps } from "./types";

export const getStyles = ({
  isAndroid,
  wrapperClass,
  childrenClass,
}: StylesProps) => ({
  wrapper: clsx(
    "mx-auto w-[360px] rounded-[12px] bg-wrapper-bg overflow-hidden",
    {
      [`${wrapperClass}`]: wrapperClass,
      "w-[340px]": isAndroid,
    }
  ),
  title: clsx(
    "p-[10px] rounded-[12px_12px_0_0] bg-wrapper-bgTitle text-3 text-white",
    {
      "p-[8px]": isAndroid,
    }
  ),
  children: clsx({
    [`${childrenClass}`]: childrenClass,
  }),
});
