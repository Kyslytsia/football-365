import { Text, View } from "react-native";
import { Path, Svg } from "react-native-svg";

import { Platform } from "@/hooks";

import { CircularProgressProps } from "./typex";

export const BallPossession = ({
  label,
  colorHome,
  colorAway,
  valueHome,
  valueAway,
  percentageHome,
  percentageAway,
}: CircularProgressProps) => {
  const radius = 60;
  const center = radius;
  const isAndroid = Platform().android;
  const text = `${
    isAndroid ? "text-[12px]" : "text-[14px]"
  } text-center font-bold text-white`;

  const calculateArc = (percentage: number, radius: number) => {
    const angle = (percentage / 100) * 360;
    const radians = (angle * Math.PI) / 180;
    const largeArcFlag = angle <= 180 ? "0" : "1";
    const x = radius + radius * Math.sin(radians);
    const y = radius - radius * Math.cos(radians);
    return `M${radius},${radius} L${radius},0 A${radius},${radius} 0 ${largeArcFlag},1 ${x},${y} Z`;
  };

  return (
    <View className="flex-row items-center justify-between px-[20px]">
      <Text className={text}>{valueHome}</Text>

      <View className="relative w-[120px] h-[120px]">
        <Svg
          width={radius * 2}
          height={radius * 2}
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        >
          <Path d={calculateArc(percentageAway, radius)} fill={colorAway} />

          <Path
            d={calculateArc(percentageHome, radius)}
            fill={colorHome}
            transform={`rotate(${
              (percentageAway / 100) * 360
            }, ${center}, ${center})`}
          />
        </Svg>

        <View className="absolute top-[5px] left-[5px] flex-row items-center justify-center w-[110px] h-[110px] bg-[#26242e] rounded-full">
          <Text className={text}>{label}</Text>
        </View>
      </View>

      <Text className={text}>{valueAway}</Text>
    </View>
  );
};
