import React, {useState} from 'react'
import { config } from '../../../constants'
import { LuDownload } from "react-icons/lu";

function ShowAttractionDetails({ele}) {

  return (
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase  dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Activity
                </th>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Pax
                </th>
                <th scope="col" className="px-6 py-3">
                    Transfer
                </th>
                <th scope="col" className="px-6 py-3">
                    Amount
                </th>
                <th scope="col" className="px-6 py-3">
                   Status
                </th>
                <th scope="col" className="px-6 py-3">
                   Ticket
                </th>
            </tr>
        </thead>
        <tbody className=''>
            <tr className="bg-white   dark:border-gray-700">
                <th  className="px-6 py-4 font-medium text-gray-900 ">
                    <div className='flex gap-2'>
                        <div className='w-20 h-12'>
                           <img className='w-full h-full object-cover' src={config.SERVER_URL + ele?.activity?.attraction?.images[0]} alt="" />
                        </div>
                        <div className='w-52 max-w-xs'>
                            <h1 className='text-sm max-w-sm'>{ele?.activity?.name}</h1>
                        </div>
                    </div>
                </th>
                <td className="px-6 py-4">
                   {ele?.date?.slice(0, 10)}
                </td>
                <td className="px-6 py-4">
                    ADT {ele?.adultsCount ? ele?.adultsCount : 0}, CHD {ele?.childrenCount ? ele?.childrenCount : 0}, INF {ele?.infantCount ? ele?.infantCount : 0}
                </td>
                <td className="px-6 py-4">
                    {ele?.transferType} Transfer
                </td>
                <td className="px-6 py-4">
                   {ele?.grandTotal}
                </td>
                <td className="px-6 py-4">
                    <h1 className='bg-orange-200 w-20 text-center p-1 text-xs text-orange-500 rounded'>
                       {ele?.status}
                    </h1>
                </td>
                <td className="px-6 py-4">
                    <h1 className='cursor-pointer text-xl'><LuDownload /></h1>
                </td>
            </tr>
        </tbody>
    </table>
</div>

  )
}

export default ShowAttractionDetails
