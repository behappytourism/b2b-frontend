import React from "react";
import { useLocation, useNavigate } from "react-router";
import { MdAttractions } from "react-icons/md";
import { IoAirplaneOutline, IoBedOutline, IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { useSelector } from "react-redux";
import { AiOutlineInsurance } from "react-icons/ai";
import { PiCarProfileLight } from "react-icons/pi";


function OrdersNavigator() {
  const navigate = useNavigate();
  const location = useLocation();

  const { agent } = useSelector((state) => state.agents);
  return (
    <div>
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
                          location.pathname === "/hotel/order"
                            ? " text-blue-500  "
                            : " text-gray-400 border-transparent hover:text-blue-400  "
                        }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                        href="#"
                        onClick={() => {
                          navigate("/hotel/order");
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
                          location.pathname === "/attraction/order"
                            ? " text-blue-500  "
                            : " text-gray-400 border-transparent hover:text-blue-400  "
                        }  rounded-full  transition duration-200 cursor-pointer flex items-center gap-1 text-sm`}
                        href="#"
                        onClick={() => {
                          navigate("/attraction/order");
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
                  
                  
                  {/* {agent?.configuration?.showVisa ? (
                    <li className=" mr-8">
                      <span
                        className={`inline-block p-2 ${
                          location.pathname === "/visa/order"
                            ? " text-blue-500  "
                            : " text-gray-400 border-transparent hover:text-blue-400  "
                        }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                        href="#"
                        onClick={() => {
                          navigate("/visa/order");
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
                          location.pathname === "/a2a/order"
                            ? " text-blue-500  "
                            : " text-gray-400 border-transparent hover:text-blue-400  "
                        }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                        href="#"
                        onClick={() => {
                          navigate("/a2a/order");
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
{/* 
                  <li className=" mr-8">
                    <span
                      className={`inline-block p-2 ${
                        location.pathname === "/insurance/order"
                          ? " text-blue-500  "
                          : " text-gray-400 border-transparent hover:text-blue-400  "
                      }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                      href="#"
                      onClick={() => {
                        navigate("/insurance/order");
                      }}
                    >
                      <span className="text-lg">
                        <AiOutlineInsurance />
                      </span>
                      Travel Insurance
                    </span>
                  </li> */}
                  {/* {agent?.configuration?.showA2a ? (
                    <li className=" mr-8">
                      <span
                        className={`inline-block p-2 ${
                          location.pathname === "/flight/order"
                            ? " text-blue-500  "
                            : " text-gray-400 border-transparent hover:text-blue-400  "
                        }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                        href="#"
                        onClick={() => {
                          navigate("/flight/order");
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

                    <li className=" mr-8">
                      <span
                        className={`inline-block p-2 ${
                          location.pathname === "/transfers/order"
                            ? " text-blue-500  "
                            : " text-gray-400 border-transparent hover:text-blue-400  "
                        }  rounded-full  transition duration-200 cursor-pointer flex items-center gap-1 text-sm`}
                        href="#"
                        onClick={() => {
                          navigate("/transfers/order");
                        }}
                      >
                        <span className="text-lg">
                        <PiCarProfileLight />
                        </span>
                        Transfer
                      </span>
                    </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersNavigator;
