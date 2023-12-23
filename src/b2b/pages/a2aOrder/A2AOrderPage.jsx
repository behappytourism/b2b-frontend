import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../../axios";
import { PageLoader, Pagination } from "../../components";
import OrdersNavigator from "../OrdersNavigator";
import formatDate from "../../../utils/formatDate";
import { MdChildFriendly } from "react-icons/md";
import { BsCalendar2Date, BsSearch } from "react-icons/bs";

function A2AOrderPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [allA2aOrders, setAllA2aOrders] = useState([]);
  const [filters, setFilters] = useState({
    skip: 0,
    limit: 10,
    totalOrders: 0,
    search: "",
    hasMore: true,
    dateFrom: "",
    dateTo: "",
  });
  const [error, setError] = useState("");

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

  const fetchAllA2aOrders = async ({ ...filters }) => {
    try {
      setIsLoading(true);
      const searchQuery = `skip=${filters?.skip}&limit=${filters.limit}&search=${filters.search}&dateFrom=${filters.dateFrom}&dateTo=${filters.dateTo}`;
      let response;
      response = await axios.get(`/b2b/a2a/orders/all?${searchQuery}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setAllA2aOrders(response?.data?.result[0]?.data);

      setIsLoading(false);
      if (filters.search || filters.dateFrom || filters.dateTo) {
        setFilters((prev) => {
          return {
            ...prev,
            totalOrders: response?.data?.result[0]?.totalOrders || 0,
            hasMore: false,
          };
        });
      } else {
        setFilters((prev) => {
          return {
            ...prev,
            totalOrders: response?.data?.result[0]?.totalOrders || 0,
            hasMore:
              response?.data?.result[0]?.totalOrders >= allA2aOrders?.length,
          };
        });
      }
    } catch (err) {
      setAllA2aOrders([]);
      setError("No A2A Orders found with this paramteres");
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
    fetchAllA2aOrders({ ...filters, skip, limit });
  }, [searchParams, filters.search, filters.dateFrom, filters.dateTo]);

  const handleDownload = async () => {
    try {
      const searchQuery = `skip=${filters.skip}&limit=${filters.limit}&search=${filters.search}&dateFrom=${filters.dateFrom}&dateTo=${filters.dateTo}`;

      const response = await axios({
        url: `/b2b/a2a/orders/download/summary?${searchQuery}`,
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
                    value={filters.search}
                    onChange={handleChange}
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
                  onClick={() =>
                    setFilters({
                      skip: 0,
                      limit: 20,
                      totalOrders: 0,
                      search: "",
                      hasMore: true,
                      dateFrom: "",
                      dateTo: "",
                    })
                  }
                  className="h-10 rounded-sm shadow-mn px-10 w-full sm:w-auto bg-primaryColor text-white uppercase text-[12px]"
                >
                  Clear Filters
                </button>

                <button
                  onClick={() => handleDownload()}
                  className="h-10 rounded-sm shadow-mn px-10 w-full sm:w-auto bg-green-500 text-white uppercase text-[12px]"
                >
                  Download
                </button>
              </div>
            </div>
            <div>
              <div className="overflow-x-auto shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)]">
                <table className="w-full overflow-y-hidden overflow-x-auto">
                  <thead className=" text-gray-400 border-b-2 border-gray-400 text-[14px] text-left">
                    <tr>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        Reference Number
                      </th>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        PNR Number
                      </th>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        A2A
                      </th>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        Passengers
                      </th>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        Date
                      </th>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        Price
                      </th>
                    </tr>
                  </thead>
                  {!isLoading ? (
                    <tbody className="text-sm text-grayColor">
                      {allA2aOrders?.length > 0 ? (
                        allA2aOrders?.map((item) => (
                          <tr
                            onClick={() => navigate(`/a2a/order/${item?._id}`)}
                            key={item?._id}
                            className="cursor-pointer"
                          >
                            <td className="p-3">{item?.referenceNumber}</td>
                            <td className="p-3">{item?.a2aTicket?.pnrNo}</td>
                            <td className="p-3">
                              <div className="">
                                <p className="">
                                  {" "}
                                  {`${
                                    item?.a2aTicket?.airportFromIata
                                      ? item?.a2aTicket?.airportFromIata
                                      : "N/A"
                                  } - ${
                                    item?.a2aTicket?.airportToIata
                                      ? item?.a2aTicket?.airportToIata
                                      : "N/A"
                                  } - ${
                                    item?.a2aTicket?.airportFromIata
                                      ? item?.a2aTicket?.airportFromIata
                                      : "N/A"
                                  }`}
                                </p>
                                <p className="text-sm text-gray-300">
                                  {`(${item?.a2aTicket?.takeOffTimeOnward}-${item?.a2aTicket?.landingTimeOnward}) - (${item?.a2aTicket?.takeOffTimeReturn}-${item?.a2aTicket?.landingTimeReturn})`}
                                </p>
                              </div>
                            </td>
                            <td className="p-3 capitalize">
                              {item?.passengerDetails?.map((pass) => (
                                <>
                                  <p className="">
                                    {pass?.title +
                                      " " +
                                      pass?.firstName +
                                      " " +
                                      pass?.lastName}
                                  </p>
                                  {pass?.isInfant && (
                                    <div className="flex gap-1 items-center">
                                      <p className="text-xs font-[500] text-stone-500 underline">
                                        <MdChildFriendly />
                                      </p>
                                      <p className="text-sm">
                                        {pass?.infantDetails?.title +
                                          " " +
                                          pass?.infantDetails?.firstName +
                                          " " +
                                          pass?.infantDetails?.lastName}
                                      </p>
                                    </div>
                                  )}
                                </>
                              ))}
                            </td>
                            <td className="p-3">
                              {formatDate(item?.createdAt)}
                            </td>
                            <td className="p-3">{item?.totalAmount}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="13">
                            <p className="flex justify-center py-10 text-slate-400 font-[500]">
                              Sorry No order found!!!
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td colSpan="13">
                          <div className="flex justify-center items-center py-10">
                            <PageLoader />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>

                {error && (
                  <p className="text-gray-300 text-sm text-center py-10">
                    {error}
                  </p>
                )}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default A2AOrderPage;
