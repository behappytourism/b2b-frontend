import React from "react";
import Lottie from "lottie-react";
import { FcAssistant, FcFeedback, FcVoicemail } from "react-icons/fc";
import { MdWarning } from "react-icons/md";
import { companyLogo, logoPng } from "../../../static/imagesB2B";
import { warningPng } from "../../../static/imagesB2B";
import { CardPaymentError } from "../../../data";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { config } from "../../../constants";

function PaymentDecline() {
   const navigate = useNavigate();
   const { home } = useSelector((state) => state.general);
   const { agent } = useSelector((state) => state.agents);
   return (
      <div className="h-screen w-full flex justify-center items-center">
         <div className=" bg-white shadow-sm p-4 w-full lg:w-9/12 rounded-[0.40rem]">
            <div className="border-b flex justify-center pb-3">
               <img src={companyLogo} alt="hero" className="h-16" />
            </div>
            <div className="details">
               <div className="bg-gray-300 flex p-3 space-x-5 rounded-[0.25rem]">
                  <div className="text-main">
                     <img src={warningPng} alt="warning" className="h-12" />
                  </div>
                  <div className="text-darktext">
                     <h3 className="uppercase font-semibold text-lg">
                        Oops! Your payment did not get through
                     </h3>
                     <p className="text-sm">
                        We regret to inform you that your payment has been
                        declined. Following might be one of the reasons for the
                        payment decline
                     </p>
                  </div>
               </div>

               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1 mt-2 text-textColor">
                  <div className="flex justify-between border h-7 text-sm p-2">
                     <span className="font-medium">Agent Code</span>
                     <span className="">{agent?.agentCode}</span>
                  </div>
                  <div className="flex justify-between border h-7 text-sm p-2">
                     <span className="font-medium">Customer Name</span>
                     <span className="">{agent?.name}</span>
                  </div>
                  <div className="flex justify-between border h-7 text-sm p-2">
                     <span className="font-medium">Customer Mobile</span>
                     <span className="">{agent?.phoneNumber}</span>
                  </div>
                  <div className="flex justify-between border h-7 text-sm p-2">
                     <span className="font-medium">Customer Email</span>
                     <span className="">{agent?.email}</span>
                  </div>
                  {/* <div className="flex justify-between border h-7 text-sm p-2">
                     <span className="font-medium">
                        Transaction Date & Time
                     </span>
                     <span className="">2023/10/1 & 11:00</span>
                  </div>
                  <div className="flex justify-between border h-7 text-sm p-2">
                     <span className="font-medium">Total Amount</span>
                     <span className="">2455 /-</span>
                  </div> */}
               </div>

               <div className="">
                  <div className=" sm:flex justify-between items-center">
                     <div className="sm:w-9/12 grid md:grid-cols-2 gap-2 p-6">
                        <div className="border rounded-[.25rem] pl-2 py-1 border-[#A0C3D2]">
                           <span className="">
                              1. Unauthorized Card Country
                           </span>
                           <span className=""></span>
                        </div>
                        <div className="border rounded-[.25rem] pl-2 py-1 border-[#A0C3D2]">
                           <span className="">2. Unauthorized IP Country</span>
                           <span className=""></span>
                        </div>
                        <div className="border rounded-[.25rem] pl-2 py-1 border-[#A0C3D2]">
                           <span className="">
                              3. Temporary technical issue
                           </span>
                           <span className=""></span>
                        </div>
                        <div className="border rounded-[.25rem] pl-2 py-1 border-[#A0C3D2]">
                           <span className="">4. Authentication Failed</span>
                           <span className=""></span>
                        </div>
                        <div className="border rounded-[.25rem] pl-2 py-1 border-[#A0C3D2]">
                           <span className="">5. Autherization Declined</span>
                           <span className=""></span>
                        </div>
                     </div>
                     <div className="w-3/12 mx-auto">
                        <Lottie animationData={CardPaymentError} />
                     </div>
                  </div>
                  <div className="flex justify-center">
                     <button
                        className="text-sm bg-blueColor text-light w-[100px] py-1 rounded-[0.25rem]"
                        onClick={() => navigate("/wallet")}
                     >
                        Try Again
                     </button>
                  </div>
               </div>

               <div className="grid sm:grid-cols-3 mt-4">
                  <div className="flex space-x-2 bg-soft shadow-sm p-2">
                     <div className=" h-10 w-10 text-2xl rounded-full bg-[#A0C3D2] flex justify-center items-center">
                        <FcAssistant />
                     </div>
                     <div className="">
                        <p className="text-sm text-darktext underline font-medium">
                           24/7 Live Support
                        </p>
                        <p className="text-xs text-gray-600">
                           Available live support
                        </p>
                     </div>
                  </div>
                  <div className="flex space-x-2 bg-soft shadow-sm p-2">
                     <div className=" h-10 w-10 text-2xl rounded-full bg-[#A0C3D2] flex justify-center items-center">
                        <FcVoicemail />
                     </div>
                     <div className="">
                        <p className="text-sm text-darktext underline font-medium">
                           Call Us
                        </p>
                        <p className="text-xs text-gray-600">
                           +{home?.phoneNumber1}
                        </p>
                     </div>
                  </div>
                  <div className="flex space-x-2 bg-soft shadow-sm p-2">
                     <div className=" h-10 w-10 text-2xl rounded-full bg-[#A0C3D2] flex justify-center items-center">
                        <FcFeedback />
                     </div>
                     <div className="">
                        <p className="text-sm text-darktext underline font-medium">
                           Email Us
                        </p>
                        <p className="text-xs text-gray-600">{home?.email}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default PaymentDecline;
