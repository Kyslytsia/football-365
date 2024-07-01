export const MatchTime = (date: string) => {
  if (!date) return;

  return new Date(new Date(date).getTime() + 3 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[1]
    .split(":")
    .slice(0, 2)
    .join(":");
};
