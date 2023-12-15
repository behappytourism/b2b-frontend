import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import formatDate from "../../../utils/formatDate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SliderCalender() {
  const [dates, setDates] = useState([]);
  const [filter, setFilter] = useState({
    skip: 0,
    limit: 9,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.agents);

  const fetchDate = async () => {
    setIsLoading(true);
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get("/b2b/a2a/date", config);

    if (response?.data?.date == []) {
      setError("No Available A2A Found");
    }
    let dateArray = [];

    let today = new Date();
    let skip = new Date(today.setDate(today.getDate() + 9 * filter.skip));
    let futureFive =
      filter.skip > 0
        ? skip.setDate(today.getDate() + 9)
        : today.setDate(today.getDate() + 9);
    today = new Date();
    skip = new Date(today.setDate(today.getDate() + 9 * filter.skip));

    dateArray = [];

    let current = filter.skip > 0 ? skip : today;

    while (new Date(current) <= new Date(futureFive)) {
      if (response?.data?.dates?.length > 0) {
        let isTrue = response?.data?.dates?.find(
          (date) =>
            new Date(current).toLocaleDateString() ===
            new Date(date).toLocaleDateString()
        );
        console.log(isTrue, "isTrue");
        if (isTrue) {
          dateArray.push({
            day: new Date(current).getDate(),
            date: `${new Date(current).getFullYear()}-${
              `${new Date(current).getMonth() + 1}`.length < 2
                ? `0${new Date(current).getMonth() + 1}`
                : `${new Date(current).getMonth() + 1}`
            }-${
              `${new Date(current).getDate()}`.length < 2
                ? `0${new Date(current).getDate()}`
                : `${new Date(current).getDate()}`
            }`,
            isAvail: true,
          });
        } else {
          dateArray.push({
            day: new Date(current).getDate(),
            date: new Date(current),
            isAvail: false,
          });
        }
      } else {
        dateArray.push({
          day: new Date(current).getDate(),
          date: new Date(current),
          isAvail: false,
        });
      }

      current = new Date(current).setDate(new Date(current).getDate() + 1);
    }
    setDates(dateArray);
  };

  useEffect(() => {
    fetchDate();
  }, [filter.skip]);

  return (
    <div className=" max-w-screen-xl mx-auto pt-7">
      <div className="flex overflow-hidden justify-between gap-1 bg-white rounded-lg h-24 shadow-round">
        <div
          className="flex  justify-center items-center h-full  shadow-mn bg-gray-100 text-blue-400 text-xl rounded-md cursor-pointer"
          onClick={() => setFilter({ ...filter, skip: filter.skip - 1 })}
        >
          <AiFillCaretLeft />
        </div>
        {dates?.map((item, index) => (
          <div
            key={index}
            className="flex justify-center items-center cursor-pointer"
          >
            <div
              onClick={() =>
                item?.isAvail
                  ? navigate(`/a2a/data?date=${item?.date}`)
                  : setError("You should select a available date")
              }
              className=""
            >
              <p className="text-grayColor">{formatDate(item?.date)} </p>
              <p
                className={` text-xs text-center rounded py-1 px-2  ${
                  item?.isAvail
                    ? " bg-green-100 text-green-600 "
                    : " bg-red-100 text-red-600 "
                }`}
              >
                {item?.isAvail ? "Available" : "Not Available"}
              </p>
            </div>
          </div>
        ))}
        <div
          className="flex justify-center items-center h-full  bg-gray-100 shadow-mn text-blue-400 text-xl rounded-md cursor-pointer"
          onClick={() => setFilter({ ...filter, skip: filter.skip + 1 })}
        >
          <AiFillCaretRight />
        </div>
      </div>
    </div>
  );
}

export default SliderCalender;
