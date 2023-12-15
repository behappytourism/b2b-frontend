import React, { useState } from "react";
import { RiArrowLeftRightFill } from "react-icons/ri";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { FaPlane, FaTimes } from "react-icons/fa";

function FlightFareModal({
  ele,
  isModal,
  setIsModal,
  handleClick,
  data,
  calculateDuration,
  setIsModalChanged,
}) {
  const [showConnections, setShowConnections] = useState(true);

  const handleShowConnections = () => {
    setShowConnections(!showConnections);
  };

  // console.log(ele,'ele');
  // console.log(segments,'segments');
  // console.log(data, "data");
  const firstSegment = ele.flightSegments[0];
  const secondSegment = ele.flightSegments[1];

  function segmentDuration(totalMinutes) {
    const mints = totalMinutes / 60;
    const hours = Math.floor(mints / 60);
    const minutes = Math.floor(mints % 60);
    return `${hours}h ${minutes}min`;
  }

  const segmentTime = (time) => {
    let newTime = new Date(time);
    const hours = newTime.getHours();
    const minutes = newTime.getMinutes();
    return `${hours}:${minutes}`;
  };

  const findFlightDurationSegments = (totalMinutes) => {
    const mints = totalMinutes / 60;
    const hours = Math.floor(mints / 60);
    const minutes = mints % 60;
    return `${hours}h ${minutes}min`;
  };

   //console.log(data, "data");

   const options = { day: 'numeric', month: 'short', year: 'numeric' };


  return (
    <div>
      <div className="h-full">
        <div className="w-[700px] h-[100%] bg-white shadow-lg overflow-y-auto">
          <div
            onClick={() => setIsModalChanged(false)}
            className="pl-4 pt-4 cursor-pointer"
          >
            <FaTimes size={25} color="black" />
          </div>
          <div className=" relative flex flex-col w-full bg-white outline-none focus:outline-none h-[700px]">
            {/*header*/}
            <div className=" p-5  border-slate-200 rounded-t">
              <div className="flex gap-3 text-black p-2">
                <h1 className="text-xs">・{data?.type}</h1>
                <h1 className="text-xs">・{data?.travelClass}</h1>
                <h1 className="text-xs">・{ele?.flightType}</h1>
                <h1 className="text-xs">
                  ・{data?.totalPassengers} Travellers
                </h1>
              </div>

              <div className="flex gap-3 text-balck p-2">
                <div className="text-lg">
                  <span className="text-black">{ele?.arrivalAirport}</span>
                </div>
                <div className="text-black p-1">
                  <RiArrowLeftRightFill />
                </div>
                <div>
                  <span className="text-black">{ele?.departureAirport}</span>
                </div>
              </div>
            </div>
            <div className="overflow-y-scroll">
              {data?.trips.map((dt) => {
                return (
                  <>
                    <div className="">
                      <div
                        className="h-20 w-full bg-red-50 flex justify-between cursor-pointer"
                        onClick={handleShowConnections}
                      >
                        <div className="flex gap-5 p-2">
                          <div className="p-1">
                            <img
                              className="h-10 w-10 p-1"
                              src={firstSegment?.airlineLogo}
                              alt=""
                            />
                            <h1 className="text-black text-xs">
                              {firstSegment?.airlineName}
                            </h1>
                          </div>

                          <div className="p-1 text-black text-md">
                        
                            <div className="flex gap-2">
                              <h1>{dt?.direction}</h1>
                              {dt?.flightSegments?.map((segment, segIndex) => (
                              <h1>{new Date(segment?.departureDate).toLocaleDateString('en-US', options)}</h1>
                              ))}
                            </div>
                          
                            <div className="flex gap-2 text-sm text-black">
                              <h1>{dt?.flightSegments[0]?.fromPlace} - </h1>
                              <h1>{dt?.flightSegments[0]?.toPlace}</h1>
                              {dt?.flightSegments?.map((segment, segIndex) => (
                              <p className="text-sm">
                                {" "}
                                {calculateDuration(
                                  segment?.departureDate,
                                  segment?.arrivalDate
                                )}
                              </p>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center items-center p-10">
                          {!showConnections ? (
                            <h1 className="text-black font-bold">
                              <AiOutlineUp />
                            </h1>
                          ) : (
                            <h1 className="text-black fort-bold">
                              <AiOutlineDown />
                            </h1>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="relative p-6 flex-auto ">
                      {showConnections ? (
                        <div className="">
                          {dt?.flightSegments?.map((segment, index) => {
                            return (
                              <div
                                key={index}
                                className="flex gap-5 text-black  "
                              >
                                <div>
                                  <div className="">
                                    <h1>
                                      {segmentTime(segment?.departureDate)}
                                    </h1>
                                  </div>
                                  <div className="pt-[70px] text-[8px] text-gray-400 font-bold">
                                    <h1>
                                      {segmentDuration(segment?.duration)}
                                    </h1>
                                  </div>

                                  <div className="pt-[200%]">
                                    <h1>{segmentTime(segment?.arrivalDate)}</h1>
                                  </div>

                                  {dt?.flightSegments?.length - 1 > index && (
                                    <div className="pt-[70px] text-[10px] text-gray-400">
                                      <h1 className=" text-[8px] text-gray-400 font-bold">
                                        {findFlightDurationSegments(
                                          dt?.layOverDurations[index]
                                        )}
                                      </h1>
                                    </div>
                                  )}
                                </div>

                                <div className="">
                                  <div className="w-3 h-3 rounded-full bg-gray-200 "></div>
                                  <div className="border-l-2  h-20 ml-[5px] "></div>
                                  <div className="">
                                    <img
                                      className="pr-2 w-5 h-5 "
                                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Plane_icon_nose_down.svg/2032px-Plane_icon_nose_down.svg.png"
                                      alt=""
                                    />
                                  </div>
                                  <div className="">
                                    <div className="border-l-2  h-20 ml-[5px]"></div>
                                    <div className="w-3 h-3 rounded-full bg-gray-200"></div>

                                    {dt?.flightSegments?.length - 1 > index && (
                                      <>
                                        <div>
                                          <div
                                            key={1}
                                            className="border-l-2  h-20 ml-[5px]"
                                          ></div>
                                          <div className="w-3 h-3 rounded-full border"></div>
                                          <div className="border-l-2  h-20 ml-[5px]"></div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="">
                                  <div>
                                    <div className="flex gap-2">
                                      <h1>{segment?.fromPlace}</h1>
                                      <h1>({segment?.from})</h1>
                                      <h1>{segment?.fromTerminal}</h1>
                                    </div>
                                    <div>
                                      <h1 className="text-xs text-gray-400">
                                        {segment?.fromAirport}
                                      </h1>
                                    </div>
                                  </div>

                                  <div className="pt-14">
                                    <div className="flex gap-2">
                                      <img
                                        className="w-7 h-7 rounded-full"
                                        src={segment?.airlineLogo}
                                        alt=""
                                      />
                                      <h1 className="text-sm mt-1">
                                        {segment?.airlineName}
                                      </h1>
                                      <h1 className="text-sm mt-1">
                                        {segment?.flightNumber}
                                      </h1>
                                    </div>
                                  </div>

                                  <div>
                                    <div className="pt-16 flex gap-2">
                                      <h1>{segment?.toPlace}</h1>
                                      <h1>({segment?.to})</h1>
                                      <h1>{segment?.toTerminal}</h1>
                                    </div>
                                    <div>
                                      <h1 className="text-xs text-gray-400">
                                        {segment?.toAirport}
                                      </h1>
                                    </div>
                                  </div>

                                  {ele?.flightSegments?.length - 1 > index && (
                                    <div className="pt-14 text-xs text-gray-300">
                                      <h1>Short layover</h1>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="text-black p-2 border border-gray-200 w-[100%] mt-4 rounded-xl">
                        <div className="p-4">
                          <h1 className="font-bold">Baggage Information:</h1>
                          <div className="flex gap-20 mt-4">
                            <div className="flex gap-2">
                              <h1 className="font-semibold text-gray-300">
                                Check-in:
                              </h1>
                              <h1 className="font-bold">
                                {dt?.fareDetails?.checkInBaggageWeight} kg
                              </h1>
                            </div>
                            <div className="flex gap-2">
                              <h1 className="font-semibold text-gray-300">
                                Cabin:
                              </h1>
                              <h1 className="font-bold">
                                {dt?.fareDetails?.cabinBaggageWeight} kg
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>

            <div className=" flex items-center justify-between  border-solid h-[15%] border-slate-200 rounded-b border-t pt-2">
              <div className="flex text-black p-2 font-bold gap-2 text-lg">
                <h1>{data?.netFare}</h1>
                <h1>{data?.currency}</h1>
              </div>
              <div className=" flex items-center">
                <button
                  onClick={() => handleClick(data?.trips[0]?.fareDetails?.fareKey)}
                  className="bg-main text-white text-sm font-semibold h-10 w-40 rounded mr-5"
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightFareModal;
