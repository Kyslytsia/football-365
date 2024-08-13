import { memo } from "react";
import { getStyles } from "./styles";
import { WrapperProps } from "./types";

import { View } from "react-native";
import { Platform } from "@/hooks";

export const Wrapper = memo(
  ({ title, wrapperClass, children, childrenClass }: WrapperProps) => {
    const isAndroid = Platform().android;
    const styles = getStyles({ isAndroid, wrapperClass, childrenClass });

    return (
      <View className={styles.wrapper}>
        <View className={styles.title}>{title}</View>

        <View className={styles.children}>{children}</View>
      </View>
    );
  }
);
