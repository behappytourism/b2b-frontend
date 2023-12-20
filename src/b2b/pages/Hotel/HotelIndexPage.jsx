import React, { Suspense, useEffect, useState } from "react";

import { CiViewTable } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";

import axios from "../../../axios";
import { useSelector } from "react-redux";

import HotelCard from "../../components/Cards/HotelCard";
import FilterSection from "./FilterSection";
import ExtendedVersion from "./ExtendedVersion";
import CompactVersion from "./CompactVersion";
import ComparatorVersion from "./ComparatorVersion";
import InfiniteScroll from "react-infinite-scroll-component";
import { AiOutlineArrowUp } from "react-icons/ai";
import { config } from "../../../constants";
import LoadingBar from "react-top-loading-bar";

const LoadingComponent = ({ item }) => {
  return (
    <div key={item} className="sm:flex gap-2 w-full shadow-sm rounded-xl p-3">
      <div className="w-full sm:w-[300px] h-[150px] bg-gray-100  flex justify-center items-center rounded-md overflow-hidden">
        <svg
          className="w-12 h-12 text-gray-200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 640 512"
        >
          <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
        </svg>
      </div>
      <div className="flex justify-between w-full">
        <div className="">
          <ol className="space-y-3">
            <li className="h-5 w-64 rounded bg-gray-200"></li>
            <li className="h-3 w-56 rounded bg-gray-200"></li>
            <li className="h-3 w-60 rounded bg-gray-200"></li>
            <li className="h-3 w-60 rounded bg-gray-200"></li>
            <li className="h-3 w-56 rounded bg-gray-200"></li>
            <li className="h-3 w-60 rounded bg-gray-200"></li>
          </ol>
        </div>
        <div className=" flex justify-end ">
          <ol className="space-y-3 flex flex-col items-end">
            <li className="flex gap-3 justify-end">
              <p className="h-5 w-5 rounded bg-gray-200"></p>
              <p className="h-5 w-5 rounded bg-gray-200"></p>
              <p className="h-5 w-5 rounded bg-gray-200"></p>
              <p className="h-5 w-5 rounded bg-gray-200"></p>
              <p className="h-5 w-5 rounded bg-gray-200"></p>
            </li>
            <li className="h-3 w-56 rounded bg-gray-200"></li>
            <li className="h-3 w-60 rounded bg-gray-200"></li>
            <li className="h-3 w-60 rounded bg-gray-200"></li>
            <li className="h-10 w-24 rounded bg-gray-200"></li>
          </ol>
        </div>
      </div>
    </div>
  );
};

function HotelIndexPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [availableHotel, setAvailableHotel] = useState([]);
  const [numAdult, setNumAdult] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    skip: 0,
    limit: 40,
    totalHotels: 0,
    filteredHotelsCount: 0,
    responseHotelLength: 0,
    hasMore: true,
    searchId: "",
    priceFrom: "",
    priceTo: "",
    starCategory: searchParams.get("starCategory")
      ? [searchParams.get("starCategory")]
      : [],
    accommodationType: [],
    boardTypes: [],
    hotelChains: [],
    sortBy: "price:asc",
    amenities: [],
  });
  const [recievedFilters, setRecievedFilters] = useState({
    accommodationTypes: [],
    maxPrice: "",
    minPrice: "",
    starCategories: [],
  });
  const [version, setVersion] = useState({
    extended: true,
    compact: false,
    comparator: false,
  });
  const [appliedFilters, setAppliedFilters] = useState({
    priceFrom: "",
    priceTo: "",
    starCategories: [],
    boardTypes: [],
    accommodationTypes: [],
    chains: [],
  });
  const [progress, setProgress] = useState(0);

  const { token } = useSelector((state) => state.agents);

  const fetchAvailableHotel = async () => {
    try {
      setIsLoading(true);
      if (filters.skip === 0) {
        setProgress(0);
      }
      const searchQuery = `limit=${filters.limit}&skip=${
        filters.skip
      }&searchId=${filters?.searchId}&accommodationTypes=${JSON.stringify(
        filters.accommodationType
      )}&priceFrom=${filters.priceFrom}&priceTo=${
        filters.priceTo
      }&starCategories=${JSON.stringify(
        filters.starCategory
      )}&boardTypes=${JSON.stringify(
        filters?.boardTypes
      )}&chains=${JSON.stringify(
        filters?.hotelChains
      )}&amenities=${JSON.stringify(filters?.amenities)}&sortBy=${
        filters.sortBy
      }`;
      if (filters.skip === 0) {
        setProgress(75);
      }
      const response = await axios.post(
        `/b2b/hotels/availabilities/search?${searchQuery}`,
        {
          searchQuery: JSON.parse(searchParams.get("searchQuery")),
          fromDate: searchParams.get("fromDate")?.slice(0, 10),
          toDate: searchParams.get("toDate")?.slice(0, 10),
          rooms: JSON.parse(searchParams.get("rooms")),
          nationality: searchParams.get("nationality"),
          priceType: searchParams.get("priceType"),
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      response?.data?.hotels
        ? setAvailableHotel((prev) => [
            ...new Set([...prev, ...response?.data?.hotels]),
          ])
        : setAvailableHotel([]);

      setIsLoading(false);

      setFilters((prev) => {
        return {
          ...prev,
          totalHotels: response?.data?.totalHotels || 0,
          filteredHotelsCount: response?.data?.filteredHotelsCount || 0,
          hasMore: response?.data?.filteredHotelsCount > availableHotel?.length,
          searchId: response?.data?.searchId,
          responseHotelLength: response?.data?.hotels?.length,
        };
      });

      if (response?.data?.limit > response?.data?.hotels?.length) {
        setFilters((prev) => {
          return {
            ...prev,
            hasMore: false,
          };
        });
      }

      setAppliedFilters((prev) => {
        return {
          ...prev,
          priceFrom: response?.data?.appliedFilters?.priceFrom,
          priceTo: response?.data?.appliedFilters?.priceTo,
          starCategories: response?.data?.appliedFilters?.starCategories,
          boardTypes: response?.data?.appliedFilters?.boardTypes,
          accommodationTypes:
            response?.data?.appliedFilters?.accommodationTypes,
          chains: response?.data?.appliedFilters?.chains,
        };
      });
      setRecievedFilters((prev) => {
        return {
          ...prev,
          accommodationTypes: response?.data?.filters?.accommodationTypes,
          minPrice: response?.data?.filters?.minPrice,
          maxPrice: response?.data?.filters?.maxPrice,
          starCategories: response?.data?.filters?.starCategories,
          boardTypes: response?.data?.filters?.boardTypes,
          hotelChains: response?.data?.filters?.hotelChains,
        };
      });
      if (filters.skip === 0) {
        setProgress(100);
      }
    } catch (err) {
      console.log(err?.response?.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading && filters.limit === filters.responseHotelLength) {
      setFilters((prev) => {
        return {
          ...prev,
          hasMore: filters.filteredHotelsCount > availableHotel?.length,
        };
      });
    }
  }, [availableHotel]);

  useEffect(() => {
    fetchAvailableHotel({ ...filters });

    const val = JSON.parse(searchParams.get("rooms")).reduce((acc, item) => {
      return acc + item?.noOfAdults;
    }, 0);
    setNumAdult(val);
  }, [
    searchParams,
    filters.skip,
    filters.starCategory,
    filters.accommodationType,
    filters.priceFrom,
    filters.priceTo,
    filters.boardTypes,
    filters.hotelChains,
    filters.amenities,
    filters.sortBy,
  ]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setIsScrollButtonVisible(true);
      } else {
        setIsScrollButtonVisible(false);
      }
    });
  }, []);

  useEffect(() => {
    if (searchParams.get("starCategory")) {
      setFilters((prev) => {
        return {
          ...prev,
          starCategory: [
            ...filters?.starCategory,
            searchParams.get("starCategory"),
          ],
          skip: 0,
        };
      });
    }
  }, []);

  return (
    <div className="p-2 lg:py-6 max-w-screen-xl mx-auto relative ">
      <LoadingBar
        color="#1140de"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        containerClassName={` overflow-hidden  ${
          window.scrollY > 70 ? "  " : " mt-[55px]  md:mt-[150px] "
        }`}
        className={"rounded-r-full "}
        height={5}
        background={0}
        waitingTime={1000}
        loaderSpeed={5000}
        transitionTime={5000}
      />

      <div className="">
        <div className="sm:grid grid-cols-12 gap-4">
          <div className="hidden sm:block filter__section col-span-3">
            <div id="start" className=" w-full  rounded-xl  p-2">
              <HotelCard
                setFilters={setFilters}
                setAvailableHotel={setAvailableHotel}
              />
              {!isLoading ? (
                <FilterSection
                  setFilters={setFilters}
                  filters={filters}
                  recievedFilters={recievedFilters}
                  appliedFilters={appliedFilters}
                  setAvailableHotel={setAvailableHotel}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="list__section col-span-9 ">
            <InfiniteScroll
              dataLength={availableHotel || 0}
              next={() => {
                if (!isLoading && filters.hasMore) {
                  setFilters((prev) => {
                    return { ...prev, skip: prev.skip + 1 };
                  });
                }
              }} 
              hasMore={isLoading ? false : filters.hasMore}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  {!isLoading ? (
                    <p className="text-gray-400 text-sm font-light tracking-tight py-2">
                      Thank you for visiting {config.TITLE_NAME}
                    </p>
                  ) : (
                    ""
                  )}
                </p>
              }
            >
              <div className="">
                <div className="md:flex justify-between py-2">
                  <div className="text-[#393939] space-y-1">
                    <h2 className="font-[800] text-lg md:text-xl tracking-wide">
                      Select your accomodation in{" "}
                      <span className="capitalize">
                        {searchParams.get("localityValue") || ""}
                      </span>
                    </h2>
                    {isLoading ? (
                      <p className="h-4 w-[100px] animate-pulse rounded bg-gray-100"></p>
                    ) : (
                      <p className="font-[400] text-sm text-gray-300">
                        Total of {filters.totalHotels} hotels
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <select
                      onChange={(e) => {
                        setAvailableHotel([]);
                        setFilters((prev) => {
                          return {
                            ...prev,
                            sortBy: e.target.value,
                            skip: 0,
                          };
                        });
                      }}
                      value={filters.sortBy}
                      className="py-2 rounded border outline-none text-sm px-2 h-10 text-grayColor"
                    >
                      <option hidden>Order by Your Selction</option>
                      <option
                        value={"price:asc"}
                        className="flex gap-1 items-center"
                      >
                        Price Ascending{" "}
                      </option>
                      <option
                        value={"price:desc"}
                        className="flex gap-1 items-center"
                      >
                        Price Descending{" "}
                      </option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-between py-5 gap-2">
                  <div
                    onClick={() => {
                      setVersion({
                        extended: true,
                        compact: false,
                        comparator: false,
                      });
                    }}
                    className={`flex gap-1 cursor-pointer items-center border-b-2 w-full pb-2 ${
                      version.extended
                        ? " border-blue-500 "
                        : " border-blue-100 "
                    } `}
                  >
                    <p
                      className={`text-lg ${
                        version.extended
                          ? " text-blue-500 "
                          : " text-grayColor "
                      }`}
                    >
                      <CiViewTable />
                    </p>
                    <p
                      className={`font-[700]  ${
                        version.extended
                          ? " text-blue-500 "
                          : " text-grayColor "
                      }  text-sm`}
                    >
                      Extended
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      setVersion({
                        extended: false,
                        compact: true,
                        comparator: false,
                      });
                    }}
                    className={`flex gap-1 cursor-pointer items-center border-b-2 w-full pb-2 ${
                      version.compact
                        ? " border-blue-500 "
                        : " border-gray-100 "
                    } `}
                  >
                    <p
                      className={`text-lg ${
                        version.compact ? " text-blue-500 " : " text-grayColor "
                      }`}
                    >
                      <CiViewTable />
                    </p>
                    <p
                      className={`font-[700]  ${
                        version.compact ? " text-blue-500 " : " text-grayColor "
                      }  text-sm`}
                    >
                      Compact
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      setVersion({
                        extended: false,
                        compact: false,
                        comparator: true,
                      });
                    }}
                    className={`flex gap-1 cursor-pointer items-center border-b-2 w-full pb-2 ${
                      version.comparator
                        ? " border-blue-500 "
                        : " border-gray-100 "
                    } `}
                  >
                    <p
                      className={`text-lg ${
                        version.comparator
                          ? " text-blue-500 "
                          : " text-grayColor "
                      }`}
                    >
                      <CiViewTable />
                    </p>
                    <p
                      className={`font-[700]  ${
                        version.comparator
                          ? " text-blue-500 "
                          : " text-grayColor "
                      }  text-sm`}
                    >
                      Comparator
                    </p>
                  </div>
                </div>
              </div>

              <>
                {version.extended ? (
                  <>
                    {availableHotel?.map((item, index) => (
                      <div key={index} className="w-full ">
                        <ExtendedVersion
                          filters={filters}
                          item={item}
                          numAdult={numAdult}
                        />
                      </div>
                    ))}
                  </>
                ) : version.compact ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {availableHotel?.map((item, index) => (
                      <div key={index} className="w-full ">
                        <CompactVersion filter={filters} item={item} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {availableHotel?.map((item, index) => (
                      <div key={index} className="w-full ">
                        <ComparatorVersion filters={filters} item={item} />
                      </div>
                    ))}
                  </>
                )}

                {availableHotel?.length < 1 && !isLoading && (
                  <div className="py-3 w-full bg-gray-100 text-center rounded">
                    <p className="text-darktext">
                      No data found with this query...!!!{" "}
                    </p>
                  </div>
                )}
              </>
              {isLoading ? (
                // loading component

                <div className="w-full col-span-9 space-y-2 animate-pulse">
                  <LoadingComponent />
                </div>
              ) : (
                ""
              )}
            </InfiniteScroll>
          </div>
        </div>
      </div>
      {isScrollButtonVisible ? (
        <div
          onClick={() => scrollToTop()}
          className="cursor-pointer bg-sky-500 fixed bottom-16 text-white h-10 w-10 shadow-mn rounded-full flex justify-center items-center animate-bounce right-12 text-2xl"
        >
          <AiOutlineArrowUp />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default HotelIndexPage;
