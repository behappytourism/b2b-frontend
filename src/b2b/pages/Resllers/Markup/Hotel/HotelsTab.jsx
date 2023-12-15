import React, { useState, useEffect } from "react";
import axios from "../../../../../axios";
import { useSelector } from "react-redux";
import HotelSingleList from "./HotelSingleList";
import { PageLoader, Pagination } from "../../../../components";

function HotelsTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hotels, setHotels] = useState([]);

  const [filters, setFilters] = useState({
    skip: 0,
    limit: 10,
    total: 0,
    searchInput: "",
  });

  const { token } = useSelector((state) => state.agents);
  const fetchHotels = async (e) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.get(
        `/b2b/hotels/markup/list-hotel?limit=${filters.limit}&skip=${filters.skip}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setHotels(response?.data?.hotels);
      setFilters((prev) => {
        return {
          ...prev,
          skip: response?.data?.skip,
          total: response?.data?.total,
        };
      });
      setIsLoading(false);
    } catch (error) {
      setError(
        error?.response?.data?.error || "Something went wrong, Try again"
      );
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchHotels();
  }, [filters.skip, filters.searchInput]);
  return (
    <div>
      <table className="w-full">
        <thead>
          <tr
            colSpan={3}
            className=" text-darktext  text-[15px] text-left border-b"
          >
            <th className="font-[700] px-3 py-5 whitespace-nowrap text-left ">
              Hotels
            </th>
          </tr>
        </thead>
        <tbody className="text-sm text-textColor">
          {isLoading ? (
            <tr className="">
              <td colSpan={3}>
                <PageLoader />
              </td>
            </tr>
          ) : (
            <>
              {error ? (
                <tr className="">
                  <td
                    colSpan={3}
                    className="text-center w-full text-gray-300 font-medium text-sm py-10"
                  >
                    {error}
                  </td>
                </tr>
              ) : (
                ""
              )}
              {hotels?.length > 0 &&
                hotels?.map((hotel) => (
                  <HotelSingleList key={hotel?.hotelId} hotel={hotel} />
                ))}
            </>
          )}
        </tbody>
      </table>
      <div className="p-4">
        <Pagination
          limit={filters?.limit}
          skip={filters?.skip}
          total={filters?.total}
          incOrDecSkip={(number) =>
            setFilters((prev) => {
              return {
                ...prev,
                skip: prev.skip + number,
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
    </div>
  );
}

export default HotelsTab;
