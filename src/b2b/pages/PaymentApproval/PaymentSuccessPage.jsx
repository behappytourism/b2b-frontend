import React from "react";
import { useNavigate } from "react-router-dom";
import { companyLogo, logoPng } from "../../../static/imagesB2B";
import { config } from "../../../constants";

function PaymentSuccessPage() {
   const navigate = useNavigate();
   return (
      <div className="h-screen w-full flex justify-center items-center bg-white">
         <div className=" bg-white  p-4 w-full md:w-7/12 rounded-[0.40rem] success-page h-screen object-center">
            <div className="border-b flex justify-center pb-3">
               <img src={companyLogo} alt="hero" className="h-16" />
            </div>
            <div className="flex  items-center h-full ">
               <div className="w-full">
                  <h2 className="text-2xl lg:text-4xl font-[700] text-green-600 bg-green-300/50 p-5 w-full text-center rounded-lg">
                     Payment Successfull...!
                  </h2>
                  <div className="flex justify-center mt-2">
                     <button
                        className=" text-white text-[14px] font-[550] bg-blue-500 p-1 rounded"
                        onClick={() => navigate("/wallet")}
                     >
                        Go back to wallet
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default PaymentSuccessPage;
