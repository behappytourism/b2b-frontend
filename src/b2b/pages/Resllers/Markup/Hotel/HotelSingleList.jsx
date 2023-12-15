import React, { useState } from "react";
import HotelRoomTypeSingleList from "./HotelRoomTypeSingleList";

function HotelSingleList({ hotel }) {
  const [activityView, setActivityView] = useState(false);
  return (
    <>
      <tr
        onClick={() => setActivityView(!activityView)}
        className=" hover:bg-gray-50/60 shadow-inner cursor-pointer"
      >
        <td className="p-4 ">{hotel?.hotelName}</td>
      </tr>
      {activityView ? (
        <div className="">
          <table className="w-full  ">
            <thead>
              <tr className="bg-gray-300 text-white shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)]">
                <th className="text-left p-3">Room Name</th>
                <th className="text-left p-3">Sub-agent Markup</th>
                {/* <th className="text-left p-3">Sub-agent Markup</th> */}
              </tr>
            </thead>
            <tbody>
              <HotelRoomTypeSingleList hotelId={hotel?._id}  />
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default HotelSingleList;
