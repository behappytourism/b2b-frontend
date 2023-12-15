import React, { useEffect, useState } from "react";
import priceConversion from "../../../utils/PriceConversion";
import Rating from "../../components/Rating/Rating";
import { RxDotFilled } from "react-icons/rx";
import { useSelector } from "react-redux";
import { AiOutlineRight } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";
import { useSearchParams } from "react-router-dom";
import { config } from "../../../constants";
import moment from "moment";

function ExtendedVersion({ item, numAdult, filters }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedCurrency } = useSelector((state) => state.home);
  // const [image, setImage] = useState("")
  //   useEffect(() => {
  //     if(item?.hotel?.image?.path?.contains("/original/")){

  //     }
  //   },[])
  return (
    <div className="md:flex gap-2 w-full  border-b p-4">
      <div className="w-full sm:w-[300px] lg:w-[450px] h-[180px] ">
        <img
          src={
            item?.hotel?.image?.isRelative
              ? config.SERVER_URL + item?.hotel?.image?.path
              : item?.hotel?.image?.path?.replace("/original/", "/bigger/")
          }
          alt="img"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex justify-between gap-2 w-full py-4 md:py-0">
        <div className="left__section text-darktext  space-y-2">
          <div className="flex flex-wrap items-center gap-1">
            <h3 className="text-[16px] font-[650] text-blue-700">
              {item?.hotel?.hotelName}
            </h3>
          </div>
          <div className="flex">
            <div className="text-[13px] text-[#f7a827] flex gap-1">
              {item?.hotel?.starCategory === "apartment" ||
              item?.hotel?.starCategory === "hostel" ||
              item?.hotel?.starCategory === "unrated" ? (
                <p className="pr-2 font-[700] capitalize">
                  {item?.hotel?.starCategory}
                </p>
              ) : (
                <Rating
                  value={Number(item?.hotel?.starCategory)}
                  color="#f7a827"
                />
              )}
            </div>
            <div className="">
              <p className="text-[10px] text-[#f7a827] font-medium rounded-sm px-2 py-[2px] bg-orange-100 ">
                {item?.hotel?.accommodationType?.accommodationTypeName}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {item?.hotel?.address?.length > 0 ? (
              <p className="text-xs font-[700] text-darktext">
                {item?.hotel?.address}
              </p>
            ) : (
              ""
            )}
            <div className="flex gap-[2px] flex-wrap ">
              {item?.hotel?.featuredAmenities?.slice(0, 10)?.map((aminity) => (
                <p
                  key={aminity?._id}
                  className="flex gap-[2px] items-center text-xs"
                >
                  <span className="text-stone-500 text-xl">
                    <RxDotFilled />
                  </span>
                  <span className="capitalize">{aminity?.name}</span>
                </p>
              ))}
            </div>
            {item?.hotel?.distanceFromCity && (
              <p className="text-[13px] font-[500]  text-darktext">
                {item?.hotel?.distanceFromCity} km from town
              </p>
            )}
          </div>
          <div className="text-[13px] text-[#495057] font-[700] flex items-center gap-2">
            <span className="">
              <p className="text-base">
                <ImLocation2 />
              </p>
            </span>
            <span className="">
              <p className="whitespace-nowrap">
                {item?.hotel?.state?.stateName},
              </p>
            </span>
            <span className="">
              <p className="whitespace-nowrap">
                {item?.hotel?.country?.countryName}
              </p>
            </span>
          </div>
          <div className="">
            {item?.addOnsTxt &&
              item?.addOnsTxt?.map((txt) => (
                <p className="text-[13px]  text-stone-500">{txt}</p>
              ))}{" "}
          </div>
        </div>
        <div className="right__section flex  justify-end text-darktext">
          <div className="flex flex-col  justify-between">
            {/* <div className="flex gap-1">
                            <p className="text-[13px] whitespace-wrap text-right  text-gray-300">
                              5.0 from 200 Reviews
                            </p>
                            <span className="bg-primaryColor rounded text-white p-2">9.00</span>
                          </div> */}
            <div className="flex flex-col text-grayColor items-end justify-between h-full space-y-1">
              <div className="flex flex-col items-end gap-1">
                <p className="text-[12px] whitespace-nowrap ">
                  {`${numAdult} Travllers & ${
                    JSON.parse(searchParams.get("rooms"))?.length
                  } rooms `}
                </p>
                <p className="text-[12px] whitespace-nowrap">
                  {`Price for ${item?.noOfNights} Night`}
                </p>
                {item?.totalOffer === 0 ? (
                  <p className="font-[750] text-[#495057] text-[18px]">
                    {priceConversion(item?.minRate, selectedCurrency, true)}
                  </p>
                ) : (
                  <div className="text-right">
                    <p className="text-[13px] text-red-500">
                      <s>
                        {priceConversion(
                          item?.totalOffer + item?.minRate,
                          selectedCurrency,
                          true
                        )}
                      </s>
                    </p>
                    <p className="font-[750] text-[#495057] text-[18px]">
                      {priceConversion(item?.minRate, selectedCurrency, true)}
                    </p>
                  </div>
                )}
              </div>

              <a
                href={`/hotel/details/${item?.hotel?._id}?fromDate=${moment(
                  searchParams.get("fromDate")
                ).format()}&toDate=${moment(
                  searchParams.get("toDate")
                ).format()}&rooms=${searchParams.get(
                  "rooms"
                )}&nationality=${searchParams.get(
                  "nationality"
                )}&priceType=${searchParams.get("priceType")}`}
                target="_blank"
              >
                <button className="px-3 h-8 rounded-sm shadow-mn bg-gradient-to-r from-red-600 to-blue-600 flex flex-nowrap text-sm justify-center items-center gap-2 text-white font-semibold">
                  <span className="">Book Now </span>
                  <span className="">
                    <AiOutlineRight />
                  </span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExtendedVersion;
