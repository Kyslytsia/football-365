import { View, Text } from "react-native";
import { Wrapper } from "../wrapper";
import { PreviousMeetingsProps } from "./types";
import { Image } from "expo-image";

export const PreviousMeetings = ({
  homeId,
  awayId,
  matches,
  logoHome,
  logoAway,
}: PreviousMeetingsProps) => {
  const winsAndDraws = () => {
    let team1Wins = 0;
    let team2Wins = 0;
    let draws = 0;

    matches?.forEach((match) => {
      if (match.teams.away.id === homeId && match.teams.away.winner) {
        ++team1Wins;
      } else if (match.teams.home.id === homeId && match.teams.home.winner)
        ++team1Wins;

      if (match.teams.away.id === awayId && match.teams.away.winner) {
        ++team2Wins;
      } else if (match.teams.home.id === awayId && match.teams.home.winner)
        ++team2Wins;

      if (!match.teams.home.winner && !match.teams.away.winner) ++draws;
    });

    return { team1Wins, team2Wins, draws };
  };

  return (
    <Wrapper
      wrapperClass="mb-[20px]"
      title={<Text className="text-white">previous meetings</Text>}
    >
      <View className="flex flex-row items-center justify-between p-7">
        <Image source={logoHome} className="h-12 w-12" alt="1" />

        <View className="flex flex-row items-center justify-center gap-2.5">
          <View className="flex flex-col items-center justify-center text-white">
            <Text className="text-white">{winsAndDraws().team1Wins}</Text>
            <Text className="text-white">wins</Text>
          </View>

          <View className="flex flex-col items-center justify-center text-white">
            <Text className="text-white">{winsAndDraws().draws}</Text>
            <Text className="text-white">draw</Text>
          </View>

          <View className="flex flex-col items-center justify-center text-white">
            <Text className="text-white">{winsAndDraws().team2Wins}</Text>
            <Text className="text-white">wins</Text>
          </View>
        </View>

        <Image source={logoAway} className="h-12 w-12" alt="2" />
      </View>
    </Wrapper>
  );
};
