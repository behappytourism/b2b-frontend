import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

function FaqComponent({ item }) {
    const [view, setView] = useState(false)

  return (
    <div className="p-2 relative shadow-mn rounded-sm ">
      <div className="flex items-center space-x-3" 
      onClick={() => setView(!view)}
      >
        <span className="">
          <AiOutlinePlus />
        </span>
        <span className="text-gray-400">{item?.question}</span>
      </div>
      <div
        className={`text-sm text-stone-600 font-light overflow-hidden ${view ? " max-h-[100vh] " : " max-h-0" }   transition-all duration-700 `}
      >
        <div className="py-2 pl-7">
          <p className="">
            {item?.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FaqComponent;
