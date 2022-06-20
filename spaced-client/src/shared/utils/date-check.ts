export const isSameDay = (lastUpdatedDate: number) => {
  return lastUpdatedDate === new Date(Date.now()).getDay();
};

export const timeTillReset = (): string => {
  const time =
    new Date(Date.now() + 24 * 1000 * 60 * 60).setHours(0, 0, 0, 0) -
    Date.now();

  var seconds = parseInt(Math.floor(time / 1000).toFixed(0));
  var minutes = parseInt(Math.floor(time / (1000 * 60)).toFixed(0));
  var hours = parseInt(Math.floor(time / (1000 * 60 * 60)).toFixed(0));

  if (seconds < 60) return seconds + "s";
  else if (minutes < 60) return minutes + "m";
  return hours + "h";
};
