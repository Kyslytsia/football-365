import { Platform as Platforms } from "react-native";

export const Platform = () => {
  return {
    ios: Platforms.OS === "ios",
    android: Platforms.OS === "android",
  };
};
