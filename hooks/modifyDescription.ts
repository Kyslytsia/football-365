import { StandingProps } from "@/types/standings";

export const modifyDescription = (el: StandingProps, isChampion?: boolean) => {
  if (el.description) {
    let modifiedDescription = el.description
      .replace("Promotion -", "")
      .replace("(Group Stage: )", "")
      .replace("(League phase: )", "")
      .replace("(Qualification: )", "")
      .replace("UEFA Nations League", "")
      .replace("(Play Offs: 1/8-finals)", "")
      .replace("(Play Offs: 1/16-finals)", "")
      .replace(": ", "")
      .trim();

    if (modifiedDescription.includes("Relegation")) {
      return "Relegation";
    } else if (el.rank === 1 && isChampion) {
      return "Won title";
    } else {
      return modifiedDescription;
    }
  } else {
    return "";
  }
};
