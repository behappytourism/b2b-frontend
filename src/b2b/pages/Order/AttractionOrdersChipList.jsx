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
import { useRef } from "react";
import { AiFillPrinter, AiOutlineDown } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import axios from "../../../axios";
import { config } from "../../../constants";

function AttractionOrdersChipList({ item }) {
  const [orderDetails, setOrderDetails] = useState(false);
  const { selectedCurrency } = useSelector((state) => state.home);

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

  // const handleSingleTicketDownload = (ticketNo) => {
  //   var node = document.getElementById(ticketNo);

  //   var options = {
  //     filename: `${ticketNo}.pdf`,
  //   };
  //   domToPdf(node, options, function (pdf) {});
  // };

  const list = tickets();
  const listRef = useRef();

  const { token } = useSelector((state) => state.agents);

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
      <div className="mb-2.5 bg-neutral-50 border border-neutral-100 rounded-xl m-4 shadow-sm">
        <div className="p-3">
          <div className="w-full">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className=" pb-3">
                    <div className="flex flex-wrap items-center">
                      <div className="w-auto  space-y-2">
                        <span className="sm:flex gap-5  sm:space-y-0 space-y-2 text-sm font-[500]">
                          <div className="">
                            <p className="text-textColor">
                              {item?.referenceNumber}{" "}
                            </p>
                            <span className="flex justify-start gap-2 text-[10px] font-normal mt-1">
                              <p className="bg-gray-400 text-gray-100 px-2 py-[4px] rounded-full">
                                {item?.reseller?.agentCode}
                              </p>
                              <p
                                className={`bg-gray-200 text-gray-500 px-2 py-[4px] rounded-full capitalize`}
                              >
                                {item?.activities?.bookingType}
                              </p>
                            </span>
                          </div>
                          <div className="">
                            <p className="text-darktext">
                              {item?.activities?.activity?.name}
                            </p>
                            <span className="flex justify-start gap-2 text-xs font-normal mt-1">
                              <p className="bg-gray-300 text-gray-500 px-2 py-[4px] rounded-full">
                                Adult : {item?.activities?.adultsCount}
                              </p>
                              <p className="bg-gray-300 text-gray-500 px-2 py-[4px] rounded-full">
                                Child : {item?.activities?.childrenCount}
                              </p>
                              <p className="bg-gray-300 text-gray-500 px-2 py-[4px] rounded-full">
                                Infant : {item?.activities?.infantCount}
                              </p>
                            </span>
                          </div>
                        </span>
                        <span className="text-[15px]  flex gap-4 capitalize text-slate-700">
                          <span className=" py-[4px] px-2 rounded-full font-[600] ">
                            {priceConversion(
                              item?.totalAmount,
                              selectedCurrency,
                              true
                            )}{" "}
                          </span>

                          <span className=" py-[4px] px-2 rounded-full">
                            <p className="">
                              {item?.activities?.status === "confirmed" ? (
                                <span className="bg-green-400 text-[12px] py-1 text-light px-4 rounded-full capitalize">
                                  {item?.activities?.status}
                                </span>
                              ) : item?.activities?.status === "pending" ? (
                                <span className="bg-orange-400 text-[12px] py-1 text-light px-4 rounded-full capitalize">
                                  {item?.activities?.status}
                                </span>
                              ) : item?.activities?.status === "booked" ? (
                                <span className="bg-lightblue text-[12px] py-1 text-light px-4 rounded-full capitalize">
                                  {item?.activities?.status}
                                </span>
                              ) : (
                                <span className="bg-red-400 text-[12px] py-1 text-light px-4 rounded-full capitalize">
                                  {item?.activities?.status}
                                </span>
                              )}
                            </p>
                          </span>
                        </span>
                        <div className="sm:flex flex-wrap gap-2">
                          <span className="block text-xs text-neutral-500">
                            Booking Date -{" "}
                            {item?.activities?.date?.slice(0, 10)}
                          </span>
                          <span className="block text-xs text-neutral-500">
                            Purchase Date - {item?.createdAt?.slice(0, 10)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="">
                    <div className="flex  gap-2 sm:justify-start justify-between items-center">
                      {/* <ReactToPrint
                                    trigger={() => (
                                       <button
                                          disabled={
                                             item?.activities?.status !==
                                             "confirmed"
                                          }
                                          className="px-4 py-3 font-medium text-darktext border hover:border-neutral-200 rounded-lg flex justify-center items-center gap-1"
                                       >
                                          <span className="text-sm">
                                             Invoice
                                          </span>
                                          <AiFillPrinter />
                                       </button>
                                    )}
                                    content={() =>
                                       document.getElementById(
                                          "attraction_order_pdf_template"
                                       )
                                    }
                                 /> */}
                      <button
                        onClick={() => handleDownloadInvoice(item)}
                        disabled={item?.activities?.status !== "confirmed"}
                        className="px-4 py-3 font-medium text-darktext border hover:border-neutral-200 rounded-lg flex justify-center items-center gap-1"
                      >
                        <span className="text-sm">Invoice</span>
                        <AiFillPrinter />
                      </button>
                      <a
                        href={`${config.CLIENT_URL}/ticket/attraction/${item?._id}`}
                        disabled={item?.activities?.status !== "confirmed"}
                        target="blank"
                        className="px-4 py-3 font-medium text-darktext border hover:border-neutral-200 rounded-lg flex justify-center items-center gap-1"
                      >
                        <span className="text-sm">View </span>
                        <ImTicket />
                      </a>

                      <button
                        className="hidden px-4 py-3 font-medium text-darktext border hover:border-neutral-200 rounded-lg sm:flex justify-center items-center gap-1"
                        onClick={() => setOrderDetails(!orderDetails)}
                      >
                        <span className="text-sm">Details</span>
                        <TbListDetails />
                      </button>
                      <span
                        className="sm:hidden "
                        onClick={() => setOrderDetails(!orderDetails)}
                      >
                        <AiOutlineDown />
                      </span>
                    </div>
                  </td>
                </tr>
                {orderDetails && (
                  <>
                    <tr className="border-b border-tableBorderColor border-dashed">
                      <td colSpan="12" className="p-3">
                        <div className="md:flex flex-wrap items-start gap-[3em]">
                          <div className="md:flex items-start gap-[1em]">
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
                            <h2 className="font-medium text-grayColor">
                              User Details
                            </h2>
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
                            <h2 className="font-medium text-grayColor">
                              Other Option
                            </h2>
                            {item?.activities?.transferType === "without" ? (
                              <span className="flex items-center gap-[7px] mt-1 capitalize">
                                <MdNoTransfer />{" "}
                                {item?.activities?.transferType} Transfer
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
                                  <button className="px-3 py-1 flex gap-2 items-center cursor-pointer ">
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
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AttractionOrdersChipList;
