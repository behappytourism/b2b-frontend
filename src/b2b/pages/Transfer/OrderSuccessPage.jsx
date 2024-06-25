import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import successAnimations from "./animation_success.json";
import axios from "../../../axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import priceConversion from "../../../utils/PriceConversion";
import { config } from "../../../constants";
import moment from "moment";
import { BsCart2, BsDownload } from "react-icons/bs";
import { BiLeftArrow, BiTransfer } from "react-icons/bi";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BtnLoader } from "../../components";
import { clearCartItemsAfterPurchase } from "../../../redux/slices/transferSlice";
import { emptyCart } from "../../../redux/slices/agentExcursionSlice";
import { MdOutlinePayment } from "react-icons/md";
import { FaPrint } from "react-icons/fa";


function OrderSuccessPage() {
  const params = useParams();

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderDetails, setOrderDetails] = useState({});
  const [invoiceLoading, setInvoiceLoading] = useState(false)

  const { token } = useSelector((state) => state.agents);
  const { selectedCurrency } = useSelector((state) => state.home);

  const navigate = useNavigate()

  const fetchOrderDetails = async () => {
    try {
      setError("");
      setIsLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `/b2b/orders/single/${params?.id}`,
        config
      );
      setOrderDetails(response?.data);
      setIsLoading(false);
      dispatch(emptyCart())
      dispatch(clearCartItemsAfterPurchase())

      
    } catch (error) {
      setIsLoading(false);
      setError(error?.response?.data?.error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [params?.id]);

  const handleDownloadAllTicket = async (id) => {
    try {
        const response = await axios.get(`/b2b/attractions/orders/${orderDetails?.attractionOrder?._id}/ticket/${id}`, 
        {
            headers: { Authorization: `Bearer ${token}`},
            responseType: "arraybuffer"
        })
        const blob = new Blob([response.data], {
            type: "application/pdf"
        })
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob)
        link.download = "tickets.pdf";
        link.click()
    } catch (error) {
        console.log(error);
    }
   }

   const handleDownloadInvoice = async () => {
    try {
        setInvoiceLoading(true)
        const pdfBuffer = await axios.get(
            `/b2b/orders/invoice/${params.id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
                responseType: "arraybuffer"
            }
        )
        const blob = new Blob([pdfBuffer?.data], {
            type: "application/pdf"
        })
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob)
        link.download = "invoice.pdf";
        document.body.appendChild(link)
        link.click()

        setInvoiceLoading(false)
    } catch (error) {
        console.log(error);
        setInvoiceLoading(false)
    }
  
}

  const renderAttractionSection = () => {
    return (
      <>
        {orderDetails?.attractionOrder &&
        orderDetails?.attractionOrder?.activities?.length ? (
          <>
            <hr />
            <div className="my-4 px-4 space-y-5">
              <h3 className="text-xl tracking-wide  font-bold text-gray-800">
                Attractions
              </h3>
              {orderDetails?.attractionOrder?.activities?.map((attr) => (
                <div className="grid grid-cols-12 gap-3 md:gap-6 py-3">
                  {/* Image and detail */}
                  {/* {console.log(orderDetails?.attractionOrder)} */}
                  <div className="col-span-7 space-y-1">
                    <div className="flex gap-3 ">
                      <img
                        src={
                          attr?.activity?.attraction?.images?.length
                            ? config.SERVER_URL +
                              attr?.activity?.attraction?.images[0]
                            : ""
                        }
                        alt="attr"
                        className="object-cover w-5/12 h-28 rounded-lg overflow-hidden"
                      />
                      <div className="detail__section flex-1 divide-y">
                        <div className="flex justify-between py-2">
                          <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                            Status
                          </h4>
                          <p className="text-textColor text-sm capitalize ">
                            {orderDetails?.attractionOrder?.orderStatus}{" "}
                          </p>
                        </div>
                        <div className="flex justify-between py-2">
                          <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                            Payment
                          </h4>
                          <p className="text-textColor text-sm capitalize ">
                            {orderDetails?.attractionOrder?.paymentState}{" "}
                          </p>
                        </div>
                        <div className="flex justify-between py-2">
                          <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                            Total
                          </h4>
                          <p className="text-BEColor font-bold  ">
                            {priceConversion(
                              attr?.grandTotal,
                              selectedCurrency,
                              true
                            )}{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="font-semibold tracking-tight font-demo px-1">
                      {attr?.activity?.name}
                      <span className="capitalize">
                        {attr?.activity?.attraction?.destination?.name
                          ? ", " + attr?.activity?.attraction?.destination?.name
                          : ""}
                      </span>
                    </p>
                    <p className=" tracking-tight font-demo px-1">
                      {moment(attr?.date).format("dddd, MMMM Do YYYY")}{" "}
                    </p>
                  </div>
                  {/* Paxes and user details */}
                  <div className="col-span-5 divide-y">
                    <div className="flex justify-between py-2">
                      <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                        Adult count
                      </h4>
                      <p className=" text-textColor text-sm capitalize ">
                        {attr?.adultsCount}{" "}
                      </p>
                    </div>
                    <div className="flex justify-between py-2">
                      <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                        Child count
                      </h4>
                      <p className=" text-textColor text-sm capitalize ">
                        {attr?.childrenCount}{" "}
                      </p>
                    </div>
                    {attr?.hoursCount > 0 && (
                    <div className="flex justify-between py-2">
                      <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                        Hours count
                      </h4>
                      <p className=" text-textColor text-sm capitalize ">
                        {attr?.hoursCount}{" "}
                      </p>
                    </div>
                    )}
{attr?.privateTransfers?.length > 0 && (
  <>
  
<div className="flex justify-between py-2">
                      <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                        Vehicle Name
                      </h4>
                      {attr?.privateTransfers?.map((pvtTrans, pvtTransIndex) => (
                      <div>
                      <p className=" text-textColor text-sm capitalize ">
                        {pvtTrans?.name}{" "}
                      </p>
                      </div>
                      ))}
                    </div>

                    <div className="flex justify-between py-2">
                      <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                        Vehicle count
                      </h4>
                      {attr?.privateTransfers?.map((pvtTrans, pvtTransIndex) => (
                      <div>
                      <p className=" text-textColor text-sm capitalize ">
                        {pvtTrans?.count}{" "}
                      </p>
                      </div>
                      ))}
                    </div>
                    </>
)}

                    {orderDetails?.attractionOrder?.orderStatus === "completed" | "booked" && (
                    <div className="flex justify-between py-2">
                      <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                        Ticket
                      </h4>
                      <p className=" text-textColor text-xl capitalize cursor-pointer"
                      onClick={()=>{
                        handleDownloadAllTicket(attr._id)
                      }}
                      >
                        <BsDownload />
                      </p>
                    </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </>
    );
  };

  const renderTransferSection = () => {
    return (
      <>
        {orderDetails?.transferOrder &&
        orderDetails?.transferOrder?.journey?.length ? (
          <>
            <hr />
            <div className="my-4 px-4 space-y-5">
              <h3 className="text-xl tracking-wide  font-bold text-gray-800">
                Transfers
              </h3>
              <div className="divide-y ">
                {orderDetails?.transferOrder?.journey?.map((jrn) => (
                  <div className="py-3">
                    <div className=" flex justify-between">
                      <div>
                        {jrn?.trips?.map((trp, ind) => {
                          if (ind === 0) {
                            return (
                              <p className="font-semibold tracking-tight font-demo px-1 flex items-center gap-2">
                                {trp?.transferFrom?.airportName ||
                                  trp?.transferFrom?.areaName}
                                <span className="capitalize">
                                  {jrn?.transferType === "return" ? (
                                    <h1 className="text-lg">
                                      <BiTransfer />
                                    </h1>
                                  ) : (
                                    <h1>
                                      <IoMdArrowRoundForward />
                                    </h1>
                                  )}
                                </span>
                                {trp?.transferTo?.airportName ||
                                  trp?.transferTo?.areaName}
                              </p>
                            );
                          }
                        })}

                        <p className=" tracking-tight font-demo px-1 capitalize text-BEColor font-semibold">
                          {jrn?.transferType}{" "}
                        </p>
                      </div>
                      <div className="">
                        <div className="">
                          <div className="uppercase text-sm font-bold text-white bg-BEColor rounded flex justify-center px-4 py-2 ">
                            {priceConversion(
                              jrn?.netPrice,
                              selectedCurrency,
                              true
                            )}{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="divide-y divide-dashed">
                      {jrn?.trips?.map((trp) => (
                        <div className="grid grid-cols-12 gap-3 md:gap-6 py-3">
                          <div className="col-span-6 space-y-2 px-1">
                            <div className="detail__section flex-1  ">
                              <div className="py-2">
                                <p className="font-thin tracking-tight text-sm  flex items-center gap-2 ">
                                  {trp?.transferFrom?.airportName ||
                                    trp?.transferFrom?.areaName}
                                  <span className="capitalize">
                                    <span>
                                      <IoMdArrowRoundForward />
                                    </span>
                                  </span>
                                  {trp?.transferTo?.airportName ||
                                    trp?.transferTo?.areaName}
                                </p>
                                <p className=" tracking-tight font-demo text-sm ">
                                  {moment(trp?.pickupDate).format(
                                    "dddd, MMMM Do YYYY"
                                  )}{" "}
                                </p>
                                <p className=" tracking-tight font-demo text-sm ">
                                  {"Time - " + trp?.pickupTime}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                              <h4 className=" tracking-wide text-gray-400 text-sm">
                                Pax
                              </h4>
                              <span className="flex-1 border-b border-dashed " />
                              <p className=" text-textColor text-sm capitalize ">
                                <span className="">
                                  {jrn?.noOfAdults + " Adult"}
                                </span>
                                {jrn?.noOfChildren > 0 ? (
                                  <span className="">
                                    {jrn?.noOfChildren + " Child"}
                                  </span>
                                ) : (
                                  ""
                                )}
                              </p>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                              <h4 className=" tracking-wide text-gray-400 text-sm">
                                Trip Price
                              </h4>
                              <span className="flex-1 border-b border-dashed " />
                              <p className=" text-textColor text-sm capitalize ">
                                {priceConversion(
                                  trp?.tripPrice,
                                  selectedCurrency,
                                  true
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="col-span-6 px-2">
                            <h3 className="font-demo text-sm font-semibold text-gray-600">
                              Vehicles
                            </h3>
                            <div className="py-2 space-y-2">
                              {trp?.vehicleTypes?.map((vehicle) => {
                                return (
                                  <div className="flex justify-between items-center gap-2">
                                    <h4 className=" tracking-wide text-gray-400 text-sm">
                                      {vehicle?.name}
                                    </h4>
                                    <span className="flex-1 border-b border-dashed " />
                                    <p className=" text-textColor text-sm capitalize ">
                                      {vehicle?.count}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </>
    );
  };

  return (
    <>
     <div className="w-full p-2 flex justify-center">
        <div onClick={()=> navigate('/')} className=' cursor-pointer w-28 flex justify-center items-center'>
                                    <div>
                                        <div className='flex justify-center'>
                                        <h1 className='text-xl text-center'><BiLeftArrow /></h1>
                                        </div>
                                        <h1 className='text-xs text-center font-light'>Back</h1>
                                    </div>
                                </div>
                                <div className='pt-10'>
                                <div className=' w-[240px]'></div>
                                </div>
            <div className='hidden md:flex justify-between bg-white p-5 w-fit rounded-lg '>
                        <div className='flex justify-evenly'>        
                                <div className={` border-2 border-[#01b2bd]  bg-[#01b2bd] rounded-lg w-28 p-4 flex justify-center items-center`}>
                                    <div>
                                        <div className='flex justify-center'>
                                        <h1 className='text-xl text-center'><BsCart2 color="white" /></h1>
                                        </div>
                                        <h1 className='text-xs text-center font-light text-white'>Add To Cart</h1>
                                    </div>
                                </div>
                                <div className='pt-10 '>
                                <div className={`border-t w-32 border-[#01b2bd] `}></div>
                                </div>
                                <div className='border-2 border-[#01b2bd]  bg-[#01b2bd]  rounded-lg w-28 p-4 flex justify-center items-center'>
                                    <div>
                                        <div className='flex justify-center'>
                                        <h1 className='text-xl text-center'><MdOutlinePayment color="white"  /></h1>
                                        </div>
                                        <h1 className='text-xs text-center font-light text-white'>Payment</h1>
                                    </div>
                                </div>
                                <div className='pt-10'>
                                <div className='border-t w-32 border-[#01b2bd]'></div>
                                </div>
                                <div className='border-2 border-[#01b2bd]  bg-[#01b2bd]  rounded-lg w-28 p-4 flex justify-center items-center'>
                                    <div>
                                        <div className='flex justify-center'>
                                        <h1 className='text-xl text-center'><FaPrint color="white"  /></h1>
                                        </div>
                                        <h1 className='text-xs text-center font-light text-white'>Print </h1>
                                    </div>
                                </div>
                        </div>
                    </div>
        </div>

    <div className="flex justify-center p-10 max-w-screen-lg mx-auto ">
      <div className="w-full rounded-2xl border p-10 bg-gradient-to-br from-BEColor/10 to-gray-50 shadow-round">
        <div className="mb-7 ">
          <h1 className="text-center text-2xl underline underline-offset-8  md:text-4xl font-bold text-BEColor  ">
            You have Ordered Successfully!
          </h1>
        </div>
        <div className="flex justify-end">
          <button className="bg-green-400 rounded h-7 text-white w-24"
          onClick={()=>{
            handleDownloadInvoice()
          }}
          >{invoiceLoading ? <BtnLoader/> : "Invoice"}</button>
        </div>
        <div className="md:flex justify-between gap-4  px-4  py-5">
          <div className="md:order-2">
            <Lottie animationData={successAnimations} />
          </div>
          {isLoading ? (
            LoadingComponent()
          ) : (
            <div className="md:order-1 space-y-3 md:text-lg">
              <div className="flex gap-5 flex-wrap">
                <div className="space-y-1">
                  <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                    Order Status
                  </h4>
                  <div className="uppercase text-xs font-semibold text-white bg-BEColor rounded flex justify-center px-4 py-2 ">
                    {orderDetails?.orderStatus}{" "}
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                    Payment State
                  </h4>
                  <div className="uppercase text-xs font-semibold text-white bg-BEColor rounded flex justify-center px-4 py-2 ">
                    {orderDetails?.paymentState}{" "}
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                  Reference Number
                </h4>
                <p className="text-textColor uppercase">
                  {orderDetails?.referenceNumber}{" "}
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                  Name
                </h4>
                <p className="text-textColor uppercase">
                  {orderDetails?.name}{" "}
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                  Email
                </h4>
                <p className="text-textColor ">{orderDetails?.email} </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                  Phone Number
                </h4>
                <p className="text-textColor ">{orderDetails?.phoneNumber} </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                  Agent Reference Number
                </h4>
                <p className="text-textColor ">
                  {orderDetails?.agentReferenceNumber}{" "}
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                  price
                </h4>
                <p className="text-textColor font-bold text-xl">
                  {priceConversion(
                    orderDetails?.netPrice,
                    selectedCurrency,
                    true
                  )}{" "}
                </p>
              </div>
            </div>
          )}
        </div>

        {renderAttractionSection()}
        {renderTransferSection()}
        <div className="flex justify-end">
            <button className="text-white font-medium w-40 h-8 border bg-BEColor rounded"
            onClick={()=>{
              navigate(`/order/details/${params?.id}`)
            }}
            >Booking Details</button>
        </div>
      </div>
      
    </div>
    </>
  );
}

export default OrderSuccessPage;

function LoadingComponent() {
  return (
    <div className="md:order-1 space-y-3 md:text-lg">
      <div className="flex gap-5 flex-wrap">
        <div className="space-y-1">
          <h4 className="font-bold tracking-wide text-gray-400 text-sm">
            Order Status
          </h4>
          <div className="bg-gray-300 rounded animate-pulse h-4 w-36" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold tracking-wide text-gray-400 text-sm">
            Payment State
          </h4>
          <div className="bg-gray-300 rounded animate-pulse h-4 w-36" />
        </div>
      </div>
      <div className="space-y-1">
        <h4 className="font-bold tracking-wide text-gray-400 text-sm">
          Reference Number
        </h4>
        <div className="bg-gray-300 rounded animate-pulse h-4 w-36" />
      </div>
      <div className="space-y-1">
        <h4 className="font-bold tracking-wide text-gray-400 text-sm">Name</h4>
        <div className="bg-gray-300 rounded animate-pulse h-4 w-36" />
      </div>
      <div className="space-y-1">
        <h4 className="font-bold tracking-wide text-gray-400 text-sm">Email</h4>
        <div className="bg-gray-300 rounded animate-pulse h-4 w-36" />
      </div>
      <div className="space-y-1">
        <h4 className="font-bold tracking-wide text-gray-400 text-sm">
          Phone Number
        </h4>
        <div className="bg-gray-300 rounded animate-pulse h-4 w-36" />
      </div>
      <div className="space-y-1">
        <h4 className="font-bold tracking-wide text-gray-400 text-sm">
          Agent Reference Number
        </h4>
        <div className="bg-gray-300 rounded animate-pulse h-4 w-36" />
      </div>
      <div className="space-y-1">
        <h4 className="font-bold tracking-wide text-gray-400 text-sm">price</h4>
        <div className="bg-gray-300 rounded animate-pulse h-4 w-36" />
      </div>
    </div>
  );
}
