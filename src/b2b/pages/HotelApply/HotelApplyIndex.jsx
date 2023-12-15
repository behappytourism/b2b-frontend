import React, { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../../axios";
import { useDispatch, useSelector } from "react-redux";
import DetailsCollectingSection from "./DetailsCollectingSection";
import RightCardSection from "./RightCardSection";
import { setAlertError } from "../../../redux/slices/homeSlice";
import { BtnLoader } from "../../components";
import OtpModal from "./OtpModal";
import { ImLocation2 } from "react-icons/im";
import { RxDotFilled } from "react-icons/rx";
import { config } from "../../../constants";
import Rating from "../../components/Rating/Rating";
import PayLaterModal from "./PayLaterModal";

function HotelApplyIndex() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [appliedHotel, setAppliedHotel] = useState({});
  const [appliedHotelRate, setAppliedHotelRate] = useState({});
  const [appliedRoomPaxes, setAppliedRoomPaxes] = useState([]);
  const [contactDetails, setContactDetails] = useState({
    country: "",
    phoneNumber: "",
    email: "",
  });
  const [travellerDtls, setTravallerDtls] = useState([]);
  const [specialRequest, setSpecialRequest] = useState("");
  const [error, setError] = useState("");
  const [loadError, setLoadError] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState(false);
  const [query, setQuery] = useState({
    fromDate: "",
    toDate: "",
    nights: 0,
  });
  const [createData, setCreateData] = useState({
    searchId: "",
    hotelId: "",
  });
  const [expireTime, setExpireTime] = useState("");
  const [timer, setTimer] = useState({
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [payby, setPayby] = useState("wallet");
  const [isPayLaterModalOpen, setIsPayLaterModalOpen] = useState(false);

  const { token, agent } = useSelector((state) => state.agents);
  const { travellerDetails } = useSelector((state) => state.hotel);

  const fetchAppliedHotel = async () => {
    try {
      setIsLoading(true);
      setLoadError(false);
      const response = await axios.post(
        "/b2b/hotels/availabilities/booking/room-rate",
        {
          hotelId: searchParams.get("hotelId"),
          rateKey: searchParams.get("rateKey"),
          searchId: searchParams.get("searchId"),
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setAppliedHotel(response?.data?.hotel);
      setAppliedHotelRate(response?.data?.rate);
      setAppliedRoomPaxes(response?.data?.roomPaxes);
      setQuery({
        fromDate: response?.data?.fromDate,
        toDate: response?.data?.toDate,
        nights: response?.data?.noOfNights,
      });
      setTravallerDtls(response?.data?.travellerDetails);
      const t = new Date();
      t.setSeconds(response?.data?.expiresIn);
      setExpireTime(t);
      setCreateData({
        searchId: response?.data?.searchId,
        hotelId: response?.data?.hotel?._id,
      });
      setIsLoading(false);
    } catch (err) {
      console.log(err?.response?.data);
      setLoadError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedHotel();
  }, [searchParams]);

  // Validating data and handle payment.
  const handlePayment = (paybymethod) => {
    if (
      contactDetails?.country === "" ||
      contactDetails?.email === "" ||
      contactDetails?.phoneNumber === ""
    ) {
      setError("Fill Contact Details");
      setStatus(false);
      return;
    }

    // validate travellers details.
    const invalidTravellers = travellerDetails?.filter((item) => {
      return (
        item?.title === "" || item?.firstName === "" || item?.lastName === ""
      );
    });

    //  Throw error if any error in traveller details.
    if (invalidTravellers && invalidTravellers.length > 0) {
      setError("Fill Traveller Details correspondingly");
      setStatus(false);
      return;
    }

    // If validation succeedded to true.
    setStatus(true);
    createHotelOrders(paybymethod);
  };

  // Creating hotel order with corrresponding data.
  const createHotelOrders = async (paybymethod) => {
    try {
      setButtonLoading(true);
      setError("");
      if (paybymethod == "pay-later") {
        setIsPayLaterModalOpen(true);
        setButtonLoading(false);
        return;
      }

      const filteredTravellerDetails = await travellerDetails?.map((item) => {
        return {
          roomId: item?.roomId,
          title: item?.title,
          firstName: item?.firstName,
          lastName: item?.lastName,
        };
      });

      const response = await axios.post(
        "/b2b/hotels/orders/create",
        {
          rateKey: appliedHotelRate.rateKey,
          hotelId: createData?.hotelId,
          searchId: createData?.searchId,
          travellerDetails: filteredTravellerDetails,
          contactDetails: contactDetails,
          specialRequest: specialRequest,
          paymentMethod: paybymethod,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setOrder(response?.data);
      if (paybymethod == "wallet") {
        setOtpModal(true);
      }
      if (paybymethod == "ccavenue") {
        const winUrl = URL.createObjectURL(
          new Blob([response.data], { type: "text/html" })
        );

        window.location.replace(winUrl);
      }
      setButtonLoading(false);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.error);
      dispatch(
        setAlertError({
          status: true,
          title: "Something went wrong!",
          text: err?.response?.data?.error,
        })
      );
      setButtonLoading(false);
    }
  };

  // expire timer
  const getTime = () => {
    const time = Date.parse(expireTime) - Date.now();
    setTimer({
      day: Math.floor(time / (1000 * 60 * 60 * 24)),
      hour: Math.floor((time / (1000 * 60 * 60)) % 24),
      minute: Math.floor((time / 1000 / 60) % 60),
      second: Math.floor((time / 1000) % 60),
    });
  };

  useEffect(() => {
    let interval;
    if (!isLoading && expireTime) {
      if (Date.parse(expireTime) > Date.now()) {
        interval = setInterval(() => getTime(expireTime), 1000);
      } else {
        setLoadError(true);
      }
    }

    return () => clearInterval(interval);
  });

  return (
    <div className="text-darktext">
      {otpModal && <OtpModal setOtpModal={setOtpModal} order={order} />}
      {isPayLaterModalOpen && (
        <PayLaterModal
          setIsPayLaterModalOpen={setIsPayLaterModalOpen}
          appliedHotelRate={appliedHotelRate}
          createData={createData}
          contactDetails={contactDetails}
          specialRequest={specialRequest}
        />
      )}
      {!loadError ? (
        <div className="p-2 max-w-screen-xl mx-auto">
          <div className="lg:flex lg:justify-between p-5 bg-white rounded-md cursor-default space-y-3 sm:space-y-0">
            <div className="lg:space-y-5 font-bold uppercase text-stone-500">
              <div className="">You've got the best price</div>
            </div>
            <div className="lg:space-y-5 space-y-2 font-medium">
              <div className="flex justify-end">
                <button
                  className="px-3 h-8 shadow-mn bg-lightblue rounded font-[600] text-[14px] text-white flex items-center space-x-2 hover:border border-lightblue hover:bg-light hover:text-lightblue"
                  onClick={() => navigate(-1)}
                >
                  <span className="">
                    <AiOutlineLeft />{" "}
                  </span>
                  <span className="uppercase">Go to previous page</span>
                </button>
              </div>
              <div className="">
                <div className="flex items-center gap-3">
                  <div className="text-xs text-grayColor">Expires in</div>
                  <div className="flex gap-">
                    <div className="h-7 w-14 rounded  shadow flex justify-center items-center  font-[500]">
                      {timer.minute}
                      <span className="text-[10px]">min</span>
                    </div>
                    <div className="h-7 w-14 rounded  shadow flex justify-center items-center  font-[500]">
                      {timer.second}
                      <span className="text-[10px]">sec</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 md:flex flex-nowrap gap-2">
            <div className="left_part w-full md:w-[75%]">
              {!isLoading ? (
                <div className="flex gap-5 bg-white p-5 rounded shadow-round">
                  <div className="w-36 h-36 rounded overflow-hidden">
                    <img
                      src={
                        appliedHotel?.image?.isRelative
                          ? config.SERVER_URL + appliedHotel?.image?.path
                          : appliedHotel?.image?.path
                      }
                      alt="im"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className=" space-y-2">
                    {/* <p className="text-[11px] ">Hotel</p> */}
                    <h2 className="font-[700]">{appliedHotel?.hotelName}</h2>
                    <div className="flex">
                      <div className="text-[13px] text-[#f7a827] flex gap-1">
                        {appliedHotel?.starCategory === "apartment" ||
                        appliedHotel?.starCategory === "hostel" ||
                        appliedHotel?.starCategory === "unrated" ? (
                          <p className="pr-2 font-[700] capitalize">
                            {appliedHotel?.starCategory}
                          </p>
                        ) : (
                          <Rating
                            value={Number(appliedHotel?.starCategory)}
                            color="#f7a827"
                          />
                        )}
                      </div>
                      <div className="">
                        <p className="text-[10px] text-[#f7a827] font-medium rounded-sm px-2 py-[2px] bg-orange-100 ">
                          {
                            appliedHotel?.accommodationType
                              ?.accommodationTypeName
                          }
                        </p>
                      </div>
                    </div>
                    {appliedHotel?.address?.length > 0 ? (
                      <p className="text-xs font-[700] text-darktext">
                        {appliedHotel?.address}
                      </p>
                    ) : (
                      ""
                    )}
                    <p className="flex gap-2 items-center">
                      <span className="">
                        <ImLocation2 />
                      </span>
                      <span className="text-xs text-stone-500">
                        {appliedHotel?.city?.cityName +
                          ", " +
                          appliedHotel?.state?.stateName +
                          ", " +
                          appliedHotel?.country?.countryName}
                      </span>
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {appliedHotel?.featuredAmenities
                        ?.slice(0, 5)
                        ?.map((item) => (
                          <div
                            key={item?._id}
                            className="flex gap-2 items-center"
                          >
                            <p className="text-darktext">
                              <RxDotFilled />
                            </p>
                            <p className="text-xs capitalize">{item?.name}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-5 bg-white p-5 rounded-2xl shadow-sm animate-pulse">
                  <div className="w-36 h-36 flex justify-center items-center rounded-2xl overflow-hidden bg-gray-100">
                    <svg
                      className="w-12 h-12 text-gray-300"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 640 512"
                    >
                      <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                    </svg>
                  </div>
                  <div className=" space-y-2">
                    <p className="h-3 w-20 bg-gray-200 rounded "></p>
                    <p className="h-4 w-40 bg-gray-300 rounded-full "></p>
                    <p className="h-3 w-24 bg-gray-200 rounded "></p>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex gap-2 items-center">
                        <p className="h-6 w-6 bg-gray-200 rounded"></p>
                        <p className="h-4 w-16 bg-gray-300 rounded"></p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="h-6 w-6 bg-gray-200 rounded"></p>
                        <p className="h-4 w-16 bg-gray-300 rounded"></p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="h-6 w-6 bg-gray-200 rounded"></p>
                        <p className="h-4 w-16 bg-gray-300 rounded"></p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="h-6 w-6 bg-gray-200 rounded"></p>
                        <p className="h-4 w-16 bg-gray-300 rounded"></p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {appliedHotelRate?.cancellationPolicies?.length ? (
                <div className="bg-white shadow-round rounded w-full mt-5 p-5">
                  <h3 className="text-xl tracking-tight text-gray-400 font-[700]">
                    Cancellation Policies
                  </h3>
                  <ul className="list-disc m-4">
                    {appliedHotelRate?.cancellationPolicies?.map(
                      (item, index) => (
                        <li key={index} className="text-stone-500 text-sm">
                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ) : (
                ""
              )}
              {appliedHotelRate?.rateComments?.length ? (
                <div className="bg-white shadow-round rounded w-full mt-5 p-5">
                  <h3 className="text-xl tracking-tight text-gray-400 font-[700]">
                    Rate Comments
                  </h3>
                  <ul className="list-disc m-4">
                    {appliedHotelRate?.rateComments?.map((item, index) => (
                      <li key={index} className="text-stone-500 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                ""
              )}

              <DetailsCollectingSection
                appliedHotelRate={appliedHotelRate}
                specialRequest={specialRequest}
                setSpecialRequest={setSpecialRequest}
                contactDetails={contactDetails}
                setContactDetails={setContactDetails}
                travellerDtls={travellerDtls}
              />

              {agent?.configuration?.hasOwnProperty(
                "allowedPaymentMethods"
              ) && (
                <div className="my-5 bg-white shadow-round p-5 rounded">
                  <h2 className="text-xl tracking-tight text-gray-400 font-[700]">
                    Select Payment Method
                  </h2>
                  <div className="flex gap-10 items-center pt-5">
                    {agent?.configuration?.allowedPaymentMethods?.includes(
                      "wallet"
                    ) ? (
                      <div className="space-x-2">
                        <input
                          className=""
                          type="radio"
                          name="payment"
                          value={"wallet"}
                          defaultChecked={true}
                          onChange={(e) => setPayby(e.target.value)}
                        />
                        <label className="text-gray-400 font-semibold font-demo">
                          Wallet
                        </label>
                      </div>
                    ) : (
                      ""
                    )}
                    {agent?.configuration?.allowedPaymentMethods?.includes(
                      "ccavenue"
                    ) ? (
                      <div className="space-x-2">
                        <input
                          className=""
                          type="radio"
                          name="payment"
                          value={"ccavenue"}
                          onChange={(e) => setPayby(e.target.value)}
                        />
                        <label className="text-gray-400 font-semibold font-demo">
                          Card
                        </label>
                      </div>
                    ) : (
                      ""
                    )}
                    {agent?.configuration?.allowedPaymentMethods?.includes(
                      "pay-later"
                    ) && appliedHotelRate?.payLaterAvailable ? (
                      <div className="space-x-2">
                        <input
                          className=""
                          type="radio"
                          name="payment"
                          value={"pay-later"}
                          onChange={(e) => setPayby(e.target.value)}
                        />
                        <label className="text-gray-400 font-semibold font-demo">
                          Pay Later
                        </label>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="mt-5 flex gap-3 justify-start">
                    {error && <p className="text-xs text-red-500">{error}</p>}
                    <button
                      onClick={() => handlePayment(payby)}
                      className="md:w-[250px] w-full  py-2 text-[14px] font-[600] rounded uppercase bg-blue-600 text-white"
                    >
                      {buttonLoading ? <BtnLoader /> : "Book now"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <RightCardSection
              query={query}
              appliedHotel={appliedHotel}
              appliedHotelRate={appliedHotelRate}
              isLoading={isLoading}
              appliedRoomPaxes={appliedRoomPaxes}
            />
          </div>
        </div>
      ) : (
        <div className="p-2 lg:py-6">
          <div className="bg-white shadow-sm p-6 rounded-xl">
            <p className="text-lg text-center font-[600]">
              Sorry there is no data on this query.
            </p>
            <p className=" text-center">Please check the availability again</p>
            <div className="pt-10 text-center space-y-3">
              <p className="text-center text-sm text-gray-400">
                You can return to availablity checking page and retry with the
                enquiry
              </p>
              <button
                onClick={() => navigate(-1)}
                className="text-white px-10 py-2 bg-blue-400 rounded "
              >
                Return Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HotelApplyIndex;
