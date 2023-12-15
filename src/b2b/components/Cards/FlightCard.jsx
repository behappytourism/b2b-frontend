import React, { useEffect, useRef, useState } from "react";
import { TbArrowsRight } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addFlightRow,
  handleFlightDetailChangeZeroIndex,
  handleRecentSearchCardClick,
  handleTravellersChange,
  removeFlightRow,
  setTripType,
} from "../../../redux/slices/flightSlice";
import axios from "../../../axios";
import FlightCardForm from "./FlightCardForm";
import { HiOutlineArrowRight, HiOutlineChevronRight } from "react-icons/hi";
import { BsCalendar3, BsPerson } from "react-icons/bs";
import { RiArrowLeftRightFill, RiArrowUpDownFill } from "react-icons/ri";
import { MdOutlineFlightLand, MdOutlineFlightTakeoff } from "react-icons/md";
import { useHandleClickOutside } from "../../../hooks";
import { GiCheckMark } from "react-icons/gi";
import FlightColanderCustom from "./FlightColanderCustom";
import FlightCalendar from "../../pages/Flight/FlightCalendar";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FlightReturnCalendar from "../../pages/Flight/FlightReturnCalendar";
import { config } from "../../../constants";

function FlightCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.agents);
  const [isClassSelected, setIsClassSelected] = useState(false);
  const [isArrivalAirport, setIsArrivalAirport] = useState(false);
  const [isDepartureAirport, setIsDepartureAirport] = useState(false);
  const [isArrivalDate, setIsArrivalDate] = useState(false);
  const [isDepartureDate, setIsDepartureDate] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [departureDate, setDepartureDate] = useState("");

  const { tripType, flightsData, travellers } = useSelector(
    (state) => state.flight
  );
  const { airports } = useSelector((state) => state.general);

  const handleTripTypeChange = (value) => {
    dispatch(setTripType(value));
    if (value === "multicity") {
      dispatch(addFlightRow());
    } else {
      dispatch(removeFlightRow({ index: "notMultiCity" }));
    }
  };

  const location = useLocation();

  const [dates, setDates] = useState([])
  const [returnDates, setReturnDates] = useState([])


const startDate = new Date(flightsData[0].departureDate); // Replace this with your start date
const firstDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
const formattedStartDate = `${firstDayOfMonth.getFullYear()}-${(firstDayOfMonth.getMonth() + 1).toString().padStart(2, '0')}-${firstDayOfMonth.getDate()}`;

const lastDayOfMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
const formattedEndDate = `${lastDayOfMonth.getFullYear()}-${(lastDayOfMonth.getMonth() + 1).toString().padStart(2, '0')}-${lastDayOfMonth.getDate()}`;

const [departureOn, setDepartureOn] = useState(false);


  const fetchDatePrices = async () => {
    try {
      const res = await axios.get(`/b2b/flight/fares-by-date?origin=${flightsData[0].cityFrom.iata}&destination=${flightsData[0].cityTo.iata}&travelClass=${flightsData[0].class.toLowerCase()}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&type=${tripType}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setDates(res.data.result)
      }
    } catch (err) {
      if (err.response) {
       // console.error("Error response from the server:", err.response);
      } else {
       // console.error("An error occurred:", err.message);
      }
    }
  };

  const fetchReturnDatePrices = async () => {
    try {
      const res = await axios.get(`/b2b/flight/fares-by-date?origin=${flightsData[0].cityFrom.iata}&destination=${flightsData[0].cityTo.iata}&travelClass=${flightsData[0].class.toLowerCase()}&startDate=${formattedStartDate}&endDate=${formattedEndDate}&type=${tripType}&outBoundDate=${flightsData[0].returnDate}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setReturnDates(res.data.result)
      }
    } catch (err) {
      if (err.response) {
       // console.error("Error response from the server:", err.response);
      } else {
       // console.error("An error occurred:", err.message);
      }
    }
  };

  useEffect(() => {
    {flightsData[0].returnDate && flightsData[0].cityFrom.iata && flightsData[0].cityTo.iata && (
    fetchReturnDatePrices()
    )}
  },[flightsData[0].returnDate])

  
  useEffect(() => {
    {departureOn === true && flightsData[0].cityFrom.iata && flightsData[0].cityTo.iata && (
    fetchDatePrices()
    )}
  },[flightsData[0].departureDate])

  // const handleSubmit = () => {
  //   setIsButtonClicked(true);

  //   if (!isDepartureDate) {
  //     // prevent form submission if departure date is not selected
  //     return;
  //   }

  //   if (!isClassSelected || !isDepartureAirport || !isArrivalAirport || !isDepartureDate) {
  //     // display error message or prevent user from proceeding
  //     // alert('Please select a flight class before searching.');
  //     return;
  //   }

  //   let prev = localStorage.getItem("flightSearches");
  //   const info = {
  //     flightsData,
  //     tripType,
  //     travellers,
  //   };

  //   let data;

  //   if (prev) {
  //     prev = JSON.parse(prev);
  //     console.log(prev);
  //     data = [...prev, info];
  //   } else {
  //     data = [info];
  //   }
  //   localStorage.setItem("flightSearches", JSON.stringify(data));
  //   navigate({ pathname: "/flight/order", search: `?info=${info}` });
  // };

  const handleSubmit = () => {
    setIsButtonClicked(true);

    if (!isDepartureDate) {
      // Prevent form submission if departure date is not selected
      return;
    }

    if (
      !isClassSelected ||
      !isDepartureAirport ||
      !isArrivalAirport ||
      !isDepartureDate
    ) {
      // Display error message or prevent user from proceeding
      // alert('Please select a flight class before searching.');
      return;
    }

    const queryParams = new URLSearchParams({
      adults: travellers.adult,
      childs: travellers.children,
      infants: travellers.infant,
      class: flightsData[0].class,
      depart_date: flightsData[0].departureDate,
      from: flightsData[0].cityFrom.iata,
      fromPlace: flightsData[0].cityFrom.name,
      to: flightsData[0].cityTo.iata,
      toPlace: flightsData[0].cityTo.name,
      type: tripType,
      return_date: flightsData[0].returnDate,
      // Add more query parameters as needed
    });

    const url = `/flight/order/results?${queryParams.toString()}`;

    let prev = localStorage.getItem("flightSearches");
    const info = {
      flightsData,
      tripType,
      travellers,
    };

    let data;

    if (prev) {
      prev = JSON.parse(prev);
      data = [info, ...prev];
    } else {
      data = [info];
    }

    localStorage.setItem("flightSearches", JSON.stringify(data));
    navigate(url); // Use the generated URL to navigate
  };

  let rescentSearches = localStorage.getItem("flightSearches");

  if (rescentSearches) {
    rescentSearches = JSON.parse(rescentSearches);
    /// rescentSearches = rescentSearches.reverse();

    if (rescentSearches.length >= 4) {
      // Remove all items from the 5th index onwards
      rescentSearches.splice(4);
      localStorage.setItem("flightSearches", JSON.stringify(rescentSearches));
    }
  }

  // if (rescentSearches) {
  //   // Parse the JSON string into an array
  //   rescentSearches = JSON.parse(rescentSearches);

  //   // Reverse the array if needed
  //    //rescentSearches = rescentSearches.reverse();

  //   // Check if the array length is greater than or equal to 5
  //   if (rescentSearches.length >= 5) {
  //     // Remove all items from the 5th index onwards
  //     rescentSearches.splice(5);
  //     console.log(rescentSearches, "removal")
  //   }

  //   // Now, you have the updated recentSearches array with at most 5 items
  //   // You can use this array as needed

  //   // To store it back in local storage:
  //   localStorage.setItem("flightSearches", JSON.stringify(rescentSearches));
  // }

  // console.log(rescentSearches);

  // const handlerescentCardClick = (data) => {
  //   dispatch(handleRecentSearchCardClick(data));
  //   navigate("/flight/order");
  //   console.log(data, "flight data is it?")
  // };

  const handlerescentCardClick = (data) => {
    const queryParams = new URLSearchParams({
      adults: data.travellers.adult,
      childs: data.travellers.children,
      infants: data.travellers.infant,
      class: data.flightsData[0].class,
      depart_date: data.flightsData[0].departureDate,
      from: data.flightsData[0].cityFrom.iata,
      fromPlace: data.flightsData[0].cityFrom.name,
      to: data.flightsData[0].cityTo.iata,
      toPlace: data.flightsData[0].cityTo.name,
      type: data.tripType,
      return_date: data.flightsData[0].returnDate,
      // Add more query parameters as needed
    });

    const url = `/flight/order/results?${queryParams.toString()}`;

    dispatch(handleRecentSearchCardClick(data));
    navigate(url);
  };

  // this is new code
  const [isTransferTypeDDopen, setIsTransferTypeDDopen] = useState(false);
  const transferTypeRef = useRef();
  useHandleClickOutside(transferTypeRef, () => setIsTransferTypeDDopen(false));

  const [isTakeOffDD, setIsTakeOffDD] = useState(false);
  const takeOffRef = useRef();
  useHandleClickOutside(takeOffRef, () => setIsTakeOffDD(false));
  const [takeOffQuery, setTakeOffQuery] = useState("");

  const [filteredAirport, setFilteredAirport] = useState([]);

  // search functionality
  const listAirports = (value) => {
    if (!value || value.length === 0) {
      setFilteredAirport(airports);
    } else {
      const keyword = value.toUpperCase();
      const filtered = airports
        .filter(
          (entry) => entry.iata && entry.iata.toUpperCase().startsWith(keyword)
        )
        .concat(
          airports.filter(
            (entry) =>
              entry.city &&
              entry.city.toLowerCase().includes(value.toLowerCase()) &&
              !entry.iata.toUpperCase().startsWith(keyword)
          )
        );
      setFilteredAirport(filtered);
    }
  };

  //console.log(filteredAirport, "hndsjhdjk")

  // const listAirports = (value) => {
  //   if (!value || value.length === 0) {
  //     setFilteredAirport(airports);
  //   } else {
  //     const keyword = value.toUpperCase();
  //     const filtered = airports
  //       .filter((entry) => entry.code && entry.code.toUpperCase().startsWith(keyword))
  //       .map((entry) => entry.code);
  //     setFilteredAirport(filtered);
  //   }
  // };

  const [isLandingDD, setIsLandingDD] = useState(false);
  const landingRef = useRef();
  useHandleClickOutside(landingRef, () => setIsLandingDD(false));
  const [landingQuery, setLandingQuery] = useState("");

  const [isTravellerDD, setIsTravellerDD] = useState(false);
  const travellerRef = useRef();
  useHandleClickOutside(travellerRef, () => setIsTravellerDD(false));

  const handleIncrementPassenger = (name, x) => {
    if (travellers[name] < 1 && x === -1) return;
    if (name === "adult" && travellers[name] === 1 && x === -1) return;

    const data = { ...travellers };

    data[name] = data[name] + x;

    if (data.infant > data.adult) data.infant = data.adult;
    if (data.infant > data.adult) return;
    dispatch(handleTravellersChange({ data }));
  };

  const IncrDecsBtn = ({ name }) => {
    return (
      <>
        <div className=" w-16 gap-2 grid grid-cols-2">
          <button
            className="border rounded-full bg-white text-[20px] font-bold w-6 h-6 outline-none"
            onClick={() => {
              handleIncrementPassenger(name, -1);
            }}
          >
            -
          </button>
          <button
            className="border rounded-full bg-white text-[20px] font-semibold w-6 h-6 outline-none"
            onClick={() => {
              handleIncrementPassenger(name, 1);
            }}
          >
            +
          </button>
        </div>
      </>
    );
  };

  useEffect(() => {
    dispatch(
      handleFlightDetailChangeZeroIndex({
        name: "class",
        value: "Economy",
      })
    );
    setIsClassSelected(true);
  }, []);

  // useEffect(() => {
  //   const today = new Date().toISOString().split('T')[0];
  //   dispatch(
  //     handleFlightDetailChangeZeroIndex({
  //       name: "departureDate",
  //       value: today,
  //     })
  //   );
  //   setIsDepartureDate(true);
  // }, []);


  // calender

  const [selectedDate, setSelectedDate] = useState(null);
  const [fareData, setFareData] = useState([]);


   // Parse the API response and store fare data in state
   useEffect(() => {
    const parsedFareData = dates.reduce((acc, fareEntry) => {
      acc[fareEntry.date] = fareEntry.fare;
      return acc;
    }, {});
    setFareData(parsedFareData);
  }, [dates]);
  

  // Function to handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // Function to render fare information for the selected date
  const renderFareInfo = () => {
    if (selectedDate) {
      const dateKey = selectedDate.toISOString().split('T')[0];
      const fare = fareData[dateKey];
      if (fare) {
        return <p>Fare: {fare}</p>;
      }
    }
    return null;
  };


 // const [selectedDate, setSelectedDate] = useState(null);


  // Extract the dates from the apiResponse
  const apiResponseDates = dates.map((flight) => new Date(flight.date));

  // Function to find the fare for the selected date
  const findFareForDate = (date) => {
    const formattedDate = date.toLocaleDateString('en-GB'); // Format date as 'dd/mm/yyyy'
    const matchingFlight = apiResponse.find((flight) => flight.date === formattedDate);
    return matchingFlight ? matchingFlight.fare : null;
  };




  return (
    <div className="max-w-screen-xl mx-auto  ">
      {/* <div>
      <h1 className="font-bold text-center pt-40 text-2xl">Coming Soon....</h1>
    </div> */}

      {location.pathname === "/flight" && (
        <div className="py-10 px-2">
          <div className="">
            {/* <div className="text-center md:text-left">
              <h2 className="font-[700] text-gray-400 text-2xl">
                Search flights
              </h2>
              <p className="text-gray-300 text-sm mt-2">
                {config.TITLE_SHORT_NAME} flight booking portal
              </p>
            </div> */}

            <div className="mt-5 border w-full border-blue-300 rounded-xl shadow-round md:w-[75%] p-10">
              <div className="flex gap-10 items-center">
                <div ref={transferTypeRef} className="relative  text-gray-400">
                  <div
                    onClick={() =>
                      setIsTransferTypeDDopen(!isTransferTypeDDopen)
                    }
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <p className="text-xl text-gray-400">
                      <HiOutlineArrowRight />{" "}
                    </p>
                    <p className="font-semibold">
                      {tripType === "oneway"
                        ? "One way"
                        : tripType === "return"
                        ? "Return"
                        : tripType === "multicity"
                        ? "Multicity"
                        : ""}
                    </p>
                    <p className="rotate-90 text-xl text-gray-300">
                      <HiOutlineChevronRight />
                    </p>
                  </div>
                  {isTransferTypeDDopen ? (
                    <div className="absolute bg-white -left-7 -right-7 top-7 z-10  rounded-lg shadow-mn  ">
                      <div className="bg-gray-50/50 p-5">
                        <table className="w-full">
                          <tbody>
                            <tr
                              onClick={() => {
                                handleTripTypeChange("oneway");
                                setIsTransferTypeDDopen(false);
                              }}
                              className="h-8"
                            >
                              <td className="w-1/4">
                                <p className="">
                                  {tripType === "oneway" ? <GiCheckMark /> : ""}
                                </p>
                              </td>
                              <td className="w-3/4">
                                <p className="font-semibold cursor-pointer">
                                  One way
                                </p>
                              </td>
                            </tr>
                            <tr
                              onClick={() => {
                                handleTripTypeChange("return");
                                setIsTransferTypeDDopen(false);
                              }}
                              className="h-8"
                            >
                              <td className="w-1/4">
                                <p className="">
                                  {tripType === "return" ? <GiCheckMark /> : ""}
                                </p>
                              </td>
                              <td className="w-3/4">
                                <p className="font-semibold cursor-pointer">
                                  Return
                                </p>
                              </td>
                            </tr>

                            <tr className="h-8">
                              <td className="w-1/4">
                                <p className=""></p>
                              </td>
                              <td className="w-3/4">
                                <p className="font-semibold cursor-pointer">
                                  Multicity
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div ref={travellerRef} className="relative">
                  <div
                    onClick={() => setIsTravellerDD(!isTravellerDD)}
                    className="cursor-pointer flex items-center gap-2 text-gray-400"
                  >
                    <p className="text-xl text-gray-400">
                      <BsPerson />{" "}
                    </p>
                    {travellers.children > 0 || travellers.infant > 0 ? (
                      <p className="font-semibold">
                        {travellers?.adult}A {travellers.children}C{" "}
                        {travellers.infant} inf
                      </p>
                    ) : (
                      // Render something when either children or infants (or both) are 0
                      <p className="font-semibold">{travellers?.adult} Adult</p>
                    )}

                    {/* <p className="font-semibold">{travellers?.adult} Adult</p> */}
                    <p className="rotate-90 text-xl text-gray-300">
                      <HiOutlineChevronRight />
                    </p>
                  </div>
                  {isTravellerDD ? (
                    <div className="absolute bg-white -left-12 w-72 top-7 z-10  rounded-lg shadow-mn  ">
                      <div className="bg-gray-50/50 p-5">
                        <ul>
                          <li>
                            <div className="grid grid-cols-6 text-sm px-6 py-[12px]  transition-all text-darktext ">
                              <span className="col-span-3">Adults</span>
                              <span>{travellers?.adult}</span>
                              <span className="col-span-2">
                                <IncrDecsBtn name="adult" />
                              </span>
                              <p className="font-light text-fontPX">12+Years</p>
                            </div>
                          </li>
                          <li>
                            <div className="grid grid-cols-6  text-sm px-6 py-[12px] transition-all text-darktext ">
                              <span className="col-span-3">Children</span>
                              <span>{travellers?.children}</span>
                              <span className="col-span-2">
                                <IncrDecsBtn name="children" />
                              </span>
                              <p className="font-light text-fontPX ">
                                2-12 Years
                              </p>
                            </div>
                          </li>
                          <li>
                            <div className="grid grid-cols-6  text-sm px-6 py-[12px] transition-all text-darktext  ">
                              <span className="col-span-3">Infant</span>
                              <span>{travellers?.infant}</span>
                              <span className="col-span-2">
                                <IncrDecsBtn name="infant" />
                              </span>
                              <p className="font-light text-fontPX">
                                0-2 Years
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-7">
                <button
                  onClick={() => {
                    dispatch(
                      handleFlightDetailChangeZeroIndex({
                        name: "class",
                        value: "Economy",
                      })
                    );
                    setIsClassSelected(true);
                  }}
                  className={`text-sm px-4 h-10 rounded-full border ${
                    flightsData?.length > 0 &&
                    flightsData[0]?.class === "Economy"
                      ? " border-blue-600 text-blue-600 bg-blue-100/70 shadow-sm "
                      : " text-gray-400 border-gray-100 "
                  }  font-semibold outline-none`}
                >
                  Economy
                </button>
                <button
                  onClick={() => {
                    dispatch(
                      handleFlightDetailChangeZeroIndex({
                        name: "class",
                        value: "Business",
                      })
                    );
                    setIsClassSelected(true);
                  }}
                  className={`text-sm px-4 h-10 rounded-full border ${
                    flightsData?.length > 0 &&
                    flightsData[0]?.class === "Business"
                      ? " border-blue-600 text-blue-600 bg-blue-100/70 shadow-sm "
                      : " text-gray-400 border-gray-100 "
                  }  font-semibold outline-none`}
                >
                  Business class
                </button>
                {/* <button
                  onClick={() => {
                    dispatch(
                      handleFlightDetailChangeZeroIndex({
                        name: "class",
                        value: "First",
                      })
                    );
                    setIsClassSelected(true);
                  }}
                  className={`text-sm px-4 h-10 rounded-full border ${
                    flightsData?.length > 0 && flightsData[0]?.class === "First"
                      ? " border-blue-600 text-blue-600 bg-blue-100/70 shadow-sm "
                      : " text-gray-400 border-gray-100 "
                  }  font-semibold outline-none`}
                >
                  First class
                </button> */}
                {/* {!isClassSelected && (
            <div className="text-red-600 mt-2">
              Please select a flight class before proceeding.
              </div>
             )} */}
              </div>
              {isButtonClicked && !isClassSelected && (
                <div className="text-red-600 mt-2">
                  Please select a flight class before proceeding.
                </div>
              )}

              <div className="hidden items-center mt-7 border h-14 border-gray-100 rounded-lg ">
                <div ref={takeOffRef} className="relative w-1/2 ml-2 h-full ">
                <input
                    className={`w-full h-full pl-16 text-gray-400 font-semibold outline-none ${
                      isButtonClicked && !isDepartureAirport
                        ? "border-red-600"
                        : "border-blue-600"
                    } focus:border rounded`}
                    type="text"
                    onFocus={() => {
                      setTakeOffQuery("");
                      setIsTakeOffDD(true);
                      listAirports("");
                    }}
                    value={takeOffQuery}
                    placeholder="Select city"
                    required
                    onChange={(e) => {
                      setTakeOffQuery(e.target.value);
                      listAirports(e.target.value);
                      setIsDepartureAirport(true);
                    }}
                  />
                  <p className="absolute left-6 top-[14px] text-2xl text-gray-300">
                    <MdOutlineFlightTakeoff />
                  </p>
                   {isTakeOffDD ? (
                    <div className="absolute -left-2 right-0 w-full rounded-xl shadow-mn  p-5 bg-white top-14 text-gray-400 z-10">
                      <div className="">
                        <p className="font-bold tracking-wide text-center drop-shadow-sm pb-2">
                          Airports
                        </p>
                      </div>
                      {filteredAirport?.length > 0 ? (
                        filteredAirport?.slice(0, 5)?.map((airport) => {
                          return (
                            <div
                              key={airport?.iata}
                              onClick={() => {
                                dispatch(
                                  handleFlightDetailChangeZeroIndex({
                                    name: "cityFrom",
                                    value: {
                                      iata: airport?.iata,
                                      name: airport?.city,
                                    },
                                  })
                                );
                                setTakeOffQuery(
                                  `${airport?.iata}-${airport?.city},${airport?.country}`
                                );
                                setIsTakeOffDD(false);
                                setIsDepartureAirport(true);
                              }}
                              className="py-2 border-t px-2 cursor-default"
                            >
                              <div className="flex gap-2 text-sm text-darktext tracking-tight font-medium">
                                <p className="">{airport?.city}</p>
                                <p className="">({airport?.iata})</p>
                              </div>
                              <div className="flex gap-1 text-xs tracking-tighter">
                                <p className="">{airport?.name},</p>
                                <p className="">({airport?.country})</p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="py-2 px-2">
                          <p className="text-sm text-gray-300 text-center font-medium">
                            Sorry! No airport found.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div
                  ref={landingRef}
                  className="relative w-1/2 mr-2 border-l h-full "
                >
                  <input
                    className={`w-full h-full pl-16 text-gray-400 font-semibold outline-none focus:border ${
                      isButtonClicked && !isDepartureAirport
                        ? "border-red-600"
                        : "border-blue-600"
                    } rounded tracking-tighter`}
                    type="text"
                    onFocus={() => {
                      setLandingQuery("");
                      setIsLandingDD(true);
                      listAirports("");
                    }}
                    value={landingQuery}
                    placeholder="Select city"
                    required
                    onChange={(e) => {
                      setLandingQuery(e.target.value);
                      listAirports(e.target.value);
                      setIsArrivalAirport(true);
                    }}
                  />
                  <p className="absolute left-6 top-[14px] text-2xl text-gray-300">
                    <MdOutlineFlightLand />
                  </p>
                  {isLandingDD ? (
                    <div className="absolute left-0 -right-2 w-full rounded-xl shadow-mn  p-5 bg-white top-14 text-gray-400 z-10">
                      <div className="">
                        <p className="font-bold tracking-wide text-center drop-shadow-sm pb-2">
                          Airports
                        </p>
                      </div>
                      {filteredAirport?.length > 0 ? (
                        filteredAirport?.slice(0, 5)?.map((airport) => {
                          return (
                            <div
                              key={airport?.iata}
                              onClick={() => {
                                dispatch(
                                  handleFlightDetailChangeZeroIndex({
                                    name: "cityTo",
                                    value: {
                                      iata: airport?.iata,
                                      name: airport?.city,
                                    },
                                  })
                                );
                                setLandingQuery(
                                  `${airport?.iata}-${airport?.city},${airport?.country}`
                                );
                                setIsLandingDD(false);
                                setIsArrivalAirport(true);
                              }}
                              className="py-2 border-t px-2 cursor-default"
                            >
                              <div className="flex gap-2 text-sm text-darktext tracking-tight font-medium">
                                <p className="">{airport?.city}</p>
                                <p className="">({airport?.iata})</p>
                              </div>
                              <div className="flex gap-1 text-xs tracking-tighter">
                                <p className="">{airport?.name},</p>
                                <p className="">({airport?.country})</p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="py-2 px-2">
                          <p className="text-sm text-gray-300 text-center font-medium">
                            Sorry! No airport found.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                  <p className="absolute -left-4 top-3 text-xl text-blue-600 border-blue-600 rounded-full border p-1 bg-white">
                    <RiArrowLeftRightFill />
                  </p>
                </div>
              </div>

              <div className="md:flex  items-center mt-10 border h-14 border-gray-100 rounded-lg ">
                <div ref={takeOffRef} className="relative border-r md:w-1/2  h-full ">
                <p className="absolute text-[14px] md:-mt-[24px] -mt-[24px]">From</p>
                  <input
                    className={`w-full h-full pl-16 text-gray-400 font-semibold outline-none ${
                      isButtonClicked && !isDepartureAirport
                        ? "border-red-600"
                        : "border-blue-600"
                    } focus:border rounded`}
                    type="text"
                    onFocus={() => {
                      setTakeOffQuery("");
                      setIsTakeOffDD(true);
                      listAirports("");
                    }}
                    value={takeOffQuery}
                    placeholder="Select city"
                    required
                    onChange={(e) => {
                      setTakeOffQuery(e.target.value);
                      listAirports(e.target.value);
                      setIsDepartureAirport(true);
                    }}
                  />
                  <p className="absolute left-6 top-[14px] text-2xl text-gray-300">
                    <MdOutlineFlightTakeoff />
                  </p>
                  {isTakeOffDD ? (
                    <div className="absolute -left-2 right-0 w-full rounded-xl shadow-mn  p-5 bg-white top-14 text-gray-400 z-10">
                      <div className="">
                        <p className="font-bold tracking-wide text-center drop-shadow-sm pb-2">
                          Airports
                        </p>
                      </div>
                      {filteredAirport?.length > 0 ? (
                        filteredAirport?.slice(0, 5)?.map((airport) => {
                          return (
                            <div
                              key={airport?.iata}
                              onClick={() => {
                                dispatch(
                                  handleFlightDetailChangeZeroIndex({
                                    name: "cityFrom",
                                    value: {
                                      iata: airport?.iata,
                                      name: airport?.city,
                                    },
                                  })
                                );
                                setTakeOffQuery(
                                  `${airport?.iata}-${airport?.city},${airport?.country}`
                                );
                                setIsTakeOffDD(false);
                                setIsDepartureAirport(true);
                              }}
                              className="py-2 border-t px-2 cursor-default"
                            >
                              <div className="flex gap-2 text-sm text-darktext tracking-tight font-medium">
                                <p className="">{airport?.city}</p>
                                <p className="">({airport?.iata})</p>
                              </div>
                              <div className="flex gap-1 text-xs tracking-tighter">
                                <p className="">{airport?.name},</p>
                                <p className="">({airport?.country})</p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="py-2 px-2">
                          <p className="text-sm text-gray-300 text-center font-medium">
                            Sorry! No airport found.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="w-full md:hidden items-center flex justify-center mt-2">
                  <p className=" flex justify-center text-xl text-blue-600 border-blue-600 h-9 w-9 items-center rounded-full border p-1 bg-white">
                    <RiArrowUpDownFill />
                  </p>
                </div>

                <div
                  ref={landingRef}
                  className="relative md:w-1/2 md:mr-2 md:mt-0 md:mb-0 md:border-none  md:rounded-none  mt-2 mb-8 border border-gray-100 rounded-lg h-full "
                >
                <h3 className="absolute text-[14px] md:-mt-[24px] -mt-[24px]">To</h3>
                  <input
                    className={`w-full h-full pl-16 text-gray-400 font-semibold outline-none focus:border ${
                      isButtonClicked && !isDepartureAirport
                        ? "border-red-600"
                        : "border-blue-600"
                    } rounded tracking-tighter`}
                    type="text"
                    onFocus={() => {
                      setLandingQuery("");
                      setIsLandingDD(true);
                      listAirports("");
                    }}
                    value={landingQuery}
                    placeholder="Select city"
                    required
                    onChange={(e) => {
                      setLandingQuery(e.target.value);
                      listAirports(e.target.value);
                      setIsArrivalAirport(true);
                    }}
                  />
                  <p className="absolute left-6 top-[15px] text-2xl text-gray-300">
                    <MdOutlineFlightLand />
                  </p>
                  {isLandingDD ? (
                    <div className="absolute left-0 -right-2 w-full rounded-xl shadow-mn  p-5 bg-white top-14 text-gray-400 z-10">
                      <div className="">
                        <p className="font-bold tracking-wide text-center drop-shadow-sm pb-2">
                          Airports
                        </p>
                      </div>
                      {filteredAirport?.length > 0 ? (
                        filteredAirport?.slice(0, 5)?.map((airport) => {
                          return (
                            <div
                              key={airport?.iata}
                              onClick={() => {
                                dispatch(
                                  handleFlightDetailChangeZeroIndex({
                                    name: "cityTo",
                                    value: {
                                      iata: airport?.iata,
                                      name: airport?.city,
                                    },
                                  })
                                );
                                setLandingQuery(
                                  `${airport?.iata}-${airport?.city},${airport?.country}`
                                );
                                setIsLandingDD(false);
                                setIsArrivalAirport(true);
                              }}
                              className="py-2 border-t px-2 cursor-default"
                            >
                              <div className="flex gap-2 text-sm text-darktext tracking-tight font-medium">
                                <p className="">{airport?.city}</p>
                                <p className="">({airport?.iata})</p>
                              </div>
                              <div className="flex gap-1 text-xs tracking-tighter">
                                <p className="">{airport?.name},</p>
                                <p className="">({airport?.country})</p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="py-2 px-2">
                          <p className="text-sm text-gray-300 text-center font-medium">
                            Sorry! No airport found.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="flex gap-40">
                {isButtonClicked && !isDepartureAirport && (
                  <div className="text-red-600 mt-2">
                    Please select a flight Departure Airport.
                  </div>
                )}
                {isButtonClicked && !isArrivalAirport && (
                  <div className="text-red-600 mt-2">
                    Please select a flight Arrival Airport.
                  </div>
                )}
              </div>

            
              <div className="md:flex items-center mt-[50%] md:mt-10  ">
                <div className="md:w-9/12 flex items-center border h-14 border-gray-100 rounded-lg ">
               
                  <div className="relative w-1/2 h-full ">
                  <h3 className="absolute text-[14px] md:-mt-[24px] -mt-[24px]">Departure Date</h3>
                  <div className="w-full h-full pl-12 pt-4 text-gray-400 font-semibold outline-none focus:border border-blue-600 rounded tracking-tighter">
                  {departureOn === false && (
                    <p
                    onClick={() => setDepartureOn(true)}
                    >mm/dd/yyyy</p>
                  )}
                  {departureOn === true && (
                  <FlightCalendar apiResponse={dates} setDepartureDate={setDepartureDate} setIsDepartureDate={setIsDepartureDate} />
                  )}
                  </div>
                    {/* <input
                      className="w-full h-full pl-16 text-gray-400 font-semibold outline-none focus:border border-blue-600 rounded tracking-tighter"
                      type="date"
                      onChange={(e) => {
                        dispatch(
                          handleFlightDetailChangeZeroIndex({
                            name: "departureDate",
                            value: e.target.value,
                          })
                        );
                        setIsDepartureDate(true);
                        console.log(e.target.value)
                        setDepartureDate(e.target.value);
                      }}
                      min={new Date().toISOString().split("T")[0]}
                    /> */}
                    <p className="absolute left-4 top-[14px] text-2xl text-gray-300">
                      <BsCalendar3 />
                    </p>
                  </div>

                  <div className="relative w-1/2 h-full border-l border-gray-100">
                  <h3 className="absolute text-[14px] md:-mt-[24px] -mt-[24px]">Return Date</h3>
                    {tripType === "return" ? (
                      <>
                      <div className=" h-full pl-12 pt-4 text-gray-400 font-semibold outline-none focus:border border-blue-600 rounded tracking-tighter">
                      <FlightReturnCalendar apiResponse={returnDates} departureDate={departureDate}  setDepartureDate={setDepartureDate} setIsDepartureDate={setIsDepartureDate} />
                      </div>
                        {/* <input
                          className="w-full h-full pl-16 text-gray-400 font-semibold outline-none focus:border border-blue-600 rounded tracking-tighter"
                          type="date"
                          value={
                            flightsData?.length > 0 &&
                            flightsData[0]?.returnDate
                          }
                          onChange={(e) => {
                            const selectedReturnDate = e.target.value;
                            const departureDate =
                              flightsData?.length > 0 &&
                              flightsData[0]?.departureDate;

                            // Check if the selected return date is earlier than the departure date
                            if (
                              departureDate &&
                              selectedReturnDate < departureDate
                            ) {
                              // Show an error message or handle the invalid selection here
                              console.log(
                                "Return date cannot be earlier than departure date"
                              );
                            } else {
                              // If the selection is valid, update the return date in the state
                              dispatch(
                                handleFlightDetailChangeZeroIndex({
                                  name: "returnDate",
                                  value: selectedReturnDate,
                                })
                              );
                            }
                          }}
                          // Set the min attribute to the departure date to disable earlier dates
                          min={
                            flightsData?.length > 0 &&
                            flightsData[0]?.departureDate
                          }
                        /> */}
                        <p className="absolute left-4 top-[14px] text-2xl text-gray-300">
                          <BsCalendar3 />
                        </p>
                      </>
                    ) : (
                      <p
                        className="pl-8 flex h-full tracking-tight font-medium items-center cursor-pointer"
                        onClick={() => handleTripTypeChange("return")}
                      >
                        Return
                      </p>
                    )}
                  </div>
                </div>
                <div className="md:flex md:mt-0 mt-10 justify-center md:w-3/12">
                  <button
                    onClick={() => handleSubmit()}
                    className="text-white bg-blue-600 shadow-mn rounded-md h-14 md:w-fit w-full border-none outline-none hover:bg-blue-700 px-5 font-medium"
                  >
                    Search flight
                  </button>
                </div>
              </div>
              <div className="flex gap-20">
                {isButtonClicked && !isDepartureDate && (
                  <div className="text-red-600 mt-2">
                    Please select the Departure Date.
                  </div>
                )}

                {tripType === "return" && isButtonClicked && !isArrivalDate && (
                  <div className="text-red-600 mt-2">
                    Please select the Arrival Date.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-4">
            <h2 className="text-xl md:text-2xl font-semibold text-darktext mb-4">
              Recent Search
            </h2>

            <div className="md:flex flex-wrap gap-2">
              {rescentSearches?.map((ele) => {
                return (
                  <>
                    <div
                      className=" rounded-lg border mb-4 md:mb-0 md:flex md:flex-col justify-center p-4 pt-8 cursor-pointer bg-white  relative hover:bg-slate-100 "
                      onClick={() => {
                        handlerescentCardClick(ele);
                      }}
                    >
                      <div
                        className={`absolute top-2 left-4 capitalize font-medium text-sm ${
                          ele?.tripType === "oneway"
                            ? "text-teal-500"
                            : "text-red-500"
                        } `}
                      >
                        {ele?.tripType === "return" ? "Round Trip" : "One-Way"}
                      </div>
                      {ele?.flightsData?.map((data) => (
                        <>
                          <div className="w-[100%] ">
                            <div className="flex justify-between items-center w-[100%] text-sm">
                              <div className="flex gap-1 pr-2">
                                <span>{data?.cityFrom?.name}</span>
                                <span className="text-gray-300 font-medium">
                                  ({data?.cityFrom?.iata})
                                </span>
                              </div>
                              <div className="flex  text-blue-400 ">
                                <RiArrowLeftRightFill />
                              </div>
                              <div className="flex gap-1 pl-2">
                                <span>{data?.cityTo?.name}</span>
                                <span className="text-gray-300 font-medium">
                                  ({data?.cityTo?.iata})
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-2 text-xs">
                              <span className="text-gray-300 ">
                                {data?.departureDate}
                              </span>
                            </div>
                          </div>
                        </>
                      ))}
                      {ele?.tripType === "return" && (
                        <div className="flex gap-2 mt-2 text-[14px]">
                          Return Date :{" "}
                          <span className="text-gray-300 ">
                            {ele?.flightsData[0].returnDate}
                          </span>
                        </div>
                      )}
                      <div className="flex gap-2 mt-2">
                        <span className="flex  gap-1 text-xs text-gray-200">
                          <span className="text-gray-300 ">Adult :</span>
                          {ele?.travellers?.adult}
                        </span>
                        <span className="flex  gap-1 text-xs text-gray-200">
                          <span className="text-gray-300 ">Child :</span>
                          {ele?.travellers?.children}
                        </span>
                        <span className="flex  gap-1 text-xs text-gray-200">
                          <span className="text-gray-300 ">Infant :</span>
                          {ele?.travellers?.infant}
                        </span>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div>{/* <FlightColanderCustom/> */}</div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default FlightCard;
