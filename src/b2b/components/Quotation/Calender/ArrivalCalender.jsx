import React, { useEffect, useState } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setArrivalDate } from "../../../../redux/slices/quotationSlice";

function ArrivalCalender() {
  const dispatch = useDispatch();
  let date = new Date();

  const [currDays, setCurrDays] = useState([]);
  const [currMonth, setCurrMonth] = useState(date.getMonth());
  const [currYear, setCurrYear] = useState(date.getFullYear());

  const [selectedDate, setSelectedDate] = useState("");
  // const [selectedMonth, setSelectedMonth] = useState(
  //   selectedDate.getMonth() || ""
  // );
  // const [selectedYear, setSelectedYear] = useState(
  //   selectedDate.getFullYear() || ""
  // );

  const [isLoading, setIsLoading] = useState(false);

  const fetchDate = async () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
      lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
      lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
      lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let lastFullDateofLastMonth = new Date(
      currYear,
      currMonth,
      0
    ).toISOString();
    let lastFullDateOfMonth = new Date(
      currYear,
      currMonth + 1,
      0
    ).toISOString();

    let array = [];
    let chunk = {};
    let availArray = [];
    for (let i = firstDayofMonth; i > 0; i--) {
      chunk = {
        day: lastDateofLastMonth - i + 1,
        active: false,
        isToday: false,
        selected: false,
        date: lastFullDateofLastMonth - i + 1,
      };
      array.push(chunk);
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      if (
        i === date.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
      ) {
        chunk = {
          day: i,
          active: true,
          isToday: true,
          selected: false,
          date: `${currYear}-${
            `${currMonth + 1}`.length < 2
              ? `0${currMonth + 1}`
              : `${currMonth + 1}`
          }-${`${i}`.length < 2 ? `0${i}` : `${i}`}`,
          avail: availArray?.length > 0 ? true : false,
        };
        availArray = [];
      } else if (
        i === new Date(selectedDate).getDate() &&
        currMonth === new Date(selectedDate).getMonth() &&
        currYear === new Date(selectedDate).getFullYear()
      ) {
        console.log("this works");
        chunk = {
          day: i,
          active: true,
          isToday: false,
          selected: true,
          date: `${currYear}-${
            `${currMonth + 1}`.length < 2
              ? `0${currMonth + 1}`
              : `${currMonth + 1}`
          }-${`${i}`.length < 2 ? `0${i}` : `${i}`}`,
          avail: availArray?.length > 0 ? true : false,
        };
      } else {
        chunk = {
          day: i,
          active: true,
          isToday: false,
          selected: false,
          date: `${currYear}-${
            `${currMonth + 1}`.length < 2
              ? `0${currMonth + 1}`
              : `${currMonth + 1}`
          }-${`${i}`.length < 2 ? `0${i}` : `${i}`}`,
          avail: availArray?.length > 0 ? true : false,
        };
        availArray = [];
      }
      // console.log(chunk);
      array.push(chunk);
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      chunk = {
        day: i - lastDayofMonth + 1,
        active: false,
        isToday: false,
        selected: false,
        date: i - lastFullDateOfMonth + 1,
      };
      array.push(chunk);
    }
    setCurrDays(array);
    setIsLoading(false);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const incrementHandler = () => {
    if (currMonth === 11) {
      setCurrMonth(0);
      setCurrYear(currYear + 1);
    } else {
      setCurrMonth(currMonth + 1);
    }
  };
  const decrementHandler = () => {
    if (currMonth === 0) {
      setCurrMonth(11);
      setCurrYear(currYear - 1);
    } else {
      setCurrMonth(currMonth - 1);
    }
  };

  useEffect(() => {
    fetchDate();
  }, [currMonth, selectedDate]);

  const clickHandler = (item) => {
    let currentDay =
      item?.day.toString().length < 2
        ? "0" + item?.day.toString()
        : item?.day.toString();
    let currentMonth =
      currMonth.toString().length < 2
        ? "0" + (currMonth + 1).toString()
        : (currMonth + 1).toString();
    let date = `${currYear}-${currentMonth}-${currentDay}`;
    setSelectedDate(date);
    dispatch(setArrivalDate(date));
  };

  return (
    <div className="bg-white shadow-round p-5 rounded-2xl sm:w-full lg:max-w-screen-sm">
      <header className="flex justify-center items-center sm:px-7">
        <p className="font-[700] tracking-wide">{`${months[currMonth]}, ${currYear}`}</p>
      </header>
      <div className="flex justify-between gap-5 items-center">
        <div className="">
          <span
            id="prev"
            className="rounded-full w-7 h-7 hover:bg-slate-200 flex justify-center items-center"
            onClick={decrementHandler}
          >
            <AiOutlineLeft />
          </span>
        </div>
        <div className="calendars">
          <ul className="grid grid-cols-7 gap-5 my-5 place-items-center text-sm font-[500]">
            <li>Sun</li>
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
          </ul>
          <ul className="grid grid-cols-7 gap-5 place-items-center">
            {currDays?.map((item, index) => (
              <li
                className={`${
                  item?.selected 
                  ? " text-green-600 bg-green-100 h-5 flex justify-center items-center w-5 rounded-full  "
                  : item?.isToday
                    ? " text-blue-600 bg-blue-100 h-5 flex justify-center items-center w-5 rounded-full   "
                    : item?.active
                    ? " text-darktext "
                    : " text-gray-200 "
                }   cursor-pointer font-[300] text-sm `}
                key={index}
                onClick={() => clickHandler(item)}
              >
                {item?.day}
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <span
            id="next"
            className="rounded-full w-7 h-7 hover:bg-slate-200 flex justify-center items-center"
            onClick={incrementHandler}
          >
            <AiOutlineRight />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ArrivalCalender;
