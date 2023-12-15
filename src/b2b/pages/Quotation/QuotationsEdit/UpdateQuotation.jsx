import React, { useEffect, useState } from "react";
import axios from "../../../../axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emptyHotelDetails } from "../../../../redux/slices/quotationSlice";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { setAlertSuccess } from "../../../../redux/slices/homeSlice";
import BtnLoader from "../../../components/BtnLoader";
import { handleClearAllStates, setQuotationCurrency } from "../../../../redux/slices/quotationSlice";
import moment from "moment";



function UpdateQuotation({setQuotationEdit}) {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
  
  
    const { token } = useSelector(state => state.agents)
    const { checkInDate,
       checkOutDate,
       childrenAges,
       noOfChildren,
       noOfAdults, 
       transfer, 
       clientName, 
       stays, 
       selectedExcursionTypeSuppliments, 
       selectedVisaId, 
       selectedExcursionType, 
       isVisaQuotaionsDisabled, 
       isTransferQuotationDisabled, 
       isHotelQuotationDisabled, 
       selectedExcursion, 
       selectedExcursionSuppliments,
       arrivalAirport,
       departureAirport,
       paxType,
       isArrivalAirportDisabled,
       isDepartureAirportDisabled,
       isAlreadyBooked,
       isExcursionQuotationDisabled,
       isSupplimentQuotationDisabled,
       excursionFiltered,
       excSupplimentFiltered,
       quotationCurrency,
       selectedVisaNationality,
       selectedExcursionIds,
       selectedExcSupplimentsIds
        } = useSelector(state => state.quotation)
      const { quotationList } = useSelector((state)=> state.qutationList)
      const dispatch = useDispatch()
      
    const date = new Date(checkInDate);
    const checkinMonth = date.toLocaleString('default', { month: 'short' }); // "Jun"
    const checkinDay = date.getDate();
    const chckoutDate = new Date(checkOutDate);
    const checkoutMonth = chckoutDate.toLocaleString('default', { month: 'short' }); // "Jun"
    const checkoutDate = chckoutDate.getDate();
  
    // const selectedExcursions = excursionFiltered?.filter((exc)=>exc.isSelected)
    // const selectedExcursionsSuppliments = excSupplimentFiltered?.filter((exc)=>exc.isSelected)

    const excursinSendData = ()=>{
      const exc = selectedExcursionIds?.map((ele)=>{
        const sendExc = {
          excursionId: ele?._id,
          value: ele?.selectedExcursionType,
          vehicleType: ele?.vehicleType || []
        }
        return sendExc
        
      })
      return exc
    }

    const excursinSupplimentsSendData = ()=>{
      const excsuppliment = selectedExcSupplimentsIds?.map((ele)=>{
        const sendExc = {
          excursionId: ele?._id,
          value: ele?.selectedExcursionType,
          vehicleType: ele?.vehicleType || []
        }
        return sendExc
        
      })
      return excsuppliment
    }

    const navigate = useNavigate()
    const formattedFromDate = moment(checkInDate).format("YYYY-MM-DD")
    const formattedToDate = moment(checkOutDate).format("YYYY-MM-DD")
    
    const updateQuotation = async () => {
      try {
        setIsLoading(true);
        setError("");
        await axios.patch(
          `/b2b/quotations/update/${quotationList?.quotationNumber}`,
          {
            isTransferQuotationDisabled,
            isHotelQuotationDisabled,
            transfer,
            stays,
            selectedExcursionType : excursinSendData(),
            isTourismFeeIncluded: true,
            // quotationCurrency,
            // markup: markup,
            // markupType,
            visaId: selectedVisaId.id,
            noOfAdults,
            noOfChildren,
            childrenAges,
            checkInDate: formattedFromDate,
            checkOutDate: formattedToDate,
            // otbPrice,
            // hotelDisabledRemark,
            clientName,
            selectedExcursionTypeSuppliments : excursinSupplimentsSendData(),
            isVisaQuotationDisabled : isVisaQuotaionsDisabled,
            arrivalAirport : arrivalAirport.id,
            arrivalTerminalId:arrivalAirport.terminalId,
            arrivalTerminalCode: arrivalAirport.terminalCode,
            departureAirport : departureAirport.id,
            departureTerminalId: departureAirport.terminalId,
            departureTerminalCode: departureAirport.terminalCode,
            paxType,
            isArrivalAirportDisabled,
            isDepartureAirportDisabled,
            isAlreadyBooked,
            isExcursionQuotationDisabled,
            isSupplimentQuotationDisabled,
            quotationCurrency:quotationCurrency,
            selectedVisaNationality
          },
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        setIsLoading(false);
        dispatch(
          setAlertSuccess({
            status: true,
            title: "Quotation Updated!!",
            text: "Quotation update Successfully",
          })
          )
    dispatch(handleClearAllStates())
    navigate("/quotation/view",{state: quotationList?.quotationNumber})
      } catch (err) {
        setError(err?.response?.data?.error);
        setIsLoading(false);
      }
    };
  
   
  return (
    <div className="w-full h-auto bg-white shadow-lg p-4">
    {/* Arrival and Departure */}
    <div className="border-b-2 pb-5">
      <div className="flex justify-end">
        <button
          className="text-white p-1 text-[10px] w-10 rounded mr-4 bg-blue-500"
          onClick={() => {
            dispatch(emptyHotelDetails())
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
        >
          Edit
        </button>
      </div>
      <div className="flex justify-around p-2">
        <div className="flex gap-1">
          <FaPlaneArrival />
          <h1 className="text-sm">
            Arrival Airport: {arrivalAirport?.name} ({arrivalAirport?.iata})
          </h1>
        </div>
        <div className="flex gap-1">
          <FaPlaneDeparture />
          <h1 className="text-sm">
            Departure Airport: {departureAirport?.name} ({departureAirport?.iata})
          </h1>
        </div>
      </div>
    </div>
  
    {/* Travel Dates */}
    <div className="bg-white p-4">
      <div className="border-b-2 pb-4">
        <div className="flex justify-end">
          <button
            className="text-white p-1 text-[10px] w-10 rounded mr-4 bg-blue-500"
            onClick={() => {
              dispatch(emptyHotelDetails())
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
          >
            Edit
          </button>
        </div>
        <div className="border-b-2 flex justify-around p-4">
          <div className="flex gap-2">
            <FaPlaneArrival />
            <h1 className="text-sm">Arrival Date: {checkinMonth} {checkinDay}</h1>
          </div>
          <div className="flex gap-2">
            <FaPlaneDeparture />
            <h1 className="text-sm">Departure Date: {checkoutMonth} {checkoutDate}</h1>
          </div>
        </div>
      </div>
  
      {/* Pax */}
      <div className="border-b-2 pb-4">
        <div className="flex justify-end">
          <button
            className="text-white p-1 text-[10px] w-10 rounded mr-4 bg-blue-500"
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
          >
            Edit
          </button>
        </div>
        <div className="text-center font-bold">
          <h1>Pax</h1>
        </div>
        <div className="p-3 ml-3">
          <h1 className="text-sm">Travellers: {paxType}</h1>
          <h1 className="text-sm">Adults: {noOfAdults}</h1>
          <h1 className="text-sm">Childrens: {noOfChildren}</h1>
        </div>
      </div>
  
      {/* Stays */}
      <div>
        {stays?.map((ele, index) => {
          return (
            <div key={index} className="border-b-2 p-4 mb-4 rounded-lg">
              {ele.hotels.length > 0 && (
                <>
                  <div className="pt-5">
                    <h1 className="text-center font-bold">
                      <u>Stays {index + 1}</u>
                    </h1>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="text-white p-1 text-sm w-16 rounded bg-blue-500"
                      onClick={() => {
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
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
  
              <div className="flex gap-10 flex-wrap">
                {ele.hotels.map((dt, i) => {
                  return (
                    <div
                      key={i}
                      className="p-3 flex flex-col border-gray-200 rounded-lg shadow-md bg-white"
                    >
                      <h1 className="text-sm font-semibold mb-2">
                        Hotel Name: {dt?.hotelName}
                      </h1>
                      <p className="text-sm">Room Type: {dt?.roomTypeName}</p>
                      <p className="text-sm">Board Type: {dt?.boardTypeName}</p>
                      <p className="text-sm">Place: {dt?.placeName}</p>
                      <p className="text-sm">Checkin Date: {dt?.checkInDate.slice(0, 10)}</p>
                      <p className="text-sm">Checkout Date: {dt?.checkOutDate.slice(0, 10)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div>
      {transfer.length !== 0 && (
        <div className="border-b-2 pb-4">
          <div className="flex justify-end">
            <button
              className="text-white p-1 text-[10px] w-10 rounded mr-4 bg-blue-500"
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
                  excursionSupplimetListEdit: false,
                  visaQuotationsEdit: false,
                  createQuotationEdit: false
                });
              }}
            >
              Edit
            </button>
          </div>
          <h1 className="text-center font-bold">Transfer</h1>
          {transfer?.map((ele, i) => (
            <div key={i} className="p-3">
              {
                ele?.stays?.map((data)=>{
                  return (
                    <>
                    {
                      data?.transferFrom && data?.transferTo ? (
                    <ul className="list-disc ml-6 text-sm">
                    <li><span className="font-semibold">From</span> {data?.transferFromName} <span className="font-semibold">To </span> {data?.transferToName}</li>
                   </ul>
                      ) : ""
                    }
                </>
                  )
                })
              }
             
              <ul className="list-disc ml-6 text-sm">
                {ele?.selectedExcursionType === "Shared" ? (
                  <li>{ele?.attraction}-{ele?.name} - Tickets With SIC Transfer</li>
                ) : ele?.selectedExcursionType === "Ticket" ? (
                  <li>{ele.attraction} - {ele?.name} - Only Ticket</li>
                ) : ele?.selectedExcursionType === "Private" ? (
                  <li>{ele?.attraction} - {ele?.name} - Tickets With PVT Transfer</li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
      </div>
  
      {/* Excursions */}
      {selectedExcursionIds?.length !== 0 && (
        <div className="border-b-2 pb-4">
          <div className="flex justify-end">
            <button
              className="text-white p-1 text-[10px] w-10 rounded mr-4 bg-blue-500"
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
                });
              }}
            >
              Edit
            </button>
          </div>
          <h1 className="text-center font-bold">Excursions</h1>
          {selectedExcursionIds?.map((ele, i) => (
            <div key={i} className="p-3">
              {console.log(ele)}
              
              <ul className="list-disc ml-6 text-sm">
                
                {ele?.selectedExcursionType === "shared" || ele?.selectedExcursionType === "Shared" ? (
                  <li>{ele?.attraction}-{ele?.name} - Tickets With SIC Transfer</li>
                ) : ele?.selectedExcursionType === "Ticket" || ele?.selectedExcursionType === "ticket" ? (
                  <li>{ele.attraction} - {ele?.name} - Only Ticket</li>
                ) : ele?.selectedExcursionType === "private" || ele?.selectedExcursionType === "Private" ? (
                  <li>{ele?.attraction} - {ele?.name} - Tickets With PVT Transfer</li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
  
      {/* Excursion Supplements */}
      {selectedExcSupplimentsIds?.length !== 0 && (
        <div className="border-b-2 pb-4">
          <div className="flex justify-end">
            <button
              className="text-white p-1 text-[10px] w-10 rounded mr-4 bg-blue-500"
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
                });
              }}
            >
              Edit
            </button>
          </div>
          <h1 className="text-center font-bold">Excursions Suppliments</h1>
          {selectedExcSupplimentsIds?.map((ele, i) => (
            <div key={i} className="p-3">
              <ul className="list-disc ml-6 text-sm">
                {ele?.selectedExcursionType === "Shared" ? (
                  <li>{ele?.attraction}-{ele?.name} - Tickets With SIC Transfer</li>
                ) : ele?.selectedExcursionType === "Ticket" ? (
                  <li>{ele.attraction} - {ele?.name} - Only Ticket</li>
                ) : ele?.selectedExcursionType === "Private" ? (
                  <li>{ele?.attraction} - {ele?.name} - Tickets With PVT Transfer</li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
  
      {/* Visa Quotations */}
      {Object.keys(selectedVisaId).length !== 0 && !isVisaQuotaionsDisabled && (
        <div className="pb-4">
          <div className="flex justify-end">
            <button
              className="text-white p-1 text-[10px] w-10 rounded mr-4 bg-blue-500"
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
                });
              }}
            >
              Edit
            </button>
          </div>
          <div className="pt-8">
            <h1 className="text-center font-bold">Visa Type</h1>
          </div>
          <div className="p-2 pt-3 ml-3 border-b-2">
            <h1 className="text-sm">
              Visa Name &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;: &nbsp;
              {selectedVisaId?.visaName}
            </h1>
            <h1 className="text-sm">
              Processing Time &nbsp; &nbsp; &nbsp;: &nbsp;
              {selectedVisaId?.processTime} {selectedVisaId?.processFormat}
            </h1>
            <h1 className="text-sm">
              Validity &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp;: &nbsp; {selectedVisaId?.validity} {selectedVisaId?.validityFormat}
            </h1>
          </div>
        </div>
      )}
  
    </div>
  
        <div className="flex justify-end items-center gap-3 pb-16 md:pb-0">
             <div className="flex gap-2">
             <div>
                <h1>Please review and chose the currency for your quotation : </h1>
              </div>
                 <input
                      type="radio"
                      id={"radio-default-2"}
                      className={`border hover:border-blue-300 text-gray-800 font-bold py-2 px-4  `}
                      name={"quotationCurrency" }
                      value={"AED"}
                      checked={quotationCurrency === "AED"}
                      onClick={(e) => {
                        dispatch(setQuotationCurrency(e.target.value))
                      }}
                    />
                    <label className="text-[14px] text-black">AED</label>
                    <input
                      type="radio"
                      id="radio-default-1"
                      className={`border hover:border-blue-300 text-gray-800 font-bold py-2 px-4 rounded-r  `}
                      name={"quotationCurrency"}
                      value={"USD"}
                      checked={quotationCurrency === "USD"}
                      onClick={(e)=> {
                        dispatch(setQuotationCurrency(e.target.value))
                      }}
                    />
                 <label className="text-[14px] text-black">USD</label>
               </div>
      {!isLoading ? (
        <button
          onClick={updateQuotation}
          className="bg-gradient-to-l from-blue-400 to-red-600 hover:from-red-600 hover:to-blue-400 rounded text-[14px] font-[600] text-white shadow-sm w-[170px] py-2 mr-10 p-1"
        >
          Update Quotation
        </button>
      ) : (
        <button
          className="bg-gradient-to-l from-blue-400 to-red-600 hover:from-red-600 hover:to-blue-400 rounded text-[14px] font-[600] text-white shadow-sm w-[170px] py-2 mr-10 p-1"
        >
          <BtnLoader />
        </button>
      )}
    </div>
  </div>
  
  )
}

export default UpdateQuotation
