import React from 'react'

function TransactionHistoryTable() {
  return (
    <table className="w-full">
      <thead className="bg-gray-100 text-grayColor text-[14px] text-left">
        <tr>
          <th className="font-[500] p-3 whitespace-nowrap">Ref.No</th>
          <th className="font-[500] p-3 whitespace-nowrap">Activity</th>
          <th className="font-[500] p-3 whitespace-nowrap">Bookig Type</th>
          {/* <th className="font-[500] p-3 whitespace-nowrap"></th> */}
          <th className="font-[500] p-3 whitespace-nowrap">Date</th>
          <th className="font-[500] p-3 whitespace-nowrap">Time</th>
          <th className="font-[500] p-3 whitespace-nowrap">Price</th>
          <th className="font-[500] p-3 whitespace-nowrap">wallet</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        <tr className="border-b border-tableBorderColor">
          <td className="p-3">#63b2cc</td>
          <td className="p-3">
            <div className='w-[150px] md:w-auto'>
              Air Fly
            </div>
          </td>
          <td className="p-3">Ticket</td>
          <td className="p-3 whitespace-nowrap">2022-10-10</td>
          <td className="p-3">11:00</td>
          <td className="p-3">50 AED</td>
          <td className="p-3">153 AED</td>
        </tr>
      </tbody>
    </table>
  )
}

export default TransactionHistoryTable