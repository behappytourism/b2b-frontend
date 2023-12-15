import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { successAnimation } from "../../../data";
import { useSelector } from "react-redux";
import priceConversion from "../../../utils/PriceConversion";
import axios from "../../../axios";
import formatDate from "../../../utils/formatDate";
import BtnLoader from "../../components/BtnLoader";

function HotelSuccessPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hotelSingleOrder, setHotelSingleOrder] = useState({});
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [voucherLoading, setVoucherLoading] = useState(false);

  // const { hotelSingleOrder } = useSelector((state) => state.visa);
  const { token, agent } = useSelector((state) => state.agents);
  const { selectedCurrency } = useSelector((state) => state.home);

  // if(!hotelSingleOrder) {
  //   navigate('/b2b')
  // }
  const [adultLength, setAdultLength] = useState(1);
  const [childLength, setChildLength] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);

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
      }
    } catch (err) {
      console.log(err);
      // throw Error("Cant find Order Detail");
    }
  };

  useEffect(() => {
    fetchSingleHotelOrder();
  }, []);

  useEffect(() => {
    const val = hotelSingleOrder?.rooms?.reduce((acc, item) => {
      return acc + item?.noOfAdults;
    }, 0);
    setAdultLength(val);
    const childVal = hotelSingleOrder?.rooms?.reduce((acc, item) => {
      return acc + item?.noOfChildren;
    }, 0);
    setChildLength(childVal);
    hotelSingleOrder?.rooms?.filter((item) => {
      setChildrenAges([...item?.childrenAges]);
      return null;
    });
  }, [hotelSingleOrder?.rooms]);

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

  return (
    <div className=" ">
      <div className="p-2">
        <div className=" mt-2 ">
          <div className="main__section mt-4">
            <div className="flex justify-center">
              <div className="">
                <span className="flex justify-center">
                  <div className=" w-[250px] ">
                    <Lottie animationData={successAnimation} />
                  </div>
                </span>
                <div className="text-center">
                  <h2 className="text-[25px] text-[#12acfd] font-[650]">
                    You have Successfully Booked Hotel!
                  </h2>
                  <p className=" text-[#12acfd] font-[500]">
                    The booking will be processed and you will receive the
                    details of hotel confirmation number soon.
                  </p>
                </div>
              </div>
            </div>
            {hotelSingleOrder?.status === "confirmed" && !isLoading ? (
              <div className="flex justify-center pt-10">
                <button
                  onClick={() => handleDownloadVoucher(hotelSingleOrder)}
                  disabled={voucherLoading}
                  className="px-10 h-8 text-white text-xs font-[500] bg-blue-300 rounded-sm shadow-mn"
                >
                  {voucherLoading ? <BtnLoader /> : " Download Voucher"}
                </button>
              </div>
            ) : (
              <></>
            )}

            {!isLoading ? (
              <div className="flex justify-center w-full mt-5">
                <div className="first__section  w-full">
                  <div className="bg-white shadow-round m-6 rounded-[0.30rem] p-6 w-full sm:w-11/12 md:w-9/12 lg:w-6/12 mx-auto ">
                    <div className="text-center">
                      <h2 className="text-lg font-[700] text-darktext">
                        {agent?.companyName}
                      </h2>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm text-gray-500 font-[600]">
                          {/* {hotelSingleOrder?.createdAt.slice(0, 10)} */}
                        </p>
                        <div className="flex gap-2 items-center">
                          <p className="text-gray-400 font-[800]">
                            {priceConversion(
                              hotelSingleOrder?.netPrice,
                              selectedCurrency,
                              true
                            )}
                          </p>
                          <span className="text-xs bg-green-200 px-2 rounded text-green-600 py-[2px]">
                            Success
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-[400] text-grayColor">
                          {hotelSingleOrder?.referenceNumber}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-100 my-2 rounded-[.30rem] p-3">
                      <div>
                        <div className=" mt-2">
                          <div className="grid__first space-y-1">
                            <p className="text-sm font-[800] text-darktext">
                              {hotelSingleOrder?.hotel?.hotelName}
                            </p>
                            <p className="text-xs text-grayColor capitalize">
                              {hotelSingleOrder?.hotel?.address}
                            </p>
                            <p className="text-xs text-[#12acfd] uppercase">
                              {formatDate(hotelSingleOrder?.createdAt)}
                            </p>

                            <table className="w-full text-[15px]">
                              <tbody>
                                <tr className="odd:bg-[#f3f6f9]">
                                  <td className="p-2 text-[13px] font-[300]">
                                    Check In Date
                                  </td>
                                  <td className="p-2 text-[13px] font-[300]">
                                    {formatDate(hotelSingleOrder?.fromDate)}
                                  </td>
                                </tr>
                                <tr className="odd:bg-[#f3f6f9]">
                                  <td className="p-2 text-[13px] font-[300]">
                                    Check Out Date
                                  </td>
                                  <td className="p-2 text-[13px] font-[300]">
                                    {formatDate(hotelSingleOrder?.toDate)}
                                  </td>
                                </tr>
                                <tr className="odd:bg-[#f3f6f9]">
                                  <td className="p-2 text-[13px] font-[300]">
                                    Total length of stay:
                                  </td>
                                  <td className="p-2 text-[13px] font-[300]">
                                    {hotelSingleOrder?.noOfNights} Nights &{" "}
                                    {Number(hotelSingleOrder?.noOfNights) + 1}{" "}
                                    Days{" "}
                                  </td>
                                </tr>
                                <tr className="odd:bg-[#f3f6f9]">
                                  <td className="p-2 text-[13px] font-[300]">
                                    No of rooms:
                                  </td>
                                  <td className="p-2 text-[13px] font-[300]">
                                    {hotelSingleOrder?.rooms?.length +
                                      " Room" || "1 Room"}
                                  </td>
                                </tr>
                                <tr className="odd:bg-[#f3f6f9]">
                                  <td className="p-2 text-[13px] font-[300]">
                                    Paxes:
                                  </td>
                                  <td className="p-2 text-[13px] font-[300]">
                                    {adultLength} Adults & {childLength}{" "}
                                    Children
                                  </td>
                                </tr>
                                {Number(childLength) > 0 ? (
                                  <tr className="odd:bg-[#f3f6f9]">
                                    <td className="p-2 text-[13px] font-[300]">
                                      Children ages:
                                    </td>
                                    <td className="p-2 text-[13px] font-[300]">
                                      <div className="flex gap-2">
                                        {childrenAges?.map((item, ind) => (
                                          <p key={ind} className="text-sm">
                                            {item}{" "}
                                            {ind == childrenAges?.length - 1
                                              ? ""
                                              : ","}
                                          </p>
                                        ))}
                                      </div>
                                    </td>
                                  </tr>
                                ) : (
                                  ""
                                )}
                                <tr className="odd:bg-[#f3f6f9]">
                                  <td className="p-2 text-[13px] font-[300]">
                                    Room Type
                                  </td>
                                  <td className="p-2 text-[13px] font-[300]">
                                    {hotelSingleOrder?.roomType?.roomName}
                                  </td>
                                </tr>
                                <tr className="odd:bg-[#f3f6f9]">
                                  <td className="p-2 text-[13px] font-[300]">
                                    Board Type
                                  </td>
                                  <td className="p-2 text-[13px] font-[300]">
                                    {hotelSingleOrder?.boardType?.boardName +
                                      `(${hotelSingleOrder?.boardType?.boardShortName})`}
                                  </td>
                                </tr>
                                <tr className="odd:bg-[#f3f6f9]">
                                  <td className="p-2 text-[13px] font-[300]">
                                    Special Request
                                  </td>
                                  <td className="p-2 text-[13px] font-[300]">
                                    {hotelSingleOrder?.specialRequest
                                      ? hotelSingleOrder?.specialRequest
                                      : "N/A"}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="py-3 mt-3 space-y-2 border-y">
                          <div className=" flex justify-between text-gray-400">
                            <div className="grid__first col-span-7 flex gap-2">
                              <div className="">
                                <p className="text-[13px] font-[300]   ">
                                  Contact Number
                                </p>
                              </div>
                            </div>
                            <div className="grid__first col-span-5 flex justify-end items-start">
                              <p className="text-[14px]  font-[700]">
                                {`${hotelSingleOrder?.contactDetails?.country?.phonecode}` +
                                  `${hotelSingleOrder?.contactDetails?.phoneNumber}`}
                              </p>
                            </div>
                          </div>
                          <div className=" flex justify-between text-gray-400">
                            <div className="grid__first col-span-7 flex gap-2">
                              <div className="">
                                <p className="text-[13px] font-[300]">
                                  Email Address
                                </p>
                              </div>
                            </div>
                            <div className="grid__first col-span-5 flex justify-end items-start">
                              <p className="text-[14px]  font-[700]">
                                {hotelSingleOrder?.contactDetails?.email}
                              </p>
                            </div>
                          </div>
                        </div>
                        <table className="w-full">
                          <tbody>
                            <tr>
                              <td colSpan={2} className="p-3">
                                <p className="text-gray-400 font-[800] text-sm ">
                                  Guest Details
                                </p>
                              </td>
                            </tr>
                            {hotelSingleOrder?.travellerDetails?.map(
                              (item, index) => (
                                <tr
                                  key={index}
                                  className="w-full odd:bg-[#f3f6f9]"
                                >
                                  <td className="p-3">
                                    <div className="">
                                      <p className="text-[13px]  ">
                                        Guest {index + 1}
                                      </p>
                                    </div>
                                  </td>
                                  <td className="text-right p-3">
                                    <p className="text-[13px]   capitalize">
                                      {item?.title +
                                        " " +
                                        item?.firstName +
                                        " " +
                                        item?.lastName}
                                    </p>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>

                      <div className="grid grid-cols-12 py-3">
                        <div className="grid__first col-span-7">
                          <p className="text-[16px] font-[650] text-gray-400">
                            Grand Total
                          </p>
                        </div>
                        <div className="grid__first col-span-5 flex justify-end items-end">
                          <div>
                            <p className="text-[16px] text-right font-[800] text-gray-400">
                              {priceConversion(
                                hotelSingleOrder?.netPrice,
                                selectedCurrency,
                                true
                              )}
                            </p>
                            <p className="text-[12px] text-grayColor">
                              Total Price inclusive of VAT*
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center w-full mt-5 ">
                <div className="first__section  w-full">
                  <div className="bg-white  shadow-round m-6 rounded-[0.30rem] p-6 w-full sm:w-11/12 md:w-9/12 lg:w-6/12 mx-auto ">
                    <div className="animate-pulse">
                      <div className="flex justify-center ">
                        <h2 className="h-6 bg-gray-400 w-60 rounded"></h2>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-sm text-gray-500 font-[600]"></p>
                          <div className="flex gap-2 items-center">
                            <p className="h-6 bg-gray-400 w-16 rounded"></p>
                            <span className="text-xs bg-green-200 px-2 rounded text-green-600 py-[2px]">
                              Success
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="h-6 bg-gray-300 w-52 rounded"></p>
                        </div>
                      </div>
                      <div className="bg-gray-100 my-2 rounded-[.30rem] p-3">
                        <div>
                          <div className=" mt-2">
                            <div className="grid__first space-y-1">
                              <p className="h-5 bg-gray-300 w-52 rounded"></p>
                              <p className="h-4 bg-gray-200 w-40 rounded"></p>
                              <p className="h-4 bg-gray-200 w-36 rounded"></p>

                              <table className="w-full text-[15px]">
                                <tbody>
                                  <tr className="odd:bg-[#f3f6f9] font-[300] text-[13px]">
                                    <td className="p-2 ">Check In Date</td>
                                    <td className="p-2 ">
                                      <p className="h-4 bg-gray-200 w-36 rounded"></p>
                                    </td>
                                  </tr>
                                  <tr className="odd:bg-[#f3f6f9] font-[300] text-[13px]">
                                    <td className="p-2 ">Check Out Date</td>
                                    <td className="p-2 ">
                                      <p className="h-4 bg-gray-200 w-44 rounded"></p>
                                    </td>
                                  </tr>
                                  <tr className="odd:bg-[#f3f6f9] font-[300] text-[13px]">
                                    <td className="p-2 ">Room Type</td>
                                    <td className="p-2 ">
                                      <p className="h-4 bg-gray-200 w-40 rounded"></p>
                                    </td>
                                  </tr>
                                  <tr className="odd:bg-[#f3f6f9] font-[300] text-[13px]">
                                    <td className="p-2 ">Base Plan</td>
                                    <td className="p-2 ">
                                      <p className="h-4 bg-gray-200 w-24 rounded"></p>
                                    </td>
                                  </tr>
                                  <tr className="odd:bg-[#f3f6f9] font-[300] text-[13px]">
                                    <td className="p-2 text-[13px] font-[300]">
                                      Special Request
                                    </td>
                                    <td className="p-2 text-[13px] font-[300]">
                                      <p className="h-4 bg-gray-200 w-36 rounded"></p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="py-3 mt-3 space-y-2 border-y">
                            <div className=" flex justify-between text-gray-400">
                              <div className="grid__first col-span-7 flex gap-2">
                                <div className="">
                                  <p className="text-[13px] font-[300]   ">
                                    Contact Number
                                  </p>
                                </div>
                              </div>
                              <div className="grid__first col-span-5 flex justify-end items-start">
                                <p className="h-4 bg-gray-300 w-36 rounded"></p>
                              </div>
                            </div>
                            <div className=" flex justify-between text-gray-400">
                              <div className="grid__first col-span-7 flex gap-2">
                                <div className="">
                                  <p className="text-[13px] font-[300]">
                                    Email Address
                                  </p>
                                </div>
                              </div>
                              <div className="grid__first col-span-5 flex justify-end items-start">
                                <p className="h-4 bg-gray-300 w-44 rounded"></p>
                              </div>
                            </div>
                          </div>
                          <table className="w-full">
                            <tbody>
                              <tr>
                                <td colSpan={2} className="p-3">
                                  <p className="text-gray-400 font-[800] text-sm ">
                                    Guest Details
                                  </p>
                                </td>
                              </tr>

                              <tr className="w-full odd:bg-[#f3f6f9]">
                                <td className="p-3">
                                  <div className="">
                                    <p className="text-[13px]  ">Guest 1</p>
                                  </div>
                                </td>
                                <td className="text-right p-3">
                                  <p className="h-4 bg-gray-200 w-36 rounded"></p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="grid grid-cols-12 py-3">
                          <div className="grid__first col-span-7">
                            <p className="text-[16px] font-[650] text-gray-400">
                              Grand Total
                            </p>
                          </div>
                          <div className="grid__first col-span-5 flex justify-end items-end">
                            <div>
                              <p className="h-5 bg-gray-400 w-16 rounded"></p>
                              <p className="text-[12px] text-grayColor">
                                Total Price inclusive of VAT*
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="second__section mx-auto w-full sm:w-11/12 md:w-9/12 lg:w-6/12">
              <div className="py-4 flex justify-between">
                <div className="text-gray-400 text-sm">
                  <p className="">
                    Your Hotel booking is done successfully. Further details are
                    given in your corresponding email
                  </p>
                  <p className="text-[#12acfd]">
                    Download the invoice from here!
                  </p>
                </div>

                <div className="">
                  {hotelSingleOrder?.status !== "pending" && !isLoading ? (
                    <button
                      onClick={() => handleDownloadInvoice(hotelSingleOrder)}
                      disabled={invoiceLoading}
                      className="bg-[#12acfd] text-xs tracking-wide rounded px-3 h-8 shadow-mn text-white"
                    >
                      {invoiceLoading ? <BtnLoader /> : "Download"}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="flex justify-center py-10">
                <button
                  className="text-light bg-darktext px-4 h-8 shadow-mn text-xs font-[700] tracking-wide rounded"
                  onClick={() =>
                    navigate(`/hotel/order/${hotelSingleOrder._id}/details`)
                  }
                >
                  View Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelSuccessPage;
