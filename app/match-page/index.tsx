import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useRoute } from "@react-navigation/native";

const MatchPage = () => {
  const params = useLocalSearchParams();
  const rout = useRoute();

  console.log(rout);

  return (
    <View>
      <Text style={{ color: "white" }}>{params.id}</Text>
      <Text style={{ color: "white" }}>{params.id}</Text>
    </View>
  );
};

export default MatchPage;
