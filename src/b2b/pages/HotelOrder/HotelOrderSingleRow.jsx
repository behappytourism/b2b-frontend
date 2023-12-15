import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import priceConversion from "../../../utils/PriceConversion";
import formatDate from "../../../utils/formatDate";
import { AiFillEye } from "react-icons/ai";

function HotelOrderSingleRow({ item }) {
  const navigate = useNavigate();

  let classNameBookingStatus = "";
  const bookingStatus = item?.status;
  switch (bookingStatus) {
    case "created":
      classNameBookingStatus = " bg-orange-100 text-orange-800 ";
      break;
    case "booked":
      classNameBookingStatus = " bg-blue-100 text-blue-800 ";
      break;
    case "confirmed":
      classNameBookingStatus = " bg-green-100 text-green-800 ";
      break;
    case "cancelled":
      classNameBookingStatus = " bg-red-100 text-red-800 ";
      break;
    default:
      classNameBookingStatus = " ";
      break;
  }

  const { selectedCurrency } = useSelector((state) => state.home);
  return (
    <>
      <tr
        onClick={() => navigate(`/hotel/order/${item?._id}/details`)}
        className="border-b border-tableBorderColor hover:bg-white cursor-pointer"
      >
        <td className="p-3">{item?.referenceNumber} </td>
        <td className="p-3">{item?.hotel?.hotelName} </td>
        <td className="p-3">{item?.travellerDetails?.length} Traveller </td>
        <td className="p-3">{item?.rooms?.length} Rooms </td>
        <td className="p-3">
          {priceConversion(item?.netPrice, selectedCurrency, true)}{" "}
        </td>
        <td className="p-3">{formatDate(item?.createdAt)}</td>
        <td className="p-3 ">
          <div
            className={` py-1 px-2 rounded capitalize text-xs text-center ${classNameBookingStatus} `}
          >
            {bookingStatus}
          </div>
        </td>
      </tr>
    </>
  );
}

export default HotelOrderSingleRow;
