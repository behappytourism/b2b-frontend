import React, { useEffect, useRef, useState } from "react";
import formatDate from "../../../utils/formatDate";
import {
  MdOutlineArrowRightAlt,
  MdOutlineFlight,
  MdOutlineFlightLand,
  MdOutlineFlightTakeoff,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetSelectedAddOns, setSelectedFlight } from "../../../redux/slices/flightSlice";
import { useHandleClickOutside } from "../../../hooks";
import priceConversion from "../../../utils/PriceConversion";
import axios from "../../../axios";

import {
  AiOutlineClockCircle,
  AiOutlineDown,
  AiOutlineUp,
} from "react-icons/ai";
import FlightDetailsCards from "./FlightDetailsCards";
import { RiArrowLeftRightFill } from "react-icons/ri";
import FlightMobileDetailsCard from "./FlightMobileDetailsCard";
import { BtnLoader } from "../../components";

const FlightCard = ({ data, index, searchId }) => {
  const { token } = useSelector((state) => state.agents);
  const { tbId } = useParams();
  // console.log(data, "beta data");
  const dispatch = useDispatch();
  const cardRef = useRef();
  const dropDownRef = useRef();
  const navigate = useNavigate();

  const [showFare, setshowFare] = useState(false);
  const [showSegments, setShowSegments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(Array(data?.fares?.length).fill(false));
  const [manageInformation, setManageInformation] = useState("flight");
  const [view, setView] = useState(true);

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

  const bookingData = async (dataATC) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/b2b/flight/addToCart", dataATC, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        const tbId = res?.data?.tbId;
       // navigate(`/b2b/flight/${tbId}`);
        const newTabUrl = `/b2b/flight/${tbId}`; // Assuming tbId is a variable you want to use
        window.open(newTabUrl, "_blank");

        dispatch(resetSelectedAddOns());
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };


  // const handleClick = () => {
  //   dispatch(setSelectedFlight(data));
  //   navigate("/b2b/flight/:tbId");
  // };

  const handleClick = (fareKey, index) => {
    dispatch(setSelectedFlight(data));
    const flightInfo = {
      data: data,
      searchId: searchId,
      fareKey: fareKey,
    };
    const dataATC = {
      searchId: searchId,
      fsrId: data?.fsrId,
      selectedFareKey: fareKey,
    };
    

    bookingData(dataATC)

    const updatedLoading = [...buttonLoading];
    updatedLoading[index] = true; // Set the clicked button to loading state
    setButtonLoading(updatedLoading);


    // Simulate loading delay (you can replace this with your actual loading logic)
    setTimeout(() => {
      // After loading, reset the loading state for the clicked button
      updatedLoading[index] = false;
      setButtonLoading(updatedLoading);
      // Add your logic to perform the booking here
    }, 2000); // Adjust the delay time as needed
    

    
     //console.log(dataATC)

    //localStorage.setItem("selectedFlight", JSON.stringify(flightInfo));
  };

  useEffect(() => {
    // This effect runs whenever buttonLoading changes
    const resetLoadingState = () => {
      const updatedLoading = [...buttonLoading];
      updatedLoading.fill(false); // Reset all buttons to not loading
      setButtonLoading(updatedLoading);
    };

    const timer = setTimeout(() => {
      // After loading delay, reset the loading state for all buttons
      resetLoadingState();
    }, 1000); // Adjust the delay time as needed

    // Clean up the timer when the component unmounts or when buttonLoading changes
    return () => clearTimeout(timer);
  }, [isLoading === false]);

  useEffect(() => {
    // This effect runs whenever buttonLoading changes
    const resetLoadingState = () => {
      const updatedLoading = [...buttonLoading];
      updatedLoading.fill(false); // Reset all buttons to not loading
      setButtonLoading(updatedLoading);
    };

    const timer = setTimeout(() => {
      // After loading delay, reset the loading state for all buttons
      resetLoadingState();
    }, 1000); // Adjust the delay time as needed

    // Clean up the timer when the component unmounts or when buttonLoading changes
    return () => clearTimeout(timer);
  }, [isLoading]);
  

  const findFlightDuration = (from, to) => {
    const duration = new Date(to) - new Date(from);
    let flightDuration = duration / (1000 * 60);
    const min = parseInt(flightDuration % 60);
    const hours = parseInt(flightDuration / 60);
    return `${hours} Hr. ${min} min`;
  };

  const findFlightDurationSegments = (from, to) => {
    const duration = new Date(to) - new Date(from);
    let flightDuration = duration / (1000 * 60);
    const min = parseInt(flightDuration % 60);
    const hours = parseInt(flightDuration / 60);
    return `${hours} Hr. ${min} min`;
  };

  const handleShowSegmets = () => {
    setShowSegments(!showSegments);
  };

  const handleshowFare = () => {
    setshowFare(!showFare);
  };

  const handleDetails = (res) => {
    setManageInformation(res);
  };

  const { selectedCurrency } = useSelector((state) => state.home);



  // console.log(data, "data of flights")
  return (
    <>
      <div className="text-gray-300  md:min-w-[400px] w-full border border-gray-100 md:p-3 p-2 rounded mb-4">
        {data?.trips?.map((ele) => {
          const firstSegment = ele.flightSegments[0];
          const secondSegment = ele.flightSegments[1];
          return (
            // <div
            //   onClick={handleshowFare}
            //   className="grid grid-cols-12 place-items-center cursor-default"
            // >
            //   <div className="col-span-2">
            //     <div className="flex gap-2 items-center">
            //       <div className="">
            //         <img
            //           src={firstSegment?.airlineLogo}
            //           alt=""
            //           className="h-[35px]"
            //         />
            //       </div>
            //       <div className="">
            //         <p className="text-gray-400">{firstSegment?.airlineName}</p>
            //         <p className="text-xs uppercase">
            //           {firstSegment?.flightNumber}
            //         </p>
            //       </div>
            //     </div>
            //     <p className="text-xs font-semibold text-blue-600 pt-1">
            //       Flight Details
            //     </p>
            //   </div>
            //   <div className="col-span-1">
            //     <div className="text-lg text-gray-400 tracking-tight">
            //       {" "}
            //       {firstSegment?.departureDate.split("T")[1].split(":")[0]}:
            //       {firstSegment?.departureDate.split("T")[1].split(":")[1]}{" "}
            //     </div>
            //   </div>
            //   <div className="col-span-2">
            //     <div className="text-xs">
            //       <p className="text-center">
            //       {calculateDuration(
            //       firstSegment.departureDate,
            //       secondSegment?.arrivalDate || firstSegment?.arrivalDate
            //     )}

            //                       </p>
            //                       <hr />
            //                       {data?.trips?.map((ele) => (
            //       <React.Fragment key={ele.someUniqueKey}>
            //         {ele?.flightSegments?.map((segments) => (
            //           <p className="text-center">{segments.from} - {segments.to}</p>
            //         ))}
            //       </React.Fragment>
            //     ))}

            //     </div>
            //   </div>
            //   <div className="col-span-1">
            //     <div className="text-lg text-gray-400 tracking-tight">
            //       {" "}
            //               {secondSegment?.arrivalDate.split("T")[1]?.split(":")[0] ||
            //               firstSegment?.arrivalDate.split("T")[1]?.split(":")[0]}:
            //             {secondSegment?.arrivalDate.split("T")[1]?.split(":")[1] ||
            //               firstSegment?.arrivalDate.split("T")[1]?.split(":")[1]}{" "}
            //     </div>
            //   </div>
            //   <div className="col-span-4">
            //     <div className="">
            //       <p className="font-semibold text-gray-400 text-right">
            //         {data?.netFare.toFixed()} AED
            //       </p>
            //       <p className="text-white text-[10px] font-medium tracking-tight bg-green-600 rounded px-2 py-1">
            //         Get 10 AED off with CTDOM
            //       </p>
            //     </div>
            //   </div>
            // </div>

            <div className="md:mb-4 w-full">
              <div className="hidden md:block">
                <FlightDetailsCards
                  ele={ele}
                  firstSegment={firstSegment}
                  secondSegment={secondSegment}
                  data={data}
                  calculateDuration={calculateDuration}
                  handleClick={handleClick}
                />
              </div>

              <div className="md:hidden block">
                <FlightMobileDetailsCard
                  ele={ele}
                  firstSegment={firstSegment}
                  secondSegment={secondSegment}
                  data={data}
                  calculateDuration={calculateDuration}
                  handleClick={handleClick}
                />
              </div>
            </div>
          );
        })}
        <div className="col-span-4">
          <div className="flex">
            <p className="flex gap-4 cursor-pointer  absolute top-4 md:top-8 md:right-[34.5%] right-[22.5%]  text-gray-400  w-fit p-2 rounded items-center text-xs text-center font-bold">
              {data?.currency}
            </p>
            <p className="flex gap-4 cursor-pointer  absolute top-3 md:top-7 md:right-[27%] right-[2%]   text-gray-400  w-fit p-2 rounded items-center text-center font-bold">
              {data?.netFare.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="col-span-2 w-full">
          {data?.fares?.length > 0 && (
            <div
              onClick={() => setView(!view)}
              className="flex gap-4 cursor-pointer border absolute md:top-7 top-14 right-2 md:right-2 border-orange-500 hover:border-orange-800 text-orange-500  w-fit p-2 rounded items-center text-center font-bold"
            >
              <p>{view ? "View Price" : "Hide Price"} </p>
              {view ? <AiOutlineDown /> : <AiOutlineUp />}
            </div>
          )}
          {data?.fares?.length === 0 && (
            <button
              onClick={() => handleClick(data?.trips[0]?.fareDetails?.fareKey)}
              className="bg-main text-white text-sm font-semibold h-10 w-40 rounded absolute top-7 right-2"
            >
              {isLoading ? <BtnLoader /> : "Book"}
            </button>
          )}
        </div>

        {data?.fares?.map((ele, index) => {
          return (
            <>
              {view === false && (
                <div className="w-full border border-gray-100 p-3 rounded mt-4">
                  {/* <div className="flex justify-between items-center">
                      <div className="">
                        <p className="flex gap-2">
                          <span className="text-xs border border-gray-300 rounded-full px-2 py-[2px]">
                            Partially Refundable
                          </span>
                          <span className="text-xs text-blue-500 font-medium">
                            Know more
                          </span>
                        </p>
                      </div>
                    </div> */}
                  <div className="md:flex md:justify-between gap-4 mt-3">
                    <div className="md:mt-4 mt-0">
                      <div className="text-xs flex gap-2 items-center">
                        {/* <div className="">
                          <img
                            src={data?.trips[0]?.flightSegments[0]?.airlineLogo}
                            alt=""
                            className="h-[35px]"
                          />
                        </div> */}
                        <div>
                          <p className="text-gray-400 text-lg">
                            {data?.trips[0]?.flightSegments[0]?.airlineName}
                          </p>
                          <p className="tracking-tight">
                            {data?.trips[0]?.flightSegments[0]?.flightNumber}
                          </p>
                          <p className="tracking-tight">{data.cabinType}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center text-center gap-2 mt-2 md:-mt-9">
                      <div className="">
                        <div className="">
                          <p className="flex gap-12 text-lg text-gray-400">
                            <span className="">
                              {data?.trips[0]?.departureAirport}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div>
                        <RiArrowLeftRightFill />
                      </div>

                      <div className="">
                        <div className="">
                          <p className="flex gap-2 text-lg text-gray-400">
                            <span className="">
                              {data?.trips[0]?.arrivalAirport}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="md:items-center md:text-center md:mt-4">
                      <div className="">
                        <table className="md:w-full">
                          <tbody>
                            <tr>
                              <td className="text-xs py-1">Check-in Baggage</td>
                              <td className="text-xs py-1 text-gray-400 font-medium">
                                {data.type === "oneway"
                                  ? ele?.checkInBaggageWeight
                                  : ele?.checkInBaggageWeight}{" "}
                                kg / adult
                              </td>
                            </tr>
                            <tr>
                              <td className="text-xs py-1">Cabin baggage</td>
                              <td className="text-xs py-1 text-gray-400 font-medium">
                                {ele?.cabinBaggageWeight} kg / adult
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="text-right md:relative absolute right-10 md:right-0 md:mt-0 mt-[-120px]">
                      <p className="font-bold text-black mr-[-20px] md:mr-0">
                        {ele?.netFare.toFixed(2)} {ele?.currency}
                      </p>
                      <h1 className="text-gray-300 mr-[-20px] md:mr-0  text-sm font-semibold my-2 rounded ">
                        ({ele?.fareName})
                      </h1>
                      <button
                        onClick={() => handleClick(ele.fareKey, index)}
                        className="bg-main text-white mt-2 text-sm font-semibold md:h-10 h-12 w-[140%] md:w-40 rounded "
                      >
                      {buttonLoading[index] ? <BtnLoader /> : "Book"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })}

        {/* {data?.fares?.map((ele) => (
          <React.Fragment key={ele.someUniqueKey}>
            {ele?.flightSegments?.map((segments) => (
              <div key={segments.someOtherUniqueKey}>
                {view === false && (
                  <div className="w-full border border-gray-100 p-3 rounded mt-4">
                    <div className="flex justify-between items-center"> */}
        {/* <div className="">
                        <p className="flex gap-2">
                          <span className="text-xs font-medium text-gray-400 tracking-tight">
                            {data.type === "oneway"
                              ? ""
                              : segments.fromCountry.toUpperCase()}
                          </span>
                          <span className="text-gray-400">
                            <MdOutlineArrowRightAlt />
                          </span>
                          <span className="text-xs font-medium text-gray-400 tracking-tight">
                            {data.type === "oneway"
                              ? segments.toCountry
                              : segments.toCountry.toUpperCase()}
                          </span>
                          <span className="text-xs">
                            {formatDate(segments.departureDate)}
                          </span>
                        </p>
                      </div> */}
        {/* <div className="">
                        <p className="flex gap-2">
                          <span className="text-xs border border-gray-300 rounded-full px-2 py-[2px]">
                            Partially Refundable
                          </span>
                          <span className="text-xs text-blue-500 font-medium">
                            Know more
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between gap-4 mt-3">

                      <div className="">
                        <div className="text-xs">
                          <div className="">
                            <img
                              src="https://play-lh.googleusercontent.com/HoSNU1K6pOnd3ZFkUfhyvqF5FzTOttsCOjwXDfaS-UOxYGF4OnKlkvrn4PrSuzwO8Lg"
                              alt=""
                              className="h-[35px]"
                            />
                          </div>
                          <p className="tracking-tight">
                            {segments.airlineName}
                          </p>
                          <p className="tracking-tight">
                            {segments.flightNumber}
                          </p>
                          <p className="tracking-tight">{data.cabinType}</p>
                        </div>
                      </div>


                      <div className="flex items-center text-center gap-2 ">
                        <div className="">
                          <div className="">
                            <p className="flex gap-12 text-lg text-gray-400">
                              <span className="">{segments.from}</span>
                            </p>
                          </div>
                        </div>

                        <div>
                          <RiArrowLeftRightFill />
                        </div>

                        <div className="">
                          <div className="">
                            <p className="flex gap-2 text-lg text-gray-400">
                              <span className="">{segments.to}</span>
                            </p>
                          </div>
                        </div>
                      </div>


                      <div className="items-center text-center mt-4">
                        <div className="">
                          <table className="w-full">
                            <tbody>
                              <tr>
                                <td className="text-xs py-1">
                                  Check-in Baggage
                                </td>
                                <td className="text-xs py-1 text-gray-400 font-medium">
                                  {data.type === "oneway"
                                    ? ele?.fareDetails?.checkInBaggageWeight
                                    : ele?.fareDetails
                                        ?.checkInBaggageWeight}{" "}
                                  kg / adult
                                </td>
                              </tr>
                              <tr>
                                <td className="text-xs py-1">Cabin baggage</td>
                                <td className="text-xs py-1 text-gray-400 font-medium">
                                  {ele?.fareDetails?.cabinBaggageWeight} kg /
                                  adult
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>


                      <div className="text-right">
                        <p className="font-bold text-black">
                          {data?.netFare.toFixed(2)} {data?.currency}
                        </p>
                        <h1 className="text-gray-300 text-sm font-semibold my-1 rounded ">
                          ({data?.trips[0]?.fareDetails?.fareName})
                        </h1>
                        <button
                          onClick={handleClick}
                          className="bg-main text-white text-sm font-semibold h-10 w-40 rounded "
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </React.Fragment>
        ))} */}
      </div>
    </>
  );
};

export default FlightCard;
