import React, { useState } from "react";
import { AiOutlineInsurance } from "react-icons/ai";
import {
  IoAirplaneOutline,
  IoBedOutline,
  IoNewspaperOutline,
} from "react-icons/io5";
import { MdAttractions, MdOutlineAirplaneTicket } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AttractionCard from "./Cards/AttractionCard";
import FlightCard from "../Flight/FlightCard";
import HotelCard from "./Cards/HotelCard";
import VisaCard from "./Cards/VisaCard";
import CarCard from "../../components/Cards/CarCard";
import SliderCalender from "../../components/Cards/SliderCalender";
import { MdCardTravel } from "react-icons/md";


function ErrorSearchCard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [view, setView] = useState({
    // attraction: location.pathname.includes("/") ? true : false,
      attraction:
      // location.pathname.includes("/visa") ||
      // location.pathname.includes("/flight") ||
      location.pathname.includes("/transfer") 
      // location.pathname.includes("/a2a") ||
      // location.pathname.includes("/insurance")
        ? false
        : true,

    // flight: location.pathname.includes("/flight") ? true : false,
    // hotel:
    //   location.pathname.includes("/visa") ||
    //   location.pathname.includes("/flight") ||
    //   location.pathname.includes("/attraction") ||
    //   location.pathname.includes("/a2a") ||
    //   location.pathname.includes("/insurance")
    //     ? false
    //     : true,
    // visa: location.pathname.includes("/visa") ? true : false,
    transfer: location.pathname.includes("/transfer") ? true : false,
    // a2a: location.pathname.includes("/a2a") ? true : false,
    // insurance: location.pathname.includes("/insurance") ? true : false,
  });

  const { agent } = useSelector((state) => state.agents);
  return (
    <div className=" relative ">
      <div className="  md:w-auto  rounded-t-md md:rounded-t-md overflow-x-auto  scrollbar-hide">
        <div className="max-w-screen-sm mx-auto w-full bg-[#f7f5f7] flex  space-x-1 px-1 py-3 md:py-1 items-center shadow ">
          <div className=" w-full">
            <div className="w-full ">
              <ul className="flex">
                {/* {agent?.configuration?.showHotel ? (
                  <li className=" mr-8">
                    <span
                      className={`inline-block p-2 ${
                        view.hotel
                          ? " text-blue-500  "
                          : " text-gray-400 border-transparent hover:text-blue-400  "
                      }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                      href="#"
                      onClick={() => {
                        setView((prev) => {
                          return {
                            ...prev,
                            attraction: false,
                            hotel: true,
                            visa: false,
                            transfer: false,
                            flight: false,
                            a2a: false,
                            insurance: false,
                          };
                        });
                      }}
                    >
                      <span className="text-lg">
                        <IoBedOutline />
                      </span>
                      Hotel
                    </span>
                  </li>
                ) : (
                  ""
                )} */}
                {agent?.configuration?.showAttraction ? (
                  <li className=" mr-8">
                    <span
                      className={`inline-block p-2 ${
                        view.attraction
                          ? " text-blue-500  "
                          : " text-gray-400 border-transparent hover:text-blue-400  "
                      }  rounded-full  transition duration-200 cursor-pointer flex items-center gap-1 text-sm`}
                      href="#"
                      onClick={() => {
                        setView((prev) => {
                          return {
                            ...prev,
                            attraction: true,
                            hotel: false,
                            visa: false,
                            transfer: false,
                            flight: false,
                            a2a: false,
                            insurance: false,
                          };
                        });
                      }}
                    >
                      <span className="text-lg">
                        <MdAttractions />
                      </span>
                      Attractions
                    </span>
                  </li>
                ) : (
                  ""
                )}
                {/* {agent?.configuration?.showFlight ? (
                  <li className="mr-8">
                    <span
                      className={`inline-block p-2 ${
                        view.flight
                          ? " text-blue-500  "
                          : " text-gray-400 border-transparent hover:text-blue-400  "
                      }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                      href="#"
                      onClick={() => {
                        setView((prev) => {
                          return {
                            ...prev,
                            attraction: false,
                            hotel: false,
                            visa: false,
                            transfer: false,
                            flight: true,
                            a2a: false,
                            insurance: false,
                          };
                        });
                      }}
                    >
                      <span className="text-lg">
                        <IoAirplaneOutline />
                      </span>
                      Flight
                    </span>
                  </li>
                ) : (
                  ""
                )} */}
                {/* {agent?.configuration?.showVisa ? (
                  <li className=" mr-8">
                    <span
                      className={`inline-block p-2 ${
                        view.visa
                          ? " text-blue-500  "
                          : " text-gray-400 border-transparent hover:text-blue-400  "
                      }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                      href="#"
                      onClick={() => {
                        setView((prev) => {
                          return {
                            ...prev,
                            attraction: false,
                            hotel: false,
                            visa: true,
                            transfer: false,
                            flight: false,
                            a2a: false,
                            insurance: false,
                          };
                        });
                      }}
                    >
                      <span className="text-lg">
                        <IoNewspaperOutline />
                      </span>
                      Visa
                    </span>
                  </li>
                ) : (
                  ""
                )} */}
                {/* {agent?.configuration?.showA2a ? (
                  <li className=" mr-8">
                    <span
                      className={`inline-block p-2 ${
                        view.a2a
                          ? " text-blue-500  "
                          : " text-gray-400 border-transparent hover:text-blue-400  "
                      }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                      href="#"
                      onClick={() => {
                        setView((prev) => {
                          return {
                            ...prev,
                            attraction: false,
                            hotel: false,
                            visa: false,
                            transfer: false,
                            flight: false,
                            a2a: true,
                            insurance: false,
                          };
                        });
                      }}
                    >
                      <span className="text-lg">
                        <MdOutlineAirplaneTicket />
                      </span>
                      A2A
                    </span>
                  </li>
                ) : (
                  ""
                )} */}
                {/* {agent?.configuration?.showInsurance ? (
                  <li className=" mr-8">
                    <span
                      className={`inline-block p-2 ${
                        view.insurance
                          ? " text-blue-500  "
                          : " text-gray-400 border-transparent hover:text-blue-400  "
                      }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                      href="#"
                      onClick={() => {
                        setView((prev) => {
                          return {
                            ...prev,
                            attraction: false,
                            hotel: false,
                            visa: false,
                            transfer: false,
                            flight: false,
                            a2a: false,
                            insurance: true,
                          };
                        });
                      }}
                    >
                      <span className="text-lg">
                        <AiOutlineInsurance />
                      </span>
                      Travel Insurance
                    </span>
                  </li>
                ) : (
                  ""
                )} */}

                <li className=" mr-8">
                    <span
                      className={`inline-block p-2 ${
                        view.transfer
                          ? " text-blue-500  "
                          : " text-gray-400 border-transparent hover:text-blue-400  "
                      }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                      href="#"
                      onClick={() => {
                        setView((prev) => {
                          return {
                            ...prev,
                            attraction: false,
                            transfer: true
                          };
                        });
                        navigate('/transfer')
                      }}
                    >
                      <span className="text-lg">
                      <MdCardTravel />
                      </span>
                      Transfer
                    </span>
                  </li> 
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex items-center justify-start shadow-b-sm shadow-x-sm">
        <div className=" w-full  md:rounded-md relative  ">
          <>
            {view.attraction && <AttractionCard />}
          
            {/* {view.flight && <FlightCard />} */}
            {/* {view.hotel && <HotelCard />}
            {view.visa && <VisaCard />} */}
            {/* {view.transfer && <CarCard />} */}
            {/* {view?.a2a && (
              <>
                {location.pathname.includes("/a2a") ||
                  (location.pathname.includes("/error") && <SliderCalender />)}
              </>
            )} */}
          </>
        </div>
      </div>
      
    </div>
  );
}

export default ErrorSearchCard;
