import React from "react";
import { AiFillCar } from "react-icons/ai";
import { GiCheckMark, GiEntryDoor, GiExitDoor } from "react-icons/gi";
import { IoFootstepsOutline } from "react-icons/io5";
import { MdLinearScale, MdOutlineBed } from "react-icons/md";
import formatDate from "../../../utils/formatDate";
import { config } from "../../../constants";
import { useSearchParams } from "react-router-dom";

function DetailsSection({ hotel, isLoading }) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
      {!isLoading ? (
        <div className="md:grid grid-cols-12 gap-4">
          <div className="col-span-9">
            {hotel?.featuredAmenities?.length > 0 && (
              <div className="text-darktext pb-2">
                <div className="bg-white rounded shadow-round overflow-hidden">
                  <div className="flex flex-wrap items-center w-full ">
                    {hotel?.featuredAmenities?.map((item) => {
                      return (
                        <div className=" py-4 flex justify-center items-center gap-2 px-3 ">
                          {item?.icon ? (
                            <div className="h-8 w-8 p-1 border border-gray-200 border-opacity-20 rounded">
                              <img
                                className="object-contain w-full h-full"
                                src={config.SERVER_URL + item?.icon}
                                alt="ic"
                              />
                            </div>
                          ) : (
                            <span className="p-2 bg-blue-100/50 text-sky-400 rounded text">
                              <GiCheckMark />
                            </span>
                          )}
                          <span className="block">
                            <p className="text-xs italic font-[300] text-stone-500  capitalize">
                              {item?.name}
                            </p>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {/* description */}
            <div className="py-5 text-darktext">
              <h2 className="text-[20px]  capitalize text-blue-600 font-[700] tracking-wider py-1">
                Description
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: hotel?.description,
                }}
                className="leading-6  mt-2"
              ></div>
            </div>
          </div>
          <div className="col-span-3 text-darktext">
            <div className=" rounded shadow-round p-5  space-y-3">
              <h2 className=" font-[700] text  ">Details</h2>
              <hr />
              <div className="space-y-2">
                <div>
                  <h4 className=" text-slate-500  text-xs flex items-center gap-1">
                    <span className="text-xl">
                      <GiEntryDoor />
                    </span>
                    <span className="">Check In Time</span>
                  </h4>
                  <p className="text-[14px] font-[400] ml-6">
                    {searchParams.get("fromDate")
                      ? formatDate(searchParams.get("fromDate")?.slice(0, 10)) +
                        ", " +
                        hotel?.checkInTime
                      : hotel?.checkInTime}
                  </p>
                </div>
                <div>
                  <h4 className=" text-slate-500  text-xs flex items-center gap-1">
                    <span className="text-xl">
                      <GiExitDoor />{" "}
                    </span>
                    <span className="">Check Out Time</span>
                  </h4>
                  <p className="text-[14px]  ml-6">
                    {searchParams.get("toDate")
                      ? formatDate(searchParams.get("toDate")?.slice(0, 10)) +
                        ", " +
                        hotel?.checkOutTime
                      : hotel?.checkOutTime}
                  </p>
                </div>
                {hotel?.distanceFromCity && (
                  <div>
                    <h4 className=" text-slate-500  text-xs flex items-center gap-1">
                      <span className="text-xl">
                        <MdLinearScale />{" "}
                      </span>
                      <span className="">Distance From City</span>
                    </h4>
                    <p className="text-[14px]  ml-6">
                      {hotel?.distanceFromCity + " Km "}
                    </p>
                  </div>
                )}
                {hotel?.carParkingSlots && (
                  <div>
                    <h4 className=" text-slate-500  text-xs flex items-center gap-1">
                      <span className="text-xl">
                        <AiFillCar />{" "}
                      </span>
                      <span className="">Car Parking Slots</span>
                    </h4>
                    <p className="text-[14px]  ml-6">
                      {hotel?.carParkingSlots + " Slots "}
                    </p>
                  </div>
                )}
                {hotel?.floorsCount && (
                  <div>
                    <h4 className=" text-slate-500  text-xs flex items-center gap-1">
                      <span className="text-xl">
                        <IoFootstepsOutline />{" "}
                      </span>
                      <span className="">Floors Count</span>
                    </h4>
                    <p className="text-[14px]  ml-6">
                      {hotel?.floorsCount + " Floor "}
                    </p>
                  </div>
                )}
                {hotel?.roomsCount && (
                  <div>
                    <h4 className=" text-slate-500  text-xs flex items-center gap-1">
                      <span className="text-xl">
                        <MdOutlineBed />{" "}
                      </span>
                      <span className="">Rooms Count</span>
                    </h4>
                    <p className="text-[14px]  ml-6">
                      {hotel?.roomsCount + " Rooms Available "}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4 animate-pulse">
          <div className="col-span-9">
            <div className="bg-light rounded-2xl p-5 mx-2 my-2 lg:my-0 lg:mx-0 text-darktext shadow-sm">
              <div className="flex justify-between">
                <div className="space-y-3">
                  <div className=" h-10 w-96 bg-gray-200 rounded-full "></div>
                  <div className="">
                    <p className="h-3 w-80 bg-gray-200 rounded-full"></p>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <p className=" flex gap-2 ">
                      <span className="h-4 w-4 bg-gray-200 rounded-full"></span>
                      <span className="h-4 w-4 bg-gray-200 rounded-full"></span>
                      <span className="h-4 w-4 bg-gray-200 rounded-full"></span>
                      <span className="h-4 w-4 bg-gray-200 rounded-full"></span>
                      <span className="h-4 w-4 bg-gray-200 rounded-full"></span>
                    </p>
                    <p className="flex gap-1 items-center h-4 w-60 bg-gray-200 rounded-full"></p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {/* share button */}
                  <p className="h-10 w-10 bg-gray-200 rounded-full"></p>
                  {/* like button */}
                  <p className="h-10 w-10 bg-gray-200 rounded-full"></p>
                </div>
              </div>
            </div>
            <div className=" py-2">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden mt-2">
                <div className="grid grid-cols-6 ">
                  <div className=" py-4 flex flex-1  justify-center items-center gap-2 px-5 ">
                    <span className="h-10 w-10 bg-gray-200 rounded"></span>
                    <span className="block space-y-2">
                      <p className="h-2 w-16 bg-gray-200 rounded"></p>
                      <p className="h-3 w-20 bg-gray-300 rounded"></p>
                    </span>
                  </div>
                  <div className=" py-4 flex flex-1  justify-center items-center gap-2 px-5 ">
                    <span className="h-10 w-10 bg-gray-200 rounded"></span>
                    <span className="block space-y-2">
                      <p className="h-2 w-16 bg-gray-200 rounded"></p>
                      <p className="h-3 w-20 bg-gray-300 rounded"></p>
                    </span>
                  </div>
                  <div className=" py-4 flex flex-1  justify-center items-center gap-2 px-5 ">
                    <span className="h-10 w-10 bg-gray-200 rounded"></span>
                    <span className="block space-y-2">
                      <p className="h-2 w-16 bg-gray-200 rounded"></p>
                      <p className="h-3 w-20 bg-gray-300 rounded"></p>
                    </span>
                  </div>
                  <div className=" py-4 flex flex-1  justify-center items-center gap-2 px-5 ">
                    <span className="h-10 w-10 bg-gray-200 rounded"></span>
                    <span className="block space-y-2">
                      <p className="h-2 w-16 bg-gray-200 rounded"></p>
                      <p className="h-3 w-20 bg-gray-300 rounded"></p>
                    </span>
                  </div>
                  <div className=" py-4 flex flex-1  justify-center items-center gap-2 px-5 ">
                    <span className="h-10 w-10 bg-gray-200 rounded"></span>
                    <span className="block space-y-2">
                      <p className="h-2 w-16 bg-gray-200 rounded"></p>
                      <p className="h-3 w-20 bg-gray-300 rounded"> </p>
                    </span>
                  </div>
                  <div className=" py-4 flex flex-1  justify-center items-center gap-2 px-5 ">
                    <span className="h-10 w-10 bg-gray-200 rounded"></span>
                    <span className="block space-y-2">
                      <p className="h-2 w-16 bg-gray-200 rounded"></p>
                      <p className="h-3 w-20 bg-gray-300 rounded"></p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* description */}
            <div className="py-5 space-y-2">
              <h2 className="h-5 w-40 bg-gray-400 rounded-full"></h2>
              <p className="w-full h-3  bg-gray-300 rounded"></p>
              <p className="w-full h-3  bg-gray-300 rounded"></p>
              <p className="w-full h-3  bg-gray-300 rounded"></p>
              <p className="w-full h-3  bg-gray-300 rounded"></p>
              <p className="w-1/2 h-3  bg-gray-300 rounded"></p>
            </div>
          </div>
          <div className="col-span-3 text-darktext">
            <div className="bg-white rounded-2xl shadow-sm p-5  space-y-3">
              <h2 className=" bg-gray-400 w-36 h-5 rounded-full"></h2>
              <div className="space-y-2">
                <div className="space-y-2">
                  <h4 className=" flex items-center gap-1">
                    <span className="h-4 w-4 bg-gray-200 rounded"></span>
                    <span className="h-2 w-16 bg-gray-200 rounded"></span>
                  </h4>
                  <p className="h-3 w-44 bg-gray-300 rounded"></p>
                </div>
                <div className="space-y-2">
                  <h4 className=" flex items-center gap-1">
                    <span className="h-4 w-4 bg-gray-200 rounded"></span>
                    <span className="h-2 w-16 bg-gray-200 rounded"></span>
                  </h4>
                  <p className="h-3 w-36 bg-gray-300 rounded"></p>
                </div>
                <div className="space-y-2">
                  <h4 className=" flex items-center gap-1">
                    <span className="h-4 w-4 bg-gray-200 rounded"></span>
                    <span className="h-2 w-16 bg-gray-200 rounded"></span>
                  </h4>
                  <p className="h-3 w-36 bg-gray-300 rounded"></p>
                </div>
                <div className="space-y-2">
                  <h4 className=" flex items-center gap-1">
                    <span className="h-4 w-4 bg-gray-200 rounded"></span>
                    <span className="h-2 w-16 bg-gray-200 rounded"></span>
                  </h4>
                  <p className="h-3 w-40 bg-gray-300 rounded"></p>
                </div>
                <div className="space-y-2">
                  <h4 className=" flex items-center gap-1">
                    <span className="h-4 w-4 bg-gray-200 rounded"> </span>
                    <span className="h-2 w-16 bg-gray-200 rounded"></span>
                  </h4>
                  <p className="h-3 w-36 bg-gray-300 rounded"></p>
                </div>
                <div className="space-y-2">
                  <h4 className=" flex items-center gap-1">
                    <span className="h-4 w-4 bg-gray-200 rounded"></span>
                    <span className="h-2 w-16 bg-gray-200 rounded"></span>
                  </h4>
                  <p className="h-3 w-36 bg-gray-300 rounded"></p>
                </div>
                <div className="space-y-2">
                  <h4 className=" flex items-center gap-1">
                    <span className="h-4 w-4 bg-gray-200 rounded"></span>
                    <span className="h-3 w-16 bg-gray-200 rounded"></span>
                  </h4>
                  <p className="h-3 w-44 bg-gray-300 rounded"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailsSection;
