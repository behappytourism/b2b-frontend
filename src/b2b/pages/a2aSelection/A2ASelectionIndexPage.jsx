import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { IoAirplane } from "react-icons/io5";
import SearchCards from "../../components/Cards/SearchCards";
import BookingSection from "./BookingSection";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setTravellers } from "../../../redux/slices/a2aSlice";
import { GoArrowRight } from "react-icons/go";
import { GiAirplaneArrival, GiAirplaneDeparture, GiCommercialAirplane } from "react-icons/gi";

function A2ASelectionIndexPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [a2a, setA2a] = useState([]);
  const [isEleLoading, setIsEleLoading] = useState(false);
  const [resData, setResData] = useState([]);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const date = new Date(`${searchParams.get("date")}`);
  const { token } = useSelector((state) => state.agents);

  const fetchA2a = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `/b2b/a2a/list/all`,
        { date },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      setA2a(response?.data?.a2aList);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchA2a();
    dispatch(setTravellers([]));
  }, [dispatch]);

  const handleClick = async (id) => {
    try {
      setIsEleLoading(true);
      const response = await axios.post(
        `/b2b/a2a/single/${id}`,
        { date },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setResData(response?.data?.a2aSingleList);
      dispatch(setTravellers(response?.data?.a2aSingleList));

      setIsEleLoading(false);
    } catch (err) {
      setError(err?.response?.data?.error);
      setIsEleLoading(false);
    }
  };

  return (
    <div className="">
      <SearchCards />
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 gap-10 py-10 text-darktext">
          <div className="first__">
            <h4 className="font-[700] text-gray-400 text-lg">
              {" "}
              Select Your Peferred Combination
            </h4>
            {a2a?.length < 1 ? (
              <>
                <div className="flex justify-center py-20">
                  <p className="">No A2A Available on this date</p>
                </div>
              </>
            ) : (
              <>
                {a2a?.map((item) => (
                  <div
                    key={item._id}
                    className=" p-5 flex flex-wrap justify-between items-center bg-white rounded shadow-round mt-4"
                  >
                    <p className="text-2xl">
                      <GiCommercialAirplane />
                    </p>
                    <p className="font-[400] flex items-center gap-3 uppercase">
                      {item?.airportFromIata} <GiAirplaneDeparture /> {item?.airportToIata} <GiAirplaneArrival />{" "}
                      {item?.airportFromIata}
                    </p>
                    <p className="text-xs text-gray-300 ">
                      {item?.count} Flight available
                    </p>
                    <button
                      className="text-[12px] font-[500] px-5 py-1 rounded-sm text-white bg-blue-600"
                      onClick={() => handleClick(item?._id)}
                    >
                      View
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="second__">
            <BookingSection resData={resData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default A2ASelectionIndexPage;
