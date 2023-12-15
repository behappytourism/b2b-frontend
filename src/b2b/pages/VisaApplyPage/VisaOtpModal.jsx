import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios";
import { reduceWalletManipulation } from "../../../redux/slices/walletSlice";
import { useEffect } from "react";
import { useRef } from "react";
import { BtnLoader } from "../../components";
import {
  setAlertError,
  setAlertSuccess,
} from "../../../redux/slices/homeSlice";
import { MdPassword } from "react-icons/md";
// import { reduceWalletManipulation } from '../../../redux/slices/walletSlice'

function VisaOtpModal({ setOtpModal, order, setNavigation, grandTotal }) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
  });

  const oneRef = useRef(null);
  useEffect(() => {
    oneRef.current.focus();
  }, []);

  const { token } = useSelector((state) => state.agents);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      setIsLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `/b2b/visa/application/payment/${order._id}`,
        {
          otp: otp?.one + otp?.two + otp?.three + otp?.four + otp?.five,
        },
        config
      );

      setIsLoading(false);
      setOtpModal(false);
      localStorage.setItem("visaOrder", JSON.stringify(response.data));
      dispatch(reduceWalletManipulation(grandTotal));
      dispatch(
        setAlertSuccess({
          status: true,
          title: "Payment Success!",
          text: "VISA Payment Completed Successfully",
        })
      );
      setNavigation({
        itenary: false,
        details: false,
        payment: false,
        upload: true,
      });
    } catch (err) {
      if (err?.response?.data?.error) {
        setError(err?.response?.data?.error);
        dispatch(
          setAlertError({
            status: true,
            title: "Something went wrong!",
            text: error,
          })
        );
        setIsLoading(false);
      }
    }
  };

  const onChangeHandler = (e) => {
    if (!otp[e.target.name] || !e.target.value) {
      setOtp((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }

    if (e.target.value) {
      const next = e.target.tabIndex;
      if (next < 5) {
        e.target.parentNode.childNodes[next].focus();
      }
    } else {
      const next = e.target.tabIndex - 2;
      if (next > -1) {
        e.target.parentNode.childNodes[next].focus();
      }
    }
  };

  return (
    <div className="z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center w-full h-full p-4 lightglass overflow-y-auto">
      <div className="max-w-xl w-full mx-auto bg-white rounded-xl overflow-hidden">
        <form onSubmit={submitHandler}>
          <div className="text-gray-500 flex justify-center py-5">
            <div className="mt-2">
              <div className="flex justify-center w-full">
                <div class="flex items-center justify-center w-12 h-12 mb-5 bg-gray-200 text-blue-400 rounded-full text-2xl">
                  <MdPassword />
                </div>
              </div>
              <h1 className="text-2xl text-center font-bold">
                OTP Verification
              </h1>
              <span>Enter the OTP you received at</span>
              <span className="font-bold">+91 ******876</span>
              <div className="font-bold text-center">
                <span className="font-normal">or</span> example@gmail.com
              </div>
            </div>
          </div>
          <div
            id="otp"
            className="flex flex-row justify-center text-center  my-5"
          >
            <input
              ref={oneRef}
              className="m-2 no-spinner border h-10 w-10 text-center form-control rounded bg-white border-gray-300 outline-none text-gray-500"
              type="text"
              id="first"
              maxLength={1}
              tabIndex={1}
              name="one"
              value={otp.one}
              onChange={onChangeHandler}
            />
            <input
              className="m-2 no-spinner border h-10 w-10 text-center form-control rounded bg-white border-gray-300 outline-none text-gray-500"
              type="text"
              id="second"
              maxLength={1}
              tabIndex={2}
              name="two"
              value={otp.two}
              onChange={onChangeHandler}
            />
            <input
              className="m-2 no-spinner border h-10 w-10 text-center form-control rounded bg-white border-gray-300 outline-none text-gray-500"
              type="text"
              id="third"
              maxLength={1}
              tabIndex={3}
              name="three"
              value={otp.three}
              onChange={onChangeHandler}
            />
            <input
              className="m-2 no-spinner border h-10 w-10 text-center form-control rounded bg-white border-gray-300 outline-none text-gray-500"
              type="text"
              id="fourth"
              maxLength={1}
              tabIndex={4}
              name="four"
              value={otp.four}
              onChange={onChangeHandler}
            />
            <input
              className="m-2 no-spinner border h-10 w-10 text-center form-control rounded bg-white border-gray-300 outline-none text-gray-500"
              type="text"
              id="fifth"
              maxLength={1}
              tabIndex={5}
              name="five"
              value={otp.five}
              onChange={onChangeHandler}
            />
          </div>
          {/* <button className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200">Submit</button> */}
          <div className="pt-5 pb-6 px-6 text-right bg-primaryColor -mb-2">
            {/* <div className="inline-block w-full sm:w-auto py-3 px-5 mb-2 mr-4 text-center font-semibold leading-6 text-gray-200 bg-gray-500 hover:bg-gray-400 rounded-lg transition duration-200">
            Resend OTP
          </div> */}
            <button
              type="submit"
              className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200"
            >
              {isLoading ? <BtnLoader /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VisaOtpModal;
