import React from 'react'
import { useNavigate } from 'react-router-dom';

function OrderListTable({item, index}) {

    const navigate = useNavigate()

  return (
   <>
   <tr key={index} className='relative overflow-hidden border-b border-tableBorderColor cursor-pointer' 
   onClick={()=> {
        navigate(`/order/details/${item?._id}`)
   }}
   >
      <td className='p-3'>
        <div>
            <p>{item?.agentReferenceNumber}</p>
        </div>
      </td>
      <td className='p-3'>
        {item?.createdAt?.slice(0, 10)}
      </td>
      <td className='p-3'>
        {item?.netPrice}
      </td>
      <td>
        {item?.paymentState}
      </td>
      <td className="">
          {item?.orderStatus === "confirmed" ? (
            <div className="bg-green-400 text-xs text-light px-4 rounded-sm shadow-mn h-6 flex justify-center items-center capitalize">
              {item?.orderStatus}
            </div>
          ) : item?.orderStatus === "pending" ? (
            <div className="bg-orange-400 text-xs text-light px-4 rounded-sm shadow-mn h-6 flex justify-center items-center capitalize">
              {item?.orderStatus}
            </div>
          ) : item?.orderStatus === "booked" ? (
            <div className="bg-lightblue text-xs text-light px-4 rounded-sm shadow-mn h-6 flex justify-center items-center capitalize">
              {item?.orderStatus}
            </div>
          ) : (
            <div className="bg-red-400 text-xs text-light px-4 rounded-sm shadow-mn h-6 flex justify-center items-center capitalize">
              {item?.orderStatus}
            </div>
          )}
        </td>
   </tr>
   </>
  )
}

export default OrderListTable
