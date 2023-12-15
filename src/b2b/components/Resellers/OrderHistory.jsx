import React from 'react'

function OrderHistory() {
  return (
    <table className="w-full">
      <thead className="bg-gray-100 text-grayColor text-[14px] text-left">
        <tr>
          <th className="font-[500] p-3 whitespace-nowrap">Ref.No</th>
          <th className="font-[500] p-3 whitespace-nowrap">Activity</th>
          <th className="font-[500] p-3 whitespace-nowrap">Bookig Type</th>
          <th className="font-[500] p-3 whitespace-nowrap">Date</th>
          <th className="font-[500] p-3 whitespace-nowrap">Adults</th>
          <th className="font-[500] p-3 whitespace-nowrap">Children</th>
          <th className="font-[500] p-3 whitespace-nowrap">Infant</th>
          <th className="font-[500] p-3 whitespace-nowrap">Price</th>
          <th className="font-[500] p-3 whitespace-nowrap">Status</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        <tr className="border-b border-tableBorderColor">
          <td className="p-3">#63b2cc</td>
          <td className="p-3">
            <div className='w-[150px] md:w-auto'>
            Pearl Heli Tour (12 Mins. Ride)
            </div>
          </td>
          <td className="p-3">Ticket</td>
          <td className="p-3 whitespace-nowrap">January 3, 2023</td>
          <td className="p-3 ">1</td>
          <td className="p-3">0</td>
          <td className="p-3">0</td>
          <td className="p-3">153 AED</td>
          <td className="p-3">Confirmed</td>
        </tr>
      </tbody>
    </table>
  )
}

export default OrderHistory