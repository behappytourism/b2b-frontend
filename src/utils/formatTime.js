const formatTime = (date) => {
  const dt = new Date(date);

  const timeString = ` ${dt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })}`;

  return timeString;
};

export default formatTime;
