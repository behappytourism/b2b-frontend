import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios";
import { setActivities } from "../../../redux/slices/agentExcursionSlice";
import { setAlertError } from "../../../redux/slices/homeSlice";
import moment from "moment";
import priceConversion from "../../../utils/PriceConversion";

export default function BurjKhalifaTimeSlotModal({
  item,
  index,
  selectedDate,
  isTimeSlotModalOpen,
  setIsTimeSlotModalOpen,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [timeSlot, setTimeSlot] = useState([]);
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.agents);
  const { selectedCurrency } = useSelector((state) => state.home);

  const fetchTimeSlots = async () => {
    try {
      setIsLoading(true);
      console.log(item, selectedDate, "item");

      const data = {
        productId: item.productId,
        productCode: item.productCode,
        timeSlotDate: selectedDate,
        activityId: item?._id
      };

      const response = await axios.post(
        "/b2b/resellers/client/attraction/timeslot",
        data,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      setTimeSlot(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeSlots();
  }, []);

  console.log(timeSlot, "timeSlots");

  return (
    <div className="fixed top-0 right-0 bg-white shadow-xl h-full z-10 w-[600px] overflow-y-auto">
      <div className="flex items-center justify-between p-4 border-b">
        <span className="font-[600]">Bhurj Khalifa Ticket with cafe treat</span>
        <span
          className="text-xl font-medium cursor-pointer"
          onClick={() => setIsTimeSlotModalOpen(false)}
        >
          x
        </span>
      </div>

      <div className="p-4">
        <h1>Select Time Slot Options</h1>
        {isLoading ? (
          <div className="grid grid-cols-4 gap-4 mt-4 animate-pulse">
            {Array.from({ length: 12 })?.map((_, index) => (
              <div
                key={index}
                className="p-2 py-5 w-full space-y-2 shadow-sm bg-gray-100 rounded-lg"
              >
                <div className="h-3 w-full bg-gray-200 rounded-xl"></div>
                <div className="h-3 w-full bg-gray-200 rounded-xl"></div>
                <div className="h-3 w-full bg-gray-200 rounded-xl"></div>
                <div className="h-3 w-full bg-gray-200 rounded-xl"></div>
                <div className="h-3 w-full bg-gray-200 rounded-xl"></div>
                <div className="h-3 w-full bg-gray-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 mt-4">
            {timeSlot.map((slots, indexs) => {
              return (
                <div
                  key={indexs}
                  className={`${
                    Number(slots?.Available) > 4
                      ? " bg-green-500 "
                      : Number(slots?.Available) <= 4 &&
                        Number(slots?.Available) > 0
                      ? " bg-yellow-500 "
                      : Number(slots?.Available) <= 0
                      ? " bg-red-500 "
                      : ""
                  }  rounded py-2 text-center text-white text-sm cursor-pointer`}
                  onClick={() => {
                    if (Number(slots?.Available) > 0) {
                      dispatch(
                        setActivities({
                          value: slots,
                          name: "slot",
                          index,
                        })
                      );
                      setIsTimeSlotModalOpen(false);
                    } else {
                      dispatch(
                        setAlertError({
                          status: true,
                          title: "Slot not available!",
                          text: "The selected slot is not available for booking.",
                        })
                      );
                      dispatch(
                        setActivities({
                          value: "",
                          name: "slot",
                          index,
                        })
                      );
                    }
                  }}
                >
                  <span className="block ">Start Time</span>
                  <span className="block font-[600]">
                    {moment(slots?.StartDateTime).format("LT")}
                  </span>

                  <span className="block">End Time </span>
                  <span className="block font-[600]">
                    {moment(slots?.EndDateTime).format("LT")}
                  </span>

                  <span className="block mt-1">Adult Price</span>
                  <span className="block mt-1 font-[600]">
                    {priceConversion(
                      Number(slots?.AdultPrice),
                      selectedCurrency,
                      true
                    )}
                  </span>
                  <span className="block mt-1">Child Price</span>
                  <span className="block mt-1 font-[600]">
                    {priceConversion(
                      Number(slots?.ChildPrice),
                      selectedCurrency,
                      true
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
