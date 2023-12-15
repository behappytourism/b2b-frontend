import React, {useState} from 'react'
import axios from "../../../../axios";
import { useDispatch, useSelector } from 'react-redux';
import BtnLoader from "../../../components/BtnLoader";
import { setQuotationStatus } from '../../../../redux/slices/quotationListSlice';


function QtnConfirmModal({setIsConfirmModal, amendmentId, allAmentMent}) {

    const [isComments, setIsComments] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [hotelIndex, setHotelIndex] = useState(0)

    const { token } = useSelector((state) => state.agents);

    const dispatch = useDispatch()


    const handleComments = (e) => {
        setIsComments(e.target.value)
    }

    const handleStayConfirm = (index)=>{
      setHotelIndex(index)
    }

    const handleComfirmSubmit = async () => {
        try {
        
            setIsLoading(true)
            const res = await axios.patch(`/b2b/quotations/amendment/confirm/${amendmentId}`, 
            {
              comments: isComments,
              selectedStay: hotelIndex
            },
            {
               headers: { Authorization:`Bearer ${token}`} 
            })
            setIsLoading(false)
            dispatch(setQuotationStatus({status:res?.data?.status, amendmentId:res?.data?.amendmentId}))
            setIsConfirmModal(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }

  return (
    <div>
      <div className='flex justify-center fixed top-0 left-0 right-0  bottom-0 z-50 backdrop-blur-sm pt-32'>
            <div className='bg-white max-w-6xl p-5  w-auto h-[500px] shadow-xl overflow-auto'>
               <div className='flex justify-end p-3'>
               <button onClick={()=>setIsConfirmModal(false)} type="button" className="text-gray-400 bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " >
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
               </div>
               <div className=' flex justify-center items-center'>
                 <h1 className='text-center max-w-md'>Note: On confirming the quotation, we will be initiating the payment process.</h1>
               </div>
               <div className='flex justify-center '>
                <div className=''>
                  <div>
                    {
                      allAmentMent?.map((ele, index)=>{
                        return (
                          <> 
                          {
                            index === 0 ? (
                              <>
                          <div className="relative overflow-x-auto ">
                          {ele?.hotelQuotation?.stays?.map((stay, index) => {
                            return (
                              <div className="mt-6">
                                  <div key={index} className='flex gap-1'>
                                      <input
                                        type="checkbox"
                                        className='h-5'
                                        name="selectedStay"
                                        id={`checkHotel-${index}`}
                                        checked={hotelIndex  === index}
                                        onChange={() => handleStayConfirm(index)}
                                      />
                                      <h2 className="cust-border mb-2 text-[12px] font-bold">
                                        Option {index + 1}
                                      </h2>
                                    </div>
                                <table className="w-full text-left ">
                                  <thead>
                                    <tr>
                                      <th className="font-bold text-[12px] border px-[10px]">
                                        Name of Hotel
                                      </th>
                                      <th className="font-bold text-[12px] border px-[10px]">
                                        Location
                                      </th>
                                      {ele?.hotelQuotation?.stays?.length > 0 &&
                                        ele?.hotelQuotation?.stays[0]?.roomOccupancyList?.map(
                                          (roomOccupancy, index) => {
                                            return (
                                              <th
                                                key={index}
                                                className="font-medium text-[15px] border px-[10px] p-1"
                                              >
                                                {
                                                  roomOccupancy?.occupancyShortName
                                                }
                                              </th>
                                            );
                                          }
                                        )}
                                    </tr>
                                  </thead>
                                  <tbody className="text-[12px]">
                                    {stay?.hotels?.map(
                                      (item, multiHotelIndex) => {
                                        return (
                                          <tr
                                            key={multiHotelIndex}
                                            className=""
                                          >
                                            <td className="border px-[10px] p-1">
                                              {item?.hotelName || "N/A"}
                                              <br />
                                              {item?.roomOccupancyName && (
                                                <>
                                                  <span className="">
                                                    * {item?.roomOccupancyName}
                                                  </span>
                                                  <br />
                                                </>
                                              )}
                                            </td>
                                            <td className="border px-[10px]">
                                              {item?.city || "N/A"}
                                            </td>
                                            {multiHotelIndex < 1 &&
                                              stay?.roomOccupancyList?.map(
                                                (roomOccupancy, index) => {
                                                  return (
                                                    <td
                                                      rowSpan={
                                                        stay?.hotels?.length > 0
                                                          ? stay?.hotels?.length
                                                          : 0
                                                      }
                                                      key={index}
                                                      className="border px-[10px]"
                                                    >
                                                      {roomOccupancy?.priceWithTransfer
                                                        ? roomOccupancy?.priceWithTransfer?.toFixed(
                                                            2
                                                          ) +
                                                          " " +
                                                          ele?.quotationCurrency
                                                        : "N/A"}
                                                    </td>
                                                  );
                                                }
                                              )}
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            );
                          })}
                        </div>
                              
                              </>
                            ) : ""
                          }
                        </>
                        )
                      })
                    }
                  </div>
               {/* <div className="pt-5">
                          <label className="label">Comments</label>
                        </div> */}
                        <div className=' pt-5'>
                          <textarea
                            name='note' 
                            className='outline-none h-32 w-full border rounded p-2 placeholder:text-gray-300 placeholder:text-sm'
                            placeholder="Write your Comments"
                            onChange={handleComments}
                          ></textarea>
                        </div>
                        <div className='flex justify-center pt-5'>
                            {
                                !isLoading ? (
                                    <button 
                                    onClick={handleComfirmSubmit}
                                    type='submit' 
                                    className='text-white bg-blue-700 rounded w-28 h-8'>Confirm</button>
                                ) : (
                                    <button 
                                    type='submit' 
                                    className='text-white bg-blue-700 rounded w-28 h-8'> <BtnLoader/> </button>
                                )
                            }
                        </div>
                </div>
               </div>
            </div>
      </div>
    </div>
  )
}

export default QtnConfirmModal
