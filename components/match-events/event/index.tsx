import { Ball, Substitution } from "@/assets/icon";
import { Events } from "@/types/matchPage";
import { View, Text } from "react-native";

interface EventProps {
  event: Events;
  homeTeam?: string;
}

export const Event = ({ event, homeTeam }: EventProps) => {
  const name = event?.team.name;
  const isHomeName = homeTeam === name;
  const isGoal = event?.detail === "Normal Goal";
  const isMissedPenalty = event?.detail === "Missed Penalty";
  const isPenaltySeries =
    event.time.elapsed >= 120 && event.time.extra !== null;
  const isScoredPenalty = event?.detail === "Penalty";
  const substitution = event?.assist.name;
  const isSubstitution = event?.type === "subst";
  const isYellowCard = event?.detail === "Yellow Card";
  const isRedCard = event?.detail === "Red Card";

  const renderPlayerInfo = () => (
    <View className="flex flex-col items-center justify-center text-white text-xs leading-3">
      {isSubstitution ? (
        <>
          <Text style={{ color: "#1ee11e" }}>{substitution}</Text>
          <Text style={{ color: "#f66731" }}>{event?.player?.name}</Text>
        </>
      ) : (
        <Text className="text-white">{event?.player?.name}</Text>
      )}
    </View>
  );

  const renderEventIcon = () => (
    <View>
      {isGoal && <Ball width={10} height={10} />}
      {isMissedPenalty && !isPenaltySeries && (
        <Text className="flex items-center justify-center h-2.5 w-2.5 rounded-full bg-red-600 text-[8px] font-medium">
          M
        </Text>
      )}
      {isMissedPenalty && isPenaltySeries && (
        <Ball width={10} height={10} fill="red" />
      )}
      {isScoredPenalty && !isPenaltySeries && (
        <Text className="flex items-center justify-center h-2.5 w-2.5 rounded-full bg-yellow-400 text-[8px] font-medium">
          P
        </Text>
      )}
      {isScoredPenalty && isPenaltySeries && (
        <Ball width={10} height={10} fill="green" />
      )}
      {isSubstitution && <Substitution width={10} height={10} />}
      {isYellowCard && <View className="h-3 w-2.5 bg-yellow-400" />}
      {isRedCard && <View className="h-3 w-2.5 bg-red-600" />}
    </View>
  );

  const renderEventTime = () => (
    <View className="relative flex items-center justify-center ">
      <Text
        className={`flex items-center justify-center text-white bg-wrapper-bg text-xs w-[16px] text-center ${
          isHomeName ? "right-[0]" : "left-[0]"
        }`}
      >
        {event?.time?.elapsed}
      </Text>
    </View>
  );

  return (
    <View
      className={`flex flex-row items-center h-9 w-full ${
        isHomeName ? "justify-start" : "justify-end"
      }`}
    >
      <View
        className={`flex flex-row gap-x-3 items-center w-[200px] ${
          isHomeName ? "justify-end" : "justify-start"
        }`}
      >
        {isHomeName ? (
          <>
            {renderPlayerInfo()}
            {renderEventIcon()}
            {renderEventTime()}
          </>
        ) : (
          <>
            {renderEventTime()}
            {renderEventIcon()}
            {renderPlayerInfo()}
          </>
        )}
      </View>
    </View>
  );
};
