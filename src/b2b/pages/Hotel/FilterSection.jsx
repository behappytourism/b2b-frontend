import React, { useEffect, useState } from "react";
import Rating from "../../components/Rating/Rating";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function FilterSection({
  setFilters,
  filters,
  recievedFilters,
  appliedFilters,
  setAvailableHotel,
}) {
  const [priceRange, setPriceRange] = useState([
    Number(recievedFilters?.minPrice) || 0,
    Number(recievedFilters?.maxPrice) || 100000,
  ]);
  useEffect(() => {
    if (
      appliedFilters?.priceFrom?.length > 0 &&
      appliedFilters?.priceTo?.length > 0
    ) {
      setPriceRange([
        Number(appliedFilters?.priceFrom),
        Number(appliedFilters?.priceTo),
      ]);
    } else {
      setPriceRange([
        Number(recievedFilters?.minPrice),
        Number(recievedFilters?.maxPrice),
      ]);
    }
  }, [
    recievedFilters?.minPrice,
    recievedFilters?.maxPrice,
    appliedFilters?.priceFrom,
    appliedFilters?.priceTo,
  ]);

  const [isSliderMoving, setIsSliderMoving] = useState(false);

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleSliderMoveStart = () => {
    setIsSliderMoving(true);
  };

  const handleSliderMoveEnd = (value) => {
    setIsSliderMoving(false);
    setFilters((prev) => {
      return { ...prev, priceFrom: value[0], priceTo: value[1] };
    });
    setAvailableHotel([]);
  };
  return (
    <div className="shadow-[0_0_7px_2px_rgb(56_65_74_/_5%)] rounded mt-2">
      <p className=" font-[800] pt-5  text-lg text-textColor text-center">
        Filters
      </p>
      <div className="text-stone-500   p-3  rounded-lg font-light space-y-2">
        <h4 className="text-[13px] font-[700] shadow-mn h-8 flex items-center px-2 rounded bg-blue-400 text-white mt-2">
          Price
        </h4>
        <div className="px-2">
          <Slider
            range
            min={Number(recievedFilters?.minPrice)}
            max={Number(recievedFilters?.maxPrice)}
            defaultValue={priceRange}
            value={priceRange}
            onChange={handlePriceChange}
            onBeforeChange={handleSliderMoveStart}
            onAfterChange={handleSliderMoveEnd}
          />
        </div>
        {/* <div className="mt-2">
          <p className="text-xs">
            Price Range : {priceRange[0] + " - " + priceRange[1]}
          </p>
        </div> */}
        <div className="flex justify-between gap-5">
          <div className="block">
            <div className="text-grayColor text-xs">Min Price</div>
            <input
              onChange={(e) => {
                setPriceRange([Number(e.target.value), priceRange[1]]);
              }}
              onBlur={(e) => {
                setAvailableHotel([]);
                setFilters((prev) => {
                  return {
                    ...prev,
                    priceFrom: Number(e.target.value),
                    priceTo: priceRange[1],
                  };
                });
              }}
              value={priceRange[0]}
              className="outline-none border w-[100%] rounded-sm text-xs h-7 text-gray-300 px-2"
              type="number"
            />
          </div>
          <div className="block">
            <div className="text-grayColor text-xs">Max Price</div>
            <input
              onChange={(e) => {
                setPriceRange([priceRange[0], Number(e.target.value)]);
              }}
              value={priceRange[1]}
              className="outline-none border w-[100%] rounded-sm text-xs h-7 text-gray-300 px-2"
              type="number"
              onBlur={(e) => {
                setAvailableHotel([]);
                setFilters((prev) => {
                  return {
                    ...prev,
                    priceFrom: priceRange[0],
                    priceTo: Number(e.target.value),
                  };
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="text-stone-500   p-3  rounded-lg font-light space-y-2">
        <h4 className="text-[13px] font-[700]  h-8 flex items-center px-2 rounded bg-blue-400 text-white shadow-mn mt-2">
          Star Rating
        </h4>
        {recievedFilters?.starCategories?.length > 0
          ? recievedFilters?.starCategories?.map((ele, index) => (
              <div key={index} className="flex gap-1 px-2">
                <div className="">
                  <input
                    name={"starRating"}
                    className="outline-none"
                    type="checkbox"
                    value={ele?.starCategory}
                    defaultChecked={appliedFilters.starCategories.includes(
                      ele?.starCategory
                    )}
                    onChange={(e) => {
                      setAvailableHotel([]);
                      if (e.target.checked) {
                        setFilters((prev) => {
                          return {
                            ...prev,
                            starCategory: [
                              ...filters?.starCategory,
                              e.target.value,
                            ],
                            skip: 0,
                          };
                        });
                      } else {
                        const filtered = filters?.starCategory?.filter(
                          (item) => item !== e.target.value
                        );
                        setFilters((prev) => {
                          return {
                            ...prev,
                            starCategory: filtered,
                            skip: 0,
                          };
                        });
                      }
                    }}
                  />
                </div>
                <div className="flex justify-between items-center flex-1">
                  <p className="text-xs text-stone-500 capitalize font-[300]">
                    {ele?.starCategory === "apartment" ? (
                      "Apartments"
                    ) : ele?.starCategory === "hostel" ? (
                      "Hostel"
                    ) : ele?.starCategory === "unrated" ? (
                      "Unrated"
                    ) : (
                      <Rating
                        value={ele?.starCategory && Number(ele?.starCategory)}
                        color={"#FF8400"}
                      />
                    )}
                  </p>
                  <p className="text-xs text-stone-500 capitalize">
                    {" "}
                    {ele?.starCategory !== "" ? `(${ele?.total})` : ""}
                  </p>
                </div>
              </div>
            ))
          : ""}
      </div>
      {recievedFilters?.accommodationTypes?.length > 0 && (
        <div className="text-gray-400  mt-2 p-3  rounded-lg font-light space-y-2">
          <h4 className="text-[13px] h-8  flex items-center px-2 rounded font-[700] bg-blue-400 text-white shadow-mn mt-2">
            Accommodation Types
          </h4>
          {recievedFilters?.accommodationTypes?.length > 0 &&
            recievedFilters?.accommodationTypes?.map((ele, index) => (
              <div key={index} className="flex gap-1 px-2 ">
                <div className="">
                  <input
                    name={"accommodationTypes"}
                    className="outline-none"
                    type="checkbox"
                    value={ele?.code}
                    defaultChecked={appliedFilters.accommodationTypes.includes(
                      ele?.code
                    )}
                    onChange={(e) => {
                      setAvailableHotel([]);
                      if (e.target.checked) {
                        setFilters((prev) => {
                          return {
                            ...prev,
                            accommodationType: [
                              ...filters?.accommodationType,
                              e.target.value,
                            ],
                            skip: 0,
                          };
                        });
                      } else {
                        const filtered = filters?.accommodationType?.filter(
                          (item) => item !== e.target.value
                        );
                        setFilters((prev) => {
                          return {
                            ...prev,
                            accommodationType: filtered,
                            skip: 0,
                          };
                        });
                      }
                    }}
                  />
                </div>
                <div className="flex justify-between text-stone-500 items-center flex-1">
                  <p className="text-xs  capitalize font-[300]">{ele?.name}</p>
                  <p className="text-xs font-[300] capitalize">
                    {ele?.code !== "" ? `(${ele?.total})` : ""}{" "}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
      {recievedFilters?.boardTypes?.length > 0 && (
        <div className="text-gray-400  mt-2 p-3  rounded-lg font-light space-y-2">
          <h4 className="text-[13px] h-8  flex items-center px-2 rounded font-[700] bg-blue-400 text-white shadow-mn mt-2">
            Board Types
          </h4>
          {recievedFilters?.boardTypes?.length > 0 &&
            recievedFilters?.boardTypes?.map((ele, index) => (
              <div key={index} className="flex gap-1 px-2 ">
                <div className="">
                  <input
                    name={"boardTypes"}
                    className="outline-none"
                    type="checkbox"
                    value={ele?.boardShortName}
                    defaultChecked={appliedFilters.boardTypes.includes(
                      ele?.boardShortName
                    )}
                    onChange={(e) => {
                      setAvailableHotel([]);
                      if (e.target.checked) {
                        setFilters((prev) => {
                          return {
                            ...prev,
                            boardTypes: [
                              ...filters?.boardTypes,
                              e.target.value,
                            ],
                            skip: 0,
                          };
                        });
                      } else {
                        const filtered = filters?.boardTypes?.filter(
                          (item) => item !== e.target.value
                        );
                        setFilters((prev) => {
                          return {
                            ...prev,
                            boardTypes: filtered,
                            skip: 0,
                          };
                        });
                      }
                    }}
                  />
                </div>
                <div className="flex justify-between text-stone-500 items-center flex-1">
                  <p className="text-xs  capitalize font-[300]">
                    {ele?.boardShortName !== ""
                      ? ele?.name + ` (${ele?.boardShortName})`
                      : ele?.name}
                  </p>
                  <p className="text-xs font-[300] capitalize">
                    {ele?.boardShortName !== "" ? `(${ele?.total})` : ""}{" "}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
      {recievedFilters?.hotelChains?.length > 0 && (
        <div className="text-gray-400  mt-2 p-3  rounded-lg font-light space-y-2">
          <h4 className="text-[13px] h-8  flex items-center px-2 rounded font-[700] bg-blue-400 text-white shadow-mn mt-2">
            Hotel Chains
          </h4>
          {recievedFilters?.hotelChains?.length > 0 &&
            recievedFilters?.hotelChains?.map((ele, index) => (
              <div key={index} className="flex gap-1 px-2 ">
                <div className="">
                  <input
                    name={"hotelChains"}
                    className="outline-none"
                    type="checkbox"
                    value={ele?._id}
                    defaultChecked={appliedFilters.chains.includes(ele?._id)}
                    onChange={(e) => {
                      setAvailableHotel([]);
                      if (e.target.checked) {
                        setFilters((prev) => {
                          return {
                            ...prev,
                            hotelChains: [
                              ...filters?.hotelChains,
                              e.target.value,
                            ],
                            skip: 0,
                          };
                        });
                      } else {
                        const filtered = filters?.hotelChains?.filter(
                          (item) => item !== e.target.value
                        );
                        setFilters((prev) => {
                          return {
                            ...prev,
                            hotelChains: filtered,
                            skip: 0,
                          };
                        });
                      }
                    }}
                  />
                </div>
                <div className="flex justify-between text-stone-500 items-center flex-1">
                  <p className="text-xs  capitalize font-[300]">{ele?.name}</p>
                  <p className="text-xs font-[300] capitalize">
                    {ele?._id !== "" ? `(${ele?.total})` : ""}{" "}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default FilterSection;
