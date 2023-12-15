import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { handleFlightDetailChangeZeroIndex } from '../../../redux/slices/flightSlice';
import { useDispatch } from 'react-redux';
import { BsCalendar3 } from 'react-icons/bs';

const FlightCalendar = ({ apiResponse, setDepartureDate, setIsDepartureDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const localDate = new Date(); // Convert to local time zone
  setDepartureDate(localDate.toISOString().split('T')[0])
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      handleFlightDetailChangeZeroIndex({
        name: "departureDate",
        value: localDate.toISOString().split('T')[0],
      })
    );
  },[])


  // Extract the dates from the apiResponse
  const apiResponseDates = apiResponse.map((flight) => new Date(flight.date));

  // Function to find the fare for the selected date
  const findFareForDate = (date) => {
    const formattedDate = date.toLocaleDateString('en-GB'); // Format date as 'dd/mm/yyyy'
    const matchingFlight = apiResponse.find((flight) => flight.date === formattedDate);
    return matchingFlight ? matchingFlight.fare : null;
  };

  const handleSelection = (date) => {
    setSelectedDate(date);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000); // Convert to local time zone
    //console.log(localDate.toISOString().split('T')[0])
    setDepartureDate(localDate.toISOString().split('T')[0])
    setIsDepartureDate(true)
    dispatch(
      handleFlightDetailChangeZeroIndex({
        name: "departureDate",
        value: localDate.toISOString().split('T')[0],
      })
    );
  };

  return (
    <div>

      <DatePicker
        selected={selectedDate}
        minDate={new Date()}
        min={new Date().toISOString().split("T")[0]}
      //  onChange={(date) => setSelectedDate(date)}
        onChange={(date) => handleSelection(date)}
        dateFormat="dd/MM/yyyy" // You can customize the date format
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <div>
            <button onClick={decreaseMonth}>&lt;</button>
            <span>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
            <button onClick={increaseMonth}>&gt;</button>
          </div>
        )}
        renderDayContents={(date, dateValue) => (
          <div className='flex text-center items-center font-semibold text-[14px] justify-center h-10'>
            {dateValue.getDate()}
            {apiResponseDates.some((d) => d.toLocaleDateString('en-GB') === dateValue.toLocaleDateString('en-GB')) && (
              <div className='absolute mt-7 text-[10px] font-normal text-orange-400'>{apiResponse[0].fare}</div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default FlightCalendar;
