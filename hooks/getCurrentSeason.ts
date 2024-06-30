export const getCurrentSeason = (name?: string) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  if (name === "Euro Championship") {
    return currentYear;
  } else if (currentMonth >= 8) {
    return currentYear;
  } else {
    return currentYear - 1;
  }
};
