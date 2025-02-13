import React, { useEffect, useState } from "react";
import { Text, ScrollView } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getSquad } from "@/api/getSquad";
import { Loading, PlayerSquad, Wrapper } from "@/components";
import { Player, Squad as SquadProps } from "@/types/squad";

const Squad = () => {
  const { id, name } = useGlobalSearchParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [squad, setSquad] = useState<SquadProps>();
  const [goalkeeper, setGoalkeeper] = useState<Player[]>();
  const [defender, setDefender] = useState<Player[]>();
  const [midfielder, setMidfielder] = useState<Player[]>();
  const [attacker, setAttacker] = useState<Player[]>();

  const coach = squad?.coach.find((coach) =>
    coach.career.some((career) => career.end === null)
  );

  const text = "text-white";

  useEffect(() => {
    (async () => {
      setLoading(true);
      const storageTeamPlatersStats = await AsyncStorage.getItem(
        `${name} squad`
      );

      try {
        if (storageTeamPlatersStats) {
          setSquad(JSON.parse(storageTeamPlatersStats));
        }

        if (!storageTeamPlatersStats) {
          const response = await getSquad(id as string);

          await AsyncStorage.setItem(`${name} squad`, JSON.stringify(response));

          setSquad(response);
        }
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const goalkeeper: Player[] = [];
    const defender: Player[] = [];
    const midfielder: Player[] = [];
    const attacker: Player[] = [];

    squad?.players.forEach((player) => {
      if (player.position === "Goalkeeper") {
        goalkeeper.push(player);
      }

      if (player.position === "Defender") {
        defender.push(player);
      }

      if (player.position === "Midfielder") {
        midfielder.push(player);
      }

      if (player.position === "Attacker") {
        attacker.push(player);
      }
    });

    setGoalkeeper(goalkeeper);
    setDefender(defender);
    setMidfielder(midfielder);
    setAttacker(attacker);
  }, [squad]);

  if (loading) return <Loading />;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Wrapper wrapperClass="mb-4" title={<Text className={text}>coach</Text>}>
        <PlayerSquad
          coach
          position="Coach"
          id={coach?.id as number}
          name={coach?.name as string}
          photo={coach?.photo as string}
        />
      </Wrapper>

      {goalkeeper && (
        <Wrapper
          wrapperClass="mb-4"
          title={<Text className={text}>goalkeepers</Text>}
        >
          {goalkeeper?.map((player) => (
            <PlayerSquad
              id={player.id}
              key={player.id}
              name={player.name}
              number={player.number}
              photo={player.photo}
              position={player.position}
            />
          ))}
        </Wrapper>
      )}

      <Wrapper
        wrapperClass="mb-4"
        title={<Text className={text}>defenders</Text>}
      >
        {defender?.map((player) => (
          <PlayerSquad
            id={player.id}
            key={player.id}
            name={player.name}
            number={player.number}
            photo={player.photo}
            position={player.position}
          />
        ))}
      </Wrapper>

      <Wrapper
        wrapperClass="mb-4"
        title={<Text className={text}>midfielders</Text>}
      >
        {midfielder?.map((player) => (
          <PlayerSquad
            id={player.id}
            key={player.id}
            name={player.name}
            number={player.number}
            photo={player.photo}
            position={player.position}
          />
        ))}
      </Wrapper>

      <Wrapper
        wrapperClass="mb-4"
        title={<Text className={text}>attackers</Text>}
      >
        {attacker?.map((player) => (
          <PlayerSquad
            id={player.id}
            key={player.id}
            name={player.name}
            number={player.number}
            photo={player.photo}
            position={player.position}
          />
        ))}
      </Wrapper>
    </ScrollView>
  );
};

export default Squad;
