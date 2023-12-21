import React, { useState, useEffect, useRef } from 'react'
import OrdersNavigator from '../OrdersNavigator'
import axios from '../../../axios'
import { useSelector } from 'react-redux'
import { BiFilter } from "react-icons/bi";
import OrderListTable from './OrderListTable';
import { PageLoader } from '../../components';
import { useSearchParams } from 'react-router-dom';
import {Pagination} from '../../components';
import {useHandleClickOutside} from '../../../hooks'


function TransferOrderPage() {

 const [searchParams, setSearchParams] = useSearchParams();

  // hooks to handle onClick of modal
  const dropdownRef = useRef();
  useHandleClickOutside(dropdownRef, () => setOrderType(false));

  const transactionRef = useRef();
  useHandleClickOutside(transactionRef, () => setTransactionType(false));


  const { token } = useSelector((state)=> state.agents)
  const [orderList, setOrderList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [filters, setFilters] = useState({
    limit: 10,
    skip: 0,
    totalOrders: 0,
    status: "",
    referenceNo: "",
    dateFrom: "",
    dateTo: "",
    travellerEmail: "",
    hasMore: true,
  })

  const handleChange = (e) => {
    setFilters((prev)=> {
      return {...prev, [e.target.name] : e.target.value}
    })
  }

  const clearFilters = () => {
    setFilters((prev)=>{
      return {
        ...prev,
        limit: 10,
        skip: 0,
        status: "",
        referenceNo: "",
        dateFrom: "",
        dateTo: "",
        travellerEmail: "",
      }
    });
    fetchOrders({
      limit: 10,
      skip: 0,
      status: "",
      referenceNo: "",
      dateFrom: "",
      dateTo: "",
      travellerEmail: "",
    });
  }

  const prevSearchParams = (e) => {
    let params = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const fetchOrders = async ({...filters})=> {
    try {
      setIsLoading(true)
      const searchQuery = `skip=${filters?.skip}&limit=${filters.limit}&referenceNo=${filters.referenceNo}&status=${filters.status}&dateFrom=${filters.dateFrom}&dateTo=${filters.dateTo}&travellerEmail=${filters.travellerEmail}`
      const res = await axios.get(`/b2b/orders/list/all?${searchQuery}`, {
        headers: {Authorization: `Bearer ${token}`}
      })
      setIsLoading(false)
      setOrderList(res.data.transferOrders)

      setFilters((prev)=>{
        return {
          ...prev,
          totalOrders: res?.data?.totalTransfers || 0,
          hasMore: res?.data?.totalTransfers >= orderList?.length
        }
      })
    } catch (error) {
      setIsLoading(false)
      console.log(error, "errror reponse");
    }
  }

  useEffect(() => {
    let skip =
      Number(searchParams.get("skip")) > 0
        ? Number(searchParams.get("skip")) - 1
        : 0;
    let limit =
      Number(searchParams.get("limit")) > 0
        ? Number(searchParams.get("limit"))
        : 10;

    setFilters((prev) => {
      return { ...prev, skip, limit };
    });
    fetchOrders({ ...filters, skip, limit });
  }, [searchParams]);


  const handleDownload = async () => {
    try {
      const searchQuery = `skip=${filters?.skip}&limit=${filters.limit}&referenceNo=${filters.referenceNo}&status=${filters.status}`
      const response = await axios({
        url: `/b2b/orders/all/sheet?${searchQuery}`,
        method: "GET",
        responseType: "blob",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      
      const href = URL.createObjectURL(response.data);

      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "orders.xlsx");
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(href);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
        {/* <OrdersNavigator/> */}
        <div className='max-w-screen-xl mx-auto'>
          <div className='py-10 px-5'>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  fetchOrders({ ...filters });
                }}
              className='grid grid-cols-5 items-end gap-4 p-4'
              >
                <div className='col-span-2'>
                  <label htmlFor="" className="text-xs font-[500] text-gray-400">
                  Reference Number
                </label>
                <input
                  type="text"
                  placeholder="Search Reference No."
                  className="w-full text-sm  h-8 rounded px-2 outline-none border focus:border-green-400 hover:border-orange-500"
                  name="referenceNo"
                  value={filters.referenceNo || ""}
                  onChange={handleChange}
                />
                </div>
            <div className="">
              <label htmlFor="" className="text-xs font-[500] text-gray-400">
                Traveller
              </label>
              <input
                type="text"
                placeholder="Search email..."
                className="w-full text-sm  h-8 rounded px-2 outline-none border focus:border-green-400 hover:border-orange-500"
                name="travellerEmail"
                value={filters.travellerEmail || ""}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="" className="text-xs font-[500] text-gray-400">
                Date From
              </label>
              <input
                type="date"
                className="w-full text-sm  h-8 rounded px-2 outline-none border focus:border-green-400 hover:border-orange-500"
                name="dateFrom"
                value={filters.dateFrom || ""}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="" className="text-xs font-[500] text-gray-400">
                Date To
              </label>
              <input
                type="date"
                className="w-full text-sm  h-8 rounded px-2 outline-none border focus:border-green-400 hover:border-orange-500"
                name="dateTo"
                value={filters.dateTo || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="" className="text-xs font-[500] text-gray-400">
                Status
              </label>
              <select
                name="status"
                id=""
                className="w-full text-sm  h-8 rounded px-2 outline-none border focus:border-green-400 hover:border-orange-500"
                value={filters.status || ""}
                onChange={handleChange}
              >
                <option value="">All</option>
                <option value="booked">Booked</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="block">
              <label htmlFor="" className="text-xs font-[500] text-gray-400">
                Limit
              </label>
              <select
                id=""
                name="limit"
                className="w-full text-sm  h-8 rounded px-2 outline-none border focus:border-green-400 hover:border-orange-500"
                value={filters.limit}
                onChange={handleChange}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <button className="flex items-center h-8 rounded bg-orange-500 text-white justify-center gap-[10px] text-sm">
              <BiFilter /> Filter
            </button>
            <button
              className="bg-gray-500 text-white h-8 rounded text-sm"
              onClick={clearFilters}
              type="button"
            >
              Clear
            </button>
            <button
              onClick={handleDownload}
              className="bg-green-500 text-white h-8 rounded text-sm"
            >
              Download Sheet
            </button>
              </form>
              <div className=" overflow-x-auto  shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)]">
            <table className="w-full relative overflow-hidden">
              <thead className=" text-gray-400 text-[14px] text-left border-b-2 border-gray-400">
                <tr>
                  <th className="font-[700] tracking-wide py-4 px-3 whitespace-nowrap">
                    Ref.No
                  </th>
                  <th className="font-[700] tracking-wide py-4 px-3 whitespace-nowrap">
                    Booking Date
                  </th>
                  <th className="font-[700] tracking-wide py-4 px-3 whitespace-nowrap">
                    Price
                  </th>
                  <th className="font-[700] tracking-wide py-4 px-3 whitespace-nowrap">
                    Payment Status
                  </th>
                  <th className="font-[700] tracking-wide py-4 px-3 whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
              {!isLoading ? (
                <tbody className="text-sm overflow-hidden text-textColor">
                  {orderList?.length > 0 ? (
                    orderList?.map((item, index) => (
                      <OrderListTable item={item} key={index}/>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="13">
                        <p className="flex justify-center pt-5 pb-20 text-slate-400 font-[500]">
                          Sorry.No orders found!!!
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={7}>
                      <div className="py-10">
                        <PageLoader />
                      </div>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
            {/* <div className="p-4">
              <Pagination
                limit={filters?.limit}
                skip={filters?.skip}
                total={filters?.totalOrders}
                incOrDecSkip={(number) => {
                  let params = prevSearchParams();
                  setSearchParams({
                    ...params,
                    skip: filters.skip + number + 1,
                  });
                }}
                updateSkip={(skip) => {
                  let params = prevSearchParams();
                  setSearchParams({
                    ...params,
                    skip: skip + 1,
                  });
                }}
              />
            </div> */}
          </div>
          </div>
          <div className="p-4">
              <Pagination
                limit={filters?.limit}
                skip={filters?.skip}
                total={filters?.totalOrders}
                incOrDecSkip={(number) => {
                  let params = prevSearchParams();
                  setSearchParams({
                    ...params,
                    skip: filters.skip + number + 1,
                  });
                }}
                updateSkip={(skip) => {
                  let params = prevSearchParams();
                  setSearchParams({
                    ...params,
                    skip: skip + 1,
                  });
                }}
              />
            </div>
        </div>
    </div>
  )
}

export default TransferOrderPage
