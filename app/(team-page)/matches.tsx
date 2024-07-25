import { View, Text } from "react-native";
import { useGlobalSearchParams } from "expo-router";

const Matches = () => {
  const { id, name } = useGlobalSearchParams();

  return (
    <View>
      <Text>
        {name} {id}
      </Text>
    </View>
  );
};

export default Matches;
