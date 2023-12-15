import React, { useState } from "react";
import { GoPlus } from "react-icons/go";

function FaqData({index, item}) {
   const [viewFaq, setViewFaq] = useState(false);
   return (
      <div className=" shadow-sm p-5 rounded-2xl bg-gray-100/50 mt-2">
         <div
            className="flex justify-between items-center"
            onClick={() => setViewFaq(!viewFaq)}
         >
            <p className="font-medium">{index + 1} . {item?.question}</p>
            <p className="">
               <GoPlus />
            </p>
         </div>
         {viewFaq && (
            <div className="mt-3">
               <p className="text-sm text-stone-600">
                 {item?.answer}
               </p>
            </div>
         )}
      </div>
   );
}

export default FaqData;
