import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

import { NavProps } from "./type";
import { getStyles } from "./styles";

export const Nav = ({
  disabled,
  fourRoute,
  firstRoute,
  thirdRoute,
  secondRoute,
  fourRouteText,
  firstRouteText,
  thirdRouteText,
  secondRouteText,
  underline = false,
  classNameWrapper = "",
}: NavProps) => {
  const [selectedTab, setSelectedTab] = useState(firstRouteText);
  const route = useRouter();

  const isFirstRoute = selectedTab === firstRouteText;
  const isSecondRoute = selectedTab === secondRouteText;
  const isThirdRoute = selectedTab === thirdRouteText;
  const isFourRoute = selectedTab === fourRouteText;

  const styles = getStyles(underline, classNameWrapper);

  const handleNavigate = (path: string, text: string) => {
    if (text !== selectedTab) {
      setSelectedTab(text);
      route.replace(path);
    }
  };

  return (
    <View className={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flex: thirdRoute && fourRoute ? 0 : 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          padding: thirdRoute && fourRoute ? 10 : 0,
        }}
      >
        <TouchableOpacity
          className={`${styles.nav} ${isFirstRoute ? styles.active : ""}`}
          onPress={() => handleNavigate(firstRoute, firstRouteText)}
        >
          <Text className="text-white">{firstRouteText}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={disabled}
          className={`${styles.nav} ${isSecondRoute ? styles.active : ""}`}
          onPress={() => handleNavigate(secondRoute, secondRouteText)}
        >
          <Text className={`text-white ${disabled && "text-gray-500"}`}>
            {secondRouteText}
          </Text>
        </TouchableOpacity>

        {thirdRoute && thirdRouteText && (
          <TouchableOpacity
            className={`${styles.nav} ${isThirdRoute ? styles.active : ""}`}
            onPress={() => handleNavigate(thirdRoute, thirdRouteText)}
          >
            <Text className="text-white">{thirdRouteText}</Text>
          </TouchableOpacity>
        )}

        {fourRoute && fourRouteText && (
          <TouchableOpacity
            className={`${styles.nav} ${isFourRoute ? styles.active : ""}`}
            onPress={() => handleNavigate(fourRoute, fourRouteText)}
          >
            <Text className="text-white">{fourRouteText}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};
