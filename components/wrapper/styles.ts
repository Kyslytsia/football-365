import clsx from "clsx";

import { StylesProps } from "./types";

export const getStyles = ({ margin, padding }: StylesProps) => ({
  wrapper: clsx(
    "mx-auto w-[360px] rounded-[12px] bg-wrapper-bg overflow-hidden",
    {
      [`${margin}`]: margin,
    }
  ),
  title:
    "p-[5px_10px] rounded-[12px_12px_0_0] bg-wrapper-bgTitle text-3 text-white ",
  children: clsx({
    [`${padding}`]: padding,
  }),
});
