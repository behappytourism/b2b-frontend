import React, { useEffect, useState } from "react";
import { ImPageBreak } from "react-icons/im";
import { IoBedOutline, IoNewspaperOutline } from "react-icons/io5";
import { MdAttractions } from "react-icons/md";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import HotelMarkupList from "./Hotel/HotelMarkupList";
import MarkUpList from "./Attraction/MarkUpList";
import VisaMarkupList from "./Visa/VisaMarkupList";
import QuotationMarkupIndex from "./Quotation/QuotationMarkupIndex";

function Markup() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { agent } = useSelector((state) => state.agents);

  const activeMarkup = searchParams.get("markup");

  const setQueryParameter = (value) => {
    return setSearchParams(
      (prev) => {
        prev.set("markup", value);
        return prev;
      },
      { replace: true }
    );
  };

  useEffect(() => {
    if (activeMarkup) {
      setQueryParameter(activeMarkup);
    } else if (agent?.configuration?.showHotel) {
      setQueryParameter("hotel");
    } else if (agent?.configuration?.showAttraction) {
      setQueryParameter("attraction");
    } else if (agent?.configuration?.showVisa) {
      setQueryParameter("visa");
    } else if (agent?.configuration?.showQuotaion) {
      setQueryParameter("quotation");
    }
  }, []);

  // const entries = Object.entries(agent?.configuration);
  // console.log(entries);
  // const mappedObject = entries?.filter((entry) => {
  //   return entry[0].startsWith("show");
  // });


  const renderTitleTab = () => {
    return (
      <div className="w-full ">
        <ul className="flex">
          {agent?.configuration?.showHotel ? (
            <li className=" mr-8">
              <span
                className={`inline-block p-2 ${
                  activeMarkup === "hotel"
                    ? " text-blue-500  "
                    : " text-gray-400 border-transparent hover:text-blue-400  "
                }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                href="#"
                onClick={() => {
                  setSearchParams(
                    (prev) => {
                      prev.set("markup", "hotel");
                      return prev;
                    },
                    { replace: true }
                  );
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
          )}
          {agent?.configuration?.showAttraction ? (
            <li className=" mr-8">
              <span
                className={`inline-block p-2 ${
                  activeMarkup === "attraction"
                    ? " text-blue-500  "
                    : " text-gray-400 border-transparent hover:text-blue-400  "
                }  rounded-full  transition duration-200 cursor-pointer flex items-center gap-1 text-sm`}
                href="#"
                onClick={() => {
                  setSearchParams(
                    (prev) => {
                      prev.set("markup", "attraction");
                      return prev;
                    },
                    { replace: true }
                  );
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
          {agent?.configuration?.showVisa ? (
            <li className=" mr-8">
              <span
                className={`inline-block p-2 ${
                  activeMarkup === "visa"
                    ? " text-blue-500  "
                    : " text-gray-400 border-transparent hover:text-blue-400  "
                }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                href="#"
                onClick={() => {
                  setSearchParams(
                    (prev) => {
                      prev.set("markup", "visa");
                      return prev;
                    },
                    { replace: true }
                  );
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
          )}
          {agent?.configuration?.showQuotaion ? (
            <li className=" mr-8">
              <span
                className={`inline-block p-2 ${
                  activeMarkup === "quotation"
                    ? " text-blue-500  "
                    : " text-gray-400 border-transparent hover:text-blue-400  "
                }  rounded-full   transition duration-200 cursor-pointer  flex items-center gap-1 text-sm`}
                href="#"
                onClick={() => {
                  setSearchParams(
                    (prev) => {
                      prev.set("markup", "quotation");
                      return prev;
                    },
                    { replace: true }
                  );
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
          )}
        </ul>
      </div>
    );
  };

  const renderMarkups = (tab) => {
    switch (tab) {
      case "hotel":
        return <HotelMarkupList />;
      case "attraction":
        return <MarkUpList />;
      case "visa":
        return <VisaMarkupList />;
      case "quotation":
        return <QuotationMarkupIndex />;
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="  md:w-auto  rounded-t-md md:rounded-t-md overflow-x-auto  scrollbar-hide">
        <div className="bg-[#f7f5f7] flex  space-x-1 px-1 py-3 md:py-1 items-center shadow ">
          <div className="max-w-screen-xl mx-auto w-full">
            {renderTitleTab()}
          </div>
        </div>
      </div>
      {renderMarkups(activeMarkup)}
    </div>
  );
}

export default Markup;
