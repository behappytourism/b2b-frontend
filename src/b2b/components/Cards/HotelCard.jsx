import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useHandleClickOutside } from "../../../hooks";
import DatePicker from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  addEnquiry,
  addHandleNewRow,
  addNewRow,
  handleOnAgeChange,
  handleOnChange,
  removeLastRow,
  settingInitiallyNoOfRooms,
} from "../../../redux/slices/hotelSlice";
import axios from "../../../axios";
import Datalist from "./Datalist";
import { AiOutlineStar } from "react-icons/ai";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import {
  BsCalendar2Minus,
  BsCalendar2Plus,
  BsCalendarPlus,
} from "react-icons/bs";
import { RiHotelBedLine } from "react-icons/ri";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import moment from "moment/moment";
import { config } from "../../../constants";

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
    searchParams.get("priceType") ? searchParams.get("priceType") : "all"
  );
  const [starCategory, setStarCategory] = useState(
    searchParams.get("starCategory") ? searchParams.get("starCategory") : ""
  );
  const paxDropdownWrapperRef = useRef();
  useHandleClickOutside(paxDropdownWrapperRef, () => setPaxDropdown(false));
  const dropdownWrapperRef = useRef();
  useHandleClickOutside(dropdownWrapperRef, () => setDatalist(false));
  const { rows, enquiry, numOfRooms } = useSelector((state) => state.hotel);
  const { token, agent } = useSelector((state) => state.agents);
  const { countries } = useSelector((state) => state.home);
  const { hotelPromotionOne, hotelPromotionTwo } = useSelector(
    (state) => state.hotel
  );

  useEffect(() => {
    setCountry(
      searchParams.get("nationality")
        ? searchParams.get("nationality")
        : agent?.country?.isocode
    );
    console.log(searchParams.get("fromDate"));
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

  // initial set of handle nights when page render according to from and to Date
  useEffect(() => {
    handleNoOfNights(fromDate, toDate);
  }, [fromDate, toDate]);

  // Handling the no of nights according to the change of fromdate only.
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

  // Handle Function for setting number of nights.
  const handleNoOfNights = (fromdate, todate) => {
    const diffTime = Math.abs(new Date(todate) - new Date(fromdate));
    const diffDate = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setNoOfNights(diffDate);
  };

  //  Handle change function for the data below.
  const handleChange = ({ value, name, index }) => {
    dispatch(
      handleOnChange({
        value,
        name,
        index,
      })
    );
  };

  // Getting and setting no of adults and child initially from the state rows data.
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

  // Handle focus to trigger dropdown with suggestion list api data.
  const handleFocus = (e) => {
    setDatalist(true);
    setLocality("");
  };

  // setting written value of destination to empty when id is not set in state.
  useEffect(() => {
    !locality && setValue("");
  }, [locality]);

  // UseEffect for triggering gearch api function on value change ang value > 3.
  useEffect(() => {
    if (value.length > 2) {
      getSearchSuggestions(value);
    }
  }, [value]);

  // Get search suggestions.
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

  // Setting initially number of rooms.
  useEffect(() => {
    dispatch(settingInitiallyNoOfRooms());
  }, []);

  return (
    <>
      {location.pathname === "/hotel/avail" ||
      location.pathname?.includes("/hotel/details") ? (
        <div className="relative w-full max-w-xs bg-white shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)] p-5 rounded-lg">
          <div className="  space-y-3">
            <div className="">
              <p className="text-textColor text-lg text-center font-[800] tracking-wide ">
                Search
              </p>
            </div>
            <div
              ref={dropdownWrapperRef}
              className="w-full border border-blue-300 rounded flex"
            >
              <div className=" text-stone-50 bg-gradient-to-r from-red-600 to-blue-600 flex justify-center items-center w-10 border-r">
                <IoLocationOutline />
              </div>
              <div className="relative w-full px-1 hover:border-blue-500 focus-within:border-green-500 rounded-lg">
                <div className="w-full h-8  ">
                  <input
                    className=" outline-none bg-transparent placeholder:text-gray-200 text-xs text-stone-500 font-[300]  h-full text-left w-full capitalize"
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
            <div className="w-full border border-blue-300 rounded flex ">
              <span className="text-stone-50 bg-gradient-to-r from-red-600 to-blue-600 flex justify-center items-center w-10 border-r ">
                <BsCalendar2Plus />
              </span>
              <div className="relative w-full  px-1  hover:border-blue-500 focus-within:border-green-500 rounded-lg">
                <div className="w-full h-8 ">
                  <DatePicker
                    format="DD/MM/YYYY"
                    mode="single"
                    minDate={new Date(new Date().setDate(new Date().getDate()))}
                    value={fromDate}
                    onChange={(date) => {
                      const d = new Date(date);
                      setFromDate(d);
                      dispatch(
                        addEnquiry({
                          ...enquiry,
                          fromDate: fromDate.toJSON(),
                        })
                      );
                      handleNoOfNights(d, toDate);
                    }}
                    inputClass="w-full h-8 rounded text-xs bg-transparent text-stone-500  outline-none font-[300]"
                  />
                </div>
              </div>
            </div>
            <div className="w-full rounded border-blue-300 border flex">
              <span className=" flex justify-center items-center w-10 text-stone-50 bg-gradient-to-r from-red-600 to-blue-600 bg-blue-200 border-r  ">
                <BsCalendar2Minus />
              </span>
              <div className="relative w-full  px-1   hover:border-blue-500 focus-within:border-green-500 rounded-lg">
                <div className="w-full h-8 ">
                  <DatePicker
                    format="DD/MM/YYYY"
                    value={toDate}
                    minDate={
                      new Date(
                        new Date().setDate(new Date(fromDate).getDate() + 1)
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
                    inputClass="w-full h-8 rounded text-xs  bg-transparent text-stone-500  outline-none font-[300] "
                  />
                </div>
              </div>
            </div>
            <div className="w-full rounded border-blue-300 border flex">
              <span className=" flex justify-center items-center w-10 text-stone-50 bg-gradient-to-r from-red-600 to-blue-600 bg-blue-200 border-r  ">
                <BsCalendarPlus />
              </span>
              <div className="relative w-full  px-1   hover:border-blue-500 focus-within:border-green-500 rounded-lg">
                <div className="w-full h-8 ">
                  <select
                    value={noOfNights}
                    onChange={(e) => {
                      setNoOfNights(e.target.value);
                      setToDate(
                        new Date(moment(fromDate).add(e.target.value, "days"))
                      );
                    }}
                    className="w-full h-8 rounded text-xs  bg-transparent text-stone-500  outline-none font-[300] "
                  >
                    {Array.from({ length: 90 }).map((_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1} Night
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="w-full rounded border-blue-300 border flex">
              <span className=" flex justify-center items-center w-10 text-stone-50 bg-gradient-to-r from-red-600 to-blue-600 bg-blue-200 border-r  ">
                <IoPricetagOutline />
              </span>
              <div className="relative w-full  px-1   hover:border-blue-500 focus-within:border-green-500 rounded-lg">
                <div className="w-full h-8 ">
                  <select
                    value={priceType}
                    onChange={(e) => {
                      setPriceType(e.target.value);
                    }}
                    className="w-full h-8 rounded text-xs  bg-transparent text-stone-500  outline-none font-[300] "
                  >
                    <option value={"all"}>All</option>
                    <option value={"static"}>Static</option>
                    <option value={"dynamic"}>Dynamic</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="w-full rounded border-blue-300 border flex">
              <span className=" flex justify-center items-center w-10 text-stone-50 bg-gradient-to-r from-red-600 to-blue-600 bg-blue-200 border-r  ">
                <AiOutlineStar />
              </span>
              <div className="relative w-full  px-1   hover:border-blue-500 focus-within:border-green-500 rounded-lg">
                <div className="w-full h-8 ">
                  <select
                    value={starCategory}
                    onChange={(e) => {
                      setStarCategory(e.target.value);
                    }}
                    className="w-full h-8 rounded text-xs  bg-transparent text-stone-500  outline-none font-[300] "
                  >
                    <option value={""} className="text-grayColor">
                      Choose Category
                    </option>
                    <option value="1" className="capitalize">
                      1 Star
                    </option>
                    <option value="2" className="capitalize">
                      2 Star
                    </option>
                    <option value="3" className="capitalize">
                      3 Star
                    </option>
                    <option value="4" className="capitalize">
                      4 Star
                    </option>
                    <option value="5" className="capitalize">
                      5 Star
                    </option>
                    <option value="apartment" className="capitalize">
                      Apartment
                    </option>
                    <option value="hostel" className="capitalize">
                      Hostel
                    </option>
                    <option value="unrated" className="capitalize">
                      Unrated
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="w-full rounded border-blue-300 border flex">
              <span className=" flex justify-center items-center w-10 text-stone-50 bg-gradient-to-r from-red-600 to-blue-600 bg-blue-200 border-r  ">
                <IoLocationOutline />
              </span>
              <div className="relative w-full  px-1   hover:border-blue-500 focus-within:border-green-500 rounded-lg">
                <div className="w-full h-8 ">
                  <select
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    className="w-full h-8 rounded text-xs  bg-transparent text-stone-500  outline-none font-[300]"
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
            </div>
            <div
              ref={paxDropdownWrapperRef}
              className="w-full relative border border-blue-300 rounded flex"
            >
              <div className="text-stone-50 bg-gradient-to-r from-red-600 to-blue-600 border-r flex justify-center items-center w-10">
                <RiHotelBedLine />
              </div>
              <div className=" w-full  px-1 ">
                <div className="w-full h-8 overflow-hidden flex justify-center items-center cursor-pointer">
                  <p
                    onClick={() => setPaxDropdown(!paxDropdown)}
                    className=" outline-none bg-transparent  text-left w-full text-xs text-stone-500 whitespace-nowrap font-[300] "
                  >
                    {adultLength} Adult . {childLength} Children .{" "}
                    {rows?.length} Rooms
                  </p>
                </div>
              </div>
              {paxDropdown && (
                <div className="absolute w-[250px] left-[110%] bg-white shadow-[4px_4px_10px_7px_rgb(56_65_74_/_20%)] p-5 rounded-md text-darktext">
                  {rows?.map((item, index) => (
                    <div key={index} className="pb-4">
                      <p className=" font-[700]  text-gray-400 text-sm uppercase">
                        Room {index + 1}
                      </p>
                      <div className="flex flex-wrap gap-5 py-2">
                        <div className="">
                          <p className="text-center font-[600] text-gray-400 text-xs">
                            Adult
                          </p>
                          <div>
                            <button
                              disabled={Number(item?.noOfAdults) <= 1}
                              onClick={() => {
                                if (Number(item?.noOfAdults) > 1) {
                                  dispatch(
                                    handleOnChange({
                                      value: Number(item?.noOfAdults) - 1,
                                      name: "noOfAdults",
                                      index,
                                    })
                                  );
                                }
                              }}
                              className="bg-primaryColor text-white w-6 rounded disabled:cursor-not-allowed"
                            >
                              -
                            </button>
                            <input
                              className="w-10 no-spinner text-center py-1 bg-transparent outline-none"
                              value={item?.noOfAdults}
                              type="number"
                              name="noOfAdults"
                              readOnly
                            />
                            <button
                              disabled={Number(item?.noOfAdults) >= 8}
                              onClick={() => {
                                if (Number(item?.noOfAdults) < 8) {
                                  dispatch(
                                    handleOnChange({
                                      value: Number(item?.noOfAdults) + 1,
                                      name: "noOfAdults",
                                      index,
                                    })
                                  );
                                }
                              }}
                              className="bg-primaryColor text-white w-6 rounded "
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="">
                          <p className="text-center font-[600] text-gray-400 text-xs">
                            Child
                          </p>
                          <div>
                            <button
                              disabled={Number(item?.noOfChildren) <= 0}
                              onClick={() => {
                                if (Number(item?.noOfChildren) > 0) {
                                  dispatch(
                                    handleOnChange({
                                      value: Number(item?.noOfChildren) - 1,
                                      name: "noOfChildren",
                                      index,
                                    })
                                  );
                                }
                              }}
                              className="bg-primaryColor text-white w-6 rounded disabled:cursor-not-allowed"
                            >
                              -
                            </button>
                            <input
                              className="w-10 no-spinner text-center py-1 bg-transparent outline-none"
                              value={item?.noOfChildren}
                              type="number"
                              name="noOfChildren"
                              readOnly
                            />
                            <button
                              disabled={Number(item?.noOfChildren) >= 4}
                              onClick={() => {
                                if (Number(item?.noOfChildren) < 4) {
                                  dispatch(
                                    handleOnChange({
                                      value: Number(item?.noOfChildren) + 1,
                                      name: "noOfChildren",
                                      index,
                                    })
                                  );
                                  dispatch(
                                    handleOnAgeChange({
                                      index: index,
                                      i: Number(item?.noOfChildren),
                                      value: 0,
                                    })
                                  );
                                }
                              }}
                              className="bg-primaryColor text-white w-6 rounded "
                            >
                              +
                            </button>
                          </div>
                        </div>
                        {Number(item?.noOfChildren) > 0 ? (
                          <div className="">
                            <p className="text-left font-[600] text-gray-400 text-xs">
                              Age of children
                            </p>
                            <div className="flex flex-wrap gap-4">
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
                                    className="text-center w-12 h-7 outline-none border focus:border-green-400 rounded bg-transparent"
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
                  <div className="flex gap-2">
                    <button
                      onClick={() => dispatch(addNewRow())}
                      className="text-[12px] font-[600] text-gray-400 border py-2 px-4 rounded-md"
                    >
                      Add Room
                    </button>
                    {rows?.length > 1 && (
                      <button
                        onClick={() => dispatch(removeLastRow())}
                        className="text-[12px] font-[600] text-red-400 border border-red-300 py-2 px-4 rounded-md"
                      >
                        Remove Room
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="w-full">
              {locality && searchQuery ? (
                <button
                  onClick={() => {
                    setAvailableHotel([]);
                    if (location.pathname === "/hotel/avail") {
                      setFilters((prev) => {
                        return {
                          ...prev,
                          searchId: "",
                          skip: 0,
                        };
                      });
                    }
                    if (isHotel) {
                      navigate({
                        pathname: `/hotel/details/${locality}`,
                        search: `?fromDate=${fromDate.toJSON()}&toDate=${toDate.toJSON()}&rooms=${JSON.stringify(
                          rows
                        )}&nationality=${country || ""}&priceType=${priceType}`,
                      });
                    } else {
                      setResearch(!research);
                      navigate({
                        pathname: "/hotel/avail",
                        search: `?locality=${locality}&fromDate=${fromDate.toJSON()}&toDate=${toDate.toJSON()}&rooms=${JSON.stringify(
                          rows
                        )}&research=${research}&searchQuery=${JSON.stringify(
                          searchQuery
                        )}&localityValue=${value}&nationality=${
                          country || ""
                        }&priceType=${priceType}&starCategory=${starCategory}`,
                      });
                    }
                  }}
                  className="rounded shadow-mn text-xs font-[400] bg-gradient-to-r from-red-600 to-blue-600 text-gray-50   w-full h-8"
                >
                  Search
                </button>
              ) : (
                <button className="cursor-not-allowed hover:bg-red-100 rounded border text-xs font-[400] text-stone-500  w-full h-8">
                  Search
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
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
                          <img
                            src={item}
                            alt="banner"
                            className="object-cover"
                          />
                        </div>
                      );
                    })}
              </Carousel>
            </div>
          ) : (
            ""
          )}

          <div className="">
            <div className=" max-w-screen-xl mx-auto  flex py-20">
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
                            mode="single"
                            format="DD/MM/YYYY"
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
                    <div className="space-y-1  rounded-md text-darktext">
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
                                    name="numOfRooms"
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
                                        i: e.target.value - 1,
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
                  <div className="px-3 flex gap-2">
                    <div className="">
                      <p className="text-gray-400 font-[500] text-xs pb-2">
                        Nationality
                      </p>
                      <select
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        className="outline-none border rounded h-8 text-sm text-darktext w-full capitalize px-2 bg-transparent"
                      >
                        <option value={""} className="text-grayColor">
                          Choose country
                        </option>
                        {countries?.map((country) => (
                          <option
                            value={country?.isocode}
                            className="capitalize"
                          >
                            {country?.countryName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="">
                      <p className="text-gray-400 font-[500] text-xs pb-2">
                        Star Category
                      </p>
                      <select
                        onChange={(e) => setStarCategory(e.target.value)}
                        value={starCategory}
                        className="outline-none border rounded h-8 text-sm text-darktext w-full capitalize px-2 bg-transparent"
                      >
                        <option value={""} className="text-grayColor">
                          Choose Category
                        </option>
                        <option value="1" className="capitalize">
                          1 Star
                        </option>
                        <option value="2" className="capitalize">
                          2 Star
                        </option>
                        <option value="3" className="capitalize">
                          3 Star
                        </option>
                        <option value="4" className="capitalize">
                          4 Star
                        </option>
                        <option value="5" className="capitalize">
                          5 Star
                        </option>
                        <option value="apartment" className="capitalize">
                          Apartment
                        </option>
                        <option value="hostel" className="capitalize">
                          Hostel
                        </option>
                        <option value="unrated" className="capitalize">
                          Unrated
                        </option>
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
                            navigate({
                              pathname: `/hotel/details/${locality}`,
                              search: `?fromDate=${moment(
                                fromDate
                              ).format()}&toDate=${moment(
                                toDate
                              ).format()}&rooms=${JSON.stringify(
                                rows
                              )}&nationality=${
                                country || ""
                              }&priceType=${priceType}`,
                            });
                          } else {
                            setResearch(!research);
                            navigate({
                              pathname: "/hotel/avail",
                              search: `?locality=${locality}&fromDate=${fromDate.toJSON()}&toDate=${toDate.toJSON()}&rooms=${JSON.stringify(
                                rows
                              )}&research=${research}&searchQuery=${JSON.stringify(
                                searchQuery
                              )}&localityValue=${value}&nationality=${
                                country || ""
                              }&priceType=${priceType}&starCategory=${starCategory}`,
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
              <div className="hidden md:flex items-center w-full ">
                <div className="relative grid grid-cols-1 gap-4 pl-24 pr-5 w-full">
                  {!isHomeDataLoading ? (
                    <div className="w-full h-[140px] rounded shadow-mn overflow-hidden ">
                      <Carousel
                        infiniteLoop
                        autoPlay
                        showThumbs={false}
                        interval={4000}
                        showArrows={false}
                        stopOnHover
                        swipeable={false}
                        showIndicators={false}
                        showStatus={false}
                      >
                        {hotelPromotionOne?.length > 0
                          ? hotelPromotionOne?.map((item, index) => (
                              <div
                                className="bg-inherit h-auto w-full relative object-cover"
                                key={index}
                              >
                                <img
                                  src={config.SERVER_URL + item}
                                  alt="banner"
                                  className="object-cover object-center w-full h-auto"
                                />
                              </div>
                            ))
                          : hotelPromotionOne?.map((item, index) => (
                              <div
                                className="bg-inherit h-auto w-full relative object-cover"
                                key={index}
                              >
                                <img
                                  src={item}
                                  alt="banner"
                                  className="object-cover object-center w-full h-auto"
                                />
                              </div>
                            ))}
                      </Carousel>
                    </div>
                  ) : (
                    ""
                  )}
                  {!isHomeDataLoading ? (
                    <div className="w-full h-[140px] rounded shadow-mn overflow-hidden ">
                      <Carousel
                        infiniteLoop
                        autoPlay
                        showThumbs={false}
                        interval={3000}
                        showArrows={false}
                        stopOnHover
                        swipeable={false}
                        showIndicators={false}
                        showStatus={false}
                      >
                        {hotelPromotionTwo?.length > 0
                          ? hotelPromotionTwo?.map((item, index) => (
                              <div
                                className="bg-inherit h-auto w-full relative object-cover"
                                key={index}
                              >
                                <img
                                  src={config.SERVER_URL + item}
                                  alt="banner"
                                  className="object-cover object-center w-full h-auto"
                                />
                              </div>
                            ))
                          : hotelPromotionTwo?.map((item, index) => (
                              <div
                                className="bg-inherit h-auto w-full relative object-cover"
                                key={index}
                              >
                                <img
                                  src={item}
                                  alt="banner"
                                  className="object-cover object-center w-full h-auto"
                                />
                              </div>
                            ))}
                      </Carousel>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default HotelCard;
