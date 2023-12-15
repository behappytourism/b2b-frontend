import React, { useEffect, useState } from 'react'
import axios from "../../../axios";
import { useSelector } from 'react-redux';
import { BtnLoader, Pagination } from '../../components';

function Withdrawal() {

    const { token } = useSelector((state) => state.agents);
    const [withdrawal, setWithdrawal] = useState([])
    const [filters, setFilters] = useState({
        limit: 10,
        skip:0,
        status:"",
        totalWithdrawals:0
    })
    const [isLoading, setIsLoading] = useState(false)
    
    const fetchWithdrawal = async ({...filters})=>{
        try {
            setIsLoading(true)
         const searchQuery = `skip=${filters?.skip}&limit=${filters.limit}&status=${filters.status}`;
            const res = await axios.get(`/b2b/wallets/withdrawals/all?${searchQuery}`, {
                headers: { authorization: `Bearer ${token}` },
             });
             setWithdrawal(res?.data?.withdrawals)
             
         setFilters((prev) => {
            return {
               ...prev,
               totalWithdrawals:
                  res?.data?.totalWithdrawals || 0,
            };
         });
         setIsLoading(false)

        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        fetchWithdrawal({...filters})
    }, [filters.skip, filters.limit])


    const convertDateAndTime = (date) => {
        if (date ) {
          const year = new Date(date).getFullYear();
          const month = new Date(date).getMonth()
          const day = new Date(date).getDate()
          const hours = new Date(date).getHours()
          const minutes = new Date(date).getMinutes()
          const seconds = new Date(date).getSeconds()
      
          const formattedDateAndTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
          return formattedDateAndTime;
        }
      };

  return (
    <div>
      {
        !isLoading ? (
              <>
                 <table className="w-full text-textColor">
      <thead className=" text-gray-400  border-b-2 border-gray-400 text-[14px] text-left overflow-auto">
        <tr>
          <th className="font-[600] py-4 px-3">Reference No.</th>
          <th className="font-[600] py-4 px-3">Payment Processor</th>
          <th className="font-[600] py-4 px-3">Date & Time</th>
          <th className="font-[600] py-4 px-3"> Amount</th>
          <th className="font-[600] py-4 px-3">Fee</th>
          <th className="font-[600] py-4 px-3">Status</th>
        </tr>
      </thead>
      <tbody className="text-sm text-textColor">
        {
            withdrawal?.map((ele, index)=>{
                return (
                    <tr className="border-b border-tableBorderColor" key={index}>
                        <td className="px-3 py-4 "># {ele?.b2bWalletWithdrawRefNo ? ele?.b2bWalletWithdrawRefNo : "N/A"}</td>
                        <td className="px-3 py-4 capitalize">{ele?.paymentProcessor ? ele?.paymentProcessor : "N/A"}</td>
                        <td className="px-3 py-4 capitalize">{ele?.createdAt ? convertDateAndTime(ele?.createdAt) : "N/A"}</td>
                        <td className="px-3 py-4 capitalize">{ ele?.withdrawAmount?.toFixed(2) }</td>
                        <td className="px-3 py-4 capitalize">{ ele?.fee?.toFixed(2)} AED</td>
                        <td className="px-3 py-4 flex space-x-1 items-center ">
                        { ele?.status === "completed" ? (
                            <span className="text-green-600 bg-green-100 capitalize px-2 py-[1px] shadow-mn">
                            Success
                            </span>
                        ) : ele?.status === "pending" ? (
                            <span className="text-orange-400 bg-orange-100 capitalize px-2 py-[1px] shadow-mn">
                            Pending
                            </span>
                        ) : (
                            <span className="text-red-600 bg-red-100 capitalize px-2 py-[1px] shadow-mn">
                            Failed
                            </span>
                        )}
                        </td> 
                    </tr>     
                )
            })
        }
      </tbody>
    </table>
    <div className='pt-10 p-2'>
          <Pagination
           limit={filters?.limit}
           skip={filters?.skip}
            total={filters?.totalWithdrawals}
             incOrDecSkip={(number) =>
            setFilters((prev) => {
             return {
            ...prev,
              skip: Number(prev.skip) + Number(number),
              };
             })
             }
             updateSkip={(skip) =>
           setFilters((prev) => {
         return { ...prev, skip };
       })
     }
        />

    </div>
              </>
        ) : (
          <div className='pt-10 w-full'>
            <BtnLoader/>
          </div>
        )
      }
   
    </div>
  )
}

export default Withdrawal