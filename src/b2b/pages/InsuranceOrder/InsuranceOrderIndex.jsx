import React, { useEffect, useState } from "react";
import OrdersNavigator from "../OrdersNavigator";
import { BsCalendar2Date, BsSearch } from "react-icons/bs";
import { MdChildFriendly } from "react-icons/md";
import formatDate from "../../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios"
import { useSelector } from "react-redux";


function InsuranceOrderIndex() {

  const navigate = useNavigate();
  const {token} = useSelector((state)=>state.agents)
  const [orders, setOrders] = useState([])
  
  const fetchAllOrders = async () => {
    try{
      const res = await axios.get(`/b2b/insurance/contracts/all`, {headers:{ Authorization: `Bearer ${token}`}})
      setOrders(res.data)
      console.log(res, "response");
    }catch(err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  }, [])

  return (
    <>
      <div className=" ">
        <OrdersNavigator />
        <div className="max-w-screen-xl mx-auto">
          <div className="px-5 py-10">
            <div className="sm:flex sm:space-y-0 space-y-2 items-center justify-between   pb-4 ">
              <div>
                <div className="relative h-10">
                  <span className="absolute w-10 h-full flex justify-center items-center text-stone-500 border-r">
                    <BsSearch />
                  </span>
                  <input
                    type="search"
                    className=" pl-12 outline-none border px-2 text-xs text-stone-500 placeholder:text-xs placeholder:text-stone-500 rounded h-full focus:border-green-400 hover:border-blue-400 hover:bg-stone-100 lg:w-[400px] "
                    placeholder="search!!!!!"
                    name="search"
                  />
                </div>
              </div>
              <div className="sm:flex sm:space-y-0 space-y-2  gap-1 items-center ">
                <div className="relative h-10">
                  <span className="absolute w-10 h-full flex justify-center items-center text-stone-500 border-r">
                    <BsCalendar2Date />
                  </span>
                  <input
                    type="date"
                    className=" pl-12 outline-none border px-2 text-xs text-stone-500 placeholder:text-xs placeholder:text-stone-500 rounded h-full focus:border-green-400 hover:border-blue-400 hover:bg-stone-100 w-full"
                    name="dateFrom"
                  />
                </div>

                <div className="relative h-10">
                  <span className="absolute w-10 h-full flex justify-center items-center text-stone-500 border-r">
                    <BsCalendar2Date />
                  </span>
                  <input
                    type="date"
                    className=" pl-12 outline-none border px-2 text-xs text-stone-500 placeholder:text-xs placeholder:text-stone-500 rounded h-full focus:border-green-400 hover:border-blue-400 hover:bg-stone-100 w-full"
                    name="dateTo"
                  />
                </div>

                <button
                  onClick={() => ""}
                  className="h-10 rounded-sm shadow-mn px-10 w-full sm:w-auto bg-primaryColor text-white uppercase text-[12px]"
                >
                  Clear Filters
                </button>

                <button
                  onClick={() => ""}
                  className="h-10 rounded-sm shadow-mn px-10 w-full sm:w-auto bg-green-500 text-white uppercase text-[12px]"
                >
                  Download
                </button>
              </div>
            </div>
            <div>
              <div className="overflow-x-auto shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)]">
                {/* <InfiniteScroll
                  dataLength={allA2aOrders?.length || 0}
                  next={() => {
                    setFilters((prev) => {
                      return { ...prev, skip: prev.skip + 1 };
                    });
                  }}
                  hasMore={filters.hasMore}
                > */}
                <table className="w-full overflow-y-hidden overflow-x-auto">
                  <thead className=" text-gray-400 border-b-2 border-gray-400 text-[14px] text-left">
                    <tr>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        Reference Number
                      </th>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        Beneficiary Name
                      </th>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        Destination
                      </th>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        From Date
                      </th>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        To Date
                      </th>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        Plan 
                      </th>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        Status
                      </th>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-grayColor">
                    {
                      orders.map((ele)=>{
                        return (
                          <tr
                      onClick={() => navigate(`/insurance/order/orderView/${ele?._id}`)}
                      className="cursor-pointer"
                    >
                      <td className="p-3">{ele?.referenceNumber}</td>
                      {
                        ele?.beneficiaryData.map((dt)=>(

                          <td className="p-3">{dt?.firstName}</td>
                        ))
                      }
                      <td className="p-3">
                        {ele?.destination}
                      </td>
                      <td className="p-3 capitalize">
                      {formatDate(ele?.travelFrom)}
                      </td>
                      <td className="p-3">{formatDate(ele?.travelTo)}</td>
                      <td className="p-3">{ele?.planName}</td>
                      <td className="p-3">{ele?.status}</td>
                      <td className="p-3">{ele?.totalAmount}</td>
                    </tr>
                        )
                      })
                    }
                    
                    {/* {isLoading ? (
                        <tr>
                          <td colSpan="13">
                            <div className="flex justify-center items-center h-10">
                              <PageLoader />
                            </div>
                          </td>
                        </tr>
                      ) : (
                     ""
                      )} */}
                  </tbody>
                </table>
                {/* </InfiniteScroll>
                {error && (
                  <p className="text-gray-300 text-sm text-center py-10">
                    {error}
                  </p>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InsuranceOrderIndex;
