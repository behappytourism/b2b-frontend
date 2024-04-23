import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCartSingleItem,
  setActivities,
  setSelectionArray,
} from "../../../redux/slices/agentExcursionSlice";
import { BsCartPlus } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import priceConversion from "../../../utils/PriceConversion";
import SlotBookingComponent from "../../components/BurjKhalifa/SlotBookingComponent";
import { setAlertSuccess } from "../../../redux/slices/homeSlice";
import { config } from "../../../constants";
import ImagePreviewModal from "./ImagePreviewModal";
import TermsConditionModal from "./TermsConditionModal";

function ActivityComponent({ item, index }) {

  const [price, setPrice] = useState(0);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);
  const [preview, setPreview] = useState();
  const [termsModals, setTermsModals] = useState(false);
  const [data, setData] = useState("");
  const [headings, setHeadings] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { agentRecievedActivities, agentExcursion } = useSelector(
    (state) => state.agentExcursions
  );
  const { selectedCurrency } = useSelector((state) => state.home);

  const handleChange = ({ value, name, index }) => {
    dispatch(
      setActivities({
        value,
        name,
        index,
      })
    );
  };

  function isObjectEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  useEffect(() => {
    let array = [];
    let sum = 0;

    if (item?.selectedTimeSlot && !isObjectEmpty(item?.selectedTimeSlot)) {
      sum =
        Number(item?.selectedTimeSlot?.AdultPrice) * Number(item?.adult) +
        Number(item?.selectedTimeSlot?.ChildPrice) * Number(item?.child) +
        Number(item?.infantPrice) * Number(item?.infant);
    } else if (item?.transfer === "without" && item?.base === "hourly") {
      sum = Number(item?.hourCount) * Number(item?.hourlyPrice);
    } else if (item?.base !== "hourly") {
      sum =
        item?.adultPrice * Number(item?.adult) +
        item?.childPrice * Number(item?.child) +
        item?.infantPrice * Number(item?.infant);
    }

    let totalTravellers = Number(item?.adult) + Number(item?.child);

    if (item?.transfer === "private") {
      let totalPrice = 0;
      if (item?.privateTransfers?.length !== 0) {
        let priceList = [...item?.privateTransfers];
        priceList = priceList?.sort((a, b) => {
          return a.maxCapacity - b.maxCapacity;
        });
        while (totalTravellers > 0) {
          for (let x = 0; x < priceList.length; x++) {
            if (x === 0) {
              if (
                totalTravellers > 0 &&
                totalTravellers <= priceList[x].maxCapacity
              ) {
                totalPrice = totalPrice + priceList[x].price;
                totalTravellers = totalTravellers - priceList[x].maxCapacity;
                array = [...array, priceList[x]];
                break;
              }
            } else {
              if (
                totalTravellers <= priceList[x].maxCapacity &&
                totalTravellers > priceList[x - 1].maxCapacity
              ) {
                totalPrice = totalPrice + priceList[x].price;
                totalTravellers = totalTravellers - priceList[x].maxCapacity;
                array = [...array, priceList[x]];
                break;
              }
            }
            if (x === priceList.length - 1) {
              totalPrice = totalPrice + priceList[x].price;
              totalTravellers = totalTravellers - priceList[x].maxCapacity;
              array = [...array, priceList[x]];
            }
          }
        }
        if (item?.activityType === "normal") {
          totalPrice += sum;
        }

        if (item?.base === "hourly") {
          setPrice(totalPrice * Number(item?.hourCount));
          dispatch(
            setActivities({
              value: totalPrice * Number(item?.hourCount),
              name: "price",
              index,
            })
          );
          dispatch(
            setActivities({
              value: totalPrice * Number(item?.hourCount),
              name: "priceWithoutPromo",
              index,
            })
          );
        } else {
          setPrice(totalPrice);
          dispatch(
            setActivities({
              value: totalPrice,
              name: "price",
              index,
            })
          );
          dispatch(
            setActivities({
              value: totalPrice,
              name: "priceWithoutPromo",
              index,
            })
          );
        }
        dispatch(
          setActivities({
            value: array,
            name: "vehicle",
            index,
          })
        );
      }
      if (item?.isB2bPromoCode) {
        dispatch(
          setActivities({
            value: true,
            name: "isPromoAdded",
            index,
          })
        );
        let val =
          Number(totalPrice) +
          (Number(item.adult) * Number(item?.b2bPromoAmountAdult) +
            Number(item.child) * Number(item?.b2bPromoAmountChild));
        dispatch(
          setActivities({
            value: Number(val),
            name: "priceWithoutPromo",
            index,
          })
        );
        setPrice(val);
        dispatch(
          setActivities({
            value: Number(totalPrice),
            name: "price",
            index,
          })
        );
        dispatch(
          setActivities({
            value:
              Number(item.adult) * Number(item?.b2bPromoAmountAdult) +
              Number(item.child) * Number(item?.b2bPromoAmountChild),
            name: "appliedPromoAmountB2b",
            index,
          })
        );
      }
    } else if (item?.transfer === "shared") {
      if (item?.activityType === "normal") {
        sum += Number(totalTravellers) * item?.sharedTransferPrice;
      } else {
        sum = Number(totalTravellers) * item?.sharedTransferPrice;
      }

      if (item?.base === "hourly") {
        setPrice(sum * Number(item?.hourCount));
        dispatch(
          setActivities({
            value: sum * Number(item?.hourCount),
            name: "price",
            index,
          })
        );
        dispatch(
          setActivities({
            value: sum * Number(item?.hourCount),
            name: "priceWithoutPromo",
            index,
          })
        );
      } else {
        setPrice(sum);
        dispatch(
          setActivities({
            value: sum,
            name: "price",
            index,
          })
        );
        dispatch(
          setActivities({
            value: sum,
            name: "priceWithoutPromo",
            index,
          })
        );
      }
      if (item?.isB2bPromoCode) {
        dispatch(
          setActivities({
            value: true,
            name: "isPromoAdded",
            index,
          })
        );
        let val =
          Number(sum) +
          (Number(item.adult) * Number(item?.b2bPromoAmountAdult) +
            Number(item.child) * Number(item?.b2bPromoAmountChild));
        dispatch(
          setActivities({
            value: Number(val),
            name: "priceWithoutPromo",
            index,
          })
        );
        setPrice(val);
        dispatch(
          setActivities({
            value: Number(sum),
            name: "price",
            index,
          })
        );
        dispatch(
          setActivities({
            value:
              Number(item.adult) * Number(item?.b2bPromoAmountAdult) +
              Number(item.child) * Number(item?.b2bPromoAmountChild),
            name: "appliedPromoAmountB2b",
            index,
          })
        );
      }
    } else if (item?.transfer === "without") {
      setPrice(sum);
      dispatch(
        setActivities({
          value: sum,
          name: "price",
          index,
        })
      );
      dispatch(
        setActivities({
          value: sum,
          name: "priceWithoutPromo",
          index,
        })
      );
      if (item?.isB2bPromoCode) {
        dispatch(
          setActivities({
            value: true,
            name: "isPromoAdded",
            index,
          })
        );
        let val =
          Number(sum) +
          (Number(item.adult) * Number(item?.b2bPromoAmountAdult) +
            Number(item.child) * Number(item?.b2bPromoAmountChild));
        dispatch(
          setActivities({
            value: Number(val),
            name: "priceWithoutPromo",
            index,
          })
        );
        setPrice(val);
        dispatch(
          setActivities({
            value: Number(sum),
            name: "price",
            index,
          })
        );
        dispatch(
          setActivities({
            value:
              Number(item.adult) * Number(item?.b2bPromoAmountAdult) +
              Number(item.child) * Number(item?.b2bPromoAmountChild),
            name: "appliedPromoAmountB2b",
            index,
          })
        );
      }
    }

    // if (item?.isB2bPromoCode) {
    //   dispatch(
    //     setActivities({
    //       value: true,
    //       name: "isPromoAdded",
    //       index,
    //     })
    //   );
    //   console.log(sum, "sum");
    //   let val =
    //     Number(sum) +
    //     (Number(item.adult) * Number(item?.b2bPromoAmountAdult) +
    //       Number(item.child) * Number(item?.b2bPromoAmountChild));
    //   dispatch(
    //     setActivities({
    //       value: Number(val),
    //       name: "priceWithoutPromo",
    //       index,
    //     })
    //   );
    //   setPrice(val);
    //   console.log(price);
    //   dispatch(
    //     setActivities({
    //       value: Number(sum),
    //       name: "price",
    //       index,
    //     })
    //   );
    //   dispatch(
    //     setActivities({
    //       value:
    //         Number(item.adult) * Number(item?.b2bPromoAmountAdult) +
    //         Number(item.child) * Number(item?.b2bPromoAmountChild),
    //       name: "appliedPromoAmountB2b",
    //       index,
    //     })
    //   );
    // }
  }, [
    item?.adult,
    item?.child,
    item?.infant,
    item?.transfer,
    item?.hourCount,
    dispatch,
  ]);

  useEffect(() => {
    let uniqueArray = [];
    let uniqueObj = {};
    let data = item?.vehicle;
    for (let i in data) {
      let id = data[i]["_id"];
      uniqueObj[id] = data[i];
    }

    // unique object of array
    for (let i in uniqueObj) {
      uniqueArray.push(uniqueObj[i]);
    }

    let resultArray = [];
    for (let i = 0; i < uniqueArray.length; i++) {
      let first = [];
      for (let j = 0; j < data.length; j++) {
        if (uniqueArray[i]._id === data[j]._id) {
          first.push(data[j]);
        }
      }
      let res = { ...first[0], length: first.length };
      resultArray.push(res);
    }
    dispatch(
      setActivities({
        value: resultArray,
        name: "selectedVehicle",
        index,
      })
    );
  }, [
    item?.vehicle,
    item?.adult,
    item?.child,
    item?.infant,
    item?.transfer,
    dispatch,
  ]);
  useEffect(() => {
    if (item?.activityType !== "transfer") {
      dispatch(
        setActivities({
          value: "without",
          name: "transfer",
          index,
        })
      );
    } else if (item?.isPrivateTransferAvailable && item.privateTransfers) {
      dispatch(
        setActivities({
          value: "private",
          name: "transfer",
          index,
        })
      );
    } else if (item?.isSharedTransferAvailable && item.sharedTransferPrice) {
      dispatch(
        setActivities({
          value: "shared",
          name: "transfer",
          index,
        })
      );
    }
  }, []);

  useEffect(() => {
    const result = agentRecievedActivities?.filter(
      (item) => item?.isChecked === true
    );
    localStorage.setItem("tour_order", JSON.stringify(result));
    dispatch(setSelectionArray(result));
  }, [agentRecievedActivities, dispatch]);

  let date = new Date();
  let dd = agentExcursion?.bookingPriorDays
    ? String(
        date.getDate() + Number(agentExcursion?.bookingPriorDays)
      ).padStart(2, "0")
    : String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0");
  let yyyy = date.getFullYear();
  const res = yyyy + "-" + mm + "-" + dd;

  const carting = (item) => {
    if (item?.adult === 0 && item?.child === 0) {
      setError("You should select atleast one adult or a child.");
      return;
    }
    if (item?.date?.length > 0) {
      setError("");
      dispatch(addToCartSingleItem(item));
      dispatch(
        setAlertSuccess({
          status: true,
          title: "Added to cart!",
          text: "The item you selected is added into cart",
        })
      );
    } else {
      setError("You date Invalid or No date found");
      return;
    }
  };


  return (
    <div
      className={`text-black w-full h-auto xl:h-[330px] shadow-md border border-orange-300 rounded-lg mb-4 cursor-pointer overflow-hidden`}
    >
     
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-1 md:gap-4">
        <div className="w-full h-full xl:h-[330px] row-span-2">
          <img
            onClick={() => {
              setModal(!modal);
              setPreview(item?.images);
            }}
            className="w-full h-full object-cover rounded-l-lg "
            src={
              item?.images?.length ? config.SERVER_URL + item?.images[0] : ""
            }
            alt="activity "
          />
        </div>

        <div className="w-full py-5 p-2  h-full">
          <h1 className="text-2xl font-semibold mb-2">{item?.name}</h1>

          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: item?.description?.slice(0, 100) + "...",
              }}
            ></div>
            {item?.description?.length > 300 ? (
              <button
                onClick={() => {
                  setData(item?.description);
                  setHeadings("Description");
                  setTermsModals(!termsModals);
                }}
                className="text-blue-500 text-sm"
              >
                View More
              </button>
            ) : (
              ""
            )}
          </div>

          <div className="grid lg:flex gap-3 pt-4">
            {item?.overview ? (
              <button
                className="text-black p-1 rounded text-xs bg-sky-300"
                onClick={() => {
                  setData(item?.overview);
                  setHeadings("Overview");
                  setTermsModals(!termsModals);
                }}
              >
                Overview
              </button>
            ) : (
              ""
            )}
            {item?.inculsionsAndExclusions ? (
              <button
                className="text-black p-1 rounded text-xs bg-sky-300"
                onClick={() => {
                  setData(item?.inculsionsAndExclusions);
                  setHeadings("Inclusion & Exclusion");
                  setTermsModals(!termsModals);
                }}
              >
                Inclusion & Exclusion
              </button>
            ) : (
              ""
            )}
            {item?.termsAndConditions ? (
              <button
                className="text-black p-1 rounded text-xs bg-sky-300"
                onClick={() => {
                  setData(item?.termsAndConditions);
                  setHeadings("Terms & Conditions");
                  setTermsModals(!termsModals);
                }}
              >
                Terms & Conditions
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="p-2 px-10 md:px-0 ">
          <div
            // onClick={() => {
            //   handleChange({
            //     value: !item?.isChecked,
            //     name: "isChecked",
            //     index,
            //   });
            // }}
            className="w-full  flex justify-between items-center "
          >
            <span className="flex w-full gap-2">
              {/* <span className="">
                  <input
                    className="w-5 h-5 accent-blue-500"
                    disabled={
                      item?.adultTicketCount === 0 &&
                      item?.childTicketCount === 0 &&
                      item?.commonTicketCount === 0 &&
                      item?.bookingType === "ticket"
                    }
                    type="checkbox"
                    name="isChecked"
                    checked={item?.isChecked}
                    onChange={(e) =>
                      handleChange({
                        value: e.target.checked,
                        name: e.target.name,
                        index,
                      })
                    }
                  />
                </span> */}
              {/* {item?.isChecked ? (
                  <span className="">
                    <p className="text-xl text-green-500">
                      <GiCheckMark />
                    </p>
                  </span>
                ) : (
                  ""
                )} */}
              <span className="w-full flex justify-end">
                <p className="font-[550] text-[12px] sm:text-[16px] flex items-center gap-1">
                  {item?.isB2bPromoCode ? (
                    <>
                      {/* <span>-</span> */}
                      <span className="text-[10px] bg-BEColor text-white px-2 ">
                        {item?.isB2bPromoCode ? item?.b2bPromoCode : ""}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                  {agentExcursion?.isApiConnected &&
                  agentExcursion?.connectedApi === "63f0a47b479d4a0376fe12f4" &&
                  // item?.isChecked &&i
                  item?.date?.length > 0 &&
                  item?.adult > 0 ? (
                    <SlotBookingComponent item={item} index={index} />
                  ) : (
                    ""
                  )}
                </p>
              </span>
              {item?.bookingType === "ticket" && (
                <>
                  <p className="text-main text-xs mr-5 font-[500]">
                    Adult Tickets left : {item?.adultTicketCount}
                  </p>
                  <p className="text-main text-xs mr-5 font-[500]">
                    Child Tickets left : {item?.childTicketCount}
                  </p>
                </>
              )}
            </span>
          </div>
          <div className="">
            <div className="block xl:flex justify-between items-center ">
              <div className="fle gap-2 mt-3">
                <div className="relative">
                  <p className="text-xs ">Date</p>
                  <input
                    className="border w-52 border-orange-500 px-2 rounded outline-1 outline-green-500 py-2"
                    type="date"
                    name="date"
                    min={res}
                    value={item.date}
                    onChange={(e) => {
                      handleChange({
                        value: e.target.value,
                        name: e.target.name,
                        index,
                      });
                    }}
                  />
                </div>
                {item?.base === "hourly" ? (
                  <div className="relative">
                    <p className="text-xs">Hour</p>
                    <select
                      className="border border-orange-500 px-4 w-52 rounded outline-1 outline-green-500 py-2"
                      name="hourCount"
                      value={item?.hourCount}
                      onChange={(e) =>
                        handleChange({
                          value: Number(e.target.value),
                          name: e.target.name,
                          index,
                        })
                      }
                    >
                      {Array.from({ length: 12 })?.map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  ""
                )}
                <div className="pt-2">
                  <p className="text-xs mb-1">Type</p>
                  <select
                    className="border w-52 border-orange-500 px-4 rounded outline-1 outline-green-500 py-3"
                    name="transfer"
                    value={item?.transfer}
                    onChange={(e) =>
                      handleChange({
                        value: e.target.value,
                        name: e.target.name,
                        index,
                      })
                    }
                  >
                    {item.activityType !== "transfer" && (
                      <option value="without">Ticket Only</option>
                    )}
                    {item?.isPrivateTransferAvailable &&
                      item.privateTransfers && (
                        <option value="private">Private Transfer</option>
                      )}
                    {item?.isSharedTransferAvailable &&
                      item.sharedTransferPrice && (
                        <option value="shared">Shared Transfer</option>
                      )}
                  </select>
                </div>
              </div>
              <div className="text-[13px] text-slate-500 font-[500] flex flex-wrap gap-1 ">
                {item?.transfer == "private" &&
                  item?.selectedVehicle?.map((ride) => (
                    <div
                      className="p-3 rounded-xl bg-white shadow-sm "
                      key={ride?._id}
                    >
                      <p className="text-left text-darktext underline">
                        {ride?.name}
                      </p>
                      <p className="flex gap-1 justify-between">
                        <span className="">
                          {priceConversion(ride?.price, selectedCurrency, true)}
                        </span>
                        <span className="">X {ride?.length}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="">Seats:</span>
                        <span className="">{ride?.maxCapacity} </span>
                      </p>
                    </div>
                  ))}
              </div>
            </div>
            {item?.transfer === "shared" ? (
              <div className="text-gray-400 text-sm font-semibold">
                Shared Transfer Price*{" "}
                <span className="text-xs text-gray-300 font-light">
                  (per Person)
                </span>{" "}
                {priceConversion(
                  item?.sharedTransferPrice,
                  selectedCurrency,
                  true
                )}
              </div>
            ) : (
              ""
            )}
            <div className={`grid  xl:flex  lg:justify-between `}>
              <div>
                <div className="flex gap-5 ml-2 mt-2">
                  <span className="">
                    <div className=" flex items-center">
                      <div
                        className=" text-lg flex justify-center items-center text-white font-[550] rounded-full bg-orange-600 w-5 h-5 cursor-pointer"
                        onClick={() => {
                          if (item?.adult > 0) {
                            dispatch(
                              setActivities({
                                value: Number(item?.adult) - 1,
                                name: "adult",
                                index,
                              })
                            );
                          }
                        }}
                      >
                        -
                      </div>
                      <input
                        className="w-10 text-center border-none bg-transparent outline-none ring-transparent no-spinner"
                        name="adult"
                        value={item.adult}
                        type="number"
                        min={1}
                        onChange={(e) => {
                          e.target.value < 0
                            ? handleChange({
                                value: 1,
                                name: e.target.name,
                                index,
                              })
                            : handleChange({
                                value: e.target.value,
                                name: e.target.name,
                                index,
                              });
                        }}
                      />

                      <div
                        className=" text-lg flex justify-center items-center text-white font-[550] rounded-full bg-orange-600 w-5 h-5 cursor-pointer"
                        onClick={() =>
                          dispatch(
                            setActivities({
                              value: Number(item.adult) + 1,
                              name: "adult",
                              index,
                            })
                          )
                        }
                      >
                        +
                      </div>
                    </div>
                    <p className="text-[14px] text-center mt-1 font-[400] text-gray-400">
                      Adult{" "}
                    </p>
                  </span>
                  <span className="">
                    <div className=" flex items-center">
                      <div
                        className=" text-lg flex justify-center items-center text-white font-[550] rounded-full bg-orange-600 w-5 h-5 cursor-pointer"
                        onClick={() => {
                          if (item?.child > 0) {
                            dispatch(
                              setActivities({
                                value: Number(item.child) - 1,
                                name: "child",
                                index,
                              })
                            );
                          }
                        }}
                      >
                        -
                      </div>
                      <input
                        className="w-10 text-center border-none bg-transparent outline-none ring-transparent no-spinner"
                        name="child"
                        value={item.child}
                        type="number"
                        min={0}
                        onChange={(e) => {
                          e.target.value < 0
                            ? handleChange({
                                value: 0,
                                name: e.target.name,
                                index,
                              })
                            : handleChange({
                                value: e.target.value,
                                name: e.target.name,
                                index,
                              });
                        }}
                      />
                      <div
                        className=" text-lg flex justify-center items-center text-white font-[550] rounded-full bg-orange-600 w-5 h-5 cursor-pointer"
                        onClick={() =>
                          dispatch(
                            setActivities({
                              value: Number(item.child) + 1,
                              name: "child",
                              index,
                            })
                          )
                        }
                      >
                        +
                      </div>
                    </div>
                    <p className="text-[14px] font-[400] text-center mt-1 text-gray-400 ">
                      Children
                    </p>
                  </span>
                  {/* <span className="">
                  <div className="flex items-center">
                    <div
                      className=" text-lg flex justify-center items-center text-white font-[550] rounded-full bg-orange-600 w-5 h-5 cursor-pointer"
                      onClick={() => {
                        if (item?.infant > 0) {
                          dispatch(
                            setActivities({
                              value: Number(item.infant) - 1,
                              name: "infant",
                              index,
                            })
                          );
                        }
                      }}
                    >
                      -
                    </div>
                    <input
                      className="w-10 text-center border-none bg-transparent outline-none ring-transparent no-spinner"
                      name="infant"
                      value={item.infant}
                      type="number"
                      min={0}
                      onChange={(e) => {
                        e.target.value < 0
                          ? handleChange({
                              value: 0,
                              name: e.target.name,
                              index,
                            })
                          : handleChange({
                              value: e.target.value,
                              name: e.target.name,
                              index,
                            });
                      }}
                    />
                    <div
                      className=" text-lg flex justify-center items-center text-white font-[550] rounded-full bg-orange-600 w-5 h-5 cursor-pointer"
                      onClick={() =>
                        dispatch(
                          setActivities({
                            value: Number(item.infant) + 1,
                            name: "infant",
                            index,
                          })
                        )
                      }
                    >
                      +
                    </div>
                  </div>
                  <p className="text-[14px] font-[400] text-center mt-1 text-gray-400">
                    Infant
                  </p>
                </span> */}
                </div>
              </div>
              <div className="px-1 lg:px-3 pt-2 xl:pt-0">
                {/* <span className="md:flex items-center">
                <p className="text-[9px] whitespace-nowrap font-[400] text-text  h-full">
                  per {item?.base} *
                </p>
                <p className="font-[600] whitespace-nowrap text-[9px] sm:text-[17px] flex items-end">
                  {priceConversion(item?.lowPrice, selectedCurrency, true)}
                </p>
              </span> */}
                <div className="flex xl:grid md:gap mt-2 sm:mt-0">
                  <p className="ftext-[9px] whitespace-nowrap  text-text  h-full">
                    per {item?.base} *
                  </p>
                  <p className="sm:text-right foCheckoutnt-[600] sm:text-lg">
                    {priceConversion(item?.lowPrice, selectedCurrency, true)}
                  </p>
                </div>
                <div className="flex xl:grid md:gap mt-2 sm:mt-0">
                  <p className="ftext-[9px] whitespace-nowrap  text-text  h-full">
                    Grand Total
                  </p>
                  <p className="sm:text-right font-[600] sm:text-lg">
                    {priceConversion(price, selectedCurrency, true)}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {agentExcursion?.isApiConnected &&
          agentExcursion?.connectedApi === "63f0a47b479d4a0376fe12f4" &&
          // item?.isChecked &&
          item?.date?.length > 0 &&
          item?.adult > 0 ? (
            <SlotBookingComponent item={item} index={index} />
          ) : (
            ""
          )}

          {item?.date?.length > 0 &&
          // item?.isChecked &&
          (item?.adult > 0 || item?.child > 0) ? (
            <>
              {!agentExcursion?.isApiConnected ||
              agentExcursion?.connectedApi !== "63f0a47b479d4a0376fe12f4" ? (
                <div className="py-2 px-2">
                  <div className="flex gap-2 w-full justify-end items-end ">
                    {error ? <p className="text-red-500">{error}</p> : ""}
                    <button
                      onClick={() => carting(item)}
                      className="bg-BEColor shadow rounded-sm h-8 text-white w-8 flex justify-center items-center"
                    >
                      <BsCartPlus />
                    </button>
                    <button
                      onClick={() => {
                        carting(item);
                        if (error?.length <= 0) {
                          navigate(`/home/cart`);
                        }
                      }}
                      className="bg-orange-500 text-xs font-semibold shadow rounded-sm h-8 text-white px-4 flex justify-center items-center"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </div>
        
      </div>

      {termsModals && (
        <TermsConditionModal
          setTermsModals={setTermsModals}
          termsModals={termsModals}
          data={data}
          headings={headings}
        />
      )}

      {modal && (
        <ImagePreviewModal
          setModal={setModal}
          modal={modal}
          preview={preview}
        />
      )}
    </div>
  );
}

export default ActivityComponent;
