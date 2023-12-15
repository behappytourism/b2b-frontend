import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addExcursionSuppliments, handleEditSupplimentsTranfers, removeExcSupplimentsIds } from '../../../../redux/slices/quotationSlice'
import SupplimentsTransferType from './SupplimentsTransferType'
import { previewImage } from "../../../../static/imagesB2B";
import { config } from '../../../../constants';
import SuppTransferModal from './SuppTransferModal';

function SupplementsModal({data, select, set}) {


    const { setModal } = data
    const dispatch = useDispatch()
    const {selectedExcursionSuppliments, selectedExcursionTypeSuppliments, excSupplimentFiltered, selectedExcSupplimentsIds } = useSelector((state)=> state.quotation)
    const handleRemove = (item) => {
        const removedData = selectedExcSupplimentsIds.filter((ele) => ele !== item);
        set(removedData)
        dispatch(addExcursionSuppliments(removedData))
        dispatch(handleEditSupplimentsTranfers(item))
    };

    const selectedExcursionsSuppliment = selectedExcSupplimentsIds.filter((exc)=>exc.isSelected)

  return (
    <div className=''>
        <div>
        <div id="defaultModal"  aria-hidden="true" className="fixed hidden  md:flex justify-center items-center backdrop-blur-sm top-0 md:bottom-0 md:top-0 md:left-0 md:right-0 z-50 w-full md:p-4 md:overflow-x-hidden overflow-y-auto">
            <div className="relative shadow-lg max-w-1xl max-h-full lg:w-[1000px] w-full  ">
            
                <div className="lg:relative bg-white lg:rounded-lg shadow-lg dark:bg-white p-5 h-[850px] md:h-auto  transition-all duration-300">
                
                    <div className="flex items-start justify-between p-4  rounded-t">
                        <button onClick={()=>setModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-300 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-300 dark:hover:text-white" data-modal-hide="defaultModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>

                    <div className='pb-5'>
                    <h1 className='text-center text-lg font-bold'>Selected Attractions</h1>
                    {/* <h2 className='text-center text-xs text-textColor'>Just about the right travel time.</h2> */}
                    </div>

                    <div className='grid  md:grid-cols-5 gap-0 md:border-t-2'>
                    {selectedExcSupplimentsIds?.map((ele, index)=>{
                        return (
                            <>
                            {/* <div className=''> */}

                           <div className='md:p-2 md:ml-10'>
                           <img
                                src={ele?.image?.length > 0
                                    ? config.SERVER_URL + ele?.image[0]
                                    : previewImage}
                                alt="img"
                                className="w-16 h-16 rounded-full"
                                />
                           </div>
                           <div>
                           <h3 className="text-xs md:text-sm md:pt-5 font-medium text-[#495057] md:max-w-[300px] text-center">
                                    {ele.attraction} 
                                    </h3>
                           </div>
                           <div className='md:w-60'> 
                            < SuppTransferModal data={ele?._id} tp={ele} index={index} />
                            </div>
                           <div className='md:pt-3 max-w-[100px] md:ml-10'>
                           {
                                    ele?.selectedExcursionType !== "TicketWithTransfer" ? (

                                        <h2  className='bg-green-100 p-2 text-gray-300 text-[10px] max-w-sm hidden md:block'>Transfer : <span className='text-green-500 '>  {ele?.selectedExcursionType}</span>  </h2>
                                    ) : ""
                                }
                                </div>

                                <div className='p-3 text-center'>
                                <button 
                                    type="button"
                                     className="text-white p-1 text-xs rounded bg-red-500 "
                                     onClick={()=> {
                                        handleRemove(ele)
                                        dispatch(removeExcSupplimentsIds(ele))
                                     }
                                    }
                                     
                                     >
                                        Delete
                                    </button>
                                </div>
                            {/* </div> */}

                            </>
                        )
                    })} 
                    </div>
                    <div className='flex justify-end pt-4'>
                        <button  onClick={()=>setModal(false)} className='bg-blue-400 text-white rounded text-xs p-1 w-14 mr-3'>Done</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div
      className={`fixed bottom-0 right-0 top-0  z-30 bg-light h-full overflow-y-auto md:w-[780px] md:h-[750px] w-full  transition-all duration-500 md:hidden`}
    >
      <div className="p-7 space-y-5">
        <div className=" flex justify-between items-center border-b border-dashed pb-3">
          <div className="">
            <h2 className="text-xl text-gray-400 font-bold">Selected Attractions</h2>
          </div>
          <div className="flex items-start justify-between p-4  rounded-t">
                        <button onClick={()=>setModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-300 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-300 dark:hover:text-white" data-modal-hide="defaultModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                    </div>
        </div>
        <div className='grid  md:grid-cols-5 '>
                    {selectedExcSupplimentsIds?.map((ele, index)=>{
                        return (
                            <>
                            <div className='flex'>

                           <div className='md:p-2 md:ml-10'>
                           <img
                                src={ele?.image?.length > 0
                                    ? config.SERVER_URL + ele?.image[0]
                                    : previewImage}
                                alt="img"
                                className="w-16 h-16 rounded-full"
                                />
                           </div>
                           <div>
                           <h3 className="text-xs md:text-sm md:pt-5 font-medium text-[#495057] md:max-w-[300px] text-center">
                                    {ele.attraction} 
                                    </h3>
                           </div>
                           <div className='md:w-60'> 
                            < SupplimentsTransferType data={ele?._id} tp={ele} index={index} />
                            </div>
                           <div className='md:pt-3 max-w-[100px] md:ml-10'>
                           {
                                    ele?.selectedExcursionType !== "TicketWithTransfer" ? (

                                        <h2  className='bg-green-100 p-2 text-gray-300 text-[10px] max-w-sm hidden md:block'>Transfer : <span className='text-green-500 '>  {ele?.selectedExcursionType}</span>  </h2>
                                    ) : ""
                                }
                                </div>

                                <div className='p-3 text-center'>
                                <button 
                                    type="button"
                                     className="text-white p-1 text-xs rounded bg-red-500 "
                                     onClick={()=> {
                                        handleRemove(ele)
                                        dispatch(removeExcSupplimentsIds(ele))
                                     }
                                    }
                                     
                                     >
                                        Delete
                                    </button>
                                </div>
                            </div>

                            </>
                        )
                    })} 
                    </div>
                </div>
                <div className='flex justify-end pt-4'>
                    <button  onClick={()=>setModal(false)} className='bg-blue-400 text-white rounded text-xs p-1 w-14 mr-8 mb-5'>Done</button>
                </div>
                </div>
    </div>
  )
}

export default SupplementsModal
