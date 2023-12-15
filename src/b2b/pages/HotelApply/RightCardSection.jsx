import React, { useEffect, useState } from "react";
import formatDate from "../../../utils/formatDate";
import { useSelector } from "react-redux";
import priceConversion from "../../../utils/PriceConversion";

function RightCardSection({
  appliedHotel,
  appliedHotelRate,
  query,
  isLoading,
  appliedRoomPaxes,
}) {
  const [adultLength, setAdultLength] = useState(1);
  const [childLength, setChildLength] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const { selectedCurrency } = useSelector((state) => state.home);

  useEffect(() => {
    const val = appliedRoomPaxes?.reduce((acc, item) => {
      return acc + item?.noOfAdults;
    }, 0);
    setAdultLength(val);
    const childVal = appliedRoomPaxes?.reduce((acc, item) => {
      return acc + item?.noOfChildren;
    }, 0);
    setChildLength(childVal);
    appliedRoomPaxes?.filter((item) => {
      setChildrenAges([...item?.childrenAges]);
      return null;
    });
  }, [appliedRoomPaxes]);

  return (
    <div className="right_part w-full md:w-[25%] my-10 md:my-0 ">
      <div className="flex gap-5  p-5 rounded shadow-round">
        <div className="w-full space-y-2">
          <h4 className="font-[600]">Your Booking Details</h4>
          <div className="flex gap-2 items-center justify-between border-b pb-1">
            <div className="">
              <p className="text-[12px] text-stone-500">Check-in</p>
              {isLoading ? (
                <p className="h-5 w-16 bg-gray-300 rounded"></p>
              ) : (
                <p className="font-[600] text-[17px]">
                  {formatDate(query?.fromDate)}
                </p>
              )}
            </div>

            <div className="">
              <p className="text-[12px] text-stone-500">Check-out</p>
              {isLoading ? (
                <p className="h-5 w-16 bg-gray-300 rounded"></p>
              ) : (
                <p className="font-[600] text-[17px]">
                  {formatDate(query?.toDate)}
                </p>
              )}
            </div>
          </div>
          <p className="text-[13px] text-stone-500">Total length of stay:</p>
          {isLoading ? (
            <p className="h-5 w-40 bg-gray-200 rounded"></p>
          ) : (
            <p className="text-[14px] font-[600]">
              {query?.nights} Nights & {Number(query?.nights) + 1} Days{" "}
            </p>
          )}
          <p className="text-[13px] text-stone-500">No of rooms:</p>
          {isLoading ? (
            <p className="h-5 w-40 bg-gray-200 rounded"></p>
          ) : (
            <p className="text-[14px] font-[600]">
              {appliedRoomPaxes?.length + " Room" ||  "1 Room"}
            </p>
          )}
          <p className="text-[13px] text-stone-500">Paxes:</p>
          {isLoading ? (
            <p className="h-5 w-40 bg-gray-200 rounded"></p>
          ) : (
            <>
              <p className="text-[14px] font-[600]">
                {adultLength} Adults & {childLength} Children
              </p>
              {Number(childLength) > 0 ? (
                <>
                  <p className="text-[13px] text-stone-500">Children ages:</p>
                  <div className="flex gap-2">
                    {childrenAges?.map((item, ind) => (
                      <p key={ind} className="text-sm">
                        {item} {ind == childrenAges?.length - 1 ? "" : ","}
                      </p>
                    ))}
                  </div>
                </>
              ) : (
                ""
              )}
            </>
          )}
          <div className="border-t pt-1">
            <p className="text-[14px] font-[600] pb-2">You selected:</p>
            {isLoading ? (
              <p className="h-4 w-40 bg-gray-200 rounded"></p>
            ) : (
              <p className="text-[14px]">{appliedHotelRate?.rateName}</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-5  p-5 rounded shadow-round mt-5">
        <div className="w-full space-y-2">
          <h4 className="font-[600]">Pricing Details</h4>
          <div className="flex gap-2 items-center justify-between  pb-1 text-lg">
            <div className="">
              <p className="font-[700]">Price</p>
            </div>

            <div className="">
              {isLoading ? (
                <p className="h-5 w-20 bg-gray-200 rounded"></p>
              ) : (
                <p className="font-[700] ">
                  {priceConversion(
                    appliedHotelRate?.netPrice,
                    selectedCurrency,
                    true
                  )}
                </p>
              )}
            </div>
          </div>
          {/* <div className="">
            <table className="w-full">
              <tbody className="text-grayColor text-xs">
                <tr className="w-full border-b border-opacity-10">
                  <td className="py-2">Total price</td>
                  <td className="py-2 text-right">
                    {" "}
                    {priceConversion(
                      appliedHotelRate?.grossPrice,
                      selectedCurrency,
                      true
                    )}{" "}
                  </td>
                </tr>
                <tr className="w-full border-b border-opacity-10">
                  <td className="py-2">Discount</td>
                  <td className="py-2 text-right">
                    {" "}
                    -{" "}
                    {priceConversion(
                      appliedHotelRate?.totalOffer,
                      selectedCurrency,
                      true
                    )}{" "}
                  </td>
                </tr>
                <tr className="w-full border-b border-opacity-10">
                  <td className="py-2">Net price</td>
                  <td className="py-2 text-right">
                    {" "}
                    {priceConversion(
                      appliedHotelRate?.netPrice,
                      selectedCurrency,
                      true
                    )}{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div> */}
          {/* <p className="text-xs text-gray-400">Total Price inclusive of VAT*</p> */}
        </div>
      </div>
    </div>
  );
}

export default RightCardSection;
