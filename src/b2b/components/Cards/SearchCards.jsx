import React, { useState } from "react";
import AttractionCard from "./AttractionCard";
import FlightCard from "./FlightCard";
import HotelCard from "./HotelCard";
import VisaCard from "./VisaCard";
import CarCard from "./CarCard";
import { useLocation, useNavigate } from "react-router-dom";
import SliderCalender from "./SliderCalender";
import { MdAttractions } from "react-icons/md";
import {
  IoAirplaneOutline,
  IoBedOutline,
  IoNewspaperOutline,
} from "react-icons/io5";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { useSelector } from "react-redux";
import { AiOutlineInsurance } from "react-icons/ai";
import { MdCardTravel } from "react-icons/md";

function SearchCards({
  promotionOne,
  promotionTwo,
  hotelBackground,
  isHomeDataLoading,
  setIsHomeDataLoading,
}) {
  const navigate = useNavigate();
  const location = useLocation();


  const [view, setView] = useState({
    // attraction: location.pathname.includes("/") ? true : false,
    transfer:  location.pathname.includes("/transfer") ? true : false,
     attraction:
      location.pathname.includes("/attraction") ||
      location.pathname.includes("/transfer")
        ? false
        : true,

    // flight: location.pathname.includes("/flight") ? true : false,
    // hotel:
    //   location.pathname.includes("/visa") ||
    //   location.pathname.includes("/flight") ||
    //   location.pathname.includes("/attraction") ||
    //   location.pathname.includes("/a2a") ||
    //   location.pathname.includes("/insurance") ||
    //   location.pathname.includes("/transfer")
    //     ? false
    //     : true,
    // visa: location.pathname.includes("/visa") ? true : false,
    // a2a: location.pathname.includes("/a2a") ? true : false,
    // insurance: location.pathname.includes("/insurance") ? true : false,
  });

  const { agent } = useSelector((state) => state.agents);
  return (
    <>
      <div className="">
        <div className=" relative ">
          <div className="  md:w-auto  rounded-t-md md:rounded-t-md overflow-x-auto  scrollbar-hide">
            <div className="bg-[#f7f5f7] flex  space-x-1 px-1 py-3 md:py-1 items-center shadow ">
              <div className="max-w-screen-xl mx-auto w-full">
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

                            navigate("/");
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
                    {/* {agent?.configuration?.showAttraction ? (
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
                                transfer: false
                                // hotel: false,
                                // visa: false,
                                // transfer: false,
                                // flight: false,
                                // a2a: false,
                                // insurance: false,
                              };
                            });

                            navigate("/");
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
                    )} */}
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

                            navigate("/flight");
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

                            navigate("/visa");
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

                            navigate("/a2a");
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

                            navigate("/insurance");
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
                     {/* <li className=" mr-8">
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
                                transfer: true,
                                // hotel: false,
                                // visa: false,
                                // flight: false,
                                // a2a: false,
                                // insurance: false,
                              };
                            });

                            navigate("/transfer");
                          }}
                        >
                          <span className="text-lg">
                          <MdCardTravel />
                          </span>
                          Transfer
                        </span>
                      </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-start shadow-b-sm shadow-x-sm">
            <div className=" w-full  md:rounded-md relative  ">
              <>
                {/* {view.attraction && <AttractionCard />} */}

                {/* {view.flight && <FlightCard />} */}
                {/* {view.hotel && (
                  <HotelCard
                    promotionOne={promotionOne}
                    promotionTwo={promotionTwo}
                    hotelBackground={hotelBackground}
                    isHomeDataLoading={isHomeDataLoading}
                    setIsHomeDataLoading={setIsHomeDataLoading}
                  />
                )} */}
                {/* {view.visa && <VisaCard />} */}
                {/* {view.transfer && <CarCard />} */}
                {/* {view?.a2a && (
                  <>
                    {location.pathname.includes("/a2a") && <SliderCalender />}
                  </>
                )} */}
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchCards;
