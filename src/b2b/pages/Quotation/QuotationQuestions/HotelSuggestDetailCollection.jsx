
import React, { useEffect, useRef, useState } from "react";
import axios from "../../../../axios";
import DatePicker from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import formatDate from "../../../../utils/formatDate";
import DetailListAlreadyBook from "../../../components/Cards/DetailListAlreadyBook";
import { useHandleClickOutside } from "../../../../hooks";
import { AiFillStar } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";
import { setHotelInStay, setHotelToStayArray } from "../../../../redux/slices/quotationSlice";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import moment from "moment/moment";
import { config } from "../../../../constants";


function HotelSuggestDetailCollection({ setQuestions }) {
  const dispatch = useDispatch();

  const {
    checkInDate,
    checkOutDate,
    noOfAdults,
    noOfChildren,
    childrenAges,
    selectedStayIndex,
    selectedHotelIndex,
    stays
  } = useSelector((state) => state.quotation);

  let dateCheck = checkInDate.slice(0, 10)
  let dateTo = checkOutDate.slice(0, 10)
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState("");
  const [datalist, setDatalist] = useState(false);
  const [searchQuery, setSearchQuery] = useState({});
  const [isHotel, setIsHotel] = useState(false);
  const [locality, setLocality] = useState("");
  const [fromDate, setFromDate] = useState(dateCheck)
  const [toDate, setTodate] = useState(dateTo)
  const [changeFromDate, setChangeFromDate] = useState(checkInDate)
  const [changeToDate, setChangeToDate] = useState(checkOutDate)
  const [lastIndex, setLastIndex] = useState(1)
  const [existCheckoutDate, setExistCheckoutDate] = useState()
  const [choosedHotel, setChoosedHotel] = useState()  
  // const [isEmpty, setIsEmpty] = useState(false)

  const [editExistCheckInDate, setEditExistCheckInDate] = useState()
  const [editExistCheckoutDate, setEditExistCheckoutDate] = useState()
  const [isAvailablityLoading, setIsAvailablityLoading] = useState(false);
  const [error, setError] = useState("");
  const [availableHotels, setAvailableHotels] = useState([]);
  const [responseData, setResponseData] = useState({
    fromDate: "",
    toDate: "",
    rooms: [],
  });
  const [selectedHotel, setSelectedHotel] = useState({});

  const { token } = useSelector((state) => state.agents);

  const dropdownWrapperRef = useRef();
  useHandleClickOutside(dropdownWrapperRef, () => setDatalist(false));

  // checking availablity
  const formattedFromDate = moment(fromDate).format("YYYY-MM-DD");
  const formattedToDate = moment(toDate).format("YYYY-MM-DD");

  const getSearchSuggestions = async (value) => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `b2b/quotations/hotels/search/suggestions?search=${value}`,
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

  const fetchAvailableHotels = async (e) => {
    try {
      e.preventDefault();
      setIsAvailablityLoading(true);
      const response = await axios.post(
        `/b2b/quotations/hotels/all?limit=10`,
        {
          searchQuery: searchQuery,
          fromDate: formattedFromDate,
          toDate: formattedToDate,
          rooms: [
            {
              noOfAdults: 1,
              noOfChildren:  noOfChildren ? 1 : 0,
              childrenAges: childrenAges.length ? [childrenAges[0]] : [],
            },
          ],
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setAvailableHotels(response?.data);

      // setResponseData({
      //   fromDate: response?.data?.fromDate,
      //   toDate: response?.data?.toDate,
      //   rooms: response?.data?.rooms,
      // });

      dispatch(
        setHotelInStay({
          stayIndex: selectedStayIndex,
          hotelIndex: selectedHotelIndex,
          name: "checkInDate",
          value: fromDate?.slice(0, 10),
        })
      );

      dispatch(
        setHotelInStay({
          stayIndex: selectedStayIndex,
          hotelIndex: selectedHotelIndex,
          name: "checkOutDate",
          value: formattedToDate,
        })
      );

      setIsAvailablityLoading(false);
    } catch (err) {
      setError(err?.response?.data);
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


  const handleCheckOutDateShow = () =>{
    if(stays.length){
      stays?.map((ele)=>{
        if(ele?.hotels?.length){
          let length = ele?.hotels?.length - 1
          setLastIndex(length)
          setExistCheckoutDate(ele?.hotels[lastIndex]?.checkOutDate)
          setFromDate(ele?.hotels[lastIndex]?.checkOutDate)
        }
      })
    }
  }


  

  const getSelectedEditHotel = () => {
    if(stays.length){
      if(stays[selectedStayIndex]?.hotels?.length ){
        if(stays[selectedStayIndex]?.hotels[selectedHotelIndex]?.checkInDate && stays[selectedStayIndex]?.hotels[selectedHotelIndex]?.checkOutDate ){
          setEditExistCheckInDate(stays[selectedStayIndex]?.hotels[selectedHotelIndex]?.checkInDate?.slice(0, 10))
          setEditExistCheckoutDate(stays[selectedStayIndex]?.hotels[selectedHotelIndex]?.checkOutDate?.slice(0, 10))
          setFromDate(stays[selectedStayIndex]?.hotels[selectedHotelIndex]?.checkInDate?.slice(0, 10))
          setTodate(stays[selectedStayIndex]?.hotels[selectedHotelIndex]?.checkOutDate?.slice(0, 10))
        }else{
          if(selectedHotelIndex < stays[selectedStayIndex]?.hotels?.length  ){
            setFromDate(stays[selectedStayIndex]?.hotels[selectedHotelIndex]?.checkInDate?.slice(0, 10))
          } else {
            handleCheckOutDateShow()
          }
        }
        
      }
    }
  }


  const getChoosedHotel = ()=>{
    if(stays.length) {
      if(stays[selectedStayIndex]?.hotels?.length){
        setChoosedHotel(stays[selectedStayIndex]?.hotels[selectedHotelIndex]?.hotelName)
        setSearchQuery({
          id: stays[selectedStayIndex]?.hotels[selectedHotelIndex]?.hotelId,
          suggestionType: "HOTEL"
        })
      }
    }
  }

  useEffect(()=>{
    getChoosedHotel()
  }, [])



  useEffect(()=>{
    getSelectedEditHotel()
}, [editExistCheckInDate, editExistCheckoutDate, existCheckoutDate, lastIndex])


  return (
    <div className="max-w-screen-lg mx-auto h-full">
      <div classsName="">
        <div className="pb-5">
          <h3 className="text-md tracking-wide text-center text-stone-600 font-bold">
            Choose your hotel for stay ? 
          </h3>
        </div>

        <div className="hidden md:flex justify-around shadow-mn rounded h-12 items-center">
          <p className="flex gap-1">
          <FaPlaneArrival/>
            <span className="text-sm text-gray-400">  Arrival Date : </span>
            <span className="text-sm font-[500] text-gray-400">
              {formatDate(checkInDate)}
            </span>
          </p>
          <p className="flex gap-1">
            <FaPlaneDeparture/>
            <span className="text-sm text-gray-400">Departure Date : </span>
            <span className="text-sm font-[500] text-gray-400">
              {formatDate(checkOutDate)}
            </span>
          </p>
        </div>

        <div className="pt-5 grid md:flex gap-2 md:p-2 p-3 ml-5 md:ml-0">
          <div className="">
            <p className="text-xs text-stone-500 uppercase py-1">Search Hotels</p>
            <div ref={dropdownWrapperRef} className="relative">
              <input
                value={choosedHotel !== undefined ? choosedHotel : value}
                onChange={(e) => setValue(e.target.value)}
                className="outline-none w-80 md:w-60 lg:w-[400px] h-10 text-xs text-gray-400 px-2  border rounded"
                type="text"
                onFocus={handleFocus}
              />

              <DetailListAlreadyBook
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
              minDate={new Date(changeFromDate)}
              maxDate={new Date(changeToDate)}
              value={ editExistCheckInDate !== undefined ? new Date(editExistCheckInDate) : existCheckoutDate !== undefined ? new Date(existCheckoutDate) : new Date(fromDate)}
              onChange={(date)=>{
                const d = new Date(date)
                setFromDate(d)
              }}

              inputClass="w-80 md:w-32 lg:w-[200px] h-10 rounded text-xs border text-gray-400 text-center outline-none "
            />
          </div>
          <div className="w-[30%]  ">
            <p className="text-xs text-stone-500 uppercase py-1">
              Check Out Date
            </p>
            <DatePicker
            format="DD-MM-YYYY"
             minDate={new Date(changeFromDate)}
             maxDate={new Date(changeToDate)}
              mode="single"
              value={ editExistCheckoutDate !== undefined ? new Date(editExistCheckoutDate) : new Date(toDate)}
              onChange={(date)=>{
                const d = new Date(date)
             
                setTodate(d)
              }}

              inputClass="w-80 md:w-32 lg:w-[200px] h-10 rounded text-xs border text-gray-400 text-center outline-none  "
            />
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

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-10 p-2">
          {!isAvailablityLoading ? (
            <>
              {availableHotels?.length > 0 &&
                availableHotels?.map((hotel, hotelIndex) => (
                  <div
                    key={hotel?._id}
                    onClick={() => {
                      onClickHandler({
                        name: "areaName",
                        value: hotel?.area?.hotelName,
                      });
                      onClickHandler({
                        name: "areaId",
                        value: hotel?.area?._id,
                      });
                      onClickHandler({
                        name: "hotelId",
                        value: hotel?._id,
                      });
                      onClickHandler({
                        name: "hotelName",
                        value: hotel?.hotelName,
                      });
                      onClickHandler({
                        name: "placeName",
                        value: hotel?.city?.cityName,
                      });
                      onClickHandler({
                        name: "starCategory",
                        value: hotel?.starCategory,
                      });
                      onClickHandler({
                        name: "hotelData",
                        value: hotel,
                      });
                      onClickHandler({
                        name: "cityId",
                        value: hotel?.city?._id,
                      });
                      setSelectedHotel(hotel);
                    }}
                    className={`${
                      selectedHotel?._id === hotel?._id
                        ? " bg-green-50 "
                        : " bg-white "
                    } cursor-pointer overflow-hidden hover:-translate-y-1 transition-all duration-300 rounded-md border-[1px] border-gray-100 border-opacity-20 shadow-round w-full  flex flex-col items-center`}
                  >
                    <div className="relative w-full h-[100px] ">
                      <img
                        src={
                          hotel?.images[0]?.isRelative
                            ? config.SERVER_URL +
                              hotel?.images[0]?.path
                            : hotel?.images[0]?.path
                        }
                        alt={"hotel" + hotelIndex}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className={` ${
                          selectedHotel?._id === hotel?._id
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
                          {hotel?.hotelName}
                        </p>
                      </div>
                      <div className="text-xs text-grayColor">
                        {hotel?.address}
                      </div>
                      <div className="text-xs text-grayColor flex items-center gap-1">
                        {hotel?.starCategory}
                        <span className="text-yellow-400 text-sm">
                          <AiFillStar />
                        </span>
                      </div>
                      <div className="text-xs text-grayColor">
                        {hotel?.city?.cityName +
                          " , " +
                          hotel?.state?.stateName}
                      </div>
                    </div>
                  </div>
                ))}
            </>
          ) : (
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
          )}
        </div>

        {Object.keys(selectedHotel).length !== 0 ? (
          <div className="flex justify-start p-2 mt-5 ">
            <button
              onClick={() => {
                dispatch(setHotelToStayArray({stayIndex:selectedStayIndex, hotelIndex: selectedHotelIndex}))

                setQuestions({
                  arrivalAirport: false,
                  departureAirport: false,
                  travelDate: false,
                  travelPartner: false,
                  hotelEnquiry: false,
                  hotelList: false,
                  suggestHotel: true,
                  suggestDetailCollection: false,
                  hotelDetailCollection: false,
                  transferHotels: false,
                  excursionList: false,
                  suplimetsOptionPage: false,
                  excursionSupplimetList: false,
                  visaQuotations: false,
                  createQuotation: false
                });
              }}
              className="text-xs font-[500] text-white bg-gradient-to-l from-blue-600 to-red-600 hover:from-red-600 hover:to-blue-600 rounded-sm shadow-mn h-8 px-5 "
            >
              Confirm
            </button>
            <br /><br /><br /><br />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default HotelSuggestDetailCollection