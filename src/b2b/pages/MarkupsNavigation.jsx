import React from "react";
import { ImPageBreak } from "react-icons/im";
import { IoBedOutline, IoNewspaperOutline } from "react-icons/io5";
import { MdAttractions } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

function MarkupsNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { agent } = useSelector((state) => state.agents);
  return (
    <div>
      <div className="  md:w-auto  rounded-t-md md:rounded-t-md overflow-x-auto  scrollbar-hide">
        <div className="bg-[#f7f5f7] flex  space-x-1 px-1 py-3 md:py-1 items-center shadow ">
          <div className="max-w-screen-xl mx-auto w-full">
            <div className="w-full ">
              <ul className="flex">
                {/* {agent?.configuration?.showHotel ? (
                  <li className=" mr-8">
                    <span
                      className={`inline-block p-2 ${
                        location.pathname === "/markup/hotel"
                          ? " text-blue-500  "
                          : " text-gray-400 border-transparent hover:text-blue-400  "
                      }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                      href="#"
                      onClick={() => {
                        navigate("/markup/hotel");
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
                        location.pathname === "/markup/attraction"
                          ? " text-blue-500  "
                          : " text-gray-400 border-transparent hover:text-blue-400  "
                      }  rounded-full  transition duration-200 cursor-pointer flex items-center gap-1 text-sm`}
                      href="#"
                      onClick={() => {
                        navigate("/markup/attraction");
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
                        location.pathname === "/markup/visa"
                          ? " text-blue-500  "
                          : " text-gray-400 border-transparent hover:text-blue-400  "
                      }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                      href="#"
                      onClick={() => {
                        navigate("/markup/visa");
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
                {/* {agent?.configuration?.showQuotaion ? (
                  <li className=" mr-8">
                    <span
                      className={`inline-block p-2 ${
                        location.pathname === "/markup/quotation"
                          ? " text-blue-500  "
                          : " text-gray-400 border-transparent hover:text-blue-400  "
                      }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                      href="#"
                      onClick={() => {
                        navigate("/markup/quotation");
                      }}
                    >
                      <span className="text-lg">
                        <ImPageBreak />
                      </span>
                      Quotation
                    </span>
                  </li>
                ) : (
                  ""
                )} */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarkupsNavigation;
