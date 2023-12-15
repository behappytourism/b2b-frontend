import React from "react";
import { useSelector } from "react-redux";

function FlightConfirmation() {
  const { flightFullData, selectedAddOns } = useSelector(
    (state) => state.flight
  );

  const {
    travellers,
    travellerDetails,
    commonDetails,
    selectedFlight,
    tripType,
  } = useSelector((state) => state.flight);
  //console.log(selectedAddOns, "selectedddons confirmatipon page");
  //console.log(flightFullData, "flightFullData confirmatipon page");
  // console.log(commonDetails, "flightFullData confirmatipon page");
  // console.log(travellerDetails, "traveller detail confirmatipon page");
  // console.log(travellers, "flightFullData confirmatipon page");
  // console.log(tripType, "flightFullData confirmatipon page");
  //console.log(selectedFlight, "selectedFlight confirmatipon page");

  const formatDate = (dateString, includeYear = false) => {
    const options = { weekday: "short", day: "numeric", month: "long" };
    if (includeYear) {
      options.year = "numeric";
    }
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateTotalPrice = () => {
    const flightFare = flightFullData?.priceQuoteResponse?.netFare || 0;

    const seatPrices =
      selectedAddOns?.seats?.reduce(
        (total, seat) => total + seat.seatPrice,
        0
      ) || 0;

    const mealPrices =
      selectedAddOns?.meal?.reduce(
        (total, meal) => total + meal.mealPrice,
        0
      ) || 0;

    const luggagePrices =
      selectedAddOns?.luggage?.reduce(
        (total, luggage) => total + luggage.baggagePrice,
        0
      ) || 0;

    const totalPrice = flightFare + seatPrices + mealPrices + luggagePrices;
    return totalPrice.toFixed(2);
  };

  const departureAirport = flightFullData?.departureAirport;
  const arrivalAirport = flightFullData?.arrivalAirport;

  const passengers = flightFullData?.priceQuoteResponse?.passengers || [];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="p-4 font-bold text-xl">Confirmation Flight Page</h1>
      </div>
      <div className="bg-white rounded-lg p-6 shadow-md w-full">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Journey Details
        </h2>
        <div className="flex justify-between">
          <div className="mb-4 flex gap-2">
            <div>
              {selectedFlight?.trips?.map((trip, tripIndex) => (
                <div key={tripIndex}>
                  {trip?.flightSegments?.map((segment, segmentIndex) => (
                    <div key={segmentIndex}>
                      <div className="flex gap-2">
                        <div className="mb-4 flex gap-2">
                          <h2>From :</h2>
                          <h2 className="text-xl font-bold">{segment.from}</h2>
                        </div>
                        -
                        <div className="mb-4 flex gap-2">
                          <h2>To :</h2>
                          <h2 className="text-xl font-bold">{segment.to}</h2>
                        </div>
                        <div className="mb-4 flex gap-2">
                          <h2>On</h2>
                          <h2 className="text-xl font-bold">
                            {formatDate(segment.departureDate, true)}
                          </h2>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4>Number of Passenger</h4>
            <div className="flex gap-2">
              <h2>Adult: </h2>
              <h2 className="font-bold">{travellers.adult}</h2>
            </div>
          </div>
        </div>

        <h2 className="text-4xl font-semibold mb-4 pt-4 text-center">
          Passenger Detail
        </h2>
        {/* <div>
         {travellerDetails.map((traveller, index) => (
          <div key={index}>
          <div className='flex gap-2 text-center items-center'>
            <h2>Traveller first name: </h2>
            <h2 className='text-lg font-bold'>{traveller.firstName.charAt(0).toUpperCase() + traveller.firstName.slice(1)}</h2>
          </div>
          <div className='flex gap-2 text-center items-center'>
            <h2>Traveller last name: </h2>
            <h2 className='text-lg font-bold'>{traveller.lastName.charAt(0).toUpperCase() + traveller.lastName.slice(1)}</h2>
          </div>
          <div className='flex gap-2'>
            <h2>Traveller birth date:</h2>
            <h2 className='text-lg font-bold'>{traveller.birthDate}</h2>
          </div>
          <div className='flex gap-2'>
            <h2>Traveller Gender:</h2>
            <h2 className='text-lg font-bold'>{traveller.gender}</h2>
          </div>
          <div className='flex gap-2'>
            <h2>Traveller Nationality:</h2>
            <h2 className='text-lg font-bold'>{traveller.nationality}</h2>
          </div>
          <div className='flex gap-2'>
          <div className='flex gap-2'>
            <h2>Traveller Passport number:</h2>
            <h2 className='text-md font-bold'>{traveller.passportNumber}</h2>
          </div>
          <div className='flex gap-2'>
            <h2>Traveller Passport Expiry Date:</h2>
            <h2 className='text-md font-bold'>{traveller.passportExpiry}</h2>
          </div>
          </div>

          </div>
         ))}
        </div> */}

        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">First Name</th>
              <th className="border px-4 py-2">Last Name</th>
              <th className="border px-4 py-2">Birth Date</th>
              <th className="border px-4 py-2">Gender</th>
              <th className="border px-4 py-2">Nationality</th>
              <th className="border px-4 py-2">Passport Number</th>
              <th className="border px-4 py-2">Passport Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {travellerDetails.map((traveller, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="border px-4 py-2">
                  {traveller.firstName.charAt(0).toUpperCase() +
                    traveller.firstName.slice(1)}
                </td>
                <td className="border px-4 py-2">
                  {traveller.lastName.charAt(0).toUpperCase() +
                    traveller.lastName.slice(1)}
                </td>
                <td className="border px-4 py-2">{traveller.birthDate}</td>
                <td className="border px-4 py-2">{traveller.gender}</td>
                <td className="border px-4 py-2">{traveller.nationality}</td>
                <td className="border px-4 py-2">{traveller.passportNumber}</td>
                <td className="border px-4 py-2">{traveller.passportExpiry}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-4xl font-semibold mb-4 pt-4 text-center">
          Trip Details :
        </h2>
        <div>
          {/* <div className='flex gap-2'>
            <h2>Trip Type: </h2>
            <h2  className='text-md font-bold'>{selectedFlight.type}</h2>
          </div>

          <div className='flex gap-2'>
            <h2>Trip Fare: </h2>
            <h2  className='text-md font-bold'>{selectedFlight.netFare} {selectedFlight.currency}</h2>
          </div>

          <div className='flex gap-2'>
            <h2>Trip Trvel Class: </h2>
            <h2  className='text-md font-bold'>{selectedFlight.travelClass}</h2>
          </div> */}

          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Trip Type</th>
                <th className="border px-4 py-2">Trip Fare</th>
                <th className="border px-4 py-2">Trip Travel Class</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100">
                <td className="border px-4 py-2">{selectedFlight.type}</td>
                <td className="border px-4 py-2">
                  {selectedFlight.netFare} {selectedFlight.currency}
                </td>
                <td className="border px-4 py-2">
                  {selectedFlight.travelClass}
                </td>
              </tr>
            </tbody>
          </table>

          <div>
            {/* <h2>Flight Segments :-</h2> */}
            <div>
              {selectedFlight?.trips?.map((trip, tripIndex) => (
                <div key={tripIndex}>
                  {trip?.flightSegments?.map((segment, segmentIndex) => (
                    <div key={segmentIndex}>
                      <h2 className="text-xl font-bold py-4">
                        {tripIndex === 0 && segmentIndex === 0
                          ? "First Flight Segment"
                          : tripIndex === 1 && segmentIndex === 0
                          ? "Second Flight Segment"
                          : ""}
                      </h2>
                      <table className="table-auto w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="border px-4 py-2">Airline Name</th>
                            <th className="border px-4 py-2">Flight Number</th>
                            <th className="border px-4 py-2">Departure Date</th>
                            <th className="border px-4 py-2">Departure Time</th>
                            <th className="border px-4 py-2">Arrival Date</th>
                            <th className="border px-4 py-2">Arrival Time</th>
                            <th className="border px-4 py-2">From Airport</th>
                            <th className="border px-4 py-2">From Terminal</th>
                            <th className="border px-4 py-2">To Airport</th>
                            <th className="border px-4 py-2">To Terminal</th>
                            <th className="border px-4 py-2">Flight Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-gray-100">
                            <td className="border px-4 py-2">
                              {segment.airlineName}
                            </td>
                            <td className="border px-4 py-2">
                              {segment.flightNumber}
                            </td>
                            <td className="border px-4 py-2">
                              {formatDate(segment.departureDate, true)}
                            </td>
                            <td className="border px-4 py-2">
                              {
                                segment.departureDate
                                  .split("T")[1]
                                  .split(":")[0]
                              }
                              :
                              {
                                segment.departureDate
                                  .split("T")[1]
                                  .split(":")[1]
                              }
                            </td>
                            <td className="border px-4 py-2">
                              {formatDate(segment.arrivalDate, true)}
                            </td>
                            <td className="border px-4 py-2">
                              {segment.arrivalDate.split("T")[1].split(":")[0]}:
                              {segment.arrivalDate.split("T")[1].split(":")[1]}
                            </td>
                            <td className="border px-4 py-2">
                              {segment.fromAirport}
                            </td>
                            <td className="border px-4 py-2">
                              {segment.fromTerminal}
                            </td>
                            <td className="border px-4 py-2">
                              {segment.toAirport}
                            </td>
                            <td className="border px-4 py-2">
                              {segment.toTerminal}
                            </td>
                            <td className="border px-4 py-2">
                              {trip.flightType}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 pt-6">Addons :</h2>

        {/* {selectedAddOns?.seats && (
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Seats</h3>
            {selectedAddOns.seats.map((seat, index) => (
              <div key={index}>
                <p>
                  Passenger: {passengers[index % passengers.length]?.name || 'Dummy Name'}
                </p>
                <p>Segment Key: {seat.segmentKey}</p>
                <ul>
                  {seat.seatKeys.map((seatKey, keyIndex) => (
                    <li key={keyIndex}>Seat Number: {seat.seatNumber}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )} */}
        <h3 className="text-4xl font-semibold mb-2 text-center">Seats</h3>
        {selectedFlight?.trips?.map((trip, tripIndex) => (
          <div key={tripIndex}>
            {trip?.flightSegments?.map((segment, segmentIndex) => (
              <div key={segmentIndex}>
                <h2 className="text-xl font-bold py-4">
                  {tripIndex === 0 && segmentIndex === 0
                    ? "First Flight Segment"
                    : tripIndex === 1 && segmentIndex === 0
                    ? "Second Flight Segment"
                    : ""}
                </h2>
                <table className="table-auto w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Passenger</th>
                      <th className="border px-4 py-2">Flight Number</th>
                      <th className="border px-4 py-2">Seat Number / Column</th>
                      <th className="border px-4 py-2">Seat Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAddOns.seats.slice(tripIndex, tripIndex + 1).map(
                      (
                        seat,
                        index // update this line to only select the seat that corresponds to the current flight segment
                      ) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-gray-100" : ""}
                        >
                          <td className="border px-4 py-2">
                            {travellerDetails[
                              index % travellerDetails.length
                            ]?.firstName
                              .charAt(0)
                              .toUpperCase() +
                              travellerDetails[
                                index % travellerDetails.length
                              ]?.firstName.slice(1)}{" "}
                            {travellerDetails[
                              index % travellerDetails.length
                            ]?.lastName
                              .charAt(0)
                              .toUpperCase() +
                              travellerDetails[
                                index % travellerDetails.length
                              ]?.lastName.slice(1)}
                          </td>
                          <td className="border px-4 py-2">
                            {segment.flightNumber}
                          </td>
                          <td className="border px-4 py-2">
                            <ul>
                              {seat.seatKeys.map((seatKey, keyIndex) => (
                                <li key={keyIndex}>{seat.seatNumber}</li>
                              ))}
                            </ul>
                          </td>
                          <td className="border px-4 py-2">
                            {seat.seatPrice} {selectedFlight.currency}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))}

        {/* {selectedAddOns?.meal && (
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Meals</h3>
            {selectedAddOns.meal.map((meal, index) => (
              <div key={index}>
                <p>
                  Passenger: {passengers[index % passengers.length]?.name || 'Dummy Name'}
                </p>
                <p>Meal Code: {meal.mealCode}</p>
                <p>Meal Info: {meal.mealInfo}</p>
              </div>
            ))}
          </div>
        )} */}

        {selectedAddOns?.meal && (
          <div className="mb-4">
            <h3 className="text-4xl font-semibold mb-2 pt-8 text-center">
              Meals
            </h3>
            {selectedFlight?.trips?.map((trip, tripIndex) => (
              <div key={tripIndex}>
                {trip?.flightSegments?.map((segment, segmentIndex) => (
                  <div key={segmentIndex}>
                    <h2 className="text-xl font-bold py-4">
                      {tripIndex === 0 && segmentIndex === 0
                        ? "First Flight Segment"
                        : tripIndex === 1 && segmentIndex === 0
                        ? "Second Flight Segment"
                        : ""}
                    </h2>
                    <table className="table-auto w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2">Passenger</th>
                          <th className="border px-4 py-2">Flight Number</th>
                          <th className="border px-4 py-2">Meal Code</th>
                          <th className="border px-4 py-2">Meal Info</th>
                          <th className="border px-4 py-2">Meal Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedAddOns.meal
                          .slice(tripIndex, tripIndex + 1)
                          .map(
                            (
                              meal,
                              index // update this line to only select the meal that corresponds to the current flight segment
                            ) => (
                              <tr
                                key={index}
                                className={index % 2 === 0 ? "bg-gray-100" : ""}
                              >
                                <td className="border px-4 py-2">
                                  {travellerDetails[
                                    index % travellerDetails.length
                                  ]?.firstName
                                    .charAt(0)
                                    .toUpperCase() +
                                    travellerDetails[
                                      index % travellerDetails.length
                                    ]?.firstName.slice(1)}{" "}
                                  {travellerDetails[
                                    index % travellerDetails.length
                                  ]?.lastName
                                    .charAt(0)
                                    .toUpperCase() +
                                    travellerDetails[
                                      index % travellerDetails.length
                                    ]?.lastName.slice(1)}
                                </td>
                                <td className="border px-4 py-2">
                                  {segment.flightNumber}
                                </td>
                                <td className="border px-4 py-2">
                                  {meal.mealCode}
                                </td>
                                <td className="border px-4 py-2">
                                  {meal.mealInfo}
                                </td>
                                <td className="border px-4 py-2">
                                  {meal.mealPrice} {selectedFlight.currency}
                                </td>
                              </tr>
                            )
                          )}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* 
        {selectedAddOns?.luggage && selectedAddOns.luggage.length > 0 && (
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Baggage</h3>
            {selectedAddOns.luggage.map((luggage, index) => (
              <div key={index}>
                <p>
                  Passenger: {passengers[index % passengers.length]?.name || 'Dummy Name'}
                </p>
                <p>Baggage Code: {luggage.baggageCode}</p>
                <p>Baggage Info: {luggage.baggageInfo}</p>
              </div>
            ))}
          </div>
        )} */}

        {selectedAddOns?.luggage && selectedAddOns.luggage.length > 0 && (
          <div className="mb-4">
            <h3 className="text-4xl font-semibold mb-2 pt-8 text-center">
              Baggage
            </h3>
            {selectedFlight?.trips?.map((trip, tripIndex) => (
              <div key={tripIndex}>
                {trip?.flightSegments?.map((segment, segmentIndex) => (
                  <div key={segmentIndex}>
                    <h2 className="text-xl font-bold py-4">
                      {tripIndex === 0 && segmentIndex === 0
                        ? "First Flight Segment"
                        : tripIndex === 1 && segmentIndex === 0
                        ? "Second Flight Segment"
                        : ""}
                    </h2>
                    <table className="table-auto w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border px-4 py-2">Passenger</th>
                          <th className="border px-4 py-2">Baggage Code</th>
                          <th className="border px-4 py-2">Baggage Info</th>
                          <th className="border px-4 py-2">Baggage Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedAddOns.luggage
                          .slice(0, 1)
                          .map((luggage, index) => (
                            <tr
                              key={index}
                              className={index % 2 === 0 ? "bg-gray-100" : ""}
                            >
                              <td className="border px-4 py-2">
                                {travellerDetails[
                                  index % travellerDetails.length
                                ]?.firstName
                                  .charAt(0)
                                  .toUpperCase() +
                                  travellerDetails[
                                    index % travellerDetails.length
                                  ]?.firstName.slice(1)}{" "}
                                {travellerDetails[
                                  index % travellerDetails.length
                                ]?.lastName
                                  .charAt(0)
                                  .toUpperCase() +
                                  travellerDetails[
                                    index % travellerDetails.length
                                  ]?.lastName.slice(1)}
                              </td>
                              <td className="border px-4 py-2">
                                {segment.flightNumber}
                              </td>
                              <td className="border px-4 py-2">
                                {luggage.baggageCode}
                              </td>
                              <td className="border px-4 py-2">
                                {luggage.baggageInfo}
                              </td>
                              <td className="border px-4 py-2">
                                {luggage.baggagePrice} {selectedFlight.currency}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="p-10">
            <h2 className="text-xl font-bold">Total amount to be paid:</h2>
            <h2 className="text-4xl font-bold">
              {calculateTotalPrice()} {selectedFlight.currency}
            </h2>
          </div>

          {/* <div>
            <button className="text-2xl bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow">
              Continue to Payment
            </button>
          </div> */}

          <div>
            <div className="text-center cursor-pointer bg-orange-500 rounded-lg p-4">
              <h2 className="text-2xl font-bold">Live Chat</h2>
              <p>
                Chat with a member of our <br /> in-house team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightConfirmation;
