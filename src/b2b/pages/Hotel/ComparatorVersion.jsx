import React from "react";
import priceConversion from "../../../utils/PriceConversion";
import { useSelector } from "react-redux";
import Rating from "../../components/Rating/Rating";
import { AiOutlineRight } from "react-icons/ai";
import { config } from "../../../constants";
import { useSearchParams } from "react-router-dom";
import moment from "moment";

function ComparatorVersion({ item, filters }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedCurrency } = useSelector((state) => state.home);
  return (
    <div className="flex gap-2 w-full  border-b p-4">
      <div className="w-[130px] md:w-[150px] rounded-sm overflow-hidden lg:w-[200px]   md:h-[90px] ">
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
      <div className="flex justify-between w-full">
        <div className="left__section text-darktext space-y-2">
          <div className="flex flex-wrap items-center gap-1">
            <h3 className="text-sm font-[650] text-blue-700">
              {item?.hotel?.hotelName}
            </h3>
          </div>
          <div className="flex">
            <div className="text-xs text-[#f7a827] flex gap-1">
              {item?.hotel?.starCategory === "apartment" ? (
                <p className="pr-2 font-[700]">Apartment</p>
              ) : (
                <Rating
                  value={Number(item?.hotel?.starCategory)}
                  color="#f7a827"
                />
              )}
              {/* <span className="font-[700]">67 %</span>
                            <span className="">
                              <FaRegThumbsUp />
                            </span> */}
            </div>
            <div className="">
              <p className="text-[10px] text-[#f7a827] font-medium rounded-sm px-2 py-[2px] bg-orange-100 ">
                {item?.hotel?.accommodationType?.accommodationTypeName}
              </p>
            </div>
          </div>
          <p className="text-xs font-[700] text-grayColor underline">
            {item?.hotel?.address}
          </p>
        </div>
        <div className="right__section flex  justify-end text-darktext">
          <div className="flex flex-col  justify-between">
            <div className="flex flex-col text-grayColor items-end justify-between h-full space-y-1">
              <div className="flex flex-col items-end gap-2">
                {item?.totalOffer === 0 ? (
                  <p className="font-[750] text-[#495057] text-sm">
                    {priceConversion(item?.minRate, selectedCurrency, true)}
                  </p>
                ) : (
                  <div className="text-right">
                    <p className="text-xs text-red-500">
                      <s>
                        {priceConversion(
                          item?.minRate + item?.totalOffer,
                          selectedCurrency,
                          true
                        )}
                      </s>
                    </p>
                    <p className="font-[750] text-[#495057] text-sm">
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
                <button className="whitespace-nowrap px-3 h-7 rounded-sm bg-gradient-to-r from-red-600 to-blue-600 flex flex-nowrap text-xs justify-center items-center gap-2 text-white">
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

export default ComparatorVersion;
