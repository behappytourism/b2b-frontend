import React, { useEffect, useState, Fragment } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "../../../axios";
import priceConversion from "../../../utils/PriceConversion";
import formatDate from "../../../utils/formatDate";
import {
  AiOutlineDownload,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { previewImage } from "../../../static/imagesB2B";
import CancellationRemarkModal from "./CancellationRmarkModal";
import { BtnLoader } from "../../components";
import { config } from "../../../constants";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  setAlertError,
  setAlertSuccess,
} from "../../../redux/slices/homeSlice";
import OtpModal from "./otpModal";

function HotelOrderDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [hotelSingleOrder, setHotelSingleOrder] = useState({});
  const [cancelRemarkModalOpen, setCancelRemarkModalOpen] = useState(false);
  const [status, setStatus] = useState({
    status: "",
    cancellationRemark: "",
    cancelledBy: "",
  });
  const [voucherLoading, setVoucherLoading] = useState(false);
  const [invoiceloading, setInvoiceLoading] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const { token } = useSelector((state) => state.agents);
  const { selectedCurrency } = useSelector((state) => state.home);

  const fetchSingleHotelOrder = async () => {
    try {
      setIsLoading(true);
      if (token) {
        const response = await axios.get(`/b2b/hotels/orders/single/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setIsLoading(false);
        setHotelSingleOrder(response.data || []);
        setPaymentStatus(response.data?.paymentState);
        setStatus({
          status: response?.data?.status,
          cancellationRemark: response?.data?.cancellationRemark,
          cancelledBy: response?.data?.cancelledBy,
        });
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleHotelOrder();
  }, []);

  const handleDownloadInvoice = async (ele) => {
    try {
      setInvoiceLoading(true);
      const response = await axios.get(
        `/b2b/hotels/orders/invoice/${ele?._id}`,
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
      link.setAttribute("download", `${ele?.referenceNumber + "-invoice"}.pdf`);
      document.body.appendChild(link);
      link.click();
      setInvoiceLoading(false);
    } catch (error) {
      setInvoiceLoading(false);
      console.log(error);
    }
  };
  const handleDownloadVoucher = async (ele) => {
    try {
      setVoucherLoading(true);
      const response = await axios.get(
        `/b2b/hotels/orders/voucher/${ele?._id}`,
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
      link.setAttribute("download", `${ele?.referenceNumber + "-voucher"}.pdf`);
      document.body.appendChild(link);
      link.click();
      setVoucherLoading(false);
    } catch (error) {
      setVoucherLoading(false);
      console.log(error);
    }
  };

  // Booking status css.
  const bookingStatus = status?.status;
  let classNameBookingStatus = "";

  switch (bookingStatus) {
    case "cancelled":
      classNameBookingStatus = " text-red-800 bg-red-100 ";
      break;
    case "pending":
      classNameBookingStatus = " text-orange-600 bg-orange-100 ";
      break;
    case "created":
      classNameBookingStatus = " text-gray-400 bg-gray-100 ";
      break;
    default:
      classNameBookingStatus = " text-[#0ab39c] bg-[#0ab39c1A] ";
      break;
  }

  // Payment status css.
  let classNamePaymentStatus = "";

  switch (paymentStatus) {
    case "non-paid":
      classNamePaymentStatus = " text-red-800 bg-red-100 ";
      break;
    case "partially-paid":
      classNamePaymentStatus = " text-orange-600 bg-orange-100 ";
      break;
    case "fully-paid":
      classNamePaymentStatus = " text-[#0ab39c] bg-[#0ab39c1A] ";
      break;
    default:
      classNamePaymentStatus = " ";
      break;
  }

  const [isPayButtonLoading, setIsPayButtonLoading] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  //  Pay by Wallet. & cc avenue
  const paymentHandler = async (payby) => {
    try {
      setIsPayButtonLoading(true);
      const response = await axios.post(
        `/b2b/hotels/orders/payments/initiate`,
        { orderId: id, paymentMethod: payby },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (payby == "wallet") {
        setIsOtpModalOpen(true);
        setPaymentId(response?.data?.paymentId);
      }
      if (payby == "ccavenue") {
        const winUrl = URL.createObjectURL(
          new Blob([response.data], { type: "text/html" })
        );

        window.location.replace(winUrl);
      }
      setIsPayButtonLoading(false);
    } catch (err) {
      // const error = await err;
      console.log(err?.response?.data?.error);
      dispatch(
        setAlertError({
          status: true,
          title: "Something went wrong!",
          text: err?.response?.data?.error,
        })
      );
      setIsPayButtonLoading(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      {!isLoading ? (
        <div className="px-5 py-10">
          <div className="bg-white p-4  rounded shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)]">
            <div className="flex items-start justify-between gap-[20px]">
              <div className="flex gap-[20px]">
                <div className="w-[200px] h-[100px] rounded overflow-hidden">
                  <img
                    src={
                      hotelSingleOrder?.hotel?.images?.length > 1
                        ? hotelSingleOrder?.hotel?.images[0]?.isRelative
                          ? config.SERVER_URL +
                            hotelSingleOrder?.hotel?.images[0]?.path
                          : hotelSingleOrder?.hotel?.images[0]?.path
                        : previewImage
                    }
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="font-[600] text-lg">
                    {hotelSingleOrder?.referenceNumber}
                  </h1>
                  <span className="block text-sm text-grayColor mt-1">
                    {formatDate(hotelSingleOrder?.createdAt, true)}
                  </span>
                  <span className="block mt-2 font-[500] text-sm">
                    <Link
                      to={`/b2b/${hotelSingleOrder?.reseller?._id}/details`}
                      className="underline text-blue-500"
                    >
                      {hotelSingleOrder?.reseller?.companyName}
                    </Link>{" "}
                    - ({hotelSingleOrder?.reseller?.agentCode})
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-[25px]">
                  <div className="text-center">
                    <span className="block text-sm text-grayColor font-medium">
                      Net Price
                    </span>
                    <span className="fon  eet-[600] text-lg">
                      {hotelSingleOrder?.netPrice} AED
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="block text-sm text-grayColor font-medium">
                      Booking Status
                    </span>
                    <span
                      className={`block text-[12px] capitalize px-3 rounded py-[2px] font-medium ${classNameBookingStatus} `}
                    >
                      {status?.status}
                    </span>
                  </div>  
                  {paymentStatus ? (
                    <div className="text-center">
                      <span className="block text-sm text-grayColor font-medium">
                        Payment Status
                      </span>
                      <span
                        className={`block text-[12px] capitalize px-3 rounded py-[2px] font-medium ${classNamePaymentStatus} `}
                      >
                        {paymentStatus}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="w-full flex gap-3">
                  {status?.status === "cancelled" ? (
                    ""
                  ) : (
                    <div className="w-full">
                      <button
                        onClick={() => setCancelRemarkModalOpen(true)}
                        className="w-full text-sm bg-red-600 shadow-mn h-8 text-white  rounded-sm shadow-shadow font-[500] mt-2"
                      >
                        Cancel Order
                      </button>
                      <p className="text-xs text-center mt-1 text-gray-200">
                        Click here to cancel order
                      </p>
                      {cancelRemarkModalOpen && (
                        <CancellationRemarkModal
                          hotel={hotelSingleOrder?.hotel}
                          setCancelRemarkModalOpen={setCancelRemarkModalOpen}
                          orderId={hotelSingleOrder?._id}
                          setStatus={setStatus}
                        />
                      )}
                    </div>
                  )}
                  {paymentStatus == "non-paid" ? (
                    <div className="w-full">
                      <Popover className={" mt-2 relative"}>
                        <Popover.Button className={"w-full outline-none"}>
                          <button
                            disabled={isPayButtonLoading}
                            className="w-full disabled:cursor-not-allowed text-sm bg-blue-600 shadow-mn h-8 text-white  rounded-sm shadow-shadow font-[500] "
                          >
                            {isPayButtonLoading ? (
                              <BtnLoader />
                            ) : (
                              `Pay ${priceConversion(
                                hotelSingleOrder?.netPrice,
                                selectedCurrency,
                                true
                              )}`
                            )}
                          </button>
                        </Popover.Button>
                        <Popover.Panel className="absolute z-10 w-screen md:w-full max-w-sm  mt-3 right-0 sm:px-0 lg:max-w-md shadow-mn bg-white rounded ">
                          {({ close }) => (
                            <div className="">
                              <div
                                onClick={() => {
                                  paymentHandler("wallet");
                                  close();
                                }}
                                className="p-2 text-center hover:bg-gray-100 text-sm font-medium cursor-pointer"
                              >
                                Wallet
                              </div>
                              <div
                                onClick={() => {
                                  paymentHandler("ccavenue");
                                  close();
                                }}
                                className="p-2 text-center hover:bg-gray-100 text-sm font-medium cursor-pointer"
                              >
                                Card
                              </div>
                            </div>
                          )}
                        </Popover.Panel>
                      </Popover>
                      {isOtpModalOpen && (
                        <OtpModal
                          setOtpModal={setIsOtpModalOpen}
                          orderId={paymentId}
                          amount={Number(hotelSingleOrder?.netPrice)}
                          setPaymentStatus={setPaymentStatus}
                        />
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {status?.status === "cancelled" && status?.cancellationRemark ? (
              <div className="bg-red-50 py-1 mt-5 px-2">
                <p className="text-sm text-red-800 font-[500] ">
                  {status?.cancellationRemark}
                </p>
              </div>
            ) : (
              ""
            )}

            <div className="mt-6 grid grid-cols-2 gap-6 w-full">
              <div>
                <table className="w-full text-[15px]">
                  <tbody>
                    <tr className="odd:bg-[#f3f6f9]">
                      <td className="p-2 w-[180px]">Hotel</td>
                      <td className="p-2">
                        {hotelSingleOrder?.hotel?.hotelName}
                      </td>
                    </tr>
                    <tr className="odd:bg-[#f3f6f9]">
                      <td className="p-2">Check In Date</td>
                      <td className="p-2">
                        {formatDate(hotelSingleOrder?.fromDate)}
                      </td>
                    </tr>
                    <tr className="odd:bg-[#f3f6f9]">
                      <td className="p-2">Check Out Date</td>
                      <td className="p-2">
                        {formatDate(hotelSingleOrder?.toDate)}
                      </td>
                    </tr>
                    <tr className="odd:bg-[#f3f6f9]">
                      <td className="p-2">Room Type</td>
                      <td className="p-2">
                        {hotelSingleOrder?.roomType?.roomName}
                      </td>
                    </tr>
                    <tr className="odd:bg-[#f3f6f9]">
                      <td className="p-2">Board Type</td>
                      <td className="p-2">
                        {hotelSingleOrder?.boardType?.boardName +
                          `(${hotelSingleOrder?.boardType?.boardShortName})`}
                      </td>
                    </tr>
                    {/* <tr className="odd:bg-[#f3f6f9]">
                    <td className="p-2">Meal Supplement</td>
                    <td className="p-2">Bed & Breakfast (BB)</td>
                  </tr> */}
                    <tr className="odd:bg-[#f3f6f9]">
                      <td className="p-2">Special Request</td>
                      <td className="p-2">
                        {hotelSingleOrder?.specialRequest
                          ? hotelSingleOrder?.specialRequest
                          : "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div>
                  {hotelSingleOrder?.mandatoryAddOns?.length > 0 && (
                    <div className="mt-7">
                      <h1 className="font-[600] flex items-center gap-[10px] text-[15px] mb-2">
                        <BsFillArrowRightCircleFill /> Mandatory Add Ons
                      </h1>
                      <ul className="list-disc pl-4 text-[15px] leading-[26px]">
                        {hotelSingleOrder?.mandatoryAddOns?.map((data) => (
                          <li>{data?.addOnName}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {hotelSingleOrder?.addOnSupplements?.length > 0 && (
                    <div className="mt-7">
                      <h1 className="font-[600] flex items-center gap-[10px] text-[15px] mb-2">
                        <BsFillArrowRightCircleFill /> Supplement Add Ons
                      </h1>
                      <ul className="list-disc pl-4 text-[15px] leading-[26px]">
                        {hotelSingleOrder?.addOnSupplements?.map((data) => (
                          <li>{data?.addOnName}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-7">
                    <h1 className="font-[600] flex items-center gap-[10px] text-[15px] mb-2">
                      <BsFillArrowRightCircleFill /> Contact Details
                    </h1>
                    <div className="flex gap-[25px] flex-wrap text-[15px]">
                      <div className="flex items-center gap-[10px]">
                        <span>
                          <AiOutlineMail />
                        </span>
                        {hotelSingleOrder?.contactDetails?.email}
                      </div>
                      <div className="flex items-center gap-[10px]">
                        <span>
                          <AiOutlinePhone />
                        </span>
                        {hotelSingleOrder?.contactDetails?.country?.phonecode}{" "}
                        {hotelSingleOrder?.contactDetails?.phoneNumber}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-5">
                      {status?.status !== "pending" ? (
                        <button
                          onClick={() =>
                            handleDownloadInvoice(hotelSingleOrder)
                          }
                          disabled={invoiceloading}
                          className="w-full bg-primaryColor rounded-sm shadow-mn text-white font-[13px] py-2 flex gap-1 items-center justify-center hover:bg-primaryColor/90"
                        >
                          {invoiceloading ? (
                            <BtnLoader />
                          ) : (
                            <>
                              <span className="">
                                <AiOutlineDownload />
                              </span>
                              <span className="">Invoice</span>
                            </>
                          )}
                        </button>
                      ) : (
                        ""
                      )}
                      {status?.status === "confirmed" ? (
                        <button
                          onClick={() =>
                            handleDownloadVoucher(hotelSingleOrder)
                          }
                          disabled={voucherLoading}
                          className="w-full bg-orange-600 rounded-sm shadow-mn text-white font-[13px] py-2 flex gap-1 items-center justify-center hover:bg-orange-600/90"
                        >
                          {voucherLoading ? (
                            <BtnLoader />
                          ) : (
                            <>
                              <span className="">
                                <AiOutlineDownload />
                              </span>
                              <span className="">Voucher</span>
                            </>
                          )}
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <table className="w-full text-[15px]">
                  <tbody>
                    <tr className="odd:bg-[#f3f6f9]">
                      <td className="p-2">Number of Nights</td>
                      <td>{hotelSingleOrder?.noOfNights}</td>
                    </tr>
                    <tr className="odd:bg-[#f3f6f9]">
                      <td className="p-2">Total Rooms</td>
                      <td>{hotelSingleOrder?.roomsCount}</td>
                    </tr>
                    <tr className="odd:bg-[#f3f6f9]">
                      <td className="p-2">Total Pax</td>
                      <td>
                        {hotelSingleOrder?.totalAdults} Adults,{" "}
                        {hotelSingleOrder?.totalChildren} Children
                      </td>
                    </tr>
                    {hotelSingleOrder?.rooms?.map((room, index) => {
                      return (
                        <React.Fragment key={index}>
                          <tr className="bg-primaryColor text-white">
                            <td className="p-2 font-medium" colSpan="2">
                              Room {index + 1}
                            </td>
                          </tr>
                          <tr className="odd:bg-[#f3f6f9]">
                            <td className="p-2">Pax</td>
                            <td>
                              {room?.noOfAdults} Adults, {room?.noOfChildren}{" "}
                              Children
                              {room?.childrenAges?.length > 0 &&
                                `(${room?.childrenAges
                                  ?.toString()
                                  ?.replace(",", " ,")})`}
                            </td>
                          </tr>
                          <tr className="odd:bg-[#f3f6f9]">
                            <td className="p-2">Traveller</td>
                            <td className="capitalize">
                              {hotelSingleOrder?.travellerDetails[index]?.title}{" "}
                              {
                                hotelSingleOrder?.travellerDetails[index]
                                  ?.firstName
                              }{" "}
                              {
                                hotelSingleOrder?.travellerDetails[index]
                                  ?.lastName
                              }
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
                <div className="mt-6 px-2">
                  <table className="w-full text-[15px]">
                    <tbody>
                      <tr>
                        <td className="font-medium py-1 w-full">
                          <div className="flex gap-[15px] items-center w-full">
                            <span className="">Gross Price</span>
                            <div className="border-b border-dashed flex-1"></div>
                            <span className="text-right font-[600]">
                              {priceConversion(
                                hotelSingleOrder?.grossPrice,
                                selectedCurrency,
                                true
                              )}
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-grayColor py-1 w-full">
                          <div className="flex gap-[15px] items-center w-full">
                            <span className="">Meal supplement</span>
                            <div className="border-b border-dashed flex-1"></div>
                            <span className="text-right">
                              {priceConversion(
                                hotelSingleOrder?.mealSupplementPrice,
                                selectedCurrency,
                                true
                              )}
                            </span>
                          </div>
                        </td>
                      </tr>
                      {/* <tr>
                        <td className="text-grayColor py-1 w-full">
                          <div className="flex gap-[15px] items-center w-full">
                            <span className="">Mandatory Addon</span>
                            <div className="border-b border-dashed flex-1"></div>
                            <span className="text-right">
                              {priceConversion(
                                hotelSingleOrder?.mealSupplementPrice,
                                selectedCurrency,
                                true
                              )}
                            </span>
                          </div>
                        </td>
                      </tr> */}
                      <tr>
                        <td className="text-grayColor py-1 w-full">
                          <div className="flex gap-[15px] items-center w-full">
                            <span className="">Addon Supplement</span>
                            <div className="border-b border-dashed flex-1"></div>
                            <span className="text-right">
                              {priceConversion(
                                hotelSingleOrder?.addOnSupplementPrice,
                                selectedCurrency,
                                true
                              )}
                            </span>
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td className="font-medium py-1 w-full">
                          <div className="flex gap-[15px] items-center w-full">
                            <span className="">Promotion</span>
                            <div className="border-b border-dashed flex-1"></div>
                            <span className="text-right font-[600]">
                              {priceConversion(
                                hotelSingleOrder?.totalOffer,
                                selectedCurrency,
                                true
                              )}
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-medium py-2 w-full">
                          <div className="flex gap-[15px] items-center w-full">
                            <span className="">Net Price</span>
                            <div className="border-b border-dashed flex-1"></div>
                            <span className="text-right font-[600] text-lg text-green-500 whitespace-nowrap">
                              {priceConversion(
                                hotelSingleOrder?.netPrice,
                                selectedCurrency,
                                true
                              )}
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-5 py-10 ">
          <div className="bg-white">
            <div className=" p-4 shadow-sm rounded animate-pulse">
              <div className="flex items-start justify-between gap-[20px]">
                <div className="flex gap-[20px]">
                  <div className="">
                    <svg
                      className="w-full h-[100px] text-gray-300"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 640 512"
                    >
                      <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                    </svg>
                  </div>
                  <div className="space-y-3">
                    <h1 className="h-5 w-36 bg-gray-400 rounded"></h1>
                    <p className="h-4 w-48 bg-gray-300 rounded"></p>
                    <p className="h-4 w-36 bg-gray-200 rounded"></p>
                  </div>
                </div>
                <div className="flex items-center gap-[25px]">
                  <div className="text-center space-y-3">
                    <p className="h-4 w-20 bg-gray-200 rounded"></p>
                    <p className="h-7 w-20 bg-gray-400 rounded"></p>
                  </div>
                  <div>
                    <p className="h-5 w-24 bg-gray-300 rounded"></p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-6 w-full">
                <div>
                  <table className="w-full text-[15px]">
                    <tbody>
                      <tr className="odd:bg-[#f3f6f9]">
                        <td className="p-2 w-[180px]">
                          <p className="h-4 w-36 bg-gray-200 rounded"></p>
                        </td>
                        <td className="p-2">
                          <p className="h-4 w-36 bg-gray-200 rounded"></p>
                        </td>
                      </tr>
                      <tr className="odd:bg-[#f3f6f9]">
                        <td className="p-2">
                          <p className="h-4 w-28 bg-gray-300 rounded"></p>
                        </td>
                        <td className="p-2">
                          <p className="h-4 w-28 bg-gray-300 rounded"></p>
                        </td>
                      </tr>
                      <tr className="odd:bg-[#f3f6f9]">
                        <td className="p-2">
                          <p className="h-4 w-40 bg-gray-300 rounded"></p>
                        </td>
                        <td className="p-2">
                          <p className="h-4 w-40 bg-gray-300 rounded"></p>
                        </td>
                      </tr>
                      <tr className="odd:bg-[#f3f6f9]">
                        <td className="p-2">
                          <p className="h-4 w-36 bg-gray-300 rounded"></p>
                        </td>
                        <td className="p-2">
                          <p className="h-4 w-36 bg-gray-300 rounded"></p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <div className="mt-7">
                      <h1 className="font-[600] flex items-center gap-[10px] text-[15px] mb-2">
                        <BsFillArrowRightCircleFill /> Supplement Add Ons
                      </h1>
                      <ul className="list-disc pl-4 text-[15px] leading-[26px]">
                        <li>
                          <p className="h-4 w-36 bg-gray-200 rounded"></p>
                        </li>
                        <li>
                          <p className="h-4 w-36 bg-gray-200 rounded"></p>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-7">
                      <h1 className="font-[600] flex items-center gap-[10px] text-[15px] mb-2">
                        <BsFillArrowRightCircleFill /> Contact Details
                      </h1>
                      <div className="flex gap-[25px] flex-wrap text-[15px]">
                        <div className="flex items-center gap-[10px]">
                          <span>
                            <AiOutlineMail />
                          </span>
                          <p className="h-4 w-36 bg-gray-300 rounded"></p>
                        </div>
                        <div className="flex items-center gap-[10px]">
                          <span>
                            <AiOutlinePhone />
                          </span>
                          <p className="h-4 w-36 bg-gray-300 rounded"></p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-5">
                        <button className="w-full bg-primaryColor rounded-sm text-white font-[13px] py-2 flex gap-1 items-center justify-center hover:bg-primaryColor/90">
                          <span className="">
                            <BtnLoader />
                          </span>
                        </button>
                        <button className="w-full bg-orange-600 rounded-sm text-white font-[13px] py-2 flex gap-1 items-center justify-center hover:bg-orange-600/90">
                          <span className="">
                            <BtnLoader />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <table className="w-full text-[15px]">
                    <tbody>
                      <tr className="odd:bg-[#f3f6f9]">
                        <td className="p-2">
                          <p className="h-4 w-36 bg-gray-300 rounded"></p>
                        </td>
                        <td>
                          <p className="h-4 w-36 bg-gray-300 rounded"></p>
                        </td>
                      </tr>
                      <tr className="odd:bg-[#f3f6f9]">
                        <td className="p-2">
                          <p className="h-4 w-28 bg-gray-200 rounded"></p>
                        </td>
                        <td>
                          <p className="h-4 w-36 bg-gray-200 rounded"></p>
                        </td>
                      </tr>
                      <tr className="odd:bg-[#f3f6f9]">
                        <td className="p-2">
                          <p className="h-4 w-24 bg-gray-300 rounded"></p>
                        </td>
                        <td>
                          <p className="h-4 w-24 bg-gray-300 rounded"></p>
                        </td>
                      </tr>
                      <React.Fragment>
                        <tr className="bg-primaryColor text-white">
                          <td className="p-2 font-medium" colSpan="2">
                            <p className="h-4 w-16 bg-gray-100 rounded"></p>
                          </td>
                        </tr>
                        <tr className="odd:bg-[#f3f6f9]">
                          <td className="p-2">
                            <p className="h-4 w-36 bg-gray-300 rounded"></p>
                          </td>
                          <td>
                            <p className="h-4 w-36 bg-gray-300 rounded"></p>
                          </td>
                        </tr>
                        <tr className="odd:bg-[#f3f6f9]">
                          <td className="p-2">
                            <p className="h-4 w-28 bg-gray-200 rounded"></p>
                          </td>
                          <td className="capitalize">
                            <p className="h-4 w-28 bg-gray-200 rounded"></p>
                          </td>
                        </tr>
                      </React.Fragment>
                    </tbody>
                  </table>
                  <div className="mt-6 px-2">
                    <table className="w-full text-[15px]">
                      <tbody>
                        <tr>
                          <td className="font-medium py-1 w-full">
                            <div className="flex gap-[15px] items-center w-full">
                              <p className="h-4 w-36 bg-gray-300 rounded"></p>
                              <div className="border-b border-dashed flex-1"></div>
                              <p className="h-4 w-20 bg-gray-300 rounded"></p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-grayColor py-1 w-full">
                            <div className="flex gap-[15px] items-center w-full">
                              <p className="h-4 w-24 bg-gray-300 rounded"></p>
                              <div className="border-b border-dashed flex-1"></div>
                              <p className="h-4 w-10 bg-gray-300 rounded"></p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-grayColor py-1 w-full">
                            <div className="flex gap-[15px] items-center w-full">
                              <p className="h-4 w-40 bg-gray-300 rounded"></p>
                              <div className="border-b border-dashed flex-1"></div>
                              <p className="h-4 w-10 bg-gray-300 rounded"></p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-grayColor py-1 w-full">
                            <div className="flex gap-[15px] items-center w-full">
                              <p className="h-4 w-36 bg-gray-300 rounded"></p>
                              <div className="border-b border-dashed flex-1"></div>
                              <p className="h-4 w-10 bg-gray-300 rounded"></p>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td className="font-medium py-2 w-full">
                            <div className="flex gap-[15px] items-center w-full">
                              <p className="h-4 w-24 bg-gray-300 rounded"></p>
                              <div className="border-b border-dashed flex-1"></div>
                              <span className="text-right font-[600] text-lg text-green-500 whitespace-nowrap">
                                <p className="h-5 w-24 bg-gray-400 rounded"></p>
                              </span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HotelOrderDetailPage;
