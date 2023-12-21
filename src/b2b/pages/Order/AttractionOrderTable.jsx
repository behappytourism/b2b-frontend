import React, { useState } from "react";
import { BiPhone, BiUser } from "react-icons/bi";
import { FaBus } from "react-icons/fa";
import { FcDownload } from "react-icons/fc";
import { ImTicket } from "react-icons/im";
import { FiMapPin } from "react-icons/fi";
import { MdNoTransfer, MdOutlineEmail } from "react-icons/md";
import { useSelector } from "react-redux";
import priceConversion from "../../../utils/PriceConversion";
import { useMemo } from "react";
import { AiFillPrinter } from "react-icons/ai";
import axios from "../../../axios";
import { config } from "../../../constants";

function AttractionOrderTable({ item }) {
  const [orderDetails, setOrderDetails] = useState(false);
  const { selectedCurrency } = useSelector((state) => state.home);
  const { token } = useSelector((state) => state.agents);

  const tickets = useMemo(() => {
    return () => {
      const ele = item?.activities;
      let ticketList = [];
      if (ele?.adultTickets) ticketList = [...ticketList, ...ele?.adultTickets];
      if (ele?.childTickets) ticketList = [...ticketList, ...ele?.childTickets];

      ticketList = ticketList?.map((tkt) => {
        return {
          ...tkt,
          attraction: item?.attraction,
          activity: ele?.activity,
          destination: ele?.destination,
        };
      });
      if (ticketList) return ticketList;
      return [];
    };
  }, [item]);

  const list = tickets();

  const handleDownloadAllTickets = async (ele) => {
    try {
      const pdfBuffer = await axios.get(
        `/b2b/attractions/orders/${item?._id}/ticket/${item?.activities?._id}`,
        {
          headers: { authorization: `Bearer ${token}` },
          responseType: "arraybuffer",
        }
      );

      console.log(pdfBuffer, "pdfBuffer");
      const blob = new Blob([pdfBuffer.data], {
        type: "application/pdf",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "tickets.pdf";
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDownloadTicket = async (ele) => {
    try {
      const response = await axios.get(
        `/b2b/attractions/orders/${item?._id}/ticket/${item?.activities?._id}/single/${ele?.ticketNo}`,
        {
          headers: { authorization: `Bearer ${token}` },
          responseType: "arraybuffer", 
        }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${ele?.ticketNo}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDownloadInvoice = async (ele) => {
    try {
      const response = await axios.get(
        `/b2b/attractions/orders/single/${ele?._id}/invoice`,
        {
          headers: { authorization: `Bearer ${token}` },
          responseType: "arraybuffer",
        }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${ele?.referenceNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <tr
        className="relative overflow-hidden border-b border-tableBorderColor "
        onClick={() => setOrderDetails(!orderDetails)}
      >
        <td className="p-3">
          <div className="">
            <p className="">{item?.agentReferenceNumber} </p>
            <span className="flex justify-start gap-2">
              <p className="bg-orange-500 text-gray-100 px-2 h-5 text-xs rounded-sm shadow-mn flex justify-center items-center">
                {item?.reseller?.agentCode}
              </p>
              <p
                className={`bg-gray-400 text-gray-100 px-2 h-5 text-xs rounded-sm shadow-mn flex justify-center items-center capitalize`}
              >
                {item?.activities?.bookingType}
              </p>
            </span>
          </div>
        </td>
        <td className="p-3 min-w-[200px]">
          <div className="">
            <p className="">{item?.activities?.activity?.name}</p>
            <span className="flex justify-start gap-2 text-xs">
              <p className="bg-blue-800 text-gray-100 px-2 h-5 text-xs  rounded-sm flex justify-center items-center shadow-mn">
                Adult : {item?.activities?.adultsCount}
              </p>
              <p className="bg-blue-800 text-gray-100 px-2 h-5 text-xs  rounded-sm flex justify-center items-center shadow-mn">
                Child : {item?.activities?.childrenCount}
              </p>
              <p className="bg-blue-800 text-gray-100 px-2 h-5 text-xs  rounded-sm flex justify-center items-center shadow-mn">
                Infant : {item?.activities?.infantCount}
              </p>
            </span>
          </div>
        </td>
        <td className="p-3 ">{item?.activities?.date?.slice(0, 10)}</td>
        <td className="p-3 ">{item?.createdAt?.slice(0, 10)} </td>
        <td className="p-3 whitespace-nowrap">
          {priceConversion(item?.totalAmount, selectedCurrency, true)}{" "}
        </td>
        <td className="">
          {item?.activities?.status === "confirmed" ? (
            <div className="bg-green-400 text-xs text-light px-4 rounded-sm shadow-mn h-6 flex justify-center items-center capitalize">
              {item?.activities?.status}
            </div>
          ) : item?.activities?.status === "pending" ? (
            <div className="bg-orange-400 text-xs text-light px-4 rounded-sm shadow-mn h-6 flex justify-center items-center capitalize">
              {item?.activities?.status}
            </div>
          ) : item?.activities?.status === "booked" ? (
            <div className="bg-lightblue text-xs text-light px-4 rounded-sm shadow-mn h-6 flex justify-center items-center capitalize">
              {item?.activities?.status}
            </div>
          ) : (
            <div className="bg-red-400 text-xs text-light px-4 rounded-sm shadow-mn h-6 flex justify-center items-center capitalize">
              {item?.activities?.status}
            </div>
          )}
        </td>

        <td className="p-3">
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col gap-1"
          >

            <button
              onClick={() => handleDownloadInvoice(item)}
              disabled={item?.activities?.status !== "confirmed"}
              className=" px-2 h-6  rounded-sm shadow-mn text-white text-sm flex items-center gap-1 justify-center w-[100%] bg-gray-400"
            >
              <span className="text-xs">Invoice</span>
              <AiFillPrinter />
            </button>
            <button
              disabled={item?.activities?.status !== "confirmed"}
              onClick={handleDownloadAllTickets}
              className=" px-1 h-6  rounded-sm shadow-mn text-white text-sm flex items-center gap-1 justify-center w-[100%] bg-gray-400"
            >
              <span className="text-xs">Download</span>
              <ImTicket />
            </button>
          </div>
        </td>
      </tr>
      {orderDetails && (
        <>
          <tr className="border-b border-tableBorderColor border-dashed">
            <td colSpan="12" className="p-3">
              <div className="flex flex-wrap items-start gap-[3em]">
                <div className="flex items-start gap-[1em]">
                  <div className="w-[150px] max-h-[100px] rounded overflow-hidden">
                    <img
                      src={
                        config.SERVER_URL +
                        item?.attraction?.images[0]
                      }
                      alt="Attraction"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-base font-[600]">
                      {item?.attraction?.title}{" "}
                    </h2>
                    <span className="font-medium block mt-1">
                      {item?.activities?.activity?.name}{" "}
                    </span>
                    <span className="block text-grayColor mt-1">
                      {item?.activities?.date?.slice(0, 10)}
                    </span>
                  </div>
                </div>
                <div>
                  <h2 className="font-medium text-grayColor">User Details</h2>
                  <span className="flex items-center gap-[7px] mt-1 capitalize">
                    <BiUser /> {item?.name}
                  </span>
                  <span className="flex items-center gap-[7px] mt-1">
                    <MdOutlineEmail /> {item?.email}
                  </span>
                  <span className="flex items-center gap-[7px] mt-1">
                    <FiMapPin /> {item?.country?.countryName}
                  </span>
                  <span className="flex items-center gap-[7px] mt-1">
                    <BiPhone /> {item?.phoneNumber}
                  </span>
                </div>
                <div>
                  <h2 className="font-medium text-grayColor">Other Option</h2>
                  {item?.activities?.transferType === "without" ? (
                    <span className="flex items-center gap-[7px] mt-1 capitalize">
                      <MdNoTransfer /> {item?.activities?.transferType} Transfer
                    </span>
                  ) : (
                    <span className="flex items-center gap-[7px] mt-1 capitalize">
                      <FaBus /> Transfer
                    </span>
                  )}
                  <span className="block mt-1">
                    Status -{" "}
                    {item?.activities?.status === "booked" ? (
                      <span className="bg-green-100 text-xs text-green-500 px-4 rounded capitalize">
                        {item?.activities?.status}
                      </span>
                    ) : item?.activities?.status === "pending" ? (
                      <span className="bg-orange-100 text-xs text-orange-500 px-4 rounded capitalize">
                        {item?.activities?.status}
                      </span>
                    ) : item?.activities?.status === "confirmed" ? (
                      <span className="bg-green-100 text-xs text-green-500 px-4 rounded capitalize">
                        {item?.activities?.status}
                      </span>
                    ) : (
                      <span className="bg-red-100 text-xs text-red-500 px-4 rounded capitalize">
                        {item?.activities?.status}
                      </span>
                    )}
                  </span>
                  <span className="block mt-2">
                    Adults Count:{" "}
                    <span className="text-sm font-medium">
                      {item?.activities?.adultsCount}
                    </span>
                  </span>
                  <span className="block mt-2">
                    Children Count:{" "}
                    <span className="text-sm font-medium">
                      {item?.activities?.childrenCount}
                    </span>
                  </span>
                  <span className="block mt-2">
                    Infants Count:{" "}
                    <span className="text-sm font-medium">
                      {item?.activities?.infantCount}
                    </span>
                  </span>
                </div>
              </div>
            </td>
          </tr>
          <tr className="border-b border-tableBorderColor">
            <td colSpan="12 max-w-[1600px]">
              <ul className="flex flex-wrap">
                {list?.map((ele) => (
                  <>
                    <button
                      className="px-3 py-1 flex gap-2 items-center cursor-pointer "
                      onClick={() => {
                        handleDownloadTicket(ele);
                      }}
                    >
                      {ele?.ticketNo}{" "}
                      <span>
                        <FcDownload />
                      </span>
                    </button>
                  </>
                ))}
              </ul>
            </td>
          </tr>
        </>
      )}
    </>
  );
}

export default AttractionOrderTable;
