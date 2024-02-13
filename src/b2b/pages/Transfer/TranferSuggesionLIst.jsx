import React from 'react'
import { BtnLoader } from '../../components';
import { GoLocation } from "react-icons/go";
import { setSearchTransfer } from '../../../redux/slices/transferSlice';
import { useSelector, useDispatch } from 'react-redux';

function TranferSuggesionLIst({
    locality,
    setLocality,
    datalist,
    setDatalist,
    suggestions,
    value,
    setValue,
    isLoading,
    setSearchQuery,
    searchQuery
}) {

    const dispatch = useDispatch()
    const { formDatas } = useSelector((state)=> state.transfer)

  return (
    <div>
      {value.length && datalist && (
        <div className="absolute max-h-[20em] w-[32em] mt-1 shadow border bg-light rounded-lg overflow-y-auto z-20">
          <div className="w-full p-5 overflow-y-auto">
            <div className="">
              { suggestions?.areas?.length > 0 && value?.length < 3 && (
                <p className="test-xs text-gray-600 font-[700] pb-2">
                  Top Destinations{" "}
                </p>
              )}
              {value?.length < 3 &&
                suggestions?.areas?.map((item) => (
                  <div
                    key={item?._id}
                    className=" py-3  cursor-pointer capitalize text-darktext z-30 border-t text-sm "
                    onClick={() => {
                      setLocality(item?._id);
                      setDatalist(!datalist);
                      setValue(
                        `${item?.cityName}, ${item.stateName}, ${item.countryName}`
                      );
                      dispatch(setSearchTransfer({
                        value:item?._id, name:"pickupLocation"
                      }));
                      dispatch(setSearchTransfer({
                        value:item?.suggestionType, name:"pickupSuggestionType"
                      }))
                      setSearchQuery({
                        id: item?._id,
                        suggestionType: item?.suggestionType.toUpperCase(),
                      });
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <span className="text-lg">
                        <GoLocation />
                      </span>
                      <p className=" flex justify-between w-full">
                        <span className="text-[15px] whitespace-nowrap">
                          {item?.cityName}
                        </span>
                        {item?.propertyCount ? (
                          <span className="text-[12px] text-gray-400">
                            ({item?.propertyCount})
                          </span>
                        ) : (
                          ""
                        )}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 text-[12px] pl-6">
                      <span className=" whitespace-nowrap">
                        {item?.stateName},
                      </span>
                      <span className=" whitespace-nowrap">
                        {item?.countryName}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            {(suggestions?.airports?.length > 0 && value.length > 2) ||
            (suggestions?.attractions?.length > 0 && value.length > 2) ||
            (suggestions?.hotels?.length > 0 && value.length > 2) ||
            (suggestions?.areas?.length > 0 && value.length > 2) ? (
              <>
                <div className="">
                  {suggestions?.airports?.length > 0 && (
                    <p className="test-xs text-gray-600 font-[700] pb-2">
                      Airports
                    </p>
                  )}
                  {suggestions?.airports?.map((item, i) => (
                    <div
                      key={i}
                      className=" py-2  cursor-pointer capitalize text-darktext z-30 border-t text-sm "
                      onClick={() => {
                        setLocality(item?._id);
                        setDatalist(!datalist);
                        setValue(
                          `${item?.airportName}, ${
                            item?.airportName ? item.airportName + "," : ""
                          } ${item.countryName}`
                        );
                        dispatch(setSearchTransfer({
                            value:item?._id, name:"pickupLocation"
                          }))
                          dispatch(setSearchTransfer({
                            value:item?.suggestionType, name:"pickupSuggestionType"
                          }))
                        setSearchQuery({
                          id: item?._id,
                          suggestionType: item?.suggestionType.toUpperCase(),
                        });
                      }}
                    >
                      {!isLoading ? (
                        <>
                          <div className="">
                            <div className="flex gap-1">
                              <span className="text-lg">
                                <GoLocation />
                              </span>
                              <p className=" flex justify-between w-full">
                                <span className="text-[15px] whitespace-nowrap">
                                  {item?.airportName}
                                </span>
                                {/* {item?.propertyCount ? (
                                  <span className="text-[12px] text-gray-400">
                                    ({item?.propertyCount})
                                  </span>
                                ) : (
                                  ""
                                )} */}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-1 items-center text-[12px] pl-6">
                              {item?.stateName ? (
                                <span className=" whitespace-nowrap">
                                  {item?.stateName},
                                </span>
                              ) : (
                                ""
                              )}
                              <span className=" whitespace-nowrap">
                                {item?.countryName}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className=" w-full flex justify-center items-center">
                          <BtnLoader />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="">
                  {suggestions?.areas?.length > 0 && (
                    <p className="test-xs text-gray-600 font-[700] pb-2">
                      Areas
                    </p>
                  )}
                  {suggestions?.areas?.map((item, i) => (
                    <div
                      key={item?.areaId}
                      className=" py-2  cursor-pointer capitalize text-darktext z-30 border-t text-sm "
                      onClick={() => {
                        setLocality(item?._id);
                        setDatalist(!datalist);
                        setValue(
                          `${item?.areaName}, ${item.cityName}, ${item.countryName}`
                        );
                        dispatch(setSearchTransfer({
                            value:item?._id, name:"pickupLocation"
                          }))
                          dispatch(setSearchTransfer({
                            value:item?.suggestionType, name:"pickupSuggestionType"
                          }))
                        setSearchQuery({
                          id: item?._id,
                          suggestionType: item?.suggestionType.toUpperCase(),
                        });
                      }}
                    >
                      {!isLoading ? (
                        <>
                          <div className="">
                            <div className="flex gap-1">
                              <span className="text-lg">
                                <GoLocation />
                              </span>
                              <p className=" flex justify-between w-full">
                                <span className="text-[15px] whitespace-nowrap">
                                  {item?.areaName}
                                </span>
                                {item?.propertyCount ? (
                                  <span className="text-[12px] text-gray-400">
                                    ({item?.propertyCount})
                                  </span>
                                ) : (
                                  ""
                                )}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-1 items-center text-[12px] pl-6">
                              <span className=" whitespace-nowrap">
                                {item?.cityName},
                              </span>
                              <span className=" whitespace-nowrap">
                                {item?.countryName}
                              </span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className=" w-full flex justify-center items-center">
                          <BtnLoader />
                        </div>
                      )}
                    </div>
                  ))}
                </div>


                

                <div className="">
                  {suggestions?.attractions?.length > 0 && (
                    <p className="test-xs text-gray-600 font-[700] pb-2">
                      Attractions
                    </p>
                  )}
                  {suggestions?.attractions?.map((item, i) => (
                    <div
                      key={i}
                      className=" py-3  cursor-pointer capitalize text-darktext z-30 border-t text-sm "
                      onClick={() => {
                        setLocality(item?.attractionId);
                        setDatalist(!datalist);
                        setValue(
                          `${item?.cityName}, ${item.stateName}, ${item.countryName}`
                        );
                        dispatch(setSearchTransfer({
                          value:item?.attractionId, name:"pickupLocation"
                        }));
                        dispatch(setSearchTransfer({
                          value:item?.suggestionType, name:"pickupSuggestionType"
                        }))
                        setSearchQuery({
                          id: item?.attractionId,
                          suggestionType: item?.suggestionType.toUpperCase(),
                        });
                      }}
                    >
                      {!isLoading ? (
                        <>
                          <div className="flex items-center gap-1">
                            <span className="text-lg">
                              {/* <FaBed /> */}
                            </span>
                            <span className="text-[15px] whitespace-nowrap">
                              {item?.attractionName}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 items-center text-[12px] pl-6">
                            <span className=" whitespace-nowrap">
                              {item?.cityName},
                            </span>
                            {item?.stateName ? (
                              <span className=" whitespace-nowrap">
                                {item?.stateName},
                              </span>
                            ) : (
                              ""
                            )}
                            <span className=" whitespace-nowrap ">
                              {item?.countryName}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className=" w-full flex justify-center items-center">
                          <BtnLoader />
                        </div>
                      )}
                    </div>
                  ))}
                </div>





                <div className="">
                  {suggestions?.hotels?.length > 0 && (
                    <p className="test-xs text-gray-600 font-[700] pb-2">
                      Hotels
                    </p>
                  )}
                  {suggestions?.hotels?.map((item, i) => (
                    <div
                      key={i}
                      className=" py-3  cursor-pointer capitalize text-darktext z-30 border-t text-sm "
                      onClick={() => {
                        setLocality(item?.hotelId);
                        setDatalist(!datalist);
                        setValue(
                          `${item?.hotelName}, ${item.cityName}, ${item.stateName}`
                        );
                        dispatch(setSearchTransfer({
                          value:item?.hotelId, name:"pickupLocation"
                        }));
                        dispatch(setSearchTransfer({
                          value:item?.suggestionType, name:"pickupSuggestionType"
                        }))
                        setSearchQuery({
                          id: item?.hotelId,
                          suggestionType: item?.suggestionType.toUpperCase(),
                        });
                      }}
                    >
                      {!isLoading ? (
                        <>
                          <div className="flex items-center gap-1">
                            <span className="text-lg">
                              {/* <FaBed /> */}
                            </span>
                            <span className="text-[15px] whitespace-nowrap">
                              {item?.hotelName}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 items-center text-[12px] pl-6">
                            <span className=" whitespace-nowrap">
                              {item?.cityName},
                            </span>
                            {item?.stateName ? (
                              <span className=" whitespace-nowrap">
                                {item?.stateName},
                              </span>
                            ) : (
                              ""
                            )}
                            <span className=" whitespace-nowrap ">
                              {item?.countryName}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className=" w-full flex justify-center items-center">
                          <BtnLoader />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            // ) : suggestions?.cities?.length === 0 &&
            ): suggestions?.airports?.length === 0 &&
              suggestions?.areas?.length === 0 &&
              value.length > 2 ? (
              <div className="">
                <div className=" w-full flex justify-center items-center text-xs text-gray-400">
                  No Query found with this data
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default TranferSuggesionLIst
