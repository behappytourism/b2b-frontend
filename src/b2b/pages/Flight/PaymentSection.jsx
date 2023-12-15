import React, { useState } from "react";
import VisaOtpModal from "../VisaApplyPage/VisaOtpModal";
import { PaymentAnimation } from "../../../data";
import Lottie from "lottie-react";

const PaymentSection = ({ navigation, setNavigation }) => {
  const [otpModal, setOtpModal] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="p-6 text-darktext">
        <form onSubmit={submitHandler}>
          <div
            className={`my-1  px-3 py-4 ${
              navigation.payment ? "text-gray-400 " : "text-slate-400 border-b"
            } rounded-[.25rem] flex items-center gap-2`}
          >
            <div className="h-8 w-8 rounded-full flex items-center justify-center border border-gray-200 font-[600] ml-6">
              4
            </div>
            <p className="font-[600] text-[20px]">Payment</p>
          </div>
          {navigation.payment && (
            <div className="rounded-md shadow bg-white p-6">
              <div className=" w-[100%]">
                <div className="flex justify-between gap-3 rounded-md shadow bg-white p-6">
                  <div className="space-y-2">
                    <p className="text-slate-400 text-sm font-[500]">
                      Make use of our Wallet system to purchase which is help
                      for faster transaction.
                    </p>
                    <p className="text-green-500 text-sm">
                      Make payment through your wallet.
                    </p>
                    <p className="text-slate-400 font-[500] text-sm">
                      Your wallet amount is :{" "}
                      <span className="text-main font-[600]">
                        {/* {priceConversion(balance, selectedCurrency, true)} */}
                      </span>{" "}
                    </p>
                    <p className="text-slate-400 font-[500] text-sm">
                      Total Price :{" "}
                      <span className="text-darktext font-[550]">
                        {" "}
                        {/* {priceConversion(grandTotal, selectedCurrency, true)} */}
                      </span>{" "}
                    </p>
                    <button
                      className="bg-lightblue rounded-[.25rem] text-white w-[100px] h-9"
                      onClick={() => setOtpModal(true)}
                    >
                      Pay
                    </button>
                  </div>
                  <div className=" w-[170px] ">
                    <Lottie animationData={PaymentAnimation} />
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-lightblue text-[14px] text-white px-3 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
      {otpModal && (
        <VisaOtpModal
          // order={order}
          setOtpModal={setOtpModal}
          setNavigation={setNavigation}
        />
      )}
    </>
  );
};

export default PaymentSection;
