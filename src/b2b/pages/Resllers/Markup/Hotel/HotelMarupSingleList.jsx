import React, { useState } from "react";
import HotelSingleList from "./HotelSingleList";

function HotelMarupSingleList({ item }) {
  const [viewHotel, setViewHotel] = useState(false);

  return (
    <>
      <tr colSpan={3} className="bg-white hover:bg-gray-100/50 border-b">
        <td
          onClick={() => setViewHotel(!viewHotel)}
          className="font-[500] p-4 whitespace-nowrap  "
        >
          {item?.starCategory === "5"
            ? "5 Star Hotels"
            : item?.starCategory === "4"
            ? "4 Star Hotels"
            : item?.starCategory === "3"
            ? "3 Star Hotels"
            : item?.starCategory === "2"
            ? "2 Star Hotels"
            : item?.starCategory === "apartment"
            ? "Apartments"
            : item?.starCategory}
        </td>
      </tr>
      {viewHotel ? (
        <>
          {item?.hotel?.map((hotel) => (
            <HotelSingleList key={hotel?.hotelId} hotel={hotel} />
          ))}
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default HotelMarupSingleList;
