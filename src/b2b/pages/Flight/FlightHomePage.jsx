import React, { useEffect, useRef, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { IoChevronBackSharp } from "react-icons/io5";
import { TbArrowsRight, TbArrowsRightLeft } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios";
import {
  addFlightRow,
  handleFlightDetailChangeZeroIndex,
  handleTravellersChange,
  removeFlightRow,
  setTripType,
} from "../../../redux/slices/flightSlice";
import FlightCardForm from "../../components/Cards/FlightCardForm";
import SearchCards from "../../components/Cards/SearchCards";
import VisaApplyCard from "../Visa/VisaApplyCard";
import FlightCard from "./FlightCard";
import FlightFilter from "./FlightFilter";
import { GiCheckMark } from "react-icons/gi";
import { HiOutlineArrowRight, HiOutlineChevronRight } from "react-icons/hi";
import { BsCalendar3, BsLightningChargeFill, BsPerson } from "react-icons/bs";
import { useHandleClickOutside } from "../../../hooks";
import { MdOutlineFlightLand, MdOutlineFlightTakeoff } from "react-icons/md";
import { RiArrowLeftRightFill, RiArrowUpDownFill } from "react-icons/ri";
import RoundTripFlightCard from "./RoundTripFlightCard";
import { BiDollarCircle } from "react-icons/bi";

const FlightHomePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const adults = parseInt(searchParams.get("adults")) || 0;
  const childs = parseInt(searchParams.get("childs")) || 0;
  const infants = parseInt(searchParams.get("infants")) || 0;
  const flightClass = searchParams.get("class");
  const departDate = searchParams.get("depart_date");
  const from = searchParams.get("from");
  const fromPlace = searchParams.get("fromPlace");
  const to = searchParams.get("to");
  const toPlace = searchParams.get("toPlace");
  const type = searchParams.get("type");
  const return_date = searchParams.get("return_date");

  //console.log(adults,childs, from, to, departDate, flightClass, type,  return_date, "params value")
  const [flightsFilter, setFlightsFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedStops, setSelectedStops] = useState([]);
  const [selectedDepartureTimes, setSelectedDepartureTimes] = useState([]);
  const [selectedAirline, setSelectedAirline] = useState([]);
  const maxTripDurationInSeconds = flightsFilter?.maxTripDuration;
  const maxTripDurationInHours = maxTripDurationInSeconds / 3600;
  const [selectedTripDuration, setSelectedTripDuration] = useState(24);

  const [selectedTripFare, setSelectedTripFare] = useState(
    flightsFilter?.maxFare
  );
  const maxLayOverDuration = flightsFilter?.layOverDuration;
  const maxLayOverDurationInHours = Math.round(maxLayOverDuration / 3600);
  const layOverMax = maxLayOverDurationInHours;
  const [selectedTripLayover, setSelectedTripLayover] = useState(
    maxLayOverDurationInHours
  );

  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [searchId, setSearchId] = useState("");
  const [tripClass, setTripClass] = useState("");
  const [isClassSelected, setIsClassSelected] = useState(false);
  const [flightSearch, setFlightSearch] = useState({});
  const { flightsData, travellers, tripType } = useSelector(
    (state) => state.flight
  );

  const [selectedOption, setSelectedOption] = useState("cheapest"); // Default to 'cheapest'

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {}, [selectedDepartureTimes]);

  useEffect(() => {}, [selectedStops]);

  useEffect(() => {}, [selectedTripDuration]);

  useEffect(() => {}, [selectedTripFare]);

  useEffect(() => {}, [selectedTripLayover]);

  useEffect(() => {}, [selectedAirline]);

  const { token } = useSelector((state) => state.agents);

  const [flights, setFlights] = useState([]);
  const [flightsLength, setFlightsLength] = useState(0);
  const [renderFlights, setRenderFlights] = useState([]);
  const [toAirportIATA, setToAirportIATA] = useState("");
  const [fromAirportIATA, setFromAirportIATA] = useState("");
  const [renderFlightsLength, setRenderFlightsLength] = useState(0);
  const totalTravellers =
    travellers.children + travellers.adult + travellers.infant;

  // console.log(renderFlights, "render flights");
  // console.log(flights, "flights ");

  useEffect(() => {
    setFlightsLength(flights.length);
  }, [flights]);

  useEffect(() => {
    setRenderFlightsLength(renderFlights.length);
  }, [renderFlights]);

  const Flight = ({ info }) => {
    return (
      <>
        <div className="md:max-w-[150px] flex flex-col justify-center px-4 items-center border-r-[1px]">
          <div className="flex gap-x-2">
            <div className="flex flex-col">
              <span className="font-semibold">{info?.cityFrom?.iata}</span>
              {/* <span className="text-[12px]">{info?.cityFrom?.name}</span> */}
            </div>
            <div className="text-[15px] text-blue-500 flex items-center">
              <TbArrowsRight />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">{info?.cityTo?.iata}</span>
              {/* <span className="text-[12px]">{info?.cityTo?.name}</span> */}
            </div>
          </div>
          <div className="w-[100%] text-[12px] flex justify-center">
            {info?.departureDate}
          </div>
        </div>
      </>
    );
  };

  const formatDateString = (dateString) => {
    try {
      if (!dateString) {
        throw new Error('Empty date string');
      }
  
      const date = new Date(dateString);
  
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date string: ${dateString}`);
      }
  
      return date.toISOString().slice(0, 10);
    } catch (error) {
      // console.error('Error formatting date:', error.message);
      return ''; // Handle the error by returning an empty string or some default value
    }
  };
  
  
  const body = {
    noOfAdults: travellers?.adult || adults,
    noOfChildren: travellers?.children || childs,
    noOfInfants: travellers?.infant || infants,
    travelClass:
      flightsData[0]?.class.toLowerCase() || flightClass.toLowerCase(),
    type: tripType || type,
    trips: [
      {
        from: flightsData[0]?.cityFrom?.iata || from,
        to: flightsData[0]?.cityTo?.iata || to,
        departureDate: formatDateString(
          flightsData[0]?.departureDate?.slice(0, 10) || departDate
        ),
        returnDate: formatDateString(flightsData[0]?.returnDate?.slice(0, 10) || ""),
      },
    ],
  };

  // const fetchFlightsData = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.post("/b2b/flight/search/availability", body, {
  //       headers: { authorization: `Bearer ${token}` },
  //     });
  //     console.log(res, "res for availability");
  //     if (res.status === 200) {
  //       setFlights(res?.data?.flightResult?.result || []);
  //       console.log(res?.data?.flightResult?.result, "available flight result");
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error, "error for availability");
  //     setLoading(false);
  //   }
  // };
  const selectedStopsAsNumbers = selectedStops.map((stop) => Number(stop));

  const calculateDuration = (departureDate, arrivalDate) => {
    const departureTime = new Date(departureDate).getTime();
    const arrivalTime = new Date(arrivalDate).getTime();
    const durationInMinutes = (arrivalTime - departureTime) / (1000 * 60);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  // const fetchFlightsData = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axios.post("/b2b/flight/search/availability", body, {
  //       headers: { authorization: `Bearer ${token}` },
  //     });
  //     if (res.status === 200) {
  //       let flights = res?.data?.flightResult?.result || [];
  //       let filtersFlight = res?.data?.filters || [];
  //       if (selectedDepartureTimes.length > 0) {
  //         flights = flights.filter((flight) =>
  //           selectedDepartureTimes.includes(
  //             getDepartureTime(flight.trips[0].flightSegments[0].departureDate)
  //           )
  //         );
  //       }
  //       if (selectedStops.length > 0) {
  //         flights = flights.filter((flight) => {
  //           const stopCount =
  //             flight.trips[0].stopCount || flight.trips[0].stops;
  //           return selectedStopsAsNumbers.includes(stopCount);
  //         });
  //       }
  //       if (selectedAirline.length > 0) {
  //         flights = flights.filter((flight) =>
  //           selectedAirline.includes(
  //             flight.trips[0].flightSegments[0].airlineName
  //           )
  //         );
  //       }
  //       if (selectedTripDuration) {
  //         const latestSelectedDuration = selectedTripDuration; // Get the second element of the array

  //         flights = flights.filter((flight) => {
  //           const firstSegment = flight.trips[0].flightSegments[0];
  //           const lastSegment =
  //             flight.trips[0].flightSegments[
  //               flight.trips[0].flightSegments.length - 1
  //             ];
  //           const duration = calculateDuration(
  //             firstSegment.departureDate,
  //             lastSegment.arrivalDate
  //           );
  //           const [hours, minutes] = duration.split(" ");
  //           const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);

  //           return totalMinutes <= latestSelectedDuration * 60; // Use the latest selected duration
  //         });
  //       }
  //       if (selectedTripFare) {
  //         const latestSelectedFare = selectedTripFare; // Get the second element of the array

  //         flights = flights.filter((flight) => {
  //           const flightFare = flight.netFare;
  //           return flightFare <= latestSelectedFare; // Show flights within the selected fare range
  //         });
  //       }
  //       if (selectedTripLayover) {
  //         const latestSelectedDuration = selectedTripLayover; // Get the second element of the array

  //         flights = flights.filter((flight) => {
  //           const firstSegment = flight.trips[0].flightSegments[0];
  //           const lastSegment =
  //             flight.trips[0].flightSegments[
  //               flight.trips[0].flightSegments.length - 1
  //             ];
  //           const duration = calculateDuration(
  //             firstSegment.arrivalDate,
  //             lastSegment.departureDate
  //           );
  //           const [hours, minutes] = duration.split(" ");
  //           const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);

  //           return totalMinutes <= latestSelectedDuration * 60; // Use the latest selected duration
  //         });
  //       }

  //       setFlights(flights);
  //       setFlightsFilter(filtersFlight);
  //       setSelectedTripFare(filtersFlight?.maxFare);
  //       setSelectedTripDuration(filtersFlight?.maxTripDuration);
  //       setSelectedTripLayover(filtersFlight?.layOverDuration)
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error, "error for availability");
  //     setLoading(false);
  //   }
  // };

  const fetchFlightsData = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/b2b/flight/search/availability", body, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        const flights = res?.data?.flightResult?.result || [];
        const filtersFlight = res?.data?.filters || [];

        fetchFilterFlights(flights);

        setFlights(flights);
        setSearchId(res?.data?.flightResult?.searchId);
        setFlightsFilter(filtersFlight);
        setSelectedTripFare(filtersFlight?.maxFare);
        setSelectedTripDuration(filtersFlight?.maxTripDuration);
        setSelectedTripLayover(filtersFlight?.layOverDuration);
      }
      setLoading(false);
    } catch (error) {
      console.log(error, "error for availability");
      setLoading(false);
    }
  };

  //console.log(flights, "flights")

  useEffect(() => {
    setSelectedTripLayover(maxLayOverDurationInHours);
  }, [maxLayOverDurationInHours]);

  useEffect(() => {
    setSelectedTripDuration(maxTripDurationInHours);
  }, [maxTripDurationInHours]);


  // Create a separate function for filtering flights
  const fetchFilterFlights = () => {
    let filteredFlights = flights;

    if (selectedDepartureTimes.length > 0) {
      filteredFlights = filteredFlights.filter((flight) =>
        selectedDepartureTimes.includes(
          getDepartureTime(flight.trips[0].flightSegments[0].departureDate)
        )
      );
    }

    if (selectedStops.length > 0) {
      filteredFlights = filteredFlights.filter((flight) => {
        const stopCount = flight.trips[0].stopCount;
        return selectedStops.includes(stopCount);
      });
    }

    // console.log(filteredFlights, "awww")

    if (selectedAirline.length > 0) {
      filteredFlights = flights.filter((flight) =>
        selectedAirline.includes(flight.trips[0].flightSegments[0].airlineName)
      );
    }

    if (selectedTripDuration) {
      const latestSelectedDuration = selectedTripDuration;
      filteredFlights = filteredFlights?.filter((flight) => {
        const firstSegment = flight.trips[0].flightSegments[0];
        const lastSegment =
          flight.trips[0].flightSegments[
            flight.trips[0].flightSegments.length - 1
          ];
        const duration = calculateDuration(
          firstSegment.departureDate,
          lastSegment.arrivalDate
        );
        const [hours, minutes] = duration.split(" ");
        const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
        return totalMinutes <= latestSelectedDuration * 60;
      });
    }

    if (selectedTripFare) {
      const latestSelectedFare = selectedTripFare;
      filteredFlights = filteredFlights.filter((flight) => {
        const flightFare = flight.netFare;
        return flightFare <= latestSelectedFare;
      });
    }

    if (selectedTripLayover) {
      const latestSelectedDuration = selectedTripLayover;

      filteredFlights = filteredFlights.filter((flight) => {
        const firstSegment = flight.trips[0].flightSegments[0];
        const lastSegment =
          flight.trips[0].flightSegments[
            flight.trips[0].flightSegments.length - 1
          ];
        const duration = calculateDuration(
          firstSegment.arrivalDate,
          lastSegment.departureDate
        );
        const [hours, minutes] = duration.split(" ");
        const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);

        return totalMinutes <= latestSelectedDuration * 60;
      });
    }
    setRenderFlights(filteredFlights);
    return filteredFlights;
  };

  useEffect(() => {
    // Check if 'undefined' is present in selectedStops
    if (selectedStops.includes(undefined)) {
      setSelectedStops([]);
    }
  }, [selectedStops]);

  const handleFilterClick = () => {
    handleOptionClick("fastest");
    //setSelectedTripFare(flightsFilter?.fastestFlight?.fare);
    setSelectedTripDuration(
      flightsFilter?.fastestFlight?.duration / 3600
    );
  };

   //console.log(selectedTripDuration)

  const handleFilterCheapestClick = () => {
    handleOptionClick("cheapest");
    setSelectedTripFare(flightsFilter?.maxFare);
    setSelectedTripDuration(Math.round(maxTripDurationInHours));
  };

  //console.log(selectedStops, "filters?");

  const getDepartureTime = (departureDate) => {
    const date = new Date(departureDate);
    const hours = date.getHours();
    console.log(departureDate, "departure inside");
    console.log(hours, "departure inside");
    
    if (hours >= 0 && hours < 6) {
      return "night";
    } else if (hours >= 6 && hours < 12) {
      return "morning";
    } else if (hours >= 12 && hours < 18) {
      return "afternoon";
    } else if (hours >= 18 && hours < 24) {
      return "evening";
    }
  };
  

  useEffect(() => {
    fetchFilterFlights(flights);
  }, [
    reload,
    selectedDepartureTimes,
    tripClass,
    selectedStops,
    selectedAirline,
    selectedTripDuration,
    selectedTripFare,
    selectedTripLayover,
  ]);

  useEffect(() => {
    fetchFlightsData();
  }, []);

  const navigate = useNavigate();

  const handleUpdateDetails = (e) => {
    e.preventDefault();
    setChange(!change);
    setReload(!reload);
  };

  const handleTripTypeChange = (value) => {
    dispatch(setTripType(value));
    if (value === "multicity") {
      dispatch(addFlightRow());
    } else {
      dispatch(removeFlightRow({ index: "notMultiCity" }));
    }
  };

  const { airports } = useSelector((state) => state.general);

  // new code
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

  const [isLandingDD, setIsLandingDD] = useState(false);
  const landingRef = useRef();
  useHandleClickOutside(landingRef, () => setIsLandingDD(false));
  const [landingQuery, setLandingQuery] = useState("");

  const [isTravellerDD, setIsTravellerDD] = useState(false);
  const travellerRef = useRef();
  useHandleClickOutside(travellerRef, () => setIsTravellerDD(false));

  const handleIncrementPassenger = (name, x) => {
    if (travellers[name] + x < 0) return; // Prevent negative counts

    const data = { ...travellers };

    if (name === "adult" && data[name] === 1 && x === -1) return;

    data[name] = data[name] + x;

    if (name === "infant" && data[name] > data.adult) {
      data[name] = data.adult; // Limit infants to adult count
    }

    dispatch(handleTravellersChange({ data }));
  };

  useEffect(() => {
    const handlePassenger = () => {
      const data = {
        adult: adults,
        children: childs,
        infant: infants,
      };
      dispatch(handleTravellersChange({ data }));
    };

    // Call the function when the component mounts
    handlePassenger();
  }, []);

  function YourComponent({ dispatch }) {
    useEffect(() => {
      updateTravellersFromURL(dispatch);
    }, [dispatch]);
  }

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

  // const handleSubmit = () => {
  //   let prev = localStorage.getItem("flightSearches");
  //   const info = {
  //     flightsData,
  //     tripType,
  //     travellers,
  //   };

  //   let data;

  //   if (prev) {
  //     prev = JSON.parse(prev);
  //     data = [...prev, info];
  //   } else {
  //     data = [info];
  //   }
  //   localStorage.setItem("flightSearches", JSON.stringify(data));
  //   navigate({ pathname: "/flight/order", search: `?info=${info}` });
  // };

  const handleSubmit = () => {
    const queryParams = new URLSearchParams({
      adults: travellers.adult,
      childs: travellers.children,
      infants: travellers.infant,
      class: flightsData[0].class,
      depart_date: flightsData[0].departureDate,
      fromPlace: fromPlace,
      from: from,
      to: to,
      toPlace: toPlace,
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
      data = [...prev, info];
    } else {
      data = [info];
    }

    localStorage.setItem("flightSearches", JSON.stringify(data));
    navigate(url); // Use the generated URL to navigate
  };

  return (
    <div>
      <div className="">
        <SearchCards />
      </div>

      {flightsData.map((flight, index) => (
        <div className="max-w-screen-xl mx-auto  ">
          <div className=" w-full px-4 md:py-5 mt-[-5%]">
            <div className="md:flex md:justify-between rounded-lg ">
              <div className=" w-[100%] h-[100%] md:flex gap-2">
                <div
                  ref={transferTypeRef}
                  className="relative h-10 mb-4 md:mb-0 md:w-2/12 text-gray-400 border-[1px] border-gray-100 rounded flex items-center justify-center px-3"
                >
                  <div
                    onClick={() =>
                      setIsTransferTypeDDopen(!isTransferTypeDDopen)
                    }
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <p className="text-lg text-gray-400">
                      <HiOutlineArrowRight />{" "}
                    </p>
                    <p className="font-light text-sm">
                      {tripType === "oneway"
                        ? "One way"
                        : tripType === "return"
                        ? "Return"
                        : tripType === "multicity"
                        ? "Multicity"
                        : ""}
                    </p>
                    <p className="rotate-90 text-lg text-gray-300">
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
                <div
                  ref={takeOffRef}
                  className="relative md:w-2/12 mb-10 md:mb-4 h-10 border border-gray-100 rounded flex justify-center items-center "
                >
                  <input
                    className="w-full h-full text-center pl-8 text-sm text-gray-400 font-light outline-none focus:border border-blue-600 rounded"
                    type="text"
                    onFocus={() => {
                      setTakeOffQuery("");
                      setIsTakeOffDD(true);
                      listAirports("");
                    }}
                    value={takeOffQuery}
                    placeholder={`${from} - ${fromPlace}`}
                    required
                    onChange={(e) => {
                      setTakeOffQuery(e.target.value);
                      listAirports(e.target.value);
                    }}
                  />
                  <p className="absolute left-2 top-2 text-xl text-gray-300">
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
                                setFromAirportIATA(`${airport?.iata}`);
                                setIsTakeOffDD(false);
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
                  className="relative h-10 border mb-4 md:mb-4 border-gray-100 rounded flex items-center justify-center md:w-2/12 "
                >
                  <input
                    className="w-full items-center text-center h-full pl-10 text-gray-400 font-light text-sm outline-none focus:border border-blue-600 rounded tracking-tighter"
                    type="text"
                    onFocus={() => {
                      setLandingQuery("");
                      setIsLandingDD(true);
                      listAirports("");
                    }}
                    value={landingQuery}
                    placeholder={`${to} - ${toPlace}`}
                    required
                    onChange={(e) => {
                      setLandingQuery(e.target.value);
                      listAirports(e.target.value);
                    }}
                  />
                  <p className="absolute left-4 top-2 text-lg text-gray-300">
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
                                setToAirportIATA(`${airport?.iata}`);
                                setIsLandingDD(false);
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
                  <p className="absolute md:-left-4 md:top-1 hidden md:block text-xl text-blue-600 border-blue-600 rounded-full border p-1 bg-white">
                    <RiArrowLeftRightFill />
                  </p>
                  <p className="absolute md:-left-4 md:top-1 md:hidden -top-9 text-xl text-blue-600 border-blue-600 rounded-full border p-1 bg-white">
                    <RiArrowUpDownFill />
                  </p>
                </div>
                <div className="relative md:w-2/12 h-10 mb-4 md:mb-4 flex justify-center items-center border border-gray-100 rounded ">
                  <input
                    className="w-full h-full pl-8 items-center text-center text-sm text-gray-400 font-light outline-none focus:border border-blue-600 rounded tracking-tighter"
                    type="date"
                    value={departureDate || departDate}
                    onChange={(e) => {
                      dispatch(
                        handleFlightDetailChangeZeroIndex({
                          name: "departureDate",
                          value: e.target.value,
                        })
                      );
                      setDepartureDate(e.target.value || departDate);
                    }}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  <p className="absolute left-2 top-[10px] text-lg text-gray-300">
                    <BsCalendar3 />
                  </p>
                </div>
                <div className="relative md:w-2/12 text-center mb-4 h-10 flex justify-center items-center border border-gray-100 rounded ">
                  {tripType === "return" ? (
                    <>
                      <input
                        className="w-full h-full pl-8 text-sm items-center text-center text-gray-400 font-light outline-none focus:border border-blue-600 rounded tracking-tighter"
                        type="date"
                        value={arrivalDate || return_date}
                        // onChange={(e) => {
                        //   dispatch(
                        //     handleFlightDetailChangeZeroIndex({
                        //       name: "returnDate",
                        //       value: e.target.value,
                        //     })
                        //   );
                        //   setArrivalDate(e.target.value);
                        // }}
                        onChange={(e) => {
                            const selectedReturnDate = e.target.value;
                            const flightDepartureDate =
                              flightsData?.length > 0 &&
                              departureDate || departDate;

                            // Check if the selected return date is earlier than the departure date
                            if (
                              flightDepartureDate &&
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
                              setArrivalDate(e.target.value);
                            }
                          }}
                        min={
                            flightsData?.length > 0 &&
                            departureDate || departDate
                          }
                      />
                      <p className="absolute left-2 top-[10px] text-lg text-gray-300">
                        <BsCalendar3 />
                      </p>
                    </>
                  ) : (
                    <p
                      className="pr-12 flex h-full text-center tracking-tight font-medium items-center cursor-pointer text-gray-300"
                      onClick={() => handleTripTypeChange("return")}
                    >
                      Return
                    </p>
                  )}
                </div>
                <div
                  ref={travellerRef}
                  className="relative md:w-2/12 border h-10 border-gray-100 rounded flex justify-center items-center px-4"
                >
                  <div
                    onClick={() => setIsTravellerDD(!isTravellerDD)}
                    className="cursor-pointer flex items-center gap-2 text-gray-400"
                  >
                    <p className="text-lg text-gray-400">
                      <BsPerson />{" "}
                    </p>
                    {/* <p className="font-light text-sm">{adults} Adult</p> */}
                    {travellers.children > 0 || travellers.infant > 0 ? (
                      <p className="font-light mr-[-4%] text-xs w-full">
                        {adults}A {travellers.children}C {travellers.infant}inf,{" "}
                        {tripClass || flightClass}{" "}
                      </p>
                    ) : (
                      // Render something when either children or infants (or both) are 0
                      <p className="font-light text-xs">
                        {adults} Adult, {tripClass || flightClass}
                      </p>
                    )}

                    <p className="rotate-90 text-sm text-gray-300">
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
                              <span>{travellers.adult}</span>
                              <span className="col-span-2">
                                <IncrDecsBtn name="adult" />
                              </span>
                              <p className="font-light text-fontPX">12+Years</p>
                            </div>
                          </li>
                          <li>
                            <div className="grid grid-cols-6  text-sm px-6 py-[12px] transition-all text-darktext ">
                              <span className="col-span-3">Children</span>
                              <span>{travellers.children}</span>
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
                              <span>{travellers.infant}</span>
                              <span className="col-span-2">
                                <IncrDecsBtn name="infant" />
                              </span>
                              <p className="font-light text-fontPX">
                                0-2 Years
                              </p>
                            </div>
                          </li>
                        </ul>

                        <div className="flex items-center gap-3 mt-7">
                          <button
                            onClick={() => {
                              dispatch(
                                handleFlightDetailChangeZeroIndex({
                                  name: "class",
                                  value: "Economy",
                                })
                              );
                              setIsClassSelected(true);
                              setTripClass("Economy");
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
                              setTripClass("Business");
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
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
           
            <div className="md:flex md:justify-between h-fit md:mt-1 mt-4">
            <div className="md:flex md:w-[40%] md:gap-[5%]">
                    <div
                      onClick={handleFilterCheapestClick}
                      className={`flex items-center border  gap-2 p-2 justify-around md:justify-normal cursor-pointer mb-4 md:mb-0  md:w-[100%] rounded  ${
                        selectedOption === "cheapest" ? "bg-gray-100" : ""
                      } ${selectedOption === "cheapest" ? "border" : ""}  ${selectedOption === "cheapest" ? "border-black" : "border-gray-100"}`}
                    >
                      <div className="bg-gray-100 p-1 rounded h-fit">
                        <BiDollarCircle size={20} />
                      </div>
                      <div>
                        <h1>Cheapest</h1>
                        <div className="flex gap-4">
                          <h1 className="text-xs">
                            {flightsFilter?.cheapestFlight?.fare} AED
                          </h1>
                          <h1 className="text-xs">
                            {Math.round(
                              flightsFilter?.cheapestFlight?.duration / 3600
                            )}
                            h
                          </h1>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={handleFilterClick}
                      className={`flex justify-around border md:justify-normal items-center gap-2 cursor-pointer mb-4 md:mb-0  p-2 rounded md:w-[100%] border-black  ${
                        selectedOption === "fastest" ? "bg-gray-100" : ""
                      } ${selectedOption === "fastest" ? "border" : ""}  ${selectedOption === "fastest" ? "border-black" : "border-gray-100"}`}
                    >
                      <div className="bg-gray-100 p-1 rounded">
                        <BsLightningChargeFill size={20} />
                      </div>
                      <div>
                        <h1>Fastest</h1>
                        <div className="flex gap-4">
                          <h1 className="text-xs">
                            {flightsFilter?.fastestFlight?.fare} AED
                          </h1>
                          {flightsFilter?.fastestFlight?.duration && (
                            <h1 className="text-xs">
                              {Math.round(
                                flightsFilter?.fastestFlight?.duration / 3600
                              )}
                              h
                            </h1>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
              <button
                onClick={() => {
                  handleSubmit();
                  fetchFlightsData();
                }}
                className="px-3 md:w-[10%] w-full h-10 cursor-pointer text-white bg-black hover:bg-darktext rounded shadow-sm"
              >
                Search
              </button>
            </div>
            {/* <div className="flex flex-wrap items-center gap-3 mt-7">
              <button
                onClick={() => {
                  dispatch(
                    handleFlightDetailChangeZeroIndex({
                      name: "class",
                      value: "Economy",
                    })
                  );
                  setIsClassSelected(true);
                  setTripClass("Economy");
                }}
                className={`text-sm px-4 h-10 rounded-full border ${
                  flightsData?.length > 0 && flightsData[0]?.class === "Economy"
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
                  setTripClass("Business");
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
              <button
                onClick={() => {
                  dispatch(
                    handleFlightDetailChangeZeroIndex({
                      name: "class",
                      value: "First",
                    })
                  );
                  setIsClassSelected(true);
                  setTripClass("First");
                }}
                className={`text-sm px-4 h-10 rounded-full border ${
                  flightsData?.length > 0 && flightsData[0]?.class === "First"
                    ? " border-blue-600 text-blue-600 bg-blue-100/70 shadow-sm "
                    : " text-gray-400 border-gray-100 "
                }  font-semibold outline-none`}
              >
                First class
              </button>
            </div> */}
          </div>
          {/* <div className="px-10 flex justify-center mt-4 ">
          <div className="w-[100%] bg-white flex rounded-md px-10 relative shadow-md">
            <div className="text-[30px] cursor-pointer text-blue-500 absolute top-0 left-0 h-[100%] w-[40px] grid place-items-center border-r-2">
              <AiFillCaretLeft />
            </div>
            <div className="text-[30px] cursor-pointer text-blue-500 absolute top-0 right-0 h-[100%] w-[40px] grid place-items-center border-l-2">
              <AiFillCaretRight />
            </div>
            <div className="flex border-b-[1px] min-w-[100%] overflow-hidden">
              {Array.from({ length: 10 }).map((ele, i) => (
                <>
                  <div
                    className={`py-5 flex h-[100%] flex-col px-8 items-center min-w-[146px] cursor-pointer ${
                      i === 0 && "border-b-2 border-blue-400"
                    }`}
                  >
                    <h2 className="text-[14px]">Mon, 27 Feb</h2>
                    <h2 className="font-medium">AED 234</h2>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div> */}
          <hr />
          <div className=" w-[100%] md:grid md:grid-cols-8 py-10 px-4 gap-5">
            <div className="col-span-2">
              <FlightFilter
                selectedStops={selectedStops}
                setSelectedStops={setSelectedStops}
                selectedDepartureTimes={selectedDepartureTimes}
                setSelectedDepartureTimes={setSelectedDepartureTimes}
                selectedAirline={selectedAirline}
                setSelectedAirline={setSelectedAirline}
                selectedTripDuration={selectedTripDuration}
                setSelectedTripDuration={setSelectedTripDuration}
                selectedTripFare={selectedTripFare}
                setSelectedTripFare={setSelectedTripFare}
                selectedTripLayover={selectedTripLayover}
                setSelectedTripLayover={setSelectedTripLayover}
                flightFilter={flightsFilter}
                flightsLength={flightsLength}
                renderFlightsLength={renderFlightsLength}
              />
            </div>
            <div className="md:flex md:flex-wrap md:col-span-6 md:flex-col">
              {/* {loading && (
                <>
                  <div className="md:flex md:gap-10 md:mb-5 animate-pulse w-full">
                    <div
                      onClick={handleFilterCheapestClick}
                      className={`flex items-center gap-2 p-2 cursor-pointer border  md:w-[30%] rounded-lg border-black ${
                        selectedOption === "cheapest" ? "bg-white" : ""
                      } ${
                        selectedOption === "cheapest" ? "border-gray-100" : ""
                      }`}
                    >
                      <div className="bg-gray-100 p-1 rounded h-fit">
                        <BiDollarCircle size={20} />
                      </div>
                      <div>
                        <h1 className="text-sm text-transparent mt-2 bg-gray-100 w-[200%] rounded">
                          Cheapest
                        </h1>
                        <div className="flex gap-4">
                          <h1 className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                            {flightsFilter?.cheapestFlight?.fare} AED
                          </h1>
                          <h1 className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                            {Math.round(
                              flightsFilter?.cheapestFlight?.duration / 3600
                            )}
                            h
                          </h1>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={handleFilterClick}
                      className={`flex items-center gap-2 cursor-pointer border  p-2 rounded-lg md:w-[30%] border-black  ${
                        selectedOption === "fastest" ? "bg-white" : ""
                      } ${
                        selectedOption === "cheapest" ? "border-gray-100" : ""
                      }`}
                    >
                      <div className="bg-gray-100 p-1 rounded">
                        <BsLightningChargeFill size={20} />
                      </div>
                      <div className="w-full">
                        <h1 className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                          Fastest
                        </h1>
                        <div className="flex gap-4">
                          <h1 className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                            {flightsFilter?.fastestFlight?.fare} AED
                          </h1>
                          {flightsFilter?.fastestFlight?.duration && (
                            <h1 className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                              12 h
                            </h1>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )} */}

              {/* {!loading && (
                <>
                  <div className="md:flex md:gap-10 mb-5">
                    <div
                      onClick={handleFilterCheapestClick}
                      className={`flex items-center gap-2 p-2 justify-around md:justify-normal cursor-pointer mb-4 md:mb-0  md:w-[30%] rounded-lg border-black ${
                        selectedOption === "cheapest" ? "bg-gray-100" : ""
                      } ${selectedOption === "cheapest" ? "border" : ""}`}
                    >
                      <div className="bg-gray-100 p-1 rounded h-fit">
                        <BiDollarCircle size={20} />
                      </div>
                      <div>
                        <h1>Cheapest</h1>
                        <div className="flex gap-4">
                          <h1 className="text-xs">
                            {flightsFilter?.cheapestFlight?.fare} AED
                          </h1>
                          <h1 className="text-xs">
                            {Math.round(
                              flightsFilter?.cheapestFlight?.duration / 3600
                            )}
                            h
                          </h1>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={handleFilterClick}
                      className={`flex justify-around md:justify-normal items-center gap-2 cursor-pointer  p-2 rounded-lg md:w-[30%] border-black  ${
                        selectedOption === "fastest" ? "bg-gray-100" : ""
                      } ${selectedOption === "fastest" ? "border" : ""}`}
                    >
                      <div className="bg-gray-100 p-1 rounded">
                        <BsLightningChargeFill size={20} />
                      </div>
                      <div>
                        <h1>Fastest</h1>
                        <div className="flex gap-4">
                          <h1 className="text-xs">
                            {flightsFilter?.fastestFlight?.fare} AED
                          </h1>
                          {flightsFilter?.fastestFlight?.duration && (
                            <h1 className="text-xs">
                              {Math.round(
                                flightsFilter?.fastestFlight?.duration / 3600
                              )}
                              h
                            </h1>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )} */}

              {!loading && (
                <>
                  <div className="md:grid hidden grid-cols-12 items-center place-items-center text-sm text-gray-300 font-medium min-w-[400px] w-full bg-stone-100 p-2 rounded mb-4">
                    <div className="col-span-2">Airlines</div>
                    <div className="col-span-1">Departure</div>
                    <div className="col-span-2">Duration</div>
                    <div className="col-span-1">Arrival</div>
                    <div className="col-span-4">Price</div>
                    <div className="col-span-2"></div>
                  </div>
                </>
              )}

              {loading && (
                <>
                  <div className="grid grid-cols-12 animate-pulse  items-center place-items-center text-sm text-gray-300 font-medium min-w-[400px] w-full bg-stone-100 p-2 rounded mb-4">
                    <h1 className="col-span-2 animate-pulse  mr-4 text-transparent bg-gray-100 rounded">
                      Airlines
                    </h1>
                    <div className="col-span-1 animate-pulse  mr-6  text-transparent bg-gray-100 rounded">
                      Departure
                    </div>
                    <div className="col-span-2 animate-pulse  mr-2  text-transparent bg-gray-100 rounded">
                      Duration
                    </div>
                    <div className="col-span-1 animate-pulse mr-2  text-transparent bg-gray-100 rounded">
                      Arrival
                    </div>
                    <div className="col-span-4 animate-pulse  mr-2  text-transparent bg-gray-100 rounded">
                      Price
                    </div>
                    <div className="col-span-2"></div>
                  </div>
                </>
              )}
              {loading && (
                <>
                  <div className="animate-pulse w-full">
                    {Array.from({ length: 6 }).map((ele) => (
                      <>
                        <div className="grid grid-cols-12 h-[20%] place-items-center cursor-default border border-gray-100 p-2 mt-4">
                          <div className="col-span-2">
                            <div className="flex gap-2 items-center">
                              <div className="">
                                <p className="text-transparent bg-gray-100 rounded h-4 w-14">
                                  Flight Details
                                </p>
                              </div>
                              <div className="">
                                <p className="text-transparent bg-gray-100 rounded h-4">
                                  Air Asia
                                </p>
                                <p className="text-transparent bg-gray-100 rounded h-2 w-10 mt-1">
                                  sg121
                                </p>
                              </div>
                            </div>
                            <div class="flex justify-end">
                              <p className="text-transparent bg-gray-100 rounded h-2 w-14 mt-1 mb-1">
                                Flight Details
                              </p>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <div className="text-transparent bg-gray-100 rounded h-3">
                              19:00
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="text-xs">
                              <p className="text-transparent bg-gray-100 rounded h-2 mb-1">
                                2h55m
                              </p>
                              <hr />
                              <p className="text-transparent bg-gray-100 rounded h-2 mt-1">
                                Non-stop
                              </p>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <div className="text-transparent bg-gray-100 rounded h-3">
                              22:45
                            </div>
                          </div>
                          <div className="col-span-4">
                            <div className="">
                              <div class="flex justify-end">
                                <p class="text-transparent bg-gray-100 rounded h-3 w-12 mb-1">
                                  305 AED
                                </p>
                              </div>
                              <p className="text-transparent bg-gray-100 rounded h-3">
                                Get 10 AED off with CTDOM
                              </p>
                            </div>
                          </div>
                          <div className="col-span-2 w-full">
                            <button className="text-transparent bg-gray-100 rounded w-full h-full">
                              Book
                            </button>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </>
              )}

              {!loading && (
                <>
                  {flight?.length === 0 && (
                    <div className="min-w-[400px] w-full p-20 rounded mb-4 text-center items-center">
                      <h2 className="text-black text-3xl">
                        No matching flights found between <br /> {from} to {to}{" "}
                        for these dates.
                      </h2>
                      <p className="p-2">
                        Try removing some other filters to see more results.
                      </p>
                    </div>
                  )}

                  {renderFlights?.map((ele, i) => (
                    <div className=" w-full flex flex-col gap-4 relative">
                      <FlightCard index={i} data={ele} searchId={searchId} />
                      {/* <FlightCard index={""} data={""} /> */}
                    </div>
                  ))}
                </>
              )}
              {/* <div className="w-full ">
              <div className="w-full  relative">
                <RoundTripFlightCard />
              </div>
            </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightHomePage;
