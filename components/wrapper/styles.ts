import clsx from "clsx";

import { StylesProps } from "./types";

export const getStyles = ({ wrapperClass, childrenClass }: StylesProps) => ({
  wrapper: clsx(
    "mx-auto w-[360px] rounded-[12px] bg-wrapper-bg overflow-hidden",
    {
      [`${wrapperClass}`]: wrapperClass,
    }
  ),
  title:
    "p-[5px_10px] rounded-[12px_12px_0_0] bg-wrapper-bgTitle text-3 text-white ",
  children: clsx({
    [`${childrenClass}`]: childrenClass,
  }),
});
