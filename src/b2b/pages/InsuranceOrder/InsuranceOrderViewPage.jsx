import React, { useEffect, useState } from 'react'
import OrdersNavigator from '../OrdersNavigator'
import { useParams } from 'react-router-dom'
import axios from "../../../axios"
import { useSelector } from 'react-redux'


function InsuranceOrderViewPage() {

    const params = useParams()
    const {token} = useSelector((state)=> state.agents)

    const [orderData, setOrderData] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const fetchOrderContract = async () => {
        try{
            setIsLoading(true)
            const res = await axios.get(`/b2b/insurance/contracts/single/${params.id}`, { headers: {Authorization: `Bearer ${token}`}})
            setOrderData(res.data)
           setIsLoading(false)
        }catch(err){
            setIsLoading(false)
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchOrderContract()
    }, [])

  return (
    <div>
        {/* <OrdersNavigator /> */}
        <div className='max-w-screen-xl mx-auto' >
      <div className="px-5 py-10">
        <div className="">
          <div>
            <div className="p-4 grid grid-cols-2 gap-[20px]">
              <div>
                <div className="flex items-center gap-[8px] mb-3">
                  <span>
                    {/* <GrNotes /> */}
                  </span>
                  <span className="font-[600] text-[15px] uppercase">Insurance Details</span>
                </div>
          
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Destination
                  </span>
                  <span className="block text-[15px] capitalize">
                    {
                      orderData?.destination
                    }
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                   Residence
                  </span>
                  <span className="block text-[15px]">
                    {orderData?.residence}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                   Plan
                  </span>
                  <span className="block text-[15px] capitalize">
                    {orderData?.planName}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Type
                  </span>
                  <span className="block text-[15px]">
                {
                    orderData?.travelType === "SG" ? "Single" : orderData?.travelType === "FM" ? "Family" : ""
                }
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                   From date
                  </span>
                  <span className="block text-[15px]">
                   {orderData?.travelFrom}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                   To date
                  </span>
                  <span className="block text-[15px]">
                  {
                    orderData?.travelTo
                  }
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-[8px] mb-3">
                  <span>
                    {/* <BsFillFileEarmarkPersonFill /> */}
                  </span>
                  <span className="font-[600] text-[15px] uppercase">
                    Enquiry Details
                  </span>
                </div>
                <div className="">
                  <span className="block text-[12px] text-grayColor">
                    Reference Number
                  </span>
                  <span className="block text-[15px]">
                  {orderData?.referenceNumber}
                  </span>
                </div>
                <div className="">
                  <span className="block text-[12px] text-grayColor">
                    Email
                  </span>
                  <span className="block text-[15px]">
                    {orderData?.email}
                  </span>
                </div>
              
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Reseller Phone Number
                  </span>
                  <span className="block text-[15px]">
                    {orderData?.phoneNumber}
                  </span>
                </div>
              
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Total Amount
                  </span>
                  <span className="text-[15px] flex items-center gap-[10px]">
                    {orderData?.totalAmount}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Status
                  </span>
                  <span className="text-[15px] flex items-center gap-[10px] capitalize">
                    {orderData?.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="overflow-x-auto shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)]">
              <table className="w-full">
                <thead className=" text-gray-400 border-b-2 border-gray-400 text-[14px] text-left">
                  <tr>
                    <th className="font-[500] px-3 py-4">No.</th>
           
                    <th className="font-[500] px-3 py-4">First Name</th>
                    <th className="font-[500] px-3 py-4">Last Name</th>
                    <th className="font-[500] px-3 py-4">Gender</th>
                    <th className="font-[500] px-3 py-4">Passport Number</th>
                    <th className="font-[500] px-3 py-4">Phone Number</th>
                    <th className="font-[500] px-3 py-4">Notes</th>
                    <th className="font-[500] px-3 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {
                    orderData?.beneficiaryData?.map((item, index)=>(
                  <tr className='border-b border-tableBorderColor'>
                       <td className="px-3 py-5">{index + 1}</td>
                       <td className="px-3 py-5">{item?.firstName}</td>
                       <td className="px-3 py-5">{item?.lastName}</td>
                       <td className="px-3 py-5">{item?.gender}</td>
                       <td className="px-3 py-5">{item?.passportNumber}</td>
                       <td className="px-3 py-5">{orderData?.phoneNumber}</td> 
                       <td className="px-3 py-5">{orderData?.note}</td>
                  </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default InsuranceOrderViewPage
