import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, DateObject } from "react-multi-date-picker";
import { setArrivalDate, setDepartureDate } from "../../../../redux/slices/quotationSlice";

function TravelDate({ setQuestions, setSteps }) {
  const dispatch = useDispatch();
  const { checkInDate, checkOutDate } = useSelector((state) => state.quotation);
  const [checkInDates, setCheckInDates] = useState("");
  const [checkOutDates, setCheckOutDates] = useState("");
  const [dateValue, setDateValue] = useState([]);

  useEffect(() => {
    setSteps({
      isArrivalAirport: false,
      isDepartureAirport: false,
      isTravelDate: true,
      isTravelPartner: false,
      isStay: false,
      isTransfer: false,
      isExcursion: false,
      isSuppliment: false,
      isVisa: false,
    });
  }, []);

const handleDateSelect = (date) => {
  if (date?.length === 1) {
    // setDateValue([date[0], date[0]]);
    dispatch(setArrivalDate(date[0]?.year + "-" + date[0]?.month.number + "-" + date[0]?.day));

    if (date[1]) {
      dispatch(setDepartureDate(date[1]?.year + "-" + date[1]?.month.number + "-" + date[1]?.day));
    } else {
      dispatch(setDepartureDate(date[0]?.year + "-" + date[0]?.month.number + "-" + date[0]?.day));
    }
  } else if (date?.length === 2) {
    // setDateValue(date);
    dispatch(setArrivalDate(date[0]?.year + "-" + date[0]?.month.number + "-" + date[0]?.day));
    dispatch(setDepartureDate(date[1]?.year + "-" + date[1]?.month.number + "-" + date[1]?.day));
  }
};

useEffect(() => {
  if (checkInDate && checkOutDate) {
    setDateValue([new Date(checkInDate), new Date(checkOutDate)]);
  }
}, []);

useEffect(() => {
  if (checkInDate.length > 0 && checkOutDate.length > 0) {
    setCheckInDates(checkInDate?.slice(0,10));
    setCheckOutDates(checkOutDate?.slice(0,10));
  }
}, []);

  return (
    <div className="">
      <div className="flex justify-center pb-2">
        <p className="text-stone-600 text-md text-center font-bold">
          Select the Arrival and Departure Date
        </p>
      </div>
      <div className="flex items-center justify-center gap-2 lg:w-full sm:ml-2  lg:ml-0 pb-9 ">
        <div className="">
          <div className="max-w-lg ">
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
      {checkInDate && checkOutDate ? (
        <div className="py-5 flex justify-center items-center">
          <button
            onClick={() => {
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
            }}
            className="bg-gradient-to-l from-blue-600 to-red-600 hover:from-red-600 hover:to-blue-600 rounded text-[14px] font-[600] text-white shadow-sm w-[150px] py-2"
          >
            Choose Travellers
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default TravelDate;
