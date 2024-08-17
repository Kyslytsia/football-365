import clsx from "clsx";
import { SharedValue, useAnimatedStyle } from "react-native-reanimated";

interface StylesProps {
  isAndroid?: boolean;
  heightScroll: SharedValue<number>;
}

export const getStyles = ({ isAndroid, heightScroll }: StylesProps) => ({
  wrapper: clsx("relative mb-4 mx-auto w-[360px] z-50", {
    "w-[340px]": isAndroid,
  }),
  inputText: clsx(
    "p-[10px] rounded-[10px] bg-round-bg border border-Black text-white overflow-hidden",
    {
      "p-[5px_10px] text-[10px]": isAndroid,
    }
  ),
  round: clsx("flex justify-center items-center p-3 text-white text-center", {
    "text-[9px]": isAndroid,
  }),
  scroll: clsx("w-[360px] rounded-[10px] border border-Black bg-round-bg", {
    "w-[340px]": isAndroid,
  }),

  animatedScroll: useAnimatedStyle(() => {
    return {
      maxHeight: heightScroll.value,
    };
  }),
});
