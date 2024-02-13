import React from 'react'
import { BtnLoader } from '../../components';
import { GoLocation } from "react-icons/go";
import { setSearchTransfer } from '../../../redux/slices/transferSlice';
import { useSelector, useDispatch } from 'react-redux';



function TransferToSuggestionList({
    toLocality,
    setToLocality,
    ToDatalist,
    setToDatalist,
    toSuggestions,
    toValue,
    setToValue,
    isToLoading,
    setToSearchQuery,
    ToSearchQuery
}) {

    const dispatch = useDispatch()
    const { formDatas } = useSelector((state)=> state.transfer)


  return (
<div>
      {ToDatalist && toValue?.length && (
        <div className="absolute max-h-[20em] w-[32em] mt-1 shadow border bg-light rounded-lg overflow-y-auto z-20">
          <div className="w-full p-5 overflow-y-auto">
            <div className="">
              { toSuggestions?.areas?.length > 0 && toValue?.length < 3 && (
                <p className="test-xs text-gray-600 font-[700] pb-2">
                  Top Destinations{" "}
                </p>
              )}
              {toValue.length < 3 &&
                toSuggestions?.areas?.map((item) => (
                  <div
                    key={item?._id}
                    className=" py-3  cursor-pointer capitalize text-darktext z-30 border-t text-sm "
                    onClick={() => {
                      setToLocality(item?._id);
                      setToDatalist(!ToDatalist);
                      setToValue(
                        `${item?.cityName}, ${item.stateName}, ${item.countryName}`
                      );
                      dispatch(setSearchTransfer({
                        value:item?._id, name:"dropOffLocation"
                      }))
                      dispatch(setSearchTransfer({
                        value:item?.suggestionType, name:"dropOffSuggestionType"
                      }))
                      setToSearchQuery({
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
            {(toSuggestions?.airports?.length > 0 && toValue.length > 2) ||
            (toSuggestions?.hotels?.length > 0 && toValue.length > 2) ||
            (toSuggestions?.attractions?.length > 0 && toValue.length > 2 )||
            (toSuggestions?.areas?.length > 0 && toValue.length > 2) ? (
              <>
                <div className="">
                  {toSuggestions?.airports?.length > 0 && (
                    <p className="test-xs text-gray-600 font-[700] pb-2">
                      Airports
                    </p>
                  )}
                  {toSuggestions?.airports?.map((item, i) => (
                    <div
                      key={i}
                      className=" py-2  cursor-pointer capitalize text-darktext z-30 border-t text-sm "
                      onClick={() => {
                        setToLocality(item?._id);
                        setToDatalist(!ToDatalist);
                        setToValue(
                          `${item?.airportName}, ${
                            item?.airportName ? item.airportName + "," : ""
                          } ${item.countryName}`
                        );
                        dispatch(setSearchTransfer({
                            value:item?._id, name:"dropOffLocation"
                          }))
                          dispatch(setSearchTransfer({
                            value:item?.suggestionType, name:"dropOffSuggestionType"
                          }))
                        setToSearchQuery({
                          id: item?.airportId,
                          suggestionType: item?.suggestionType.toUpperCase(),
                        });
                      }}
                    >
                      {!isToLoading ? (
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
                  {toSuggestions?.areas?.length > 0 && (
                    <p className="test-xs text-gray-600 font-[700] pb-2">
                      Areas
                    </p>
                  )}
                  {toSuggestions?.areas?.map((item, i) => (
                    <div
                      key={item?.areaId}
                      className=" py-2  cursor-pointer capitalize text-darktext z-30 border-t text-sm "
                      onClick={() => {
                        setToLocality(item?._id);
                        setToDatalist(!ToDatalist);
                        setToValue(
                          `${item?.areaName}, ${item.cityName}, ${item.countryName}`
                        );
                        dispatch(setSearchTransfer({
                            value:item?._id, name:"dropOffLocation"
                          }));
                          dispatch(setSearchTransfer({
                            value:item?.suggestionType, name:"dropOffSuggestionType"
                          }))
                        setToSearchQuery({
                          id: item?._id,
                          suggestionType: item?.suggestionType.toUpperCase(),
                        });
                      }}
                    >
                      {!isToLoading ? (
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
                  {toSuggestions?.attractions?.length > 0 && (
                    <p className="test-xs text-gray-600 font-[700] pb-2">
                      Attractions
                    </p>
                  )}
                  {toSuggestions?.attractions?.map((item, i) => (
                    <div
                      key={i}
                      className=" py-3  cursor-pointer capitalize text-darktext z-30 border-t text-sm "
                      onClick={() => {
                        setToLocality(item?.attractionId);
                        setToDatalist(!ToDatalist);
                        setToValue(
                          `${item?.areaName}, ${item.cityName}, ${item.countryName}`
                        );
                        dispatch(setSearchTransfer({
                            value:item?.attractionId, name:"dropOffLocation"
                          }));
                          dispatch(setSearchTransfer({
                            value:item?.suggestionType, name:"dropOffSuggestionType"
                          }))
                        setToSearchQuery({
                          id: item?.attractionId,
                          suggestionType: item?.suggestionType.toUpperCase(),
                        });
                      }}
                    >
                      {!isToLoading ? (
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
                  {toSuggestions?.hotels?.length > 0 && (
                    <p className="test-xs text-gray-600 font-[700] pb-2">
                      Hotels
                    </p>
                  )}
                  {toSuggestions?.hotels?.map((item, i) => (
                    <div
                      key={i}
                      className=" py-3  cursor-pointer capitalize text-darktext z-30 border-t text-sm "
                      onClick={() => {
                        setToLocality(item?.hotelId);
                        setToDatalist(!ToDatalist);
                        setToValue(
                          `${item?.areaName}, ${item.cityName}, ${item.countryName}`
                        );
                        dispatch(setSearchTransfer({
                            value:item?.hotelId, name:"dropOffLocation"
                          }));
                          dispatch(setSearchTransfer({
                            value:item?.suggestionType, name:"dropOffSuggestionType"
                          }))
                        setToSearchQuery({
                          id: item?.hotelId,
                          suggestionType: item?.suggestionType.toUpperCase(),
                        });
                      }}
                    >
                      {!isToLoading ? (
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
            ): toSuggestions?.airports?.length === 0 &&
            toSuggestions?.areas?.length === 0 &&
              toValue.length > 2 ? (
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

export default TransferToSuggestionList
