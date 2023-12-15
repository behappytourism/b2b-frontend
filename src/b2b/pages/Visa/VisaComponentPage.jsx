import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import priceConversion from "../../../utils/PriceConversion";

function VisaComponentPage({ nationality }) {
  const params = useParams();
  const navigate = useNavigate();
  const { visa } = useSelector((state) => state.visa);
  const { selectedCurrency } = useSelector((state) => state.home);

  return (
    <>
      <div className="mb-10 ">
        <div className="p-4 ">
          <div className="text-xl font-[800] text-gray-400">
            Types of Dubai Visa
          </div>
        </div>
        {visa?.visaTypes?.length > 0 ? (
          <div className="sm:grid grid-cols-2 sm:gap-2 lg:gap-5  space-y-3 sm:space-y-0">
            {visa?.visaTypes?.map((item, index) => (
              <div
                className=" rounded-xl shadow-round text-darktext cursor-pointer"
                key={index}
              >
                <div className="m-2  from-primaryColor/90 to-blue-500/90  bg-gradient-to-r rounded">
                  <div className="font-[700] tracking-wide p-5 text-gray-50">
                    {item?.visaName}
                  </div>
                </div>
                <div className="p-5 space-y-3 ">
                  <div className="flex justify-between">
                    <div className="text-xl text-blue-600 font-[700] ">
                      <p className="text-xs font-light text-gray-500">
                        Adult price
                      </p>
                      {priceConversion(
                        item?.adultPrice,
                        selectedCurrency,
                        true
                      )}{" "}
                    </div>
                    <div className="text-xl text-blue-600 font-[700]">
                      <p className="text-xs font-light text-gray-500">
                        Child price
                      </p>
                      {priceConversion(
                        item?.childPrice,
                        selectedCurrency,
                        true
                      )}{" "}
                    </div>
                  </div>
                  <div className="flex justify-end border-b pb-2">
                    <button
                      className="text-xs uppercase shadow-mn font-semibold tracking-wide text-white bg-blue-500 rounded-sm h-7 px-5"
                      onClick={() => {
                        navigate(
                          `/visa/${params.id}/apply?nationality=${nationality}&visaType=${item?._id}`
                        );
                        localStorage.setItem("visaEnquiry", item?._id);
                      }}
                    >
                      Book
                    </button>
                  </div>
                  <div className=" border-b pb-3 text-text">
                    <div className="flex gap-2">
                      <div className="border-r pr-1 border-gray-400">
                        <p className="text-[13px] font-[400] text-gray-400">
                          Stay period
                        </p>
                        <p className="text-[10px] text-lightblue bg-[#cbedfd] uppercase w-fit px-2 rounded  py-[2px]">
                          {item?.stayPeriod + " " + item?.stayPeriodFormat}
                        </p>
                      </div>
                      <div className="border-r pr-1 border-gray-400">
                        <p className="text-[13px] font-[400] text-gray-400">
                          Validity period
                        </p>
                        <p className="text-[10px] text-lightblue bg-[#cbedfd] uppercase w-fit px-2 rounded  py-[2px]">
                          {item?.validity + " " + item?.validityTimeFormat}
                        </p>
                      </div>
                      <div>
                        <p className="text-[13px] font-[400] text-gray-400">
                          Processing Time
                        </p>
                        <p className="text-[10px] text-lightblue bg-[#cbedfd] uppercase w-fit px-2 rounded  py-[2px]">
                          {item?.processingTime +
                            " " +
                            item?.processingTimeFormat}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex justify-between">
                      <p className="text-[13px] font-[400] text-text">Entry</p>
                      <p className="text-[13px] font-[400] text-text capitalize">
                        {item?.entryType}{" "}
                      </p>
                    </div>
                    {item?.serviceCharge ? (
                      <div className="flex justify-between">
                        <p className="text-[13px] font-[400] text-text">
                          Service Charge
                        </p>
                        <p className="text-[13px] font-[400] text-text">
                          {item?.serviceCharge}{" "}
                        </p>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="flex justify-between">
                      <p className="text-[13px] font-[400] text-text">Tax</p>
                      <p className="text-[13px] font-[400] text-text">
                        {item?.tax}{" "}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between border-t pt-1">
                    <span className="text-sm text-text">
                      Child Age Limit: {item?.ageFrom}{" "}
                    </span>
                    <span className="text-sm text-text">
                      Adult Age Limit: {item?.ageTo}{" "}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className=" w-full">
            <div className="bg-gray-200 rounded-md p-10 text-xl w-full">
              <h1 className="text-darktext">
                The data you looking for is not available right now!!
              </h1>
              <p className="text-text text-sm underline">
                notify me when it is available*
              </p>
              <input
                className="w-8/12 py-2 rounded-lg mt-2 placeholder:text-bluetrans  text-sm  px-2 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-text"
                type="email"
              />
              <div className="pt-2">
                <button className="text-sm text-light bg-lightblue px-3 py-1 rounded-md">
                  Notify
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default VisaComponentPage;
