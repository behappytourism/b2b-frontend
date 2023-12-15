import axios from "../../../axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BiHeadphone } from "react-icons/bi";
import {
  BsArrowLeft,
  BsArrowRight,
  BsBoxArrowDown,
  BsHeadset,
  BsReceipt,
  BsXCircle,
} from "react-icons/bs";

function FlightOrderDetailPage() {
  const { agent } = useSelector((state) => state.agents);
  console.log(agent, "agent details");
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const { bookingId } = useParams(); // Extract the "bookingId" from the URL path
  const [ticketData, setTicketData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Adding isLoading state

  const { token } = useSelector((state) => state.agents);

  useEffect(() => {
    fetchBookingDetails(bookingId);
  }, [bookingId]);

  const fetchBookingDetails = async (bookingId) => {
    try {
      const res = await axios.get(
        `/b2b/flight/bookings/${bookingId}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        setTicketData(res.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error response from the server:", err.response);
      setIsLoading(false);
    }
  };

  const formatDate = (dateString, includeYear = false) => {
    const options = { weekday: "short", day: "numeric", month: "long" };
    if (includeYear) {
      options.year = "numeric";
    }
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formattedTime = ticketData?.createdAt
    ? new Date(ticketData.createdAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="w-[100%]">
      {isLoading ? ( // Display loader if isLoading is true
        <div className="p-10 animate-pulse">
          <h1 className="text-sm text-transparent h-8 bg-gray-100 rounded border">
            Loading...
          </h1>

          <div className="w-full mt-2 p-2">
            <div className="flex justify-between ">
              <div>
                <h1 className="font-bold text-sm border  text-transparent h-8 bg-gray-100 rounded">
                  Booking Details
                </h1>
                <h1 className="text-sm text-transparent border  h-8 mt-4 bg-gray-100 rounded">
                  4516456456
                </h1>
              </div>
              <div className="text-sm text-transparent  border  h-8 bg-gray-100 rounded"></div>
            </div>

            <div className="flex bg-[#d8d4d4] gap-4 p-2 mt-2">
              <h1 className="text-sm  border  text-transparent h-8 bg-gray-100 rounded">
                cvzxcxzc <BsArrowRight /> zxcxzc
              </h1>
              {/* {trip.flightSegments?.map(
                                  (segment, segmentIndex) => {
                                    console.log(trip, "segment ticket")
                                    return ( */}
              <div className="flex gap-4">
                <h1 className="text-sm  border  text-transparent h-8 bg-gray-100 rounded">
                  fdfdsfsdf
                </h1>
                <h1 className="text-sm  border  text-transparent h-8 bg-gray-100 rounded">
                  {" "}
                  cfdvcccv : xvccvc
                </h1>
              </div>
              {/* );
                                  }
                                )} */}
            </div>

            <div className="">
              <div className="flex gap-4 mt-10">
                <div className="flex gap-7">
                  <div className="text-sm text-transparent h-8 bg-gray-100  border  rounded">
                    <h1 className="text-sm text-transparent h-8 mt-2  border  bg-gray-100 rounded">
                      fbcvbcvbcvb
                    </h1>
                    <h1 className="text-sm text-transparent h-8 mt-2  border  bg-gray-100 rounded">
                      65261251
                    </h1>
                    <h1 className="text-sm text-transparent h-8 mt-2 border  bg-gray-100 rounded">
                      cxxzcxcxcxc
                    </h1>
                  </div>

                  <div>
                    <div className="flex gap-3">
                      <h1 className="text-sm text-transparent h-8 mt-2  border  bg-gray-100 rounded">
                        xcvccvcv
                      </h1>
                      <h1 className="text-sm text-transparent h-8 mt-2  border  bg-gray-100 rounded">
                        54564 : 6526626
                      </h1>
                    </div>
                    <h1 className="text-sm text-transparent h-8 mt-2  border  bg-gray-100 rounded">
                      5415212
                    </h1>
                    <h1 className="text-sm text-transparent h-8 mt-2  border  bg-gray-100 rounded">
                      dssadsad
                    </h1>
                    <h1 className="text-sm text-transparent h-8 mt-2  border  bg-gray-100 rounded">
                      sadsadsad
                    </h1>
                  </div>

                  <div className="items-center justify-center content-center">
                    <h1 className="text-sm text-transparent h-8 mt-2  border  bg-gray-100 rounded">
                      {" "}
                      52454h 54353 min
                    </h1>
                    <h1 className="text-sm text-transparent h-8 mt-2  border  bg-gray-100 rounded">
                      fdfdfd
                    </h1>
                  </div>

                  <div>
                    <div className="flex gap-3">
                      <h1 className="text-sm text-transparent h-8 mt-2  border  bg-gray-100 rounded">
                        sadadsadsa
                      </h1>
                      <h1 className="text-sm text-transparent h-8 mt-2  border  bg-gray-100 rounded">
                        4165461 : 56416145
                      </h1>
                    </div>
                    <h1 className="text-sm text-transparent h-8 mt-2  border  bg-gray-100 rounded">
                      45415615
                    </h1>
                    <h1 className="text-sm text-transparent h-8 mt-2  border  bg-gray-100 rounded">
                      dsadsad
                    </h1>
                    <h1 className="text-sm text-transparent h-8 mt-2  border  bg-gray-100 rounded">
                      dssdsadas
                    </h1>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 my-10">
                <h1 className="text-sm text-transparent h-8 mt-2  border  bg-gray-100 rounded">
                  Baggage (per Adult/Child) -{" "}
                </h1>
                <h1 className="text-sm text-transparent h-8 mt-2  border  bg-gray-100 rounded">
                  Cabin:sadsadsa Kg
                </h1>
              </div>

              <table className="table-auto w-full border-collapse mb-10">
                <thead>
                  <tr>
                    <th className="text-sm text-transparent h-8  border   mt-2 bg-gray-100 rounded">
                      Travellers
                    </th>
                    <th className="text-sm text-transparent h-8  border  mt-2 bg-gray-100 rounded">
                      PNR
                    </th>
                    <th className="text-sm text-transparent h-8  border  mt-2 bg-gray-100 rounded">
                      Ticket
                    </th>
                    <th className="text-sm text-transparent h-8  border  mt-2 bg-gray-100 rounded">
                      Seat
                    </th>
                    <th className="text-sm text-transparent h-8  border  mt-2 bg-gray-100 rounded">
                      Meal
                    </th>
                    <th className="text-sm text-transparent h-8  border  mt-2 bg-gray-100 rounded">
                      Baggage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-sm text-transparent h-8  border  mt-2 bg-gray-100 rounded">
                      xcxzcxzc cxczxczxc
                    </td>
                    <td className="text-sm text-transparent h-8  border  mt-2 bg-gray-100 rounded">
                      678678687687
                    </td>
                    <td className="text-sm text-transparent h-8  border  mt-2 bg-gray-100 rounded">
                      87687678678687
                    </td>
                    <td className="text-sm text-transparent h-8  border  mt-2 bg-gray-100 rounded">
                      86
                    </td>

                    <td className="text-sm text-transparent h-8 border  mt-2 bg-gray-100 rounded">
                      <span>xzxzxzxZX</span>
                    </td>

                    <td className="text-sm text-transparent h-8 border mt-2 bg-gray-100 rounded">
                      <span>xzxzXZX</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <h1 className="text-sm text-transparent h-8 border mt-2 bg-gray-100 rounded">
                  Contact Details
                </h1>
                <table className="table-auto w-full border-collapse mb-10">
                  <thead>
                    <tr>
                      <th className="text-sm text-transparent h-8 border mt-2 bg-gray-100 rounded">
                        Phone code
                      </th>
                      <th className="text-sm text-transparent h-8 border mt-2 bg-gray-100 rounded">
                        Phone Number
                      </th>
                      <th className="text-sm text-transparent h-8 border mt-2 bg-gray-100 rounded">
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-sm text-transparent h-8 border mt-2 bg-gray-100 rounded">
                        xzcxz
                      </td>
                      <td className="text-sm text-transparent h-8 border  mt-2 bg-gray-100 rounded">
                        54165456545461
                      </td>
                      <td className="text-sm text-transparent h-8 border mt-2 bg-gray-100 rounded">
                        sadsadsadsadsadsadsadsadsa
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex w-[100%] p-2">
            <div className="w-full">
              {/* <div className="w-[70%] ml-[10%]  mt-1 border border-gray-100 p-2 mb-6">
                <h1 className="p-1">
                  Booked by {agent?.name} on{" "}
                  {new Date(ticketData?.createdAt).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  at {formattedTime}
                </h1>

                <div className="bg-[#fff4cc] p-2 flex justify-between">
                  <h1>
                    An e-ticket emailed to {ticketData?.contactDetails?.email}{" "}
                    on{" "}
                    {new Date(ticketData?.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}{" "}
                    at {formattedTime}
                  </h1>

                  <h1 className="text-blue-400 cursor-pointer">Resend</h1>
                </div>
              </div> */}

              <div className="w-full mt-2 p-2">
                <div className="flex justify-between ">
                  <div>
                    <h1 className="text-xl font-bold">Booking Details</h1>
                    <h1 className="text-xl font-bold">
                      {ticketData.referenceNumber}
                    </h1>
                  </div>
                  <div>
                    <img
                      height={25}
                      width={200}
                      src="https://res.cloudinary.com/dartrxel9/image/upload/f_auto,q_auto/mytravellers-website-logo_va1xxc"
                    />
                  </div>
                </div>

                {ticketData?.trips?.map((trip, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="flex bg-[#d8d4d4] gap-4 p-2 mt-2"
                      >
                        <h1 className="text-xl font-bold flex items-center gap-2">
                          {trip?.departureAirport} <BsArrowRight />{" "}
                          {trip?.arrivalAirport}
                        </h1>
                        {/* {trip.flightSegments?.map(
                                  (segment, segmentIndex) => {
                                    console.log(trip, "segment ticket")
                                    return ( */}
                        <div className="flex gap-4">
                          <h1>
                            {formatDate(
                              trip?.flightSegments[0]?.departureDate,
                              true
                            )}
                          </h1>
                          <h1>
                            {" "}
                            {
                              trip?.flightSegments[0]?.departureDate
                                .split("T")[1]
                                .split(":")[0]
                            }
                            :
                            {
                              trip?.flightSegments[0]?.departureDate
                                .split("T")[1]
                                .split(":")[1]
                            }
                          </h1>
                        </div>
                        {/* );
                                  }
                                )} */}
                      </div>
                      {trip.flightSegments.map((segment, segmentIndex) => {
                        return (
                          <>
                            <div key={index} className="">
                              <div key={index} className="flex gap-4 mt-10">
                                <div key={segmentIndex} className="flex gap-7">
                                  <div>
                                    <img
                                      src={segment?.airlineLogo}
                                      height={40}
                                      width={40}
                                    />
                                    <h1 className="text-lg font-bold text-[#442923]">
                                      {segment?.airlineName}
                                    </h1>
                                    <h1 className="text-md font-bold text-[#5e5c5e]">
                                      {segment?.flightNumber}
                                    </h1>
                                    <h1 className="text-md font-bold text-[#5e5c5e]">
                                      {trip?.fareDetails?.fareName}
                                    </h1>
                                  </div>

                                  <div>
                                    <div className="flex gap-3">
                                      <h1 className="text-md font-bold text-[#154aaf]">
                                        {segment?.from}
                                      </h1>
                                      <h1 className="text-md font-bold text-[#3b2823]">
                                        {
                                          segment?.departureDate
                                            .split("T")[1]
                                            .split(":")[0]
                                        }
                                        :
                                        {
                                          segment?.departureDate
                                            .split("T")[1]
                                            .split(":")[1]
                                        }
                                      </h1>
                                    </div>
                                    <h1 className="text-sm">
                                      {formatDate(segment?.departureDate, true)}
                                    </h1>
                                    <h1 className="text-sm">
                                      {segment?.fromAirport}
                                    </h1>
                                    <h1 className="text-sm">
                                      {segment?.fromTerminal}
                                    </h1>
                                  </div>

                                  <div className="items-center justify-center content-center">
                                    <img
                                      className="self-center content-center"
                                      height={20}
                                      width={20}
                                      src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-clock-outline-256.png"
                                    />
                                    <h1 className="text-sm">
                                      {" "}
                                      {Math.floor(
                                        trip?.totalDuration / 3600
                                      )}h{" "}
                                      {Math.floor(
                                        (trip?.totalDuration % 3600) / 60
                                      )}
                                      min
                                    </h1>
                                    <h1 className="text-sm">
                                      {segment?.travelClass}
                                    </h1>
                                  </div>

                                  <div>
                                    <div className="flex gap-3">
                                      <h1 className="text-md font-bold text-[#154aaf]">
                                        {segment?.to}
                                      </h1>
                                      <h1 className="text-md font-bold text-[#3b2823]">
                                        {
                                          segment?.arrivalDate
                                            .split("T")[1]
                                            .split(":")[0]
                                        }
                                        :
                                        {
                                          segment?.arrivalDate
                                            .split("T")[1]
                                            .split(":")[1]
                                        }
                                      </h1>
                                    </div>
                                    <h1 className="text-sm">
                                      {formatDate(segment?.arrivalDate, true)}
                                    </h1>
                                    <h1 className="text-sm">
                                      {segment?.toAirport}
                                    </h1>
                                    <h1 className="text-sm">
                                      {segment?.toTerminal}
                                    </h1>
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-4 my-10">
                                <h1>Baggage (per Adult/Child) - </h1>
                                <h1 className="text-md font-bold">
                                  Cabin: {trip?.fareDetails.cabinBaggageWeight}
                                  Kg
                                </h1>
                              </div>

                              <table className="table-auto w-full border-collapse mb-10">
                                <thead>
                                  <tr>
                                    <th className="border px-4 py-2">
                                      Travellers
                                    </th>
                                    <th className="border px-4 py-2">PNR</th>
                                    <th className="border px-4 py-2">Ticket</th>
                                    <th className="border px-4 py-2">Seat</th>
                                    <th className="border px-4 py-2">Meal</th>
                                    <th className="border px-4 py-2">
                                      Baggage
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {segment?.passengers?.map(
                                    (passenger, passengerIndex) => (
                                      <tr key={passengerIndex}>
                                        <td className="border px-4 py-2">
                                          {passenger?.nameTitle}{" "}
                                          {passenger.firstName
                                            .charAt(0)
                                            .toUpperCase() +
                                            passenger.firstName.slice(1)}{" "}
                                          {passenger.lastName
                                            .charAt(0)
                                            .toUpperCase() +
                                            passenger.lastName.slice(1)}
                                        </td>
                                        <td className="border px-4 py-2">
                                          {ticketData?.bookingPNR}
                                        </td>
                                        <td className="border px-4 py-2">
                                          {passenger?.ticketNumber}
                                        </td>
                                        <td className="border px-4 py-2">
                                          {passenger.seatNumber}
                                        </td>

                                        {ticketData?.ancillaries.map(
                                          (anchillary, anchillaryIndex) => (
                                            <td
                                              className="border px-4 py-2 text-sm"
                                              key={anchillaryIndex}
                                            >
                                              {anchillary.userSelectedMealAncillaries
                                                .filter((meals) =>
                                                  meals.mealDetails.some(
                                                    (meal) =>
                                                      meal.paxId ===
                                                        passenger.paxId &&
                                                      meals.segmentKey ===
                                                        segment.key
                                                  )
                                                )
                                                .map((filteredMeals) =>
                                                  filteredMeals.mealDetails.map(
                                                    (meal, singleMealIndex) => (
                                                      <span
                                                        key={singleMealIndex}
                                                      >
                                                        {meal.mealInfo}{" "}
                                                      </span>
                                                    )
                                                  )
                                                )}
                                            </td>
                                          )
                                        )}

                                        {ticketData?.ancillaries.map(
                                          (anchillary, anchillaryIndex) => (
                                            <td
                                              className="border px-4 py-2 text-sm"
                                              key={anchillaryIndex}
                                            >
                                              {anchillary.userSelectedBaggageAncillaries
                                                .filter((baggages) =>
                                                  baggages.baggageDetails.some(
                                                    (baggage) =>
                                                      baggage.paxId ===
                                                        passenger.paxId &&
                                                      baggages.journeyKey ===
                                                        trip.key
                                                  )
                                                )
                                                .map((filteredBaggages) =>
                                                  filteredBaggages.baggageDetails.map(
                                                    (
                                                      baggage,
                                                      singleBaggageIndex
                                                    ) => (
                                                      <span
                                                        key={singleBaggageIndex}
                                                      >
                                                        {baggage.baggageInfo}{" "}
                                                      </span>
                                                    )
                                                  )
                                                )}
                                            </td>
                                          )
                                        )}
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                              <div>
                                <h1>Contact Details</h1>
                                <table className="table-auto w-full border-collapse mb-10">
                                  <thead>
                                    <tr>
                                      <th className="border px-4 py-2">
                                        Phone code
                                      </th>
                                      <th className="border px-4 py-2">
                                        Phone Number
                                      </th>
                                      <th className="border px-4 py-2">
                                        Email
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="border px-4 py-2">
                                        {ticketData?.contactDetails?.phoneCode}
                                      </td>
                                      <td className="border px-4 py-2">
                                        {
                                          ticketData?.contactDetails
                                            ?.phoneNumber
                                        }
                                      </td>
                                      <td className="border px-4 py-2">
                                        {ticketData?.contactDetails?.email}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlightOrderDetailPage;
