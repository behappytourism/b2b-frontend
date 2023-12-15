import React from 'react'
import { setOptionalSuppliemtsDisabled, removeNotRequiredSupplimetsData } from '../../../../redux/slices/quotationSlice'
import { useDispatch } from 'react-redux'

function SupplimetsOptionEditPage({setQuotationEdit}) {

    const dispatch = useDispatch()

  return (
    <div className="max-w-screen-lg mx-auto space-y-10">
    <div classsName="">
      <div className="pb-5">
        <h3 className="md:text-md tracking-wide text-center text-stone-600 font-bold">
        Do you like to add optional Excursions?
        </h3>
      </div>

      <div className="grid md:flex justify-center md:w-[600px]  gap-3 md:items-center md:ml-16 lg:ml-44 ml-1">
        <div
        onClick={() => {
        //   dispatch(setIsHotelQuotationDisabled(false))
          dispatch(setOptionalSuppliemtsDisabled(false))
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
            suplimetsOptionPageEdit: false,
            excursionSupplimetListEdit: true,
            visaQuotationsEdit: false,
            createQuotationEdit: false
          })
        }}
        className="relative  cursor-pointer  bg-blue-500   hover:-translate-y-1 transition-all duration-400 rounded-md border-[1px] border-gray-100 border-opacity-20 shadow-sm md:w-[400px] w-80 py-3  flex flex-col items-center">
          <div className="">
            <p className="text-sm font-[400] text-white">Yes</p>
          </div>
          {/* <div className="absolute w-20 rounded-full h-20 bg-green-600 opacity-40 -top-5 -left-5"></div>
          <div className="absolute w-10 rounded-full h-10 bg-green-600 opacity-50 -bottom-5 -right-5"></div>
          <div className="absolute w-20 rounded-full h-20 bg-green-600 opacity-50 -bottom-12 right-3"></div> */}
        </div>
       
        <div 
        onClick={() => {
          dispatch(removeNotRequiredSupplimetsData())
          dispatch(setOptionalSuppliemtsDisabled(true))
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
            suplimetsOptionPageEdit: false,
            excursionSupplimetListEdit: false,
            visaQuotationsEdit: true,
            createQuotationEdit: false
          })
        }}
        className="relative  cursor-pointer bg-blue-500 to-sky-100  hover:-translate-y-1 transition-all duration-400 rounded-md border-[1px] border-gray-100 border-opacity-20 shadow-sm w-80  md:w-[400px] py-3  flex flex-col items-center">
          <div className="">
            <p className="text-sm font-[400] text-white">No</p>
          </div>
          {/* <div className="absolute w-20 rounded-full h-20 bg-blue-600 opacity-40 -top-5 -left-5"></div>
          <div className="absolute w-10 rounded-full h-10 bg-blue-600 opacity-50 -bottom-5 -right-5"></div>
          <div className="absolute w-20 rounded-full h-20 bg-blue-600 opacity-50 -bottom-12 right-3"></div> */}
        </div>
      </div>
    </div>
  </div>
  )
}

export default SupplimetsOptionEditPage
