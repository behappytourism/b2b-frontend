import React from 'react'
import { ImLocation2 } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

function QuotationListTable({data}) {
  const navigate = useNavigate()
  const handleSendNumber = (quotationNumber) =>{
    navigate("/quotation/view", {state: quotationNumber})
  }

  return (
   
    <div className=" ">
        <div className='p-5 '>
        <table className="">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
               <tr>
                    <th scope="col" className="px-6 py-3 border-b border-t">
                    Quotation Number
                    </th>
                    <th scope="col" className="px-6 py-3   border-b border-t">
                    Creation Date
                    </th>
                    <th scope="col" className="px-6 py-3   border-b border-t">
                    Amendments 
                    </th>
                    <th scope="col" className="px-6 py-3   border-b border-t">
                    Status
                    </th>
            </tr>
        </thead>
        <tbody>
            {
                data?.amentMents?.quotations?.map((ele)=>{
                    return (
                        <tr className="border-b border-gray-200 cursor-pointer" 
                        onClick={()=>handleSendNumber(ele?.quotationNumber)} 
                        >
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        {ele?.quotationNumber}
                        </th>
                        <td className="px-6 py-4 ">
                        {ele?.createdAt.slice(0, 10)}
                        </td>
                        <td className="px-6 py-4 ">
                        {ele?.totalAmendments}
                        </td>
                        {
                            ele?.amendment === ele?.confirmedAmendment ? (
                        <td className="px-6 py-4 text-green-500">
                        {ele?.status}
                        </td>
                            ) : (
                                <td className="px-6 py-4 text-red-500">
                                    not confimed
                                </td>
                            )
                        }
                    </tr>
                    )
                })
            }
          
           
        </tbody>
    </table>
        </div>
       
</div>

  )
}

export default QuotationListTable
