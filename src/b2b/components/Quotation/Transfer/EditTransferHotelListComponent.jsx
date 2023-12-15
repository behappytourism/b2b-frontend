import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { ImLocation2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { previewImage } from "../../../../static/imagesB2B";
import axios from "../../../../axios";
import {
  setTransferValues,
  setVehiclesInVehicleTypes,
  removeTransferFromRemoveButton
} from "../../../../redux/slices/quotationSlice";
import EditVehicleDropdown from "./EditVehicleDropdown";
import { config } from "../../../../constants";

function EditTransferHotelListComponent({
  hotel,
  stayIndex,
  hotelIndex,
  hotelLength,
  resultArray,
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [showTransfer, setShowTransfer] = useState(false);

  const { token } = useSelector((state) => state.agents);
  const { noOfChildren, noOfAdults, transfer } = useSelector(
    (state) => state.quotation
  );

  const onChangeHandler = ({ name, value }) => {
    dispatch(
      setTransferValues({
        stayIndex: stayIndex,
        hotelIndex: hotelIndex,
        name: name,
        value: value,
      })
    );
  };

  const fetchvehicles = async ({ transferFrom, transferTo, transferType }) => {
    try {
      setIsloading(true);
      setError("");
      const response = await axios.post(
        "/b2b/quotations/inital/transfer",
        {
          transferFrom: transferFrom,
          transferTo: transferTo,
          transferType: transferType,
          noOfPax: noOfAdults + noOfChildren,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setVehicles(response?.data);
      dispatch(
        setVehiclesInVehicleTypes({
          hotelIndex,
          stayIndex,
          value: response?.data,
        })
      );
      setIsloading(false);
    } catch (err) {
      console.log(err);
      setIsloading(false);
      setError(
        err?.response?.data?.error || "Something went wrong! try again.."
      );
    }
  };

  console.log(hotel);

  return (
    <>
      {hotelIndex !== hotelLength - 1 ? (
        <div className="border-b border-dashed">
          <div className="">
            <div className="flex gap-2 w-full p-4 ">
              <div className="grid md:flex gap-2  items-center w-full">
                <div className=" grid md:flex gap-2 items-center max-w-[40%] min-w-[40%] ">
                  <div className=" w-[80px] h-[80px] rounded-full overflow-hidden shadow-mn">
                    <img
                      src={
                        hotel?.hotelId && hotel?.hotelId.length > 0
                          ? hotel?.hotelData?.image?.isRelative
                            ? config.SERVER_URL +
                              hotel?.hotelData?.image?.path
                            : hotel?.hotelData?.image?.path
                          : "https://icon-library.com/images/landing-icon/landing-icon-25.jpg"
                      }
                      alt="img"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="left__section text-darktext space-y-2 ml-3">
                  <p className="text-[11px] font-semibold">From :</p>
                    <div className="flex flex-wrap items-center gap-1">
                      <h3 className="text-[15px] font-[650] text-[#495057]">
                        {hotel?.hotelId && hotel?.hotelId.length > 0
                          ? hotel?.hotelName
                          : hotel?.name}
                      </h3>
                      <div className="text-[13px] text-[#495057] font-[700] flex items-center gap-2">
                          <span className="">
                            <p className="text-base">
                              <ImLocation2 />
                            </p>
                          </span>
                          <span className="">
                            <p className="whitespace-nowrap">
                              {
                               hotel?.hotelId && hotel?.hotelId.length > 0 
                                ? "" : hotel?.name + " " +  hotel?.terminalName 
                              }
                            </p>
                          </span>
                        </div>
                    </div>
                    {hotel?.hotelId && hotel?.hotelId.length > 0 ? (
                      <>
                        <div className="flex gap-2">
                          <p className="flex items-center gap-1  text-xs font-[700] text-yellow-400">
                              {/* <span className="">
                                <AiFillStar />
                              </span>
                              <span className="">
                                {hotel?.starCategory + " star"}
                              </span> */}
                          </p>

                          <p className="text-[12px] font-[500]  text-gray-400">
                            {hotel?.placeName}
                          </p>
                        </div>
                        <div className="text-[13px] text-[#495057] font-[700] flex items-center gap-2">
                          <span className="">
                            {hotel?.hotelData?.state?.stateName ? (
                              <p className="text-base">
                                <ImLocation2 />
                              </p>
                            ) : (
                              ""
                            )}
                          </span>
                          <span className="">
                            <p className="whitespace-nowrap">
                              {hotel?.hotelData?.state?.stateName
                                ? hotel?.hotelData?.state?.stateName
                                : "" +
                                  "," +
                                  hotel?.hotelData?.country?.countryName
                                ? hotel?.hotelData?.country?.countryName
                                : ""}
                            </p>
                          </span>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="grid  md:flex md:min-w-[40%] md:max-w-[40%] w-[20%]  gap-2 items-center">
                  <div className="  w-[80px] h-[80px] rounded-full overflow-hidden shadow-mn">
                    <img
                      src={
                        resultArray[hotelIndex + 1]?.hotelId &&
                        resultArray[hotelIndex + 1]?.hotelId.length > 0
                          ? resultArray[hotelIndex + 1]?.hotelData?.image
                              ?.isRelative
                            ? config.SERVER_URL +
                              resultArray[hotelIndex + 1]?.hotelData?.image
                                ?.path
                            : resultArray[hotelIndex + 1]?.hotelData?.image
                                ?.path
                          : "https://e7.pngegg.com/pngimages/231/429/png-clipart-airplane-wing-silhouette-flight-aircraft-aircraft-airplane-flight.png"
                      }
                      alt="img"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="left__section text-darktext space-y-2 ml-3">
                    <div className="flex flex-wrap items-center gap-1">
                      <h3 className="text-[15px] font-[650] text-[#495057]">
                        {resultArray[hotelIndex + 1]?.hotelId &&
                        resultArray[hotelIndex + 1]?.hotelId.length > 0
                          ? resultArray[hotelIndex + 1]?.hotelName
                          : resultArray[hotelIndex + 1]?.name}
                      </h3>
                    </div>
                
                    <div className="text-[13px] text-[#495057] font-[700] flex items-center gap-2">
                          <span className="">
                            <p className="text-base">
                            {resultArray[hotelIndex + 1]?.hotelId &&
                             resultArray[hotelIndex + 1]?.hotelId.length > 0
                          ? ""
                          :  <ImLocation2/> }
                            </p>
                          </span>
                          <span className="">
                            <p className="whitespace-nowrap">
                            {resultArray[hotelIndex + 1]?.hotelId &&
                             resultArray[hotelIndex + 1]?.hotelId.length > 0
                          ? ""
                          : resultArray[hotelIndex + 1]?.name + " " +  resultArray[hotelIndex + 1]?.terminalName  }
                            </p>
                          </span>
                        </div>  
                    {resultArray[hotelIndex + 1]?.hotelId &&
                    resultArray[hotelIndex + 1]?.hotelId.length > 0 ? (
                      <>
                        <div className="flex gap-2">
                          <p className="flex items-center gap-1  text-xs font-[700] text-yellow-400">
                            {/* <span className="">
                              <AiFillStar />
                            </span>
                            <span className="">
                              {resultArray[hotelIndex + 1]?.starCategory +
                                " star"}
                            </span> */}
                          </p>

                          <p className="text-[12px] font-[500]  text-gray-400">
                            {resultArray[hotelIndex + 1]?.placeName}
                          </p>
                        </div>
                        <div className="text-[13px] text-[#495057] font-[700] flex items-center gap-2">
                          <span className="">
                            {resultArray[hotelIndex + 1]?.hotelData?.state
                              ?.stateName ? (
                              <p className="text-base">
                                <ImLocation2 />
                              </p>
                            ) : (
                              ""
                            )}
                          </span>
                          <span className="">
                            <p className="whitespace-nowrap">
                              {resultArray[hotelIndex + 1]?.hotelData?.state
                                ?.stateName
                                ? resultArray[hotelIndex + 1]?.hotelData?.state
                                    ?.stateName
                                : "" +
                                  "," +
                                  resultArray[hotelIndex + 1]?.hotelData
                                    ?.country?.countryName
                                ? resultArray[hotelIndex + 1]?.hotelData
                                    ?.country?.countryName
                                : ""}
                            </p>
                          </span>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

              {
                !transfer[stayIndex]?.stays[hotelIndex]?.vehicleTypes?.length ? (
                  <div>
                  <button
                    className=" text-[14px] font-[600] text-white shadow-sm w-[130px] py-2 bg-gradient-to-l from-blue-600 to-red-600 hover:from-red-600 hover:to-blue-600 rounded "
                    onClick={() => {
                      setShowTransfer(true);
                      if (hotel?.hotelId && hotel?.hotelId.length > 0) {
                        onChangeHandler({
                          name: "transferFrom",
                          value: hotel?.areaId,
                        });
                        onChangeHandler({
                          name: "transferFromName",
                          value: hotel?.hotelName,
                        });
                        onChangeHandler({
                          name:'transferFromId',
                          value:hotel?.hotelId
                        })
                      } else {
                        onChangeHandler({
                          name: "transferFrom",
                          value: hotel?.id,
                        });
                        onChangeHandler({
                          name: "transferFromName",
                          value: hotel?.name,
                        });
                        onChangeHandler({
                          name:'transferFromId',
                          value:hotel?.id
                        })
                      }
                      if (
                        resultArray[hotelIndex + 1]?.id &&
                        resultArray[hotelIndex + 1]?.id.length > 0
                      ) {
                        onChangeHandler({
                          name: "transferTo",
                          value: resultArray[hotelIndex + 1]?.id,
                        });
                        onChangeHandler({
                          name: "transferToName",
                          value: resultArray[hotelIndex + 1]?.name,
                        });
                        onChangeHandler({
                          name: "transferToId",
                          value: resultArray[hotelIndex + 1]?.id,
                        });
                      } else {
                        onChangeHandler({
                          name: "transferTo",
                          value: resultArray[hotelIndex + 1]?.areaId,
                        });
                        onChangeHandler({
                          name: "transferToName",
                          value: resultArray[hotelIndex + 1]?.hotelName,
                        });
                        onChangeHandler({
                          name: "transferToId",
                          value: resultArray[hotelIndex + 1]?.hotelId,
                        });
                      }
                      if (
                        hotel?.hotelId &&
                        hotel?.hotelId.length > 0 &&
                        resultArray[hotelIndex + 1]?.hotelId &&
                        resultArray[hotelIndex + 1]?.hotelId.length > 0
                      ) {
                        onChangeHandler({
                          name: "transferType",
                          value: "city-city",
                        });
                      } else if (
                        hotel?.hotelId &&
                        hotel?.hotelId.length > 0 &&
                        resultArray[hotelIndex + 1]?.id &&
                        resultArray[hotelIndex + 1]?.id.length > 0
                      ) {
                        onChangeHandler({
                          name: "transferType",
                          value: "city-airport",
                        });
                      } else if (
                        hotel?.id &&
                        hotel?.id.length > 0 &&
                        resultArray[hotelIndex + 1]?.hotelId &&
                        resultArray[hotelIndex + 1]?.hotelId.length > 0
                      ) {
                        onChangeHandler({
                          name: "transferType",
                          value: "airport-city",
                        });
                      }
                      fetchvehicles({
                        transferFrom:
                          hotel?.hotelId && hotel?.hotelId.length > 0
                            ? hotel?.areaId
                            : hotel?.id,
                        transferTo:
                          resultArray[hotelIndex + 1]?.id &&
                          resultArray[hotelIndex + 1]?.id.length > 0
                            ? resultArray[hotelIndex + 1]?.id
                            : resultArray[hotelIndex + 1]?.areaId,
                        transferType:
                          hotel?.areaId &&
                          hotel?.hotelId.length > 0 &&
                          resultArray[hotelIndex + 1]?.hotelId &&
                          resultArray[hotelIndex + 1]?.hotelId.length > 0
                            ? "city-city"
                            : hotel?.hotelId &&
                              hotel?.hotelId.length > 0 &&
                              resultArray[hotelIndex + 1]?.id &&
                              resultArray[hotelIndex + 1]?.id.length > 0
                            ? "city-airport"
                            : hotel?.id &&
                              hotel?.id.length > 0 &&
                              resultArray[hotelIndex + 1]?.hotelId &&
                              resultArray[hotelIndex + 1]?.hotelId.length > 0
                            ? "airport-city"
                            : "",
                      });
                    }}
                  >
                    ADD TRANSFER
                  </button>
                </div>
                ) : (
                  <div>
                    <button 
                    onClick={()=>{
                      dispatch(removeTransferFromRemoveButton({stayIndex: stayIndex, hotelIndex: hotelIndex}))
                      setShowTransfer(false)
                    }}
                    className=" text-[14px] font-[600] text-white shadow-sm w-[140px] py-2 bg-gradient-to-l from-blue-600 to-red-600 hover:from-red-600 hover:to-blue-600 rounded ">
                        Remove Transfer
                    </button>
                  </div>
                )
              }

              </div>
            </div>
          </div>
          {showTransfer && (
            <div className="bg-white  pb-6 first-letter:">
              {!error ? (
                <div>
                  {!isLoading ? (
                    <div className="flex items-start gap-[2em] mt-6 px-4">
                      <div className="grid md:grid-cols-3 gap-3 w-full">
                        {transfer?.length > 0 &&
                          transfer[stayIndex]?.stays[
                            hotelIndex
                          ]?.vehicleTypes?.map((vehicle) => {
                            if (
                              vehicle.hasOwnProperty("count") 
                            ) {
                              return (
                                <EditVehicleDropdown
                                  vehicle={vehicle}
                                  stayIndex={stayIndex}
                                  hotelIndex={hotelIndex}
                                />
                              );
                            }
                            return "";
                          })}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-[1.5em] w-full ">
                      <div className="pt-3">
                        <div className="w-24 mx-2 h-4 rounded bg-gray-300 animate-pulse "></div>
                        <div className="w-full mx-2 bg-gray-100 h-8 animate-pulse rounded my-2"></div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-sm text-red-400 font-[500] tracking-wider flex justify-center items-center py-3 capitalize">
                  {error}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default EditTransferHotelListComponent;
