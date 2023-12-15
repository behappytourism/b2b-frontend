import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { handleFlightDetailChangeZeroIndex } from "../../../redux/slices/flightSlice";
import { useDispatch, useSelector } from "react-redux";
import { BsCalendar3 } from "react-icons/bs";

const FlightReturnCalendar = ({ apiResponse }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const localDate = new Date(); // Convert to local time zone
  // setDepartureDate(localDate.toISOString().split('T')[0])
  const dispatch = useDispatch();

  const { tripType, flightsData, travellers } = useSelector(
    (state) => state.flight
  );


  useEffect(() => {
    const departureDate = flightsData[0]?.departureDate;
    const selectedDateString = selectedDate.toISOString().split("T")[0];
    
    if (departureDate && selectedDateString < departureDate) {
      // Calculate the new return date as 1 day after the departure date
      const newReturnDate = new Date(departureDate);
      newReturnDate.setDate(newReturnDate.getDate() + 1);
      const dispatchingReturnDate = newReturnDate.toISOString().split("T")[0];
      
      dispatch(
        handleFlightDetailChangeZeroIndex({
          name: "returnDate",
          value: dispatchingReturnDate
        })
      );

      setSelectedDate(newReturnDate)
    }
  }, [flightsData[0]?.departureDate, selectedDate]);
  

  // useEffect(() => {
  //   dispatch(
  //     handleFlightDetailChangeZeroIndex({
  //       name: "returnDate",
  //       value: localDate.toISOString().split("T")[0],
  //     })
  //   );
  // }, []);

  // Extract the dates from the apiResponse
  const apiResponseDates = apiResponse.map((flight) => new Date(flight.date));

  // Function to find the fare for the selected date
  const findFareForDate = (date) => {
    const formattedDate = date.toLocaleDateString("en-GB"); // Format date as 'dd/mm/yyyy'
    const matchingFlight = apiResponse.find(
      (flight) => flight.date === formattedDate
    );
    return matchingFlight ? matchingFlight.fare : null;
  };

  const handleSelection = (date) => {
    setSelectedDate(date);
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    const selectedReturnDate = localDate.toISOString().split("T")[0];
    const departureDate =
      flightsData?.length > 0 && flightsData[0]?.departureDate;

    // console.log(selectedReturnDate)

    // Check if the selected return date is earlier than the departure date
    if (departureDate && selectedReturnDate < departureDate) {
      // Show an error message or handle the invalid selection here
      console.log("Return date cannot be earlier than departure date");
    } else {
      // If the selection is valid, update the return date in the state
      dispatch(
        handleFlightDetailChangeZeroIndex({
          name: "returnDate",
          value: selectedReturnDate,
        })
      );
    }
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        minDate={
          new Date()
        }
        min={new Date().toISOString().split("T")[0]}
        filterDate={(date) => {
          const formattedDepartureDate = new Date(
            new Date(flightsData[0]?.departureDate).getTime() -
              24 * 60 * 60 * 1000
          );
          return date >= formattedDepartureDate;
        }}
        //  onChange={(date) => setSelectedDate(date)}
        onChange={(date) => handleSelection(date)}
        dateFormat="dd/MM/yyyy" // You can customize the date format
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <div>
            <button onClick={decreaseMonth}>&lt;</button>
            <span>
              {date.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button onClick={increaseMonth}>&gt;</button>
          </div>
        )}
        renderDayContents={(date, dateValue) => (
          <div className="flex text-center items-center font-semibold text-[14px] justify-center h-10">
            {dateValue.getDate()}
            {apiResponseDates.some(
              (d) =>
                d.toLocaleDateString("en-GB") ===
                dateValue.toLocaleDateString("en-GB")
            ) && (
              <div className="absolute mt-7 text-[10px] font-normal text-orange-400">
                {apiResponse[0].fare}
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default FlightReturnCalendar;
