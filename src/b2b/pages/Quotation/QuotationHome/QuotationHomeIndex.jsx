import React, { useEffect, useState } from "react";
import axios from "../../../../axios";
import QuotationNavigator from "../../../components/Quotation/Navigator/QuotationNavigator";
import QuotationSteps from "../../../components/Quotation/Steps/QuotationSteps";
import ArrivalAirport from "../QuotationQuestions/ArrivalAirport";
import DepartureAirport from "../QuotationQuestions/DepartureAirport";
import TravelDate from "../QuotationQuestions/TravelDate";
import TravellingPartner from "../QuotationQuestions/TravellingPartner";
import HotelEnquiry from "../QuotationQuestions/HotelEnquiry";
import ExcursionList from "../QuotationQuestions/ExcursionList";
import HotelList from "../QuotationQuestions/HotelList";
import HotelDetailCollection from "../QuotationQuestions/HotelDetailColletion";
import { useDispatch, useSelector } from "react-redux";
import { setInitialData } from "../../../../redux/slices/quotationSlice";
import ExcursionSupplementsList from "../QuotationQuestions/ExcursionSupplementsList";
import VisaQuotations from "../QuotationQuestions/VisaQuotations";
import TransferHotels from "../QuotationQuestions/TransferHotels";
import SuggestHotelList from "../QuotationQuestions/SuggestHotelList";
import HotelSuggestDetailCollection from "../QuotationQuestions/HotelSuggestDetailCollection";
import CreateQuotation from "../QuotationQuestions/CreateQuotation";
import SuppliemtsOptionPage from "../QuotationQuestions/SuppliemtsOptionPage";
import { handleClearAllStates } from "../../../../redux/slices/quotationSlice";
import B2BFrontVideo from "./B2BFrontVideo";



function QuotationHomeIndex() {

  const { token } = useSelector(state => state.agents)


  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseAirport, setResponseAirport ] = useState([])
  const [questions, setQuestions] = useState({
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
    createQuotation: false
  });

  const [animations, setAnimations] = useState(false)
  
  const [steps, setSteps] = useState({
    isArrivalAirport : false,
    isDepartureAirport : false,
    isTravelDate: false,
    isTravelPartner: false,
    isStay:false,
    isTransfer: false,
    isExcursion: false,
    isSuppliment: false,
    isVisa: false
  })

  useEffect(() => {
    setAnimations(true)
    setTimeout(()=>{
      setAnimations(false)
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
        createQuotation: false
      })
    }, 5000)
  }, []);


  const fetchInitialData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/b2b/quotations/inital/all", { headers: { Authorization: `Bearer ${token}`}});
      dispatch(setInitialData(response?.data));
      setResponseAirport(response?.data?.airports)
      setIsLoading(false);
    } catch (err) {
      setError(err?.response?.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
    // Clear data back this page
    return () =>{
      dispatch(handleClearAllStates())
    }
  }, []);

  return (
    <div className="">
      <QuotationNavigator />
      {
              animations ? (
            <div className=" ">
            <B2BFrontVideo />
            </div>
              ) : ""
            }
            {
              !animations && (
                <div className="grayMap">
                <div className=" bg-[rgba(255,255,255,.95)] min-h-[100vh]">
                  <div className="max-w-screen-lg mx-auto">
                        <QuotationSteps questions={questions} setQuestions={setQuestions} setSteps={setSteps} steps={steps} />  
                    <div className="">
                      {questions?.arrivalAirport ? (
                        <>
                          <ArrivalAirport setQuestions={setQuestions} responseAirport={responseAirport} isLoading={isLoading} setSteps={setSteps} />
                        </>
                      ) : questions?.departureAirport ? (
                        <>
                          <DepartureAirport setQuestions={setQuestions} setSteps={setSteps} />
                        </>
                      ) : questions?.travelDate ? (
                        <>
                          <TravelDate setQuestions={setQuestions} setSteps={setSteps} />
                        </>
                      ) : questions?.travelPartner ? (
                        <>
                          <TravellingPartner setQuestions={setQuestions} setSteps={setSteps} />
                        </>
                      ) : questions?.hotelEnquiry ? (
                        <>
                          <HotelEnquiry setQuestions={setQuestions} setSteps={setSteps} />
                        </>
                      ) : questions.hotelList ? (
                        <>
                          <HotelList setQuestions={setQuestions} />
                        </>
                      ) : questions.suggestHotel ? (
                        <>
                          <SuggestHotelList setQuestions={setQuestions} />
                        </>
                      ) : questions.suggestDetailCollection ? (
                        <>
                          <HotelSuggestDetailCollection setQuestions={setQuestions} />
                        </>
                      ) : questions.hotelDetailCollection ? (
                        <>
                          <HotelDetailCollection setQuestions={setQuestions} />
                        </>
                      ) : questions?.transferHotels ? (
                        <>
                          <TransferHotels setQuestions={setQuestions} />
                        </>
                      ) : questions?.excursionList ? (
                        <>
                          <ExcursionList setQuestions={setQuestions} setSteps={setSteps} />
                        </>
                      ): questions?.suplimetsOptionPage ? (
                        <>
                          <SuppliemtsOptionPage setQuestions={setQuestions} />
                        </>
                      ) : questions?.excursionSupplimetList ? (
                        <>
                          <ExcursionSupplementsList setQuestions={setQuestions} setSteps={setSteps} />
                        </>
                      ) : questions?.visaQuotations ? (
                        <>
                          <VisaQuotations setQuestions={setQuestions} setSteps={setSteps} />
                        </>
                      ) : questions?.createQuotation ? (
                        <>
                          <CreateQuotation setQuestions={setQuestions} />
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>

                  {
                    !questions.excursionSupplimetList &&  !questions.hotelDetailCollection && (
                  <div className={`${questions?.arrivalAirport ? "pt-14":questions?.departureAirport ? "pt-14" : questions?.travelDate ? "pt-20" : questions?.travelPartner ? "pt-4" : questions?.hotelEnquiry ? "pt-80" : questions.suggestDetailCollection ? "pt-32"  : questions.suplimetsOptionPage ? "pt-80" : "pt-14"} font-bold text-[13px] text-blue-500`}>
                    <h1 className="text-center">Welcome to Traveller’s Choice InstaQuote</h1>
                  </div>
                    )
                  }

                </div>
              </div>
              )
            }
     
    </div>
  );
}

export default QuotationHomeIndex;
