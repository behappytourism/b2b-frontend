import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useHandleClickOutside } from "../../../../hooks";
import DatePicker from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  addEnquiry,
  addHandleNewRow,
  handleOnAgeChange,
  handleOnChange,
} from "../../../../redux/slices/hotelSlice";
import axios from "../../../../axios";
import Datalist from "../../../components/Cards/Datalist";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import moment from "moment/moment";
import { config } from "../../../../constants";

function HotelCard({
  setFilters,
  setAvailableHotel,
  hotelBackground,
  isHomeDataLoading,
  setIsHomeDataLoading,
}) {
  // Hotel Card
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [noOfNights, setNoOfNights] = useState(0);

  const [locality, setLocality] = useState(searchParams.get("locality") || "");
  const [adultLength, setAdultLength] = useState(1);
  const [childLength, setChildLength] = useState(0);
  const [datalist, setDatalist] = useState(false);
  const [value, setValue] = useState(searchParams.get("localityValue") || "");
  const [research, setResearch] = useState(false);
  const [paxDropdown, setPaxDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState({});
  const [isHotel, setIsHotel] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    id: searchParams.get("searchQuery")
      ? JSON.parse(searchParams.get("searchQuery")).id
      : "",
    suggestionType: searchParams.get("searchQuery")
      ? JSON.parse(searchParams.get("searchQuery")).suggestionType
      : "",
  });
  const [country, setCountry] = useState("");
  const [priceType, setPriceType] = useState(
    searchParams.get("priceType") ? searchParams.get("priceType") : "static"
  );
  const paxDropdownWrapperRef = useRef();
  useHandleClickOutside(paxDropdownWrapperRef, () => setPaxDropdown(false));
  const dropdownWrapperRef = useRef();
  useHandleClickOutside(dropdownWrapperRef, () => setDatalist(false));
  const { rows, enquiry, numOfRooms } = useSelector((state) => state.hotel);

  useEffect(() => {
    if (searchParams.get("fromDate") && searchParams.get("toDate")) {
      setFromDate(new Date(searchParams.get("fromDate")));
      setToDate(new Date(searchParams.get("toDate")));
      handleNoOfNights(
        new Date(searchParams.get("fromDate")),
        new Date(searchParams.get("toDate"))
      );
    } else {
      setFromDate(new Date(new Date().setDate(new Date().getDate() + 1)));
      setToDate(new Date(new Date().setDate(new Date().getDate() + 3)));
      handleNoOfNights(
        new Date(new Date().setDate(new Date().getDate() + 1)),
        new Date(new Date().setDate(new Date().getDate() + 3))
      );
    }
  }, []);

  useEffect(() => {
    handleNoOfNights(fromDate, toDate);
  }, [fromDate, toDate]);

  useEffect(() => {
    if (Date.parse(fromDate) >= Date.parse(toDate)) {
      setToDate(
        new Date(new Date(fromDate).setDate(new Date(fromDate).getDate() + 3))
      );
      handleNoOfNights(
        fromDate,
        new Date(new Date(fromDate).setDate(new Date(fromDate).getDate() + 3))
      );
    }
  }, [fromDate]);

  const handleChange = ({ value, name, index }) => {
    dispatch(
      handleOnChange({
        value,
        name,
        index,
      })
    );
  };
  useEffect(() => {
    const val = rows?.reduce((acc, item) => {
      return acc + item?.noOfAdults;
    }, 0);
    setAdultLength(val);
    const val2 = rows?.reduce((acc, item) => {
      return acc + item?.noOfChildren;
    }, 0);
    setChildLength(val2);
  }, [rows]);
  const handleFocus = (e) => {
    setDatalist(true);
    setLocality("");
  };
  useEffect(() => {
    !locality && setValue("");
  }, [locality]);

  const { token } = useSelector((state) => state.agents);
  const { countries } = useSelector((state) => state.home);

  useEffect(() => {
    if (value.length > 2) {
      getSearchSuggestions(value);
    }
  }, [value]);
  const getSearchSuggestions = async (value) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/b2b/hotels/availabilities/search/suggestions?search=${value}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setSuggestions(response?.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err?.response?.data);
      setIsLoading(false);
    }
  };

  const handleNoOfNights = (fromdate, todate) => {
    const diffTime = Math.abs(new Date(todate) - new Date(fromdate));
    const diffDate = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setNoOfNights(diffDate);
  };

  return (
    <>
      <div className=" relative">
        {!isHomeDataLoading ? (
          <div className="absolute top-0 bottom-0 left-0 right-0">
            <Carousel
              infiniteLoop
              autoPlay
              showThumbs={false}
              interval={5000}
              showArrows={false}
              stopOnHover
              swipeable={false}
              showIndicators={false}
              showStatus={false}
            >
              {hotelBackground?.length > 0
                ? hotelBackground?.map((item, index) => {
                    return (
                      <div key={index} className="h-[521px] relative">
                        <img
                          src={config.SERVER_URL + item}
                          alt="banner"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    );
                  })
                : hotelBackground?.map((item, index) => {
                    return (
                      <div className="">
                        <img src={item} alt="banner" className="object-cover" />
                      </div>
                    );
                  })}
            </Carousel>
          </div>
        ) : (
          ""
        )}

        <div className="">
          <div className=" max-w-screen-sm mx-auto  flex py-5">
            <div className="relative w-full max-w-md bg-white shadow mx-2 p-5 py-10 rounded-lg ">
              <div className=" text-white space-y-5">
                <div ref={dropdownWrapperRef} className="w-full ">
                  <span className=" bottom-full flex justify-start text-xs font-semibold text-gray-400 rounded pl-3 pb-1">
                    Destination/Property Name
                  </span>
                  <div className="relative w-full  px-3  hover:border-blue-500 focus-within:border-green-500 rounded-lg">
                    <div className="w-full h-8  ">
                      <input
                        className="border px-2   outline-none bg-white rounded placeholder:text-gray-200 text-sm text-gray-400  h-full text-left w-full capitalize"
                        type="text"
                        placeholder="choose one"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onFocus={handleFocus}
                      />
                    </div>
                    <Datalist
                      datalist={datalist}
                      suggestions={suggestions}
                      value={value}
                      setLocality={setLocality}
                      setDatalist={setDatalist}
                      setValue={setValue}
                      locality={locality}
                      isLoading={isLoading}
                      setIsHotel={setIsHotel}
                      setSearchQuery={setSearchQuery}
                    />
                  </div>
                </div>
                <div className="flex  items-center px-3 gap-1 ">
                  <div className="">
                    <span className=" bottom-full flex justify-start text-xs font-semibold text-gray-400 rounded  pb-1">
                      Check-in Date
                    </span>
                    <div className="relative w-full    hover:border-blue-500 focus-within:border-green-500 rounded-lg">
                      <div className="w-full h-8  ">
                        <DatePicker
                        format="DD/MM/YYYY"
                          mode="single"
                          minDate={
                            new Date(new Date().setDate(new Date().getDate()))
                          }
                          value={fromDate}
                          onChange={(date) => {
                            const d = new Date(date);
                            console.log(
                              new Date(d).toISOString().slice(0, 10),
                              "date onchange",
                              date
                            );
                            setFromDate(d);
                            dispatch(
                              addEnquiry({
                                ...enquiry,
                                fromDate: fromDate,
                              })
                            );
                            handleNoOfNights(d, toDate);
                          }}
                          inputClass="w-full border px-2 h-8 rounded text-sm bg-white text-gray-400  outline-none "
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" ">
                    <span className=" bottom-full flex justify-start text-xs font-semibold text-gray-400 rounded  pb-1">
                      Check-Out Date
                    </span>
                    <div className="relative w-full    hover:border-blue-500 focus-within:border-green-500 rounded-lg">
                      <div className="w-full h-8 ">
                        <DatePicker
                        format="DD/MM/YYYY"
                          value={toDate}
                          minDate={
                            new Date(
                              new Date().setDate(
                                new Date(fromDate).getDate() + 1
                              )
                            )
                          }
                          maxDate={
                            new Date(
                              new Date().setDate(
                                new Date(fromDate).getDate() + 90
                              )
                            )
                          }
                          onChange={(date) => {
                            const d = new Date(date);
                            setToDate(d);
                            dispatch(
                              addEnquiry({
                                ...enquiry,
                                toDate: toDate.toJSON(),
                              })
                            );
                            handleNoOfNights(fromDate, d);
                          }}
                          inputClass="w-full h-8 rounded text-sm  bg-white px-2 border text-gray-400  outline-none "
                        />
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <span className=" bottom-full flex justify-start text-xs font-semibold text-gray-400 rounded  pb-1">
                      Nights
                    </span>
                    <div className="relative w-full    hover:border-blue-500 focus-within:border-green-500 rounded-lg">
                      <div className="w-full h-8 ">
                        <div className="">
                          <select
                            className="w-12 no-spinner text-sm text-center py-1 bg-transparent text-gray-400 border rounded outline-none"
                            value={noOfNights}
                            type="rooms"
                            name="noOfAdults"
                            onChange={(e) => {
                              setNoOfNights(e.target.value);
                              setToDate(
                                new Date(
                                  moment(fromDate).add(e.target.value, "days")
                                )
                              );
                            }}
                          >
                            {Array.from({ length: 90 }).map((item, index) => (
                              <option key={index} value={index + 1}>
                                {index + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div ref={paxDropdownWrapperRef} className="w-full relative">
                  <div className="  rounded-md text-darktext">
                    {rows?.map((item, index) => (
                      <div key={index} className="py-1">
                        <div className="flex  gap-1 px-3">
                          {index === 0 ? (
                            <div className="">
                              <span className=" bottom-full flex justify-start text-xs font-semibold text-gray-400 rounded  pb-1">
                                Rooms
                              </span>
                              <div className="">
                                <select
                                  className="w-12 no-spinner  text-center py-1 bg-white border rounded outline-none text-sm"
                                  value={numOfRooms}
                                  type="rooms"
                                  name="noOfAdults"
                                  onChange={(e) => {
                                    dispatch(addHandleNewRow(e.target.value));
                                  }}
                                >
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                </select>
                              </div>
                            </div>
                          ) : (
                            <div className="w-14"></div>
                          )}
                          <div className="">
                            <span className=" bottom-full flex justify-start text-xs font-semibold text-gray-400 rounded pb-1">
                              Adult
                            </span>
                            <div className="">
                              <select
                                className="w-12 no-spinner  text-center py-1 bg-white border rounded px-2  outline-none text-sm"
                                value={item?.noOfAdults}
                                type="number"
                                name="noOfAdults"
                                onChange={(e) => {
                                  handleChange({
                                    value: Number(e.target.value),
                                    name: e.target.name,
                                    index,
                                  });
                                }}
                              >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                              </select>
                            </div>
                          </div>
                          <div className="">
                            <span className=" bottom-full flex justify-start text-xs font-semibold text-gray-400 rounded  pb-1">
                              Child
                            </span>
                            <div>
                              <select
                                className="w-12  no-spinner text-center py-1 bg-white border rounded outline-none text-sm"
                                value={item?.noOfChildren}
                                type="number"
                                name="noOfChildren"
                                onChange={(e) => {
                                  handleChange({
                                    value: Number(e.target.value),
                                    name: e.target.name,
                                    index,
                                  });
                                  dispatch(
                                    handleOnAgeChange({
                                      index: index,
                                      i: item?.noOfChildren - 1,
                                      value: 0,
                                    })
                                  );
                                }}
                              >
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                              </select>
                            </div>
                          </div>
                          {item?.noOfChildren > 0 ? (
                            <div className="ml-2">
                              <p className="text-left font-[600] text-gray-400 text-xs">
                                Age of children
                              </p>
                              <div className="flex  gap-1">
                                {Array.from({
                                  length: item?.noOfChildren,
                                }).map((age, i) => (
                                  <div key={i} className="pt-1">
                                    <select
                                      name="childrenAges"
                                      value={item?.childrenAges[i]}
                                      onChange={(e) => {
                                        dispatch(
                                          handleOnAgeChange({
                                            index: index,
                                            i: i,
                                            value: e.target.value
                                              ? Number(e.target.value)
                                              : 0,
                                          })
                                        );
                                      }}
                                      className="text-center w-12 py-1 outline-none border focus:border-green-400 rounded bg-white text-sm"
                                    >
                                      <option hidden></option>
                                      <option value={0}>{"<1"}</option>
                                      <option value={1}>1</option>
                                      <option value={2}>2</option>
                                      <option value={3}>3</option>
                                      <option value={4}>4</option>
                                      <option value={5}>5</option>
                                      <option value={6}>6</option>
                                      <option value={7}>7</option>
                                      <option value={8}>8</option>
                                      <option value={9}>9</option>
                                      <option value={10}>10</option>
                                      <option value={11}>11</option>
                                    </select>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ))}
                    {/* //custom rows end */}
                  </div>
                </div>
                <div className="px-3">
                  <div className="">
                    <p className="text-gray-400 font-[500] text-xs pb-2">
                      Nationality
                    </p>
                    <select
                      onChange={(e) => setCountry(e.target.value)}
                      className="outline-none border rounded h-8 text-sm text-darktext w-full capitalize px-2 bg-transparent"
                    >
                      <option value={""} className="text-grayColor">
                        Choose country
                      </option>
                      {countries?.map((country) => (
                        <option value={country?.isocode} className="capitalize">
                          {country?.countryName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-full flex items-end gap-2 justify-between px-3">
                  <div className="w-1/2">
                    <select
                      value={priceType}
                      onChange={(e) => setPriceType(e.target.value)}
                      className="outline-none border rounded h-10 text-sm text-darktext w-full capitalize px-2 bg-transparent"
                    >
                      <option value={"all"} className="capitalize">
                        All
                      </option>
                      <option value={"static"} className="capitalize">
                        Static
                      </option>
                      <option value={"dynamic"} className="capitalize">
                        Dynamic
                      </option>
                    </select>
                  </div>

                  {locality && searchQuery ? (
                    <button
                      onClick={() => {
                        if (location.pathname === "/hotel/avail") {
                          setFilters((prev) => {
                            return {
                              ...prev,
                              searchId: "",
                            };
                          });
                        }
                        if (isHotel) {
                          console.log(fromDate, "fromDate for search");
                          navigate({
                            pathname: `/hotel/details/${locality}`,
                            search: `?fromDate=${moment(
                              fromDate
                            ).format()}&toDate=${moment(
                              toDate
                            ).format()}&rooms=${JSON.stringify(
                              rows
                            )}&nationality=${country}&priceType=${priceType}`,
                          });
                        } else {
                          setResearch(!research);
                          navigate({
                            pathname: "/hotel/avail",
                            search: `?locality=${locality}&fromDate=${fromDate.toJSON()}&toDate=${toDate.toJSON()}&rooms=${JSON.stringify(
                              rows
                            )}&research=${research}&searchQuery=${JSON.stringify(
                              searchQuery
                            )}&localityValue=${value}&nationality=${country}&priceType=${priceType}`,
                          });
                        }
                      }}
                      className="bg-blue-600 rounded text-[14px] font-[600] text-white shadow-sm w-[150px] h-10"
                    >
                      Search
                    </button>
                  ) : (
                    <button className="bg-blue-800 cursor-not-allowed rounded text-[14px] font-[600] text-white shadow-sm w-[150px] h-10">
                      Search
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HotelCard;
