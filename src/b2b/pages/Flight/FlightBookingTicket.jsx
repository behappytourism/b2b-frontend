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
import Lottie from "lottie-react";
import { successAnimation } from "../../../data";
import { config } from "../../../constants";

function FlightBookingTicket() {
  const { agent } = useSelector((state) => state.agents);
  //console.log(agent, "agent details");
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const { bookingId } = useParams(); // Extract the "bookingId" from the URL path

  const { token } = useSelector((state) => state.agents);
  const [bookingData, setBookingData] = useState([]);
  // console.log(bookingData);
  const [ticketData, setTicketData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Adding isLoading state

  const handleNavigation = () => {
    navigate(`/flight`);
  };

  useEffect(() => {
    fetchBookingDetails(bookingId);
    fetchBookingPdf(bookingId);
    fetchBookingInvoice(bookingId);
  }, [bookingId]);

  const fetchBookingDetails = async (bookingId) => {
    try {
      const res = await axios.get(`/b2b/flight/bookings/${bookingId}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setTicketData(res.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error response from the server:", err.response);
      setIsLoading(false);
    }
  };

  // const fetchBookingInvoice = async (bookingId) => {
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:8189/api/v1/b2b/flight/bookings/invoice/${bookingId}`,
  //       {
  //         headers: { authorization: `Bearer ${token}` },
  //       }
  //     );
  //     if (res.status === 200) {
  //       setInvoiceData(res.data);
  //       setIsLoading(false);
  //     }
  //   } catch (err) {
  //     console.error("Error response from the server:", err.response);
  //     setIsLoading(false);
  //   }
  // };

  const [invoiceBuffer, setInvoiceBuffer] = useState(null);

  const fetchBookingInvoice = async (bookingId) => {
    try {
      const response = await axios.get(
        `/b2b/flight/bookings/invoice/${bookingId}`,
        {
          headers: { authorization: `Bearer ${token}` },
          responseType: "arraybuffer",
        }
      );

      if (response.status === 200) {
        setInvoiceBuffer(response.data);
      }
    } catch (error) {
      console.error("Error response from the server:", error.response);
    }
  };

  const handleInvoiceDownload = () => {
    if (invoiceBuffer) {
      const pdfBlob = new Blob([invoiceBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "flightInvoice.pdf";
      a.click();
    }
  };

  // const fetchBookingDetails = async (bookingId) => {
  //   try {
  //     const res = await axios.get(`http://localhost:8189/api/v1/b2b/flight/bookings/pdf/${bookingId}`, {
  //       headers: { authorization: `Bearer ${token}` },
  //     });
  //     if (res.status === 200) {
  //       setBookingData(res)

  //     }
  //   } catch (err) {
  //     console.error("Error response from the server:", err.response);
  //   }
  // };

  const [pdfBuffer, setPdfBuffer] = useState(null);

  const fetchBookingPdf = async (bookingId) => {
    try {
      const response = await axios.get(
        `/b2b/flight/bookings/pdf/${bookingId}`,
        {
          headers: { authorization: `Bearer ${token}` },
          responseType: "arraybuffer",
        }
      );

      if (response.status === 200) {
        setPdfBuffer(response.data);
      }
    } catch (error) {
      console.error("Error response from the server:", error.response);
    }
  };

  const handleDownload = () => {
    if (pdfBuffer) {
      const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "flightBookingTicket.pdf";
      a.click();
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

  // console.log(ticketData?.createdAt)

  const createdAt = new Date(ticketData?.createdAt);
  const time = createdAt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  //console.log(time);

  //console.log(ticketData?.createdAt.slice(11, 16));

  return (
    <>
      <div className="mb-10">
        <div
          onClick={handleNavigation}
          className="md:w-[70%] md:ml-[6.5%] absolute ml-2 mt-3 flex items-center gap-2 cursor-pointer my-4"
        >
          <BsArrowLeft />
          <h1 className="hover:underline">Back</h1>
        </div>
        <span className="flex justify-center">
          <div className=" w-[200px] ">
            <Lottie animationData={successAnimation} />
          </div>
        </span>
        <div className="text-center md:p-0 p-4">
          <h2 className="text-[25px] text-[#12acfd] font-[650]">
            You have Successfully Booked Flight!
          </h2>
          <p className=" text-[#12acfd] font-[500]">
            The booking is confirmed and you will receive the flight ticket soon
            in your mail.
          </p>
        </div>
      </div>

      <div className="w-full">
        {isLoading ? ( // Display loader if isLoading is true
          <div className="p-10 animate-pulse">
            <h1 className="text-3xl">Loading...</h1>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-auto">
            <div className="md:flex justify-center gap-4">
              <div className="md:w-9/12 md:ml-[6%] md:p-0 p-4">
                <div className=" mt-1 border border-gray-100 p-2 mb-6">
                  <h1 className="p-1">
                    Booked by {agent?.name} on{" "}
                    {new Date(ticketData?.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )}{" "}
                    at {ticketData?.createdAt.slice(11, 16)}
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
                      at {ticketData?.createdAt.slice(11, 16)}
                    </h1>

                    {/* <h1 className="text-blue-400 cursor-pointer">Resend</h1> */}
                  </div>
                </div>

                <div className="mt-2 border border-gray-100 p-2">
                  <div className="flex justify-between ">
                    <div>
                      <h1 className="text-xl font-bold">Booking Confirmed</h1>
                      <h1 className="text-xl font-bold">
                        {ticketData.referenceNumber}
                      </h1>
                    </div>
                    <div>
                      <img
                        height={25}
                        width={200}
                        src={config.COMPANY_LOGO}
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
                              <div key={index} className="overflow-x-auto">
                                <div key={index} className="flex gap-4 mt-10">
                                  <div
                                    key={segmentIndex}
                                    className="flex gap-7"
                                  >
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
                                        {formatDate(
                                          segment?.departureDate,
                                          true
                                        )}
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
                                        {Math.floor(trip?.totalDuration / 3600)}
                                        h{" "}
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
                                    Cabin:{" "}
                                    {trip?.fareDetails.cabinBaggageWeight}
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
                                      <th className="border px-4 py-2">
                                        Ticket
                                      </th>
                                      <th className="border px-4 py-2">Seat</th>
                                      <th className="border px-4 py-2">Meal</th>
                                      <th className="border px-4 py-2">
                                        Baggage
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {segment.passengers.map(
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
                                                      (
                                                        meal,
                                                        singleMealIndex
                                                      ) => (
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
                                                          key={
                                                            singleBaggageIndex
                                                          }
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
                              </div>
                            </>
                          );
                        })}
                      </>
                    );
                  })}

                  <div className="text-center items-center mt-10 md:mt-0 mb-4 md:mb-0">
                    <button
                      className="font-bold border rounded w-full md:w-fit p-3 md:m-6 bg-blue-500 text-white hover:text-black hover:bg-white self-center"
                      onClick={handleDownload}
                    >
                      Download ticket as PDF
                    </button>
                  </div>

                  {/* <div className="mt-10 p-4">
                  <h1 className="text-md font-bold">ABOUT THIS TRIP</h1>
                  <ul className="list-disc text-sm">
                    <li>
                      Note: Except for medical devices, electronic devices which
                      are larger than a cell phone/smart phone cannot be carried
                      in the cabin of the aircraft.
                    </li>
                    <li>
                      Note: Only cell phones of dimension Length: 16cm x Width:
                      9.3cm x Depth: 1.5cm are allowed in the cabin baggage.
                      Please carry all other electronic equipment inside
                      check-in baggage.
                    </li>
                    <li>
                      Use your Trip ID for all communication with
                      Travellerschoice about this booking
                    </li>
                    <li>
                      Please reach the airport 4 hours before the departure
                      time. Check-in counters at the airport close 90 minutes
                      before departure
                    </li>
                    <li>
                      Your carry-on baggage shouldn't weight more than 10kgs
                    </li>
                    <li>
                      Carry photo identification, you will need it as proof of
                      identity while checking-in
                    </li>
                    <li>
                      Kindly ensure that you have the relevant visa, immigration
                      clearance and travel with a passport, with a validity of
                      at least 6 months
                    </li>
                    <li>
                      For hassle free processing, cancel/amend your tickets with
                      Travellerschoice instead of doing so directly with Airline
                    </li>
                  </ul>
                </div> */}

                  {/* <hr className="my-5" /> */}

                  {/* <div>
                  <h1 className="text-md font-bold">FARE BREAKUP</h1>
                  <div className="flex-row justify-end">
                    <div className="flex gap-[7.5%]">
                      <h1>Base Fare:</h1>
                      <h1>
                        {ticketData.totalFee} {ticketData.currency}
                      </h1>
                    </div>

                    <div className="flex gap-[4.7%]">
                      <h1>Taxes & Fees:</h1>
                      <h1>
                        {ticketData.totalTax} {ticketData.currency}
                      </h1>
                    </div>

                    <div className="flex gap-[7.4%]">
                      <h1>Total Fare:</h1>
                      <h1>
                        {ticketData.netFare} {ticketData.currency}
                      </h1>
                    </div>
                  </div>
                </div> */}

                  {/* <div className="mt-10 border flex items-center gap-4 p-2">
                  <div>
                    <img
                      height={25}
                      width={25}
                      src="https://cdn-icons-png.flaticon.com/128/65/65704.png"
                    />
                  </div>
                  <div>
                    <h1>Manage bookings online</h1>
                    <div className="flex gap-2">
                      <h1>Visit</h1>
                      <h1 className="text-md text-blue-400 underline cursor-pointer">
                        mytravellerschoice.com
                      </h1>
                    </div>
                  </div>
                </div> */}

                  {/* <div className="flex mt-5 justify-between mb-10">
                  <div className="flex items-center gap-2">
                    <img
                      height={25}
                      width={25}
                      src="https://cdn-icons-png.flaticon.com/128/597/597177.png"
                    />
                    <h1>Air Arabia helpline (022) 71004777</h1>
                  </div>

                  <div className="flex items-center gap-2">
                    <img
                      height={25}
                      width={25}
                      src="https://cdn-icons-png.flaticon.com/128/796/796772.png"
                    />
                    <h1>Need Help? Call +971 971526395594</h1>
                  </div>
                </div> */}
                </div>
              </div>

              <div className="md:w-3/12 mb-10 md:mb-0 md:p-0 p-4">
                <div className="bg-[#f0f4fc] h-fit md:min-w-[220px] md:max-w-[220px]  p-2 border border-gray-100 mt-1">
                  <div className="flex justify-center text-center md:text-left md:justify-normal gap-3 items-center border-b border-gray-100 w-full md:w-fit pb-2">
                    <div className="rounded-full  bg-blue-300 p-2 ">
                      {/* <img
                  height={25}
                  width={25}
                  src="https://cdn-icons-png.flaticon.com/128/65/65704.png"
                /> */}
                      <BsHeadset color="white" />
                    </div>
                    <div className="">
                      <h2>Trip support</h2>
                      <h3>We are here to help</h3>
                    </div>
                  </div>

                  <div className="p-1 text-center md:text-left">
                    <h2>Need assistance ?</h2>
                    <div className="flex gap-1 justify-center md:justify-normal">
                      <h4 className="text-xs">Call on</h4>
                      <h4 className="text-blue-400 text-xs">
                        {agent?.phoneNumber}
                      </h4>
                    </div>
                  </div>

                  {/* <div className="p-1">
            <h2>Your support requests</h2>
            <h4 className="text-gray-400 text-xs">No active support request(s)</h4>
          </div> */}
                </div>

                <div className="bg-[#f0f4fc] md:min-w-[220px] md:max-w-[220px] h-fit p-3 border border-gray-100 mt-5 ">
                  <div className="flex justify-center md:justify-normal gap-3 items-center border-b border-gray-100 pb-2 pt-2">
                    <div className="">
                      <h2>Quick actions</h2>
                    </div>
                  </div>

                  <div className="p-2 border-b border-gray-100 md:w-[90%] justify-center md:justify-normal flex items-center gap-2">
                    <div>
                      <BsXCircle />
                    </div>
                    <h6 className="text-gray-400 text-xs">Cancel flights</h6>
                  </div>
                  <div
                    onClick={handleDownload}
                    className="p-2 border-b border-gray-100 md:w-[90%] flex justify-center md:justify-normal items-center gap-2 cursor-pointer"
                  >
                    <div>
                      <BsBoxArrowDown />
                    </div>
                    <h6 className="text-blue-400 text-xs">Download e-ticket</h6>
                  </div>
                  {/* <div className="p-2 border-b border-gray-100 w-[100%] flex items-center gap-2">
          <div>
            <BsReceipt />
          </div>
            <h6 className="text-blue-400 text-xs">Download GST invoice</h6>
          </div> */}
                  <div
                    onClick={() => handleInvoiceDownload()}
                    className="p-2  w-[100%] flex  justify-center md:justify-normal items-center gap-2 cursor-pointer"
                  >
                    <div>
                      <BsReceipt />
                    </div>
                    <h6 className="text-blue-400 text-xs">Download eReceipt</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* <div className="w-[60%] ml-[20%] mr-[20%] mt-2">
       
      </div> */}
      </div>
    </>
  );
}

export default FlightBookingTicket;
