import React, { useEffect, useState } from 'react'
import axios from "../../../axios";
import { useSelector } from 'react-redux';
import { BtnLoader, Pagination } from '../../components';
import { config } from '../../../constants';

function DepositRequest() {

    const { token } = useSelector((state) => state.agents);
    const [depositReqData, setDepositReqData] = useState([])
    const [filters, setFilters] = useState({
      limit: 10,
      skip:0,
      status:"",
      totalWalletDepositRequests:0
   })
   const [isLoading, setIsLoading] = useState(false)

    const fetchDepositReqData = async ({...filters})=>{
        try {
          setIsLoading(true)
            const searchQuery = `skip=${filters?.skip}&limit=${filters.limit}&status=${filters.status}`;
            const res = await axios.get(`/b2b/wallets/deposit-requests/all?${searchQuery}`, {
                headers: { authorization: `Bearer ${token}` },
             });
             setDepositReqData(res?.data?.walletDepositRequests)
             setFilters((prev) => {
              return {
                 ...prev,
                 totalWalletDepositRequests:
                    res?.data?.totalWalletDepositRequests || 0,
              };
           });
           setIsLoading(false)
        } catch (error) {
           setIsLoading(false)
           console.log(error);
        }
    }

    useEffect(()=>{
        fetchDepositReqData({...filters})
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
          <th className="font-[600] py-4 px-3">Date & Time</th>
          <th className="font-[600] py-4 px-3">Amount</th>
          <th className="font-[600] py-4 px-3">Company Bank</th>
          <th className="font-[600] py-4 px-3">Receipt</th>
          <th className="font-[600] py-4 px-3">Status</th>
      
        </tr>
      </thead>
      <tbody className="text-sm text-textColor">
      {
        depositReqData?.map((ele)=>{
          return (
            <tr className="border-b border-tableBorderColor">
            <td className="px-3 py-4 "># {ele?.referenceNumber}</td>
            <td className="px-3 py-4 capitalize">{convertDateAndTime(ele?.createdAt)}</td>
            <td className="px-3 py-4 capitalize">{ele?.amount.toFixed(2)} AED</td>
            <td className="px-3 py-4 capitalize">{ele?.companyBankId?.bankName}</td>
            <td className="px-3 py-4 capitalize text-blue-300">
            <a href={config.SERVER_URL + ele?.receipt} target="_blank" rel="noopener noreferrer">View</a>
            </td>
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
            total={filters?.totalWalletDepositRequests}
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

export default DepositRequest
