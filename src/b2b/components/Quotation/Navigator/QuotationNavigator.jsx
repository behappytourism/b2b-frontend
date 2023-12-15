import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdAttractions } from "react-icons/md";
import {
  IoAirplaneOutline,
  IoBedOutline,
  IoCreateSharp,
  IoNewspaperOutline,
} from "react-icons/io5";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { BsListCheck } from "react-icons/bs";

function QuotationNavigator() {
  const navigate = useNavigate();
  const location = useLocation();
  const [view, setView] = useState({
    create:
      location.pathname.includes("/quotation/list")
        ? false
        : true,
    list: location.pathname.includes("/quotation/list") ? true : false,
  });
  return (
    <>
      <div className="">
        <div className=" relative ">
          <div className="  md:w-auto  rounded-t-md md:rounded-t-md overflow-x-auto  scrollbar-hide">
            <div className="bg-[#f7f5f7] flex  space-x-1 px-1 py-3 md:py-1 items-center shadow-mn ">
              <div className="max-w-screen-xl mx-auto w-full">
                <div className="w-full ">
                  <ul className="flex">
                    <li className=" mr-8">
                      <span
                        className={`inline-block p-2 ${
                          view.create
                            ? " text-blue-500  "
                            : " text-gray-400 border-transparent hover:text-blue-400  "
                        }  rounded-full  transition duration-200 cursor-pointer flex items-center gap-1 text-sm`}
                        href="#"
                        onClick={() => {
                          setView((prev) => {
                            return {
                              ...prev,
                              create: true,
                              list: false,
                            };
                          });

                          navigate("/quotation");
                        }}
                      >
                        <span className="text-lg">
                          <IoCreateSharp />
                        </span>
                        Create Quotation
                      </span>
                    </li>
                    <li className=" mr-8">
                      <span
                        className={`inline-block p-2 ${
                          view.list
                            ? " text-blue-500  "
                            : " text-gray-400 border-transparent hover:text-blue-400  "
                        }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                        href="#"
                        onClick={() => {
                          setView((prev) => {
                            return {
                              ...prev,
                              create: false,
                              list: true,
                            };
                          });

                          navigate("/quotation/list");
                        }}
                      >
                        <span className="text-lg">
                          <BsListCheck />
                        </span>
                        Quotation List
                      </span>
                      </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  );
}

export default QuotationNavigator;
