import React, { useEffect, useState } from "react";
import { BsClipboardPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setInitialTransferStays } from "../../../../redux/slices/quotationSlice";

import {
  addStayPlusOne,
  removeHotelFromStay,
  removeStayMinusOne,
  setIndexesForAssertion,
} from "../../../../redux/slices/quotationSlice";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { config } from "../../../../constants";
import { TbPlayerTrackNextFilled } from "react-icons/tb";


function HotelList({ setQuestions }) {
  const dispatch = useDispatch();
  const { stays, checkOutDate } = useSelector((state) => state.quotation);

  let lastIndex = stays.length - 1;

  const [showHover, setShowHover] = useState(false);
  const [lastInd, setLastInd] = useState(1);
  const [existCheckoutDate, setExistCheckoutDate] = useState();
  const [length, setLength] = useState();

  const handleCheckOutDateShow = () => {
    if (stays?.length) {
      setLength(stays?.length - 1);
      stays?.map((ele) => {
        if (ele?.hotels?.length) {
          setLastInd(ele?.hotels?.length - 1);
          setExistCheckoutDate(ele?.hotels[lastInd]?.checkOutDate.slice(0, 10));
        }
      });
    }
  };

  useEffect(() => {
    handleCheckOutDateShow();
  });

  useEffect(() => {
    dispatch(setInitialTransferStays());
  }, []);

  return (
    <div className="md:max-w-screen-lg  mx-auto">
      <div classsName="">
        <div className="pb-5">
          <h3 className="text-md tracking-wide text-center text-stone-600 font-bold">
            Where do you want to stay ?
          </h3>
        </div>
        {stays?.map((stay, stayIndex) => {
          return (
            <div key={stayIndex} className="mt-5 p-5 bg-white shadow-round ">
              <div className="flex justify-between p-1 pb-2">
                <p className="text-xs  text-gray-300">Stay {stayIndex + 1}</p>
                {stays.length > 1 ? (
                  <p
                    onClick={() => {
                      dispatch(removeStayMinusOne(stayIndex));
                    }}
                    className="text-xs rounded-sm text-red-500 p-1 bg-gray-50 "
                  >
                    <AiOutlineClose />
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-5 sm:grid-cols-3 gap-3 ">
                {stay?.hotels?.map((hotel, hotelIndex) => (
                  <div
                    key={hotelIndex}
                    className="relative cursor-pointer bg-white overflow-hidden hover:-translate-y-1 transition-all duration-300 rounded-md border-[1px] border-gray-100 border-opacity-20 shadow-round w-full  flex flex-col items-center"
                  >
                    <div className=" w-full h-[100px] bg-gray-200">
                      <img
                        src={
                          hotel?.hotelData?.image?.isRelative
                            ? config.SERVER_URL +
                              hotel?.hotelData?.image?.path
                            : hotel?.hotelData?.image?.path
                        }
                        alt={"hotel" + hotelIndex}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div
                      onClick={() => {
                        dispatch(
                          setIndexesForAssertion({
                            stayIndex: stayIndex,
                            hotelIndex: hotelIndex,
                          })
                        );
                        setQuestions({
                          arrivalAirport: false,
                          departureAirport: false,
                          travelDate: false,
                          travelPartner: false,
                          hotelEnquiry: false,
                          hotelList: false,
                          suggestHotel: false,
                          suggestDetailCollection: false,
                          hotelDetailCollection: true,
                          transferHotels: false,
                          excursionList: false,
                          suplimetsOptionPage: false,
                          excursionSupplimetList: false,
                          visaQuotations: false,
                          createQuotation: false,
                        });
                      }}
                      className="absolute top-1 left-1 w-7 h-7 flex justify-center items-center rounded-full shadow-mn bg-gray-50/50 text-blue-500"
                    >
                      <MdModeEditOutline />
                    </div>
                    <div
                      onClick={() => {
                        dispatch(
                          removeHotelFromStay({
                            stayIndex: stayIndex,
                            hotelIndex: hotelIndex,
                          })
                        );
                      }}
                      className="absolute top-1 right-1 w-7 h-7 flex justify-center items-center rounded-full shadow-mn bg-gray-50/50 text-red-500"
                    >
                      <AiFillDelete />
                    </div>
                    <div className="p-2 text-center">
                      <div className="pt-2">
                        <p className="text-sm font-[500] text-gray-400">
                          {hotel?.hotelName}
                        </p>
                      </div>
                      <div className="grid-row-1 p-1">
                        <div className="pt-2 text-left">
                          <p className="text-[12px]  text-gray-400">
                            Check-In : {hotel?.checkInDate}
                          </p>
                        </div>
                        <div className=" text-left">
                          <p className="text-[11px]  text-gray-400 ">
                            Check-Out : {hotel?.checkOutDate}
                          </p>
                        </div>
                        <div className=" text-left">
                          <p className="text-[11px]  text-gray-400 ">
                            Room type : {hotel?.roomTypeName}
                          </p>
                        </div>
                        <div className=" text-left">
                          <p className="text-[11px]  text-gray-400 ">
                            Board type : {hotel?.boardTypeName}
                          </p>
                        </div>
                      </div>

                      <div className="p-2 text-left">
                        <div className="text-xs text-grayColor">
                          {hotel?.hotelData?.address}
                        </div>

                        <div className="text-xs text-grayColor">
                          {hotel?.placeName
                            ? hotel?.placeName
                            : "" + " , " + hotel?.hotelData?.state?.stateName
                            ? hotel?.hotelData?.state?.stateName
                            : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                
                {new Date(checkOutDate) > new Date(existCheckoutDate) ||
                !stays[stayIndex].hotels?.length ? (
                  <div
                    onClick={() => {
                      dispatch(
                        setIndexesForAssertion({
                          stayIndex: stayIndex,
                          hotelIndex: stay.hotels.length,
                        })
                      );
                      // dispatch(addHotelPlusOne(stayIndex));
                      setQuestions({
                        arrivalAirport: false,
                        departureAirport: false,
                        travelDate: false,
                        travelPartner: false,
                        hotelEnquiry: false,
                        hotelList: false,
                        suggestHotel: false,
                        suggestDetailCollection: false,
                        hotelDetailCollection: true,
                        transferHotels: false,
                        excursionList: false,
                        suplimetsOptionPage: false,
                        excursionSupplimetList: false,
                        visaQuotations: false,
                        createQuotation: false,
                      });
                    }}
                    className="cursor-pointer min-h-[200px] bg-white overflow-hidden transition-all duration-300 rounded-md border-[1px] border-gray-100 border-opacity-20 shadow-round w-full p-4  "
                  >
                    <div className="h-full w-full border border-dashed">
                      <div className=" flex h-full flex-col items-center justify-center text-blue-300/50 hover:text-blue-300">
                        <p className="text-3xl">
                          <BsClipboardPlus />
                        </p>
                        <p className="text-[10px] pt-2 text-gray-300">
                          Add hotel
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}

        <div className="py-4 flex justify-between pb-20 md  :pb-0">
          <button
            onClick={() => dispatch(addStayPlusOne())}
            className="bg-gradient-to-l from-blue-600 to-red-600 hover:from-red-600 hover:to-blue-600 rounded text-xs md:text-[14px] font-[600] text-white shadow-sm w-28 md:w-[150px] py-2"
          >
            Add New Stay
          </button>

          {stays[lastIndex].hotels.length || stays[0]?.hotels?.length ? (
            <>
              <button
                onClick={() => {
                  setQuestions({
                    arrivalAirport: false,
                    departureAirport: false,
                    travelDate: false,
                    travelPartner: false,
                    hotelEnquiry: false,
                    hotelList: false,
                    suggestHotel: false,
                    suggestDetailCollection: false,
                    hotelDetailCollection: false,
                    transferHotels: true,
                    excursionList: false,
                    suplimetsOptionPage: false,
                    excursionSupplimetList: false,
                    visaQuotations: false,
                    createQuotation: false,
                  });
                }}
                className=" relative bg-gradient-to-l from-blue-600 to-red-600 hover:from-red-600 hover:to-blue-600 rounded text-[14px] font-[600] text-white shadow-sm md:w-[150px] w-28 py-2"
              >
                Next
                <span className="absolute top-3 bottom-0 right-0 left-28"><TbPlayerTrackNextFilled/></span>
              </button>
            </>
          ) : (
            <>
              <div className="relative">
                <button
                  onMouseOver={() => setShowHover(true)}
                  onMouseOut={() => setShowHover(false)}
                  className=" bg-gradient-to-l from-blue-600 to-red-600 hover:from-red-600 hover:to-blue-600 rounded text-[14px] font-[600] text-white shadow-sm w-[150px] py-2 cursor-not-allowed"
                >
                  Next
                <span className="absolute top-3 bottom-0 right-0 left-24"><TbPlayerTrackNextFilled/></span>
                </button>
              {showHover && (
                <div className="absolute w-[200px] bottom-0 top-10 left-0 right-44">
                  <div className="w-32 rounded h-9 bg-black text-white p-2 text-[10px]">
                    <p>Please add a hotel !!</p>
                  </div>
                </div>
              )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 

export default HotelList;
