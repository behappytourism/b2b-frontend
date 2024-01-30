import React, { useEffect, useState } from "react";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { removeFromCart } from "../../../redux/slices/agentExcursionSlice";
import { setAlertSuccess } from "../../../redux/slices/homeSlice";
import priceConversion from "../../../utils/PriceConversion";
import moment from "moment";

function DetailsCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const location = useLocation();

  const { agentExcursion, agentExcursionCart } = useSelector(
    (state) => state.agentExcursions
  );
  const { selectedCurrency } = useSelector((state) => state.home);

  const [price, setPrice] = useState(0);

  const [offerAmount, setOfferAmount] = useState(0);

  useEffect(() => {
    const sum = agentExcursionCart?.reduce((acc, data) => {
      return Number(acc) + Number(data?.priceWithoutPromo);
    }, 0);
    setPrice(sum);
  }, [agentExcursionCart]);

  useEffect(() => {
    if (agentExcursion?.activities) {
      if (agentExcursion?.isOffer) {
        if (agentExcursion?.offerAmountType === "flat") {
          let offer =
            agentExcursion?.activities[0]?.lowPrice -
            agentExcursion?.offerAmount;
          setOfferAmount(offer);
        } else {
          let offer =
            agentExcursion?.activities[0]?.lowPrice -
            (agentExcursion?.activities[0]?.lowPrice *
              agentExcursion?.offerAmount) /
              100;
          setOfferAmount(offer);
        }
      } else {
        setOfferAmount(agentExcursion?.activities[0]?.lowPrice);
      }
    }
  }, [agentExcursion]);

  const navigator = () => {
    const isDateExist = agentExcursionCart.filter((item) => {
      return item?.isChecked === true && item?.date !== "";
    });
    if (!location.pathname.includes("/")) {
      navigate(`/payment`);
    } else if (location.pathname.includes("/")) {
      navigate(`/home/cart`);
    } else {
      setError("Fill the tour Date");
    }
  };

  return (
    <>
      <div className="bg-light w-80 shadow-sm lg:rounded-xl p-5 space-y-2 mb-2 ml-5">
      
        <div className="">
          {agentExcursion?.isOffer && (
            <p className="text-main text-xs">
              <s>
                {priceConversion(
                  agentExcursion?.activities &&
                    agentExcursion?.activities[0]?.adultPrice,
                  selectedCurrency,
                  true
                )}
              </s>
            </p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center space-x-2">
            <h2 className="text-darktext font-bold text-3xl">
              {selectedCurrency?.isocode +
                " " +
                priceConversion(offerAmount, selectedCurrency, false)}
            </h2>
            <p className="text-xs text-text">cheapest price*</p>
          </span>
        
          {agentExcursion?.isOffer && (
            <span className="bg-soft px-3 py-2 rounded-full text-blue">
              {priceConversion(
                agentExcursion?.offerAmount && agentExcursion?.offerAmount,
                selectedCurrency,
                false
              )}{" "}
              {agentExcursion?.offerAmountType &&
              agentExcursion?.offerAmountType === "flat"
                ? selectedCurrency?.isocode
                : "%"}{" "}
              OFF
            </span>
          )}
        </div>
      </div>

      <div className="bg-light lg:rounded-xl shadow-xl border space-y-2 w-[450px]">
        <div className="p-3 shadow-lg rounded-lg w-full">
          <div className="">
            <div className="inputs space-y-5 my-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-darktext">
                  <span className="text-lg ">Cart Items</span>
                </div>

                <div>
                  {agentExcursionCart?.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white space-y-2 mt-2 border-t py-2"
                    >
                      <div>
                        <div className="flex justify-between items-center gap-2 space-y-1 text-sm">
                          <span className="text-darktext ml-1 font-semibold">
                            {item?.isChecked === true && item?.name}
                          </span>
                          <span
                            className="ml-1 text-main"
                            onClick={() => dispatch(removeFromCart(item?._id))}
                          >
                            <AiFillDelete />
                          </span>
                        </div>
                        <div className="flex justify-between items-center gap-2 space-y-1 text-sm">
                          <span className="text-darktext ml-1">Price</span>
                          <span className="whitespace-nowrap flex items-center">
                            {item?.isChecked === true &&
                              priceConversion(
                                item?.priceWithoutPromo,
                                selectedCurrency,
                                true
                              )}
                          </span>
                        </div>
                        <div className="flex justify-between items-center gap-2 space-y-1 text-sm">
                          <span className="text-darktext ml-1">Pax</span>
                          <span className="whitespace-nowrap flex items-center">
                            {item?.adult +
                              " adults, " +
                              item?.child +
                              " child, " 
                              // item?.infant +
                              // " infant"
                              }
                          </span>
                        </div>
                        <div className="flex justify-between items-center gap-2 space-y-1 text-sm">
                          <span className="text-darktext ml-1">Date</span>
                          <span className="whitespace-nowrap flex items-center">
                            {item?.date}
                          </span>
                        </div>
                        {item?.selectedTimeSlot ? (
                          <>
                            <div className="flex justify-between items-center gap-2 space-y-1 text-sm">
                              <span className="text-darktext ml-1">Slot</span>
                              <span className="whitespace-nowrap flex items-center">
                                {moment(
                                  item?.selectedTimeSlot?.StartDateTime
                                ).format("LT") +
                                  " - " +
                                  moment(
                                    item?.selectedTimeSlot?.EndDateTime
                                  ).format("LT")}
                              </span>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="">
                {agentExcursion?.isOffer === true && (
                  <div className="flex justify-between text-darktext">
                    <span className="">
                      {agentExcursion?.offerAmountType === "flat"
                        ? "flat"
                        : "discount"}{" "}
                    </span>
                    <span className="">
                      {agentExcursion?.offerAmount + "%"}{" "}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-darktext">
                  <span className="font-semibold text-lg">Grand Total</span>
                  <span className="font-bold text-xl">
                    {priceConversion(price, selectedCurrency, true)}
                  </span>
                </div>
              </div>
              {error && <p className="text-xs text-main">{error} </p>}
              <div className="">
                <button
                  type="submit"
                  className="bg-BEColor text-light w-full py-3 rounded-lg"
                  onClick={navigator}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* <div className="hidden lg:block py-7 space-y-3">
            <div className="">
              <p className="text-text">
                if you have questions about this tour, please feel free to ask
              </p>
            </div>
            <div className="">
              <button className="w-full py-3 border border-text text-text rounded-full">
                Ask the Tour Expert
              </button>
            </div>
            <div className="">
              <p className="text-text text-xs">
                *All questions are replied within 24-48 hrs
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default DetailsCard;
