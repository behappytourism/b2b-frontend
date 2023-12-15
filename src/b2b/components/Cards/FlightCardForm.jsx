import React, { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineSearch, AiOutlineUp } from "react-icons/ai";
import { BsCalendar2Date } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { TbArrowsRight, TbArrowsRightLeft } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import axios from "../../../axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllAirports } from "../../../redux/slices/generalSlice";
import AirportsCard from "./AirportsCard";
import {
  addFlightRow,
  handleFlightDeatilsChange,
  handleTravellersChange,
  removeFlightRow,
} from "../../../redux/slices/flightSlice";

const FlightCardForm = ({ index, data, length }) => {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const [showCityTo, setShowCityTo] = useState(false);
  const [showCityFrom, setShowCityFrom] = useState(false);
  const [ slctClass, setSlctClass ] = useState()
  const { tripType, travellers, flightsData } = useSelector(
    (state) => state.flight
  );

  useEffect(() => {
    dispatch(getAllAirports());
  }, []);

  const handleIncrementPassenger = (name, x) => {
    if (travellers[name] < 1 && x === -1) return;
    if (name === "adult" && travellers[name] === 1 && x === -1) return;

    const data = { ...travellers };

    data[name] = data[name] + x;

    if (data.infant > data.adult) data.infant = data.adult;
    if (data.infant > data.adult) return;
    dispatch(handleTravellersChange({ data }));
  };

  const IncrDecsBtn = ({ name }) => {
    return (
      <>
        <div className=" w-12 grid grid-cols-2">
          <button
            className="border rounded-full bg-white text-[20px] font-bold"
            onClick={() => {
              handleIncrementPassenger(name, -1);
            }}
          >
            -
          </button>
          <button
            className="border rounded-full bg-white text-[20px] font-semibold"
            onClick={() => {
              handleIncrementPassenger(name, 1);
            }}
          >
            +
          </button>
        </div>
      </>
    );
  };


  const handleClass = (e)=>{
    setSlctClass(e.target.value)
    const  {name,value} = e.target
    dispatch(handleFlightDeatilsChange({name,value, index}))
  }

  const handleAddCity = () => {
    dispatch(addFlightRow());
  };

  const handleRemoveCity = (index) => {
    dispatch(removeFlightRow({ index }));
  };

  const handleDetailChange = (data) => {
    const {
      target: { name, value },
    } = data;

    dispatch(handleFlightDeatilsChange({ name, value, index }));
  };

  return (
    <>
                                    
  {/* { 'md:'? <div className="md:h-14 md:w-full md:bg-blueColor rounded-t-2xl">
      <h1 className="md:text-white md:text-center p-4">Search your Favourite </h1>
    </div> : "hidden"} */}

    <div className=" md:grid md:grid-cols-8 space-y-4 md:space-y-0 py-4 relative border rounded-2xl md:h-60 shadow-xl p-5">
      <div className="md:col-span-2 flex justify-center items-center  relative">
        <div className="w-[100%]">
          <div className="relative w-full py-4 px-3  border rounded-l-lg border-black h-20">
            {/* <span className="absolute  left-3 z-10 -top-3 transform translate-y-0.5 text-xs font-semibold text-blue-500  bg-[#f5f5f5]  px-1 flex gap-1 border-l-2 border-r-2 border-blue-400 pr-2">
              <span className="text-xl text-blue">
                <IoLocationOutline />{" "}
              </span>
              <span className="text-sm"> From</span>
            </span> */}
       
            <div
              className="text-gray-300  capitalize font-semibold relative cursor-pointer p-3"
              onClick={() => {
                setShowCityFrom(!showCityFrom);
              }}
            >
              {flightsData?.[index]?.cityFrom?.name?.length > 0
                ? `${flightsData?.[index]?.cityFrom?.name} (${flightsData?.[index]?.cityFrom?.iata})`
                : "City From"}
            </div>
            {showCityFrom && (
              <AirportsCard
                name="cityFrom"
                index={index}
                hide={setShowCityFrom}
              />
            )}
          </div>
        <span className="absolute -right-5 top-20 border text-lg bg-white shadow-md text-blue-400 rounded-full text-[30px] p-2">
            {(tripType === "oneway" || tripType === "multicity") && (
              <TbArrowsRight />
            )}
            {tripType === "return" && <TbArrowsRightLeft />}
          </span> 
        </div>
      </div>
      <div className="md:col-span-2 flex justify-center items-center ">
        <div className="relative w-full py-4 px-3  border  border-black h-20 ">
          {/* <span className="absolute  left-3 z-10 -top-3 transform translate-y-0.5 text-xs font-semibold text-blue-500  bg-[#f5f5f5]  px-1 flex gap-1 border-l-2 border-r-2 border-blue-400 pr-2">
            <span className="text-xl text-blue">
              <IoLocationOutline />{" "}
            </span>
            <span className="text-sm"> To</span>
          </span> */}
          <div
            className="text-gray-300  capitalize font-semibold relative cursor-pointer p-3 ml-4"
            onClick={() => {
              setShowCityTo(!showCityTo);
            }}
          >
            {flightsData?.[index]?.cityTo?.name?.length > 0
              ? `${flightsData?.[index]?.cityTo?.name}, (${flightsData?.[index]?.cityTo?.iata})`
              : "City To"}
          </div>
          {showCityTo && (
            <AirportsCard name="cityTo" index={index} hide={setShowCityTo} />
          )}
        </div>
      </div>
      <div className="md:col-span-1 flex justify-center items-center ">
        <div className="relative w-full py-4 px-3  border  border-black h-20 ">
          <span className="absolute -top-0 transform translate-y-0.5 ">
            {/* <span className="text-xl text-blue">
              <BsCalendar2Date />{" "}
            </span> */}
            <span className="text-sm text-gray-300">Depart :</span>
          </span>
          <input
            type="date"
            list="Country"
            placeholder=""
            name="departureDate"
            value={data?.departureDate}
            onChange={(e) => {
              handleDetailChange(e, index);
            }}
            required
            className="block w-full capitalize outline-none bg-transparent text-sm text-gray-300 font-medium pt-3"
          />
        </div>
      </div>
      <div className="md:col-span-1 flex justify-center items-center ">
        <div className="relative w-full py-4 px-3  border border-black h-20 ">
          <span className="absolute -top-0 transform translate-y-0.5 ">
            {/* <span className="text-xl text-blue">
              <BsCalendar2Date />{" "}
            </span> */}
            <span className="text-sm text-gray-300">Return :</span>
          </span>
          <input
            type="date"
            list="Country"
            placeholder="?"
            disabled={tripType !== "return"}
            name="returnDate"
            value={data?.returnDate}
            onChange={(e) => {
              handleDetailChange(e, index);
            }}
            required
            className="block w-full capitalize outline-none bg-transparent text-sm text-gray-300 font-medium pt-3"
          />
        </div>
      </div>
      {index === 0 && (
        <div className="md:col-span-1 flex justify-center items-center">
          <div className="relative w-full py-4 px-3  border rounded-r-lg border-black h-20">
            <span className="text-gray-300">Travellers</span>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setDropdown(!dropdown)}
            >
              {/* <span className="absolute  left-3 z-10 -top-3 transform translate-y-0.5 text-xs font-semibold text-blue-500  bg-[#f5f5f5]  px-1 flex gap-1 border-l-2 border-r-2 border-blue-400">
                <span className="text-xl text-blue"></span>
                <span className="text-sm">Travellers</span>
              </span> */}
              <span className="px-3 text-[16px]">
                {travellers.adult + travellers.children + travellers.infant}
              </span>
              <span className="font-extralight text-[13px]">{slctClass}</span> 
              <span className="px-3 text-sm">
                {dropdown ? <AiOutlineUp /> : <AiOutlineDown />}{" "}
              </span>
            </div>
            {dropdown && (
             <div className="absolute rounded-lg bg-white  right-0 top-[60px]  w-96 z-10 shadow-lg">
             <ul>
               <li>
                 <div className="grid grid-cols-6 text-sm px-6 py-[12px]  transition-all text-darktext ">
                   <span className="col-span-3">Adults</span>
                   <span>{travellers?.adult}</span>
                   <span className="col-span-2">
                     <IncrDecsBtn name="adult" />
                   </span>
                   <p className="font-light text-fontPX">12+Years</p>
                 </div>
               </li>
               <li>
                 <div className="grid grid-cols-6  text-sm px-6 py-[12px] transition-all text-darktext ">
                   <span className="col-span-3">Children</span>
                   <span>{travellers?.children}</span>
                   <span className="col-span-2">
                     <IncrDecsBtn name="children" />
                   </span>
                   <p className="font-light text-fontPX">2-12 Years</p>
                 </div>
               </li>
               <li>
                 <div className="grid grid-cols-6  text-sm px-6 py-[12px] transition-all text-darktext  ">
                   <span className="col-span-3">Infant</span>
                   <span>{travellers?.infant}</span>
                   <span className="col-span-2">
                     <IncrDecsBtn name="infant" />
                   </span>
                   <p className="font-light text-fontPX">0-2 Years</p>
                 </div>
                 <div className="p-4 ">
                       <span className="">Cabin class</span>
                       <div className="flex items-center">
                     <input onChange={handleClass}  id="default-radio-2" type="radio" value="Economy" name="class" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                     <label  className="ml-2 text-sm font-normal text-gray-900">Economy</label>
                   </div>
                   <div className="flex items-center">
                     <input onChange={handleClass}  id="default-radio-2" type="radio" value="Business" name="class" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                     <label className="ml-2 text-sm font-normal text-gray-900">Business</label>
                   </div>
                   <div className="flex items-center">
                     <input onChange={handleClass} id="default-radio-2" type="radio" value="First" name="class" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                     <label className="ml-2 text-sm font-normal text-gray-900">First</label>
                   </div>
                   </div>
               </li>
             </ul>
           </div>
            )}
          </div>
        </div>
      )}
      {index === length - 1 && (
        <div className="md:col-span-1 flex justify-left px-4 gap-4 items-center">
          <div className="">
            <button
              type="submit"
              className="h-14 w-28 bg-blueColor rounded-xl text-light flex justify-center items-center"
            >Search
              {/* <AiOutlineSearch /> */}
            </button>
          </div>
          {tripType === "multicity" && (
            <div className="">
              <button
                onClick={handleAddCity}
                className="h-14 w-28 bg-blueColor rounded-xl text-light text-sm flex justify-center items-center"
              >
                Add City
              </button>
            </div>
          )}
        </div>
      )}
      {length > 2 && (
        <div className="absolute right-4 h-[100%]  text-red-700 flex items-center">
          <button
            className="text-[25px] transform hover:rotate-[360deg] transition-all transition-1000 "
            onClick={() => {
              handleRemoveCity(index);
            }}
          >
            <RxCross2 />
          </button>
        </div>
      )}
    </div>                      
    </>
  );
};

export default FlightCardForm;
