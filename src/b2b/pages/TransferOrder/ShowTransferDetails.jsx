import React from 'react'
import { BiTransfer } from "react-icons/bi";
import { IoMdArrowRoundForward } from "react-icons/io";
import axios from '../../../axios'
import { useSelector } from 'react-redux';
import { LuDownload } from "react-icons/lu";


function ShowTransferDetails({ele}) {

    

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase  dark:text-gray-400">
            <tr className='border-b '>
                <th scope="col" className="px-6 py-3">
                    Activity
                </th>
                <th scope="col" className="px-6 py-3">
                   Pickup Date / Time
                </th>
                {
                    ele?.trips?.map((item, index)=> (
                        <>
                        {
                            index === 1 && (
                                <div>
                                    <th scope="col" className="px-6 py-3">
                                    Return Pickup Date / Time
                                    </th>
                                </div>
                            )
                        }
                        </>
                    ))
                }
                <th scope="col" className="px-6 py-3">
                    Pax
                </th>
                <th scope="col" className="px-6 py-3">
                    Transfer Type
                </th>
                <th scope="col" className="px-6 py-3">
                   Total Amount
                </th>
                <th scope="col" className="px-6 py-3">
                     Vehicle
                </th>
                {/* <th scope="col" className="px-6 py-3">
                   Invoice
                </th> */}
            </tr>
        </thead>
        <tbody className=''>
            <tr className="bg-white   dark:border-gray-700">
                <th  className="px-6 py-4 font-medium text-gray-900 ">
                    {
                        ele?.trips?.map((item, index)=>(
                            <>
                            {
                                index === 0 && (
                                   <div className='flex gap-2 '>
                                        <h1 className='text-xs'>{item?.transferFrom?.airportName || item?.transferFrom?.areaName}</h1>
                                        {
                                            ele?.transferType === 'return' ? (
                                                <h1 className='text-lg'><BiTransfer/></h1>
                                            ) : (
                                                <h1><IoMdArrowRoundForward/></h1>
                                            )
                                        }
                                        <h1 className='text-xs'>{item?.transferTo?.airportName || item?.transferTo?.areaName}</h1>
                                   </div>
                                )
                            }
                            </>
                        ))
                    }
                </th>
                <td className="px-6 py-4">
                  {
                    ele?.trips?.map((item, index)=>(
                        <>
                        {
                            index === 0 && (
                                <div className=''>
                                    <h1 className='text-xs'>Date : {item?.pickupDate?.slice(0, 10)}</h1>
                                    <h1 className='text-xs'>Time : {item?.pickupTime}</h1>
                                </div>
                            )
                        }
                        </>
                    ))
                  }
                </td>
                {
                    ele?.trips[1] && (
                        <td className="px-6 py-4">
                        {
                            ele?.trips?.map((item, index)=>(
                                <>
                                {
                                    index === 1 && (
                                        <div className=''>
                                            <h1 className='text-xs'>Date : {item?.pickupDate?.slice(0, 10)}</h1>
                                            <h1 className='text-xs'>Time : {item?.pickupTime}</h1>
                                        </div>
                                    )
                                }
                                </>
                            ))
                        }
                        </td>
                    )
                }
                <td className="px-6 py-4 text-xs">
                    ADT {ele?.noOfAdults ? ele?.noOfAdults : 0}, CHD {ele?.noOfChildrens ? ele?.noOfChildrens : 0}
                </td>
                <td className="px-6 py-4">
                   {ele?.transferType}
                </td>
                 <td className="px-6 py-4 text-xs">
                   {ele?.netPrice}
                </td>

                <td className="px-6 py-4 ">
                   {
                    ele?.trips?.map((item)=>{
                        return (
                            <div className='flex  gap-3'>
                                {
                                    item?.vehicleTypes?.map((vehicle)=>{
                                        return (
                                            <div className='flex gap-2 '>
                                                <h1 className='text-xs  p-2 '>Name : {vehicle?.name} Count: {vehicle?.count} , </h1>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                   }
                </td>
                {/* <td className="px-6 py-4">
                    <h1 className='cursor-pointer text-xl'
                    onClick={()=>{
                        handleDownloadTickets(ele?.activity?._id)
                    }}
                    ><LuDownload /></h1>
                </td> */}
            </tr>
        </tbody>
    </table>
</div>
  )
}

export default ShowTransferDetails
