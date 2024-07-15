import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const MatchPage = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text style={{ color: "white" }}>{id}</Text>
      <Text style={{ color: "white" }}>{id}</Text>
    </View>
  );
};

export default MatchPage;
