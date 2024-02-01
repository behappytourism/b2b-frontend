import React, { useState } from "react";
import { config } from "../../../constants";
import { LuDownload } from "react-icons/lu";
import axios from "../../../axios";
import { useSelector } from "react-redux";
import { GoPerson } from "react-icons/go";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoDownloadOutline } from "react-icons/io5";

function ShowAttractionDetails({ ele, orderAttractionDetails, orderDetails }) {
  const { token } = useSelector((state) => state.agents);

  const [showDetails, setShowDetails] = useState(false);

  const handleDownloadAllTicket = async (e) => {
    try {
      const response = await axios.get(
        `/b2b/attractions/orders/${orderAttractionDetails?._id}/ticket/${ele?._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "arraybuffer",
        }
      );
      const blob = new Blob([response.data], {
        type: "application/pdf",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "tickets.pdf";
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadTicket = async (item) => {
    try {
      const res = await axios.get(
        `/b2b/attractions/orders/${orderAttractionDetails?._id}/ticket/${ele?._id}/single/${item?.ticketNo}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "arraybuffer",
        }
      );
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${item?.ticketNo}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase  dark:text-gray-400">
          <tr className="border-b border-gray-200">
            <th scope="col" className="px-6 py-3">
              Ref.No
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Pax
            </th>
            <th scope="col" className="px-6 py-3">
              Transfer
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Ticket
            </th>
          </tr>
        </thead>
        <tbody className="">
          <tr
            className="bg-white cursor-pointer  "
            onClick={() => {
              setShowDetails(!showDetails);
            }}
          >
            <th className="px-6 py-4 font-medium text-gray-900 text-xs">
              {orderDetails?.agentReferenceNumber}
            </th>
            <td className="px-6 py-4 text-xs">{ele?.date?.slice(0, 10)}</td>
            <td className="px-6 py-4 text-xs">
              <h1 className="text-sm max-w-sm">{ele?.activity?.name}</h1>
              <div className="flex gap-1">
                <h1 className="w-14 h-4 bg-blue-500 text-white text-center">
                  Adult {ele?.adultsCount ? ele?.adultsCount : 0}
                </h1>
                <h1 className="w-14 h-4 bg-blue-500 text-white text-center">
                  Child {ele?.childrenCount ? ele?.childrenCount : 0}
                </h1>
                <h1 className="w-14 h-4 bg-blue-500 text-white text-center">
                  Infant {ele?.infantCount ? ele?.infantCount : 0}
                </h1>
              </div>
            </td>
            <td className="px-6 py-4">{ele?.transferType} Transfer</td>
            <td className="px-6 py-4">{ele?.grandTotal}</td>
            <td className="px-6 py-4">
              <h1
                className={`${
                  ele?.status === "confirmed"
                    ? "bg-green-100 text-green-600"
                    : ""
                } ${
                  ele?.status === "booked"
                    ? "bg-orange-100 text-orange-500"
                    : ""
                } font-bold  w-20 text-center p-1 text-xs  rounded`}
              >
                {ele?.status}
              </h1>
            </td>
            {
              ele?.status === 'confirmed' ? (
                <td className="px-6 py-4">
                  <h1
                    className="cursor-pointer text-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadAllTicket();
                    }}
                  >
                    <LuDownload />
                  </h1>
                </td>
              ) : (
                <td className="px-6 py-4">
                  N/A
                </td>
              )
            }
          </tr>
        </tbody>
      </table>
      {showDetails && (
        <div className="w-full h-52 px-10 py-3">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <div className="w-52 h-32">
                <img
                  className="w-full h-full object-cover"
                  src={config.SERVER_URL + ele?.activity?.attraction?.images[0]}
                  alt=""
                />
              </div>
              <div>
                <h1 className="text-sm max-w-sm font-semibold">
                  {ele?.activity?.name}
                </h1>
                <div className="pt-2">
                  <h1>{ele?.activity?.attraction?.title}</h1>
                </div>
                <div className="pt-1">
                  <h1 className="text-xs text-gray-300">
                    {" "}
                    {ele?.date?.slice(0, 10)}
                  </h1>
                </div>
              </div>
            </div>

            <div>
              <div>
                <h1 className="text-gray-300 ">User Details</h1>
              </div>
              <div className="flex gap-1 pt-1">
                <h1 className="">
                  <GoPerson />
                </h1>
                <h1 className="text-sm">{orderDetails?.name}</h1>
              </div>
              <div className="flex gap-1 pt-1">
                <h1>
                  <MdOutlineMailOutline />
                </h1>
                <h1 className="text-sm">{orderDetails?.email}</h1>
              </div>
            </div>

            <div>
              <div>
                <h1 className="text-gray-300">Other Options</h1>
              </div>
              <div className="pt-1">
                <div>
                  <h1 className="text-sm">{ele?.transferType} Transfer</h1>
                </div>
                <div className="flex gap-1 pt-1 ">
                  <h1 className="text-sm">Status - </h1>
                  <h1
                    className={`${
                      ele?.status === "confirmed"
                        ? "bg-green-100 text-green-600"
                        : ""
                    } ${
                      ele?.status === "booked"
                        ? "bg-orange-100 text-orange-500"
                        : ""
                    } font-semibold  w-20 h-4 text-center  text-xs  rounded`}
                  >
                    {ele?.status}
                  </h1>
                </div>
                <div className="pt-1">
                  <h1 className="text-sm">Adult Count : {ele?.adultsCount}</h1>
                </div>
                <div className="pt-1">
                  <h1 className="text-sm">
                    Children Count : {ele?.childrenCount}
                  </h1>
                </div>
                <div className="pt-1">
                  <h1 className="text-sm">Infant Count : {ele?.infantCount}</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-5">
            {ele?.adultTickets?.length ? (
              <div className="flex gap-2">
                {ele?.adultTickets?.map((item, i) => {
                  return (
                    <div className="flex gap-1" key={i}>
                      <h1 className="text-sm">{item?.ticketNo}</h1>
                      <h1
                        className="text-blue-400 cursor-pointer"
                        onClick={() => {
                          handleDownloadTicket(item);
                        }}
                      >
                        <IoDownloadOutline />
                      </h1>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            {ele?.childTickets?.length ? (
              <div className="flex gap-3">
                {ele?.childTickets?.map((item, i) => {
                  return (
                    <div className="flex gap-1" key={i}>
                      <h1 className="text-sm">{item?.ticketNo}</h1>
                      <h1
                        onClick={() => {
                          handleDownloadTicket(item);
                        }}
                        className="text-blue-400 cursor-pointer"
                      >
                        <IoDownloadOutline />
                      </h1>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
            {ele?.infantTickets?.length ? (
              <div className="flex gap-3">
                {ele?.infantTickets?.map((item, i) => {
                  return (
                    <div className="flex gap-1" key={i}>
                      <h1 className="text-sm">{item?.ticketNo}</h1>
                      <h1
                        onClick={() => {
                          handleDownloadTicket(item);
                        }}
                        className="text-blue-400 cursor-pointer"
                      >
                        <IoDownloadOutline />
                      </h1>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowAttractionDetails;
