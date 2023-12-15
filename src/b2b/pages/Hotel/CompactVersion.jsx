import React from "react";
import Rating from "../../components/Rating/Rating";
import { ImLocation2 } from "react-icons/im";
import { AiOutlineRight } from "react-icons/ai";
import priceConversion from "../../../utils/PriceConversion";
import { useSelector } from "react-redux";
import { config } from "../../../constants";
import { useSearchParams } from "react-router-dom";
import moment from "moment";

function CompactVersion({ item, filters }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedCurrency } = useSelector((state) => state.home);
  return (
    <div className="bg-white rounded shadow-round overflow-hidden h-full flex flex-col justify-between">
      <div>
        <div className=" w-full h-[130px] ">
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
        <div className="p-2">
          <div className="flex flex-wrap items-center gap-1 pt-2">
            <h3 className="text-sm font-[650] text-blue-700">
              {item?.hotel?.hotelName}
            </h3>
          </div>
          <div className="md:flex justify-between pt-2">
            <div className="flex items-center">
              <div className="text-xs text-[#f7a827] flex gap-1">
                {item?.hotel?.starCategory === "apartment" ? (
                  <p className="pr-2 font-[700]">Apartment</p>
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
            <div className="">
              {item?.totalOffer === 0 ? (
                <p className="font-[750] text-[#495057] text-xs">
                  {priceConversion(item?.minRate, selectedCurrency, true)}
                </p>
              ) : (
                <div className="text-right">
                  <p className="text-[10px] text-red-500">
                    <s>
                      {priceConversion(
                        item?.minRate + item?.totalOffer,
                        selectedCurrency,
                        true
                      )}
                    </s>
                  </p>
                  <p className="font-[750] text-[#495057] text-xs">
                    {priceConversion(item?.minRate, selectedCurrency, true)}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="">
            <p className="text-[10px] font-[600] text-grayColor underline pt-2">
              {item?.hotel?.address}
            </p>
            {item?.hotel?.distanceFromCity && (
              <p className="text-[13px] font-[500]  text-darktext pt-2">
                {item?.hotel?.distanceFromCity} km from town
              </p>
            )}
          </div>
          <div className="text-xs text-[#495057] font-[700] flex items-center gap-2 pt-2">
            <span className="">
              <p className="text-xs">
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
        </div>
      </div>
      <div className="">
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
          <button className="mt-2 h-8 w-full rounded bg-gradient-to-r from-red-600 to-blue-600 flex flex-nowrap text-[10px] justify-center items-center gap-2 text-white ">
            <span className="">Book Now </span>
            <span className="">
              <AiOutlineRight />
            </span>
          </button>
        </a>
      </div>
    </div>
  );
}

export default CompactVersion;
