import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from 'react-multi-date-picker';
import {
    setArrivalDate,
    setDepartureDate,
  } from "../../../../redux/slices/quotationSlice";


function TravelDateEdit({setQuotationEdit}) {

    const dispatch = useDispatch()
    const {checkInDate, checkOutDate } = useSelector((state)=>state.quotation)
    const [checkInDates, setCheckInDates] = useState("");
    const [checkOutDates, setCheckOutDates] = useState("");
    const [dateValue, setDateValue] = useState([]);
    

    useEffect(() => {
        if (checkInDate.length > 0 && checkOutDate.length > 0) {
          setCheckInDates(checkInDate?.slice(0,10));
          setCheckOutDates(checkOutDate?.slice(0,10));
        }
      }, []);

      const handleDateSelect = (date) => {
        if (date?.length === 1) {
          // setDateValue([date[0]?.year + "-" + date[0]?.month.number + "-" + date[0]?.day]);
          dispatch(setArrivalDate(date[0]?.year + "-" + date[0]?.month.number + "-" + date[0]?.day));
      
          if (date[1]) {
            dispatch(setDepartureDate(date[1]?.year + "-" + date[1]?.month.number + "-" + date[1]?.day));
          } else {
            dispatch(setDepartureDate(date[0]?.year + "-" + date[0]?.month.number + "-" + date[0]?.day));
          }
        } else if (date?.length === 2) {
          dispatch(setArrivalDate(date[0]?.year + "-" + date[0]?.month.number + "-" + date[0]?.day));
          dispatch(setDepartureDate(date[1]?.year + "-" + date[1]?.month.number + "-" + date[1]?.day));
          // setDateValue(date);
        }
      };

      useEffect(() => {
        if (checkInDate && checkOutDate) {
          setDateValue([new Date(checkInDate), new Date(checkOutDate)]);
        }
      }, []);

  return (
    <div className="">
      <div className="flex justify-center pb-2">
        <div className="">
          <div className="pb-5">
            <p className="text-stone-600 text-sm text-center font-bold">
            Select the Arrival and Departure Date
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 lg:w-full sm:ml-2  lg:ml-0 pb-9 ">
          <div className="max-w-lg">
          <Calendar
              range
              rangeHover
              value={dateValue}
              numberOfMonths={2}
              minDate={new Date()}
              onChange={handleDateSelect}
            />
          </div>
          </div>
        </div>
      
      </div>
      {checkInDate.length > 0 && checkOutDate.length > 0 ? (
        <div className="py-5 flex justify-center items-center">
          <button
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
                createQuotationEdit: false,
              });
            }}
            className="bg-gradient-to-l from-blue-500 to-red-600 hover:from-red-600 hover:to-blue-500  rounded text-[14px] font-[600] text-white shadow-sm w-[150px] py-2"
          >
            Choose Travellers
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default TravelDateEdit
