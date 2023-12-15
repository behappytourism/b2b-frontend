import React, {useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import QuotationNavigator from '../../../components/Quotation/Navigator/QuotationNavigator'
import QuotationStepsEdit from '../../../components/Quotation/Steps/QuotationStepsEdit'
import axios from "../../../../axios";
import { setInitialData } from "../../../../redux/slices/quotationSlice";
import ArrivalAirportEdit from '../QuotationsEdit/ArrivalAirportEdit';
import DepartureAirportEdit from '../QuotationsEdit/DepartureAirportEdit';
import TravelDateEdit from '../QuotationsEdit/TravelDateEdit';
import EditTravellingPartner from '../QuotationsEdit/EditTravellingPartner';
import EditHotelEnquiry from '../QuotationsEdit/EditHotelEnquiry';
import EditHotelList from '../QuotationsEdit/EditHotelList';
import EditSuggestHotelList from '../QuotationsEdit/EditSuggestHotelList';
import EditHotelSuggestDetailCollection from '../QuotationsEdit/EditHotelSuggestDetailCollection';
import EditHotelDetailCollection from '../QuotationsEdit/EditHotelDetailCollection';
import EditTransferHotel from '../QuotationsEdit/EditTransferHotel';
import EditExcursionList from '../QuotationsEdit/EditExcursionList';
import EditExcursionSuppliments from '../QuotationsEdit/EditExcursionSuppliments';
import VisaQuotationEdit from '../QuotationsEdit/VisaQuotationEdit';
import UpdateQuotation from '../QuotationsEdit/UpdateQuotation';
import SupplimetsOptionEditPage from '../QuotationsEdit/SupplimetsOptionEditPage';
import { setInitialEditData } from '../../../../redux/slices/quotationSlice';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { handleClearAllStates } from "../../../../redux/slices/quotationSlice";
import { PageLoader } from '../../../components';

function QuotationEditHomeIndex() {

  const params = useParams()
  
    const {token} = useSelector(state => state.agents)

    const dispatch = useDispatch()
    const [ error, setError ] = useState("")
    const [ isLoading, setIsLoading ] = useState(false)
    const [responseAirport, setResponseAirport ] = useState([])
    const [quotationEdit, setQuotationEdit] = useState({
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
        suplimetsOptionPageEdit: false,
        excursionSupplimetListEdit: false,
        visaQuotationsEdit: false,
        createQuotationEdit: false
    })

    const fetchInitialData = async () => {
        try {
          setIsLoading(true); 
          const response = await axios.get("/b2b/quotations/inital/all",  { headers: { Authorization: `Bearer ${token}`}});
          const res = await axios.get(`/b2b/quotations/amendment/${params.amendment}`,  { headers: { Authorization: `Bearer ${token}`}})
          dispatch(setInitialData(response?.data));
          dispatch(setInitialEditData(res?.data))
          setResponseAirport(response?.data?.airports)
          setIsLoading(false);
        } catch (err) {
          setError(err?.response?.data);
          setIsLoading(false);
        }
      };

      useEffect(() => {
        fetchInitialData();

        // Clear data for back this page
        return()=>{
           dispatch(handleClearAllStates())
        }
      },[]);

  return (
    <>
    {
      !isLoading ? (
        <div className="">
        <QuotationNavigator />
        <div className="grayMap">
          <div className=" bg-[rgba(255,255,255,.95)] min-h-[100vh]">
            <div className="max-w-screen-lg mx-auto">
              <QuotationStepsEdit quotationEdit={quotationEdit} setQuotationEdit={setQuotationEdit} />
              <div className="">
                {quotationEdit?.arrivalAirportEdit ? (
                  <>
                    <ArrivalAirportEdit setQuotationEdit={setQuotationEdit} responseAirport={responseAirport} isLoading={isLoading} />
                  </>
                ) : quotationEdit?.departureAirportEdit ? (
                  <>
                    <DepartureAirportEdit setQuotationEdit={setQuotationEdit} />
                  </>
                ) : quotationEdit?.travelDateEdit ? (
                  <>
                    <TravelDateEdit setQuotationEdit={setQuotationEdit} />
                  
                  </>
                ) : quotationEdit?.travelPartnerEdit ? (
                  <>
                    <EditTravellingPartner setQuotationEdit={setQuotationEdit} /> 
                  </>
                ) : quotationEdit?.hotelEnquiryEdit ? (
                  <>
                    <EditHotelEnquiry setQuotationEdit={setQuotationEdit} />
                  </>
                ) : quotationEdit.hotelListEdit ? (
                  <>
                    <EditHotelList setQuotationEdit={setQuotationEdit} />
                  </>
                ) : quotationEdit.suggestHotelEdit ? (
                  <>
                    <EditSuggestHotelList setQuotationEdit={setQuotationEdit} />
                  </>
                ) : quotationEdit.suggestDetailCollectionEdit ? (
                  <>
                    <EditHotelSuggestDetailCollection setQuotationEdit={setQuotationEdit} />
                  </>
                ) : quotationEdit.hotelDetailCollectionEdit ? (
                  <>
                    <EditHotelDetailCollection setQuotationEdit={setQuotationEdit} />
                  </>
                ) : quotationEdit?.transferHotelsEdit ? (
                  <>
                    <EditTransferHotel setQuotationEdit={setQuotationEdit} />
                  </>
                ) : quotationEdit?.excursionListEdit ? (
                  <>
                    <EditExcursionList setQuotationEdit={setQuotationEdit} />
                  </>
                ) : quotationEdit?.suplimetsOptionPageEdit ? (
                  <>
                    <SupplimetsOptionEditPage setQuotationEdit={setQuotationEdit} />
                  </>
                )  : quotationEdit?.excursionSupplimetListEdit ? (
                  <>
                    <EditExcursionSuppliments setQuotationEdit={setQuotationEdit} />
                  </>
                ) : quotationEdit?.visaQuotationsEdit ? (
                  <>
                    <VisaQuotationEdit setQuotationEdit={setQuotationEdit} />
                  </>
                ) : quotationEdit?.createQuotationEdit ? (
                  <>
                    <UpdateQuotation setQuotationEdit={setQuotationEdit} />
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
            {
              !quotationEdit.excursionSupplimetListEdit &&  !quotationEdit.hotelDetailCollectionEdit && (
            <div className={`${quotationEdit?.arrivalAirportEdit ? "pt-14":quotationEdit?.departureAirportEdit ? "pt-14" : quotationEdit?.travelDateEdit ? "pt-20" : quotationEdit?.travelPartnerEdit ? "pt-4" : quotationEdit?.hotelEnquiryEdit ? "pt-80" : quotationEdit.suggestDetailCollectionEdit ? "pt-32" :  "pt-14"} font-bold text-[13px] text-blue-500`}>
               <h1 className="text-center">Welcome to Traveller’s Choice InstaQuote</h1>
            </div>
              )
            }
          </div>
        </div>
      </div>
      ) : (
        <div className='pt-60'>
          <PageLoader />
        </div>
      )
    }
   
  </>
  )
}

export default QuotationEditHomeIndex
