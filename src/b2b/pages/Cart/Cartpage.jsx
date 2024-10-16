// import React, { useState } from 'react'
import { BsArrowDown, BsCart2 } from "react-icons/bs";
import { MdDiscount, MdOutlinePayment } from "react-icons/md";
import { FaPrint } from "react-icons/fa6";
import { FaBaby, FaChild } from "react-icons/fa";
import { BsDash, BsPersonFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { IoTimeOutline } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { CiCalendarDate, CiDiscount1 } from "react-icons/ci";
import { LiaSaveSolid } from "react-icons/lia";
import { useSelector, useDispatch } from "react-redux";
import { TiDelete } from "react-icons/ti";
import {
  deleteSelectedTransferInCart,
  clearSearchTransferTrips,
} from "../../../redux/slices/transferSlice";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { config } from "../../../constants";
import {
  setAlertError,
  setAlertSuccess,
} from "../../../redux/slices/homeSlice";
import { BtnLoader } from "../../components";
import ConfirmOtpModal from "../Transfer/ConfirmOtpModal";
import { removeFromCart } from "../../../redux/slices/agentExcursionSlice";
import priceConversion from "../../../utils/PriceConversion";
import { LiaEditSolid } from "react-icons/lia";
import nextId from "react-id-generator";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import {
  BiChevronRight,
  BiLeftArrow,
  BiSolidDiscount,
  BiXCircle,
} from "react-icons/bi";

function Cartpage() {
  // const { countries } = useSelector((state) => state.home);
  const { selectedCurrency } = useSelector((state) => state.home);
  const { agentExcursionCart } = useSelector((state) => state.agentExcursions);
  const { agentTransferCart } = useSelector((state) => state.transfer);
  const { countries } = useSelector((state) => state.home);
  const { token, agent } = useSelector((state) => state.agents);

  const unid =
    nextId(
      `${agent?.shortName || "BEH"}` + "-" + `${agent?.agentCode || ""}` + "-"
    ) + Math.floor(Math.random() * 1000);

  // const unid = `BEH_${agent?.agentCode || ""}`;

  // console.log(agent?.agentCode);
  // console.log(unid);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(0);

  const [details, setDetails] = useState({
    name: "",
    email: agent?.email,
    phoneNumber: agent?.phoneNumber,
    country: agent?.country?._id,
    paymentMethod: "wallet",
    countryCode: "+91",
    agentReferenceNumber: unid,
    isPromoCodeApplied: false,
    selectedJourneys: [],
    selectedActivities: [],
  });
  const [orderId, setOrderId] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [isCouponModal, setIsCouponModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const [coupons, setCoupons] = useState();
  const [couponResponse, setCouponResponse] = useState({});
  const [couponError, setCouponError] = useState({});

  // const fetchOfferCoupons = async () => {
  //   try {
  //     const res = await axios.get(`b2b/promo-code/list`, {
  //       headers: { authorization: `Bearer ${token}` },
  //     });
  //     if (res.status === 200) {
  //       setCoupons(res.data);
  //     }
  //   } catch (err) {
  //     if (err.response) {
  //       // console.error("Error response from the server:", err.response);
  //     } else {
  //       // console.error("An error occurred:", err.message);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   fetchOfferCoupons();
  // }, []);

  useEffect(() => {
    const cal = agentExcursionCart?.reduce((acc, data) => {
      return Number(acc) + Number(data?.price);
    }, 0);
    setPrice(cal);

    let sum = 0;
    if (agentExcursionCart?.length) {
      agentExcursionCart?.map((items) => {
        if (items.adultPrice && items.adult) {
          sum += items?.isB2bPromoCode
            ? (items?.adultPrice + items?.vat + items?.b2bPromoAmountAdult) *
              items?.adult
            : items?.adultPrice + items?.vat * items?.adult;
        }
        if (items?.childPrice && items.child) {
          sum += items?.isB2bPromoCode
            ? (items?.childPrice + items?.vat + items?.b2bPromoAmountChild) *
              items?.child
            : items?.childPrice + items?.vat * items?.child;
        }
        // if (items?.infantPrice && items?.infant) {
        //   sum += items?.infantPrice * items?.infant;
        // }
        // setPrice(items?.price);
      });
    }
  }, [agentExcursionCart]);

  useEffect(() => {
    let sum = 0;
    if (agentTransferCart?.length) {
      for (let i = 0; i < agentTransferCart?.length; i++) {
        for (let j = 0; j < agentTransferCart[i].journys.length; j++) {
          if (agentTransferCart[i].journys[j].selectedVehicleTypes.length) {
            for (
              let k = 0;
              k < agentTransferCart[i].journys[j].selectedVehicleTypes.length;
              k++
            ) {
              sum +=
                agentTransferCart[i].journys[j].selectedVehicleTypes[k].price;
            }
          }

          if (
            agentTransferCart[i].journys[j].selectedReturnVehicleTypes.length
          ) {
            for (
              let k = 0;
              k <
              agentTransferCart[i].journys[j].selectedReturnVehicleTypes.length;
              k++
            ) {
              sum +=
                agentTransferCart[i].journys[j].selectedReturnVehicleTypes[k]
                  .price;
            }
          }

          if (price) {
            sum = sum + price;
            setTotalPrice(sum);
          } else {
            setTotalPrice(sum);
          }
        }
      }
    }

    if (!agentTransferCart.length && agentExcursionCart.length) {
      sum += price;
      setTotalPrice(sum);
    }
  }, [agentTransferCart, totalPrice, price, agentExcursionCart]);

  // useEffect(()=>{
  //     if(agentTransferCart?.length < 1){
  //         navigate("/transfer")
  //         dispatch(clearSearchTransferTrips())

  //     }
  // }, [agentTransferCart])

  useEffect(() => {
    return () => {
      dispatch(clearSearchTransferTrips());
    };
  }, []);

  const handleDeleteVehicle = (vehicle, index) => {
    dispatch(deleteSelectedTransferInCart({ data: vehicle, index: index }));
  };

  const handleDetailsChanges = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  let data = [];
  let activityData = [];
  useEffect(() => {
    let transfers = {};
    if (
      details.name &&
      details.email &&
      details.phoneNumber &&
      details.country &&
      details.paymentMethod
    ) {
      if (agentTransferCart.length) {
        agentTransferCart.map((ele) => {
          ele?.journys.map((item) => {
            transfers = {
              dropOffLocation: item?.dropOffLocation,
              transferType: item?.transferType,
              pickupLocation: item?.pickupLocation,
              pickupSuggestionType: item?.pickupSuggestionType,
              dropOffSuggestionType: item?.dropOffSuggestionType,
              noOfAdults: item?.noOfAdults,
              noOfChildrens: item?.noOfChildrens,
              pickupDate: item?.pickupDate,
              pickupTime: item?.pickupTime,
              returnDate: item?.returnDate,
              returnTime: item?.returnTime,
              selectedVehicleTypes: [],
              selectedReturnVehicleTypes: [],
            };
            if (item?.selectedVehicleTypes.length) {
              let vehicle = {};
              for (let i = 0; i < item?.selectedVehicleTypes?.length; i++) {
                vehicle = {
                  vehicle: item?.selectedVehicleTypes[i].vehicle,
                  count: item?.selectedVehicleTypes[i].count,
                };
                transfers.selectedVehicleTypes.push(vehicle);
              }
            }

            if (item?.selectedReturnVehicleTypes.length) {
              let vehicle = {};
              for (
                let i = 0;
                i < item?.selectedReturnVehicleTypes?.length;
                i++
              ) {
                vehicle = {
                  vehicle: item?.selectedReturnVehicleTypes[i].vehicle,
                  count: item?.selectedReturnVehicleTypes[i].count,
                };
                transfers.selectedReturnVehicleTypes.push(vehicle);
              }
            }
            data.push(transfers);
          });
        });
      }

      let activities = {};
      if (agentExcursionCart?.length) {
        agentExcursionCart.map((item) => {
          activities = {
            activity: item?._id,
            date: item?.date,
            adultsCount: item?.adult,
            childrenCount: item?.child,
            infantCount: item?.infant,
            hoursCount: item?.hourCount ? item?.hourCount : "",
            transferType: item?.transfer,
            slot: item?.selectedTimeSlot,
            isPromoAdded: item?.isPromoAdded,
          };

          activityData.push(activities);
        });
      }
    }
    details.selectedJourneys = data;
    details.selectedActivities = activityData;
  }, [
    details.name &&
      details.email &&
      details.phoneNumber &&
      details.country &&
      details.paymentMethod,
    agentExcursionCart,
  ]);

  useEffect(() => {
    let transfers = {};

    if (agentTransferCart.length) {
      agentTransferCart.map((ele) => {
        ele?.journys.map((item) => {
          transfers = {
            dropOffLocation: item?.dropOffLocation,
            transferType: item?.transferType,
            pickupLocation: item?.pickupLocation,
            pickupSuggestionType: item?.pickupSuggestionType,
            dropOffSuggestionType: item?.dropOffSuggestionType,
            noOfAdults: item?.noOfAdults,
            noOfChildrens: item?.noOfChildrens,
            pickupDate: item?.pickupDate,
            pickupTime: item?.pickupTime,
            returnDate: item?.returnDate,
            returnTime: item?.returnTime,
            selectedVehicleTypes: [],
            selectedReturnVehicleTypes: [],
          };
          if (item?.selectedVehicleTypes.length) {
            let vehicle = {};
            for (let i = 0; i < item?.selectedVehicleTypes?.length; i++) {
              vehicle = {
                vehicle: item?.selectedVehicleTypes[i].vehicle,
                count: item?.selectedVehicleTypes[i].count,
              };
              transfers.selectedVehicleTypes.push(vehicle);
            }
          }

          if (item?.selectedReturnVehicleTypes.length) {
            let vehicle = {};
            for (let i = 0; i < item?.selectedReturnVehicleTypes?.length; i++) {
              vehicle = {
                vehicle: item?.selectedReturnVehicleTypes[i].vehicle,
                count: item?.selectedReturnVehicleTypes[i].count,
              };
              transfers.selectedReturnVehicleTypes.push(vehicle);
            }
          }
          data.push(transfers);
        });
      });
    }

    let activities = {};
    if (agentExcursionCart?.length) {
      agentExcursionCart.map((item) => {
        activities = {
          activity: item?._id,
          date: item?.date,
          adultsCount: item?.adult,
          childrenCount: item?.child,
          infantCount: item?.infant,
          hoursCount: item?.hourCount ? item?.hourCount : "",
          transferType: item?.transfer,
          slot: item?.selectedTimeSlot,
          isPromoAdded: item?.isPromoAdded,
        };

        activityData.push(activities);
      });
    }
  }, [agentExcursionCart, agentTransferCart]);

  const [countryCode, setCountryCode] = useState("");
  useEffect(() => {
    countries.map((ele) => {
      if (ele?._id === details.country) {
        setCountryCode(ele?.phonecode);
        details.countryCode = ele?.isocode;
      }
    });
  }, [details.country]);

  // handle create a transfer order
  const handleCreateTransferBooking = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`/b2b/orders/create`, details, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrderId(res.data.orderId);
      if (details.paymentMethod === "wallet") {
        setIsModal(true);
      }

      if (details.paymentMethod === "ccavenue") {
        const winUrl = URL.createObjectURL(
          new Blob([res.data], { type: "text/html" })
        );

        window.location.replace(winUrl);
      }

      setIsLoading(false);
    } catch (error) {
      dispatch(
        setAlertError({
          status: true,
          title: error?.response?.data?.error,
          text: error?.message,
        })
      );
      setIsLoading(false);
      console.log(error, "error response");
    }
  };

  const handleValidatingCoupon = async (code) => {
    const tripDetails = {
      selectedJourneys: details?.selectedJourneys,
      selectedActivities: details?.selectedActivities,
      promoCode: code,
    };
    try {
      setIsLoading(true);
      const res = await axios.post(
        `/b2b/promo-code/eligibilty/check`,
        tripDetails,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res?.status !== 200) {
        setCouponError(res?.data);
      }

      setCouponResponse(res?.data);

      setIsLoading(false);
      setIsCouponModal(false);
    } catch (error) {
      dispatch(
        setAlertError({
          status: true,
          title: error?.response?.data?.error,
          text: error?.message,
        })
      );
      setIsLoading(false);
      console.log(error, "error response");
    }
  };

  // console.log(couponResponse);

  // Define a function to format the date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${padZero(
      date.getMonth() + 1
    )}-${padZero(date.getDate())}`;
    return formattedDate;
  }

  // Define a function to pad zeros
  function padZero(num) {
    return num < 10 ? "0" + num : num;
  }

  const singleAttractionTotalCost = (items) => {
    let sum = 0;
    if (items.adultPrice && items.adult) {
      sum += items?.isB2bPromoCode
        ? (items?.adultPrice + items?.b2bPromoAmountAdult) * items?.adult
        : items?.adultPrice * items?.adult;
    }
    if (items?.childPrice && items.child) {
      sum += items?.isB2bPromoCode
        ? (items?.childPrice + items?.b2bPromoAmountChild) * items?.child
        : items?.childPrice * items?.child;
    }
    // if (items?.infantPrice && items?.infant) {
    //   sum += items?.infantPrice * items?.infant;
    // }

    let data = priceConversion(sum, selectedCurrency, true);

    return data;
  };

  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    let count = 0;
    if (agentExcursionCart.length) {
      count += agentExcursionCart.length;
    }

    if (agentTransferCart.length) {
      count += agentTransferCart.length;
    }

    setCartCount(count);
  }, [agentExcursionCart, agentTransferCart]);

  const backfunction = () => {
    window?.history?.back();
  };

  return (
    <div className="">
      <div className="md:p-5 md:flex md:justify-center p-3">
        <div
          onClick={() => backfunction()}
          className=" cursor-pointer w-28 flex md:justify-center md:items-center"
        >
          <div>
            <div className="flex justify-center">
              <h1 className="text-xl text-center">
                <BiLeftArrow />
              </h1>
            </div>
            <h1 className="text-xs text-center font-light">Back</h1>
          </div>
        </div>
        <div className="pt-10">
          <div className=" w-16 "></div>
        </div>
        <div className="hidden lg:flex justify-between bg-white p-5 w-[1200px] rounded-lg ">
          <div className="flex justify-evenly">
            <div
              className={`border-2 border-[#01b2bd]  bg-[#01b2bd] rounded-lg w-28 p-4 flex justify-center items-center`}
            >
              <div>
                <div className="flex justify-center">
                  <h1 className="text-xl text-center">
                    <BsCart2 color="white" />
                  </h1>
                </div>
                <h1 className="text-xs text-center font-light text-white">
                  Add To Cart
                </h1>
              </div>
            </div>
            <div className="pt-10 ">
              <div className={`border-t w-32 border-2 border-[#01b2bd]`}></div>
            </div>
            <div className="border rounded-lg w-28 p-4 flex justify-center items-center">
              <div>
                <div className="flex justify-center">
                  <h1 className="text-xl text-center">
                    <MdOutlinePayment />
                  </h1>
                </div>
                <h1 className="text-xs text-center font-light">Payment</h1>
              </div>
            </div>
            <div className="pt-10">
              <div className="border-t w-32 border border-black"></div>
            </div>
            <div className="border rounded-lg w-28 p-4 flex justify-center items-center">
              <div>
                <div className="flex justify-center">
                  <h1 className="text-xl text-center">
                    <FaPrint />
                  </h1>
                </div>
                <h1 className="text-xs text-center font-light">Print </h1>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-sm font-semibold">
              Currently, you have {cartCount} item(s) in your cart
            </h1>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => navigate("/")}
                className="text-end text-md text-orange-600"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid  xl:flex gap-5 justify-center ">
        <div className="">
          {/* {
                agentExcursionCart?.length > 0 || agentTransferCart?.length > 0 && (
                    <div>
                        <h1 className="text-lg font-bold">Cart Details</h1>
                    </div>
                )
            } */}

          {/* selected excursions  */}
          <div className="md:pt-3">
            {agentExcursionCart?.length > 0 ? (
              <div className="p-3 md:p-0">
                <div>
                  <h1 className="font-semibold text-2xl">Attraction</h1>
                </div>
                {agentExcursionCart?.map((item, index) => {
                  return (
                    <div key={index} className="pt-2">
                      <div className="border">
                        <div className="flex justify-end ">
                          <h1
                            className="text-2xl text-blue-500 cursor-pointer"
                            onClick={() => {
                              navigate(
                                `/attractions/details/${item?.attraction}`
                              );
                            }}
                          >
                            <LiaEditSolid />
                          </h1>
                          <h1
                            className="text-2xl text-red-500 cursor-pointer"
                            onClick={() => {
                              dispatch(removeFromCart(item?._id));
                              dispatch(
                                setAlertSuccess({
                                  status: true,
                                  title: "Removed from Cart!",
                                  text: "The selected item successfully removed from cart",
                                })
                              );
                            }}
                          >
                            <TiDelete />
                          </h1>
                        </div>
                        <div className="w-auto md:w-[800px] h-48 p-5">
                          <div className="flex justify-between">
                            <div className="">
                              <div>
                                <h1 className="text-md font-semibold">
                                  {item?.name}
                                </h1>
                                <p className="pt-1 text-sm font-light">
                                  Date : {item?.date}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                {item?.adult > 0 && (
                                  <div className="gap-1 flex  text-gray-600 py-1 px-1 rounded-md items-center">
                                    <span className="">{item?.adult}</span>
                                    <span className="">
                                      <BsPersonFill />{" "}
                                    </span>
                                    <span className="">
                                      {priceConversion(
                                        item?.isB2bPromoCode
                                          ? item?.adultPrice +
                                              item?.b2bPromoAmountAdult
                                          : item?.adultPrice,
                                        selectedCurrency,
                                        true
                                      )}
                                    </span>
                                  </div>
                                )}
                                {item?.child > 0 && (
                                  <div className="gap-1 flex  text-gray-600 py-1 px-1 rounded-md items-center">
                                    <span className="">{item?.child} </span>
                                    <span className="">
                                      <FaChild />
                                    </span>
                                    <span className="">
                                      {priceConversion(
                                        item?.isB2bPromoCode
                                          ? item?.childPrice +
                                              item?.b2bPromoAmountChild
                                          : item?.childPrice,
                                        selectedCurrency,
                                        true
                                      )}{" "}
                                    </span>
                                  </div>
                                )}
                                {item?.infant > 0 && (
                                  <div className="gap-1 flex  text-gray-600 py-1 px-1 rounded-md items-center">
                                    <span className="">{item?.infant}</span>
                                    <span className="">
                                      <FaBaby />{" "}
                                    </span>
                                    <span className="">
                                      {priceConversion(
                                        item?.infantPrice,
                                        selectedCurrency,
                                        true
                                      )}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="flex gap-1">
                                  <h1>Activity Type : </h1>
                                  <h1>{item?.activityType}</h1>
                                </div>
                                <div className="flex gap-1">
                                  <h1>Transfer : </h1>
                                  <h1>{item?.transfer}</h1>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <p className="text-xl font-semibold text-green-500 ">
                              {priceConversion(
                                item?.price,
                                selectedCurrency,
                                true
                              )}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
          {agentTransferCart?.length > 0 ? (
            <div
              className={`${
                !agentExcursionCart?.length ? "pt-1" : "pt-10"
              } p-3 md:p-0`}
            >
              <div>
                <h1 className="font-semibold text-2xl">Transfer</h1>
              </div>
              {agentTransferCart?.map((ele, index) => (
                <div key={index} className="mb-1 flex gap-2 pt-2">
                  {ele?.journys.map((item, i) => {
                    return (
                      <div
                        key={i}
                        className="w-full md:w-[800px] border bg-white"
                      >
                        <div className="flex justify-end ">
                          <button
                            onClick={() => handleDeleteVehicle(ele, index)}
                            className="text-red-500 text-xl"
                          >
                            <TiDelete />
                          </button>
                        </div>
                        <div className="p-5">
                          <div className="md:flex md:justify-between p-2 items-center">
                            <div>
                              <h1 className="text-sm font-bold">
                                {item?.pickupLocationName}
                              </h1>
                            </div>
                            <div className="md:hidden block">
                              {item?.transferType === "oneway" ? (
                                <div className="">
                                  <BsArrowDown />
                                </div>
                              ) : item?.transferType === "return" ? (
                                <div className="">
                                  {/* <FaArrowRightArrowLeft /> */}
                                  <FaArrowRight />
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div>
                              <h1 className="text-sm font-bold">
                                {item?.dropOffLocationName}
                              </h1>
                            </div>
                          </div>
                          <div className="md:flex hidden justify-between items-center gap-2">
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full border-2 border-orange-500"></div>
                            </div>
                            <div className="border-b  flex-grow relative">
                              {item?.transferType === "oneway" ? (
                                <div className="absolute top-1/2 transform -translate-y-1/2 right-80">
                                  <FaArrowRight />
                                </div>
                              ) : item?.transferType === "return" ? (
                                <div className="absolute top-1/2 transform -translate-y-1/2 right-80">
                                  {/* <FaArrowRightArrowLeft /> */}
                                  <FaArrowRight />
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full border-2 border-orange-500"></div>
                            </div>
                          </div>

                          {item?.transferType === "return" ? (
                            <div className="pt-3">
                              <div className="flex justify-between p-2 items-center">
                                <div>
                                  <h1 className="text-sm font-bold">
                                    {item?.dropOffLocationName}
                                  </h1>
                                </div>
                                <div>
                                  <h1 className="text-sm font-bold">
                                    {item?.pickupLocationName}
                                  </h1>
                                </div>
                              </div>
                              <div className="flex justify-between items-center gap-2">
                                <div className="flex items-center">
                                  <div className="w-2 h-2 rounded-full border-2 border-orange-500"></div>
                                </div>
                                <div className="border-b flex-grow relative">
                                  {item?.transferType === "oneway" ? (
                                    <div className="absolute top-1/2 transform -translate-y-1/2 right-80">
                                      <FaArrowRight />
                                    </div>
                                  ) : item?.transferType === "return" ? (
                                    <div className="absolute top-1/2 transform -translate-y-1/2 right-80 text-2xl">
                                      <HiOutlineArrowSmLeft />
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="flex items-center">
                                  <div className="w-2 h-2 rounded-full border-2 border-orange-500"></div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          <div className="flex gap-2 pt-2">
                            <div className="flex gap-1">
                              {item?.transferType === "oneway" ? (
                                <div>
                                  <div className="flex gap-1">
                                    <h1>
                                      <CiCalendarDate />
                                    </h1>
                                    <h1 className="text-xs">
                                      Date : {item?.pickupDate}
                                    </h1>
                                  </div>
                                </div>
                              ) : item?.transferType === "return" ? (
                                <div className="flex justify-between gap-3">
                                  <div className="flex gap-1">
                                    <h1>
                                      <CiCalendarDate />
                                    </h1>
                                    <h1 className="text-xs">
                                      Pickup Date: {item?.pickupDate}
                                    </h1>
                                  </div>
                                  <div className="flex gap-1">
                                    <h1>
                                      <IoTimeOutline />
                                    </h1>

                                    <h1 className="text-xs">
                                      Pickup Time: {item?.pickupTime}
                                    </h1>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}

                              {item?.transferType === "oneway" ? (
                                <div>
                                  <div className="flex gap-1">
                                    <h1>
                                      <IoTimeOutline />
                                    </h1>
                                    <h1 className="text-xs">
                                      Time : {item?.pickupTime}
                                    </h1>
                                  </div>
                                </div>
                              ) : item?.transferType === "return" ? (
                                <div className="flex justify-between gap-3">
                                  <div className="flex gap-1">
                                    <h1>
                                      <CiCalendarDate />
                                    </h1>
                                    <h1 className="text-xs">
                                      Return Date: {item?.returnDate}
                                    </h1>
                                  </div>
                                  <div className="flex gap-1">
                                    <h1>
                                      <IoTimeOutline />
                                    </h1>
                                    <h1 className="text-xs">
                                      Return Time: {item?.returnTime}
                                    </h1>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            {/* <div className='flex gap-1'>
                                                    <div>
                                                        <h1><IoTimeOutline /></h1>
                                                    </div>
                                                    <div>
                                                        <h1 className='text-xs'>Maximum waiting time: 60 minutes</h1>
                                                    </div>
                                                </div> */}
                          </div>
                          <div className="pt-3">
                            <div>
                              <h1 className="text-sm font-bold ">Vehicle's</h1>
                            </div>
                            {item?.transferType === "oneway" ? (
                              <div>
                                <div className="flex gap-4 pt-1 ">
                                  {item?.selectedVehicleTypes?.map(
                                    (vehicle) => {
                                      return (
                                        <div
                                          key={vehicle?._id}
                                          className=" border p-2  w-32"
                                        >
                                          <h1 className="text-sm text-center">
                                            {vehicle?.vehicleName}
                                          </h1>
                                          <h1 className="text-sm text-center">
                                            Count : {vehicle?.count}
                                          </h1>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                                {item?.selectedVehicleTypes?.map((pr, nn) => {
                                  let sum = 0;
                                  for (
                                    let i = 0;
                                    i < item?.selectedVehicleTypes.length;
                                    i++
                                  ) {
                                    sum += item?.selectedVehicleTypes[i].price;
                                  }
                                  return (
                                    <div className="flex justify-end">
                                      {nn === 0 && (
                                        <h1 className="text-xl font-semibold text-green-500">
                                          {priceConversion(
                                            sum,
                                            selectedCurrency,
                                            true
                                          )}
                                        </h1>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : item?.transferType === "return" ? (
                              <div>
                                <div className="flex gap-4">
                                  {item?.selectedVehicleTypes?.map(
                                    (vehicle, ind) => {
                                      return (
                                        <div key={ind} className="">
                                          <div className="border p-2 w-32 ">
                                            <h1 className="text-sm text-center">
                                              {vehicle?.vehicleName}
                                            </h1>
                                            <h1 className="text-sm text-center">
                                              Count : {vehicle?.count}
                                            </h1>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                                <div className="pt-4">
                                  <div>
                                    <h1 className="font-bold text-sm">
                                      Return Vehicles
                                    </h1>
                                  </div>
                                  <div className="flex gap-4">
                                    {item?.selectedReturnVehicleTypes?.map(
                                      (revehicle, ii) => {
                                        return (
                                          <div
                                            key={ii}
                                            className="border p-2 w-32"
                                          >
                                            <h1 className="text-sm text-center">
                                              {revehicle?.vehicleName}
                                            </h1>
                                            <h1 className="text-sm text-center">
                                              Count : {revehicle?.count}
                                            </h1>
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                </div>
                                {item?.selectedVehicleTypes.map((pr, nn) => {
                                  let sum = 0;
                                  for (
                                    let i = 0;
                                    i < item?.selectedVehicleTypes.length;
                                    i++
                                  ) {
                                    sum += item?.selectedVehicleTypes[i].price;
                                  }
                                  if (item?.selectedReturnVehicleTypes.length) {
                                    for (
                                      let j = 0;
                                      j <
                                      item?.selectedReturnVehicleTypes.length;
                                      j++
                                    ) {
                                      sum +=
                                        item?.selectedReturnVehicleTypes[j]
                                          .price;
                                    }
                                  }
                                  return (
                                    <div className="flex justify-end">
                                      {nn === 0 && (
                                        <h1 className="text-xl font-semibold text-green-500">
                                          {priceConversion(
                                            sum,
                                            selectedCurrency,
                                            true
                                          )}
                                        </h1>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>

        {agentExcursionCart.length < 1 && agentTransferCart.length < 1 ? (
          <div className="pt-20">
            <div className="w-52 h-52">
              <img
                src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png"
                alt=""
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">Your Cart is empty...</h1>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex justify-center md:p-0">
          <div className="p-3 md:p-0">
            {agentTransferCart?.length > 0 || agentExcursionCart?.length > 0 ? (
              <>
                <div className="pt-14">
                  <div className="bg-white shadow-sm p-5 w-96 md:w-[550px] border">
                    {/* <form onSubmit={handleCreateTransferBooking}> */}
                    <div>
                      <h1 className="text-xl font-bold">
                        Lead Passenger Details
                      </h1>
                    </div>
                    <div className="grid md:grid-cols-2 gap-2 pt-3">
                      <div>
                        <div className="text-sm">
                          <label>Agent Reference Number</label>
                        </div>
                        <div>
                          <input
                            name="agentReferenceNumber"
                            value={details.agentReferenceNumber}
                            onChange={handleDetailsChanges}
                            type="text"
                            className="outline-none bg-slate-100 w-full h-10 rounded p-2 placeholder:text-gray-300 placeholder:text-sm"
                            placeholder="Agent Reference"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm">
                          <label>Name</label>
                        </div>
                        <div>
                          <input
                            name="name"
                            value={details.name}
                            onChange={handleDetailsChanges}
                            type="text"
                            className="outline-none bg-slate-100 w-full h-10 rounded p-2 placeholder:text-gray-300 placeholder:text-sm"
                            placeholder="Full name"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm">
                          <label>Email</label>
                        </div>
                        <div>
                          <input
                            value={details.email}
                            name="email"
                            onChange={handleDetailsChanges}
                            type="text"
                            className="outline-none bg-slate-100 w-full h-10 rounded p-2 placeholder:text-gray-300 placeholder:text-sm"
                            placeholder="example@gmail.com"
                          />
                        </div>
                      </div>

                      <div className="">
                        <div className="text-sm">
                          <label>Country</label>
                        </div>
                        <div>
                          <select
                            value={details?.country}
                            onChange={handleDetailsChanges}
                            name="country"
                            className="outline-none bg-slate-100 w-full h-10 rounded p-2 "
                            id=""
                          >
                            {countries?.map((ele) => (
                              <option value={ele?._id}>
                                {ele?.countryName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        <div>
                          <div>
                            <label className="text-sm" htmlFor="">
                              Code
                            </label>
                          </div>
                          <div>
                            <input
                              className="outline-none bg-slate-100 w-14 h-10 rounded p-2 placeholder:text-gray-300 placeholder:text-sm"
                              type="text"
                              value={countryCode ? countryCode : ""}
                              disabled
                              placeholder="Code"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm">Phone Number</label>
                          <input
                            name="phoneNumber"
                            value={details.phoneNumber}
                            onChange={handleDetailsChanges}
                            type="phone"
                            className="outline-none bg-slate-100 w-full h-10 rounded p-2 placeholder:text-gray-300 placeholder:text-sm"
                            placeholder="Phone number"
                          />
                        </div>
                      </div>
                    </div>
                    {/* <div className='flex justify-end pt-5'>
                                        <button className='w-32 bg-orange-500 h-10 text-white font-bold rounded '>Submit</button>
                                    </div> */}
                    {/* </form> */}
                  </div>
                </div>

                <div></div>
                <div className="pt-3">
                  <div className=" rounded-t-xl w-full h-80 mb-3 bg-white">
                    <div className="">
                      <div className="flex gap-1 xl:justify-center items-center mb-2  h-12 rounded-t-xl">
                        <h1 className="text-green-900 text-3xl">
                          <IoIosCheckmarkCircleOutline />
                        </h1>
                        <h1 className="text-xl xl:text-center font-bold">
                          Payment Methods
                        </h1>
                      </div>
                    </div>

                    {/* <div
                      onClick={() => setIsCouponModal(true)}
                      className="flex gap-3 items-center text-center w-full justify-center"
                    >
                      <div className="flex min-w-[300px] cursor-pointer hover:bg-gray-100/50 bg-gray-100 py-3 px-8 rounded-2xl justify-between items-center text-center">
                        <div className="flex gap-2 items-center text-center">
                          <MdDiscount color="blue" />
                          {" "}
                          {couponResponse?.discountAmount && (
                            <>
                              {couponResponse?.promoCode}
                            </>
                          )}
                          {!couponResponse?.discountAmount && (
                            <>
                            <p className="font-semibold">Use Coupons</p>
                            </>
                          )}
                        </div>
                        <BiChevronRight color="blue" />
                      </div>
                    </div> */}

                    {/* {isCouponModal === true && (
                      <div className="fixed w-full h-full z-50 left-0 top-0 backdrop-blur-xl bg-opacity-30 bg-black">
                        <div className="flex w-full justify-center">
                          <div
                            onClick={() => setIsCouponModal(false)}
                            className="absolute md:top-[110px]  top-[60px] md:right-[260px] right-[20px] bg-white rounded-full cursor-pointer"
                          >
                            <BiXCircle height={40} width={40} />
                          </div>
                          <div className="bg-white md:mt-[80px] mt-[120px] m-5 md:m-0 md:min-w-[500px] md:max-w-[600px] px-10 text-center  max-h-[550px] overflow-x-auto py-5 rounded-xl shadow-2xl">
                            <p className="text-lg font-semibold underline ">
                              Coupons
                            </p>
                            <p className="text-left pb-2 font-semibold text-xs">
                              Best coupons for you
                            </p>

                            <div>
                              {coupons?.map((coupon, index) => (
                                <div className=" gap-3 items-center border mb-5 p-3 rounded-xl text-center w-full">
                                  <div className="flex mb-3 justify-between w-full">
                                    <div className="w-full  flex flex-col justify-start">
                                      <div className="flex font-bold gap-1 items-center text-center">
                                        <p className=" capitalize">
                                          {coupon?.type}
                                        </p>
                                        <p className="">{coupon?.value}</p>
                                      </div>
                                      <div className="flex gap-1 items-center text-center">
                                        <p className="text-xs">Use code</p>
                                        <p className="font-bold">
                                          {coupon?.code}
                                        </p>
                                      </div>
                                    </div>

                                    <button
                                      onClick={() =>
                                        handleValidatingCoupon(coupon?.code)
                                      }
                                      className="bg-[#01b2bd] text-xs text-white font-normal px-4 rounded-2xl"
                                    >
                                      Apply
                                    </button>
                                  </div>

                                  <div className="text-left">
                                    <ul className="">
                                      <li className=" text-sm mb-3">
                                        &#8226; Applicable on{" "}
                                        {coupon?.product?.join(", ")}
                                      </li>
                                    </ul>

                                    <ul className="">
                                      <li className=" text-sm mb-3">
                                        &#8226; Minimum Purchase Value{" "}                                     
                                        {priceConversion(
                                coupon?.minPurchaseValue,
                                selectedCurrency,
                                true
                              )}
                                      </li>
                                    </ul>

                                    {coupon?.fromValidity === null &&
                                      coupon?.toValidity === null && (
                                        <ul className="">
                                          <li className=" text-sm mb-3">
                                            &#8226; Valid till lifetime
                                          </li>
                                        </ul>
                                      )}

                                    {coupon?.fromValidity !== null &&
                                      coupon?.toValidity !== null && (
                                        <ul className="">
                                          <li className="text-sm mb-3">
                                            &#8226; Valid from{" "}
                                            {formatDate(coupon.fromValidity)}{" "}
                                            till {formatDate(coupon.toValidity)}
                                          </li>
                                        </ul>
                                      )}
                                  </div>

                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )} */}

                    <div className=" w-full h-28 flex xl:justify-center items-center ">
                      <div className="">
                        <h1 className="text-lg flex justify-center">
                          <LiaSaveSolid />
                        </h1>
                        <h1 className="text-xs text-gray-400 text-center">
                          Total price
                        </h1>
                        {details.paymentMethod === "wallet" && (
                          <h1 className="text-black font-bold text-3xl">
                            {" "}
                            {/* {couponResponse?.discountAmount && (
                            <>
                              {priceConversion(
                                totalPrice - couponResponse?.discountAmount,
                                selectedCurrency,
                                true
                              )}
                            </>
                          )} */}
                            {/* {!couponResponse?.discountAmount && (
                            <> */}
                            {priceConversion(
                              totalPrice,
                              selectedCurrency,
                              true
                            )}
                            {/* </>
                          )} */}
                          </h1>
                        )}

                        {details.paymentMethod === "ccavenue" && (
                          <h1 className="text-black font-bold text-3xl">
                            {" "}
                            {/* {couponResponse?.discountAmount && (
                            <>
                              {priceConversion(
                                totalPrice - couponResponse?.discountAmount,
                                selectedCurrency,
                                true
                              )}
                            </>
                          )} */}
                            {/* {!couponResponse?.discountAmount && (
                            <> */}
                            {priceConversion(
                              totalPrice * 1.027,
                              selectedCurrency,
                              true
                            )}
                            {/* </>
                          )} */}
                          </h1>
                        )}
                      </div>
                    </div>

                    <div className="">
                      <div className=" w-full h-auto ">
                        <div className=" flex xl:justify-center place-items-center">
                          <div className="">
                            <div className=" w-full h-10">
                              {/* <div className='text-xl font-bold'>
                                                <label >Payment Method</label>
                                            </div> */}
                              <div className="flex  gap-3">
                                <div className="flex gap-1">
                                  <div className="pt-1">
                                    <input
                                      checked={
                                        details.paymentMethod === "wallet"
                                      }
                                      className="w-4 h-4 "
                                      onChange={handleDetailsChanges}
                                      value={"wallet"}
                                      name="paymentMethod"
                                      type="radio"
                                    />
                                  </div>
                                  <label className="text-lg font-semibold ">
                                    Wallet
                                  </label>
                                </div>
                                <div className="flex gap-1">
                                  <div className="pt-1">
                                    <input
                                      checked={
                                        details.paymentMethod === "ccavenue"
                                      }
                                      className="w-4 h-4 "
                                      onChange={handleDetailsChanges}
                                      value={"ccavenue"}
                                      name="paymentMethod"
                                      type="radio"
                                    />
                                  </div>
                                  <label className="text-lg font-semibold">
                                    Online Payment
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center lg:justify-end items-end">
                          {details.name &&
                            details.email &&
                            details.phoneNumber &&
                            details.country &&
                            details.paymentMethod && (
                              <div className="pt-8">
                                {!isLoading ? (
                                  <button
                                    onClick={() =>
                                      handleCreateTransferBooking()
                                    }
                                    className="bg-orange-500 text-white w-44 h-10 rounded text-lg font-medium"
                                  >
                                    Confirm & Pay
                                  </button>
                                ) : (
                                  <button className="bg-orange-500 text-white w-60 h-10 rounded text-lg font-medium">
                                    <BtnLoader />
                                  </button>
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {isModal && (
        <div>
          <ConfirmOtpModal
            details={details}
            orderId={orderId}
            setIsModal={setIsModal}
          />
        </div>
      )}
    </div>
  );
}

export default Cartpage;
