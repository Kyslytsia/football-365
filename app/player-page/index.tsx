import React from "react";
import { View, Text } from "react-native";
import { useGlobalSearchParams } from "expo-router";

const PlayerPage = () => {
  const { id, name } = useGlobalSearchParams();

  return (
    <View>
      <Text className="text-white">{id}</Text>
      <Text className="text-white">{name}</Text>
      <Text>PlayerPage</Text>
    </View>
  );
};

export default PlayerPage;
