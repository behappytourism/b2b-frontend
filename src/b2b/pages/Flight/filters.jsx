import {
  BsFillMoonStarsFill,
  BsFillSunFill,
  BsFillSunriseFill,
  BsFillSunsetFill,
} from "react-icons/bs";

export const TimeRanges = [
  {
    from: "00:00",
    to: "04:59",
    icon: <BsFillMoonStarsFill />,
    isSelected: false,
  },
  {
    from: "05:00",
    to: "11:59",
    icon: <BsFillSunriseFill />,
    isSelected: false,
  },
  {
    from: "12:00",
    to: "17:59",
    icon: <BsFillSunFill />,
    isSelected: false,
  },
  {
    from: "18:00",
    to: "11:59",
    icon: <BsFillSunsetFill />,
    isSelected: false,
  },
];
