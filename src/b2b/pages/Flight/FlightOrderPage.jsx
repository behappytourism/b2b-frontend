import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../../axios";
import { BtnLoader, PageLoader, Pagination } from "../../components";
import OrdersNavigator from "../OrdersNavigator";
import InfiniteScroll from "react-infinite-scroll-component";
import formatDate from "../../../utils/formatDate";
import { MdChildFriendly } from "react-icons/md";
import { BsCalendar2Date, BsSearch } from "react-icons/bs";

function FlightOrderPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [allFlightOrders, setAllFlightOrders] = useState([]);
  const [allAirportData, setAllAirportData] = useState([]);
  const [allAirlineData, setAllAirlineData] = useState([]);
  const [filters, setFilters] = useState({
    referenceNumber: "",
    departureDateFrom: "",
    departureDateTo: "",
    bookingDateFrom: "",
    bookingDateTo: "",
    airlineCode: "",
    fromAirportCode: "",
    toAirportCode: "",
    status: "completed",
    limit: "10",
  });
  const [error, setError] = useState(false);
  const [pdfBuffer, setPdfBuffer] = useState(null);
  const [currentBookingId, setCurrentBookingId] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const { token } = useSelector((state) => state.agents);

  const prevSearchParams = (e) => {
    let params = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const handleChange = (e) => {
    let params = prevSearchParams();
    setSearchParams({
      ...params,
      [e.target.name]: e.target.value,
      skip: 0,
    });
    setFilters((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const fetchBookingDetails = async (filters) => {
    try {
      setIsLoading(true);
      const url = `/b2b/flight/bookings/list/all?bookingDateFrom=${filters.bookingDateFrom}&bookingDateTo=${filters.bookingDateTo}&departureDateFrom=${filters.departureDateFrom}&departureDateTo=${filters.departureDateTo}&limit=${filters.limit}&status=${filters.status}&airlineCode=${filters.airlineCode}&fromAirportCode=${filters.fromAirportCode}&toAirportCode=${filters.toAirportCode}&referenceNumber=${filters.referenceNumber}`;
      const res = await axios.get(url, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setAllFlightOrders(res.data?.flightBookings?.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error response from the server:", err.response);
      setIsLoading(false);
      setError(true);
    }
  };



  const fetchAirportDetails = async (filters) => {
    try {
      setIsLoading(true);
      const url = `/b2b/flight/bookings/list/initial-data`;
      const res = await axios.get(url, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {
        setAllAirportData(res.data.airports);
        setAllAirlineData(res.data.airlines);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error response from the server:", err.response);
      setIsLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchBookingDetails(filters); // Call the function when the component mounts
    fetchAirportDetails(filters);
  }, [filters]);

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
        if (pdfBuffer) {
          handleDownload();
        }
      }
    } catch (error) {
      console.error("Error response from the server:", error.response);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    {currentBookingId && (
    fetchBookingPdf(currentBookingId)
    )}
  }, [currentBookingId]);

  useEffect(() => {
    handleDownload();
  }, [pdfBuffer]);

  const handleDownload = () => {
    if (pdfBuffer) {
      const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "flightBookingTicket.pdf";
      a.click();
    }
    setCurrentBookingId(null);
    setPdfBuffer(null);
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  };

  const handleClick = (bookingId) => {
    const newTabUrl = `/b2b/flight/order/details/${bookingId}`;
    window.open(newTabUrl, "_blank");
  };

  return (
    <>
      <div className=" ">
        <OrdersNavigator />
        <div className="max-w-screen-xl mx-auto">
          <div className="px-5 md:py-10 mb-10 md:mb-0">
            <div className="md:flex md:justify-between flex-wrap">
              <div className="relative h-10 md:w-[30%]">
                <p className="text-xs">Reference number</p>
                <span className="absolute w-10 h-full flex justify-center items-center text-stone-500 border-r">
                  <BsSearch />
                </span>
                <input
                  type="search"
                  className=" pl-12 w-[100%] outline-none border px-2 text-xs text-stone-500 placeholder:text-xs placeholder:text-stone-500 rounded h-full focus:border-green-400 hover:border-blue-400 hover:bg-stone-100"
                  placeholder="search by reference number"
                  name="referenceNumber"
                  value={filters.referenceNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-6 md:mt-0">
                <p className="text-xs">Airline</p>
                <select
                  className="border border-gray-300 w-full rounded py-1.5 px-2"
                  value={filters.airlineCode}
                  name="airlineCode"
                  onChange={handleChange}
                >
                  {allAirlineData.map((airline, index) => {
                    return (
                      <>
                        <option key={index} value={airline?.airlineCode}>
                          {airline?.airlineName}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>

              <div className="relative h-10 mt-2 md:mt-0">
                <p className="text-xs">Booking date from</p>
                <span className="absolute w-10 h-full flex justify-center items-center text-stone-500 border-r">
                  <BsCalendar2Date />
                </span>
                <input
                  type="date"
                  className=" pl-12 outline-none border px-2 text-xs text-stone-500 placeholder:text-xs placeholder:text-stone-500 rounded h-full focus:border-green-400 hover:border-blue-400 hover:bg-stone-100 w-full"
                  name="bookingDateFrom"
                  value={filters.bookingDateFrom}
                  onChange={handleChange}
                />
              </div>

              <div className="relative h-10 mt-6 md:mt-0">
                <p className="text-xs">Booking date to</p>
                <span className="absolute w-10 h-full flex justify-center items-center text-stone-500 border-r">
                  <BsCalendar2Date />
                </span>
                <input
                  type="date"
                  className=" pl-12 outline-none border px-2 text-xs text-stone-500 placeholder:text-xs placeholder:text-stone-500 rounded h-full focus:border-green-400 hover:border-blue-400 hover:bg-stone-100 w-full"
                  name="bookingDateTo"
                  value={filters.bookingDateTo}
                  onChange={handleChange}
                />
              </div>

              <div className="relative h-10 mt-6 md:mt-0">
                <p className="text-xs">Departure date from</p>
                <span className="absolute w-10 h-full flex justify-center items-center text-stone-500 border-r">
                  <BsCalendar2Date />
                </span>
                <input
                  type="date"
                  className=" pl-12 outline-none border px-2 text-xs text-stone-500 placeholder:text-xs placeholder:text-stone-500 rounded h-full focus:border-green-400 hover:border-blue-400 hover:bg-stone-100 w-full"
                  name="departureDateFrom"
                  value={filters.departureDateFrom}
                  onChange={handleChange}
                />
              </div>

              <div className="relative h-10 mt-6 md:mt-0">
                <p className="text-xs">Departure date to</p>
                <span className="absolute w-10 h-full flex justify-center items-center text-stone-500 border-r">
                  <BsCalendar2Date />
                </span>
                <input
                  type="date"
                  className=" pl-12 outline-none border px-2 text-xs text-stone-500 placeholder:text-xs placeholder:text-stone-500 rounded h-full focus:border-green-400 hover:border-blue-400 hover:bg-stone-100 w-full"
                  name="departureDateTo"
                  value={filters.departureDateTo}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex gap-4 items-center flex-wrap">
              <div className="relative h-10 mt-6 md:mt-0">
                <p className="text-xs">Limit</p>
                <select
                  className="border border-gray-300 rounded py-1.5 px-2 focus:border-green-600"
                  value={filters.limit}
                  name="limit"
                  onChange={handleChange}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>

              <div className="relative h-10 mt-6 md:mt-0">
                <p className="text-xs">Status</p>
                <select
                  className="border border-gray-300  rounded py-1.5 px-2 focus:border-green-600"
                  value={filters.status}
                  name="status"
                  onChange={handleChange}
                >
                  <option value="completed">Completed</option>
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="relative h-10 mt-2 md:mt-0">
                <p className="text-xs">Select departure airport</p>
                <select
                  className="border border-gray-300 w-[100%] rounded py-1.5 px-2 focus:border-green-600"
                  value={filters.fromAirportCode}
                  name="fromAirportCode"
                  onChange={handleChange}
                >
                  {allAirportData.map((airport, index) => {
                    return (
                      <>
                        <option>select departure airport</option>
                        <option key={index} value={airport?.airportName}>
                          {airport?.airportName}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>

              <div className="relative h-10 mt-2 md:mt-0">
                <p className="text-xs">Select arrival airport</p>
                <select
                  className="border border-gray-300 w-[100%] rounded py-1.5 px-2 focus:border-green-600"
                  value={filters.toAirportCode}
                  name="toAirportCode"
                  onChange={handleChange}
                >
                  {allAirportData.map((airport, index) => {
                    return (
                      <>
                        <option>Select arrival airport</option>
                        <option key={index} value={airport?.airportName}>
                          {airport?.airportName}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>

              <div className="md:mt-8 mt-4 w-full md:w-fit flex gap-2">
                <button
                  onClick={() =>
                    setFilters({
                      referenceNumber: "",
                      departureDateFrom: "",
                      departureDateTo: "",
                      bookingDateFrom: "",
                      bookingDateTo: "",
                      airlineCode: "",
                      fromAirportCode: "",
                      toAirportCode: "",
                      status: "",
                      limit: "10",
                    })
                  }
                  className="h-10 rounded-sm shadow-mn px-10 w-full sm:w-auto bg-primaryColor text-white uppercase text-[12px]"
                >
                  Clear Filters
                </button>

                {/* <button
                  //  onClick={() => handleDownload()}
                  className="h-10 rounded-sm shadow-mn px-10 w-full sm:w-auto bg-green-500 text-white uppercase text-[12px]"
                >
                  Download
                </button> */}
              </div>
            </div>

            <div>
              <div className="overflow-x-auto shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)]">
                <InfiniteScroll
                  dataLength={allFlightOrders?.length || 0}
                  next={() => {
                    setFilters((prev) => {
                      return { ...prev, skip: prev.skip + 1 };
                    });
                  }}
                  hasMore={filters.hasMore}
                >
                  <table className="w-full overflow-y-hidden overflow-x-auto">
                    <thead className=" text-gray-400 border-b-2 border-gray-400 text-[14px] text-left">
                      <tr>
                        <th className="font-[500] py-4 px-3 whitespace-nowrap">
                          Reference Number
                        </th>
                        <th className="font-[500] py-4 px-3 whitespace-nowrap">
                          PNR Number
                        </th>
                        <th className="font-[500] py-4 px-3 whitespace-nowrap">
                          From
                        </th>
                        <th className="font-[500] py-4 px-3 whitespace-nowrap">
                          To
                        </th>
                        <th className="font-[500] py-4 px-3 whitespace-nowrap">
                          Departure date
                        </th>
                        <th className="font-[500] py-4 px-3 whitespace-nowrap">
                          Trip type
                        </th>
                        <th className="font-[500] py-4 px-3 whitespace-nowrap">
                          Booking date
                        </th>
                        <th className="font-[500] py-4 px-3 whitespace-nowrap">
                          Pax
                        </th>
                        <th className="font-[500] py-4 px-3 whitespace-nowrap">
                          Status
                        </th>
                        <th className="font-[500] py-4 px-3 whitespace-nowrap">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-grayColor">
                      {allFlightOrders?.map((item, itemIndex) => {
                        // Convert departureDate to a Date object
                        const departureDate = new Date(
                          item?.trips[0]?.flightSegments[0]?.departureDate
                        );

                        // Format the date as "31-08-2023"
                        const formattedDepartureDate = `${departureDate.getDate()}-${
                          departureDate.getMonth() + 1
                        }-${departureDate.getFullYear()}`;

                        const createdAtDate = new Date(item?.createdAt);

                        // Format the date using toLocaleDateString()
                        const formattedCreatedAt = `${createdAtDate.getDate()}-${
                          createdAtDate.getMonth() + 1
                        }-${createdAtDate.getFullYear()}`;

                        return (
                          <>
                            <tr key={itemIndex}>
                              <td className="p-3">{item?.referenceNumber}</td>
                              <td className="p-3">{item?.bookingPNR}</td>
                              <td className="p-3">
                                {item?.trips[0]?.flightSegments[0]?.from}
                              </td>
                              <td className="p-3">
                                {item?.trips[0]?.flightSegments[0]?.to}
                              </td>
                              <td className="p-3">{formattedDepartureDate}</td>
                              <td className="p-3">{item?.tripType}</td>
                              <td className="p-3">{formattedCreatedAt}</td>
                              <td className="p-3">{item?.passengers?.length}</td>
                              <td className="p-3">{item?.status}</td>
                              <td className="p-3">
                                {item?.netFare} {item?.currency}
                              </td>
                            {item?.status === "completed" && (
                              <td>
                                <button
                                  onClick={() => {
                                    setCurrentBookingId(item._id);
                                  }}
                                  className="bg-blue-300 hover:bg-blue-600 text-white rounded-lg p-1"
                                >
                                {currentBookingId === item._id ? (
      isLoading ? (
        <BtnLoader />
      ) : (
        "Download Ticket"
      )
    ) : (
      "Download Ticket"
    )}
                                </button>
                              </td>
                              )}
                              <td>
                                <button
                                  onClick={() => {
                                    handleClick(item._id);
                                  }}
                                  className="bg-blue-600 hover:bg-blue-300 text-white rounded-lg p-1"
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          </>
                        );
                      })}

                      {isLoading ? (
                        <tr>
                          <td colSpan="13">
                            <div className="flex justify-center items-center h-10">
                              <PageLoader />
                            </div>
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td colSpan="13">
                            {/* <p className="flex justify-center pt-5 pb-20 text-slate-400 font-[500]">
                              Data With this Query not found!!!
                            </p> */}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </InfiniteScroll>
                {(error === true ||
                  !allFlightOrders ||
                  allFlightOrders.length === 0) && (
                  <p className="text-gray-300 text-sm text-center py-10">
                    No flights are found within this parameter... <br /> Try
                    removing some filters to see more results.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FlightOrderPage;
