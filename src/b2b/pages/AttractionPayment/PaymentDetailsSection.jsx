import React, { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import OtpModal from "./OtpModal";
import axios from "../../../axios";
import priceConversion from "../../../utils/PriceConversion";
import { BtnLoader } from "../../components";
import { setAlertError } from "../../../redux/slices/homeSlice";
import { BiBlock } from "react-icons/bi";

function PaymentDetailsSection() {
  const dispatch = useDispatch();
  const [otpModal, setOtpModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");

  const [travellerData, setTravellerData] = useState({
    gender: "male",
    firstname: "",
    lastname: "",
    email: "",
    country: "",
    phone: "",
    special_request_text: "",
  });
  const [viewRedeem, setViewRedeem] = useState(false);
  const [agentReferenceNumber, setAgentReferenceNumber] = useState("");
  const { countries } = useSelector((state) => state.home);
  const { agentExcursionCart } = useSelector((state) => state.agentExcursions);
  const { token } = useSelector((state) => state.agents);
  const { selectedCurrency } = useSelector((state) => state.home);
  const { balance, loading } = useSelector((state) => state.wallet);

  const onChange = (e) => {
    setTravellerData({ ...travellerData, [e.target.name]: e.target.value });
  };

  const activity = agentExcursionCart.map((item) => {
    return {
      activity: item?._id,
      date: item?.date,
      adultsCount: item?.adult,
      childrenCount: item?.child,
      infantCount: item?.infant,
      hoursCount: item?.hourCount ? item?.hourCount : "",
      transferType: item?.transfer,
      slot: item?.selectedTimeSlot,
      isPromoAdded: item?.isPromoAdded,
    };
  });

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setError("");

      setIsLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "/b2b/attractions/orders/create", 
        {
          selectedActivities: activity,
          country: travellerData?.country,
          name: travellerData?.firstname + " " + travellerData?.lastname,
          email: travellerData?.email,
          phoneNumber: travellerData?.phone,
          agentReferenceNumber: agentReferenceNumber,
        },
        config
      );

      setIsLoading(false);
      setOtpModal(true);
      setOrderId(response.data?._id);
    } catch (err) {
      if (err?.response?.data?.error) {
        setError(err?.response?.data?.error);
        dispatch(
          setAlertError({
            status: true,
            title: "Something went wrong!",
            text: err?.response?.data?.error,
          })
        );
        setIsLoading(false);
      }
    }
  };

  const country = countries?.filter(
    (item) => item._id === travellerData?.country
  );

  const finalPayment =
    agentExcursionCart &&
    agentExcursionCart.reduce((acc, item) => {
      let vatPrice;
      let sum;
      if (item?.isVat) {
        vatPrice = item?.vat && item?.isVat && (item?.price * item?.vat) / 100;
        sum = vatPrice + item?.price;
      } else {
        sum = item?.price;
      }
      return acc + sum;
    }, 0);

  console.log(finalPayment);

  return (
    <>
      <div className=" w-full py-5  space-y-5">
        <form className="md:space-y-3 ">
          <div className=" cursor-default mb-5">
            <h2 className="font-[900] tracking-wide text-gray-400">
              Agent details
            </h2>
          </div>
          <div className="space-y-3 pb-5">
            <div className="text-xs text-grayColor">
              {" "}
              Agent Reference Number
            </div>
            <input
              className="border-b outline-none focus:border-green-400 bg-transparent hover:border-orange-500 text-sm px-2 w-full md:w-1/2"
              type="text"
              name="agentReferenceNumber"
              value={agentReferenceNumber}
              onChange={(e) => setAgentReferenceNumber(e.target.value)}
              required
            />
          </div>
          <div className="border p-5 rounded border-dashed">
            <div className="cursor-default">
              <h2 className="font-[800] text-gray-400">
                Lead Passenger Details
              </h2>
            </div>

            <div className=" md:grid grid-cols-12 gap-4 text-darktext pt-5 space-y-3 md:space-y-0">
              <div className="col-span-2">
                <div className="space-y-3">
                  <div className="text-xs text-grayColor"> Mr/Mrs</div>
                  <select
                    className="border-b outline-none focus:border-green-400 bg-transparent hover:border-orange-500 text-sm px-2 w-full"
                    type="text"
                    name="gender"
                    value={travellerData.gender}
                    onChange={onChange}
                  >
                    <option value={"male"}>Mr.</option>
                    <option value={"female"}>Mrs.</option>
                    <option value={"other"}>Ms.</option>
                  </select>
                </div>
              </div>
              <div className="col-span-5">
                <div className="space-y-3">
                  <div className="text-xs text-grayColor"> First Name</div>
                  <input
                    className="border-b outline-none focus:border-green-400 bg-transparent hover:border-orange-500 text-sm px-2 w-full"
                    type="text"
                    name="firstname"
                    value={travellerData.firstname}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="col-span-5">
                <div className="space-y-3">
                  <div className="text-xs text-grayColor"> Last Name</div>
                  <input
                    className="border-b outline-none focus:border-green-400 bg-transparent hover:border-orange-500 text-sm px-2 w-full"
                    type="text"
                    name="lastname"
                    value={travellerData.lastname}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="md:grid grid-cols-3 gap-4 text-darktext space-y-8 pt-4 md:space-y-0">
              <div className="space-y-3">
                <div className="text-xs text-grayColor"> Email</div>
                <input
                  className="border-b outline-none focus:border-green-400 bg-transparent hover:border-orange-500 text-sm px-2 w-full"
                  type="text"
                  name="email"
                  value={travellerData.email}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="space-y-3">
                <div className="text-xs text-grayColor"> Nationality</div>
                <select
                  className="border-b outline-none focus:border-green-400 bg-transparent hover:border-orange-500 text-sm px-2 w-full"
                  type="text"
                  name="country"
                  value={travellerData.country}
                  required
                  onChange={onChange}
                >
                  <option hidden></option>
                  {countries?.map((item) => (
                    <option
                      className="capitalize"
                      key={item._id}
                      value={item._id}
                    >
                      {item.countryName}{" "}
                    </option>
                  ))}
                </select>
              </div>

              <div className=" flex gap-1">
                <div className="space-y-3 w-3/12">
                  <div className="text-xs text-grayColor"> Code</div>
                  <input
                    className="border-b outline-none focus:border-green-400 bg-transparent hover:border-orange-500 text-sm px-2 w-full"
                    value={country?.map((item) => item?.phonecode) || ""}
                    readOnly
                  />
                </div>

                <div className="space-y-3 w-9/12">
                  <div className="text-xs text-grayColor"> Phone Number</div>
                  <input
                    className="no-spinner border-b outline-none focus:border-green-400 bg-transparent hover:border-orange-500 text-sm px-2 w-full"
                    type="number"
                    name="phone"
                    required
                    value={travellerData.phone}
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <div className="text-xs text-grayColor"> Special Request</div>
              <input
                className="border-b outline-none focus:border-green-400 bg-transparent hover:border-orange-500 text-sm px-2 w-full"
                type="text"
                name="special_request_text"
                value={travellerData.special_request_text}
                onChange={onChange}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="shadow-mn  w-full px-5 py-5 rounded lg:my-3">
        <div className="lg:flex items-center lg:space-x-2">
          <span className="">
            <button
              className="border outline-none border-lightblue px-3 h-8 rounded-sm text-lightblue space-x-2 flex items-center"
              onClick={() => setViewRedeem(!viewRedeem)}
            >
              <span className="whitespace-nowrap text-sm">Use Promo Code</span>
              <span className="">
                <AiOutlineDown />{" "}
              </span>
            </button>
          </span>
          <span className=" cursor-default">
            <p className="text-lightblue text-[10px] text-sm ">
              All Coupon code discounts are Applicable on MRP(Retail Price) of
              Tours
            </p>
          </span>
        </div>
        {viewRedeem && (
          <div className="bg-white pt-7 rounded-b-xl rounded-r-xl">
            <div className=" flex space-x-2">
              <input className="border text-sm  h-8 rounded-sm px-2 text-darktext placeholder:text-darktext focus:outline-none focus:border-none focus:ring-1 focus:ring-blue bg-light " />
              <button className="px-3 h-8 bg-orange-500 text-xs font-semibold text-light rounded">
                Redeem
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="my-3 p-7  lg:flex ">
        <div className='{" "}'>
          <p>
            <span className="cursor-default text-sm">
              By Clicking Pay Now You agree that you have read and understood
              our{" "}
            </span>
            <span className="text-lightblue underline cursor-pointer">
              Terms & Conditions
            </span>
          </p>
          {loading ? (
            <BtnLoader />
          ) : (
            <p className="font-[500] text-gray-300 mt-1">
              Your Wallet Balance is{" "}
              <span className="text-blue-700 font-[600]">
                {priceConversion(balance, selectedCurrency, true)}{" "}
              </span>
            </p>
          )}
          {error ? <p className="text-xs text-red-600">{error}</p> : ""}
        </div>
        <div className="text-center fixed lg:static bottom-0 left-0 right-0 rounded-t-3xl lg:rounded-none py-8 bg-white  lg:bg-none px-10 lg:px-0 z-10">
          <button
            className={`text-light bg-orange-500  py-2 rounded shadow-mn text-sm font-[700] whitespace-nowrap w-full px-10  ${
              balance < finalPayment
                ? " cursor-not-allowed "
                : " cursor-pointer "
            }`}
            onClick={balance > finalPayment && submitHandler}
          >
            {isLoading ? (
              <BtnLoader />
            ) : (
              <>
                {balance < finalPayment ? (
                  <span className="text-xl">
                    <BiBlock />
                  </span>
                ) : (
                  "Pay Now"
                )}
              </>
            )}
          </button>
        </div>
      </div>
      {otpModal && <OtpModal setOtpModal={setOtpModal} orderId={orderId} />}
    </>
  );
}

export default PaymentDetailsSection;
