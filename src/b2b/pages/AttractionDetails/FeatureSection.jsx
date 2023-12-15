import React, { useEffect, useState } from "react";
import { AiFillThunderbolt, AiOutlineMobile } from "react-icons/ai";
import { BsCalendar2X } from "react-icons/bs";
import { FaHotel } from "react-icons/fa";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { GiClockwork, GiSandsOfTime, GiSurferVan } from "react-icons/gi";
import { useSelector } from "react-redux";

function FeatureSection() {
  const { agentExcursion } = useSelector((state) => state.agentExcursions);

  // const enabledDays = excursion?.availability?.filter(item => item?.isEnabled === true)
  //  if(enabledDays > 3 && enabledDays !== 7) {
  //     let days = excursion?.availability?.filter(item => item?.isEnabled === false)
  //     setAvail(days)
  // }else if (enabledDays < 3){
  //     setAvail(enabledDays)
  // }
  // console.log(avail);

  return (
    <div className=" md:border border-gray-200 bg-light py-4 lg:py-5 px-3 rounded-2xl md:my-4 lg:grid-cols-2 text-center justify-between w-full grid grid-cols-3 sm:grid-cols-4 gap-5">
      {agentExcursion?.availability && (
        <div className="text-center bg-soft lg:bg-light py-5 lg:py-0 rounded-lg lg:rounded-none">
          <span className="text-2xl lg:text-3xl text-orange-500 flex justify-center">
            <IoCalendarNumberSharp />{" "}
          </span>
          <span className="text-[11px] text-text">
            {" "}
            Availibility:
            {/* {avail.length > 0 ? (
            avail.map((item,index )=> (
                <p className='text-[11px] text-text'key={index}>{item.day}</p>
            ))
        ) : "Daily"}  */}
            Daily
          </span>
        </div>
      )}
      {agentExcursion?.duration && (
        <div className="text-center bg-soft lg:bg-light py-5 lg:py-0 rounded-lg lg:rounded-none">
          <span className="text-2xl lg:text-3xl text-orange-500 flex justify-center">
            <GiSandsOfTime />{" "}
          </span>
          <span className="text-[11px] text-text">
            Duration:{" "}
            {agentExcursion?.duration + " " + agentExcursion?.durationType}{" "}
            (approx){" "}
          </span>
        </div>
      )}
      <div className="text-center bg-soft lg:bg-light py-5 lg:py-0 rounded-lg lg:rounded-none">
        <span className="text-2xl lg:text-3xl text-orange-500 flex justify-center">
          <GiClockwork />{" "}
        </span>
        <span className="text-[11px] text-text">Time slot: 8:00 - 11:30</span>
      </div>
      {/* <div className='text-center bg-soft lg:bg-light py-5 lg:py-0 rounded-lg lg:rounded-none'>
        <span className='text-2xl lg:text-3xl text-lightblue flex justify-center'><GiSurferVan /> </span>
        <span className='text-[11px] text-text'>Pick Up & Drive</span>
    </div> */}
      {agentExcursion?.bookingType === "ticket" && (
        <div className="text-center bg-soft lg:bg-light py-5 lg:py-0 rounded-lg lg:rounded-none">
          <span className="text-2xl lg:text-3xl text-orange-500 flex justify-center">
            <AiFillThunderbolt />{" "}
          </span>
          <span className="text-[11px] text-text">Instant Confirmation</span>
        </div>
      )}
      {agentExcursion?.cancellationType === "freeCancellation" && (
        <div className="text-center bg-soft lg:bg-light py-5 lg:py-0 rounded-lg lg:rounded-none">
          <span className="text-2xl lg:text-3xl text-lightblue flex justify-center">
            <BsCalendar2X />{" "}
          </span>
          <span className="text-[11px] text-text">
            Free cancellation upto 24 hours
          </span>
        </div>
      )}
    </div>
  );
}

export default FeatureSection;
