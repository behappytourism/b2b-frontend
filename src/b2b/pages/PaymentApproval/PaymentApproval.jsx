import React, { useState } from "react";
import Lottie from "lottie-react";
import { PaymentAnimation } from "../../../data";
import { paypalpng, stripepng, atmcardpng } from "../../../static/images";
import AddWalletPaypalComponent from "../../components/Payment/AddWalletPaypalComponent";
import { Link } from "react-router-dom";
import RazorPayPaymentComponent from "../../components/Payment/RazorPayPaymentComponent";
import CCAvenuePaymentComponent from "../../components/Payment/CCAvenuePaymentComponent";

function PaymentApproval() {
  const [payMethod, setPayMethod] = useState("ccavenue");
  return (
      <div className="max-w-screen-xl mx-auto">
        <div className="">
          <div className="px-5 py-10">
            <div className="bg-white shadow-sm rounded-md overflow-hidden w-full md:my-6">
              <div className="lg:grid grid-cols-12 gap-5">
                <div className="1 col-span-3 bg-black p-6 text-white space-y-5">
                  <div className="h-12 bg-gray-300   flex justify-center items-center font-medium tracking-wide rounded-md">
                    Payments
                  </div>

                  {/* <div
                    onClick={() => {
                      setPayMethod("razorpay");
                    }}
                    className="h-10 hover:bg-bluetrans rounded-lg  tracking-wide items-center cursor-pointer px-2 mt-5"
                  >
                    <p className="">Razorpay</p>
                    <p className="text-[8px] text-text">
                      (credit/debit-card, UPI payment)
                    </p>
                  </div> */}
                  {/* <div
                    onClick={() => {
                      setPayMethod("paypal");
                    }}
                    className="h-10 hover:bg-bluetrans rounded-lg flex tracking-wide items-center cursor-pointer px-2"
                  >
                    Paypal
                  </div> */}
                  <div
                    onClick={() => {
                      setPayMethod("ccavenue");
                    }}
                    className={`h-10 hover:bg-orange-600 ${payMethod === "ccavenue" ? " bg-orange-500 " : " bg-transparent "} uppercase font-medium text-[13px] rounded-lg flex tracking-wide items-center cursor-pointer px-4`}
                  >
                    CCAvenue
                  </div>
                </div>
                <div className="2 col-span-9 p-6">
                  <div className="md:flex justify-between items-center border-b border-gray-200 border-dashed mb-5">
                    <div className="">
                      <h2 className="text-3xl font-bold tracking-wider text-gray-400 underline">
                        Add to wallet
                      </h2>
                      <p className="text-gray-300 text-[11px]">Using wallet option make you transfer faster and easier</p>
                    </div>
                    <div className=" w-[150px] ">
                      <Lottie
                        animationData={PaymentAnimation}
                        place="b2cvisa"
                      />
                    </div>
                  </div>

                  <div className="md:flex justify-center ">
                    <div className="md:w-7/12">
                      {payMethod === "paypal" && <AddWalletPaypalComponent />}
                      {payMethod === "razorpay" && <RazorPayPaymentComponent />}
                      {payMethod === "ccavenue" && <CCAvenuePaymentComponent />}
                    </div>
                  </div>
                  <div className="flex justify-center items-center space-x-10 border-gray-200 border-t border-dashed">
                    <div className="">
                      <img src={paypalpng} alt="paypal" className="w-[60px]" />
                    </div>
                    <div className="">
                      <img src={stripepng} alt="ccavenue" className="w-[50px]" />
                    </div>
                    <div className="">
                      <img src={atmcardpng} alt="cards" className="w-[40px]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default PaymentApproval;
