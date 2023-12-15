import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlertError,
  setAlertSuccess,
} from "../../../redux/slices/homeSlice";
import BtnLoader from "../../components/BtnLoader";
import { useSearchParams } from "react-router-dom";
import OtpModal from "./OtpModal";

export default function TermsAndOtpModal({
  setTermsModalOpen,
  isTermsModalOpen,
  termsAndCond,
  a2aTicket,
  noOfTravellers,
  markup,
  totalPrice,
}) {
  const dispatch = useDispatch();
  const [otpModal, setOtpModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");
  const [passengerDetails, setPassengerDetails] = useState({});
  const { rows } = useSelector((state) => state.a2a);
  const { token } = useSelector((state) => state.agents);

  const [searchParams, setSearchParams] = useSearchParams();
  const date = new Date(`${searchParams.get("date")}`);

  useEffect(() => {
    let array = [];
    const filteredDetails = rows.filter((item) => {
      if (item?.isInfant === true) {
        array.push(item);
      } else {
        array.push({
          title: item?.title,
          firstName: item?.firstName,
          lastName: item?.lastName,
          code: item?.code,
          phoneNumber: item?.phoneNumber,
          reference: item?.reference,
          nationality: item?.nationality,
          passportNo: item?.passportNo,
          isInfant: item?.isInfant,
        });
      }
      setPassengerDetails(array);
      return array;
    });
  }, []);

  const { availableBalance } = useSelector((state) => state.wallet);

  const submitHandler = async () => {
    try {
      setIsLoading(true);
      setError("");
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `/b2b/a2a/orders/create`,
        {
          a2aTicket,
          noOfTravellers,
          passengerDetails: passengerDetails,
          date,
          markup,
        },
        config
      );

      setOrderId(response?.data?._id);

      setIsLoading(false);
      setOtpModal(true);
    } catch (err) {
      setError(err?.response?.data?.error);
      if (availableBalance < totalPrice) {
        dispatch(
          setAlertError({
            status: true,
            title: "Something went wrong!",
            text: "Insufficient Wallet Balance or credit",
          })
        );
      }
      dispatch(
        setAlertError({
          status: true,
          title: "Something went wrong!",
          text: "Please check the passenger details",
        })
      );

      setIsLoading(false);
    }
  };

  return (
    <div
      className={
        "fixed inset-0 w-full h-full  flex items-center justify-center z-20  lightglass " +
        (isTermsModalOpen ? "block" : "hidden")
      }
    >
      <div className="bg-[#fff] w-full max-h-[90vh] rounded-2xl max-w-[600px]  shadow-[0_1rem_3rem_rgb(0_0_0_/_18%)] overflow-y-auto">
        <div className="flex items-center bg-primaryColor justify-between border-b p-4">
          <h2 className="font-medium text-xl mb-2 text-white">
            Terms and Condition
          </h2>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: termsAndCond,
          }}
          className="p-4 space-y-2"
        ></div>
        {error && <p className="py-1 text-xs text-red-500">{error}</p>}
        <div className="flex justify-between pb-5 px-5 gap-5">
          <button
            className="w-full rounded text-white bg-gray-400 py-2"
            onClick={() => setTermsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="w-full rounded text-white bg-primaryColor py-2"
            onClick={() => submitHandler()}
          >
            {isLoading ? <BtnLoader /> : "Confirm"}
          </button>
        </div>
        {otpModal && <OtpModal setOtpModal={setOtpModal} orderId={orderId} />}
      </div>
    </div>
  );
}
