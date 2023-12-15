import React, { useEffect, useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { TimeRanges } from "./filters";

const FlightFilter = ({
  setSelectedStops,
  flightFilter,
  selectedStops,
  selectedDepartureTimes,
  setSelectedDepartureTimes,
  setSelectedAirline,
  selectedAirline,
  selectedTripDuration,
  setSelectedTripDuration,
  setSelectedTripFare,
  selectedTripFare,
  setSelectedTripLayover,
  selectedTripLayover,
  flightsLength,
  renderFlightsLength,
}) => {
  const [showFilter, setShowFilter] = useState(true);
  const [filters, setFilters] = useState({
    departureTimeRange: [...TimeRanges],
    arrivalTimeRange: [...TimeRanges],
  });

  const [flightFilters, setFlightFilters] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  // Add flightFilter to flightFilters when it changes
  useEffect(() => {
    if (flightFilter) {
      setFlightFilters(flightFilter);
    }
  }, [flightFilter]);

  const handleShowSearch = () => {
    setShowFilter(!showFilter);
  };

  const [firstSelectedOption, setFirstSelectedOption] = useState("");
  const [secondSelectedOption, setSecondSelectedOption] = useState("");
  const [thirdSelectedOption, setThirdSelectedOption] = useState("");

  const handleFirstOptionClick = (option) => {
    // Check if the option is already selected, then toggle it
    if (firstSelectedOption === option) {
      setFirstSelectedOption("");
    } else {
      setFirstSelectedOption(option);
    }
  };

  const handleSecondOptionClick = (option) => {
    // Check if the option is already selected, then toggle it
    if (secondSelectedOption === option) {
      setSecondSelectedOption("");
    } else {
      setSecondSelectedOption(option);
    }
  };

  const handleThirdOptionClick = (option) => {
    // Check if the option is already selected, then toggle it
    if (thirdSelectedOption === option) {
      setThirdSelectedOption("");
    } else {
      setThirdSelectedOption(option);
    }
  };

  const TimeCard = ({ data }) => {
    return (
      <>
        <div className="flex flex-col  bg-transparent p-2 items-center  rounded-md">
          <span className="text-[25px]">{data?.icon}</span>
          <span>{data?.from}</span>
          <span className="p-0 bg-black  h-[2px] w-[8px] my-1"></span>
          <span>{data?.to}</span>
        </div>
      </>
    );
  };

  const handleDprtrTimeRangeChange = (index) => {
    const filter = { ...filters };
    const dptrRange = filter.departureTimeRange;

    dptrRange[index] = {
      ...dptrRange[index],
      isSelected: !dptrRange[index].isSelected,
    };
    setFilters({
      ...filter,
      dptrRange,
    });
  };

  const handleArvlTimeRangeChange = (index) => {
    const filter = { ...filters };
    const arvlRange = filter.arrivalTimeRange;

    arvlRange[index] = {
      ...arvlRange[index],
      isSelected: !arvlRange[index].isSelected,
    };
    setFilters({
      ...filter,
      arvlRange,
    });
  };

  const FilterDD = ({ label, index, children }) => {
    const [show, setShow] = useState(false);
    return (
      <>
        <div>
          <div
            className="border-[1px] p-1 flex justify-between items-center"
            onClick={() => {
              setShow(!show);
            }}
          >
            <div>{label} </div>
            <span className="text-[30px] cursor-pointer">
              <MdOutlineArrowDropDown />
            </span>
          </div>
          {show && (
            <div className="border-[1px] border-t-0 p-2">{children}</div>
          )}
        </div>
      </>
    );
  };

  const handleStopChange = (event) => {
    // const value = event.currentTarget.getAttribute("data-value");
    const value = parseInt(event.currentTarget.getAttribute("data-value"), 10);

    //   console.log(value, "value");
    if (selectedStops.includes(value)) {
      setSelectedStops(selectedStops.filter((stop) => stop !== value));
    } else {
      setSelectedStops([...selectedStops, value]);
    }
  };

  const handleAirlineChange = (event) => {
    const { value } = event.target;
    if (selectedAirline.includes(value)) {
      setSelectedAirline(selectedAirline.filter((name) => name !== value));
    } else {
      setSelectedAirline([...selectedAirline, value]);
    }
  };

  const handleDepartureTimeChange = (event) => {
    const { value } = event.target;
    if (selectedDepartureTimes.includes(value)) {
      setSelectedDepartureTimes(
        selectedDepartureTimes.filter((time) => time !== value)
      );
    } else {
      setSelectedDepartureTimes([...selectedDepartureTimes, value]);
    }
  };

  const maxTripDurationInSeconds = flightFilters?.maxTripDuration;
  const maxTripDurationInHours = Math.round(maxTripDurationInSeconds / 3600);

  //console.log(maxTripDurationInHours)

  const minTripDurationInSeconds = flightFilters?.minTripDuration;
  const minTripDurationInHours = Math.round(minTripDurationInSeconds / 3600);

  const maxLayOverDuration = flightFilters?.layOverDuration;
  const maxLayOverDurationInHours = Math.round(maxLayOverDuration / 3600);

  const handleClearFilterClick = () => {
    setSelectedTripFare(flightFilters?.maxFare);
    setSelectedTripLayover(maxLayOverDurationInHours);
    setSelectedTripDuration(maxTripDurationInHours);
  };

  //console.log(selectedTripDuration);

  return (
    <div className=" rounded-md overflow-hidden bg-white px-4  py-2">
      {flightFilters.length === 0 ? (
        // Render something when flightFilters is empty
        <div className="animate-pulse w-full">
          <div className=" flex flex-col gap-2 bg-white">
            <div>
              <div className="py-3 border p-2 border-gray-100 rounded-lg">
                <div className="flex justify-between">
                  <div className="flex gap-2 text-center items-center">
                    <h1 className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                      {renderFlightsLength}
                    </h1>
                    <h1 className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                      of
                    </h1>
                    <h1 className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                      {flightsLength} flights
                    </h1>
                  </div>
                  <h1
                    onClick={handleClearFilterClick}
                    className="text-sm text-transparent mt-2 bg-gray-100 rounded"
                  >
                    Clear filters
                  </h1>
                </div>
                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                  Stops
                </p>
                {/* {flightFilters?.stops?.map((stop, stopIndex) => {
              return (
                <> */}
                {/* <button
                      className={`text-center items-center border ${
                        isClicked ? "border-black" : "border-gray-100"
                      } mt-2 p-1 rounded-lg`}
                     // value={1}
                     data-value={
                        stop?.name === "1 Stop"
                          ? "2"
                          : stop?.name === "Non Stop"
                          ? "0"
                          : stop?.name === "2 Stop"
                          ? "2"
                          : ""
                      }
                      onClick={handleStopChange}
                    >
                      <p>{stop?.name || "1 Stop"}</p>
                      <p className="text-sm text-gray-300">{stop?.fare} AED</p>
                    </button> */}
           <div className="flex justify-between">
                <button
                  className="text-sm text-transparent mt-2 bg-gray-100 rounded"
                  // value={1}
                  data-value={0}
                  onClick={(event) => {
                    handleStopChange(event);
                    handleSecondOptionClick("second");
                  }}
                >
                  <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                    Non Stop
                  </p>
                  <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                    {flightFilters &&
                      flightFilters.stops &&
                      flightFilters?.stops[0]?.fare}{" "}
                    AED
                  </p>
                </button>

                <button
                  className="text-sm text-transparent mt-2 bg-gray-100 rounded"
                  // value={1}
                  data-value={1}
                  onClick={(event) => {
                    handleStopChange(event);
                    handleFirstOptionClick("first");
                  }}
                >
                  <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                    1 Stop
                  </p>
                  <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                    {flightFilters &&
                      flightFilters.stops &&
                      (flightFilters.stops[1] || flightFilters.stops[0])
                        ?.fare}{" "}
                    AED
                  </p>
                </button>

                <button
                  className="text-sm text-transparent mt-2 bg-gray-100 rounded"
                  // value={1}
                  data-value={2}
                  onClick={(event) => {
                    handleStopChange(event);
                    handleThirdOptionClick("third");
                  }}
                >
                  <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                    2 Stops
                  </p>
                  <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                    {flightFilters &&
                      flightFilters.stops &&
                      (
                        flightFilters.stops[2] ||
                        flightFilters.stops[1] ||
                        flightFilters.stops[0]
                      )?.fare}{" "}
                    AED
                  </p>
                </button>
                </div>
                {/* <li className="flex gap-2 cursor-pointer text-gray-400 font-light text-sm">
                      <input
                        type="checkbox"
                        value={stop?.id || 1}
                        onChange={handleStopChange}
                        className="rounded-none border-gray-100 border outline-none"
                      />
                      <span>{stop?.name || "1 Stop"}</span>
                    </li> */}

                {/* </>
              );
            })} */}
              </div>
              <div className="py-3 ">
                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                  Departure time
                </p>
                <ul className="space-y-1">
                  <li className="flex gap-2 cursor-pointer text-gray-400 font-light text-sm">
                    <input
                      type="checkbox"
                      value="night"
                      checked={selectedDepartureTimes.includes("night")}
                      onChange={handleDepartureTimeChange}
                      className="text-sm text-transparent mt-2 bg-gray-100 rounded"
                    />
                    <span className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                      Afternoon
                    </span>
                  </li>
                  <li className="flex gap-2 cursor-pointer text-gray-400 font-light text-sm">
                    <input
                      type="checkbox"
                      value="afternoon"
                      onChange={handleDepartureTimeChange}
                      className="text-sm text-transparent mt-2 bg-gray-100 rounded"
                    />
                    <span className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                      Evening
                    </span>
                  </li>
                  <li className="flex gap-2 cursor-pointer text-gray-400 font-light text-sm">
                    <input
                      type="checkbox"
                      value="evening"
                      onChange={handleDepartureTimeChange}
                      className="text-sm text-transparent mt-2 bg-gray-100 rounded"
                    />
                    <span className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                      Night
                    </span>
                  </li>
                </ul>
              </div>
              <div className="py-3 w-full ">
                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                  Airlines
                </p>
                {flightFilters?.airlines?.map((airline, airlineIndex) => {
                  return (
                    <>
                      <ul className="space-y-1 w-full">
                        <li className="flex gap-2 cursor-pointer w-full text-gray-400 font-light text-sm">
                          <input
                            type="text"
                            value={airline?.airlineName}
                            className="rounded-none border-gray-100 border outline-none"
                            onChange={handleAirlineChange}
                          />
                          <div className="flex justify-between w-full">
                            <h1 className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                              Air Arabia{airline?.airlineName}
                            </h1>
                            <h1 className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                              256 AED
                            </h1>
                          </div>
                        </li>
                      </ul>
                    </>
                  );
                })}
              </div>
              <div className="py-3 ">
                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                  One way price
                </p>
                <div className="flex gap-3">
                  <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                    Upto
                  </p>
                  <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                    256 AED
                  </p>
                </div>
                <input
                  type="text"
                  className="text-sm text-transparent mt-2 bg-gray-100 rounded"
                  min={flightFilters?.minFare}
                  max={flightFilters?.maxFare}
                  value={selectedTripFare}
                  onChange={(event) =>
                    setSelectedTripFare(Number(event.target.value))
                  }
                />
              </div>
              <div className="py-3 ">
                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                  Trip duration
                </p>
                <div className="flex gap-3">
                  <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                    Upto
                  </p>
                  <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                    32 hours
                  </p>
                </div>
                <input
                  type="text"
                  className="text-sm text-transparent mt-2 bg-gray-100 rounded"
                  min={minTripDurationInHours}
                  max={maxTripDurationInHours + 1}
                  value={selectedTripDuration}
                  onChange={(event) =>
                    setSelectedTripDuration(Number(event.target.value))
                  }
                />
              </div>

              <div className="py-3 ">
                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                  Layover duration
                </p>
                <div className="flex gap-3">
                  <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                    Upto
                  </p>
                  <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                    36 hours
                  </p>
                </div>
                <input
                  type="text"
                  className="text-sm text-transparent mt-2 bg-gray-100 rounded"
                  min={1}
                  max={maxLayOverDurationInHours}
                  value={selectedTripLayover}
                  onChange={(event) =>
                    setSelectedTripLayover(Number(event.target.value))
                  }
                />
              </div>

              <div className="py-3 ">
                <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                  Layover duration
                </p>
                <div className="flex gap-3">
                  <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                    Upto
                  </p>
                  <p className="text-sm text-transparent mt-2 bg-gray-100 rounded">
                    36 hours
                  </p>
                </div>
                <input
                  type="text"
                  className="text-sm text-transparent mt-2 bg-gray-100 rounded"
                  min={1}
                  max={maxLayOverDurationInHours}
                  value={selectedTripLayover}
                  onChange={(event) =>
                    setSelectedTripLayover(Number(event.target.value))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" flex flex-col gap-2 bg-white">
          <div>
            <div className="py-3 ">
              <div className="flex justify-between">
                <div className="flex gap-2 text-center items-center">
                  <h1>{renderFlightsLength}</h1>
                  <h1 className="text-gray-300">of</h1>
                  <h1 className="text-gray-300">{flightsLength} flights</h1>
                </div>
                <h1
                  onClick={handleClearFilterClick}
                  className="text-blue-400 cursor-pointer text-sm mt-1"
                >
                  Clear filters
                </h1>
              </div>
              <p className="font-bold tracking-tight text-gray-400">Stops</p>
              {/* {flightFilters?.stops?.map((stop, stopIndex) => {
              return (
                <> */}
              <ul className="space-y-1 flex justify-between items-center text-center">
                {/* <button
                      className={`text-center items-center border ${
                        isClicked ? "border-black" : "border-gray-100"
                      } mt-2 p-1 rounded-lg`}
                     // value={1}
                     data-value={
                        stop?.name === "1 Stop"
                          ? "2"
                          : stop?.name === "Non Stop"
                          ? "0"
                          : stop?.name === "2 Stop"
                          ? "2"
                          : ""
                      }
                      onClick={handleStopChange}
                    >
                      <p>{stop?.name || "1 Stop"}</p>
                      <p className="text-sm text-gray-300">{stop?.fare} AED</p>
                    </button> */}

                <button
                  className={`text-center items-center border ${
                    secondSelectedOption === "second"
                      ? "border-black"
                      : "border-gray-100"
                  } mt-2 p-1 rounded-lg`}
                  // value={1}
                  data-value={0}
                  onClick={(event) => {
                    handleStopChange(event);
                    handleSecondOptionClick("second");
                  }}
                >
                  <p>Non Stop</p>
                  <p className="text-sm text-gray-300">
                    {flightFilters &&
                      flightFilters.stops &&
                      flightFilters?.stops[0]?.fare}{" "}
                    AED
                  </p>
                </button>

                <button
                  className={`text-center items-center border ${
                    firstSelectedOption === "first"
                      ? "border-black"
                      : "border-gray-100"
                  } mt-2 p-1 rounded-lg`}
                  // value={1}
                  data-value={1}
                  onClick={(event) => {
                    handleStopChange(event);
                    handleFirstOptionClick("first");
                  }}
                >
                  <p>1 Stop</p>
                  <p className="text-sm text-gray-300">
                    {flightFilters &&
                      flightFilters.stops &&
                      (flightFilters.stops[1] || flightFilters.stops[0])
                        ?.fare}{" "}
                    AED
                  </p>
                </button>

                <button
                  className={`text-center items-center border ${
                    thirdSelectedOption === "third"
                      ? "border-black"
                      : "border-gray-100"
                  } mt-2 p-1 rounded-lg`}
                  // value={1}
                  data-value={2}
                  onClick={(event) => {
                    handleStopChange(event);
                    handleThirdOptionClick("third");
                  }}
                >
                  <p>2 Stops</p>
                  <p className="text-sm text-gray-300">
                    {flightFilters &&
                      flightFilters.stops &&
                      (
                        flightFilters.stops[2] ||
                        flightFilters.stops[1] ||
                        flightFilters.stops[0]
                      )?.fare}{" "}
                    AED
                  </p>
                </button>

                {/* <li className="flex gap-2 cursor-pointer text-gray-400 font-light text-sm">
                      <input
                        type="checkbox"
                        value={stop?.id || 1}
                        onChange={handleStopChange}
                        className="rounded-none border-gray-100 border outline-none"
                      />
                      <span>{stop?.name || "1 Stop"}</span>
                    </li> */}
              </ul>
              {/* </>
              );
            })} */}
            </div>
            <div className="py-3 ">
              <p className="font-bold tracking-tight text-gray-400">
                Departure time
              </p>
              <ul className="space-y-1">
                <li className="flex gap-2 cursor-pointer text-gray-400 font-light text-sm">
                  <input
                    type="checkbox"
                    value="night"
                    onChange={handleDepartureTimeChange}
                    className="rounded-none border-gray-100 border outline-none"
                  />
                  <span>Night</span>
                </li>
                <li className="flex gap-2 cursor-pointer text-gray-400 font-light text-sm">
                  <input
                    type="checkbox"
                    value="morning"
                    onChange={handleDepartureTimeChange}
                    className="rounded-none border-gray-100 border outline-none"
                  />
                  <span>Morning</span>
                </li>
                <li className="flex gap-2 cursor-pointer text-gray-400 font-light text-sm">
                  <input
                    type="checkbox"
                    value="afternoon"
                    onChange={handleDepartureTimeChange}
                    className="rounded-none border-gray-100 border outline-none"
                  />
                  <span>Afternoon</span>
                </li>
                <li className="flex gap-2 cursor-pointer text-gray-400 font-light text-sm">
                  <input
                    type="checkbox"
                    value="evening"
                    onChange={handleDepartureTimeChange}
                    className="rounded-none border-gray-100 border outline-none"
                  />
                  <span>Evening</span>
                </li>
              </ul>
            </div>
            <div className="py-3 w-full ">
              <p className="font-bold tracking-tight text-gray-400">Airlines</p>
              {flightFilters?.airlines?.map((airline, airlineIndex) => {
                return (
                  <>
                    <ul className="space-y-1 w-full">
                      <li className="flex gap-2 cursor-pointer w-full text-gray-400 font-light text-sm">
                        <input
                          type="checkbox"
                          value={airline?.airlineName}
                          className="rounded-none border-gray-100 border outline-none"
                          onChange={handleAirlineChange}
                        />
                        <div className="flex justify-between w-full">
                          <h1>{airline?.airlineName}</h1>
                          <h1>{airline?.fare} AED</h1>
                        </div>
                      </li>
                    </ul>
                  </>
                );
              })}
            </div>
            <div className="py-3 ">
              <p className="font-bold tracking-tight text-gray-400">
                One way price
              </p>
              <div className="flex gap-3">
                <p className="text-gray-200">Upto</p>
                <p className="font-medium">{selectedTripFare} AED</p>
              </div>
              <input
                type="range"
                className="rounded-none border-gray-100 border outline-none w-full"
                min={flightFilters?.minFare}
                max={Math.round(flightFilters?.maxFare + 1)}
                value={selectedTripFare}
                onChange={(event) =>
                  setSelectedTripFare(Number(event.target.value))
                }
              />
            </div>
            <div className="py-3 ">
              <p className="font-bold tracking-tight text-gray-400">
                Trip duration
              </p>
              <div className="flex gap-3">
                <p className="text-gray-200">Upto</p>
                <p className="font-medium">
                  {Math.round(selectedTripDuration)} hours
                </p>
              </div>
              <input
                type="range"
                className="rounded-none border-gray-100 border outline-none w-full"
                min={minTripDurationInHours}
                max={maxTripDurationInHours + 1}
                value={selectedTripDuration}
                onChange={(event) =>
                  setSelectedTripDuration(Number(event.target.value))
                }
              />
            </div>

            <div className="py-3 ">
              <p className="font-bold tracking-tight text-gray-400">
                Layover duration
              </p>
              <div className="flex gap-3">
                <p className="text-gray-200">Upto</p>
                <p className="font-medium">{selectedTripLayover} hours</p>
              </div>
              <input
                type="range"
                className="rounded-none border-gray-100 border outline-none w-full"
                min={1}
                max={maxLayOverDurationInHours}
                value={selectedTripLayover}
                onChange={(event) =>
                  setSelectedTripLayover(Number(event.target.value))
                }
              />
            </div>
          </div>
        </div>
      )}
      {/* <div className="border-[1px] p-2 flex flex-col gap-2 justify-start text-left items-start my-4 rounded-md">
        <h2 className=" text-blue-600 font-bold">Onward </h2>
        <h2 className="text-blue-500 font-semibold">Departure Time</h2>
        <div className="grid grid-cols-4 gap-2 w-[100%] ">
          {filters?.departureTimeRange?.map((ele, i) => (
            <>
              <button
                onClick={() => {
                  handleDprtrTimeRangeChange(i);
                }}
                className={`rounded-md transform hover:translate-y-[-8px] hover:text-blue-500 overflow-hidden bg-blue-50 border-2 hover:border-blue-200 border-blue-50 ${
                  ele.isSelected && "bg-blue-200 text-blue-500 border-2 "
                }`}
              >
                <TimeCard data={ele} />
              </button>
            </>
          ))}
        </div>
        <h2 className="text-blue-500 font-semibold">Arrival Time</h2>
        <div className="grid grid-cols-4 gap-2 w-[100%]">
          {filters?.arrivalTimeRange?.map((ele, i) => (
            <>
              <button
                onClick={() => {
                  handleArvlTimeRangeChange(i);
                }}
                className={`rounded-md  hover:text-blue-500 transform hover:translate-y-[-8px] overflow-hidden bg-blue-50 ${
                  ele.isSelected && "bg-blue-200 text-blue-500"
                }`}
              >
                <TimeCard data={ele} />
              </button>
            </>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default FlightFilter;
