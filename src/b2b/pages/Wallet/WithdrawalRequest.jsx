import React, { useEffect, useState } from 'react'
import axios from "../../../axios";
import { useSelector } from 'react-redux';
import { BtnLoader, Pagination } from '../../components';

function WithdrawalRequest() {


    const { token } = useSelector((state) => state.agents);
    const [withdrawalReq, setWithdrawalReq] = useState([])
    const [filters, setFilters] = useState({
        limit: 10,
        skip:0,
        status:"",
        totalWithdrawRequests:0
    })
    const [isLoading, setIsloading] = useState(false)
    
    const fetchWithdrawalReq = async ({...filters})=>{
        try {
            setIsloading(true)
            const searchQuery = `skip=${filters?.skip}&limit=${filters.limit}&status=${filters.status}`;
            const res = await axios.get(`/b2b/wallets/withdraw-requests/all?${searchQuery}`, {
                headers: { authorization: `Bearer ${token}` },
             });
             setWithdrawalReq(res?.data?.walletWithdrawRequests)
             setFilters((prev) => {
                return {
                   ...prev,
                   totalWithdrawRequests:
                      res?.data?.totalWithdrawRequests || 0,
                };
             });
             setIsloading(false)
        } catch (error) {
             setIsloading(false)
             console.log(error);
        }
    }

    useEffect(()=>{
        fetchWithdrawalReq({...filters})
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
          <th className="font-[600] py-4 px-3">Reference No</th>
          <th className="font-[600] py-4 px-3">Amount</th>
          <th className="font-[600] py-4 px-3">Date & Time</th>
          <th className="font-[600] py-4 px-3">Country</th>
          <th className="font-[600] py-4 px-3">Bank Name</th>
          <th className="font-[600] py-4 px-3">Branch Name</th>
          <th className="font-[600] py-4 px-3">Holder Name</th>
          <th className="font-[600] py-4 px-3">Bank Account Number</th>
          <th className="font-[600] py-4 px-3">IFSC Code</th>
          <th className="font-[600] py-4 px-3">Status</th>
        </tr>
      </thead>
      <tbody className="text-sm text-textColor">
      {
        withdrawalReq?.map((ele, index)=>{
            return (
          <tr className="border-b border-tableBorderColor" key={index}>
            <td className="px-3 py-4 "># {ele?.b2bWalletWithdrawRequestRefNo}</td>
            <td className="px-3 py-4 capitalize">{ele?.amount?.toFixed(2)}</td>
            <td className="px-3 py-4 capitalize">{convertDateAndTime(ele?.createAt)}</td>
            <td className="px-3 py-4 capitalize">{ele?.b2bBankDetails?.isoCode}</td>
            <td className="px-3 py-4 capitalize">{ele?.b2bBankDetails?.bankName}</td>
            <td className="px-3 py-4 capitalize">{ele?.b2bBankDetails?.branchName}</td>
            <td className="px-3 py-4 capitalize">{ele?.b2bBankDetails?.accountHolderName}</td>
            <td className="px-3 py-4 capitalize">{ele?.b2bBankDetails?.accountNumber}</td>
            <td className="px-3 py-4 capitalize">{ele?.b2bBankDetails?.ifscCode}</td>
            <td className="px-3 py-4 flex space-x-1 items-center ">
              { ele?.status === "complete" ? (
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
            total={filters?.totalWithdrawRequests}
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

export default WithdrawalRequest
