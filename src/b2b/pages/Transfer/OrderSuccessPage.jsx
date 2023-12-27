import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import successAnimations from "./animation_success.json";
import axios from "../../../axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import priceConversion from "../../../utils/PriceConversion";
import { config } from "../../../constants";
import moment from "moment";
import { BsDownload } from "react-icons/bs";

function OrderSuccessPage() {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderDetails, setOrderDetails] = useState({});

  const { token } = useSelector((state) => state.agents);
  const { selectedCurrency } = useSelector((state) => state.home);

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
    } catch (error) {
      setIsLoading(false);
      setError(error?.response?.data?.error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [params?.id]);
  //
  return (
    <div className="flex justify-center p-10 max-w-screen-lg mx-auto ">
      <div className="w-full rounded-2xl border p-10 bg-gradient-to-br from-BEColor/50 to-green-50 shadow-round">
        <div className="mb-7 ">
          <h1 className="text-center text-2xl underline underline-offset-8  md:text-4xl font-bold text-BEColor  ">
            You have Ordered Successfully!
          </h1>
        </div>
        <div className="md:flex justify-between gap-4  px-4  py-5">
          <div className="md:order-2">
            <Lottie animationData={successAnimations} />
          </div>
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
              <p className="text-textColor uppercase">{orderDetails?.name} </p>
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
        </div>
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
                            {orderDetails?.attractionOrder?.totalAmount}{" "}
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
                        Adult
                      </h4>
                      <p className=" text-textColor text-sm capitalize ">
                        {attr?.adultsCount}{" "}
                      </p>
                    </div>
                    <div className="flex justify-between py-2">
                      <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                        Child
                      </h4>
                      <p className=" text-textColor text-sm capitalize ">
                        {attr?.childrenCount}{" "}
                      </p>
                    </div>
                    <div className="flex justify-between py-2">
                      <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                        Infant
                      </h4>
                      <p className=" text-textColor text-sm capitalize ">
                        {attr?.infantCount}{" "}
                      </p>
                    </div>
                    <div className="flex justify-between py-2">
                      <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                        Ticket
                      </h4>
                      <p className=" text-textColor text-xl capitalize ">
                        <BsDownload />
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          ""
        )}

        {/* {orderDetails?.transferOrder &&
        orderDetails?.transferOrder?.journey?.length ? (
          <>
            <hr />
            <div className="my-4 px-4 space-y-5">
              <h3 className="text-xl tracking-wide  font-bold text-gray-800">
                Transfers
              </h3>
              {orderDetails?.transferOrder?.journey?.map((jrn) => (
                <div className="grid grid-cols-12 gap-3 md:gap-6 py-3">
                  <div className="col-span-6 space-y-1">
                    <div className=" ">
                      <p className="font-semibold tracking-tight font-demo px-1">
                        {jrn?.trips?.transferFrom?.airportName}
                        <span className="capitalize">
                          {jrn?.trips?.attraction?.destination?.name
                            ? ", " + jrn?.trips?.attraction?.destination?.name
                            : ""}
                        </span>
                      </p>
                      <p className=" tracking-tight font-demo px-1">
                        {moment(jrn?.date).format("dddd, MMMM Do YYYY")}{" "}
                      </p>
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
                            {orderDetails?.attractionOrder?.totalAmount}{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-5 divide-y">
                    <div className="flex justify-between py-2">
                      <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                        Adult
                      </h4>
                      <p className=" text-textColor text-sm capitalize ">
                        {jrn?.adultsCount}{" "}
                      </p>
                    </div>
                    <div className="flex justify-between py-2">
                      <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                        Child
                      </h4>
                      <p className=" text-textColor text-sm capitalize ">
                        {jrn?.childrenCount}{" "}
                      </p>
                    </div>
                    <div className="flex justify-between py-2">
                      <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                        Infant
                      </h4>
                      <p className=" text-textColor text-sm capitalize ">
                        {jrn?.infantCount}{" "}
                      </p>
                    </div>
                    <div className="flex justify-between py-2">
                      <h4 className="font-bold tracking-wide text-gray-400 text-sm">
                        Ticket
                      </h4>
                      <p className=" text-textColor text-xl capitalize ">
                        <BsDownload />
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
}

export default OrderSuccessPage;
