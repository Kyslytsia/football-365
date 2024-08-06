import { Wrapper } from "../wrapper";
import { LineupBenchProps } from "./types";
import { PlayerLineup } from "../player-lineup";

import { Text, View } from "react-native";

export const LineupBench = ({ team, match }: LineupBenchProps) => {
  const events = match?.[0]?.events ?? [];
  const startXI = match?.[0]?.players[team]?.players.slice(0, 11);
  const bench = match?.[0]?.players[team].players.slice(11);
  const coach = match?.[0]?.lineups[team].coach;

  const getRatingColor = (rating: number) => {
    if (rating > 8.0) return "bg-blue-600";
    if (rating > 7.0) return "bg-green-500";
    if (rating > 6.0) return "bg-yellow-400";
    if (rating <= 6.0) return "bg-orange-500";
    return "bg-gray-500";
  };

  return (
    <>
      <Wrapper
        wrapperClass="mb-[20px]"
        title={<Text className="text-white">coach</Text>}
      >
        {
          <PlayerLineup
            coach
            position="Coach"
            id={coach?.id as number}
            name={coach?.name ?? ""}
            playerPhoto={coach?.photo ?? ""}
          />
        }
      </Wrapper>

      <Wrapper
        wrapperClass="mb-[20px]"
        title={<Text className="text-white">bench</Text>}
      >
        {bench?.map((player, index) => {
          const playerSubs = events?.find(
            (event) => event.assist.id === player.player.id
          );

          const playerSubsNumber = startXI?.find(
            (pl) => pl.player.id === playerSubs?.player.id
          );

          const playerGoal = events?.filter(
            (event) =>
              event.player.id === player.player.id && event.type === "Goal"
          );

          const playerYellowCard = events?.find(
            (event) =>
              event.player.id === player.player.id &&
              event.detail === "Yellow Card"
          );

          const playerRedCard = events?.find(
            (event) =>
              event.player.id === player.player.id &&
              event.detail === "Red Card"
          );

          return (
            <PlayerLineup
              id={player.player.id}
              name={player.player.name}
              playerPhoto={player.player.photo}
              playerRedCard={playerRedCard && true}
              playerSubsName={playerSubs?.player.name}
              number={player.statistics[0].games.number}
              playerYellowCard={playerYellowCard && true}
              position={player.statistics[0].games.position}
              playerGoal={playerGoal?.length > 0 ? playerGoal?.length : ""}
              playerSubsNumber={playerSubsNumber?.statistics[0].games.number}
              key={player.player.id + player.player.photo + index}
              playerSubs={
                playerSubs && playerSubs?.type === "subst"
                  ? playerSubs.time.elapsed + "'"
                  : ""
              }
              stat={
                playerSubs && (
                  <View
                    className={`w-[30px] rounded-[20px] ${getRatingColor(
                      +player.statistics[0].games.rating
                    )}`}
                  >
                    <Text className="text-white text-center">
                      {player.statistics[0].games.rating ?? "-"}
                    </Text>
                  </View>
                )
              }
            />
          );
        })}
      </Wrapper>
    </>
  );
};
