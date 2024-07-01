import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const MatchPage = () => {
  const params = useLocalSearchParams();
  return (
    <View>
      <Text style={{ color: "white" }}>{params.id}</Text>
      <Text style={{ color: "white" }}>{params.id}</Text>
    </View>
  );
};

export default MatchPage;
