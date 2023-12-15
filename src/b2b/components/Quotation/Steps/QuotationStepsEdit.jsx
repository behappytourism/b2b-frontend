import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { clearStayIsEmpty } from "../../../../redux/slices/quotationSlice";
import moment from "moment";


function QuotationStepsEdit({ quotationEdit, setQuotationEdit }) {

  const dispatch = useDispatch()

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
    isTransferQuotationDisabled,
    transfer
  } = useSelector((state) => state.quotation);

  const { quotationList } = useSelector((state)=> state.qutationList)


  
  // const date = new Date(checkInDate);
  // const checkinMonth = date.toLocaleString('default', { month: 'short' }); 
  // const checkinDay = date.getDate();

  // const chckoutDate = new Date(checkOutDate);
  // const chockoutMonth = chckoutDate.toLocaleString('default', { month: 'short' });
  // const checkoutDate = chckoutDate.getDate();


  // const Editdate = new Date( quotationList && quotationList.amendments && quotationList.amendments[0] && quotationList?.amendments[0]?.checkInDate);
  // const EditcheckinMonth = Editdate.toLocaleString('default', { month: 'short' }); 
  // const EditcheckinDay = Editdate.getDate();

  // const EditchckoutDate = new Date( quotationList && quotationList.amendments && quotationList.amendments[0] && quotationList?.amendments[0]?.checkOutDate);
  // const EditchockoutMonth = EditchckoutDate.toLocaleString('default', { month: 'short' });
  // const EditcheckoutDate = EditchckoutDate.getDate();

  const formattedCheckInDate = moment(checkInDate, "YYYY-MM-DD").format("MMM-DD");
  const formattedCheckOutDate = moment(checkOutDate, "YYYY-MM-DD").format("MMM-DD");

  return (
    <div className="max-w-screen-lg mx-auto py-5">
      <div className="hidden md:flex gap-2 justify-between w-full items-center">
        <div
          onClick={() => {
            setQuotationEdit({
                arrivalAirportEdit: true,
                departureAirportEdit: false,
                travelDateEdit: false,
                travelPartnerEdit: false,
                hotelEnquiryEdit: false,
                hotelListEdit: false,
                suggestHotelEdit: false,
                suggestDetailCollectionEdit: false,
                hotelDetailCollectionEdit: false,
                transferHotelsEdit: false,
                excursionListEdit: false, 
                excursionSupplimetListEdit: false,
                visaQuotationsEdit: false,
                createQuotationEdit: false
            });
          }}
          className={`w-full border-b-4 border-blue-500 h-10 flex justify-center items-center px-2 cursor-pointer`}
        >
          {arrivalAirport.iata ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 flex justify-center gap-2">
              {arrivalAirport.iata}
              <div>
              <FaPlaneArrival/>
              </div>
            </div>
          ) : isArrivalAirportDisabled ? (
            <div className="border w-full text-center text-[12px] font-[500] py-1 rounded bg-stone-100 ">
              Arrival N/A
            </div>
          ) :  quotationList && quotationList.amendments && quotationList.amendments[0] && quotationList?.amendments[0]?.arrivalIataCode ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 flex justify-center gap-2">
            {quotationList?.amendments[0]?.arrivalIataCode}
            <div>
            <FaPlaneArrival/>
            </div>
          </div>
          ):  quotationList && quotationList.amendments && quotationList.amendments[0] && quotationList?.amendments[0]?.isArrivalAirportDisabled === true ? (
            <div className="border w-full text-center text-[12px] font-[500] py-1 rounded bg-stone-100 ">
             Arrival N/A
            </div>
          ): ""}
        </div>
        <div
          onClick={() => {
            setQuotationEdit({
                arrivalAirportEdit: false,
                departureAirportEdit: true,
                travelDateEdit: false,
                travelPartnerEdit: false,
                hotelEnquiryEdit: false,
                hotelListEdit: false,
                suggestHotelEdit: false,
                suggestDetailCollectionEdit: false,
                hotelDetailCollectionEdit: false,
                transferHotelsEdit: false,
                excursionListEdit: false, 
                excursionSupplimetListEdit: false,
                visaQuotationsEdit: false,
                createQuotationEdit: false
            });
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
              <FaPlaneDeparture/>
            </div>
          ) : isDepartureAirportDisabled ? (
            <div className="border w-full text-center text-[12px] font-[500] py-1 rounded bg-stone-100 ">
             Departure N/A
            </div>
          ) :  quotationList && quotationList.amendments && quotationList.amendments[0] && quotationList?.amendments[0]?.departureIataCode ? ( 
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 flex justify-center gap-2">
            {quotationList?.amendments[0]?.departureIataCode}
            <div>
            <FaPlaneDeparture/>
            </div>
          </div>
          ) : ""}
        </div>
        <div
          onClick={() => {
            setQuotationEdit({
              arrivalAirportEdit: false,
              departureAirportEdit: false,
              travelDateEdit: true,
              travelPartnerEdit: false,
              hotelEnquiryEdit: false,
              hotelListEdit: false,
              suggestHotelEdit: false,
              suggestDetailCollectionEdit: false,
              hotelDetailCollectionEdit: false,
              transferHotelsEdit: false,
              excursionListEdit: false,
              excursionSupplimetListEdit: false,
              visaQuotationsEdit: false,
              createQuotationEdit: false
            });
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
          ) :  quotationList && quotationList.amendments && quotationList.amendments[0] && quotationList?.amendments ? (
            <div className="border w-full text-center text-[11px] font-[500] py-1 rounded bg-stone-100 ">
            {formattedCheckInDate} - {formattedCheckOutDate}
          </div>
          ): "" }
        </div>
        <div
          onClick={() => {
            setQuotationEdit({
              arrivalAirportEdit: false,
              departureAirportEdit: false,
              travelDateEdit: false,
              travelPartnerEdit: true,
              hotelEnquiryEdit: false,
              hotelListEdit: false,
              suggestHotelEdit: false,
              suggestDetailCollectionEdit: false,
              hotelDetailCollectionEdit: false,
              transferHotelsEdit: false,
              excursionListEdit: false,
              excursionSupplimetListEdit: false,
              visaQuotationsEdit: false,
              createQuotationEdit: false
            });
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
          ) :  quotationList && quotationList.amendments && quotationList.amendments[0] && quotationList?.amendments[0]?.paxType ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
            {quotationList?.amendments[0]?.paxType}
          </div>
          ): ""}
        </div>

        <div
        onClick={() => {
          dispatch(clearStayIsEmpty())
            setQuotationEdit({
            arrivalAirportEdit: false,
            departureAirportEdit: false,
            travelDateEdit: false,
            travelPartnerEdit: false,
            hotelEnquiryEdit: true,
            hotelListEdit: false,
            suggestHotelEdit: false,
            suggestDetailCollectionEdit: false,
            hotelDetailCollectionEdit: false,
            transferHotelsEdit: false,
            excursionListEdit: false,
            excursionSupplimetListEdit: false,
            visaQuotationsEdit: false,
            createQuotationEdit: false
          });
        }}
          className={`w-full border-b-4 ${
            paxType ? " border-blue-500 " : " border-stone-200 "
          }  h-10 flex justify-center items-center px-2 cursor-pointer`}
        >
          {stays[0]?.hotels?.length > 0  ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
              Stay
            </div>
          ) : paxType && stays[0]?.hotels?.length < 1 ?  (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
             Stay N/A
            </div>
          ): stays?.length <= 0 ?(
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
           Stay N/A
          </div>
          ):  quotationList && quotationList.amendments && quotationList.amendments[0] &&  quotationList?.amendments[0]?.hotelQuotation?.stays?.length > 0 ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
              Stay
            </div>
          ) :  quotationList && quotationList.amendments && quotationList.amendments[0] && quotationList?.amendments[0]?.isHotelQuotationDisabled === true ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
           Stay N/A
          </div>
          ): ""}
        </div>

            {
              transfer?.length > 0 && (
        <div
          onClick={() => {
              setQuotationEdit({
                arrivalAirportEdit: false,
                departureAirportEdit: false,
                travelDateEdit: false,
                travelPartnerEdit: false,
                hotelEnquiryEdit: false,
                hotelListEdit: false,
                suggestHotelEdit: false,
                suggestDetailCollectionEdit: false,
                hotelDetailCollectionEdit: false,
                transferHotelsEdit: true,
                excursionListEdit: false,
                suplimetsOptionPageEdit: false,
                excursionSupplimetListEdit: false,
                visaQuotationsEdit: false,
                createQuotationEdit: false,
              });
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
            setQuotationEdit({
            arrivalAirportEdit: false,
            departureAirportEdit: false,
            travelDateEdit: false,
            travelPartnerEdit: false,
            hotelEnquiryEdit: false,
            hotelListEdit: false,
            suggestHotelEdit: false,
            suggestDetailCollectionEdit: false,
            hotelDetailCollectionEdit: false,
            transferHotelsEdit: false,
            excursionListEdit: true, 
            excursionSupplimetListEdit: false,
            visaQuotationsEdit: false,
            createQuotationEdit: false
          })
        }}
          className={`${
            selectedExcursion?.length > 0
              ? " border-blue-500 "
              : " border-stone-200 "
          } w-full border-b-4  h-10 flex justify-center items-center px-2 cursor-pointer`}
        >
       {selectedExcursion?.length > 0 ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 flex justify-center gap-2 ">
              Excursion
            </div>
          ) : isExcursionQuotationDisabled === true ? (
            <div className="border w-full text-center text-[10px] font-[500] py-1 rounded bg-stone-100 ">
             Excursion N/A
            </div>
          ) :  quotationList && quotationList.amendments && quotationList.amendments[0] &&  quotationList?.amendments[0]?.excursionQuotation ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 flex justify-center gap-2 ">
              Excursion
            </div>
          ):  quotationList && quotationList.amendments && quotationList.amendments[0] && quotationList?.amendments[0]?.isExcursionQuotationDisabled === true ?(
            <div className="border w-full text-center text-[10px] font-[500] py-1 rounded bg-stone-100 ">
             Excursion N/A
            </div>
          ) : ""}
        </div>
       
        <div
        onClick={() => {
            setQuotationEdit({
            arrivalAirportEdit: false,
            departureAirportEdit: false,
            travelDateEdit: false,
            travelPartnerEdit: false,
            hotelEnquiryEdit: false,
            hotelListEdit: false,
            suggestHotelEdit: false,
            suggestDetailCollectionEdit: false,
            hotelDetailCollectionEdit: false,
            transferHotelsEdit: false,
            excursionListEdit: false, 
            excursionSupplimetListEdit: true,
            visaQuotationsEdit: false,
            createQuotationEdit: false
          })
        }}
          className={`${
            selectedExcursionSuppliments?.length > 0
              ? " border-blue-500 "
              : " border-stone-200 "
          } w-full border-b-4  h-10 flex justify-center items-center px-2 cursor-pointer`}
        >
       {selectedExcursionSuppliments?.length > 0 ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 flex justify-center gap-2 ">
              Suppliments
            </div>
          )  : isSupplimentQuotationDisabled === true ? (
            <div className="border w-full text-center text-[10px] font-[500] py-1 rounded bg-stone-100 ">
             Suppliments N/A
            </div>
          ) :  quotationList && quotationList.amendments && quotationList.amendments[0] && quotationList?.amendments[0]?.excSupplementQuotation ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 flex justify-center gap-2 ">
              Suppliments
            </div>
          ):  quotationList && quotationList.amendments && quotationList.amendments[0] && quotationList?.amendments[0]?.isExcursionQuotationDisabled === true ? (
            <div className="border w-full text-center text-[10px] font-[500] py-1 rounded bg-stone-100 ">
           Suppliments N/A
          </div>
          ): ""}
        </div>

        <div
        onClick={() => {
            setQuotationEdit({
            arrivalAirportEdit: false,
            departureAirportEdit: false,
            travelDateEdit: false,
            travelPartnerEdit: false,
            hotelEnquiryEdit: false,
            hotelListEdit: false,
            suggestHotelEdit: false,
            suggestDetailCollectionEdit: false,
            hotelDetailCollectionEdit: false,
            transferHotelsEdit: false,
            excursionListEdit: false, 
            excursionSupplimetListEdit: false,
            visaQuotationsEdit: true,
            createQuotationEdit: false 
          })
        }}
          className={`${
            selectedVisaId.id 
              ? " border-blue-500 "
              : " border-stone-200 "
          } w-full border-b-4  h-10 flex justify-center items-center px-2 cursor-pointer`}
        >
       {selectedVisaId.id ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 flex justify-center gap-2 ">
              Visa
            </div>
          ) : selectedVisaId.id  ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
              Visa N/A
            </div>
          ): isVisaQuotaionsDisabled === true ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
              Visa N/A
            </div>
          ) :  quotationList && quotationList.amendments && quotationList.amendments[0] && quotationList?.amendments[0]?.isVisaNeeded === true ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 flex justify-center gap-2 ">
            Visa
          </div>
          ):  quotationList && quotationList.amendments && quotationList.amendments[0] && quotationList?.amendments[0]?.isVisaQuotaionsDisabled === true ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 ">
              Visa N/A
            </div>
          ): ( "")}
        </div>
        <div
          onClick={() => {
            setQuotationEdit({
              arrivalAirportEdit: false,
              departureAirportEdit: false,
              travelDateEdit: false,
              travelPartnerEdit: false,
              hotelEnquiryEdit: false,
              hotelListEdit: false,
              suggestHotelEdit: false,
              suggestDetailCollectionEdit: false,
              hotelDetailCollectionEdit: false,
              transferHotelsEdit: false,
              excursionListEdit: false,
              excursionSupplimetListEdit: false,
              visaQuotationsEdit: false,
              createQuotationEdit: true
            });
          }}
          className={`w-full border-b-4 ${
            quotationEdit.createQuotationEdit === true || quotationList
              ? " border-blue-500 "
              : " border-stone-200 "
          }  h-10 flex justify-center items-center px-2 cursor-pointer`}
        >
         {
          quotationEdit.createQuotationEdit === true ? (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 flex justify-center gap-2 ">
            Summary
          </div>
          ) : quotationList ?  (
            <div className="border w-full text-center text-xs font-[500] py-1 rounded bg-stone-100 flex justify-center gap-2 ">
            Summary
          </div>
          ) : ""
         }
        </div>
      </div>
    </div>
  );
}

export default QuotationStepsEdit;
