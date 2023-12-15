import React, { useState } from "react";
import { useSelector } from "react-redux";

import BookTicketComponent from "./BookTicketComponent";

function BookingSection({ resData }) {
  const { travellers } = useSelector(state => state.a2a)
  return (
    <div className="">
      {resData?.length > 0 && (
        <>
          <h4 className="font-[700] text-lg text-gray-400">Book Your Ticket</h4>
          {travellers?.map((item, index) => (
            <BookTicketComponent key={item?._id} item={item} index={index} />
          ))}
        </>
      )}
    </div>
  );
}

export default BookingSection;
