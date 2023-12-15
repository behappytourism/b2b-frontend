import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { confirmTicket } from "../../../static/imagesB2B";
import { useSelector } from "react-redux";
import { PageLoader } from "../../components";
import formatDate from "../../../utils/formatDate";
import priceConversion from "../../../utils/PriceConversion";
import { FaFileDownload } from "react-icons/fa";

function A2AConfirmationPage() {
  const params = useParams();

  const [orders, setOrders] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useSelector((state) => state.agents);
  const { selectedCurrency } = useSelector((state) => state.home);

  const fetchOrder = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(`/b2b/a2a/orders/single/${params?.id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      setOrders(response?.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const handleDownloadAllTickets = async (ele) => {
    try {
      const pdfBuffer = await axios.get(
        `/b2b/a2a/orders/single/ticket/${params?.id}`,
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
        `/b2b/a2a/orders/ticket/${params?.id}/single/${ele?._id}`,
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
      link.setAttribute("download", `${ele?.firstName}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="p-2 lg:p-6">
      <div className=" bg-sky-600 rounded-3xl shadow-sm py-10">
        <div className="flex justify-center pb-10">
          <div className=" flex flex-col items-center space-y-2">
            <div className="w-[15rem]">
              <img
                src={confirmTicket}
                className="object-contain w-full h-full"
                alt="success"
              />
            </div>
            <div className="">
              <h4 className="text-4xl font-[600] text-white">
                Payment Successfull
              </h4>
            </div>
          </div>
        </div>

        {isLoading ? (
          <PageLoader />
        ) : (
          <>
            <div className="flex justify-center ">
              <button
                className="bg-transparent border-2 hover:border-white hover:text-white text-gray-200  rounded-lg px-5 py-2"
                onClick={() => handleDownloadAllTickets()}
              >
                Download Ticket
              </button>
            </div>
            <div className="flex justify-center pb-10 pt-5">
              <div className="space-y-2">
                {orders?.passengerDetails?.map((item) => (
                  <button
                    key={item?._id}
                    className=" flex gap-2 items-center text-white bg-gray-400 rounded py-1 px-10"
                    onClick={() => handleDownloadTicket(item)}
                  >
                    <p className="text-sm uppercase">{item?.ticketNo}</p>
                    <p className="text-green-500">
                      <FaFileDownload />
                    </p>
                  </button>
                ))}
              </div>
            </div>
            <div className="lg-w-full  xl:w-1/2 mx-auto bg-white rounded-2xl p-7 text-darktext">
              <div className="flex justify-between items-center text-gray-300  py-4 font-[500]">
                <p className="">
                  <span className="">Reference Number : </span>
                  <span className="">{orders?.referenceNumber}</span>
                </p>
                {/* <p className="">
                <span className="">OrderDate : </span>
                <span className="">15 February, 2023</span>
              </p> */}
              </div>

              {orders?.passengerDetails?.map((item, index) => (
                <div key={item?._id} className="grid grid-cols-2 py-2 border-t">
                  <div className=" text-darktext space-y-2">
                    <p className="grid grid-cols-2">
                      <span className="text-gray-300">Name : </span>
                      <span className="capitalize">
                        {item?.title +
                          " " +
                          item?.firstName +
                          " " +
                          item?.lastName}
                      </span>
                    </p>
                    <p className="grid grid-cols-2">
                      <span className="text-gray-300">Passport Number: </span>
                      <span className="">{item?.passportNo}</span>
                    </p>
                    {item?.reference && (
                      <p className="grid grid-cols-2">
                        <span className="text-gray-300">Reference :</span>
                        <span className="">{item?.reference}</span>
                      </p>
                    )}
                    {item?.isInfant && (
                      <>
                        <p className="text-gray-400 font-[600] text-sm">Infant</p>
                        <p className="grid grid-cols-2">
                          <span className="text-gray-300">Infant Name : </span>
                          <span className="capitalize">
                            {item?.infantDetails?.title +
                              " " +
                              item?.infantDetails?.firstName +
                              " " +
                              item?.infantDetails?.lastName}
                          </span>
                        </p>
                        <p className="grid grid-cols-2">
                          <span className="text-gray-300">
                            Infant Passport No:{" "}
                          </span>
                          <span className="">
                            {item?.infantDetails?.passportNo}
                          </span>
                        </p>
                      </>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300 ">Passenger {index + 1}</p>
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-2 py-2 border-t">
                <div className=" text-darktext">
                  <p className="text-gray-300 ">Markup</p>
                </div>
                <div className="text-right">
                  <p className="">
                    {priceConversion(orders?.markup, selectedCurrency, true)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 py-2 border-t">
                <div className=" text-darktext">
                  <p className="text-gray-300 ">Total</p>
                </div>
                <div className="text-right">
                  <p className="">
                    {orders?.passengerDetails
                      ? priceConversion(
                          orders?.passengerDetails[0]?.amount,
                          selectedCurrency,
                          true
                        )
                      : 0}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 py-2 border-t">
                <div className=" text-darktext">
                  <p className="text-gray-300  font-[700]">Grand Total</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-[700]">
                    {priceConversion(
                      orders?.totalAmount,
                      selectedCurrency,
                      true
                    )}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        <div className=""></div>
      </div>
    </section>
  );
}

export default A2AConfirmationPage;
