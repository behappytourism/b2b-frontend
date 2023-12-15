import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import axios from "../../../axios";
import { PageLoader, Pagination } from "../../components";
import OrdersNavigator from "../OrdersNavigator";
import HotelOrderSingleRow from "./HotelOrderSingleRow";
import { BsSearch } from "react-icons/bs";

function HotelOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [allHotelOrders, setAllHotelOrders] = useState([]);
  const [filters, setFilters] = useState({
    skip: 0,
    limit: 10,
    totalHotelOrders: 0,
    search: "",
    hasMore: true,
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

  // const handleChange = (e) => {
  //    let params = prevSearchParams();
  //    setSearchParams({
  //       ...params,
  //       [e.target.name]: e.target.value,
  //       skip: 0,
  //    });
  // };

  const fetchAllHotelOrders = async () => {
    try {
      setIsLoading(true);
      const searchQuery = `skip=${filters?.skip}&limit=${filters.limit}`;
      const response = await axios.get(
        `/b2b/hotels/orders/all?${searchQuery}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setAllHotelOrders(response?.data?.hotelOrders);

      setFilters((prev) => {
        return {
          ...prev,
          totalHotelOrders: response?.data?.totalHotelOrders || 0,
          hasMore: response?.data?.totalHotelOrders >= allHotelOrders?.length,
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
    fetchAllHotelOrders({ ...filters, skip, limit });

    // fetchAllHotelOrders({ ...filters });
  }, [searchParams, filters.search]);

  return (
    <>
      <div className=" ">
        <OrdersNavigator />
        <div className="max-w-screen-xl mx-auto">
          <div className="px-5 py-10">
            <div className="flex items-center justify-between  px-4 pb-4">
              <div></div>

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
                  onChange={(e) =>
                    setFilters((prev) => {
                      return {
                        ...prev,
                        search: e.target.value,
                        skip: 0,
                      };
                    })
                  }
                />
              </div>
            </div>
            <div>
              <div className="overflow-x-auto shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)] ">
                <table className="w-full">
                  <thead className=" text-gray-400 border-b-2 border-gray-400 text-[14px] text-left">
                    <tr>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        Reference Number
                      </th>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        Hotel
                      </th>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        Pax
                      </th>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        Rooms
                      </th>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        Price
                      </th>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        Date
                      </th>
                      <th className="font-[500] py-4 px-3 whitespace-nowrap">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-grayColor">
                    {isLoading ? (
                      <tr>
                        <td colSpan={7}>
                          <div className="flex justify-center items-center py-10">
                            <PageLoader />
                          </div>
                        </td>
                      </tr>
                    ) : (
                      <>
                        {allHotelOrders?.length > 0 ? (
                          <>
                            {allHotelOrders?.map((item, index) => (
                              <HotelOrderSingleRow key={index} item={item} />
                            ))}
                          </>
                        ) : (
                          <tr>
                            <td colSpan="13">
                              <p className="flex justify-center pt-5 pb-20 text-slate-400 font-[500]">
                                Sorry. No orders found!!!
                              </p>
                            </td>
                          </tr>
                        )}
                      </>
                    )}
                  </tbody>
                </table>
                <div className="p-4">
                  <Pagination
                    limit={filters?.limit}
                    skip={filters?.skip}
                    total={filters?.totalHotelOrders}
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

export default HotelOrder;
