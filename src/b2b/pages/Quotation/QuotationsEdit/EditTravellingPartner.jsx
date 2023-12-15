import React, {useState} from 'react'
import { solo, couple, friends, family } from "../../../../static/imagesB2B";
import { useDispatch, useSelector } from "react-redux";
import {
    pushValueToChildrenAges,
    setChildrenAges,
    setPaxType,
    setTravellerDetails,
  } from "../../../../redux/slices/quotationSlice";



function EditTravellingPartner({setQuotationEdit}) {

    const dispatch = useDispatch();
    const [isTravellerDropdownOpen, setIsTravellerDropdownOpen] = useState(false);
  
    const { noOfAdults, noOfChildren, childrenAges, paxType } = useSelector(
      (state) => state.quotation
    );


  return (
    <div className="max-w-screen-sm mx-auto">
    <div classsName="">
      <div className="pb-5">
        <h3 className="text-md tracking-wide text-center text-stone-600 font-bold">
        How many people are travelling?
        </h3>
      </div>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2  gap-3 items-center">
        <div
          onClick={() => {
            dispatch(
              setTravellerDetails({
                noOfAdults: 1,
                noOfChildren: 0,
              })
            );
            dispatch(setPaxType("solo"));
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
              suplimetsOptionPageEdit: false,
              excursionSupplimetListEdit: false,
              visaQuotationsEdit: false,
              createQuotationEdit: false,
            });
          }}
          className={`${paxType === 'solo' ? ' bg-green-100 hover:-translate-y-1 cursor-pointer transition-all duration-300 rounded-md border-2  border-green-500 border-opacity-20 shadow-round w-full py-8  flex flex-col items-center' : "bg-white hover:-translate-y-1 cursor-pointer transition-all duration-300 rounded-md border-[1px] border-gray-100 border-opacity-20 shadow-round w-full py-8  flex flex-col items-center"}`}
        >
          <div className="rounded-full w-[100px] h-[100px] overflow-hidden shadow-mn">
            <img
              src={solo}
              alt="solo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pt-7">
            <p className="text-sm font-[500] text-gray-400">Solo</p>
          </div>
        </div>

        <div
          onClick={() => {
            dispatch(
              setTravellerDetails({
                noOfAdults: 2,
                noOfChildren: 0,
              })
            );
            dispatch(setPaxType("couple"));
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
              suplimetsOptionPageEdit: false,
              excursionSupplimetListEdit: false,
              visaQuotationsEdit: false,
              createQuotationEdit: false,
            });
          }}
          className={`${paxType === 'couple' ? ' bg-green-100 hover:-translate-y-1 cursor-pointer transition-all duration-300 rounded-md border-2  border-green-500 border-opacity-20 shadow-round w-full py-8  flex flex-col items-center' : "bg-white hover:-translate-y-1 cursor-pointer transition-all duration-300 rounded-md border-[1px] border-gray-100 border-opacity-20 shadow-round w-full py-8  flex flex-col items-center"}`}
        >
          <div className="rounded-full w-[100px] h-[100px]  shadow-mn">
            <img
              src={couple}
              alt="couple"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pt-7">
            <p className="text-sm font-[500] text-gray-400">Couple</p>
          </div>
        </div>

        <div
          onClick={() => {
            dispatch(setPaxType("family"));
            setIsTravellerDropdownOpen(true);
          }}
          className={`${paxType === 'family' ? ' bg-green-100 hover:-translate-y-1 cursor-pointer transition-all duration-300 rounded-md border-2  border-green-500 border-opacity-20 shadow-round w-full py-8  flex flex-col items-center' : "bg-white hover:-translate-y-1 cursor-pointer transition-all duration-300 rounded-md border-[1px] border-gray-100 border-opacity-20 shadow-round w-full py-8  flex flex-col items-center"}`}
        >
          <div className="rounded-full w-[100px] h-[100px] overflow-hidden shadow-mn">
            <img
              src={family}
              alt="family"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pt-7">
            <p className="text-sm font-[500] text-gray-400">Family</p>
          </div>
        </div>

        <div
          onClick={() => {
            dispatch(setPaxType("friends"));
            setIsTravellerDropdownOpen(true);
          }}
          className={`${paxType === 'friends' ? ' bg-green-100 hover:-translate-y-1 cursor-pointer transition-all duration-300 rounded-md border-2  border-green-500 border-opacity-20 shadow-round w-full py-8  flex flex-col items-center' : "bg-white hover:-translate-y-1 cursor-pointer transition-all duration-300 rounded-md border-[1px] border-gray-100 border-opacity-20 shadow-round w-full py-8  flex flex-col items-center"}`}
        >
          <div className="rounded-full w-[100px] h-[100px] overflow-hidden shadow-mn">
            <img
              src={friends}
              alt="friends"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pt-7">
            <p className="text-sm font-[500] text-gray-400">Friends</p>
          </div>
        </div>
      </div>

      {/* // Dropdown */}
      <div
        className={`${
          isTravellerDropdownOpen ? " scale-100 " : " scale-0 "
        }  duration-500 transition-all bg-white shadow-round rounded p-5 mt-5`}
      >
        <div className="flex justify-center items-center">
          <div className=" flex justify-center gap-10 mb-2">
            <div className="">
              <p className="text-sm text-center text-stone-500 pb-2">Adult</p>
              <div className="flex gap-2 items-center">
                <p
                  onClick={() => {
                    noOfAdults <= 1
                      ? dispatch(
                          setTravellerDetails({
                            noOfAdults: 1,
                            noOfChildren: noOfChildren,
                          })
                        )
                      : dispatch(
                          setTravellerDetails({
                            noOfAdults: noOfAdults - 1,
                            noOfChildren: noOfChildren,
                          })
                        );
                  }}
                  className="h-5 w-5 cursor-pointer flex justify-center items-center bg-blue-500 text-white rounded-full overflow-hidden shadow-mn"
                >
                  -
                </p>
                <input
                  value={noOfAdults}
                  type="number"
                  className="no-spinner text-center outline-none text-stone-500 w-8"
                />
                <p
                  onClick={() => {
                    dispatch(
                      setTravellerDetails({
                        noOfAdults: noOfAdults + 1,
                        noOfChildren: noOfChildren,
                      })
                    );
                  }}
                  className="h-5 w-5 cursor-pointer flex justify-center items-center bg-blue-500 text-white rounded-full overflow-hidden shadow-mn"
                >
                  +
                </p>
              </div>
            </div>
            <div className="">
              <p className="text-sm text-center text-stone-500 pb-2">
                Children
              </p>
              <div className="flex gap-2 items-center">
                <p
                  onClick={() => {
                    noOfChildren < 1
                      ? dispatch(
                          setTravellerDetails({
                            noOfAdults: noOfAdults,
                            noOfChildren: 0,
                          })
                        )
                      : dispatch(
                          setTravellerDetails({
                            noOfAdults: noOfAdults,
                            noOfChildren: noOfChildren - 1,
                          })
                        );
                  }}
                  className="h-5 w-5 cursor-pointer flex justify-center items-center bg-blue-500 text-white rounded-full overflow-hidden shadow-mn"
                >
                  -
                </p>
                <input
                  value={noOfChildren}
                  type="number"
                  className="no-spinner text-center outline-none text-stone-500 w-8"
                />
                <p
                  onClick={() => {
                    dispatch(
                      setTravellerDetails({
                        noOfAdults: noOfAdults,
                        noOfChildren: noOfChildren + 1,
                      })
                    );
                    dispatch(pushValueToChildrenAges());
                  }}
                  className="h-5 w-5 cursor-pointer flex justify-center items-center bg-blue-500 text-white rounded-full overflow-hidden shadow-mn"
                >
                  +
                </p>
              </div>
            </div>
          </div>
        </div>
        <>
          <div className=" mt-2 flex justify-between mb-14 md:mb-0">
            {noOfChildren > 0 ? (
              <div className="">
                <p className="text-sm text-stone-500 pb-2 text-left">
                  Children ages
                </p>
                <div className="flex justify-center gap-3 flex-wrap">
                  {childrenAges.map((item, index) => (
                    <select
                      onChange={(e) => {
                        dispatch(
                          setChildrenAges({ index, value: e.target.value })
                        );
                      }}
                      value={childrenAges[index]}
                      defaultValue={4}
                      className="no-spinner text-center outline-none border rounded border-gray-200 opacity-70 text-sm h-8 text-stone-500 w-10"
                    >
                      <option value={0}>{"<1"}</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10</option>
                      <option value={11}>11</option>
                      <option value={12}>12</option>
                    </select>
                  ))}
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <div className="flex items-end">
              <button
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
                    suplimetsOptionPageEdit: false,
                    excursionSupplimetListEdit: false,
                    visaQuotationsEdit: false,
                    createQuotationEdit: false,
                  });
                }}
                className="text-xs font-semibold text-white bg-gradient-to-l from-blue-400 to-red-600 hover:from-red-600 hover:to-blue-400  px-4 h-8 rounded-sm shadow-mn"
              >
                Next
              </button>
            </div>
          </div>
        </>
      </div>
    </div>
  </div>
  )
}

export default EditTravellingPartner
