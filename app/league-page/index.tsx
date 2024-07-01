import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const LeaguePage = () => {
  const params = useLocalSearchParams();
  return (
    <View>
      <Text>League ID: {params.id}</Text>
      <Text>League Name: {params.name}</Text>
    </View>
  );
};

export default LeaguePage;
