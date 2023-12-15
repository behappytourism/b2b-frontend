import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { PaymentAnimation } from "../../../data";
import VisaOtpModal from "./VisaOtpModal";
import { useSelector } from "react-redux";
import axios from "../../../axios";
import priceConversion from "../../../utils/PriceConversion";
import { BtnLoader } from "../../components";

function MakePaymentSection({ navigation, setNavigation, totalPrice }) {
  const [otpModal, setOtpModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState({});

  const { visaEnquiry, rows, childRows } = useSelector((state) => state.visa);
  const { token } = useSelector((state) => state.agents);
  const { balance } = useSelector((state) => state.wallet);
  const { selectedCurrency } = useSelector((state) => state.home);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError("");

      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `/b2b/visa/application/create`,
        {
          visaType: visaEnquiry?.visaType,
          noOfAdult: Number(visaEnquiry?.noOfAdult),
          noOfChild: Number(visaEnquiry?.noOfChild),
          travellers: [...rows, ...childRows],
          nationality: visaEnquiry?.nationality,
        },
        config
      );
      setIsLoading(false);
      setOrder(response.data);
      setOtpModal(true);
    } catch (err) {
      setError(err?.response?.data?.error || "Something went wrong, Try again");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className=" text-darktext rounded-[.25rem] shadow-[0_0_7px_2px_rgb(56_65_74_/_7%)] ">
        {navigation.payment && (
          <div>
            <div
              className={`my-2 px-3 py-4 rounded-[.25rem] border-b border-dashed`}
            >
              <p className="font-[700] text-xl text-gray-400">Make Payment</p>
            </div>
            <form onSubmit={submitHandler}>
              <div className="flex justify-between gap-3 p-6">
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm font-[500]">
                    Make use of our Wallet system to purchase which is help for
                    faster transaction.
                  </p>
                  <p className="text-green-500 text-sm">
                    Make payment through your wallet.
                  </p>
                  <p className="text-slate-400 font-[500] text-sm">
                    Your wallet amount is :{" "}
                    <span className="text-main font-[600]">
                      {priceConversion(balance, selectedCurrency, true)}
                    </span>{" "}
                  </p>
                  <p className="text-slate-400 font-[500] text-sm">
                    Total Price :{" "}
                    <span className="text-darktext font-[550]">
                      {" "}
                      {priceConversion(totalPrice, selectedCurrency, true)}
                    </span>{" "}
                  </p>
                  {error ? <p className="">{error}</p> : ""}
                  <button className="bg-lightblue rounded-sm text-white w-[100px] h-8 text-sm shadow-mn">
                    {isLoading ? <BtnLoader /> : "Pay"}
                  </button>
                </div>
                <div className=" w-[170px] ">
                  <Lottie animationData={PaymentAnimation} />
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
      {otpModal && (
        <VisaOtpModal
          totalPrice={totalPrice}
          order={order}
          setOtpModal={setOtpModal}
          setNavigation={setNavigation}
        />
      )}
    </>
  );
}

export default MakePaymentSection;
