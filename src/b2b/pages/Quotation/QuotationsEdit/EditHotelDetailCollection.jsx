import React, { useEffect, useRef, useState } from "react";
import axios from "../../../../axios";
import DatePicker from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../../../utils/formatDate";
import {
  setHotelInStay,
  setHotelToStayArray,
} from "../../../../redux/slices/quotationSlice";
import Datalist from "../../../components/Cards/Datalist";
import { useHandleClickOutside } from "../../../../hooks";
import { AiFillStar } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { animateScroll as scroll } from "react-scroll";
import { BsFilterLeft } from "react-icons/bs";
import moment from "moment/moment";
import { config } from "../../../../constants";

function EditHotelDetailCollection({ setQuotationEdit }) {
  const dispatch = useDispatch();

  const {
    checkInDate,
    checkOutDate,
    noOfAdults,
    noOfChildren,
    childrenAges,
    selectedStayIndex,
    selectedHotelIndex,
    stays,
  } = useSelector((state) => state.quotation);

  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState("");
  const [datalist, setDatalist] = useState(false);
  const [searchQuery, setSearchQuery] = useState({});
  const [isHotel, setIsHotel] = useState(false);
  const [locality, setLocality] = useState("");
  const [changeFromDate, setChangeFromDate] = useState(checkInDate);
  const [changeToDate, setChangeToDate] = useState(checkOutDate);

  // Check in and Checkout show date value states
  const [editExistCheckInDate, setEditExistCheckInDate] = useState();
  const [editExistCheckoutDate, setEditExistCheckoutDate] = useState();
  const [lastIndex, setLastIndex] = useState(1);
  const [existCheckoutDate, setExistCheckoutDate] = useState();

  const [isAvailablityLoading, setIsAvailablityLoading] = useState(false);
  const [error, setError] = useState("");
  const [availableHotels, setAvailableHotels] = useState([]);
  const [responseData, setResponseData] = useState({
    fromDate: "",
    toDate: "",
    rooms: [],
  });
  const [fromDate, setFromDate] = useState(checkInDate);
  const [toDate, setToDate] = useState(checkOutDate);
  const [selectedHotel, setSelectedHotel] = useState({});
  const [selectedBoardType, setSelectedBoardType] = useState({});
  const [selected, setSelected] = useState({});
  const [filterData, setFilterData] = useState({});
  const [choosedHotel, setChoosedHotel] = useState();
  const [isEmpty, setIsEmpty] = useState(false);
  const [boardTypeOrder, setBoardTypeOrder] = useState({})


  const { token } = useSelector((state) => state.agents);

  const dropdownWrapperRef = useRef();
  useHandleClickOutside(dropdownWrapperRef, () => setDatalist(false));

  const scrollRef = useRef(null);

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
      console.log(err?.response?.data?.error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (value.length > 2) {
      getSearchSuggestions(value);
    }
  }, [value]);

  const handleFocus = (e) => {
    setDatalist(true);
    setLocality("");
  };

  useEffect(() => {
    !locality && setValue("");
  }, [locality]);

  // checking availablity
  const formattedFromDate = moment(fromDate).format("YYYY-MM-DD");
  const formattedToDate = moment(toDate).format("YYYY-MM-DD");

  const fetchAvailableHotels = async (e) => {
    try {
      e.preventDefault();
      setError("");
      setSelectedHotel({});
      setSelectedBoardType({});
      setSelected({});
      setIsAvailablityLoading(true);
      setIsEmpty(false);
      const response = await axios.post(
        `/b2b/quotations/hotels/availability?limit=999&&sortBy=price:${filterData}`,
        {
          searchQuery: searchQuery,
          fromDate: formattedFromDate,
          toDate: formattedToDate,
          rooms: [
            {
              noOfAdults: 1,
              noOfChildren: noOfChildren ? 1 : 0,
              childrenAges: childrenAges.length ? [childrenAges[0]] : [],
            },
          ],
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setAvailableHotels(response?.data?.hotels);

      if (!response?.data?.hotels?.length) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }

      setResponseData({
        fromDate: response?.data?.fromDate,
        toDate: response?.data?.toDate,
        rooms: response?.data?.rooms,
      });
      dispatch(
        setHotelInStay({
          stayIndex: selectedStayIndex,
          hotelIndex: selectedHotelIndex,
          name: "checkInDate",
          value: response?.data?.fromDate?.slice(0, 10),
        })
      );
      dispatch(
        setHotelInStay({
          stayIndex: selectedStayIndex,
          hotelIndex: selectedHotelIndex,
          name: "checkOutDate",
          value: response?.data?.toDate?.slice(0, 10),
        })
      );
      setIsAvailablityLoading(false);
    } catch (err) {
      setError(err?.response?.data?.error);
      setIsAvailablityLoading(false);
    }
  };

  const onClickHandler = ({ name, value }) => {
    dispatch(
      setHotelInStay({
        stayIndex: selectedStayIndex,
        hotelIndex: selectedHotelIndex,
        name: name,
        value: value,
      })
    );
  };

  const scrollAnimate = () => {
    scroll.scrollToBottom();
  };

  const fetchFilterData = (e) => {
    setFilterData(e.target.value);
  };

  const getSelectedEditHotel = () => {
    if (stays.length) {
      if (stays[selectedStayIndex]?.hotels?.length) {
        if (
          stays[selectedStayIndex]?.hotels[selectedHotelIndex]?.checkInDate &&
          stays[selectedStayIndex]?.hotels[selectedHotelIndex]?.checkOutDate
        ) {
          setEditExistCheckInDate(
            stays[selectedStayIndex]?.hotels[
              selectedHotelIndex
            ]?.checkInDate?.slice(0, 10)
          );
          setEditExistCheckoutDate(
            stays[selectedStayIndex]?.hotels[
              selectedHotelIndex
            ]?.checkOutDate?.slice(0, 10)
          );

          setFromDate(
            stays[selectedStayIndex]?.hotels[
              selectedHotelIndex
            ]?.checkInDate?.slice(0, 10)
          );
          setToDate(
            stays[selectedStayIndex]?.hotels[
              selectedHotelIndex
            ]?.checkOutDate?.slice(0, 10)
          );
        } else {
          if (selectedHotelIndex < stays[selectedStayIndex]?.hotels?.length) {
            setFromDate(
              stays[selectedStayIndex]?.hotels[
                selectedHotelIndex
              ]?.checkInDate?.slice(0, 10)
            );
          } else {
            handleCheckOutDateShow();
          }
        }
      }
    }
  };

  useEffect(() => {
    getSelectedEditHotel();
  }, [
    editExistCheckInDate,
    editExistCheckoutDate,
    existCheckoutDate,
    lastIndex,
  ]);

  // Handle show date for last selected hotel date
  const handleCheckOutDateShow = () => {
    if (stays.length) {
      stays?.map((ele) => {
        if (ele?.hotels?.length) {
          // setLastIndex(ele?.hotels?.length-1)
          let lastIndexs = ele?.hotels?.length - 1;
          setExistCheckoutDate(ele?.hotels[lastIndexs]?.checkOutDate);
          let dd = ele?.hotels[lastIndexs]?.checkOutDate;
          setFromDate(dd);
        }
      });
    }
  };

  const getChoosedHotel = () => {
    if (stays.length) {
      if (stays[selectedStayIndex]?.hotels?.length) {
        setChoosedHotel(
          stays[selectedStayIndex]?.hotels[selectedHotelIndex]?.hotelName
        );
        setSearchQuery({
          id: stays[selectedStayIndex]?.hotels[selectedHotelIndex]?.hotelId,
          suggestionType: "HOTEL",
        });
      }
    }
  };

  useEffect(() => {
    getChoosedHotel();
  }, []);

  const [firstInd, setFirstInd] = useState(0);
  const [lastInd, setLastInd] = useState(10);
  const [pageCount, setPageCount] = useState(1);

  const handlePagesMinus = () => {
    setFirstInd(firstInd - 10);
    setLastInd(lastInd - 10);
  };

  const handlePagesPlus = () => {
    setFirstInd(firstInd + 10);
    setLastInd(lastInd + 10);
  };

  
  const handleOrderBoardType = (boardTypes) => {
    if (!Array.isArray(boardTypes)) {
      console.error('boardTypes is not an array');
      return;
    }
  
    const boardTypeOrder = ["RO", "BB", "HB", "FB"];
  
    const boardTypeMap = new Map();
  
    boardTypes.forEach((type) => {
      boardTypeMap.set(type.boardCode, type);
    });
  
    const orderedBoardTypes = [];
  
    boardTypeOrder.forEach((code) => {
      if (boardTypeMap.has(code)) {
        orderedBoardTypes.push(boardTypeMap.get(code));
        boardTypeMap.delete(code); 
      }
    });
  
    const remainingBoardTypes = Array.from(boardTypeMap.values());
    orderedBoardTypes.push(...remainingBoardTypes);
  
    setBoardTypeOrder(orderedBoardTypes);
  }


  return (
    <div className="max-w-screen-lg mx-auto">
      <div classsName="">
        <div className="pb-5">
          <h3 className="text-md tracking-wide text-center text-stone-600 font-bold">
            Choose your hotel for stay ?
          </h3>
        </div>

        <div className="hidden md:flex justify-around shadow-mn rounded h-12 items-center">
          <p className="flex gap-1">
            <FaPlaneArrival />
            <span className="text-sm text-gray-400">Arrival Date : </span>
            <span className="text-sm font-[500] text-gray-400">
              {formatDate(checkInDate)}
            </span>
          </p>
          <p className="flex gap-1">
            <FaPlaneDeparture />
            <span className="text-sm text-gray-400">Departure Date : </span>
            <span className="text-sm font-[500] text-gray-400">
              {formatDate(checkOutDate)}
            </span>
          </p>
        </div>

        <div className="pt-5 grid md:flex gap-2 md:p-2 p-3 ml-5 md:ml-0">
          <div className="">
            <p className="text-xs text-stone-500 uppercase py-1">Destination</p>
            <div ref={dropdownWrapperRef} className="relative">
              <input
                value={choosedHotel !== undefined ? choosedHotel : value}
                onChange={(e) => {
                  setChoosedHotel(undefined);
                  setValue(e.target.value);
                }}
                className="outline-none w-80 md:w-60 lg:w-[400px] h-10 text-xs text-gray-400 px-2  border rounded"
                type="text"
                onFocus={handleFocus}
              />

              <Datalist
                locality={locality}
                setLocality={setLocality}
                datalist={datalist}
                suggestions={suggestions}
                value={value}
                setDatalist={setDatalist}
                setValue={setValue}
                isLoading={isLoading}
                setIsHotel={setIsHotel}
                setSearchQuery={setSearchQuery}
              />
            </div>
          </div>
          <div className="  ">
            <p className="text-xs text-stone-500 uppercase py-1">
              Check In Date
            </p>
            <DatePicker
              mode="single"
              format="DD-MM-YYYY"
              value={
                editExistCheckInDate !== undefined
                  ? new Date(editExistCheckInDate)
                  : existCheckoutDate !== undefined
                  ? new Date(existCheckoutDate)
                  : new Date(fromDate)
              }
              minDate={new Date(changeFromDate)}
              maxDate={new Date(changeToDate)}
              onChange={(date) => {
                const d = new Date(date);
                setFromDate(d);
              }}
              inputClass="w-80 md:w-32 lg:w-[200px] h-10 rounded text-xs border text-gray-400 text-center outline-none "
            />
          </div>
          <div className="w-[30%]  ">
            <p className="text-xs text-stone-500 uppercase py-1">
              Check Out Date
            </p>
            <DatePicker
              mode="single"
              format="DD-MM-YYYY"
              value={
                editExistCheckoutDate !== undefined
                  ? new Date(editExistCheckoutDate)
                  : new Date(toDate)
              }
              minDate={new Date(changeFromDate)}
              maxDate={new Date(changeToDate)}
              onChange={(date) => {
                const d = new Date(date);
                setToDate(d);
              }}
              inputClass="w-80 md:w-32 lg:w-[200px] h-10 rounded text-xs border text-gray-400 text-center outline-none "
            />
          </div>
          <div>
            <p className="text-xs text-stone-500 uppercase py-1">Filter</p>
            <div className="flex gap-1 border h-10 rounded relative w-80 md:w-28 lg:w-40 p-2 cursor-pointer md:overflow-hidden">
              <span className="text-2xl ">
                <BsFilterLeft />
              </span>
              <div className="">
                <select
                  className="w-64 md:w-32 lg:w-28 outline-none bg-transparent text-sm text-gray-400 "
                  onChange={(e) => fetchFilterData(e)}
                >
                  <option hidden value="">
                    {""}
                  </option>
                  <option value="" className="text-gray-400 p-2 ">
                    Popular
                  </option>
                  <option value="desc" className="text-gray-400 p-2">
                    Highest To Lowest
                  </option>
                  <option value="asc" className="text-gray-400 p-2">
                    Lowest To Highest
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex items-end w-full">
            <button
              onClick={fetchAvailableHotels}
              className="bg-gradient-to-l from-blue-600 to-red-600 hover:from-red-600 hover:to-blue-600 rounded text-[14px] font-[600] text-white shadow-sm w-72 ml-4  md:ml-0 md:w-32 lg:w-[150px] h-10"
            >
              Search
            </button>
          </div>
        </div>

        <div className="grid p-2 md:p-0 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-10">
          {!isAvailablityLoading ? (
            <>
              {availableHotels.length > 0 &&
                availableHotels
                  ?.slice(firstInd, lastInd)
                  ?.map((hotel, hotelIndex) => (
                    <div
                      key={hotel?.hotel?._id}
                      onClick={() => {
                        onClickHandler({
                          name: "areaName",
                          value: hotel?.hotel?.area?.hotelName,
                        });
                        onClickHandler({
                          name: "areaId",
                          value: hotel?.hotel?.area?._id,
                        });
                        onClickHandler({
                          name: "hotelId",
                          value: hotel?.hotel?._id,
                        });
                        onClickHandler({
                          name: "hotelName",
                          value: hotel?.hotel?.hotelName,
                        });
                        onClickHandler({
                          name: "placeName",
                          value: hotel?.hotel?.city?.cityName,
                        });
                        onClickHandler({
                          name: "starCategory",
                          value: hotel?.hotel?.starCategory,
                        });
                        onClickHandler({
                          name: "hotelData",
                          value: hotel?.hotel,
                        });
                        onClickHandler({
                          name: "cityId",
                          value: hotel?.hotel?.city?._id,
                        });
                        setSelectedHotel(hotel);
                        scrollAnimate();
                        setSelectedBoardType({});
                      }}
                      className={`${
                        selectedHotel?.hotel?._id === hotel?.hotel?._id
                          ? " bg-green-50 "
                          : " bg-white "
                      } cursor-pointer overflow-hidden hover:-translate-y-1 transition-all duration-300 rounded-md border-[1px] border-gray-100 border-opacity-20 shadow-round w-full  flex flex-col items-center`}
                    >
                      <div className="relative w-full h-[100px] ">
                        <img
                          src={
                            hotel?.hotel?.image?.isRelative
                              ? config.SERVER_URL + hotel?.hotel?.image?.path
                              : hotel?.hotel?.image?.path
                          }
                          alt={"hotel" + hotelIndex}
                          className="w-full h-full object-cover"
                        />
                        <div
                          className={` ${
                            selectedHotel?.hotel?._id === hotel?.hotel?._id
                              ? " block "
                              : " hidden "
                          } absolute top-1 right-1 bg-green-500 text-xs text-white flex justify-center items-center w-4 h-4 rounded-full shadow-mn`}
                        >
                          <GiCheckMark />
                        </div>
                      </div>
                      <div className="p-2 text-left">
                        <div className="pt-2">
                          <p className="text-sm font-[500] text-gray-400">
                            {hotel?.hotel?.hotelName}
                          </p>
                        </div>
                        <div className="text-xs text-grayColor">
                          {hotel?.hotel?.address}
                        </div>
                        <div className="text-xs text-grayColor flex items-center gap-1">
                          {hotel?.hotel?.starCategory}
                          <span className="text-yellow-400 text-sm">
                            <AiFillStar />
                          </span>
                        </div>
                        <div className="text-xs text-grayColor">
                          {hotel?.hotel?.city?.cityName +
                            " , " +
                            hotel?.hotel?.state?.stateName}
                        </div>
                      </div>
                    </div>
                  ))}
              {error ? (
                <div className="col-span-5 w-full py-10 flex justify-center">
                  <p className="text-gray-300 text-sm font-medium ">{error}</p>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              {[1, 2, 3, 4, 5].map((ele) => (
                <div className="bg-white overflow-hidden hover:-translate-y-1 transition-all duration-300 rounded-md border-[1px] border-gray-100 border-opacity-20 shadow-round w-full pb-8  flex flex-col items-center">
                  <div className="animate-pulse w-full h-[100px] bg-gray-200"></div>
                  <div className="p-2 text-center">
                    <div className="pt-2">
                      <p className="h-5 w-20 bg-gray-400 rounded animate-pulse"></p>
                    </div>
                    <div className="h-3 w-32 bg-grayColor mt-3 rounded animate-pulse"></div>
                    <div className="h-3 w-36 bg-grayColor mt-3 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {isEmpty && (
          <div className="flex justify-center text-red-500 ">
            <h1>No availability found for this search query.</h1>
          </div>
        )}

        {Object.keys(selectedHotel).length !== 0 ? (
          <div className="py-5 ">
            <p className=" px-2 text-sm text-stone-500 font-[500]">
              Room Types
            </p>
            <div className="pt-4">
              <div className="grid md:grid-cols-4 gap-2 items-center">
                {selectedHotel?.roomTypes?.map((roomType) => (
                  <div
                    onClick={() => {
                      setSelectedBoardType(roomType);
                      handleOrderBoardType(roomType.boardTypes);
                      scrollAnimate();
                      onClickHandler({
                        name: "roomTypeName",
                        value: roomType?.roomName,
                      });
                      onClickHandler({
                        name: "roomTypeId",
                        value: roomType?.roomTypeId,
                      });
                    }}
                    key={roomType?.roomTypeId}
                    className={`relative ${
                      selectedBoardType?.roomTypeId === roomType?.roomTypeId
                        ? " bg-green-50 "
                        : " bg-white "
                    }  rounded shadow-mn flex justify-center items-center h-16 cursor-pointer`}
                  >
                    <p className="text-sm text-gray-400 capitalize p-3">
                      {roomType?.roomName}
                    </p>
                    <div
                      className={` ${
                        selectedBoardType?.roomTypeId === roomType?.roomTypeId
                          ? " block "
                          : " hidden "
                      } absolute top-1 right-1 bg-green-500 text-xs text-white flex justify-center items-center w-4 h-4 rounded-full shadow-mn`}
                    >
                      <GiCheckMark />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {Object.keys(selectedBoardType).length !== 0 ? (
          <div className="py-5 ">
            <p className=" px-2 text-sm text-stone-500 font-[500]">
              Board Types
            </p>
            <div className="pt-4">
              <div className="grid md:grid-cols-4 gap-2 items-center">
                {boardTypeOrder?.map((boardType) => (
                  <div
                    onClick={() => {
                      setSelected(boardType);
                      scrollAnimate();
                      onClickHandler({
                        name: "boardTypeCode",
                        value: boardType?.boardCode,
                      });
                      onClickHandler({
                        name: "boardTypeName",
                        value: boardType?.boardName,
                      });
                    }}
                    key={boardType?.boardCode}
                    className={`relative ${
                      selected?.boardCode === boardType?.boardCode
                        ? " bg-green-50 "
                        : " bg-white "
                    }  rounded shadow-mn flex justify-center items-center h-16 cursor-pointer`}
                  >
                    <p className="text-sm text-gray-400 p-3">
                      {boardType?.boardName + `(${boardType?.boardCode})`}
                    </p>
                    <div
                      className={` ${
                        selected?.boardCode === boardType?.boardCode
                          ? " block "
                          : " hidden "
                      } absolute top-1 right-1 bg-green-500 text-xs text-white flex justify-center items-center w-4 h-4 rounded-full shadow-mn`}
                    >
                      <GiCheckMark />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {Object.keys(selectedHotel).length !== 0 &&
        Object.keys(selectedBoardType).length !== 0 &&
        Object.keys(selected).length !== 0 ? (
          <div className="flex justify-center mr-20 p-2">
            <button
              onClick={() => {
                dispatch(
                  setHotelToStayArray({
                    stayIndex: selectedStayIndex,
                    hotelIndex: selectedHotelIndex,
                  })
                );

                setQuotationEdit({
                  arrivalAirportEdit: false,
                  departureAirportEdit: false,
                  travelDateEdit: false,
                  travelPartnerEdit: false,
                  hotelEnquiryEdit: false,
                  hotelListEdit: true,
                  suggestHotelEdit: false,
                  suggestDetailCollectionEdit: false,
                  hotelDetailCollectionEdit: false,
                  transferHotelsEdit: false,
                  excursionListEdit: false,
                  suplimetsOptionPageEdit: false,
                  excursionSupplimetListEdit: false,
                  visaQuotationsEdit: false,
                  createQuotationEdit: false,
                });
              }}
              className="text-xs font-[500] text-white bg-gradient-to-l from-blue-600 to-red-600 hover:from-red-600 hover:to-blue-600  rounded shadow-sm h-8 px-5"
            >
              Confirm
            </button>

            <br />
            <br />
            <br />
          </div>
        ) : (
          ""
        )}
        <div>
          {!isLoading && availableHotels?.length ? (
            <div className="flex gap-3 justify-end pt-10">
              {pageCount > 1 ? (
                <div>
                  <button
                    onClick={() => {
                      handlePagesMinus();
                      setPageCount(pageCount - 1);
                    }}
                    className="absolut top-[500px] left-10 text-xl font-semibold  bg-slate-300 rounded-full p-1 w-10 h-10"
                  >
                    &lt;
                  </button>
                </div>
              ) : (
                ""
              )}
              {availableHotels?.length > 10 ? (
                <div>
                  <p className="pt-2 text-md font-semibold">{pageCount}</p>
                </div>
              ) : (
                ""
              )}

              {availableHotels?.length > lastInd ? (
                <div>
                  <button
                    onClick={() => {
                      handlePagesPlus();
                      setPageCount(pageCount + 1);
                    }}
                    className="absolut top-[500px] left-20 text-xl font-semibold  bg-slate-300 rounded-full p-1 w-10 h-10"
                  >
                    &gt;
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}

export default EditHotelDetailCollection;
