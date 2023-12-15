import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import {
  MdOutlineFlight,
  MdOutlineFlightLand,
  MdOutlineFlightTakeoff,
} from "react-icons/md";
import { TbArrowRight, TbArrowsRight } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import formatDate from "../../../utils/formatDate";
import formatTime from "../../../utils/formatTime";
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import {
  handleFullData,
  resetSelectedAddOns,
} from "../../../redux/slices/flightSlice";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BtnLoader } from "../../components";

const FlightItinerary = ({
  navigation,
  setNavigation,
  onDataFetchSuccess,
  ancillaryLoading,
  setAncillaryLoading,
  errorAncillary,
  ancillaryError
}) => {
  const navigate = useNavigate();

    const { selectedFlight, travellers, flightFullData } = useSelector(
    (state) => state.flight
  );


  
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   if (ancillaryLoading === false) {
  //     setNavigation({
  //       itenary: false,
  //       addOns: true,
  //       details: false,
  //       contact: false,
  //     });
  //   }
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      flightFullData?.mealsSsr ||
      (flightFullData?.seatSsr &&
        flightFullData?.seatSsr[0]?.seatMap) ||
      (flightFullData?.baggageSsr &&
        flightFullData?.baggageSsr[0]?.baggages)
    ) {
      setNavigation({
        itenary: false,
        addOns: true,
        details: false,
        contact: false,
      });
    } else {
      setNavigation({
        itenary: false,
        addOns: false,
        details: false,
        contact: true,
      });
    }
  };
  
  

  const navigationIt = () => {
    setNavigation({
      itenary: true,
      addOns: false,
      details: false,
      upload: false,
    });
    //fetchAllData();
  };

  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);


  const { token } = useSelector((state) => state.agents);

  const dispatch = useDispatch();

  // const data = {
  //   noOfAdults: travellers?.adult,
  //   noOfChildren: travellers?.children,
  //   noOfInfants: travellers?.infant,
  //   travelClass: selectedFlight?.travelClass,
  //   type: selectedFlight?.type,
  //   trips:
  //     selectedFlight?.type === "oneway"
  //       ? selectedFlight?.trips?.map((trip) => ({
  //           flightSegments: trip?.flightSegments?.map((segment) => ({
  //             key: segment?.key,
  //             from: segment?.from,
  //             to: segment?.to,
  //             arrivalDate: segment?.arrivalDate,
  //             departureDate: segment?.departureDate,
  //             flightNumber: segment?.flightNumber,
  //             fromTerminal: segment?.fromTerminal,
  //             toTerminal: segment?.toTerminal,
  //           })),
  //           fareDetails: {
  //             fareKey: trip?.fareDetails?.fareKey || "",
  //           },
  //         }))
  //       : selectedFlight?.type === "return"
  //       ? selectedFlight?.trips?.map((trip) => ({
  //           flightSegments: trip?.flightSegments?.map((segment) => ({
  //             key: segment?.key,
  //             from: segment?.from,
  //             to: segment?.to,
  //             arrivalDate: segment?.arrivalDate,
  //             departureDate: segment?.departureDate,
  //             flightNumber: segment?.flightNumber,
  //             fromTerminal: segment?.fromTerminal,
  //             toTerminal: segment?.toTerminal,
  //           })),
  //           fareDetails: {
  //             fareKey: trip?.fareDetails?.fareKey || "",
  //           },
  //         }))
  //       : [],
  //   identifierToken: selectedFlight?.identifierToken,
  // };

  // const bookingData = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.post("/b2b/flight/addToCart", data, {
  //       headers: { authorization: `Bearer ${token}` },
  //     });
  //     if (res.status === 200) {
  //       setFlights(res?.data?.response || []);
  //       const tbId = res?.data?.tbId;
  //       // Call fetchAllData with the received tbId
  //       fetchAllData(tbId);
  //       navigate(`/b2b/flight/${tbId}`);
  //       // Dispatch the action to reset selectedAddOns state
  //       dispatch(resetSelectedAddOns());
  //           // Convert arrays to strings and store in local storage

  //       // Pass to "/flight/booking"
  //       // navigate("/flight/booking");
  //     }
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const datas = {
  //   identifierToken: selectedFlight?.identifierToken,
  // };

  // const fetchAllData = async (tbId) => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.get(`/b2b/flight/details/${tbId}`, {
  //       headers: { authorization: `Bearer ${token}` },
  //     });
  //     if (res.status === 200) {
  //       dispatch(handleFullData(res.data || []));

  //       // setSeate(res?.data || [])
  //       setIsLoading(false);

  //       onDataFetchSuccess();
  //     }
  //     setLoading(false);
  //   } catch (err) {
  //     console.error("Error response from the server:", err.response);
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   bookingData();
  // }, [reload]);

  const calculateDuration = (departureDate, arrivalDate) => {
    const departureTime = new Date(departureDate).getTime();
    const arrivalTime = new Date(arrivalDate).getTime();
    const durationInMinutes = (arrivalTime - departureTime) / (1000 * 60);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const formatDate = (dateString, includeYear = false) => {
    const options = { weekday: "short", day: "numeric", month: "long" };
    if (includeYear) {
      options.year = "numeric";
    }
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // console.log(flightFullData, "less see")

  useEffect(() => {
    if (errorAncillary !== null) {
      setAncillaryLoading(false);
    }
  }, [errorAncillary]);

  //console.log(flightFullData)

  return (
    <div className="px-6 text-darktext overflow-x-auto">
      <div>
        {/* Your return content */}
        <form onSubmit={submitHandler}>
          {!navigation.itenary ? (
            <>
              {(
                flightFullData?.priceQuoteResponse || flightFullData
              )?.trips?.map((ele) => {
                const firstSegment = ele.flightSegments[0];
                const secondSegment = ele.flightSegments[1];
                return (
                  <div key={ele.key}>
                    {ele?.flightSegments?.map((segments, segmentIndex) => {
                      return (
                        <>
                          <div className="md:border-b py-4 md:px-0 rounded-md">
                            <div className="text-green-500 absolute mt-5 text-3xl">
                              <AiFillCheckCircle />
                            </div>
                            <div className="md:ml-10 cursor-pointer">
                              <div className="md:flex items-center text-center justify-between">
                                <div className="pt-4 flex justify-center md:block md:justify-normal">
                                  <img
                                    src={segments?.airlineLogo}
                                    alt=""
                                    className="h-[40px]"
                                  />
                                </div>
                                <div className="pt-3">
                                  <p className="text-md">
                                    {segments.airlineName}
                                  </p>
                                  <p className="text-xs">
                                    {segments.flightNumber}
                                  </p>
                                </div>
                                <div className="pt-3 ml-[-10px]">
                                  <div className="flex gap-2 justify-center md:justify-normal">
                                    <p className="text-sm">
                                      {/* {segments.fromPlace} */}
                                      {segments?.fromPlace > 10}
                                      {expanded
                                        ? segments?.fromPlace
                                        : segments?.fromPlace.slice(0, 7) +
                                          (segments?.fromPlace.length > 10
                                            ? "..."
                                            : "")}
                                    </p>
                                    <span className="pt-0">
                                      <BsArrowRight />{" "}
                                    </span>
                                    <p
                                      onClick={() => setExpanded(!expanded)}
                                      className="text-sm"
                                    >
                                      {segments?.toPlace > 10}
                                      {expanded
                                        ? segments?.toPlace
                                        : segments?.toPlace.slice(0, 7) +
                                          (segments?.toPlace.length > 10
                                            ? "..."
                                            : "")}
                                    </p>
                                  </div>
                                  <p className="text-xs">
                                    {formatDate(segments.arrivalDate, true)}
                                  </p>
                                </div>
                                <div className="pt-3">
                                  <p className="text-md">
                                    {
                                      segments?.departureDate
                                        .split("T")[1]
                                        .split(":")[0]
                                    }
                                    :
                                    {
                                      segments?.departureDate
                                        .split("T")[1]
                                        .split(":")[1]
                                    }{" "}
                                    -{" "}
                                    {
                                      segments?.arrivalDate
                                        .split("T")[1]
                                        .split(":")[0]
                                    }
                                    :
                                    {
                                      segments?.arrivalDate
                                        .split("T")[1]
                                        .split(":")[1]
                                    }
                                  </p>
                                  <p className="text-xs">
                                    {" "}
                                    {calculateDuration(
                                      segments.departureDate,
                                      segments.arrivalDate
                                    )}{" "}
                                    {/* {ele?.flightType} */}
                                  </p>
                                </div>
                                <div className="pt-3">
                                  <p className="border rounded-full p-2 text-sm ">
                                    {ele?.fareDetails?.fareName} fare
                                  </p>
                                </div>

                                <div className="pt-5">
                                  <p
                                    className="border rounded p-1 md:ml-4 text-sm w-[34] bg-orange-600 text-white"
                                    onClick={navigationIt}
                                  >
                                    View Details
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* <div className="ml-10 pt-5 cursor-pointer">
              <div className="flex gap-16 ">
                <div className="pt-4">
                  <img
                    src="https://airhex.com/images/airline-logos/air-arabia.png"
                    alt=""
                    className="h-[40px]"
                  />
                </div>
                <div className="pt-3">
                  <p className="text-md">{firstSegment.airlineName}</p>
                  <p className="text-xs">{firstSegment.flightNumber}</p>
                </div>
                <div className="pt-3">
                  <div className="flex gap-2 ">
                    <p className="text-sm">Dubai </p>
                    <span className="pt-0">
                      <BsArrowRight />{" "}
                    </span>
                    <p className="text-sm">Mumbai</p>
                  </div>
                  <p className="text-xs"> {formatDate(firstSegment.arrivalDate, true)}</p>
                </div>
                <div className="pt-3">
                  <p className="text-md">{
                                    firstSegment?.departureDate
                                      .split("T")[1]
                                      .split(":")[0]
                                  }
                                  :
                                  {
                                    firstSegment?.departureDate
                                      .split("T")[1]
                                      .split(":")[1]
                                  } - {
                                    firstSegment?.arrivalDate
                                      .split("T")[1]
                                      .split(":")[0]
                                  }
                                  :
                                  {
                                    firstSegment?.arrivalDate
                                      .split("T")[1]
                                      .split(":")[1]
                                  }</p>
                  <p className="text-xs">{calculateDuration(
                                  firstSegment.departureDate,
                                  firstSegment.arrivalDate
                                )} Nonstop</p>
                </div>
                <div className="pt-3">
                  <p className="border rounded-full p-2 text-sm ">
                    Standard fare
                  </p>
                </div>
              </div>
            </div> */}
                          </div>
                        </>
                      );
                    })}
                  </div>
                );
              })}
            </>
          ) : (
            <div
              className={`my-1  px-3 py-4 ${
                navigation.itenary
                  ? "text-gray-400 "
                  : "text-slate-400 border-b"
              } rounded-[.25rem] flex items-center gap-2`}
              onClick={() => {
                navigation.itenary &&
                  setNavigation({
                    itenary: false,
                    addOns: false,
                    details: true,
                    upload: false,
                  });
              }}
            >
              <div className="h-8 w-8 rounded-full flex items-center  justify-center border border-gray-200 font-[600]">
                1
              </div>
              <p className="font-[600] text-[20px]">Review your itinerary</p>
            </div>
          )}

          {navigation.itenary && (
            <div className="px-4 py-2  overflow-x-auto">
              <div className=" flex flex-col">
                {flightFullData?.priceQuoteResponse?.trips?.map((ele) => {
                  const firstSegment = ele.flightSegments[0];
                  const secondSegment = ele.flightSegments[0];
                  // Function to check if arrival and departure dates are on the same day or not
                  function checkArrival(arrivalDate, departureDate) {
                    const arrival = new Date(arrivalDate);
                    const departure = new Date(departureDate);

                    if (arrival.toDateString() === departure.toDateString()) {
                      return "ARRIVES SAME DAY";
                    } else {
                      return (
                        <p className="text-[10px] text-white bg-orange-300 px-2 py-[1px] rounded-sm">
                          ARRIVES NEXT DAY
                        </p>
                      );
                    }
                  }

                  return (
                    <div key={ele.key}>
                      {ele?.flightSegments?.map((segments, segmentIndex) => {
                        return (
                          <>
                            <div className="md:flex justify-between max-w-[400px] mb-2 md:mb-0 gap-3 items-center">
                              <p className="text-gray-400 font-[600] flex items-center gap-1">
                                <span className="">{segments?.from}</span>
                                <span className="text-lg">
                                  <BsArrowRight />
                                </span>
                                <span className="">{segments?.to}</span>
                              </p>
                              <p className="text-gray-300 text-sm">
                                {formatDate(secondSegment.arrivalDate, true)}
                              </p>
                              <p className="text-[10px] text-white bg-orange-300 px-2 py-[1px] rounded-sm">
                                {checkArrival(
                                  secondSegment.arrivalDate,
                                  firstSegment.departureDate
                                )}
                              </p>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  );
                })}
                {(
                  flightFullData?.priceQuoteResponse || flightFullData
                )?.trips?.map((ele) => {
                  const firstSegment = ele.flightSegments[0];
                  const secondSegment = ele.flightSegments[0];

                  return (
                    <div key={ele.key}>
                      <p className="text-lg mt-5 text-gray-300">
                        {ele?.direction}
                      </p>
                      {(flightFullData?.priceQuoteResponse || flightFullData)
                        ?.trips[0]?.flightSegments.length > 1 ? (
                        <div className="absolute md:left-[30%] md:mt-[10.5%] mt-[39%]">
                          <div className="items-center text-center">
                            <div className="flex justify-center gap-4">
                              <h1 className="text-xs">
                                Layover in{" "}
                                {
                                  (
                                    flightFullData?.priceQuoteResponse ||
                                    flightFullData
                                  )?.trips[0]?.flightSegments[0]?.toPlace
                                }{" "}
                                (
                                {
                                  (
                                    flightFullData?.priceQuoteResponse ||
                                    flightFullData
                                  )?.trips[0]?.flightSegments[0]?.to
                                }
                                )
                              </h1>
                              {ele?.layOverDurations?.map(
                                (layover, layoverIndex) => {
                                  const hours = Math.floor(layover / 3600);
                                  const minutes = Math.floor(
                                    (layover % 3600) / 60
                                  );
                                  const layoverText =
                                    layover >= 6 * 3600
                                      ? "Long layover"
                                      : "Short layover";

                                  return (
                                    <h1 className="text-xs text-red-500">{`${layoverText} ${hours}h ${minutes}m`}</h1>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      ) : null}
                      {ele?.flightSegments?.map((segments, segmentIndex) => {
                        return (
                          <>
                            <div className="mt-2 ">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                  <div className="md:p-1 hidden md:block">
                                    <img
                                      src={segments?.airlineLogo}
                                      alt=""
                                      className="h-[40px]"
                                    />
                                  </div>
                                  <div className="text-stone-500 text-xs md:text-left text-center -mt-8 -ml-4 md:mt-0 md:ml-0">
                                    <p className="capitalize">
                                      {segments?.airlineName}
                                    </p>
                                    <p className="uppercase">
                                      {segments?.flightNumber}
                                    </p>
                                    <p className="">{ele?.cabinType}</p>
                                  </div>
                                  <div className="Modal section">
                                    <div className="mt-4 md:mx-4">
                                      <div className="flex">
                                        <div className="flex flex-col items-center mr-4">
                                          <div>
                                            <div className="flex items-center justify-center w-4 h-4   bg-gray-300 rounded-full "></div>
                                          </div>
                                          <div className="w-px h-full  border border-gray-300 border-dashed " />
                                        </div>
                                        <div className="">
                                          <p className=" text-gray-400 font-medium flex gap-1 items-center">
                                            <span className="text-lg font-bold mr-4 md:mr-0">
                                              {
                                                segments?.departureDate
                                                  .split("T")[1]
                                                  .split(":")[0]
                                              }
                                              :
                                              {
                                                segments?.departureDate
                                                  .split("T")[1]
                                                  .split(":")[1]
                                              }
                                            </span>
                                            <span className="text-lg mr-4 md:mr-0">
                                              {segments?.from}
                                            </span>
                                            <span className="text-xs mr-8 md:mr-0 w-32 md:w-fit">
                                              {segments?.fromAirport},{" "}
                                              {segments.fromTerminal}
                                            </span>
                                          </p>
                                          <div className="mt-1 flex gap-1 items-center text-gray-300 py-3">
                                            <span className="">
                                              <AiOutlineClockCircle />
                                            </span>
                                            <span className="text-xs">
                                              {calculateDuration(
                                                segments.departureDate,
                                                segments.arrivalDate
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="md:mx-4">
                                      <div className="flex">
                                        <div className="flex flex-col items-center mr-4">
                                          <div>
                                            <div className="flex items-center justify-center w-4 h-4 bg-gray-300 rounded-full "></div>
                                          </div>
                                        </div>
                                        <div className=" pb-8 ">
                                          <p className=" text-gray-400 font-medium flex gap-1 items-center">
                                            <span className="text-lg font-bold mr-4 md:mr-0">
                                              {
                                                segments?.arrivalDate
                                                  .split("T")[1]
                                                  .split(":")[0]
                                              }
                                              :
                                              {
                                                segments?.arrivalDate
                                                  .split("T")[1]
                                                  .split(":")[1]
                                              }
                                            </span>
                                            <span className="text-lg mr-4 md:mr-0">
                                              {segments?.to}
                                            </span>
                                            <span className="text-xs">
                                              {segments.toAirport}{" "}
                                              {segments.toTerminal}
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="text-xs flex -ml-[285px] md:hidden text-gray-300  -mt-2">
                                  <p className="text-gray-300 text-[9px]">Check-in Baggage <span className="text-black">{
                                      ele?.fareDetails?.checkInBaggageWeight
                                    }
                                    {ele?.fareDetails?.baggageAllowanceWeight}
                                    kg / adult </span></p>
                                </div>

                                <div className="text-xs flex -mr-[180px] md:hidden text-gray-300 ml-1 -mt-2">
                                  <p className="text-[9px]">Cabin baggage <span className="text-black">{ele?.fareDetails?.cabinBaggageWeight}
                                  {ele?.fareDetails?.cabbingBaggage}
                                    kg / adult </span></p>
                                </div>

                                <div className="md:w-[30%] hidden md:block">
                                  <table className="w-full">
                                    <tbody>
                                      <tr>
                                        <td className="text-xs py-2">
                                          Check-in Baggage
                                        </td>
                                        <td className="text-xs py-2 text-gray-400 font-medium">
                                          {
                                            ele?.fareDetails
                                              ?.checkInBaggageWeight
                                          }{" "}
                                          {
                                            ele?.fareDetails
                                              ?.baggageAllowanceWeight
                                          }
                                          kg / adult
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className="text-xs py-2">
                                          Cabin baggage
                                        </td>
                                        <td className="text-xs py-2 text-gray-400 font-medium">
                                          {ele?.fareDetails?.cabinBaggageWeight}{" "}
                                          {ele?.fareDetails?.cabbingBaggage}kg /
                                          adult
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  );
                })}

                {/* {selectedFlight?.trip?.map((ele) => {
                return (
                  <>
                    {ele?.flightSegments?.map((dt) => {
                      return (
                        <div className="mt-2">
                          <div className="p-1">
                            <img
                              src="https://play-lh.googleusercontent.com/HoSNU1K6pOnd3ZFkUfhyvqF5FzTOttsCOjwXDfaS-UOxYGF4OnKlkvrn4PrSuzwO8Lg"
                              alt=""
                              className="h-[40px]"
                            />
                          </div>
                          <div className="text-stone-500 text-xs">
                            <p className="capitalize">{dt?.airlineName}</p>
                            <p className="">{dt?.airlineIataCode}</p>
                            <p className="">Economy</p>
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              })} */}

                {/* {selectedFlight?.trip?.map((ele) => {
                return (
                  <>
                    <div className="">
                      <div className="relative md:grid grid-cols-5  w-[100%] justify-between items-center ">
                        <div className="absolute border-t-2 border-dashed w-[100%] -z-10 left-0  flex justify-around">
                          {ele?.flightSegments?.map(() => (
                            <>
                              <span className="relative md:text-[20px] bottom-3">
                                <TbArrowRight />
                              </span>
                            </>
                          ))}
                        </div>

                        {ele?.flightSegments?.map((dt) => {
                          return (
                            <>
                              <div className="flex flex-col bg-[#f1f3f6] items-end pr-1">
                                <span className="text-[16px] text-darktext">
                                  {dt?.fromCountry} ({" "}
                                  <span className="text-[16px] font-semibold text-darktext">
                                    {dt?.from}
                                  </span>
                                  )
                                </span>
                                <span className="text-[16px] text-darktext font-semibold">
                                  {formatTime(dt?.departureDate)}
                                </span>
                                <span className="text-[16px] text-darktext">
                                  {formatDate(dt?.departureDate)}
                                </span>
                                <span className="text-[12px]">
                                  {dt?.fromAirport} Terminal:{" "}
                                  {dt?.departureTerminal}
                                </span>
                              </div>

                              <div className="flex items-center justify-around col-span-3">
                              </div>
                              <div className="flex flex-col bg-[#f1f3f6] pl-1">
                                <span className="text-[16px] font-semibold text-darktext">
                                  ({dt?.to})
                                </span>
                                <span className="text-[16px] text-darktext">
                                  {dt?.toCountry}
                                </span>
                                <span className="w-[120px] font-semibold">
                                  {formatTime(dt?.arrvailDate)}
                                </span>
                                <span className="w-[120px]">
                                  {formatDate(dt?.arrvailDate)}
                                </span>
                                <span className="text-[12px]">
                                  {dt?.toAirport} Terminal:{" "}
                                  {dt?.arrivalTerminal}
                                </span>
                              </div>
                            </>
                          );
                        })}
                      </div>

                    </div>
                  </>
                );
              })} */}
              </div>
              <div className="mt-2 flex justify-end">
              {ancillaryError === "" && (
                <button
                  type="submit"
                  className="bg-orange-500 text-sm font-medium text-white px-3 py-2 rounded"
                >
                  {ancillaryLoading ? <BtnLoader /> : "Continue"}
                </button>
                )}
                {ancillaryError !== "" && (
                  <button
                  onClick={() => navigate("/flight")}
                  className="bg-black hover:bg-darktext text-sm font-medium text-white px-3 py-2 rounded"
                >
                  {ancillaryLoading ? <BtnLoader /> : "Go Back"}
                </button>
                )}
                <p className="absolute mt-10 text-red-800">{ancillaryError}</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FlightItinerary;
