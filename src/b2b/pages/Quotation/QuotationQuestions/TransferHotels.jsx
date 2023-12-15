import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialTransferStays } from "../../../../redux/slices/quotationSlice";
import TransferHotelListComponent from "../../../components/Quotation/Transfer/TransferHotelListComponent";
import { setTransferQuotationDisabled, clearTransferDataSkip } from "../../../../redux/slices/quotationSlice";
import { TbPlayerTrackNextFilled } from "react-icons/tb";


function TransferHotels({ setQuestions }) {
  const dispatch = useDispatch();
  const [haveTransfer, setHaveTransfer] = useState(true);

  const {
    stays,
    arrivalAirport,
    departureAirport,
    transfer,
    isArrivalAirportDisabled,
    isDepartureAirportDisabled,
  } = useSelector((state) => state.quotation);

  useEffect(() => {
    for (let i = 0; i < transfer?.length; i++) {
      for (let k = 0; k < transfer[i]?.stays.length; k++) {
        if (
          transfer[i]?.stays?.length > 0 &&
          transfer[i]?.stays[k]?.transferFrom?.length === 0
        ) {
          setHaveTransfer(false);
        }
      }
    }
  });

  // useEffect(() => {
  //   dispatch(setInitialTransferStays());
  // }, []);

  return (
    <div className="max-w-screen-lg max-auto">
      <div>
        <div className="pb-5">
          <h3 className="text-md tracking-wide text-center text-stone-600 font-bold">
            Transfer
          </h3>
        </div>

        <br />
        {stays?.map((stay, stayIndex) => (
          <div key={stayIndex} className="bg-white shadow-md mt-3 rounded">
            <div className="ml-5 p-3">
              <h1 className="font-bold ">Stay {stayIndex + 1}</h1>
            </div>
            {isArrivalAirportDisabled && !isDepartureAirportDisabled ? (
              <>
                {[...stay?.hotels, departureAirport]?.map(
                  (hotel, hotelIndex) => {
                    return (
                      <TransferHotelListComponent
                        key={hotelIndex}
                        hotelIndex={hotelIndex}
                        stayIndex={stayIndex}
                        hotel={hotel}
                        hotelLength={
                          [...stay?.hotels, departureAirport]?.length
                        }
                        resultArray={[...stay?.hotels, departureAirport]}
                      />
                    );
                  }
                )}
              </>
            ) : isDepartureAirportDisabled && !isArrivalAirportDisabled ? (
              <>
                {[arrivalAirport, ...stay?.hotels]?.map((hotel, hotelIndex) => {
                  return (
                    <TransferHotelListComponent
                      key={hotelIndex}
                      hotelIndex={hotelIndex}
                      stayIndex={stayIndex}
                      hotel={hotel}
                      hotelLength={[arrivalAirport, ...stay?.hotels]?.length}
                      resultArray={[arrivalAirport, ...stay?.hotels]}
                    />
                  );
                })}
              </>
            ) : !isArrivalAirportDisabled && !isDepartureAirportDisabled ? (
              <>
                {[arrivalAirport, ...stay?.hotels, departureAirport]?.map(
                  (hotel, hotelIndex) => {
                    return (
                      <TransferHotelListComponent
                        key={hotelIndex}
                        hotelIndex={hotelIndex}
                        stayIndex={stayIndex}
                        hotel={hotel}
                        hotelLength={
                          [arrivalAirport, ...stay?.hotels, departureAirport]
                            ?.length
                        }
                        resultArray={[
                          arrivalAirport,
                          ...stay?.hotels,
                          departureAirport,
                        ]}
                      />
                    );
                  }
                )}
              </>
            ) : (
              <>
                {stay?.hotels?.map((hotel, hotelIndex) => {
                  return (
                    <TransferHotelListComponent
                      key={hotelIndex}
                      hotelIndex={hotelIndex}
                      stayIndex={stayIndex}
                      hotel={hotel}
                      hotelLength={stay?.hotels?.length}
                      resultArray={stay?.hotels}
                    />
                  );
                })}
              </>
            )}
          </div>
        ))}
        <br />

        <div className="flex justify-end gap-2 mr-5 md:mr-0">
          <div className="">
            <button
              className="bg-orange-600 rounded text-[14px] font-[600] text-white shadow-sm w-[130px] py-2"
              onClick={() => {
                dispatch(setTransferQuotationDisabled(true));
                dispatch(clearTransferDataSkip())
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
              }}
            >
              Skip
            </button>
          </div>
          <button
            onClick={() => {
              if (haveTransfer === false) {
                dispatch(setTransferQuotationDisabled(false));
              }
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
              });

              
            }}
            className="relative bg-gradient-to-l from-blue-600 to-red-600 hover:from-red-600 hover:to-blue-600 rounded text-[14px] font-[600] text-white shadow-sm w-[130px] py-2"
          >
            Next
            <span className="absolute top-3 bottom-0 left-24 right-0"><TbPlayerTrackNextFilled/></span>
          </button>
        </div>
      
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default TransferHotels;
