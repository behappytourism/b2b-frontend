import React, { useEffect, useState } from 'react'
import { BsFillFileEarmarkPersonFill } from 'react-icons/bs'
import { GrNotes } from 'react-icons/gr'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from '../../../axios'
import VisaOrderDetailSingleRow from './VisaOrderDetailSingleRow'
import priceConversion from '../../../utils/PriceConversion'

function VisaOrderDetailsPage() {
  const { id } = useParams()

  const [isLoading, setIsLoading] = useState(false)
  const [visaOrderDetail, setVisaOrderDetail] = useState({})

  const { token } = useSelector(state => state.agents)
  const { selectedCurrency } = useSelector(state => state.home)

  const fetchSingleVisaOrder = async () => {
    try {
      setIsLoading(true);
      if (token) {
        const response = await axios.get(`/b2b/visa/application/list/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setIsLoading(false);
        setVisaOrderDetail(response.data || []);
      }
    } catch (err) {
      console.log(err);
      throw Error("Cant find Order Detail");
    }
  };
  
  useEffect(() => {
    fetchSingleVisaOrder()
  },[])

  return (
    <div className='max-w-screen-xl mx-auto' >
      <div className="px-5 py-10">
        <div className="">
          <div>
            <div className="p-4 grid grid-cols-2 gap-[20px]">
              <div>
                <div className="flex items-center gap-[8px] mb-3">
                  <span>
                    <GrNotes />
                  </span>
                  <span className="font-[600] text-[15px] ">Visa Details</span>
                </div>
                <div className="">
                  <span className="block text-[12px] text-grayColor">
                    Visa Name
                  </span>
                  <span className="block text-[15px]">
                    {visaOrderDetail?.visaType?.visaName}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Visa Country
                  </span>
                  <span className="block text-[15px] capitalize">
                    {
                      visaOrderDetail?.visaType?.visa?.country
                        ?.countryName
                    }
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Visa Age Limit
                  </span>
                  <span className="block text-[15px]">
                    {visaOrderDetail?.visaType?.ageFrom +
                      " - " +
                      visaOrderDetail?.visaType?.ageTo}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Entry Type
                  </span>
                  <span className="block text-[15px] capitalize">
                    {visaOrderDetail?.visaType?.entryType}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Validity Time
                  </span>
                  <span className="block text-[15px]">
                    {visaOrderDetail?.visaType?.validity +
                      " " +
                      visaOrderDetail?.visaType?.validityTimeFormat}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Stay period
                  </span>
                  <span className="block text-[15px]">
                    {visaOrderDetail?.visaType?.stayPeriod +
                      " " +
                      visaOrderDetail?.visaType?.stayPeriodFormat}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Processing Time
                  </span>
                  <span className="block text-[15px]">
                    {visaOrderDetail?.visaType?.processingTime +
                      " " +
                      visaOrderDetail?.visaType?.processingTimeFormat}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Visa Price
                  </span>
                  <span className="block text-[15px]">
                    {priceConversion(
                      visaOrderDetail?.visaType?.visaPrice,
                      selectedCurrency,
                      true
                    )}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-[8px] mb-3">
                  <span>
                    <BsFillFileEarmarkPersonFill />
                  </span>
                  <span className="font-[600] text-[15px]">
                    Enquiry Details
                  </span>
                </div>
                <div className="">
                  <span className="block text-[12px] text-grayColor">
                    Reference Number
                  </span>
                  <span className="block text-[15px]">
                  {visaOrderDetail?.referenceNumber}
                  </span>
                </div>
                <div className="">
                  <span className="block text-[12px] text-grayColor">
                    Reseller
                  </span>
                  <span className="block text-[15px]">
                    {visaOrderDetail?.reseller?.name}
                  </span>
                </div>
                <div className="">
                  <span className="block text-[12px] text-grayColor">
                    Reseller Agent Code
                  </span>
                  <span className="block text-[15px]">
                    {visaOrderDetail?.reseller?.agentCode}
                  </span>
                </div>
                <div className="">
                  <span className="block text-[12px] text-grayColor">
                    Reseller Company Name
                  </span>
                  <span className="block text-[15px] capitalize">
                    {visaOrderDetail?.reseller?.companyName}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Reseller Phone Number
                  </span>
                  <span className="block text-[15px]">
                    {visaOrderDetail?.reseller?.phoneNumber}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Applied at
                  </span>
                  <span className="block text-[15px]">
                    {visaOrderDetail?.createdAt?.slice(0, 10)}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Total Amount
                  </span>
                  <span className="text-[15px] flex items-center gap-[10px]">
                    {visaOrderDetail?.totalAmount}
                  </span>
                </div>
                <div className="mt-3">
                  <span className="block text-[12px] text-grayColor">
                    Status
                  </span>
                  <span className="text-[15px] flex items-center gap-[10px] capitalize">
                    {visaOrderDetail?.status}
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
                    <th className="font-[500] px-3 py-4">Title</th>
                    <th className="font-[500] px-3 py-4">First Name</th>
                    <th className="font-[500] px-3 py-4">Last Name</th>
                    <th className="font-[500] px-3 py-4">Passport Number</th>
                    <th className="font-[500] px-3 py-4">Country</th>
                    <th className="font-[500] px-3 py-4">Phone Number</th>
                    <th className="font-[500] px-3 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {visaOrderDetail?.travellers?.map((item,index) => (
                  <VisaOrderDetailSingleRow key={index} item={item} index={index} visaOrderDetail={visaOrderDetail} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisaOrderDetailsPage