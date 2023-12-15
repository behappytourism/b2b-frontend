import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillInfoSquareFill } from "react-icons/bs";
import formatDate from "../../../utils/formatDate";
import HotelCard from "../Cards/HotelCard";
import { useNavigate } from "react-router-dom";

function HotelExpiryModal({ hotel, enquiryData, roomPaxes }) {
  const navigate = useNavigate()
  return (
    <div className="temp_lightglass  fixed top-0 right-0 left-0 bottom-0 h-[100vh] w-full">
      <div className="flex justify-center  items-center h-full">
        <div className="bg-white w-full  md:w-[600px] rounded-lg shadow-round p-5">
          <div className="flex justify-end">
            <p className="text-gray-400 text-xl">
              <AiOutlineClose />
            </p>
          </div>
          <div className="text-lg font-semibold text-center text-blue-800 py-2">
            Your Search has been expired.
          </div>
          <div className="flex justify-center">
            <HotelCard />
          </div>
          <div className="border border-gray-100 shadow-round rounded-xl p-3 mt-4">
            <p className="flex justify-center py-2 text-blue-800 text-3xl">
              <BsFillInfoSquareFill />
            </p>
            <p className="text-gray-400 text-sm text-center tracking-tight font-light py-2">
              Your search has been inactive for more than 15 minutes.please
              update the query.
            </p>
            <hr />
            <ul className="py-2 list-disc list-inside px-3">
              {/* <li className="text-sm font-medium">{hotel}</li> */}
              <li className="text-sm ">
                {formatDate(enquiryData?.fromDate) +
                  " to " +
                  formatDate(enquiryData?.toDate)}
              </li>
              {/* <li className="text-sm ">{hotel}</li> */}
            </ul>
          </div>
          <div className="py-3 flex justify-end gap-3">
            <button onClick={() =>  navigate("/")} className="text-sm font-medium border border-blue-700 text-blue-600 rounded-md shadow-mn h-10 px-4">
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelExpiryModal;
