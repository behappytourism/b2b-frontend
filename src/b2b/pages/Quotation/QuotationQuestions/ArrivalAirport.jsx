import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  setArrivalAirport,
  setArrivalAirportDisabled,
  clearArrivalEditPageOnSideClearButton
} from "../../../../redux/slices/quotationSlice";
import { AiOutlineClose } from "react-icons/ai";
import lottieArrival from '../../../../static/B2bLotti/animation_ln8ocu6t.json'
import Lottie from "lottie-react";


function ArrivalAirport({ setQuestions, isLoading, setSteps }) {
  const { airports, arrivalAirport } = useSelector((state) => state.quotation);
  const dispatch = useDispatch();
  const [search, setSearch] = useState(arrivalAirport?.name ? arrivalAirport?.name : "");
  const [filteredAirport, setFilteredAirport] = useState([]);


  useEffect(() => {
    const keyword = new RegExp(search, "i");
    const filtered = airports.filter((entry) =>
      Object.values(entry).some(
        (val) => typeof val === "string" && val.match(keyword)
      )
    );
    setFilteredAirport(filtered);
  }, [search, airports]);

  useEffect(() => {
    setSteps({
      isArrivalAirport: true, 
      isDepartureAirport: false,
      isTravelDate: false,
      isTravelPartner: false,
      isStay: false,
      isTransfer: false,
      isExcursion: false,
      isSuppliment: false,
      isVisa: false,
    });
  },[])


  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="p-4 ml-4 lg:ml-0 lg:p-0">
        <div className="pb-1">
          <h3 className="text-md tracking-wide lg:text-center text-stone-600 font-bold text-start">
            What is your arrival airport ?
          </h3>
        </div>
        <div className="mt-2 relative flex lg:gap-10 gap-2 md:gap-5">
          <input
            className="outline-none lg:w-full w-72 border-[1px]  shadow-mn border-stone-100 border-opacity-70 rounded-md h-10 pl-10 text-sm font-[800] text-stone-500 placeholder:text-stone-300 "
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search for airports"
          />
          <div className="pt-1">
          <button
            onClick={() => {
              dispatch(setArrivalAirportDisabled(true));
              dispatch(setArrivalAirport({}));
              setQuestions({
                arrivalAirport: false,
                departureAirport: true,
                travelDate: false,
                travelPartner: false,
                hotelEnquiry: false,
                hotelList: false,
                suggestHotel: false,
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
            className="text-[14px] font-[600] text-white bg-primaryColor shadow-sm rounded px-4 h-8 "
          >
            Skip
          </button>
          </div>
          
          <div className="absolute top-0 left-0 bottom-0">
            <p className="text-3xl p-1 text-stone-300">
              <AiOutlineSearch />
            </p>
          </div>
          <div className="absolute lg:top-1 top-1 lg:left-[480px]  sm:left-60  left-56 bottom-0 cursor-pointer" onClick={ ()=>{
              setSearch("")
              dispatch(clearArrivalEditPageOnSideClearButton())
          } } >
            <p className="text-2xl p-1 text-stone-300">
              <AiOutlineClose />
            </p>
          </div>
        </div>

          <div className="flex ">
          <div className="mt-5 space-y-1 lg:space-y-2 max-h-[80vh] ">
          {filteredAirport?.map((airport, index) => (
            <div
              key={index}
              onClick={() => {
                dispatch(setArrivalAirport(airport));
                setQuestions({
                  arrivalAirport: false,
                  departureAirport: true,
                  travelDate: false,
                  travelPartner: false,
                  hotelEnquiry: false,
                  hotelList: false,
                  suggestHotel: false,
                  suggestDetailCollection: false,
                  hotelDetailCollection: false,
                  transferHotels: false,
                  excursionList: false,
                  suplimetsOptionPage: false,
                  excursionSupplimetList: false,
                  visaQuotations: false,
                  createQuotation: false
                });
                dispatch(setArrivalAirportDisabled(false));
              }}
              className={` ${arrivalAirport?.name === search && arrivalAirport?.name && search && arrivalAirport.terminalId === airport.terminals._id ? "cursor-pointer lg:w-[550px] w-72 h-10 group border-2 rounded-md px-2 items-center text-green-600 text-xs md:text-sm bg-green-100/50  border-green-500 flex justify-between" : "cursor-pointer lg:w-[550px] w-72 h-10 group hover:border-2 rounded-md px-2 items-center hover:text-green-600 text-xs md:text-sm text-stone-500 hover:bg-green-100/50  border-green-500 flex justify-between" }`}
            >
              <div className="font-[600] capitalize ">
                {" "}
                {airport?.airportName} - {airport?.terminals.terminalCode}
              </div>
            </div>
          ))}
        </div>
          <div className="pt-10 ">
          <div className="w-[500px]">
            <Lottie animationData={lottieArrival}/>
          </div>
        </div>
          </div>

      
      </div>
  
    </div>
  );
}

export default ArrivalAirport;
