import React from "react";
import { View, ActivityIndicator } from "react-native";

export const Loading = () => {
  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};
