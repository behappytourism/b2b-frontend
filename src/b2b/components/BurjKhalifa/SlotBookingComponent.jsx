import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsCartPlus, BsFillPersonFill } from "react-icons/bs";
import { FaChild } from "react-icons/fa";
import axios from "../../../axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartSingleItem,
  setActivities,
} from "../../../redux/slices/agentExcursionSlice";
import formatTime from "../../../utils/formatDate"
import priceConversion from "../../../utils/PriceConversion";
import formatDate from "../../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { setAlertSuccess } from "../../../redux/slices/homeSlice";

function SlotBookingComponent({ item, index }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedSlot, setSelectedSlot] = useState({});

  const { token } = useSelector((state) => state.agents);
  const { selectedCurrency } = useSelector((state) => state.home);

  const fetchTimeSlot = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.post(
        "/b2b/resellers/client/attraction/timeslot",
        {
          productId: item?.productId,
          productCode: item?.productCode,
          timeSlotDate: item?.date,
          activityId: item?._id
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        setActivities({
          value: response?.data,
          name: "slot",
          index,
        })
      );
      setIsLoading(false);
    } catch (err) {
      console.log(err?.response?.data?.error);
      setError(err?.response?.data?.error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeSlot();
  }, [item?.date, item?.adult, item?.child]);

  function isObjectEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  const carting = (item) => {
    dispatch(addToCartSingleItem(item));
    dispatch(setAlertSuccess({
        status: true,
        title: "Added to cart!",
        text: "The item you selected is added into cart",
     }))
  };

  return (
    <div>
      <div className="h-40 w-full border border-blue-300 bg-white rounded shadow-inner p-4  overflow-y-auto ">
        <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-3">
          {!isLoading ? (
            <>
              {item?.slot && item?.slot?.length > 0 ? (
                <>
                  {item?.slot?.map((slot) => (
                    <div
                      key={slot?.EventId}
                      onClick={() => {
                        if (Number(slot?.Available) >= item?.adult) {
                          dispatch(
                            setActivities({
                              value: slot,
                              name: "selectedTimeSlot",
                              index,
                            })
                          );
                          setSelectedSlot(slot);
                        }
                      }}
                      className={` ${
                        Number(slot?.Available) < item?.adult
                          ? " bg-red-200 text-stone-500  "
                          : slot?.EventID === selectedSlot?.EventID
                          ? " bg-blue-100  "
                          : " bg-green-100 "
                      } relative  rounded-full  w-full pt-2 shadow flex flex-col items-center justify-center cursor-pointer`}
                    >
                      <p className="text-xs">
                        {moment(slot?.StartDateTime).format("LT") +
                          " - " +
                          moment(slot?.EndDateTime).format("LT")}
                      </p>
                      <div className="md:flex  gap-1 ">
                        <p className="text-xs flex  gap-1">
                          <span className="text-sm">
                            <BsFillPersonFill />
                          </span>
                          {priceConversion(
                            Number(slot?.AdultPrice),
                            selectedCurrency,
                            true
                          )}
                        </p>
                        <p className="text-xs flex gap-1">
                          <span className="text-sm">
                            <FaChild />
                          </span>{" "}
                          {priceConversion(
                            Number(slot?.ChildPrice),
                            selectedCurrency,
                            true
                          )}
                        </p>
                      </div>
                      {slot?.EventID === selectedSlot?.EventID ? (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSlot({});
                            dispatch(
                              setActivities({
                                value: {},
                                name: "selectedTimeSlot",
                                index,
                              })
                            );
                          }}
                          className="absolute bg-primaryColor text-white h-4 w-4 rounded-full -top-1 right-1 flex justify-center items-center"
                        >
                          -
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <p className="py-2 rounded-full px-4 bg-red-100 text-xs text-gray-400 font-semibold">
                  {error}
                </p>
              )}
            </>
          ) : (
            <>
              {Array.from({ length: 4 })?.map((_, ind) => (
                <div
                  key={ind}
                  className="bg-stone-100 rounded-full  w-full pt-2 shadow flex flex-col items-center justify-center"
                >
                  <div className="h-5 w-40 rounded-full animate-pulse  bg-gray-300"></div>
                  <div className="flex gap-2 mt-1">
                    <div className="h-5 w-20 rounded-full animate-pulse  bg-gray-200"></div>
                    <div className="h-5 w-20 rounded-full animate-pulse  bg-gray-200"></div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {item?.selectedTimeSlot && !isObjectEmpty(item?.selectedTimeSlot) ? (
        <div className="w-full bg-gradient-to-br from-slate-200 to-stone-200 shadow rounded mt-3 p-4">
          <h4 className=" font-[600] text-gray-400">Selected Slots</h4>
          <div className="w-full md:flex">
            <table className="w-full md:w-1/2">
              <tbody className="text-sm text-gray-400 font-light">
                <tr>
                  <td className="p-1">
                    {formatDate(item?.selectedTimeSlot?.StartDateTime)}
                  </td>
                  <td className="p-1">
                    {formatTime(item?.selectedTimeSlot?.StartDateTime) +
                      " - " +
                      formatTime(item?.selectedTimeSlot?.EndDateTime)}
                  </td>
                </tr>
                <tr>
                  <td className="p-1">
                    Adult X {item?.adult} ={" "}
                    {priceConversion(
                      Number(item?.adult) *
                        Number(item?.selectedTimeSlot?.AdultPrice),
                      selectedCurrency,
                      true
                    )}
                  </td>
                  <td className="p-1">
                    {Number(item?.child) > 0 ? (
                      <>
                        Child X {item?.child} ={" "}
                        {priceConversion(
                          Number(item?.child) *
                            Number(item?.selectedTimeSlot?.ChildPrice),
                          selectedCurrency,
                          true
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex gap-2 w-1/2 justify-end items-end">
              <button
                onClick={() => {
                  setSelectedSlot({});
                  dispatch(
                    setActivities({
                      value: {},
                      name: "selectedTimeSlot",
                      index,
                    })
                  );
                }}
                className=" text-xl h-8 text-red-400 w-8 flex justify-center items-center"
              >
                <AiFillDelete />
              </button>
              <button
                onClick={() => carting(item)}
                className="bg-blue-400 shadow rounded-sm h-8 text-white w-8 flex justify-center items-center"
              >
                <BsCartPlus />
              </button>
              <button
                onClick={() => {
                  carting(item);
                  navigate(`/attractions/payment`);
                }}
                className="bg-blue-800 text-xs font-semibold shadow rounded-sm h-8 text-white px-4 flex justify-center items-center"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default SlotBookingComponent;
