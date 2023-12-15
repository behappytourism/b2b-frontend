import React from "react";
import { GoPlus } from "react-icons/go";
import FaqData from "../../components/Hotel/FaqData";

function FaqSection({ hotel }) {
  return (
    <>
      {hotel?.faqs?.length > 0 && (
        <div className="text-darktext">
          <h2 className="text-[20px] text-blue-600 font-[700]">FAQ of {hotel?.hotelName}</h2>
          {hotel?.faqs?.map((item, index) => (
            <FaqData key={item?._id} item={item} index={index} />
          ))}
        </div>
      )}
    </>
  );
}

export default FaqSection;
