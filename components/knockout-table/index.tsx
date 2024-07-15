import React, { memo } from "react";
import { ScrollView, View } from "react-native";

import { KnockoutTableProps } from "./types";
import { KnockoutMatch } from "../knockout-match";
import { KnockoutMatches } from "../knockout-matches";
import {
  quarterFinalsLines,
  roundOf16Lines,
  semiFinalsAndFinalLines,
} from "./lineClasses";

const renderLines = (lines: Array<{ className: string; style: any }>) =>
  lines.map((line, index) => (
    <View key={index} style={line.style} className={line.className} />
  ));

export const KnockoutTable = memo(
  ({ isNational, ...props }: KnockoutTableProps) => {
    return (
      <ScrollView>
        <View className="relative gap-y-11 py-5 mx-auto w-[360px]">
          {renderLines(roundOf16Lines)}
          {renderLines(quarterFinalsLines)}
          {renderLines(semiFinalsAndFinalLines)}

          <View className="flex-row items-center justify-between mx-auto w-[320px]">
            {isNational ? (
              <>
                <KnockoutMatch match={props.roundOf16_1} />
                <KnockoutMatch match={props.roundOf16_2} />
                <KnockoutMatch match={props.roundOf16_3} />
                <KnockoutMatch match={props.roundOf16_4} />
              </>
            ) : (
              <>
                <KnockoutMatches matches={props.roundOf16_1} />
                <KnockoutMatches matches={props.roundOf16_2} />
                <KnockoutMatches matches={props.roundOf16_3} />
                <KnockoutMatches matches={props.roundOf16_4} />
              </>
            )}
          </View>

          <View className="flex-row items-center justify-between mx-auto w-[233px]">
            {isNational ? (
              <>
                <KnockoutMatch match={props.quarterFinals_1} />
                <KnockoutMatch match={props.quarterFinals_2} />
              </>
            ) : (
              <>
                <KnockoutMatches matches={props.quarterFinals_1} />
                <KnockoutMatches matches={props.quarterFinals_2} />
              </>
            )}
          </View>

          <View className="flex-row mx-auto">
            {isNational ? (
              <KnockoutMatch match={props.semiFinals_1} />
            ) : (
              <KnockoutMatches matches={props.semiFinals_1} />
            )}
          </View>

          <View className="flex-row mx-auto">
            <KnockoutMatch isFinal match={props.final} />
          </View>

          <View className="flex-row mx-auto">
            {isNational ? (
              <KnockoutMatch match={props.semiFinals_2} />
            ) : (
              <KnockoutMatches matches={props.semiFinals_2} />
            )}
          </View>

          <View className="flex-row items-center justify-between mx-auto w-[233px]">
            {isNational ? (
              <>
                <KnockoutMatch match={props.quarterFinals_3} />
                <KnockoutMatch match={props.quarterFinals_4} />
              </>
            ) : (
              <>
                <KnockoutMatches matches={props.quarterFinals_3} />
                <KnockoutMatches matches={props.quarterFinals_4} />
              </>
            )}
          </View>

          <View className="flex-row items-center justify-between mx-auto w-[320px]">
            {isNational ? (
              <>
                <KnockoutMatch match={props.roundOf16_5} />
                <KnockoutMatch match={props.roundOf16_6} />
                <KnockoutMatch match={props.roundOf16_7} />
                <KnockoutMatch match={props.roundOf16_8} />
              </>
            ) : (
              <>
                <KnockoutMatches matches={props.roundOf16_5} />
                <KnockoutMatches matches={props.roundOf16_6} />
                <KnockoutMatches matches={props.roundOf16_7} />
                <KnockoutMatches matches={props.roundOf16_8} />
              </>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
);
