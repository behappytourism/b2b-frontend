import React, { useEffect, useRef, useState } from "react";
import { MdPassword } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../../axios";
import {
  setAlertError,
  setAlertSuccess,
} from "../../../redux/slices/homeSlice";
import BtnLoader from "../BtnLoader";

function ForgotPasswordModal({
  forgotEmail,
  setForgotPasswordModal,
  setIsForgotPassword,
}) {
  const dispatch = useDispatch();

  const [otp, setOtp] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
    five: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
  const { token } = useSelector((state) => state.agents);

  const submitOtpHandler = async (e) => {
    try {
      e.preventDefault();
      setError("");
      setIsLoading(true);
      const response = await axios.patch(
        `/b2b/resellers/forget/password/confirm`,
        {
          otp: otp?.one + otp?.two + otp?.three + otp?.four + otp?.five,
          email: forgotEmail,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        setAlertSuccess({
          status: true,
          title: "Success",
          text: "Password changed successfully!",
        })
      );
      setForgotPasswordModal(false);
      setIsForgotPassword(false);
      setIsLoading(false);
    } catch (err) {
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
  };
  return (
    <div className="z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center w-full h-full p-4 lightglass overflow-y-auto">
      <div className="max-w-xl w-full mx-auto bg-white rounded-xl overflow-hidden">
        <form onSubmit={submitOtpHandler}>
          <div className="text-gray-400 flex justify-center py-5">
            <div className="mt-2">
              <div className="flex justify-center w-full">
                <div class="flex items-center justify-center w-12 h-12 mb-5 bg-blue-600 rounded-full text-2xl text-white">
                  <MdPassword />
                </div>
              </div>
              <h1 className="text-2xl text-center font-bold">
                OTP Verification
              </h1>
              <span>Enter the OTP you received at</span>
              <div className="font-bold text-center">
                <span className="font-normal"></span>
                {forgotEmail}
              </div>
            </div>
          </div>
          <div
            id="otp"
            className="flex flex-row justify-center text-center  my-5"
          >
            <input
              ref={inputRef}
              className="m-2 no-spinner border h-10 w-10 text-center form-control rounded  border-gray-600 outline-none text-gray-500"
              type="text"
              id="first"
              maxLength={1}
              tabIndex={1}
              name="one"
              value={otp.one}
              onChange={onChangeHandler}
            />
            <input
              className="m-2 no-spinner border h-10 w-10 text-center form-control rounded  border-gray-600 outline-none text-gray-500"
              type="text"
              id="second"
              maxLength={1}
              tabIndex={2}
              name="two"
              value={otp.two}
              onChange={onChangeHandler}
            />
            <input
              className="m-2 no-spinner border h-10 w-10 text-center form-control rounded  border-gray-600 outline-none text-gray-500"
              type="text"
              id="third"
              maxLength={1}
              tabIndex={3}
              name="three"
              value={otp.three}
              onChange={onChangeHandler}
            />
            <input
              className="m-2 no-spinner border h-10 w-10 text-center form-control rounded  border-gray-600 outline-none text-gray-500"
              type="text"
              id="fourth"
              maxLength={1}
              tabIndex={4}
              name="four"
              value={otp.four}
              onChange={onChangeHandler}
            />
            <input
              className="m-2 no-spinner border h-10 w-10 text-center form-control rounded  border-gray-600 outline-none text-gray-500"
              type="text"
              id="fifth"
              maxLength={1}
              tabIndex={5}
              name="five"
              value={otp.five}
              onChange={onChangeHandler}
            />
          </div>
          <div className="max-w-md mx-auto">
            <div className="relative w-full h-14 py-2 px-3 mb-6 border border-gray-400 focus-within:border-green-500 rounded-lg">
              <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-white px-1 bg-blue-500">
                New Password
              </span>
              <input
                className="block w-full h-full outline-none bg-transparent text-sm text-gray-500 font-medium"
                id="modalInput9-4"
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="relative w-full h-14 py-2 px-3 mb-6 border border-primaryColor focus-within:border-green-500 rounded-lg">
              <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-white px-1 bg-blue-500">
                Confirm Password
              </span>
              <input
                className="block w-full h-full outline-none bg-transparent text-sm text-gray-500 font-medium"
                id="modalInput9-4"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          {error && (
            <div className="">
              <p className="text-xs text-red-500 p-2">{error}</p>
            </div>
          )}
          <div className="pt-5 pb-6 px-6 flex gap-4 justify-end bg-primaryColor -mb-2">
            <span
              className="inline-block w-full sm:w-auto py-3 px-5 mb-2 text-center font-semibold leading-6 text-blue-50 bg-slate-600 cursor-pointer hover:bg-gray-400/80 rounded-lg transition duration-200"
              onClick={() => setForgotPasswordModal(false)}
            >
              Cancel
            </span>
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

export default ForgotPasswordModal;
