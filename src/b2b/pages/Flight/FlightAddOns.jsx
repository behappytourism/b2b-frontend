import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdHealthAndSafety, MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { GiMeal } from "react-icons/gi";
import { RiLuggageCartFill, RiLuggageCartLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useHandleClickOutside } from "../../../hooks";
import planeHead from "../../../static/images/plane-head.svg";
import rightWing from "../../../static/images/leftWing.svg";
import leftWing from "../../../static/images/rightWing.svg";
import { TbLuggage } from "react-icons/tb";
import axios from "../../../axios";
import FlightMealCountButton from "./FlightMealCountButton";
import SeateBoxes from "./SeateBoxes";
import FlightBaggageAddButton from "./FlightBaggageAddButton";
import { AiFillCheckCircle } from "react-icons/ai";
import { useLocation, useParams } from "react-router-dom";
import {
  resetSelectedAddOns,
  resetSelectedAddOnsLuggages,
  resetSelectedAddOnsMeals,
  resetSelectedAddOnsSeats,
} from "../../../redux/slices/flightSlice";
import { BtnLoader } from "../../components";
import { FaPlaneCircleXmark } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import FlightInsuranceBenefits from "./FlightInsuranceBenefits";
import FlightInsurancePlans from "./FlightInsurancePlans";

const FlightAddOns = ({ navigation, setNavigation }) => {
  const location = useLocation(); // Get the current location
  const { tbId } = useParams(); // Extract the "tbId" from the URL path

  const [clickedDiv, setClickedDiv] = useState(null);
  const [deselectedAll, setDeselectedAll] = useState(false);
  const [deselectedAllMeals, setDeselectedAllMeals] = useState(false);
  const [deselectedAllLuggages, setDeselectedAllLuggages] = useState(false);
  const [totalMealPrice, setTotalMealPrice] = useState(0);
  const [totalLuggagePrice, setTotalLuggagePrice] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [segmentKeys, setSegmentKeys] = useState([]);
  const [baggageSegmentKeys, setBaggageSegmentKeys] = useState([]);
  const [mealInfos, setMealInfos] = useState([]);
  const [insuranceBenefits, setInsuranceBenefits] = useState(false);
  const [insurancePlans, setInsurancePlans] = useState(false);



  // Callback function to update the total count
  const updateTotalCount = (count) => {
    // Perform your calculation here (e.g., multiply by 50)
    const calculatedTotalCount = count * 50;
    setTotalCount(calculatedTotalCount);
  };

  const handleClick = (divId) => {
    setClickedDiv(divId === clickedDiv ? null : divId);
  };
  const dispatch = useDispatch();
  const rightModalRef = useRef();
  const [modalsState, setModalState] = useState({
    seatModal: false,
    mealModal: false,
    luggageModal: false,
  });

  const [loading, setLoading] = useState(false);

  const { flightFullData, selectedAddOns } = useSelector(
    (state) => state.flight
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [data, setData] = useState();
  const [mealSegment, setMealSegment] = useState("");

  const { token } = useSelector((state) => state.agents);

  const submitHandler = (e) => {
    e.preventDefault();
    // setNavigation({
    //   itenary: false,
    //   contact: true,
    //   details: false,
    //   payment: false,
    //   addOns: false,
    // });
  };

  const navigationAdd = () => {
    setNavigation({
      addOns: true,
      itenary: false,
      contact: false,
      details: false,
    });
  };

  // const handleSeatSelect = (seatNo) => {
  //   dispatch(handleFlightAddOnsChange({ name: "seats", value: seatNo }));
  // };

  const toggleModal = (name) => {
    const initial = {
      seatModal: false,
      mealModal: false,
      luggageModal: false,
    };

    if (name === "seatModal" && modalsState.seatModal) {
      initial.mealModal = true;
    }
    if (name === "mealModal" && modalsState.mealModal) {
      initial.luggageModal = true;
    }

    setModalState({ ...initial, [name]: !modalsState[name] });
  };

  // const fetchDataAddSsr = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await axios.post(
  //       "/b2b/flight/ancillaries/add",
  //       {
  //         tbId: tbId,
  //         identifierToken: flightFullData?.identifierToken,
  //         addedSeatList: selectedAddOns?.seats,
  //         addedBaggageList: selectedAddOns?.luggage,
  //         addedMealsList: selectedAddOns?.meal,
  //       },
  //       {
  //         headers: { authorization: `Bearer ${token}` },
  //       }
  //     );
  //     setIsLoading(false);
  //     setData(res);
  //   } catch (err) {
  //     console.log(err);
  //     setIsLoading(false);
  //   }
  // };

  // Helper function to find the paxId based on a given segmentKey
  const findPaxIdBySegmentKey = (segmentKey, passengers) => {
    const passenger = passengers.find((pax) => pax.segmentKey === segmentKey);
    return passenger ? passenger.paxId : "";
  };

  const fetchDataAddSsr = async () => {
    try {
      setIsLoading(true);
      setIsButtonLoading(true);
      // Get departure and arrival airports from flightFullData
      const departureAirport = flightFullData?.departureAirport;
      const arrivalAirport = flightFullData?.arrivalAirport;

      let passengerIndex = 0;

      const passengers = flightFullData?.priceQuoteResponse?.passengers || [];
      const mealCount = selectedAddOns?.meal.length;

      // Prepare the ancillaries data
      const ancillaries = [
        {
          journeyOriginDestinationInfo: {
            from: flightFullData?.priceQuoteResponse?.trips[0]
              ?.departureAirport,
            to: flightFullData?.priceQuoteResponse?.trips[0]?.arrivalAirport,
          },
          userSelectedBaggageAncillaries: selectedAddOns?.luggage.map(
            (luggage, index) => {
              const passenger = passengers[index % passengers.length];
              return {
                journeyKey: luggage.baggageKeys,
                baggageDetails: [
                  {
                    baggageCode: luggage.baggageCode,
                    baggageInfo: luggage.baggageInfo,
                    //  paxId: flightFullData?.priceQuoteResponse?.passengers[0]?.paxId
                    paxId: passenger?.paxId || "",
                  },
                ],
              };
            }
          ),
          userSelectedMealAncillaries: selectedAddOns?.meal.map(
            (meal, index) => {
              const passenger = passengers[index % passengers.length];
              return {
                segmentKey: meal.segmentKey,
                mealDetails: [
                  {
                    mealCode: meal.mealCode,
                    mealInfo: meal.mealInfo,
                    //price: meal.mealPrice,
                    paxId: passenger?.paxId || "",
                  },
                ],
              };
            }
          ),
          userSelectedSeatAncillaries: selectedAddOns?.seats.map(
            (seat, index) => {
              const passenger = passengers[index % passengers.length];
              return {
                segmentKey: seat.segmentKey,
                seatDetails: seat.seatKeys.map((seatKey) => ({
                  seatCode: seatKey,
                  seatNumber: seat.seatNumber || "",
                  //paxId: flightFullData?.priceQuoteResponse?.passengers[0]?.paxId,
                  paxId: passenger?.paxId || "",
                })),
              };
            }
          ),
        },
      ];

      const res = await axios.post(
        "/b2b/flight/ancillaries/add",
        {
          tbId: tbId,
          identifierToken: flightFullData?.identifierToken,
          ancillaries: ancillaries, // Include the prepared ancillaries data
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        setIsButtonLoading(false);
        setNavigation({
          itenary: false,
          contact: true,
          details: false,
          payment: false,
          addOns: false,
        });
      }

      setIsLoading(false);
      setData(res);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleSeatDeselection = () => {
    // Implement the logic to deselect all selected seats
    setTotalPrice(0); // Reset the total price
    setDeselectedAll(true); // Set a flag to notify child components to deselect
    dispatch(resetSelectedAddOnsSeats());
  };

  const handleMealsDeselection = () => {
    // Implement the logic to deselect all selected seats
    setTotalMealPrice(0); // Reset the total price
    setDeselectedAllMeals(true); // Set a flag to notify child components to deselect
    dispatch(resetSelectedAddOnsMeals());
  };

  const handleLuggagesDeselection = () => {
    // Implement the logic to deselect all selected seats
    setTotalLuggagePrice(0); // Reset the total price
    setDeselectedAllLuggages(true); // Set a flag to notify child components to deselect
    dispatch(resetSelectedAddOnsLuggages());
    // Dispatch actions to set counts to 0
  };

  const [totalPrice, setTotalPrice] = useState(0);

  const handleSeatClick = (price) => {
    setTotalPrice((prevTotalPrice) => prevTotalPrice + price);
  };

  const updateTotalPrice = (newPrice) => {
    setTotalMealPrice(newPrice);
  };

  const updateTotalLuggagePrice = (newPrice) => {
    setTotalLuggagePrice(newPrice);
  };

  // Format the totalPrice to two decimal places using the toFixed() method
  const formattedTotalPrice = totalPrice.toFixed(2);
  const formattedTotalMealPrice = totalMealPrice.toFixed(2);
  const formattedTotalLuggagePrice = totalLuggagePrice.toFixed(2);

  const resetMealCount = () => {
    setTotalMealPrice(0);
  };

  const selectedSeatsCount = selectedAddOns?.seats?.length;
  const selectedMealsCount = selectedAddOns.meal.length;

  const getSelectedSeatsCount = (segmentKey) => {
    return selectedAddOns?.seats?.filter(
      (seat) => seat.segmentKey === segmentKey
    ).length;
  };

  const getSelectedMealsCount = (segmentKey) => {
    const filteredMeals = selectedAddOns?.meal?.filter(
      (meal) => meal.segmentKey === segmentKey
    );

    return filteredMeals.length;
  };

  const getSelectedLuggagesCount = (segmentKey) => {
    return selectedAddOns?.luggage?.filter(
      (luggage) => luggage.segmentKey === segmentKey
    ).length;
  };

  const noOfAdults = flightFullData?.priceQuoteResponse?.noOfAdults || 0;
  const noOfChildren = flightFullData?.priceQuoteResponse?.noOfChildren || 0;
  const maxSeatsAllowed = noOfAdults + noOfChildren || 0;
  const flightFirstSegment = flightFullData?.mealsSsr?.[0]?.segmentKey || 0;

  useEffect(() => {
    const extractedSegmentKeys = flightFullData?.mealsSsr?.map(
      (item) => item.segmentKey
    );
    setSegmentKeys(extractedSegmentKeys);
  }, []);

  useEffect(() => {
    const extractedBaggageSegmentKeys = flightFullData?.baggageSsr?.map(
      (item) => item.journeyKey
    );
    setBaggageSegmentKeys(extractedBaggageSegmentKeys);
  }, []);

  useEffect(() => {
    const meals = flightFullData?.mealsSsr?.map((item) => item.meals);
    // Flatten the array of arrays to a single array of meal objects
    const allMeals = meals?.flat();
    const extractedMealInfos = allMeals?.map((meal) => meal.mealInfo);
    setMealInfos(extractedMealInfos);
  }, []);

  // useEffect(() => {
  //   const flightSegment = flightFullData?.priceQuoteResponse?.trips?.map((trip, tripIndex) => {
  //     const tripSegment = trip?.flightSegments?.map((segment, segmentIndex) => {
  //       const finalKeys = segment?.key;
  //     })
  //   })
  // }, [])

  // useEffect(() => {
  //   // Create an array to store the segment keys
  //   const segmentKeys = [];

  //   flightFullData?.priceQuoteResponse?.trips?.forEach((trip) => {
  //     trip?.flightSegments?.forEach((segment) => {
  //       const segmentKey = segment?.key;
  //       if (segmentKey) {
  //         segmentKeys.push(segmentKey);
  //       }
  //     });
  //   });

  //   // Now, segmentKeys array contains all the segment keys

  //   // You can store them or perform any other actions as needed
  // }, []);

  //console.log(selectedAddOns, "this is the selectedAddOns");


  return (
    <>
      <div className="p-6 text-darktext">
        <div>
          {/* {navigation.addOns === false &&
            navigation.details === false && (
              // Content to render when both conditions are true
              <div className="pt-1 pl-4">
               
              </div>
            )} */}

          <form onSubmit={submitHandler}>
            {(navigation.addOns === false &&
              navigation.contact === false &&
              navigation.details === true) ||
            (navigation.payment === false &&
              navigation.itenary === false &&
              navigation.addOns === false) ? (
              <div
                className={`my-1  py-4 ${
                  navigation.addOns
                    ? "text-gray-400 "
                    : "text-slate-400 md:border-b"
                } rounded-[.25rem] flex items-center gap-2`}
                onClick={() => {
                  navigation.contact &&
                    setNavigation({
                      itenary: false,
                      addOns: true,
                      contact: false,
                      details: false,
                      payment: false,
                    });
                }}
              >
                <div className="w-full md:flex md:justify-between">
                  <div className="flex gap-4">
                    <div className="text-3xl text-green-500">
                      <AiFillCheckCircle />
                    </div>
                    <p className="font-[600] text-[20px]">Add ons</p>
                  </div>
                  <p
                    className="border rounded p-1 text-sm md:w-fit w-full text-center md:mt-0 mt-2 bg-orange-600 text-white cursor-pointer md:mr-0 mr-2"
                    onClick={navigationAdd}
                  >
                    View Details
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={`my-1  md:px-2 py-4 ${
                  navigation.addOns
                    ? "text-gray-400 "
                    : "text-slate-400 md:border-b"
                } rounded-[.25rem] flex items-center gap-2`}
                onClick={() => {
                  navigation.contact &&
                    setNavigation({
                      itenary: false,
                      addOns: false,
                      contact: true,
                      details: false,
                      payment: false,
                    });
                }}
              >
                <div className="w-full flex justify-between">
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center border border-gray-200 font-[600]">
                      2
                    </div>
                    <p className="font-[600] text-[20px]">Add ons</p>
                  </div>
                </div>
              </div>
            )}

            {navigation.addOns && (
              <div className="rounded-md shadow bg-white p-6">
                <div className="w-[100%] flex flex-col gap-y-2">
                  {flightFullData?.seatSsr && flightFullData?.seatSsr[0]?.seatMap.length > 0 && (
                    <div
                      // onClick={() => {
                      //   toggleModal("");
                      // }}
                      className="py-2 text-gray-500 font-[550]  border-dashed px-1 md:flex md:justify-between"
                    >
                      <div>
                        <h2 className="flex gap-2 text-[18px] font-medium">
                          <span className="text-[25px] ">
                            <MdOutlineAirlineSeatReclineExtra />{" "}
                          </span>{" "}
                          {selectedAddOns.seats.length > 0
                            ? "Seats Added"
                            : "Choose the seat you want"}
                        </h2>

                        <p className="text-xs text-orange-500 pl-8">
                          Seats are cheaper when pre-booked
                        </p>
                        {selectedAddOns.seats.length > 0 && (
                          <>
                            {flightFullData?.seatSsr.map(
                              (segment, segmentIndex) => (
                                <div
                                  key={segmentIndex}
                                  className="text-xs flex gap-4 mb-2 mt-2"
                                >
                                  {flightFullData?.priceQuoteResponse?.trips
                                    .filter((trip) =>
                                      trip.flightSegments.some(
                                        (flightSegment) =>
                                          flightSegment.key ===
                                          segment.segmentKey
                                      )
                                    )
                                    .map((trip, tripsegment) => (
                                      <p>{trip?.direction}</p>
                                    ))}
                                  <p>
                                    {segment.from} - {segment.to}
                                  </p>
                                  <p>
                                    {selectedAddOns?.seats
                                      .filter(
                                        (seat) =>
                                          seat.segmentKey === segment.segmentKey
                                      )
                                      .map((seat, seatIndex, seats) => (
                                        <span key={seatIndex}>
                                          {seat.seatNumber}
                                          {seatIndex !== seats.length - 1 &&
                                            " - "}
                                        </span>
                                      ))}
                                  </p>
                                  {getSelectedSeatsCount(
                                    segment?.segmentKey
                                  ) === 0 ? (
                                    <p>No seat added</p>
                                  ) : (
                                    <p>
                                      Added for{" "}
                                      {getSelectedSeatsCount(
                                        segment?.segmentKey
                                      )}
                                      /{maxSeatsAllowed} travellers
                                    </p>
                                  )}
                                </div>
                              )
                            )}
                          </>
                        )}
                      </div>
                      {flightFullData?.seatSsr[0]?.seatMap.length > 0 && (
                        <div className="md:flex gap-2">
                          {!modalsState?.seatModal && (
                            <div className="">
                              <button
                                type="button"
                                className="text-sm rounded h-8 p-1 border border-orange-500 hover:border-orange-700 text-orange-500 md:w-36 w-[102%] mt-2 md:mt-0"
                                onClick={() => {
                                  toggleModal("seatModal");
                                }}
                              >
                                {" "}
                                {selectedAddOns?.seats?.length > 0
                                  ? "Change"
                                  : "Select seats"}
                              </button>
                            </div>
                          )}

                          {modalsState?.seatModal && (
                            <div className="col-span-12 flex items-center gap-4 pr-4">
                              <div className=" flex gap-2">
                                {" "}
                                <div className="h-5 w-5  bg-red-500 rounded-3xl items-center" />
                                Booked
                              </div>
                              {/* <div className=" flex gap-2">
                        {" "}
                        <div className="h-5 w-5 bg-gray-300 rounded-3xl  items-center" />
                        Available
                      </div> */}
                              <div className=" flex gap-2">
                                {" "}
                                <div className="h-5 w-5 bg-teal-400  rounded-3xl items-center" />
                                Selected
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    {modalsState?.seatModal && (
                      <div className="overflow-x-scroll flex gap-2 ">
                        <div className="pt-4">
                          {/* <p className="pl-1">Onwards</p> */}
                          {flightFullData?.seatSsr
                            ?.slice()
                            .map((ele, index) => (
                              <div
                                key={ele?.segmentKey}
                                onClick={() => handleClick(index)}
                              >
                                {flightFullData?.priceQuoteResponse?.trips
                                  .filter((trip) =>
                                    trip.flightSegments.some(
                                      (flightSegment) =>
                                        flightSegment.key === ele.segmentKey
                                    )
                                  )
                                  .map((trip, tripsegment) => (
                                    <p>{trip?.direction}</p>
                                  ))}

                                <div
                                  className={`flex gap-8 text-center items-center cursor-pointer rounded-sm py-2 mb-2 font-bold ${
                                    clickedDiv === index
                                      ? "bg-blue-100"
                                      : "bg-white" // Use your desired background color class
                                  }`}
                                >
                                  <button type="button" className=" p-1 w-40">
                                    {ele?.from} - {ele?.to}
                                  </button>
                                  <p className="text-sm bg-white rounded-xl pl-2 pr-2 mr-2">
                                    {getSelectedSeatsCount(ele?.segmentKey)}/
                                    {maxSeatsAllowed}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>

                        <div>
                          {flightFullData?.seatSsr?.map((ele, index) => {
                            if (index === clickedDiv) {
                              {
                                /* if (ele.identification[1]?.groupNo === clickedDiv) { */
                              }
                              return (
                                <div key={ele.segmentKey}>
                                  <div className="flex gap-3 pt-10">
                                    {/* {flightFullData?.seatSsr?.map((ele) => {
                                if (index === clickedDiv) {
                                return (
                                  <> */}
                                    {ele?.seatPriceGroup?.map((st) => {
                                      return (
                                        <div className="grid-cols-1">
                                          <div className="flex gap-2">
                                            <div
                                              className={`${
                                                st?.groupNo === 1
                                                  ? "w-5 h-5 bg-blue-200"
                                                  : st?.groupNo === 2
                                                  ? "w-5 h-5 bg-purple-200"
                                                  : st?.groupNo === 3
                                                  ? "w-5 h-5 bg-violet-500"
                                                  : st?.groupNo === 4
                                                  ? "w-5 h-5 bg-orange-200"
                                                  : st?.groupNo === 5
                                                  ? "w-5 h-5 bg-pink-300"
                                                  : ""
                                              }`}
                                            ></div>
                                            <p>{st.startRange}</p>
                                          </div>
                                        </div>
                                      );
                                    })}
                                    {/* </>
                                );
                                }
                              })} */}
                                  </div>

                                  <div className="p-4 grid grid-cols-12 w-[1500px] items-center h- py-10 border ">
                                    <div className="h-[200px] flex items-center relative col-span-2">
                                      <img
                                        src={planeHead}
                                        alt=""
                                        className="w-[240px]  transform -rotate-90"
                                      />
                                      <div className="absolute right-0 h-[100%] ">
                                        {ele?.seatMap?.map(
                                          (seatmapping, index) => {
                                            return (
                                              <div key={index}>
                                                {seatmapping?.rows[0]?.seats?.map(
                                                  (seatsData, rowsIndex) => {
                                                    return (
                                                      <>
                                                        <ul className="flex flex-col justify-between pt-1 pb-1 h-[100%] text-[17px] font-medium">
                                                          {
                                                            seatsData?.columnNumber
                                                          }
                                                        </ul>
                                                      </>
                                                    );
                                                  }
                                                )}
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    </div>
                                    <div className="h-[240px] border-[2px] border-x-0 w-[1000px] relative col-span-10">
                                      <div className="absolute bottom-[135px] left-[40%]  ">
                                        <img
                                          // src={leftWing}
                                          alt=""
                                          className="w-[120px]  transform -rotate-90  "
                                        />
                                      </div>
                                      <div className="absolute left-[40%] top-[135px]">
                                        <img
                                          // src={rightWing}
                                          alt=""
                                          className="w-[120px]   transform -rotate-90  "
                                        />
                                      </div>

                                      {loading && (
                                        <>
                                          <div className="h-[100%] flex gap-3 py-3.5 px-8 animate-pulse w-[90%]">
                                            {Array.from({ length: 28 })?.map(
                                              (ele, i) => (
                                                <>
                                                  <div className="flex  h-full relative">
                                                    <ul className="flex flex-col justify-between h-[100%] py-3.5 text-[24px] font-medium">
                                                      <div className=" flex flex-col gap-1.5">
                                                        <li>
                                                          <SeateBoxes
                                                            status=""
                                                            row="A"
                                                            col={i + 1}
                                                          />
                                                        </li>
                                                        <li>
                                                          <SeateBoxes
                                                            status=""
                                                            row="B"
                                                            col={i + 1}
                                                          />
                                                        </li>
                                                        <li>
                                                          <SeateBoxes
                                                            row="C"
                                                            col={i + 1}
                                                          />
                                                        </li>
                                                      </div>
                                                      <div className=" flex flex-col gap-1.5">
                                                        <li>
                                                          <SeateBoxes
                                                            status=""
                                                            row="D"
                                                            col={i + 1}
                                                          />
                                                        </li>
                                                        <li>
                                                          <SeateBoxes
                                                            status=""
                                                            row="E"
                                                            col={i + 1}
                                                          />
                                                        </li>
                                                        <li>
                                                          <SeateBoxes
                                                            row="F"
                                                            status=""
                                                            col={i + 1}
                                                          />
                                                        </li>
                                                      </div>
                                                    </ul>
                                                    <div className="absolute text-[16px] bottom-[-45px] left-1 text-center font-semibold">
                                                      {i + 1}
                                                    </div>
                                                  </div>
                                                </>
                                              )
                                            )}
                                          </div>
                                        </>
                                      )}

                                      {!loading && (
                                        <>
                                          {ele?.seatMap?.map((st, i) => {
                                            return (
                                              <>
                                                <div className="h-[100%] flex gap-3 py-3.5 px-8  w-[90%]">
                                                  {st?.rows?.map((rw, j) => {
                                                    return (
                                                      <>
                                                        <div
                                                          key={j}
                                                          className="flex  h-full relative"
                                                        >
                                                          <ul className="flex flex-col justify-between h-[100%] py-3.5 text-[24px] font-medium">
                                                            {rw.seats.map(
                                                              (seat, index) => (
                                                                <SeateBoxes
                                                                  key={index}
                                                                  status={
                                                                    seat?.availability
                                                                  }
                                                                  row={
                                                                    seat?.seatNumber
                                                                  }
                                                                  col={
                                                                    index + 1
                                                                  }
                                                                  price={
                                                                    seat?.price
                                                                  }
                                                                  passengerKey={
                                                                    seat?.seatCode
                                                                  }
                                                                  segmentKey={
                                                                    ele?.segmentKey
                                                                  }
                                                                  group={
                                                                    seat?.group
                                                                  }
                                                                  onClick={
                                                                    handleSeatClick
                                                                  }
                                                                  deselectedAll={
                                                                    deselectedAll
                                                                  }
                                                                  setDeselectedAll={
                                                                    setDeselectedAll
                                                                  }
                                                                  seatCode={
                                                                    seat?.seatCode
                                                                  }
                                                                  seatNumber={
                                                                    seat?.seatNumber
                                                                  }
                                                                  tbId={tbId}
                                                                  //    noOfAdults={noOfAdults}
                                                                />
                                                              )
                                                            )}
                                                          </ul>
                                                          <div className="absolute text-16 bottom-[-45px] left-1 text-center font-semibold">
                                                            {j + 1}
                                                          </div>
                                                        </div>
                                                      </>
                                                    );
                                                  })}
                                                </div>
                                              </>
                                            );
                                          })}
                                          <></>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex gap-[26%] pr-20 pt-10 pb-10 items-center">
                                    <p
                                      className="w-[10.2%] absolute left-[16%] cursor-pointer  bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
                                      onClick={handleSeatDeselection}
                                    >
                                      Remove all seats
                                    </p>
                                    <div className="flex gap-6 text-center items-center">
                                      <p className="absolute right-[40%]">
                                        {formattedTotalPrice} AED
                                      </p>
                                      <button
                                        className="absolute right-[34%] bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
                                        onClick={() => {
                                          toggleModal("");
                                        }}
                                      >
                                        Done
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                              {
                                /* } */
                              }
                              return null; // Return null for other flights that don't match the condition
                            }
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {flightFullData?.mealsSsr?.length > 0 && (
                    <div className="md:flex gap-2 py-2 text-gray-500 font-[550] border-dashed">
                      <div className="md:block hidden text-[25px]">
                        <GiMeal />
                      </div>
                      <div className="md:flex md:flex-col md:w-[38.3%]">
                        <div className="flex gap-2">
                          <div className="text-[25px] md:hidden">
                            <GiMeal />
                          </div>
                          <h2 className="text-[18px] font-medium max-w-xs">
                            {selectedAddOns.meal.length > 0
                              ? "Meals Added"
                              : "Add delicious meals"}
                          </h2>
                        </div>
                        <p className="text-xs text-orange-500">
                          Meals are cheaper when pre-booked
                        </p>
                        {flightFullData?.mealsSsr?.length > 0 && (
                          <div className=" gap-2 py-2 text-sm text-gray-500 font-[550] border-dashed">
                            <div className="">
                              {/* {selectedAddOns.meal.length > 0 && (
                                <div className="flex ">
                                  {selectedAddOns.meal.map(
                                    (selectedMeal, selectedMealIndex) => {
                                      // Check if the selectedMeal's segmentKey matches any of the meal segments
                                      const mealSegmentMatch =
                                        flightFullData?.mealsSsr.find(
                                          (mealSegment) =>
                                            mealSegment.segmentKey ===
                                            selectedMeal.segmentKey
                                        );

                                      if (mealSegmentMatch) {
                                        return (
                                          <div
                                            key={selectedMealIndex}
                                            className="flex text-sm gap-4 ml-[-28px]"
                                          >
                                            <p>
                                              {mealSegmentMatch.origin}{" "}
                                              {mealSegmentMatch.from} -{" "}
                                              {mealSegmentMatch.destination}{" "}
                                              {mealSegmentMatch.to}
                                            </p>
                                            <p className="text-sm">Meals Added</p>
                                            
                                          </div>
                                        );
                                      }
                                      return null; // Don't render if there's no match
                                    }
                                  )}
                                </div>
                              )} */}

                              {selectedAddOns.meal.length > 0 && (
                                <>
                                  {flightFullData?.mealsSsr.map(
                                    (segment, segmentIndex) => (
                                      <div
                                        key={segmentIndex}
                                        className="text-xs flex ml-[-10%] gap-2 mb-2 mt-2"
                                      >
                                        {flightFullData?.priceQuoteResponse?.trips
                                          .filter((trip) =>
                                            trip.flightSegments.some(
                                              (flightSegment) =>
                                                flightSegment.key ===
                                                segment.segmentKey
                                            )
                                          )
                                          .map((trip, tripsegment) => (
                                            <p>{trip?.direction}</p>
                                          ))}
                                        <p>
                                          {segment.from} - {segment.to}
                                        </p>
                                        <p>
                                          {getSelectedMealsCount(
                                            segment?.segmentKey
                                          ) > 0 && <span>meals added</span>}
                                        </p>
                                        {getSelectedMealsCount(
                                          segment?.segmentKey
                                        ) === 0 ? (
                                          <p>No meals added</p>
                                        ) : (
                                          <p>for travellers</p>
                                        )}
                                      </div>
                                    )
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="md:ml-96">
                        <button
                          type="button"
                          className="text-sm rounded w-full h-8 border-orange-500 hover:border-orange-700 text-orange-500 p-1 border  md:w-36"
                          onClick={() => {
                            toggleModal("mealModal");
                          }}
                        >
                          {selectedAddOns.meal.length > 0
                            ? "Change"
                            : "View menu"}
                        </button>
                      </div>
                    </div>
                  )}

                  {modalsState?.mealModal && (
                    <div className="">
                      <div
                        id="defaultModal"
                        tabindex="-1"
                        aria-hidden="true"
                        className=" fixed md:flex md:justify-center items-center backdrop-blur-sm top-0 left-0 right-0 z-50 w-full p-4 overflow-x-auto overflow-y-auto md:inset-0 h-[calc(100%-1rem)]  max-h-full"
                      >
                        <div className="relative shadow-lg max-w-1xl max-h-full w-[850px]">
                          <div className=" bg-white rounded-lg shadow-lg dark:bg-white p-5 h-[650px]   overflow-hidden">
                            <div className="flex items-start justify-between p-4  rounded-t">
                              <button
                                type="button"
                                onClick={() => {
                                  toggleModal("");
                                }}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-300 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-300 dark:hover:text-white"
                                data-modal-hide="defaultModal"
                              >
                                <svg
                                  aria-hidden="true"
                                  className="w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                              </button>
                            </div>

                            <div className="text-center border-b pb-2">
                              <h1 className="font-bold">
                                Add in-flight meals to your journey
                              </h1>
                              <p className="text-xs text-green-600">
                                Meals are cheaper when pre-booked
                              </p>
                            </div>

                            <div className="">
                              <div className="flex gap-20 ">
                                <div className="ml-2 text-sm">
                                  <div className="pt-4">
                                    {/* <p className="pl-1">Onwards</p> */}
                                    {flightFullData?.mealsSsr?.map(
                                      (ele, index) => {
                                        return (
                                          <div
                                            onClick={() => handleClick(index)}
                                          >
                                            {flightFullData?.priceQuoteResponse?.trips
                                              .filter((trip) =>
                                                trip.flightSegments.some(
                                                  (flightSegment) =>
                                                    flightSegment.key ===
                                                    ele.segmentKey
                                                )
                                              )
                                              .map((trip, tripsegment) => (
                                                <p>{trip?.direction}</p>
                                              ))}
                                            <div
                                              className={`flex gap-8 text-center items-center cursor-pointer rounded-sm p-2 mb-2 font-bold ${
                                                clickedDiv === index
                                                  ? "bg-blue-100"
                                                  : "bg-white" // Use your desired background color class
                                              }`}
                                            >
                                              <button
                                                type="button"
                                                className=" p-1"
                                              >
                                                {ele?.origin} {ele?.from} -{" "}
                                                {ele?.destination} {ele?.to}
                                              </button>
                                              <p className="text-sm bg-white rounded-xl pl-2 pr-2">
                                                {getSelectedMealsCount(
                                                  ele?.segmentKey || ele?.legKey
                                                )}
                                                /{maxSeatsAllowed}
                                              </p>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>

                                  {/* <div className="pointer-events-none text-gray-200">
                                    <div className="pt-4 ">
                                      <p className="pl-1">Return</p>

                                      <div
                                        onClick={() => handleClick(3)}
                                        className={`flex gap-8 text-center items-center cursor-pointer rounded-sm p-2 ${
                                          clickedDiv === 3
                                            ? "bg-blue-100"
                                            : "bg-white" // Use your desired background color class
                                        }`}
                                      >
                                        <div className="flex gap-2">
                                          <p className="font-bold">DXB</p>
                                          <p>-</p>
                                          <p className="font-bold">KWI</p>
                                        </div>

                                        <p className="text-sm bg-white rounded-xl pl-2 pr-2">
                                          0/2
                                        </p>
                                      </div>

                                      <div
                                        onClick={() => handleClick(4)}
                                        className={`flex gap-8 text-center items-center cursor-pointer rounded-sm p-2 mt-2 ${
                                          clickedDiv === 4
                                            ? "bg-blue-100"
                                            : "bg-white" // Use your desired background color class
                                        }`}
                                      >
                                        <div className="flex gap-2">
                                          <p className="font-bold">KWI</p>
                                          <p>-</p>
                                          <p className="font-bold">COK</p>
                                        </div>

                                        <p className="text-sm bg-white rounded-xl pl-2 pr-2">
                                          0/2
                                        </p>
                                      </div>
                                    </div>
                                  </div> */}
                                </div>

                                <div className="">
                                  <div className=" py-4 h-[450px] overflow-y-auto  w-full">
                                    <div className="overflow-y-auto">
                                      {flightFullData?.mealsSsr?.map(
                                        (ele, index) => {
                                          if (index === clickedDiv) {
                                            return (
                                              <>
                                                {ele?.meals?.map(
                                                  (ml, index) => {
                                                    return (
                                                      <div key={index}>
                                                        <div className="flex gap-20">
                                                          <div className="flex gap-10 items-center">
                                                            <div>
                                                              <img
                                                                src={
                                                                  ml?.mealImage ||
                                                                  "https://img.freepik.com/free-vector/fast-food-set-with-hamburger-hotdog_1308-102865.jpg?w=2000"
                                                                }
                                                                alt=""
                                                                className="h-8 w-8"
                                                              />
                                                            </div>
                                                            <div className="max-w-[190px] min-w-[150px]">
                                                              <p
                                                                className="text-xs font-bold"
                                                                style={{
                                                                  wordWrap:
                                                                    "break-word",
                                                                  maxWidth:
                                                                    "20ch",
                                                                }}
                                                              >
                                                                {ml?.mealInfo}
                                                              </p>
                                                            </div>
                                                            <div className="flex gap-4 items-center">
                                                              <div className="">
                                                                <p className="text-xs font-bold">
                                                                  {" "}
                                                                  {
                                                                    ml?.price
                                                                  }{" "}
                                                                  AED
                                                                </p>
                                                              </div>
                                                              <div>
                                                                <FlightMealCountButton
                                                                  ml={ml}
                                                                  legKey={
                                                                    ele?.legKey
                                                                  }
                                                                  updateTotalPrice={
                                                                    updateTotalPrice
                                                                  }
                                                                  totalMealPrice={
                                                                    totalMealPrice
                                                                  }
                                                                  resetMealCount={
                                                                    resetMealCount
                                                                  }
                                                                  deselectedAllMeals={
                                                                    deselectedAllMeals
                                                                  }
                                                                  setDeselectedAllMeals={
                                                                    setDeselectedAllMeals
                                                                  }
                                                                  segmentKey={
                                                                    ele?.segmentKey ||
                                                                    ele?.legKey
                                                                  }
                                                                  segmentKeys={
                                                                    segmentKeys
                                                                  }
                                                                  mealInfos={
                                                                    mealInfos
                                                                  }
                                                                  tbId={tbId}
                                                                  firstKey={
                                                                    flightFirstSegment
                                                                  }
                                                                  from={
                                                                    ele?.from
                                                                  }
                                                                  to={ele?.to}
                                                                />
                                                              </div>
                                                            </div>
                                                          </div>

                                                          <div></div>
                                                        </div>
                                                      </div>
                                                    );
                                                  }
                                                )}
                                              </>
                                            );
                                          }
                                        }
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-[26%] pr-20 pt-10 pb-10 items-center">
                                <p
                                  className="w-[24%] absolute left-5 bg-white cursor-pointer  hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
                                  onClick={handleMealsDeselection}
                                >
                                  Remove all meals
                                </p>
                                <div className="flex gap-6 text-center items-center">
                                  <p className="absolute right-[24%]">
                                    {formattedTotalMealPrice} AED
                                  </p>
                                  <button
                                    className="absolute right-[10%] bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
                                    onClick={() => {
                                      toggleModal("");
                                    }}
                                  >
                                    Done
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* 
                  {modalsState?.luggageModal &&
                    flightFullData?.baggageSsr &&
                    flightFullData.baggageSsr.length > 0 && ( */}
                  {flightFullData?.baggageSsr && flightFullData?.baggageSsr[0]?.baggages?.length > 0 && (
                    <div className="flex">
                      <div className="md:flex gap-2 py-2  text-gray-500 font-[550]   border-dashed px-1 pb-3">
                        <div>
                          <h2 className="text-[18px] flex gap-2 font-medium">
                            {" "}
                            <span className="text-[25px] ">
                              <RiLuggageCartLine />{" "}
                            </span>{" "}
                            {selectedAddOns.luggage.length > 0
                              ? "Luggage Added"
                              : "Add Extra Luggage"}
                          </h2>
                          <p className="text-xs text-orange-500 pl-8">
                            Luggage is cheaper when pre-booked
                          </p>

                          {flightFullData?.baggageSsr.length > 0 && (
                            <div className="flex gap-2 py-2 text-gray-500 font-[550] border-dashed">
                              {/* <div className="text-[25px]">
      <RiLuggageCartLine />
    </div> */}
                              <div className="flex flex-col w-[38.3%]">
                                {/* <h2 className="text-[18px] font-medium max-w-xs">
        {selectedAddOns.luggage.length > 0
          ? "Luggage Added"
          : "Add Extra Luggage"}
      </h2>
      <p className="text-xs text-orange-500 pl-8">
        Luggage is cheaper when <br /> pre-booked
      </p> */}
                                {selectedAddOns.luggage.length > 0 && (
                                  <div className="">
                                    {selectedAddOns.luggage.map(
                                      (
                                        selectedLuggage,
                                        selectedLuggageIndex
                                      ) => {
                                        // Check if the selectedLuggage's segmentKey matches any of the luggage segments
                                        const luggageSegmentMatch =
                                          flightFullData?.priceQuoteResponse?.trips.find(
                                            (trip) =>
                                              trip?.key ===
                                              selectedLuggage.segmentKey
                                          );

                                        if (luggageSegmentMatch) {
                                          // Find the corresponding luggage segment
                                          const baggageSegment =
                                            flightFullData?.baggageSsr.find(
                                              (luggageSegment) =>
                                                luggageSegment.journeyKey ===
                                                luggageSegmentMatch.key
                                            );

                                          if (baggageSegment) {
                                            return (
                                              <div
                                                key={selectedLuggageIndex}
                                                className="flex ml-[-6px] gap-1 mb-2 text-xs"
                                              >
                                                {flightFullData?.priceQuoteResponse?.trips
                                                  .filter((trip) =>
                                                    trip.flightSegments.some(
                                                      (flightSegment) =>
                                                        trip.key ===
                                                        selectedLuggage.segmentKey
                                                    )
                                                  )
                                                  .map((trip, tripsegment) => (
                                                    <p className="mr-2">
                                                      {trip?.direction}
                                                    </p>
                                                  ))}
                                                <p>
                                                  {baggageSegment.origin}{" "}
                                                  {baggageSegment.from}
                                                </p>
                                                <p>- </p>
                                                <p>
                                                  {baggageSegment.destination}{" "}
                                                  {baggageSegment.to}
                                                </p>
                                                <div className=" ml-4 flex gap-1">
                                                  <p>extra</p>
                                                  <p>luggage</p>
                                                  <p>added</p>
                                                </div>
                                                {/* <p>Extra Luggage Added</p> */}
                                              </div>
                                            );
                                          }
                                        }
                                        return null; // Don't render if there's no match
                                      }
                                    )}

                                    {/* {selectedAddOns.meal.length > 0 && (
                                      <>
                                        {flightFullData?.baggageSsr.map(
                                          (segment, segmentIndex) => (
                                            <div
                                              key={segmentIndex}
                                              className="text-xs flex gap-2 mb-2 mt-2"
                                            >
                                              {flightFullData?.priceQuoteResponse?.trips
                                                .filter((trip) =>
                                                  trip.flightSegments.some(
                                                    (flightSegment) =>
                                                      trip.key ===
                                                      segment.segmentKey
                                                  )
                                                )
                                                .map((trip, tripsegment) => (
                                                  <p>{trip?.direction}</p>
                                                ))}
                                              <div className="flex gap-1">
                                                <p>{segment.from}</p>
                                                <p>-</p>
                                                <p>{segment.to}</p>
                                              </div>
                                              <p>
                                                <div className="flex gap-1">
                                                  <p>extra</p>
                                                  <p>luggage</p>
                                                  <p>added</p>
                                                </div>
                                              </p>
                                              {getSelectedLuggagesCount(
                                                segment?.segmentKey
                                              ) === 0 ? (
                                                <p>No extra luggage added</p>
                                              ) : (
                                                <div className="flex gap-1">
                                                  <p>for </p>
                                                  <p>
                                                    {getSelectedLuggagesCount(
                                                      segment?.segmentKey
                                                    )}
                                                    /{maxSeatsAllowed}
                                                  </p>
                                                  <p>travellers</p>
                                                </div>
                                              )}
                                            </div>
                                          )
                                        )}
                                      </>
                                    )} */}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="md:ml-96">
                          <button
                            type="button"
                            className="text-sm rounded h-8 md:ml-[40%] -ml-1 w-[105.6%] border-orange-500 hover:border-orange-700 text-orange-500 p-1 text-center  border md:w-36 "
                            onClick={() => {
                              toggleModal("luggageModal");
                            }}
                          >
                            {selectedAddOns.luggage.length > 0
                              ? "Change"
                              : "View luggage"}
                          </button>
                        </div>
                      </div>
                      {/* <p className="ml-10  text-[10px] text-green-600 ">Baggage is cheaper when pre-booked</p> */}
                    </div>
                  )}

                  {/* )} */}
                  {modalsState?.luggageModal &&
                    flightFullData?.baggageSsr &&
                    flightFullData.baggageSsr.length > 0 && (
                      <div className="">
                        <div
                          id="defaultModal"
                          tabindex="-1"
                          aria-hidden="true"
                          className=" fixed md:flex md:justify-center items-center backdrop-blur-sm top-0 left-0 right-0 z-50 w-full p-4 overflow-x-auto overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                        >
                          <div className="relative shadow-lg max-w-1xl max-h-full w-[850px]">
                            <div className=" bg-white rounded-lg shadow-lg dark:bg-white p-5 h-[600px]  ">
                              <div className="flex items-start justify-between p-4  rounded-t">
                                <button
                                  type="button"
                                  onClick={() => {
                                    toggleModal("luggageModal");
                                  }}
                                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-300 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-300 dark:hover:text-white"
                                  data-modal-hide="defaultModal"
                                >
                                  <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clip-rule="evenodd"
                                    ></path>
                                  </svg>
                                </button>
                              </div>

                              <div className="text-center border-b pb-2">
                                <h1 className="font-bold">
                                  Add in-flight luggage to your journey
                                </h1>
                                <p className="text-xs text-green-600">
                                  Luggage are cheaper when pre-booked
                                </p>
                              </div>

                              <div className="">
                                <div className="flex gap-20 ">
                                  <div className="ml-2 text-sm">
                                    {flightFullData?.baggageSsr?.map(
                                      (ele, index) => {
                                        return (
                                          <div className="pt-4">
                                            {/* <p className="pl-1">Onwards</p> */}
                                            <div
                                              className={`flex gap-8 text-center items-center cursor-pointer rounded-sm p-2 ${
                                                clickedDiv === index
                                                  ? "bg-blue-100"
                                                  : "bg-white" // Use your desired background color class
                                              }`}
                                              onClick={() => handleClick(index)}
                                            >
                                              <button
                                                type="button"
                                                className="p-1"
                                              >
                                                {ele?.origin} {ele?.from} -{" "}
                                                {ele?.destination} {ele?.to}
                                              </button>
                                              <p className="text-sm bg-white rounded-xl pl-2 pr-2">
                                                {getSelectedLuggagesCount(
                                                  ele?.journeyKey ||
                                                    ele?.segmentKey
                                                )}
                                                /{maxSeatsAllowed}
                                              </p>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}

                                    {/* <div className="pt-4 pointer-events-none text-gray-200">
                                      <p className="pl-1">Return</p>

                                      <div
                                        onClick={() => handleClick(7)}
                                        className={`flex gap-8 text-center items-center cursor-pointer rounded-sm p-2 ${
                                          clickedDiv === 7
                                            ? "bg-blue-100"
                                            : "bg-white" // Use your desired background color class
                                        }`}
                                      >
                                        <div className="flex gap-2">
                                          <p className="font-bold">DXB</p>
                                          <p>-</p>
                                          <p className="font-bold">COK</p>
                                        </div>

                                        <p className="text-sm bg-white rounded-xl pl-2 pr-2">
                                          0/2
                                        </p>
                                      </div>
                                    </div> */}
                                  </div>

                                  <div className="">
                                    <div>
                                      <div className="relative py-4">
                                        <div className="overflow-y-scroll">
                                          {flightFullData?.baggageSsr?.map(
                                            (ele, index) => {
                                              if (index === clickedDiv) {
                                                return (
                                                  <>
                                                    {(
                                                      ele?.baggages ||
                                                      ele?.baggage
                                                    )?.map((bg, index) => {
                                                      return (
                                                        <div key={index}>
                                                          <div className="flex gap-5 items-center">
                                                            <div className="flex gap-24 items-center">
                                                              <div>
                                                                <TbLuggage />
                                                              </div>
                                                              <div className="max-w-[190px] min-w-[150px]">
                                                                <p className="text-xs font-bold">
                                                                  {
                                                                    bg?.baggageInfo
                                                                  }
                                                                </p>
                                                              </div>
                                                              <div className="flex items-center gap-2">
                                                                <div>
                                                                  <p className="text-xs font-bold">
                                                                    {" "}
                                                                    {
                                                                      bg?.price
                                                                    }{" "}
                                                                    AED
                                                                  </p>
                                                                </div>
                                                                <div>
                                                                  <FlightBaggageAddButton
                                                                    bg={bg}
                                                                    journeyKey={
                                                                      ele?.journeyKey
                                                                    }
                                                                    updateTotalLuggagePrice={
                                                                      updateTotalLuggagePrice
                                                                    }
                                                                    totalLuggagePrice={
                                                                      totalLuggagePrice
                                                                    }
                                                                    updateTotalCount={
                                                                      updateTotalCount
                                                                    }
                                                                    setDeselectedAllLuggages={
                                                                      setDeselectedAllLuggages
                                                                    }
                                                                    segmentKey={
                                                                      ele?.journeyKey
                                                                    }
                                                                    deselectedAllLuggages={
                                                                      deselectedAllLuggages
                                                                    }
                                                                    baggageSegmentKeys={
                                                                      baggageSegmentKeys
                                                                    }
                                                                    tbId={tbId}
                                                                  />
                                                                </div>
                                                              </div>
                                                            </div>

                                                            <div></div>
                                                          </div>
                                                        </div>
                                                      );
                                                    })}
                                                  </>
                                                );
                                              }
                                            }
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-[26%] pr-20 pt-10 pb-10 items-center">
                                <p
                                  className="w-[24%] absolute left-5 bg-white cursor-pointer  hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow bottom-2"
                                  onClick={handleLuggagesDeselection}
                                >
                                  Remove all luggage
                                </p>
                                <div className="flex gap-6 text-center items-center">
                                  <p className="absolute right-[24%] bottom-1">
                                    {formattedTotalLuggagePrice} AED
                                  </p>
                                  <button
                                    className="absolute bottom-1 right-[10%] bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow"
                                    onClick={() => {
                                      toggleModal("luggageModal");
                                    }}
                                  >
                                    Done
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
                
                {/* <div className="p-2 rounded shadow-md">
                <h1 className="text-xl font-bold mb-2"><span className="text-orange-500">International</span> Destination Insurance</h1>
                <div className="md:flex md:justify-between">
                <div className="flex md:mb-0 mb-4 gap-2 items-center shadow-md w-fit p-1 rounded">
                    <div>
                      <MdHealthAndSafety size={24} />
                    </div>
                    <div>
                      <h1 className="text-gray-400">Upto <span className="font-semibold">$ 250000</span></h1>
                      <h1 className="text-xs">Emergency Medical Expenses</h1>
                    </div>
                  </div>


                  <div className="flex gap-2 md:mb-0 mb-4  items-center shadow-md w-fit p-1 rounded">
                    <div>
                      <FaPlaneCircleXmark size={24} />
                    </div>
                    <div>
                      <h1 className="text-gray-400">Upto <span className="font-semibold">$ 2500</span></h1>
                      <h1 className="text-xs">Trip Cancellation and/or Interruption</h1>
                    </div>
                  </div>

                  <div className="flex gap-2 md:mb-0 mb-4  items-center shadow-md w-fit p-1 rounded">
                    <div>
                      <RiLuggageCartFill size={24} />
                    </div>
                    <div>
                      <h1 className="text-gray-400">Upto <span className="font-semibold">$ 500</span></h1>
                      <h1 className="text-xs">Delay of Checked in baggage</h1>
                    </div>
                  </div>


                  <div 
                  onClick={() => setInsuranceBenefits(!insuranceBenefits)}
                  className="flex items-center w-full justify-center md:justify-normal cursor-pointer shadow-md md:w-fit text-orange-500 gap-2 p-1 rounded">
                    <div>
                    <h1 className="text-xs">View All 5 Benefits</h1>
                    </div>
                    <div>
                    <FaArrowRight size={18} />
                    </div>
                  </div>
                  {insuranceBenefits && (
                    <FlightInsuranceBenefits insuranceBenefits={insuranceBenefits} setInsuranceBenefits={setInsuranceBenefits} />
                  )}
                </div>

                <div className="mt-6">
                <div className="flex items-center gap-2">
                 <button 
                 onClick={() => setInsurancePlans(!insurancePlans)}
                 className="border text-xs md:text-md w-full md:w-fit border-orange-500 hover:border-orange-700 text-orange-500  rounded p-2 font-semibold mb-4">View Available Insurance Plans</button>
                   {insurancePlans && (
                    <FlightInsurancePlans insurancePlans={insurancePlans} setInsurancePlans={setInsurancePlans} />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded-full h-4 w-4" />
                  <h1><span className="font-semibold">No,</span> I’ll take the risk.</h1>
                </div>
                </div>


                <div className="bg-gray-50 text-xs mt-3 p-2 rounded">
                  <h1>Don't let a flight delay or cancellation add to your worries. Get your trip Insured.</h1>
                </div>

                <div className="my-4">
                  <h1><span className="font-bold">Valid for UAE Travel.</span> Over <span className="font-bold">50K</span> Travellers Insured in the last 3 months!</h1>
                </div>

                <div><p className="text-xs">By adding insurance you confirm all passengers are between 2 to 70 years of age, and agree to the <span className="text-orange-500">Terms & Conditions.</span></p></div>
                </div> */}

                <div className="mt-9 flex">
                  <button
                    onClick={fetchDataAddSsr}
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-700 text-[18px] w-6/12 md:w-fit text-white px-3 py-2 rounded mr-2"
                  >
                    {isButtonLoading ? <BtnLoader /> : "Continue"}
                  </button>
                  {!selectedAddOns ||
                  (selectedAddOns.seats.length === 0 &&
                    selectedAddOns.meal.length === 0) ? (
                    <button
                      onClick={fetchDataAddSsr}
                      type="submit"
                      className="text-sm rounded text-[18px] px-3 py-2 w-6/12 md:w-fit  border border-orange-500 hover:border-orange-700 text-orange-500"
                    >
                      Skip this step
                    </button>
                  ) : null}
                </div>
              </div>
            )}
          </form>
          {/* Your return content */}
        </div>
      </div>
    </>
  );
};

export default FlightAddOns;
