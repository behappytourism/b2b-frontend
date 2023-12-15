import React from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

function MarkupsTable() {
  return (
  
      <table className="w-full">
        <thead className="bg-gray-100 text-grayColor text-[14px] text-left">
          <tr>
            <th className="font-[500] p-3 whitespace-nowrap">Attraction Id</th>
            <th className="font-[500] p-3 whitespace-nowrap">Attraction</th>
            <th className="font-[500] p-3 whitespace-nowrap">Previous Price</th>
            <th className="font-[500] p-3 whitespace-nowrap">Flat</th>
            <th className="font-[500] p-3 whitespace-nowrap">Percentage</th>
            <th className="font-[500] p-3 whitespace-nowrap">Current Price</th>
            <th className="font-[500] p-3 whitespace-nowrap">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          <tr className="border-b border-tableBorderColor">
            <td className="p-3">#63b2cc</td>
            <td className="p-3">
              <div className='w-[150px] md:w-auto'>
              SKy Fly
              </div>
            </td>
            <td className="p-3">120</td>
            <td className="p-3 ">50</td>
            <td className="p-3">N/A</td>
            <td className="p-3">170</td>
            <td className="p-3 flex space-x-1">
              <span className='text-xl text-lightblue'><AiFillEdit /> </span>
              <span className='text-xl text-main'><AiFillDelete /> </span>
            </td>
          </tr>
        </tbody>
      </table>
  )
}

export default MarkupsTable