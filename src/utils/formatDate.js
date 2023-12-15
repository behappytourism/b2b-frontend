import { monthNames } from "../data";

const formatDate = (date, time = false) => {
  const dt = new Date(date);

  const string = `${
    monthNames[dt.getMonth()]?.name
  } ${dt.getDate()}, ${dt.getFullYear()}`;

  const timeString = ` ${dt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  return string + (time ? timeString : "");
};

export default formatDate;
