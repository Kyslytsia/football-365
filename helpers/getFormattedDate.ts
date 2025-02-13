export const getFormattedDate = (date: string) => {
  const currentDate = new Date().toISOString().slice(0, 10);
  const tomorrowDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  if (date === currentDate) {
    return "Today";
  } else if (date === tomorrowDate) {
    return "Tomorrow";
  } else {
    return new Date(date)
      .toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
      .replace(",", "");
  }
};
