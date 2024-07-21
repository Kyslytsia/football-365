import React from "react";
import { View, Text } from "react-native";

import { Image } from "expo-image";
import { useGlobalSearchParams } from "expo-router";

const index = () => {
  const { id, name, icon } = useGlobalSearchParams();

  return (
    <View>
      <Text>srgdtfhg</Text>
      <Text>srgdtfhg</Text>
      <Text>srgdtfhg</Text>
      <Text>srgdtfhg</Text>
      <Text>{id}</Text>
      <Text>{name}</Text>
    </View>
  );
};

export default index;
