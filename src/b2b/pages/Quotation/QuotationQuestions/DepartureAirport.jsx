import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  setDepartureAirport,
  setDepartureAirportDisabled,
} from "../../../../redux/slices/quotationSlice";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import Lottie from "lottie-react";
import LottiDeparture from '../../../../static/B2bLotti/animation_ln8sh3to.json'


function DepartureAirport({ setQuestions, setSteps }) {


  const { airports, departureAirport } = useSelector((state) => state.quotation);
  const dispatch = useDispatch();
  const [search, setSearch] = useState(departureAirport?.name ? departureAirport?.name : "");
  const [filteredAirport, setFilteredAirport] = useState([]);
  const [isEffect, setIsEffect] = useState(true);

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
      isArrivalAirport: false,
      isDepartureAirport: true,
      isTravelDate: false,
      isTravelPartner: false,
      isStay: false,
      isTransfer: false,
      isExcursion: false,
      isSuppliment: false,
      isVisa: false,
    });
    setTimeout(() => {
      setIsEffect(false);
    }, 100);

  }, []);

  return (
    <div className="max-w-screen-sm mx-auto">
      <div
        className={`${
          isEffect ? " scale-0 " : " scale-100 "
        } transition-all duration-500 p-4 ml-4 lg:ml-0 lg:p-0`}
      >
       
        <div className="pb-1">
          <h3 className="text-md tracking-wide lg:text-center text-start text-stone-600 font-bold">
            What is your departure airport ?
          </h3>
        </div>
      
        <div className="mt-2 relative flex lg:gap-10 gap-3" >
          <input
            className="outline-none lg:w-full w-72 border-[1px] shadow-mn border-stone-100 border-opacity-70 rounded-md h-10 pl-10   text-sm font-[800] text-stone-500 placeholder:text-stone-300"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for airports"
          />
          <div className="pt-1">
            <button
              onClick={() => {
                dispatch(setDepartureAirportDisabled(true));
                dispatch(setDepartureAirport({}));
            
                setQuestions({
                  arrivalAirport: false,
                  departureAirport: false,
                  travelDate: true,
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
                  createQuotation: false,
                });
              }}
              className="text-[14px] font-[600] text-white bg-primaryColor shadow-sm rounded px-4 h-8"
            >
              Skip
            </button>
          </div>
          <div className="absolute top-0 left-0 bottom-0">
            <p className="text-3xl p-1 text-stone-300">
              <AiOutlineSearch />
            </p>
          </div>
          <div className="absolute top-1 lg:left-[480px] sm:left-60 left-56 bottom-0 cursor-pointer" onClick={()=>{
              setSearch("")
          } } >
            <p className="text-2xl p-1 text-stone-300">
              <AiOutlineClose />
            </p>
          </div>
        </div>
          <div className="flex gap-8">
        <div className="mt-5 lg:space-y-2 space-y-1  max-h-[80vh]">
          {filteredAirport?.map((airport, index) => (
            <div
              key={index}
              onClick={() => {
                dispatch(setDepartureAirport(airport));
                setQuestions({
                  arrivalAirport: false,
                  departureAirport: false,
                  travelDate: true,
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
                  createQuotation: false,
                });
                dispatch(setDepartureAirportDisabled(false));
              }}
              className={` ${departureAirport?.name === search && departureAirport?.name && search && departureAirport.terminalId === airport.terminals._id ? "cursor-pointer lg:w-[550px] w-72 h-10 group border-2 rounded-md px-2 items-center text-green-600 text-xs md:text-sm bg-green-100/50  border-green-500 flex justify-between" : "cursor-pointer lg:w-[550px] w-72 h-10 group hover:border-2 rounded-md px-2 items-center hover:text-green-600 text-xs md:text-sm text-stone-500 hover:bg-green-100/50  border-green-500 flex justify-between" }`}
            >
                <div className="flex">
                <div className="font-[600] capitalize ">
                  {" "}
                  {airport?.airportName} - {airport?.terminals.terminalCode}
                </div>
                </div>
            </div>
          ))}
        </div>
        <div className="pt-10 ">
          <div className="w-[350px]">
            <Lottie animationData={LottiDeparture}/>
          </div>
        </div>
          </div>
      </div>
    </div>
  );
}

export default DepartureAirport;
