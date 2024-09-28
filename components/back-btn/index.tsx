import React from "react";
import { useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";

import { BackArrow } from "@/assets/icon";

export const BackBtn = () => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      className="absolute left-2 top-5 flex justify-center items-center w-[30px] h-[30px] rounded-full"
    >
      <BackArrow />
    </TouchableOpacity>
  );
};
