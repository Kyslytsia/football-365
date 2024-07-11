import clsx from "clsx";
import { SharedValue, useAnimatedStyle } from "react-native-reanimated";

interface StylesProps {
  heightScroll: SharedValue<number>;
  heightWrapper: SharedValue<number>;
}

export const getStyles = ({ heightWrapper, heightScroll }: StylesProps) => ({
  wrapper: clsx("absolute top-2 w-full", {}),
  scroll: clsx("w-[360px] rounded-[10px] border border-Black bg-round-bg"),
  animatedWrapper: useAnimatedStyle(() => {
    return {
      height: heightWrapper.value,
    };
  }),
  animatedScroll: useAnimatedStyle(() => {
    return {
      maxHeight: heightScroll.value,
    };
  }),
});
