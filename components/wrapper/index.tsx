import { getStyles } from "./styles";
import { WrapperProps } from "./types";

import { View } from "react-native";

export const Wrapper = ({ title, margin, children, padding }: WrapperProps) => {
  const styles = getStyles({ margin, padding });

  return (
    <View className={styles.wrapper}>
      <View className={styles.title}>{title}</View>

      <View className={styles.children}>{children}</View>
    </View>
  );
};
