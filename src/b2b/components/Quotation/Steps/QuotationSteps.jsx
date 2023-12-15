import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { clearStayIsEmpty, handleClearAllStates } from "../../../../redux/slices/quotationSlice";
import moment from "moment";


function QuotationSteps({ questions, setQuestions, setSteps, steps }) {
  const {
    arrivalAirport,
    isArrivalAirportDisabled,
    departureAirport,
    isDepartureAirportDisabled,
    checkInDate,
    checkOutDate,
    paxType,
    stays,
    selectedExcursion,
    selectedExcursionSuppliments,
    selectedVisaId,
    isVisaQuotaionsDisabled,
    isExcursionQuotationDisabled,
    isSupplimentQuotationDisabled,
    isHotelQuotationDisabled,
    transfer,
    isTransferQuotationDisabled
  } = useSelector((state) => state.quotation);

  const dispatch = useDispatch()

  // const date = new Date(checkInDate);
  // const checkinMonth = date.toLocaleString("default", { month: "short" });
  // const checkinDay = date.getDate();

  // const chckoutDate = new Date(checkOutDate);
  // const chockoutMonth = chckoutDate.toLocaleString("default", {
  //   month: "short",
  // });
  // const checkoutDate = chckoutDate.getDate();
  const formattedCheckInDate = moment(checkInDate, "YYYY-MM-DD").format("MMM-DD");
  const formattedCheckOutDate = moment(checkOutDate, "YYYY-MM-DD").format("MMM-DD");

  return (
    <div className="max-w-screen-lg mx-auto py-5">
      <div className="hidden md:flex gap-2 justify-between w-full items-center">
        <div
          onClick={() => {
            setQuestions({
              arrivalAirport: true,
              departureAirport: false,
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
              createQuotation: false,
            });
          }}
          className={`w-full border-b-4 border-blue-500 h-10 flex justify-center items-center px-2 cursor-pointer`}
        >
          {arrivalAirport.iata ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 flex justify-center gap-2">
              {arrivalAirport.iata}
              <div>
                <FaPlaneArrival />
              </div>
            </div>
          ) : isArrivalAirportDisabled ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
              Arrival N/A
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          onClick={() => {
            if (!steps.isArrivalAirport ) {
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
                createQuotation: false,
              });
            }
          }}
          className={`w-full border-b-4 ${
            arrivalAirport.iata || isArrivalAirportDisabled
              ? " border-blue-500 "
              : " border-stone-200 "
          }  h-10 flex justify-center items-center px-2 cursor-pointer`}
        >
          {departureAirport.iata ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 flex justify-center gap-2 ">
              {departureAirport.iata}
              <FaPlaneDeparture />
            </div>
          ) : isDepartureAirportDisabled ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
              Departure N/A
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          onClick={() => {
            if (!steps.isArrivalAirport && !steps.isDepartureAirport) {
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
            }
          }}
          className={`w-full border-b-4 ${
            departureAirport.iata || isDepartureAirportDisabled
              ? " border-blue-500 "
              : " border-stone-200 "
          }  h-10 flex justify-center items-center px-2 cursor-pointer`}
        >
          {checkInDate && checkOutDate ? (
            <div className="border w-full text-center text-[11px] font-[500] py-1 rounded bg-stone-100 ">
             {formattedCheckInDate} - {formattedCheckOutDate}
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          onClick={() => {
            dispatch(clearStayIsEmpty())
            if (
              !steps.isArrivalAirport &&
              !steps.isDepartureAirport &&
              !steps.isTravelDate
            ) {
              setQuestions({
                arrivalAirport: false,
                departureAirport: false,
                travelDate: false,
                travelPartner: true,
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
            }
          }}
          className={`w-full border-b-4 ${
            checkInDate && checkOutDate
              ? " border-blue-500 "
              : " border-stone-200 "
          }  h-10 flex justify-center items-center px-2 cursor-pointer`}
        >
          {paxType ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
              {paxType}
            </div>
          ) : (
            ""
          )}
        </div>

        <div
          onClick={() => {
              dispatch(clearStayIsEmpty())
            if (
              !steps.isArrivalAirport &&
              !steps.isDepartureAirport &&
              !steps.isTravelDate &&
              !steps.isTravelPartner
            ) {
              setQuestions({
                arrivalAirport: false,
                departureAirport: false,
                travelDate: false,
                travelPartner: false,
                hotelEnquiry: true,
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
            }
          }}
          className={`w-full border-b-4 ${
            paxType ? " border-blue-500 " : " border-stone-200 "
          }  h-10 flex justify-center items-center px-2 cursor-pointer`}
        >
          {stays[0]?.hotels?.length > 0 ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
              Stay
            </div>
          ) : paxType && stays[0]?.hotels?.length < 1 ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
              Stay N/A
            </div>
          ) : stays?.length < 0 ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
              Stay N/A
            </div>
          ) : isHotelQuotationDisabled === true ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
            Stay N/A
          </div>
          ) : (
            ""
          )}
        </div>

            {
              transfer?.length > 0 && (
                <div
                  onClick={() => {
                    if (
                      !steps.isArrivalAirport &&
                      !steps.isDepartureAirport &&
                      !steps.isTravelDate &&
                      !steps.isTravelPartner&&
                      !steps.isStay
                    ) {
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
                    }
                  }}
                  className={`w-full border-b-4 ${
                    stays[0]?.hotels?.length ? " border-blue-500 " : " border-stone-200 "
                  }  h-10 flex justify-center items-center px-2 cursor-pointer`}
                >
                  {transfer?.length > 0 ? (
                    <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
                      Transfer
                    </div>
                  ) : stays[0]?.hotels?.length < 0 && !transfer?.length ? (
                    <div className="border w-full text-center text-[10px] font-[500] py-1 rounded bg-stone-100 ">
                      Transfer N/A
                    </div>
                  ) : stays?.length < 0 && transfer?.length < 0 ? (
                    <div className="border w-full text-center text-[10px] font-[500] py-1 rounded bg-stone-100 ">
                      Transfer N/A
                    </div>
                  ) : isTransferQuotationDisabled === true ? (
                    <div className="border w-full text-center text-[10px] font-[500] py-1 rounded bg-stone-100 ">
                    Transfer N/A
                  </div>
                  ) : (
                    ""
                  )}
                </div>
              )
            }

        <div
          onClick={() => {
            if (
              !steps.isArrivalAirport &&
              !steps.isDepartureAirport &&
              !steps.isTravelDate &&
              !steps.isTravelPartner &&
              !steps.isStay
            ) {
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
                transferHotels: false,
                excursionList: true,
                suplimetsOptionPage: false,
                excursionSupplimetList: false,
                visaQuotations: false,
                createQuotation: false,
              });
            }
          }}
          className={`${
            selectedExcursion.length > 0
              ? " border-blue-500 "
              : " border-stone-200 "
          } w-full border-b-4  h-10 flex justify-center items-center px-2 cursor-pointer`}
        >
          {selectedExcursion.length > 0 ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 flex justify-center gap-2 ">
              Excursion
            </div>
          ) : isExcursionQuotationDisabled === true ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
              Excursion N/A
            </div>
          ) : (
            ""
          )}
        </div>
       
        <div
          onClick={() => {
            if (
              !steps.isArrivalAirport &&
              !steps.isDepartureAirport &&
              !steps.isTravelDate &&
              !steps.isTravelPartner &&
              !steps.isStay &&
              !steps.isTransfer &&
              !steps.isExcursion
            ) {
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
                transferHotels: false,
                excursionList: false,
                suplimetsOptionPage: false,
                excursionSupplimetList: true,
                visaQuotations: false,
                createQuotation: false,
              });
            }
          }}
          className={`${
            selectedExcursionSuppliments.length > 0
              ? " border-blue-500 "
              : " border-stone-200 "
          } w-full border-b-4  h-10 flex justify-center items-center px-2 cursor-pointer`}
        >
          {selectedExcursionSuppliments.length > 0 ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 flex justify-center gap-2 ">
              Suppliments
            </div>
          ) : isSupplimentQuotationDisabled === true ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
              Suppliments N/A
            </div>
          ) : (
            ""
          )}
        </div>

        <div
          onClick={() => {
            if (
              !steps.isArrivalAirport &&
              !steps.isDepartureAirport &&
              !steps.isTravelDate &&
              !steps.isTravelPartner &&
              !steps.isStay &&
              !steps.isTransfer &&
              !steps.isExcursion &&
              !steps.isSuppliment
            ) {
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
                transferHotels: false,
                excursionList: false,
                suplimetsOptionPage: false,
                excursionSupplimetList: false,
                visaQuotations: true,
                createQuotation: false,
              });
            }
          }}
          className={`${
            selectedVisaId.id ? " border-blue-500 " : " border-stone-200 "
          } w-full border-b-4  h-10 flex justify-center items-center px-2 cursor-pointer`}
        >
          {selectedVisaId.id ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 flex justify-center gap-2 ">
              Visa
            </div>
          ) : selectedVisaId.id ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
              Visa N/A
            </div>
          ) : isVisaQuotaionsDisabled === true ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
              Visa N/A
            </div>
          ) : (
            ""
          )}
        </div>
        <div
          onClick={() => {
            if (
              !steps.isArrivalAirport &&
              !steps.isDepartureAirport &&
              !steps.isTravelDate &&
              !steps.isTravelPartner &&
              !steps.isStay &&
              !steps.isTransfer &&
              !steps.isExcursion &&
              !steps.isSuppliment &&
              !steps.isVisa
            ) {
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
                transferHotels: false,
                excursionList: false,
                suplimetsOptionPage: false,
                excursionSupplimetList: false,
                visaQuotations: false,
                createQuotation: true,
              });
            }
          }}
          className={`w-full border-b-4 ${
            questions.createQuotation === true
              ? " border-blue-500 "
              : " border-stone-200 "
          }  h-10 flex justify-center items-center px-2 cursor-pointer`}
        >
          {questions.createQuotation === true ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 flex justify-center gap-2 ">
              Summary
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <button
          onClick={ 
            ()=>{
              dispatch(handleClearAllStates())
              setQuestions({
                arrivalAirport: true,
                departureAirport: false,
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
                createQuotation: false,
              });
            }}
           type="button" 
           className="text-[14px] font-[600] text-white bg-red-500 shadow-sm rounded px-4 h-8">Reset</button>
        </div>
      </div>
    </div>
  );
}

export default QuotationSteps;
