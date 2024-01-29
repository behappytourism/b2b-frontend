import React from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios";
import {
  setAlertError,
  setAlertSuccess,
} from "../../../redux/slices/homeSlice";
import { config } from "../../../constants";

const RazorPayPaymentComponent = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const visaOrder = JSON.parse(localStorage.getItem("visaOrder"));

  const { visaEnquiry } = useSelector((state) => state.b2cVisa);

  const verifyPayment = async (ids) => {
    if (ids) {
      const reqData = {
        ids: {
          razorpay_order_id: ids.razorpay_order_id,
          razorpay_payment_id: ids.razorpay_payment_id,
          razorpay_signature: ids.razorpay_signature,
        },
      };

      const res = await axios.post(
        "visa/razorpay/paymentVerification",
        reqData
      );
      if (res?.status === 200) {
        dispatch(
          setAlertSuccess({
            status: true,
            title: "Success verifying payment",
          })
        );
      } else {
        dispatch(
          setAlertError({
            status: true,
            title: "Something went wrong!",
            text: "Unexpectdly happen something wrong. please try again!",
          })
        );
      }
    } else {
      dispatch(
        setAlertError({
          status: true,
          title: "Something went wrong!",
          text: "Unexpectdly happen something wrong. please try again!",
        })
      );
    }
  };

  const handlePayByRazorPay = async () => {
    const {
      data: { key },
    } = await axios.get("visa/razorpay/getkey");

    const res = await axios.post("/visa/razorpay/setOrder", {
      visaOrderId: visaOrder._id,
    });

    const {
      data: { order },
    } = res;

    const options = {
      key: key,
      amount: 100,
      currency: "AED",
      name: config.TITLE_NAME,
      description: ``,
      image:
        "https://a.walletbot.online/public/images/home/logo-1675491174743-311966466.png",
      order_id: order.id,
      handler: function (response) {
        verifyPayment({
          ids: response,
          amount: 100,
        });
      },
      prefill: {
        email: visaEnquiry.email,
        contact: visaEnquiry.phone,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#E5E5E5",
      },
    };

    const razorPay = new window.Razorpay(options);
    razorPay.open();
  };

  return (
    <div>
      <div className="flex justify-center flex-col gap-4 my-3">
        <div className="relative w-full h-14 py-3 px-3 mb-8 border border-gray-400 hover:border-gray-400 focus-within:border-green-500 rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-100 rounded px-1 bg-gray-500">
            Enter Amount to be added to wal let
          </span>
          <input
            className="block w-full h-full outline-none bg-transparent text-sm text-gray-400 font-medium no-spinner"
            ref={inputRef}
            value={100}
            type="number"
            placeholder="Enter Amount to be added to wallet"
            min="0"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, '');
            }}
          />
        </div>{" "}
        <button
          onClick={handlePayByRazorPay}
          // onClick={verifyPayment}
          className="italic rounded-md px-4 w-[100%] tracking-wide text-white bg-gray-800 h-[40px]"
        >
          Razorpay
        </button>
      </div>
    </div>
  );
};

export default RazorPayPaymentComponent;
