import { modifyDescription } from "@/hooks";
import { View, Text } from "react-native";
import { TeamNameTableProps } from "./types";

const TeamNameTable = ({
  standings,
  isChampion,
  championship,
}: TeamNameTableProps) => {
  return (
    <View className="ml-12">
      <View className="flex-row h-8">
        <Text className="text-xs text-white min-w-[50px] ml-[-5px] justify-center">
          {championship && standings[0].group}
        </Text>
      </View>

      {standings.map((team, index) => (
        <View
          key={index + "teamName"}
          className="flex-row pl-2 h-8 border-t border-[#1b1a22]"
        >
          <View className="flex-col items-start justify-center">
            <Text className="text-xs text-white leading-3">
              {team.team.name}
            </Text>

            {team.description !== null && (
              <Text
                className={`text-[8px] 
                  ${getStatusStyle(modifyDescription(team, isChampion))}`}
              >
                {modifyDescription(team, isChampion)}
              </Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Champions League":
    case "Won title":
      return "text-[#1ee119]";
    case "Europa League":
      return "text-[#637ff8]";
    case "Europa Conference League":
      return "text-[#d3c9f2]";
    case "Relegation":
      return "text-[#e92020]";
    default:
      return {};
  }
};

export default TeamNameTable;
