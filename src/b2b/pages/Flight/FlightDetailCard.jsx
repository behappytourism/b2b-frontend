import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import FlightConfirmation from "./FlightConfirmation";
import { useDispatch, useSelector } from "react-redux";
import OtpModalFlight from "./OtpModalFlight";
import { useParams } from "react-router-dom";
import axios from "../../../axios";
import { orderFlightDetails } from "../../../redux/slices/flightSlice";
import { BtnLoader } from "../../components";
import { useEffect } from "react";

function FlightDetailCard({ updateSharedState }) {
  const dispatch = useDispatch();
  const { tbId } = useParams();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.agents);
  const { flightFullData, selectedAddOns } = useSelector(
    (state) => state.flight
  );
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [error, setError] = useState("");

  const [flightOrderId, setFlightOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    travellerDetails,
    commonDetails,
    selectedFlight,
    tripType,
    travellers,
  } = useSelector((state) => state.flight);

  const handleClick = () => {
    // Perform some action
    // Call the function from props to update shared state
    setIsLoading(true);
    sendTravellersDetails();
  };

  useEffect(() => {
    setIsLoading(false)
  },[showOtpModal === false])

  const formatDate = (dateString, includeYear = false) => {
    const options = { weekday: "short", day: "numeric", month: "long" };
    if (includeYear) {
      options.year = "numeric";
    }
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateTotalPrice = () => {
    const flightFare = flightFullData?.priceQuoteResponse?.netFare || 0;

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

  // const body = {
  //   tbId: tbId,
  //   // identifierToken: selectedFlight?.identifierToken,
  //   // noOfAdults: travellers?.adult,
  //   // noOfChildren: travellers?.children,
  //   // noOfInfants: travellers?.infant,
  //   // type: tripType,
  //   contactDetails: {
  //     email: commonDetails.email,
  //     phoneCode: commonDetails.phoneCode,
  //     phoneNumber: commonDetails.contactNo,
  //   },
  //   passengerDetails: travellerDetails,
  // };
  // const sendTravellersDetails = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await axios.post("/b2b/flight/bookings/initiate", body, {
  //       headers: { authorization: `Bearer ${token}` },
  //     });
  //     if (res.status === 200) {
  //       setFlightOrderId(res.data.flightOrderId); // Store the flightOrderId in state
  //       setShowOtpModal(true); // Show the OTP modal
  //       // ...
  //     }
  //     const identifierToken = selectedFlight?.identifierToken;
  //     // const {identifierToken,orderId} = res.data

  //     dispatch(orderFlightDetails({ identifierToken }));
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //   }
  // };

  const body = {
    tbId: tbId,
    // identifierToken: selectedFlight?.identifierToken,
    // noOfAdults: travellers?.adult,
    // noOfChildren: travellers?.children,
    // noOfInfants: travellers?.infant,
    // type: tripType,
    contactDetails: {
      email: commonDetails.email,
      phoneCode: commonDetails.phoneCode,
      phoneNumber: commonDetails.contactNo,
    },
    passengerDetails: travellerDetails,
  };

  const sendTravellersDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/b2b/flight/bookings/initiate", body, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setFlightOrderId(res.data.flightOrderId); // Store the flightOrderId in state
        const bookingId = res?.data?.flightOrderId;
        setShowOtpModal(true); // Show the OTP modal

        // ...
      }
      const identifierToken =
        flightFullData?.priceQuoteResponse?.identifierToken;
      // const {identifierToken,orderId} = res.data

      dispatch(orderFlightDetails({ identifierToken }));
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.error);
      setLoading(false);
      setIsLoading(false);
    }
  };

  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  //console.log(selectedAddOns, "selectedaddons");
  //console.log(flightFullData, "flightFullData");

  return (
    <>
      <div className="pb-2 p-2 w-full">
        <div className="border-b-1 rounded-md px-2 md:px-2 py-7 lg:mt-5 w-full">
          <div className=" lg:block rounded-2xl space-y-4 bg-white relative ">
            <input
              type="checkbox"
              className="peer absolute top-5 w-full h-5 inset-x-0  cursor-pointer opacity-0"
              defaultChecked
              onChange={handleCheckboxChange}
            />
            <div className="flex justify-between">
              <div className="flex gap-4">
                <span
                  className={`font-[600] h-8 w-8 items-center text-center text-[20px] ${
                    isChecked ? "text-gray-400" : "text-slate-400"
                  } rounded-full border border-gray-200`}
                >
                  5
                </span>
                <span
                  className={`font-[600] text-[20px] ${
                    isChecked ? "text-gray-400" : "text-slate-400"
                  }`}
                >
                  Confirm Details
                </span>
              </div>
              <span
                className={`text-xl ${
                  isChecked ? "text-slate-400" : "text-gray-400"
                }`}
              >
                <AiOutlinePlus />{" "}
              </span>
            </div>
            <div className="peer-checked:max-h-[100%] max-h-0 transition-all duration-500  overflow-x-auto space-y-3">
              <div className="bg-gray-100 min-h-screen flex flex-col items-center">
                <div className="text-center">
                  <h1 className="p-4 md:font-bold font-semibold text-xl">
                    Confirmation Flight Page
                  </h1>
                </div>
                <div className="bg-white rounded-lg  shadow-md w-full">
                  <h2 className="md:text-lg md:font-semibold mb-4 text-center">
                    Journey Details
                  </h2>
                  <div className="md:flex justify-between overflow-x-auto">
                    <div className="mb-4 flex gap-2">
                      <div>
                        {flightFullData?.priceQuoteResponse?.trips?.map(
                          (trip, tripIndex) => (
                            <div key={tripIndex}>
                              {trip?.flightSegments?.map(
                                (segment, segmentIndex) => (
                                  <div key={segmentIndex}>
                                    <div className="flex gap-2">
                                      <div className="md:mb-4 flex gap-2">
                                        <h2>From </h2>
                                        <h2 className="md:text-xl text-lg md:font-bold">
                                          {segment.from}
                                        </h2>
                                      </div>
                                      -
                                      <div className="md:mb-4 flex gap-2">
                                        <h2>To </h2>
                                        <h2 className="md:text-xl text-lg md:font-bold">
                                          {segment.to}
                                        </h2>
                                      </div>
                                      <div className="md:mb-4 hidden md:flex gap-2">
                                        <h2>On</h2>
                                        <h2 className="md:text-xl text-sm font-bold">
                                          {formatDate(
                                            segment.departureDate,
                                            true
                                          )}
                                        </h2>
                                      </div>
                                    </div>
                                    <div className="md:mb-4 flex md:hidden gap-2">
                                        <h2>On</h2>
                                        <h2 className="md:text-xl text-lg md:font-bold">
                                          {formatDate(
                                            segment.departureDate,
                                            true
                                          )}
                                        </h2>
                                      </div>
                                  </div>
                                )
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h4>Number of Passenger</h4>
                      <div className="flex gap-2">
                        <h2>Adult: </h2>
                        <h2 className="font-bold">
                          {flightFullData?.priceQuoteResponse?.noOfAdults}
                        </h2>
                      </div>
                      {flightFullData?.priceQuoteResponse?.noOfChildren > 0 && (
                        <div className="flex gap-2">
                          <h2>Children: </h2>
                          <h2 className="font-bold">
                            {flightFullData?.priceQuoteResponse?.noOfChildren}
                          </h2>
                        </div>
                      )}
                      {flightFullData?.priceQuoteResponse?.noOfInfants > 0 && (
                        <div className="flex gap-2">
                          <h2>Infants: </h2>
                          <h2 className="font-bold">
                            {flightFullData?.priceQuoteResponse?.noOfInfants}
                          </h2>
                        </div>
                      )}
                    </div>
                  </div>

                  <h2 className="md:text-4xl text-lg font-semibold mb-4 pt-4 text-center">
                    Passenger Detail
                  </h2>

                  {/* <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">First Name</th>
              <th className="border px-4 py-2">Last Name</th>
              <th className="border px-4 py-2">Birth Date</th>
              <th className="border px-4 py-2">Gender</th>
              <th className="border px-4 py-2">Nationality</th>
              <th className="border px-4 py-2">Passport Number</th>
              <th className="border px-4 py-2">Passport Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {travellerDetails.map((traveller, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="border px-4 py-2">
                  {traveller.firstName.charAt(0).toUpperCase() +
                    traveller.firstName.slice(1)}
                </td>
                <td className="border px-4 py-2">
                  {traveller.lastName.charAt(0).toUpperCase() +
                    traveller.lastName.slice(1)}
                </td>
                <td className="border px-4 py-2">{traveller.birthDate}</td>
                <td className="border px-4 py-2">{traveller.gender}</td>
                <td className="border px-4 py-2">{traveller.nationality}</td>
                <td className="border px-4 py-2">{traveller.passportNumber}</td>
                <td className="border px-4 py-2">{traveller.passportExpiry}</td>
              </tr>
            ))}
          </tbody>
        </table> */}

                  {travellerDetails.length > 0 && (
                    <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse ">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2">First Name</th>
                          <th className="border px-4 py-2">Last Name</th>
                          <th className="border px-4 py-2">Birth Date</th>
                          <th className="border px-4 py-2">Gender</th>
                          <th className="border px-4 py-2">Nationality</th>
                          <th className="border px-4 py-2">Passport Number</th>
                          {/* <th className="border px-4 py-2">
                            Passport Expiry Date
                          </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {travellerDetails.map((traveller, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-gray-100" : "bg-gray-100"
                            }
                          >
                            <td className="border px-4 py-2">
                              {traveller.firstName.charAt(0).toUpperCase() +
                                traveller.firstName.slice(1)}
                            </td>
                            <td className="border px-4 py-2">
                              {traveller.lastName.charAt(0).toUpperCase() +
                                traveller.lastName.slice(1)}
                            </td>
                            <td className="border px-4 py-2">
                              {new Date(traveller.birthDate)
                                .toLocaleDateString("en-GB", {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                })
                                .split("/")
                                .join("-")}
                            </td>
                            <td className="border px-4 py-2">
                              {traveller.gender}
                            </td>
                            <td className="border px-4 py-2">
                              {traveller.nationality}
                            </td>
                            <td className="border px-4 py-2">
                              {traveller.passportNumber}
                            </td>
                            {/* <td className="border px-4 py-2">
                              {new Date(traveller.passportExpiry)
                                .toLocaleDateString("en-GB", {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                })
                                .split("/")
                                .join("-")}
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  )}

                  <h2 className="md:text-4xl text-lg font-semibold mb-4 pt-4 text-center">
                    Trip Details :
                  </h2>
                  <div className="">
                    <table className="table-auto w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2">Trip Type</th>
                          <th className="border px-4 py-2">Trip Fare</th>
                          <th className="border px-4 py-2">
                            Trip Travel Class
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-gray-100">
                          <td className="border px-4 py-2">
                            {flightFullData?.priceQuoteResponse?.type}
                          </td>
                          <td className="border px-4 py-2">
                            {flightFullData?.priceQuoteResponse?.netFare}{" "}
                            {flightFullData?.priceQuoteResponse?.currency}
                          </td>
                          <td className="border px-4 py-2">
                            {flightFullData?.priceQuoteResponse?.travelClass}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="overflow-x-auto">
                      {/* <h2>Flight Segments :-</h2> */}
                      <div>
                        {flightFullData?.priceQuoteResponse?.trips?.map(
                          (trip, tripIndex) => (
                            <div key={tripIndex}>
                              {trip?.flightSegments?.map(
                                (segment, segmentIndex) => (
                                  <div key={segmentIndex}>
                                    <h2 className="md:text-xl text-md md:font-bold py-4">
                                      {tripIndex === 0 && segmentIndex === 0
                                        ? "First Flight Segment"
                                        : tripIndex === 1 && segmentIndex === 0
                                        ? "Second Flight Segment"
                                        : ""}
                                    </h2>
                                    <table className="table-auto w-full border-collapse">
                                      <thead>
                                        <tr>
                                          <th className="border px-4 py-2">
                                            Airline Name
                                          </th>
                                          <th className="border px-4 py-2">
                                            Flight Number
                                          </th>
                                          <th className="border px-4 py-2">
                                            Departure Date
                                          </th>
                                          <th className="border px-4 py-2">
                                            Departure Time
                                          </th>
                                          <th className="border px-4 py-2">
                                            Arrival Date
                                          </th>
                                          <th className="border px-4 py-2">
                                            Arrival Time
                                          </th>
                                          <th className="border px-4 py-2">
                                            From Airport
                                          </th>
                                          <th className="border px-4 py-2">
                                            From Terminal
                                          </th>
                                          <th className="border px-4 py-2">
                                            To Airport
                                          </th>
                                          <th className="border px-4 py-2">
                                            To Terminal
                                          </th>
                                          <th className="border px-4 py-2">
                                            Flight Type
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr className="bg-gray-100">
                                          <td className="border px-4 py-2">
                                            {segment.airlineName}
                                          </td>
                                          <td className="border px-4 py-2">
                                            {segment.flightNumber}
                                          </td>
                                          <td className="border px-4 py-2">
                                            {formatDate(
                                              segment.departureDate,
                                              true
                                            )}
                                          </td>
                                          <td className="border px-4 py-2">
                                            {
                                              segment.departureDate
                                                .split("T")[1]
                                                .split(":")[0]
                                            }
                                            :
                                            {
                                              segment.departureDate
                                                .split("T")[1]
                                                .split(":")[1]
                                            }
                                          </td>
                                          <td className="border px-4 py-2">
                                            {formatDate(
                                              segment.arrivalDate,
                                              true
                                            )}
                                          </td>
                                          <td className="border px-4 py-2">
                                            {
                                              segment.arrivalDate
                                                .split("T")[1]
                                                .split(":")[0]
                                            }
                                            :
                                            {
                                              segment.arrivalDate
                                                .split("T")[1]
                                                .split(":")[1]
                                            }
                                          </td>
                                          <td className="border px-4 py-2">
                                            {segment.fromAirport}
                                          </td>
                                          <td className="border px-4 py-2">
                                            {segment.fromTerminal}
                                          </td>
                                          <td className="border px-4 py-2">
                                            {segment.toAirport}
                                          </td>
                                          <td className="border px-4 py-2">
                                            {segment.toTerminal}
                                          </td>
                                          <td className="border px-4 py-2">
                                            {trip.flightType}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                )
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {selectedAddOns?.length > 0 && (
                    <h2 className="md:text-xl text-lg font-semibold mb-4 pt-6">
                      Addons :
                    </h2>
                  )}
                  {selectedAddOns?.seats.length > 0 && (
                    <div className="mb-4 mt-4">
                      <h3 className="md:text-4xl text-md font-semibold mb-2 text-center">
                        Seats
                      </h3>
                      <div className="overflow-x-auto">
                      {flightFullData?.priceQuoteResponse?.trips?.map(
                        (trip, tripIndex) => (
                          <div key={tripIndex}>
                            {trip?.flightSegments?.map(
                              (segment, segmentIndex) => (
                                <div key={segmentIndex}>
                                  <h2 className="text-xl font-bold py-4">
                                    {tripIndex === 0 && segmentIndex === 0
                                      ? "First Flight Segment"
                                      : tripIndex === 1 && segmentIndex === 0
                                      ? "Second Flight Segment"
                                      : ""}
                                  </h2>
                                  <table className="table-auto w-full border-collapse">
                                    <thead>
                                      <tr>
                                        <th className="border px-4 py-2">
                                          Passenger
                                        </th>
                                        <th className="border px-4 py-2">
                                          Flight Number
                                        </th>
                                        <th className="border px-4 py-2">
                                          Seat Number / Column
                                        </th>
                                        <th className="border px-4 py-2">
                                          Seat Price
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {selectedAddOns.seats
                                        .filter(
                                          (seat) =>
                                            seat.segmentKey === segment.key
                                        )
                                        .map((seat, index) => (
                                          <tr
                                            key={index}
                                            className={
                                              index % 2 === 0
                                                ? "bg-gray-100"
                                                : "bg-gray-100"
                                            }
                                          >
                                            <td className="border px-4 py-2">
                                              {travellerDetails[
                                                index % travellerDetails.length
                                              ]?.firstName
                                                .charAt(0)
                                                .toUpperCase() +
                                                travellerDetails[
                                                  index %
                                                    travellerDetails.length
                                                ]?.firstName.slice(1)}{" "}
                                              {travellerDetails[
                                                index % travellerDetails.length
                                              ]?.lastName
                                                .charAt(0)
                                                .toUpperCase() +
                                                travellerDetails[
                                                  index %
                                                    travellerDetails.length
                                                ]?.lastName.slice(1)}
                                            </td>
                                            <td className="border px-4 py-2">
                                              {segment.flightNumber}
                                            </td>
                                            <td className="border px-4 py-2">
                                              <ul>
                                                {seat.seatKeys.map(
                                                  (seatKey, keyIndex) => (
                                                    <li key={keyIndex}>
                                                      {seat.seatNumber}
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            </td>
                                            <td className="border px-4 py-2">
                                              {seat.seatPrice}{" "}
                                              {
                                                flightFullData
                                                  ?.priceQuoteResponse?.currency
                                              }
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                </div>
                              )
                            )}
                          </div>
                        )
                      )}
                      </div>
                    </div>
                  )}

                  {selectedAddOns?.meal.length > 0 && (
                    <div className="mb-4">
                      <h3 className="md:text-4xl text-md font-semibold mb-2 pt-8 text-center">
                        Meals
                      </h3>
                      <div className="overflow-x-auto">
                      {flightFullData?.priceQuoteResponse?.trips?.map(
                        (trip, tripIndex) => (
                          <div key={tripIndex}>
                            {trip?.flightSegments?.map(
                              (segment, segmentIndex) => (
                                <div key={segmentIndex}>
                                  <h2 className="text-xl font-bold py-4">
                                    {tripIndex === 0 && segmentIndex === 0
                                      ? "First Flight Segment"
                                      : tripIndex === 1 && segmentIndex === 0
                                      ? "Second Flight Segment"
                                      : ""}
                                  </h2>
                                  <table className="table-auto w-full border-collapse">
                                    <thead>
                                      <tr>
                                        <th className="border px-4 py-2">
                                          Passenger
                                        </th>
                                        <th className="border px-4 py-2">
                                          Flight Number
                                        </th>
                                        <th className="border px-4 py-2">
                                          Meal Code
                                        </th>
                                        <th className="border px-4 py-2">
                                          Meal Info
                                        </th>
                                        <th className="border px-4 py-2">
                                          Meal Price
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {selectedAddOns.meal
                                        .filter(
                                          (meal) =>
                                            meal?.from === segment?.from &&
                                            meal?.to === segment?.to
                                        )
                                        .map((meal, index) => (
                                          <tr
                                            key={index}
                                            className={
                                              index % 2 === 0
                                                ? "bg-gray-100"
                                                : "bg-gray-100"
                                            }
                                          >
                                            <td className="border px-4 py-2">
                                              {travellerDetails[
                                                index % travellerDetails.length
                                              ].firstName
                                                .charAt(0)
                                                .toUpperCase() +
                                                travellerDetails[
                                                  index %
                                                    travellerDetails.length
                                                ].firstName.slice(1)}{" "}
                                              {travellerDetails[
                                                index % travellerDetails.length
                                              ].lastName
                                                .charAt(0)
                                                .toUpperCase() +
                                                travellerDetails[
                                                  index %
                                                    travellerDetails.length
                                                ].lastName.slice(1)}
                                            </td>
                                            <td className="border px-4 py-2">
                                              {segment.flightNumber}
                                            </td>
                                            <td className="border px-4 py-2">
                                              {meal.mealCode}
                                            </td>
                                            <td className="border px-4 py-2">
                                              {meal.mealInfo}
                                            </td>
                                            <td className="border px-4 py-2">
                                              {meal.mealPrice}{" "}
                                              {
                                                flightFullData
                                                  ?.priceQuoteResponse?.currency
                                              }
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                </div>
                              )
                            )}
                          </div>
                        )
                      )}
                      </div>
                    </div>
                  )}

                  {selectedAddOns?.luggage &&
                    selectedAddOns.luggage.length > 0 && (
                      <div className="mb-4 ">
                        <h3 className="md:text-4xl text-md font-semibold mb-2 pt-8 text-center">
                          Baggage
                        </h3>
                        <div className="overflow-x-auto">
                        {flightFullData?.priceQuoteResponse?.trips?.map(
                          (trip, tripIndex) => (
                            <div key={tripIndex}>
                              {trip?.flightSegments?.map(
                                (segment, segmentIndex) => (
                                  <div key={segmentIndex}>
                                    <h2 className="text-xl font-bold py-4">
                                      {tripIndex === 0 && segmentIndex === 0
                                        ? "First Flight Segment"
                                        : tripIndex === 1 && segmentIndex === 0
                                        ? "Second Flight Segment"
                                        : ""}
                                    </h2>
                                    <table className="table-auto w-full border-collapse">
                                      <thead>
                                        <tr>
                                          <th className="border px-4 py-2">
                                            Passenger
                                          </th>
                                          <th className="border px-4 py-2">
                                            Flight Number
                                          </th>
                                          <th className="border px-4 py-2">
                                            Baggage Code
                                          </th>
                                          <th className="border px-4 py-2">
                                            Baggage Info
                                          </th>
                                          <th className="border px-4 py-2">
                                            Baggage Price
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {selectedAddOns.luggage
                                          .filter(
                                            (luggage) =>
                                              luggage.segmentKey === trip.key
                                          )
                                          .map((luggage, index) => (
                                            <tr
                                              key={index}
                                              className={
                                                index % 2 === 0
                                                  ? "bg-gray-100"
                                                  : "bg-gray-100"
                                              }
                                            >
                                              <td className="border px-4 py-2">
                                                {travellerDetails[
                                                  index %
                                                    travellerDetails.length
                                                ]?.firstName
                                                  .charAt(0)
                                                  .toUpperCase() +
                                                  travellerDetails[
                                                    index %
                                                      travellerDetails.length
                                                  ]?.firstName.slice(1)}{" "}
                                                {travellerDetails[
                                                  index %
                                                    travellerDetails.length
                                                ]?.lastName
                                                  .charAt(0)
                                                  .toUpperCase() +
                                                  travellerDetails[
                                                    index %
                                                      travellerDetails.length
                                                  ]?.lastName.slice(1)}
                                              </td>
                                              <td className="border px-4 py-2">
                                                {segment.flightNumber}
                                              </td>
                                              <td className="border px-4 py-2">
                                                {luggage.baggageCode}
                                              </td>
                                              <td className="border px-4 py-2">
                                                {luggage.baggageInfo}
                                              </td>
                                              <td className="border px-4 py-2">
                                                {luggage.baggagePrice}{" "}
                                                {
                                                  flightFullData
                                                    ?.priceQuoteResponse
                                                    ?.currency
                                                }
                                              </td>
                                            </tr>
                                          ))}
                                      </tbody>
                                    </table>
                                  </div>
                                )
                              )}
                            </div>
                          )
                        )}
                        </div>
                      </div>
                    )}

                  <div className="md:flex text-center items-center md:justify-between">
                    <div className="p-2">
                      <h2 className="md:text-xl text-lg font-bold">
                        Total amount to be paid:
                      </h2>
                      <h2 className="md:text-4xl text-2xl md:text-left font-bold">
                        {calculateTotalPrice()}{" "}
                        {flightFullData?.priceQuoteResponse?.currency}
                      </h2>
                    </div>

                    <h2
                      onClick={handleClick}
                      className="text-2xl font-bold md:my-0 my-4 hover:underline cursor-pointer"
                    >
                      {" "}
                      {isLoading ? <BtnLoader /> : "Click here to Pay"}
                    </h2>

                    <div>
                      <div className="text-center cursor-pointer bg-orange-500 mt-2 rounded-lg text-white p-2">
                        <h2 className="text-2xl font-bold">Live Chat</h2>
                        <p>
                          Chat with a member of our <br /> in-house team.
                        </p>
                      </div>
                    </div>
                  </div>
                  {error && (
                    <p className="text-xs  text-red-500 text-right absolute left-[39%] bottom-[2%] py-1">
                      {error}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showOtpModal && (
        <OtpModalFlight
          orderId={flightOrderId}  setShowOtpModal={setShowOtpModal} showOtpModal={showOtpModal}
          // pass any necessary props to the OtpModal component
        />
      )}
    </>
  );
}

export default FlightDetailCard;
