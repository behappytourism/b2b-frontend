import React, { useEffect, useState } from "react";
import { BsArrowRightCircle, BsCheck2Circle } from "react-icons/bs";
import { FaQuoteRight } from "react-icons/fa";
import { IoChevronBackSharp } from "react-icons/io5";
import {
  MdArrowBackIosNew,
  MdOutlineFlight,
  MdOutlineFlightLand,
  MdOutlineFlightTakeoff,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SearchCards from "../../components/Cards/SearchCards";
import VisaApplyCard from "../Visa/VisaApplyCard";
import FlightAddOns from "./FlightAddOns";
import FlightItinerary from "./FlightItinerary";
import PaymentSection from "./PaymentSection";
import TravellerDetails from "./TravellerDetails";
import FlightCotactDetails from "./FlightCotactDetails";
import { BsArrowRight } from "react-icons/bs";
import FlightDetailCard from "./FlightDetailCard";
import {
  handleFullData,
  resetSelectedAddOns,
  setSelectedFlight,
} from "../../../redux/slices/flightSlice";
import axios from "../../../axios";

const FlightBookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const { tbId } = useParams(); // Extract the "bookingId" from the URL path
  const { token } = useSelector((state) => state.agents);
  const dispatch = useDispatch();
  const [flights, setFlights] = useState([]);
  const [flightAncillary, setFlightAnchillary] = useState([]);
  const [selectedFlightData, setSelectedFlightData] = useState(null); // Initialize it as null
  const [hasScrolled, setHasScrolled] = useState(false);

  const { flightFullData, selectedAddOns } = useSelector(
    (state) => state.flight
  );

  const { selectedFlight, travellers } = useSelector((state) => state.flight);

  // // Retrieve the data from localStorage
  //   const selectedFlightData = JSON.parse(localStorage.getItem("selectedFlight"));
  //  dispatch(setSelectedFlight(selectedFlightData));
  //   console.log(selectedFlightData, "local storage")

  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(
      localStorage.getItem("selectedFlight")
    );
    setSelectedFlightData(dataFromLocalStorage);
    dispatch(setSelectedFlight(selectedFlightData));
   // console.log(dataFromLocalStorage, "local storage");
  }, []);

  //console.log(selectedFlightData, "selectedFlightData ")

  // useEffect(() => {
  //   if (tbId === ":tbId" && selectedFlightData) {
  //     bookingData();
  //   }
  // }, [selectedFlightData]);

  useEffect(() => {
    fetchAllData(tbId);
  }, []);

  const [loading, setLoading] = useState(false);
  const [ancillaryLoading, setAncillaryLoading] = useState(false);
  const [errorAncillary, setErrorAncillary] = useState(null);
  const [ancillaryError, setAncillaryError] = useState("");

  const handleClick = () => {
    navigate(`/flight/order/results`);
  };

  // const data = {
  // noOfAdults: selectedFlightData?.data?.noOfAdults,
  // noOfChildren: selectedFlightData?.data?.noOfChildren,
  // noOfInfants: selectedFlightData?.data?.noOfInfants,
  // searchId: selectedFlightData?.searchId,
  // type: selectedFlightData?.data?.type,
  //  fsrId: selectedFlightData?.data?.fsrId,
  //selectedFareKey: selectedFlightData?.fareKey,
  // identifierToken: selectedFlightData?.data?.identifierToken,
  // travelClass: selectedFlightData?.data?.travelClass,
  // };

  // const data = {
  //   noOfAdults: selectedFlightData?.noOfAdults,
  //   noOfChildren: selectedFlightData?.noOfChildren,
  //   noOfInfants: selectedFlightData?.noOfInfants,
  //   travelClass: selectedFlightData?.travelClass,
  //   type: selectedFlightData?.type,
  //   trips:
  //     selectedFlightData?.type === "oneway"
  //       ? selectedFlightData?.trips?.map((trip) => ({
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
  //       : selectedFlightData?.type === "return"
  //       ? selectedFlightData?.trips?.map((trip) => ({
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
  //   identifierToken: selectedFlightData?.identifierToken,
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
  //       // Convert arrays to strings and store in local storage

  //       // Pass to "/flight/booking"
  //       // navigate("/flight/booking");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const fetchAllData = async (tbId) => {
    setLoading(true);
    try {
      const res = await axios.get(`/b2b/flight/details/${tbId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        dispatch(handleFullData(res.data || []));
        fetchAllAncillaryData(tbId);
        handleDataFetchSuccess();
        setLoading(false);
      }
    } catch (err) {
      if (err.response) {
        console.error("Error response from the server:", err.response);
      } else {
        console.error("An error occurred:", err.message);
      }
    }
  };

  const fetchAllAncillaryData = async (tbId) => {
    setAncillaryLoading(true);
    setErrorAncillary(null);
    try {
      const res = await axios.get(`/b2b/flight/details/${tbId}/ancillaries`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setFlightAnchillary(res?.data);
        dispatch(handleFullData(res.data || []));
        handleDataFetchSuccess();
        setAncillaryLoading(false);
      }
    } catch (err) {
      if (err.response) {
        console.error("Error response from the server:", err.response);
        setErrorAncillary(err);
        setAncillaryError(err?.response?.statusText)
      } else {
        console.error("An error occurred:", err.message);
      }
    }
  };

  const handleDataFetchSuccess = () => {
    setLoading(false); // Set loading to false when data fetch is successful
  };

  const handleDataFetchTravellerSuccess = () => {
    setLoading(false); // Set loading to false when data fetch is successful
  };

  const handleContinueClick = () => {
    setLoading(true); // Set loading to true when the button is clicked
  };

  const calculateTotalPrice = () => {
    const flightFare =
      (flightFullData?.priceQuoteResponse || flightFullData)?.netFare || 0;

    const seatPrices =
      selectedAddOns?.seats?.reduce(
        (total, seat) => total + seat.seatPrice,
        0
      ) || 0;

    const mealPrices =
      selectedAddOns?.meal?.reduce(
        (total, meal) => total + meal.mealPrice,
        0
      ) || 0;

    const luggagePrices =
      selectedAddOns?.luggage?.reduce(
        (total, luggage) => total + luggage.baggagePrice,
        0
      ) || 0;

    const totalPrice = flightFare + seatPrices + mealPrices + luggagePrices;
    return totalPrice.toFixed(2);
  };

  const calculateTotalSeatPrice = (selectedAddOns) => {
    const seatPrices =
      selectedAddOns?.seats?.reduce(
        (total, seat) => total + seat.seatPrice,
        0
      ) || 0;

    return seatPrices;
  };

  const totalSeatPrice = calculateTotalSeatPrice(selectedAddOns);

  const calculateTotalMealPrice = (selectedAddOns) => {
    const mealPrices =
      selectedAddOns?.meal?.reduce(
        (total, meal) => total + meal.mealPrice,
        0
      ) || 0;

    return mealPrices;
  };

  const totalMealPrice = calculateTotalMealPrice(selectedAddOns);

  const calculateTotalLuggagePrice = (selectedAddOns) => {
    const luggagePrices =
      selectedAddOns?.luggage?.reduce(
        (total, luggage) => total + luggage.baggagePrice,
        0
      ) || 0;

    return luggagePrices;
  };

  const totalLuggagePrice = calculateTotalLuggagePrice(selectedAddOns);

  const [navigation, setNavigation] = useState({
    itenary: true,
    addOns: false,
    contact: false,
    details: false,
    payment: false,
  });

  const [sharedState, setSharedState] = useState(false);

  const updateSharedState = (newValue) => {
    setSharedState(newValue);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* <SearchCards /> */}
      <div className="bg-[#081424] p-4 sticky top-0 z-20 hidden md:flex items-center text-center justify-between">
        <h1 className="text-xl font-bold text-white">Complete your booking</h1>
        <div className="flex gap-4 text-gray-300">
          <li
            // onClick={() =>
            //   setNavigation({
            //     itenary: true,
            //     addOns: false,
            //     details: false,
            //     contact: false,
            //   })
            // }
            className={`text-xs cursor-pointer ${
              navigation.itenary === true ? "text-white" : ""
            } ${navigation.itenary === true ? "animate-pulse" : ""}`}
          >
            Flights Summary
          </li>
          <li
            // onClick={() =>
            //   setNavigation({
            //     itenary: false,
            //     addOns: true,
            //     details: false,
            //     contact: false,
            //   })
            // }
            className={`text-xs cursor-pointer ${
              navigation.addOns === true ? "text-white" : ""
            } ${navigation.addOns === true ? "animate-pulse" : ""}`}
          >
            Seats & Meals
          </li>
          <li
            // onClick={() =>
            //   setNavigation({
            //     itenary: false,
            //     addOns: true,
            //     details: false,
            //     contact: false,
            //   })
            // }
            className={`text-xs cursor-pointer ${
              navigation.addOns === true ? "text-white" : ""
            } ${navigation.addOns === true ? "animate-pulse" : ""}`}
          >
            Add-ons
          </li>
          <li
            // onClick={() =>
            //   setNavigation({
            //     itenary: false,
            //     addOns: false,
            //     details: false,
            //     contact: true,
            //   })
            // }
            className={`text-xs cursor-pointer ${
              navigation.contact === true ? "text-white" : ""
            } ${navigation.contact === true ? "animate-pulse" : ""}`}
          >
            Contact Details
          </li>
          <li
            // onClick={() =>
            //   setNavigation({
            //     itenary: false,
            //     addOns: false,
            //     details: true,
            //     contact: false,
            //   })
            // }
            className={`text-xs cursor-pointer ${
              navigation.details === true ? "text-white" : ""
            } ${navigation.details === true ? "animate-pulse" : ""}`}
          >
            Traveller Details
          </li>
        </div>

        {!loading && (
          <>
            {/* <div
              className={`md:w-3/12 absolute mt-[48%] right-1 max-h-[560px] overflow-x-auto  z-20 text-left `}
            >
              <div className="border rounded-md md:max-w-[285px] md:min-w-[285px] p-3 mr-8 ml-6 ">
                <div className="border-b">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm">Total Price</p>
                    </div>
                    <p>{calculateTotalPrice()} AED</p>
                  </div>
                  <div className="pb-2">
                    <p className="text-xs">
                      {
                        (flightFullData?.priceQuoteResponse || flightFullData)
                          ?.noOfAdults
                      }{" "}
                      Adult(s)
                    </p>
                    {travellers.children > 0 && (
                      <p className="text-xs">
                        {
                          (flightFullData?.priceQuoteResponse || flightFullData)
                            ?.noOfChildren
                        }{" "}
                        Children(s)
                      </p>
                    )}
                    {travellers.infant > 0 && (
                      <p className="text-xs">
                        {
                          (flightFullData?.priceQuoteResponse || flightFullData)
                            ?.noOfInfants
                        }{" "}
                        Infant(s)
                      </p>
                    )}
                  </div>
                </div>
                {(flightFullData?.priceQuoteResponse || flightFullData)
                  ?.totalFee !== 0 && (
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm">Net fare</p>
                    </div>
                    <p className="text-xs">
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      {(
                        flightFullData?.priceQuoteResponse || flightFullData
                      )?.totalFee?.toFixed(2)}{" "}
                      AED
                    </p>
                  </div>
                )}
                <div className="flex justify-between mt-1">
                  <div>
                    <p className="text-sm">Base fare </p>
                  </div>
                  <p className="text-xs">
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    {(
                      flightFullData?.priceQuoteResponse || flightFullData
                    )?.baseFare?.toFixed(2)}{" "}
                    AED
                  </p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm">Taxes and Fees</p>
                  </div>
                  <p className="text-xs">
                    {(
                      flightFullData?.priceQuoteResponse || flightFullData
                    )?.totalTax?.toFixed(2)}{" "}
                    AED
                  </p>
                </div>
                {totalSeatPrice !== 0 && (
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm">Seats AddOns</p>
                    </div>
                    <p className="text-xs">{totalSeatPrice} AED</p>
                  </div>
                )}
                {totalMealPrice !== 0 && (
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm">Meals AddOns</p>
                    </div>
                    <p className="text-xs">{totalMealPrice?.toFixed(2)} AED</p>
                  </div>
                )}
                {totalLuggagePrice !== 0 && (
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm">Luggage AddOns</p>
                    </div>
                    <p className="text-xs">{totalLuggagePrice} AED</p>
                  </div>
                )}
              </div>
              <div className="md:max-w-[340px] md:min-w-[340px]">
                <div className="border p-3 mr-8 ml-6 mt-2 bg-gray-100 rounded-md">
                  <div className="rounded-xl bg-red-500 w-14">
                    <p className="text-white ml-3 text-xs">Note</p>
                  </div>
                  <p className="text-xs pt-2">
                    Hand Baggage: One personal item like a small laptop bag,
                    ladies' purse, infant bag etc.; Only if it fits under the
                    seat in front of you.
                  </p>
                </div>
              </div>
              <div className="flex md:ml-4 mt-2 md:mt-0 mb-20 md:mb-0 justify-start md:mr-0  mr-6 ml-4  overflow-x-auto md:overflow-x-visible relative  ">
                <VisaApplyCard />
              </div>
            </div> */}
          </>
        )}
      </div>

      {loading && (
        <>
          <div className="animate-pulse w-full">
            <div className="p-8">
              <button
                onClick={handleClick}
                className="absolute text-transparent bg-gray-100 h-4 w-14 right-[3%]  hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 rounded shadow"
              >
                GO Back
              </button>
            </div>

            <div className="max-w-screen-xl mx-auto min-h-[100vh] ">
              <div className="w-[100%]">
                <div className="grid grid-cols-4">
                  <div className="w-[95%] col-span-3">
                    <div className="border rounded-md w- p-3">
                      <div>
                        <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                          onwards
                        </p>

                        <div className="absolute left-[30%] mt-[10.5%]">
                          <div className="items-center text-center">
                            <div className="flex justify-center gap-4">
                              <h1 className="text-sm text-transparent mt-8 bg-gray-100 rounded">
                                Layover in calcutta international airport{" "}
                                Kolkata
                              </h1>
                              {/* <h1 className="text-sm text-transparent mt-2 bg-gray-100 rounded">short layover 1h 32m</h1> */}
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 ">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="p-1"></div>
                              <div className="text-stone-500 text-xs">
                                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                  jazeera
                                </p>
                                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                  J45621
                                </p>
                                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                  Economy
                                </p>
                              </div>
                              <div className="Modal section">
                                <div className="mt-4 md:mx-4">
                                  <div className="flex">
                                    <div className="flex flex-col items-center mr-4">
                                      <div>
                                        <div className="flex items-center justify-center w-4 h-4   bg-gray-100 rounded-full "></div>
                                      </div>
                                      <div className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                        <h1>s</h1>
                                        <h1>sd</h1>
                                        <h1>sd</h1>
                                      </div>
                                    </div>
                                    <div className="">
                                      <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                        <span className="text-lg font-bold">
                                          12 : 09
                                        </span>
                                        <span className="text-lg">Kolkata</span>
                                        <span className="text-xs">
                                          Calcutta , terminal 7
                                        </span>
                                      </p>
                                      <div className="mt-1 flex gap-1 items-center text-gray-100 py-3">
                                        <span className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                          dg
                                        </span>
                                        <span className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                          12 hours 34 minutes
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="md:mx-4">
                                  <div className="flex">
                                    <div className="flex flex-col items-center mr-4">
                                      <div>
                                        <div className="flex items-center justify-center w-4 h-4 bg-gray-100 rounded-full "></div>
                                      </div>
                                    </div>
                                    <div className=" pb-8 ">
                                      <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                        <span className="text-lg font-bold ">
                                          10 : 05
                                        </span>
                                        <span className="text-lg">Dubai</span>
                                        <span className="text-xs">
                                          Dubai international airport terminal 9
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="w-[30%]">
                              <div className="flex justify-between">
                                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                  Check-in Baggage
                                </p>

                                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                  Check-in Baggage
                                </p>
                              </div>

                              <div className="flex justify-between">
                                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                  Check-in Baggage
                                </p>

                                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                  Check-in Baggage
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 ">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="p-1"></div>
                              <div className="text-stone-500 text-xs">
                                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                  jazeera
                                </p>
                                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                  J45621
                                </p>
                                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                  Economy
                                </p>
                              </div>
                              <div className="Modal section">
                                <div className="mt-4 md:mx-4">
                                  <div className="flex">
                                    <div className="flex flex-col items-center mr-4">
                                      <div>
                                        <div className="flex items-center justify-center w-4 h-4   bg-gray-100 rounded-full "></div>
                                      </div>
                                      <div className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                        <h1>s</h1>
                                        <h1>sd</h1>
                                        <h1>sd</h1>
                                      </div>
                                    </div>
                                    <div className="">
                                      <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                        <span className="text-lg font-bold">
                                          12 : 09
                                        </span>
                                        <span className="text-lg">Kolkata</span>
                                        <span className="text-xs">
                                          Calcutta , terminal 7
                                        </span>
                                      </p>
                                      <div className="mt-1 flex gap-1 items-center text-gray-300 py-3">
                                        <span className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                          dg
                                        </span>
                                        <span className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                          12 hours 34 minutes
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="md:mx-4">
                                  <div className="flex">
                                    <div className="flex flex-col items-center mr-4">
                                      <div>
                                        <div className="flex items-center justify-center w-4 h-4 bg-gray-100 rounded-full "></div>
                                      </div>
                                    </div>
                                    <div className=" pb-8 ">
                                      <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                        <span className="text-lg font-bold ">
                                          10 : 05
                                        </span>
                                        <span className="text-lg">Dubai</span>
                                        <span className="text-xs">
                                          Dubai international airport terminal 9
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="w-[30%]">
                              <div className="flex justify-between">
                                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                  Check-in Baggage
                                </p>

                                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                  Check-in Baggage
                                </p>
                              </div>

                              <div className="flex justify-between">
                                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                  Check-in Baggage
                                </p>

                                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                                  Check-in Baggage
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-md w- p-3 mt-6">
                      <div className="w-full flex justify-between">
                        <div className="flex gap-4">
                          <div className="text-sm text-transparent h-8 bg-gray-100 rounded">
                            1252121
                          </div>
                          <p className="text-sm text-transparent h-8 bg-gray-100 rounded">
                            Add on jdkdhkad dkidhjkasdhjkf jhsk
                          </p>
                          <p className="text-sm text-transparent h-8 bg-gray-100 rounded">
                            Add on jdkdhkad dkidhjkasdhjkf jhsk
                          </p>
                        </div>

                        <p className="text-sm text-transparent h-8 bg-gray-100 rounded">
                          View Details
                        </p>
                      </div>

                      <div className="w-full flex justify-between mt-4">
                        <div className="flex gap-4">
                          <div className="text-sm text-transparent h-8 bg-gray-100 rounded">
                            1252121
                          </div>
                          <p className="text-sm text-transparent h-8 bg-gray-100 rounded">
                            Add on jdkdhkad dkidhjkasdhjkf jhsk
                          </p>
                          <p className="text-sm text-transparent h-8 bg-gray-100 rounded">
                            Add on jdkdhkad dkidhjkasdhjkf jhsk
                          </p>
                        </div>

                        <p className="text-sm text-transparent h-8 bg-gray-100 rounded">
                          View Details
                        </p>
                      </div>
                    </div>

                    <div className="border rounded-md w- p-3 mt-6 mb-4">
                      <p className="text-sm text-transparent h-8 bg-gray-100 rounded">
                        {" "}
                        Hand Baggage: One personal item like a small laptop bag,{" "}
                      </p>

                      <p className="text-gray-400 font-[400] text-sm text-transparent bg-gray-100 rounded w-[90%] mt-2">
                        +dsjdskljdksaahjdksj{" "}
                      </p>

                      <p className="text-gray-400 font-[400] text-sm text-transparent bg-gray-100 rounded w-[70%] mt-2">
                        +dsjdskljdksaahjdksj{" "}
                      </p>

                      <p className="text-gray-400 font-[400] text-sm text-transparent bg-gray-100 rounded w-[95%] h-20 mt-2">
                        +dsjdskljdksaahjdksj{" "}
                      </p>
                    </div>
                  </div>

                  <div className="w-[100%] col-span-1 pt-8">
                    <div className="border rounded-md w- p-3">
                      <div className="border-b">
                        <div className="flex gap-20">
                          <div>
                            <p className="text-sm text-transparent bg-gray-100 rounded">
                              Total Price
                            </p>
                          </div>
                          <div className="justify-end">
                            <p className="text-transparent bg-gray-100 rounded">
                              {calculateTotalPrice()} AED
                            </p>
                          </div>
                        </div>
                        <div className="pb-5">
                          <p className="text-xs text-transparent bg-gray-100 rounded mt-2">
                            {travellers?.adult} Adults
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-20 pt-4">
                        <div>
                          <p className="text-sm text-transparent bg-gray-100 rounded">
                            Base fare{" "}
                          </p>
                        </div>
                        <div className="justify-end">
                          <p className="text-xs text-transparent bg-gray-100 rounded">
                            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            {selectedFlight?.baseFare?.toFixed(2)} AED
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-20">
                        <div>
                          <p className="text-sm text-transparent bg-gray-100 rounded mt-2">
                            Taxes and Fees
                          </p>
                        </div>
                        <div className="justify-end">
                          <p className="text-xs text-transparent bg-gray-100 rounded mt-2">
                            {selectedFlight?.totalTax?.toFixed(2)} AED
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start relative -left-6  ">
                      <div className="pb-2">
                        <div className="border mx-6 rounded-md px-2 py-3 lg:mt-5 w-80">
                          <div className="hidden lg:block rounded-2xl space-y-4 bg-white p-1 px-4 relative ">
                            <input
                              type="checkbox"
                              className="peer absolute top-5 w-full h-5 inset-x-0  cursor-pointer opacity-0"
                              defaultChecked
                            />
                            <div className="flex justify-between  ">
                              <span className="text-xl text-transparent bg-gray-100 rounded">
                                Contact Us
                              </span>
                              <span className="text-xl text-transparent bg-gray-100 rounded">
                                gff{" "}
                              </span>
                            </div>
                            <div className="peer-checked:max-h-[100vh] max-h-0 transition-all duration-500 overflow-hidden space-y-3">
                              <div className="space-y-1 w-full ">
                                <div className="flex items-center space-x-2 ">
                                  <span className=" text-xs text-transparent bg-gray-100 rounded">
                                    fd
                                  </span>
                                  <span className="text-xs uppercase text-transparent bg-gray-100 rounded">
                                    Phone Number
                                  </span>
                                </div>
                                <div className="">
                                  <p className="text-gray-400 font-[400] text-sm text-transparent bg-gray-100 rounded">
                                    +sdjskdhjskljhksadjhksaldjkl
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2 w-full ">
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs  text-transparent bg-gray-100 rounded">
                                    dfgfd
                                  </span>
                                  <span className="text-xs uppercase text-transparent bg-gray-100 rounded">
                                    Phone Number
                                  </span>
                                </div>
                                <div className="">
                                  <p className="text-gray-400 font-[400] text-sm text-transparent bg-gray-100 rounded">
                                    +dsjdskljdksaahjdksj{" "}
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2 w-full mb-3">
                                <div className="flex items-center space-x-2 ">
                                  <span className="text-xs text-transparent bg-gray-100 rounded ">
                                    fdgfd
                                  </span>
                                  <span className="text-xs uppercase text-transparent bg-gray-100 rounded">
                                    Email Id
                                  </span>
                                </div>
                                <div className="">
                                  <p className="text-gray-400 font-[400] text-sm text-transparent bg-gray-100 rounded">
                                    sdjsdikhjsakdhsdikhskjahd{" "}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="border p-3 bg-white-100 rounded-md">
                        <div className="rounded-xl">
                          <p className=" text-xs text-transparent bg-gray-100 rounded">
                            Note
                          </p>
                        </div>
                        <p className="text-xs mt-2 w-fit text-transparent bg-gray-100 rounded">
                          Hand purse, infant bag etc.;
                        </p>
                        <p className="text-xs mt-2 text-transparent bg-gray-100 rounded">
                          ladies' purse, infant bag etc.;
                        </p>
                        <p className="text-xs mt-2  w-fit text-transparent bg-gray-100 rounded">
                          seat in front of you.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {!loading && (
        <>
          <div className="max-w-screen-xl mt-1 mx-auto ">
            <div className="w-[100%]">
              <div className="md:flex">
                <div className="md:w-9/12">
                  <FlightItinerary
                    navigation={navigation}
                    setNavigation={setNavigation}
                    onDataFetchSuccess={handleDataFetchSuccess}
                    ancillaryLoading={ancillaryLoading}
                    setAncillaryLoading={setAncillaryLoading}
                    errorAncillary={errorAncillary}
                    ancillaryError={ancillaryError}
                  />
                  {(flightFullData?.mealsSsr?.length > 0 ||
                    (flightFullData?.seatSsr &&
                      flightFullData?.seatSsr[0]?.seatMap?.length > 0) ||
                    (flightFullData?.baggageSsr &&
                      flightFullData?.baggageSsr[0]?.baggages?.length > 0)) && (
                    <FlightAddOns
                      navigation={navigation}
                      setNavigation={setNavigation}
                    />
                  )}
                  <FlightCotactDetails
                    navigation={navigation}
                    setNavigation={setNavigation}
                  />

                  <TravellerDetails
                    navigation={navigation}
                    setNavigation={setNavigation}
                    onContinueClick={handleContinueClick}
                    sharedState={sharedState}
                  />
                  {/* {navigation.addOns === true &&
            navigation.itenary === false &&
            navigation.contact === false &&
            navigation.details === false && ( */}

                  {navigation.itenary === false &&
                    navigation.addOns === false &&
                    navigation.contact === false &&
                    navigation.details === false && (
                      <FlightDetailCard updateSharedState={updateSharedState} />
                    )}
                  {/* )} */}
                  {/* <PaymentSection
                           navigation={navigation}
                           setNavigation={setNavigation}
                         /> */}
                </div>

                <div className={`md:w-3/12 `}>
                <div className="sticky top-20">
                  <div className="border rounded-md md:max-w-[285px] md:min-w-[285px] p-3 mr-8 ml-6 ">
                    <div className="border-b">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm">Total Price</p>
                        </div>
                        <p>{calculateTotalPrice()} AED</p>
                      </div>
                      <div className="pb-5">
                        <p className="text-xs">
                          {
                            (
                              flightFullData?.priceQuoteResponse ||
                              flightFullData
                            )?.noOfAdults
                          }{" "}
                          Adult(s)
                        </p>
                        {flightFullData?.priceQuoteResponse?.noOfChildren > 0 && (
                          <p className="text-xs">
                            {
                              (
                                flightFullData?.priceQuoteResponse ||
                                flightFullData
                              )?.noOfChildren
                            }{" "}
                            Children(s)
                          </p>
                          )}
                        {flightFullData?.priceQuoteResponse?.noOfInfants > 0 && (
                          <p className="text-xs">
                            {
                              (
                                flightFullData?.priceQuoteResponse ||
                                flightFullData
                              )?.noOfInfants
                            }{" "}
                            Infant(s)
                          </p>
                        )}
                      </div>
                    </div>
                    {/* <div className="flex gap-20">
                      <div>
                        <p className="text-sm">Total Fee</p>
                      </div>
                      <div className="justify-end">
                        <p className="text-xs ml-10">
                          {flightFullData?.priceQuoteResponse?.totalFee?.toFixed(
                            2
                          )}{" "}
                          AED
                        </p>
                      </div>
                    </div> */}
                    {(flightFullData?.priceQuoteResponse || flightFullData)
                      ?.totalFee !== 0 && (
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm">Net fare</p>
                        </div>
                        <p className="text-xs">
                          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                          {(
                            flightFullData?.priceQuoteResponse || flightFullData
                          )?.totalFee?.toFixed(2)}{" "}
                          AED
                        </p>
                      </div>
                    )}
                    <div className="flex justify-between mt-1">
                      <div>
                        <p className="text-sm">Base fare </p>
                      </div>
                      <p className="text-xs">
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {(
                          flightFullData?.priceQuoteResponse || flightFullData
                        )?.baseFare?.toFixed(2)}{" "}
                        AED
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm">Taxes and Fees</p>
                      </div>
                      <p className="text-xs">
                        {(
                          flightFullData?.priceQuoteResponse || flightFullData
                        )?.totalTax?.toFixed(2)}{" "}
                        AED
                      </p>
                    </div>
                    {totalSeatPrice !== 0 && (
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm">Seats AddOns</p>
                        </div>
                        <p className="text-xs">{totalSeatPrice} AED</p>
                      </div>
                    )}
                    {totalMealPrice !== 0 && (
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm">Meals AddOns</p>
                        </div>
                        <p className="text-xs">
                          {totalMealPrice?.toFixed(2)} AED
                        </p>
                      </div>
                    )}
                    {totalLuggagePrice !== 0 && (
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm">Luggage AddOns</p>
                        </div>
                        <p className="text-xs">{totalLuggagePrice} AED</p>
                      </div>
                    )}
                  </div>
                  <div className="md:max-w-[340px] md:min-w-[340px]">
                    <div className="border p-3 mr-8 ml-6 mt-2 bg-gray-100 rounded-md">
                      <div className="rounded-xl bg-red-500 w-14">
                        <p className="text-white ml-3 text-xs">Note</p>
                      </div>
                      <p className="text-xs pt-2">
                        Hand Baggage: One personal item like a small laptop bag,
                        ladies' purse, infant bag etc.; Only if it fits under
                        the seat in front of you.
                      </p>
                    </div>
                  </div>
                  <div className="flex md:ml-4 mt-2 md:mt-0 mb-20 md:mb-0 justify-start md:mr-0  mr-6 ml-4  overflow-x-auto md:overflow-x-visible relative  ">
                    <VisaApplyCard />
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FlightBookingPage;
