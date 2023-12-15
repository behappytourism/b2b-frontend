import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import axios from "../../../axios";
import { PageLoader, Pagination } from "../../components";
import OrdersNavigator from "../OrdersNavigator";
import VisaOrderSingleRow from "./VisaOrderSingleRow";
import { BsCalendar2Date, BsSearch } from "react-icons/bs";

function VisaOrderPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [allVisaOrder, setAllVisaOrder] = useState([]);
  const [filters, setFilters] = useState({
    skip: 0,
    limit: 10,
    totalVisaApplication: 0,
    search: "",
    hasMore: true,
    dateFrom: "",
    dateTo: "",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const { token } = useSelector((state) => state.agents);

  const prevSearchParams = (e) => {
    let params = {};
    for (let [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const handleChange = (e) => {
    let params = prevSearchParams();
    setSearchParams({
      ...params,
      [e.target.name]: e.target.value,
      skip: 0,
    });
    setFilters((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const fetchAllVisaOrder = async () => {
    try {
      setIsLoading(true);
      const searchQuery = `skip=${filters?.skip}&limit=${filters.limit}&search=${filters.search}`;
      const response = await axios.get(
        `/b2b/visa/application/list/all?${searchQuery}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setAllVisaOrder(response?.data?.visaApplication);

      setFilters((prev) => {
        return {
          ...prev,
          totalVisaApplication: response?.data?.totalVisaApplication || 0,
          hasMore: response?.data?.totalVisaApplication >= allVisaOrder?.length,
        };
      });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      // throw Error("Cant find Order List");
    }
  };

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
    fetchAllVisaOrder({ ...filters, skip, limit });
    // fetchAllVisaOrder({ ...filters });
  }, [searchParams, filters.search]);

  const handleDownload = async () => {
    try {
      const searchQuery = `skip=${filters.skip}&limit=${filters.limit}&dateFrom=${filters.dateFrom}&dateTo=${filters.dateTo}&search=${filters.search}`;

      const response = await axios({
        url: `/b2b/visa/application/list/download/summary/all?${searchQuery}`,
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className=" ">
        <OrdersNavigator />
        <div className="max-w-screen-xl mx-auto">
          <div className="px-5 py-10">
            <div className="sm:flex space-y-2 sm:space-x-0 items-center justify-between pb-4 ">
              <div className="relative h-10">
                <span className="absolute w-10 h-full flex justify-center items-center text-stone-500 border-r">
                  <BsSearch />
                </span>
                <input
                  type="search"
                  className=" pl-12 outline-none border px-2 text-xs text-stone-500 placeholder:text-xs placeholder:text-stone-500 rounded h-full focus:border-green-400 hover:border-blue-400 hover:bg-stone-100 lg:w-[400px] "
                  placeholder="search!!!!!"
                  name="search"
                  value={filters.search}
                  onChange={handleChange}
                />
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
                    value={filters.dateFrom}
                    onChange={handleChange}
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
                    value={filters.dateTo}
                    onChange={handleChange}
                  />
                </div>
                <button
                  onClick={() => handleDownload()}
                  className="h-10 rounded-sm shadow-mn px-20 w-full sm:w-auto bg-green-500 text-white uppercase text-[12px]"
                >
                  Download
                </button>
              </div>
            </div>
            <div>
              <div className="shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)] overflow-x-auto">
                <table className="w-full">
                  <thead className=" text-gray-400 text-[14px] text-left border-b-2 border-gray-400">
                    <tr>
                      <th className="font-[500] px-3 py-4 whitespace-nowrap">
                        Reference Number
                      </th>
                      <th className="font-[500] px-3 py-4 whitespace-nowrap">
                        Country
                      </th>
                      <th className="font-[500] px-3 py-4 whitespace-nowrap">
                        Travellers
                      </th>
                      <th className="font-[500] px-3 py-4 whitespace-nowrap">
                        Default Price
                      </th>
                      <th className="font-[500] px-3 py-4 whitespace-nowrap">
                        Status
                      </th>
                    </tr>
                  </thead>
                  {isLoading ? (
                    <tbody>
                      <tr>
                        <td colSpan="13">
                          <div className="flex justify-center items-center py-10">
                            <PageLoader />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody className="text-sm text-textColor">
                      {allVisaOrder?.length > 0 ? (
                        allVisaOrder?.map((item, index) => (
                          <VisaOrderSingleRow key={index} item={item} />
                        ))
                      ) : (
                        <tr>
                          <td colSpan={13}>
                            <p className="flex justify-center py-10 text-sm text-gray-500 font-light">
                              Sorry!!. No order found.
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  )}
                </table>
                <div className="p-4">
                  <Pagination
                    limit={filters?.limit}
                    skip={filters?.skip}
                    total={filters?.totalVisaApplication}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default VisaOrderPage;
