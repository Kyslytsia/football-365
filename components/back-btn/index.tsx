import React from "react";
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";

import { BackArrow } from "@/assets/icon";

export const BackBtn = () => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPressIn={() => navigation.goBack()}
      className="absolute left-1 top-5 flex justify-center items-center w-[40px] h-[40px] rounded-full z-50"
    >
      <BackArrow />
    </TouchableOpacity>
  );
};
