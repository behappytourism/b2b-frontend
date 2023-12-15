import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsHotelQuotationDisabled,
  setTransferQuotationDisabled,
  hotelAndStayRomoveIndNotRequired,
  setAlreadyBooked, setPickPlaceForWithoutHotel
} from "../../../../redux/slices/quotationSlice";
import { AiFillWarning } from "react-icons/ai";
import { config } from "../../../../constants";
import EditGooglePlaces from "./EditGooglePlaces";

function EditHotelEnquiry({ setQuotationEdit }) {
  const { stays } = useSelector((state) => state.quotation);

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();


  const handlePickupNote = (e)=>{
    const {name, value} = e.target
    dispatch(setPickPlaceForWithoutHotel({note: value}))
  }

  return (
    <div className="max-w-screen-lg mx-auto space-y-10">
      <div classsName="">
        <div className="pb-5">
          <h3 className="text-md tracking-wide text-center text-stone-600 font-bold">
          Add hotel to your trip
          </h3>
        </div>

        <div className="grid lg:grid-cols-3 md:flex md:w-[600px] gap-3 lg:ml-44  md:ml-20 ml-10 ">
          <div
            onClick={() => {
              dispatch(setIsHotelQuotationDisabled(false));
              dispatch(setTransferQuotationDisabled(false));
              setQuotationEdit({
                arrivalAirportEdit: false,
                departureAirportEdit: false,
                travelDateEdit: false,
                travelPartnerEdit: false,
                hotelEnquiryEdit: false,
                hotelListEdit: true,
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
            className="relative  cursor-pointer  bg-blue-500 w-80  hover:-translate-y-1 transition-all duration-400 rounded-md border-[1px] border-gray-100 border-opacity-20 shadow-sm  lg:w-[400px] py-3  flex flex-col items-center"
          >
            <div className="">
              <p className="text-sm font-[400] text-white">Choose a hotel</p>
            </div>
          </div>
          <div
            onClick={() => {
              dispatch(setIsHotelQuotationDisabled(false));
              dispatch(setTransferQuotationDisabled(false));
              dispatch(setAlreadyBooked(true))
              setQuotationEdit({
                arrivalAirportEdit: false,
                departureAirportEdit: false,
                travelDateEdit: false,
                travelPartnerEdit: false,
                hotelEnquiryEdit: false,
                hotelListEdit: false,
                suggestHotelEdit: true,
                suggestDetailCollectionEdit: false,
                hotelDetailCollectionEdit: false,
                transferHotelsEdit: false,
                excursionListEdit: false,
                excursionSupplimetListEdit: false,
                visaQuotationsEdit: false,
                createQuotationEdit: false,
              });
            }}
            className="relative  cursor-pointer  bg-blue-500 to-sky-100   hover:-translate-y-1 transition-all duration-400 rounded-md border-[1px] border-gray-100 border-opacity-20 shadow-sm w-80 lg:w-[400px] py-3  flex flex-col items-center"
          >
            <div className="">
              <p className="text-sm font-[400] text-white">
                I have Already Booked
              </p>
            </div>
          </div>
          <div
            onClick={() => {
              setShowModal(true);
              dispatch(setIsHotelQuotationDisabled(true));
              dispatch(setTransferQuotationDisabled(true));
              dispatch(setAlreadyBooked(false))
            }}
            className="relative  cursor-pointer bg-blue-500 to-sky-100  hover:-translate-y-1 transition-all duration-400 rounded-md border-[1px] border-gray-100 border-opacity-20 shadow-sm w-80 lg:w-[400px] py-3  flex flex-col items-center"
          >
            <div className="">
              <p className="text-sm font-[400] text-white">Not required</p>
            </div>
          </div>

          <>
            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm transition-all ">
                  <div className="relative w-auto my-6 mx-auto max-w-2xl">
                    {/*content*/}
                    <div className=" rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className=" p-5  border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold text-center flex justify-center">
                          <span className="text-orange-400">
                            <AiFillWarning />
                          </span>
                          Warning!!
                        </h3>
                        {/* <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button> */}
                      </div>
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <p className="my-4 text-slate-600 text-lg leading-relaxed">
                        If a hotel is not chosen, we will not be able to provide shared or private transfers for airport or attractions
                        </p>
                        <div>
                    <div>
                      <div>
                      <label htmlFor="">Pick up location</label>
                      </div>
                      <div>
                        <EditGooglePlaces/>
                      </div>
                      <div className="pt-3">
                        <div>
                          <label htmlFor="">Note</label>
                        </div>
                        <div>
                      <textarea
                            onChange={handlePickupNote}
                            name='note' 
                            className='outline-none h-20 w-80 border rounded p-2 placeholder:text-gray-300 placeholder:text-sm'
                            placeholder="Write your Comments"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                      </div>
                      {/*footer*/}
                      <div className="flex items-center justify-end p-6  border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            setShowModal(false);
                            dispatch(setIsHotelQuotationDisabled(true));
                            dispatch(setTransferQuotationDisabled(true));
                            dispatch(hotelAndStayRomoveIndNotRequired());
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
                              suplimetsOptionPageEdit: false,
                              excursionSupplimetListEdit: false,
                              visaQuotationsEdit: false,
                              createQuotationEdit: false,
                            });
                          }}
                        >
                          Proceed
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </>
        </div>
        <div className="pt-3">
          {stays?.map((stay, stayIndex) => {
            return (
              <>
                {stay?.hotels?.length ? (
                  <div key={stayIndex} className="mt-5 p-5 bg-white shadow-lg">
                    <div>
                      <h1 className="text-center font-bold text-lg">
                        Selected Hotels
                      </h1>
                    </div>
                    <div className="flex justify-between p-1 pb-2">
                      <p className="text-xs  text-gray-300">
                        Stay {stayIndex + 1}
                      </p>
                    </div>
                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3 ">
                      {stay.hotels?.map((hotel, hotelIndex) => (
                        <div
                          key={hotelIndex}
                          className="relative cursor-pointer bg-white overflow-hidden hover:-translate-y-1 transition-all duration-300 rounded-md border-[1px] border-gray-100 border-opacity-20 shadow-round w-full  flex flex-col items-center "
                        >
                          <div className=" w-full h-[100px] bg-gray-200">
                            <img
                              src={
                                hotel?.hotelData?.image?.isRelative
                                  ? config.SERVER_URL +
                                    hotel?.hotelData?.image?.path
                                  : hotel?.hotelData?.image?.path
                              }
                              alt={"hotel" + hotelIndex}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="p-2 text-center">
                            <div className="pt-2">
                              <p className="text-sm font-[500] text-gray-400">
                                {hotel?.hotelName}
                              </p>
                            </div>
                            <div className="grid-row-1 p-1">
                              <div className="pt-2 text-left">
                                <p className="text-[12px]  text-gray-400">
                                  Check-In : {hotel?.checkInDate.slice(0, 10)}
                                </p>
                              </div>
                              <div className=" text-left">
                                <p className="text-[11px]  text-gray-400 ">
                                  Check-Out : {hotel?.checkOutDate.slice(0, 10)}
                                </p>
                              </div>
                              {
                                hotel?.roomTypeName && (
                              <div className=" text-left">
                                <p className="text-[11px]  text-gray-400 ">
                                  Room type : {hotel?.roomTypeName}
                                </p>
                              </div>
                                )
                              }
                              {
                                hotel?.boardTypeCode && (
                              <div className=" text-left">
                                <p className="text-[11px]  text-gray-400 ">
                                  Board type :{" "}
                                  {hotel?.boardTypeName
                                    ? hotel?.boardTypeName
                                    : hotel?.boardTypeCode}
                                </p>
                              </div>
                                )
                              }
                            </div>
                            <div className="p-2 text-left">
                              <div className="text-xs text-grayColor">
                                {hotel?.hotelData?.address
                                  ? hotel?.hotelData?.address
                                  : hotel?.city}
                              </div>
                              <div className="text-xs text-grayColor">
                                {hotel?.placeName +
                                " , " +
                                hotel?.hotelData?.state?.stateName
                                  ? hotel?.hotelData?.state?.stateName
                                  : hotel?.country}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default EditHotelEnquiry;
