import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../../../axios";

function CCAvenuePaymentComponent() {
   const { id } = useParams();

   const { token } = useSelector((state) => state.agents);

   const inputRef = useRef();
   console.log(inputRef);

   const submitHandler = async () => {
      try {
         const response = await axios.post(
            `/b2b/resellers/wallet/deposit`,
            {
               paymentProcessor: "ccavenue",
               amount:
                  Number(inputRef?.current?.value) < 10
                     ? 10
                     : Number(inputRef?.current?.value),
            },
            {
               headers: {
                  authorization: `Bearer ${token}`,
               },
            }
         );
         const winUrl = URL.createObjectURL(
            new Blob([response.data], { type: "text/html" })
         );

         const win = window.open(winUrl, "win");
      } catch (err) {
         console.log(err);
      }
   };
   return (
      <div className="my-10">
         <div className="relative w-full h-14 py-3 px-3 mb-8 border border-gray-400 hover:border-gray-400 focus-within:border-green-500 rounded-lg">
            <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-100 rounded px-1 bg-gray-500">
               Enter Amount to be added to wallet
            </span>
            <input
               className="block w-full h-full outline-none bg-transparent text-sm text-gray-400 font-medium no-spinner"
               ref={inputRef}
               type="number"
               placeholder="Enter Amount to be added to wallet"
               min={10}
               onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                }}
            />
         </div>{" "}
         <p className="text-gray-400 text-[12px] text-center pb-1">
            3.0% of processing fee will be deducted from the transaction amount
         </p>
         <button className="bg-BEColor hover-bg-BEColor h-9 text-white  w-full italic" onClick={submitHandler}>
            Online Payment
         </button>
      </div>
   );
}

export default CCAvenuePaymentComponent;
