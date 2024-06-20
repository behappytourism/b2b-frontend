import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../axios";
import { useDispatch, useSelector } from "react-redux";
import { PageLoader } from "../../components";
import ShowAttractionDetails from "./ShowAttractionDetails";
import ShowTransferDetails from "./ShowTransferDetails";
import { BtnLoader } from "../../components";
import {
  setAlertError,
  setAlertSuccess,
} from "../../../redux/slices/homeSlice";
import { Checkbox } from "@material-tailwind/react";

function ViewSigleDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.agents);

  const [orderDetails, setOrderDetails] = useState();
  const [orderAttractionDetails, setOrderAttractionDetails] = useState({});
  const [orderTransferDetails, setOrderTransferDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [cancellationRemark, setCancellationRemark] = useState("");
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelTransferActivityId, setCancelTransferActivityId] = useState([]);
  const [cancelAttractionActivityId, setCancelAttractionActivityId] = useState(
    []
  );
  const [cancel, setCancel] = useState(false);

  const fetchSingleOrderDetails = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/b2b/orders/single/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrderDetails(res?.data);
      if (res?.data?.attractionOrder) {
        setOrderAttractionDetails(res?.data?.attractionOrder);
      }
      if (res?.data?.transferOrder) {
        setOrderTransferDetails(res?.data?.transferOrder);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleOrderDetails();
  }, []);

  const handleDownloadInvoice = async () => {
    try {
      setInvoiceLoading(true);
      const pdfBuffer = await axios.get(`/b2b/orders/invoice/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "arraybuffer",
      });
      const blob = new Blob([pdfBuffer?.data], {
        type: "application/pdf",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "invoice.pdf";
      document.body.appendChild(link);
      link.click();

      setInvoiceLoading(false);
    } catch (error) {
      console.log(error);
      setInvoiceLoading(false);
    }
  };

  const handleCancel = () => {
    // setCancelModal(true)
    setCancel(true);
    // setCancelTransferActivityId(ele?._id)
  };

  const handleCancelRemark = () => {
    setCancelModal(true);
    //setCancel(true);
    // setCancelTransferActivityId(ele?._id)
  };

  // const handleCancelAttractionProcess = (ele) => {
  //   setCancelModal(true)
  //   setCancelAttractionActivityId(ele?._id)
  // }

  const handleOrderCancellation = async (ele) => {
    setIsLoading(true)
    const body = {
      orderId: `${params.id}`,
      attractionCancellations: cancelAttractionActivityId,
      transferCancellations: cancelTransferActivityId,
      cancellationRemark: cancellationRemark,
    };
    try {
      const res = await axios.patch(`/b2b/orders/cancel`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(res?.data);

      dispatch(
        setAlertSuccess({
          status: true,
          title: "Order Cancellation (in process)",
          text: `${res?.data?.message}`,
        })
      );

      setCancelAttractionActivityId([])
      setCancelTransferActivityId([])
      setCancelModal(false)
      setCancel(false)
      setIsLoading(false)
    } catch (error) {
      dispatch(
        setAlertError({
          status: true,
          title: "Order Cancellation Request",
          text: `${error?.response?.data?.error || error.message}`,
        })
      );
      setCancelAttractionActivityId([])
      setCancelTransferActivityId([])
      setCancelModal(false)
      setCancel(false)
      setIsLoading(false)
      console.log(error);
    }
  };

  function formatTime(dateTime) {
    const hours = new Date(dateTime).getHours().toString().padStart(2, "0");
    const minutes = new Date(dateTime).getMinutes().toString().padStart(2, "0");
    // const seconds = new Date(dateTime).getSeconds().toString().padStart(2, '0');

    const formattedTime = `${hours} : ${minutes} `;
    return formattedTime;
  }

  //console.log(cancelAttractionActivityId, cancelTransferActivityId);
  return (
    <div>
      <div className="py-5 px-5">
        {isLoading ? (
          <div className="py-20">
            <PageLoader />
          </div>
        ) : (
          <div>
            <div className="grid xl:flex gap-4 py-2 px-2">
              <div className="bg-white shadow-xl w-96 md:w-[580px] md:h-72 h-96 py-5 px-6">
                <div>
                  <h1 className="font-semibold text-lg">Details</h1>
                </div>
                <div className="pt-2">
                  <div className="flex md:grid md:grid-cols-2 gap-1 pt-1">
                    <h1 className="text-sm">Ref.Number : </h1>
                    <h1 className="text-sm">{orderDetails?.referenceNumber}</h1>
                  </div>
                  <div className="flex md:grid md:grid-cols-2 gap-1 pt-1">
                    <h1 className="text-sm">Booking Date : </h1>
                    <h1 className="text-sm">
                      {orderDetails?.createdAt?.slice(0, 10)}
                    </h1>
                  </div>
                  <div className="flex md:grid md:grid-cols-2 gap-1 pt-2">
                    <h1 className="text-sm">Booking Time : </h1>
                    <h1 className="text-sm">
                      {formatTime(orderDetails?.createdAt)}
                    </h1>
                  </div>
                  <div className="flex md:grid md:grid-cols-2 gap-1 pt-2">
                    <h1 className="text-sm">Order Status: </h1>
                    <h1 className="text-sm">{orderDetails?.orderStatus}</h1>
                  </div>
                  <div className="flex md:grid md:grid-cols-2 gap-1 pt-2">
                    <h1 className="text-sm">Payment Status: </h1>
                    <h1 className="text-sm">{orderDetails?.paymentState}</h1>
                  </div>
                  <div className="flex md:grid md:grid-cols-2 gap-1 pt-2">
                    <h1 className="text-sm">Name : </h1>
                    <h1 className="text-sm">{orderDetails?.name}</h1>
                  </div>
                  <div className="flex md:grid md:grid-cols-2 gap-1 pt-2">
                    <h1 className="text-sm">Email : </h1>
                    <h1 className="text-sm">{orderDetails?.email}</h1>
                  </div>
                  <div className="flex md:grid md:grid-cols-2 gap-1 pt-2">
                    <h1 className="text-sm">Phone Number : </h1>
                    <h1 className="text-sm">{orderDetails?.phoneNumber}</h1>
                  </div>
                </div>
              </div>
              <div className="py-5 px-5 bg-white shadow-xl w-96 md:w-full h-auto">
                {cancel === false && (
                  <div className="flex gap-5 justify-end">
                    <button
                      onClick={() => {
                        handleDownloadInvoice();
                      }}
                      className="bg-BEColor w-52 rounded-full text-white  h-8"
                    >
                      {invoiceLoading ? <BtnLoader /> : "Download Invoice"}
                    </button>

                    <button
                      onClick={() => handleCancel()}
                      className="bg-black w-52 rounded-full text-white  h-8"
                    >
                      Cancel Order
                    </button>
                  </div>
                )}

                {cancel === true && (
                  <div className="flex gap-5 justify-end">
                    <button
                      onClick={() => setCancel(false)}
                      className="bg-black w-52 rounded-full text-white  h-8"
                    >
                      Back
                    </button>
                    <button onClick={() => handleCancelRemark()} className="bg-BEColor w-52 rounded-full text-white  h-8">
                      Continue
                    </button>
                  </div>
                )}
                {orderAttractionDetails?.activities?.length > 0 && (
                  <>
                    <div>
                      <h1 className="text-lg font-bold">Attraction</h1>
                    </div>
                    <div className="p-5">
                      {orderAttractionDetails?.activities?.map((ele) => {
                        return (
                          <div className="pt-4 flex gap-3">
                            {cancel && (
                              <Checkbox
                                checked={cancelAttractionActivityId.includes(
                                  ele?._id
                                )}
                                onChange={() =>
                                  setCancelAttractionActivityId((prevState) =>
                                    prevState.includes(ele?._id)
                                      ? prevState.filter(
                                          (id) => id !== ele?._id
                                        )
                                      : [...prevState, ele?._id]
                                  )
                                }
                              />
                            )}
                            <ShowAttractionDetails
                              ele={ele}
                              orderAttractionDetails={orderAttractionDetails}
                              orderDetails={orderDetails}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {orderTransferDetails?.journey?.length && (
                  <>
                    <div>
                      <h1 className="text-lg font-bold">Transfer</h1>
                    </div>
                    <div className="p-5 w-full">
                      {orderTransferDetails?.journey?.map((ele, index) => {
                        console.log(ele);
                        return (
                          <div key={index} className="pt-4 flex gap-3">
                             {cancel && (
                              <Checkbox
                                checked={cancelTransferActivityId.includes(
                                  ele?._id
                                )}
                                onChange={() =>
                                  setCancelTransferActivityId((prevState) =>
                                    prevState.includes(ele?._id)
                                      ? prevState.filter(
                                          (id) => id !== ele?._id
                                        )
                                      : [...prevState, ele?._id]
                                  )
                                }
                              />
                            )}
                            <ShowTransferDetails ele={ele} />
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <>
        {cancelModal === true && (
          <div className="fixed w-full h-full z-50 left-0 top-0 backdrop-blur-sm bg-opacity-10 bg-black">
          <div className="w-full flex justify-center">
           <div className="min-w-[300px] max-w-[300px] bg-white shadow-sm rounded-lg p-4 shadow-black mt-[10%]">
            <p className="">Remark</p>
            <input onChange={(e) => setCancellationRemark(e?.target?.value)} type="text" className="border w-full rounded px-2 py-1 placeholder:text-gray-300" placeholder="cancellation remark" />
            <div className="flex w-full justify-end gap-5 mt-5">
            <button onClick={() => setCancelModal(false)}>Back</button>
            {isLoading ? <BtnLoader /> : <button onClick={() => handleOrderCancellation()}>Confirm</button>}
            </div>
           </div>
          </div>
          </div>
        )}
        </>
      </div>
    </div>
  );
}

export default ViewSigleDetails;
