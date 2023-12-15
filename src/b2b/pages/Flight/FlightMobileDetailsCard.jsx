import React, { useEffect, useState } from "react";
import FlightFareModal from "./FlightFareModal";

function FlightMobileDetailsCard({
  ele,
  firstSegment,
  secondSegment,
  data,
  calculateDuration,
  handleClick,
}) {
  const [isModal, setIsModal] = useState(false);
  const [isModalChanged, setIsModalChanged] = useState(true);

  const handleModal = () => {
    setIsModal(true);
  };

  //console.log(isModalChanged, "slamd");

  useEffect(() => {
    setIsModal(false);
    // console.log(isModal, "usefefecet")
  }, [isModalChanged]);

  useEffect(() => {
    setIsModalChanged(true);
    // console.log(isModalChanged, "is modal changed usefefecet")
  }, [isModal]);

  const place = ele?.flightSegments[0].from;

  function formatDateString(dateStr) {
    // Create a Date object from the ISO date string
    const date = new Date(dateStr);

    // Define an array of month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get the month and day parts
    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    // Create the formatted date string
    const formattedDate = `${month} ${day}`;

    return formattedDate;
  }

  return (
    <>
      <div className="flex" onClick={handleModal}>
        <div className="w-3/12">
          <img
            src={firstSegment?.airlineLogo}
            alt=""
            className="h-[50px] w-[80px]"
          />
          <div className="">
            <p className="text-gray-400">{firstSegment?.airlineName}</p>
            <p className="text-xs uppercase">{firstSegment?.flightNumber}</p>
          </div>
        </div>
        <div className="w-3/12 text-center">
          <div>
            <div className="text-lg text-gray-400 tracking-tight">
              {" "}
              {firstSegment?.departureDate.split("T")[1].split(":")[0]}:
              {firstSegment?.departureDate.split("T")[1].split(":")[1]}{" "}
            </div>

            <div className="text-xs">
              <p className="">
                {calculateDuration(
                  firstSegment?.departureDate,
                  secondSegment?.arrivalDate || firstSegment?.arrivalDate
                )}
              </p>
              <hr className="w-[64%] ml-4" />

              {/* <p className="text-center">{firstSegment.from} - {firstSegment.to}</p> */}
              {ele?.flightSegments.map((segments, index) => (
                <div key={index}>
                  <p>
                    {segments.from} - {segments.to}
                  </p>
                </div>
              ))}
              {/* <p className="text-center">{secondSegment.from} - {secondSegment.to}</p> */}
            </div>

            <div className="text-lg text-gray-400 tracking-tight">
              {" "}
              {secondSegment?.arrivalDate.split("T")[1].split(":")[0] ||
                firstSegment?.arrivalDate.split("T")[1].split(":")[0]}
              :
              {secondSegment?.arrivalDate.split("T")[1].split(":")[1] ||
                firstSegment?.arrivalDate.split("T")[1].split(":")[1]}{" "}
            </div>
            {new Date(firstSegment?.departureDate).getDate() !==
              new Date(firstSegment?.arrivalDate).getDate() && (
              <p className="text-xs">
                {formatDateString(
                  new Date(firstSegment?.arrivalDate)
                    .toISOString()
                    .split("T")[0]
                )}
              </p>
            )}
          </div>
        </div>
      </div>
      <div
        onClick={handleModal}
        className=" grid-cols-12 hidden place-items-center cursor-default mb-8 mt-1"
        data-te-target="#rightTopModal"
      >
        <div className="col-span-2">
          <div className="flex gap-2 items-center">
            <div className="">
              <img
                src={firstSegment?.airlineLogo}
                alt=""
                className="h-[35px]"
              />
            </div>
            <div className="">
              <p className="text-gray-400">{firstSegment?.airlineName}</p>
              <p className="text-xs uppercase">{firstSegment?.flightNumber}</p>
            </div>
          </div>
          {/* <p className="text-xs font-semibold text-blue-600 pt-1">
        Flight Details
      </p> */}
        </div>
        <div className="col-span-1 text-center">
          <div className="text-lg text-gray-400 tracking-tight">
            {" "}
            {firstSegment?.departureDate.split("T")[1].split(":")[0]}:
            {firstSegment?.departureDate.split("T")[1].split(":")[1]}{" "}
          </div>
        </div>
        <div className="col-span-2">
          <div className="text-xs">
            <p className="text-center">
              {calculateDuration(
                firstSegment?.departureDate,
                secondSegment?.arrivalDate || firstSegment?.arrivalDate
              )}
            </p>
            <hr />

            {/* <p className="text-center">{firstSegment.from} - {firstSegment.to}</p> */}
            {ele?.flightSegments.map((segments, index) => (
              <div key={index}>
                <p>
                  {segments.from} - {segments.to}
                </p>
              </div>
            ))}
            {/* <p className="text-center">{secondSegment.from} - {secondSegment.to}</p> */}
          </div>
        </div>
        <div className="col-span-1 text-center">
          <div className="text-lg text-gray-400 tracking-tight">
            {" "}
            {secondSegment?.arrivalDate.split("T")[1].split(":")[0] ||
              firstSegment?.arrivalDate.split("T")[1].split(":")[0]}
            :
            {secondSegment?.arrivalDate.split("T")[1].split(":")[1] ||
              firstSegment?.arrivalDate.split("T")[1].split(":")[1]}{" "}
          </div>
          {new Date(firstSegment?.departureDate).getDate() !==
            new Date(firstSegment?.arrivalDate).getDate() && (
            <p className="text-xs">
              {formatDateString(
                new Date(firstSegment?.arrivalDate).toISOString().split("T")[0]
              )}
            </p>
          )}
        </div>

        {isModal && (
          <div className="flex justify-end fixed inset-y-0 right-0 z-50 w-[100%] h-[100vh] bg-white  shadow-lg overflow-y-auto temp_lightglass">
            <FlightFareModal
              ele={ele}
              isModal={isModal}
              setIsModal={setIsModal}
              handleClick={handleClick}
              data={data}
              calculateDuration={calculateDuration}
              setIsModalChanged={setIsModalChanged}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default FlightMobileDetailsCard;
