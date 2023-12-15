import React, { useEffect, useState } from "react";
import { BsDash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  customFromCart,
  removeFromCart,
} from "../../../redux/slices/agentExcursionSlice";
import priceConversion from "../../../utils/PriceConversion";
import { setAlertSuccess } from "../../../redux/slices/homeSlice";
import formatDate from "../../../utils/formatDate";

function PaymentCardSection() {
  const dispatch = useDispatch();
  const [sortedCart, setSortedCart] = useState([]);

  const { agentExcursionCart } = useSelector((state) => state.agentExcursions);

  const { selectedCurrency } = useSelector((state) => state.home);

  function isObjectEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  const [finalPrices, setFinalPrices] = useState({
    finalPayment: 0,
    totalVat: 0,
    finalPaymentWithoutPromo: 0,
    totalPromoPrice: 0,
  });

  useEffect(() => {
    let finalPayment =
      agentExcursionCart &&
      agentExcursionCart.reduce((acc, item) => {
        const vatPrice =
          item?.vat && item?.isVat && (item?.price * item?.vat) / 100;
        const sum = vatPrice + item?.price;
        return acc + sum;
      }, 0);
    setFinalPrices((prev) => {
      return { ...prev, finalPayment: finalPayment };
    });

    let totalVat =
      agentExcursionCart &&
      agentExcursionCart.reduce((acc, item) => {
        const vatPrice =
          item?.vat && item?.isVat && (item?.price * item?.vat) / 100;
        return acc + vatPrice;
      }, 0);
    setFinalPrices((prev) => {
      return { ...prev, totalVat: totalVat };
    });

    let finalPaymentWithoutPromo =
      agentExcursionCart &&
      agentExcursionCart.reduce((acc, item) => {
        return acc + item?.priceWithoutPromo;
      }, 0);
    setFinalPrices((prev) => {
      return { ...prev, finalPaymentWithoutPromo: finalPaymentWithoutPromo };
    });

    let totalPromoPrice =
      agentExcursionCart &&
      agentExcursionCart.reduce((acc, item) => {
        let price = item?.isPromoAdded ? item?.appliedPromoAmountB2b : 0;
        return acc + price;
      }, 0);
    setFinalPrices((prev) => {  
      return { ...prev, totalPromoPrice: totalPromoPrice };
    });
  }, [agentExcursionCart]);

  function sortByIsCompoExist(a, b) {
    if (
      a.hasOwnProperty("isB2bPromoCode") &&
      !b.hasOwnProperty("isB2bPromoCode")
    ) {
      return -1;
    } else if (
      !a.hasOwnProperty("isB2bPromoCode") &&
      b.hasOwnProperty("isB2bPromoCode")
    ) {
      return 1;
    } else {
      return 0;
    }
  }

  useEffect(() => {
    let mutableArray = [...agentExcursionCart];
    mutableArray.sort(sortByIsCompoExist);

    setSortedCart(mutableArray);
  }, [agentExcursionCart]);

  return (
    <>
      <div className="">
        {sortedCart?.map((item, index) => (
          <div className=" w-full pb-3 rounded-2xl" key={index}>
            <div className="p-3 border-b flex justify-between items-center">
              <h1 className="text-lg font-semibold text-darktext">
                {item?.name}{" "}
              </h1>
              <button
                className="rounded-full h-5 w-5 bg-gray-100 border text-main flex justify-center items-center text-lg font-bold"
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
                <BsDash />
              </button>
            </div>
            <div className="text-gray-400 text-sm p-4 space-y-1 ">
              <div className="flex items-center justify-between font-medium ">
                <span className="">Option:</span>

                <span className="">{item.name}</span>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span className="">Transfer :</span>
                <span className="">{item.transfer}</span>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span className="">Date :</span>
                <span className="">{item.date}</span>
              </div>
              {item?.selectedTimeSlot &&
                !isObjectEmpty(item?.selectedTimeSlot) && (
                  <>
                    <div className="flex items-center justify-between font-medium">
                      <span className="">Slot Selected :</span>
                      <span className="">
                        {item?.selectedTimeSlot?.EventName}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-medium">
                      <span className="">Slot Start Date Time :</span>
                      <span className="">
                        {formatDate(item.selectedTimeSlot?.StartDateTime, true)}
                      </span>
                    </div>
                  </>
                )}
              <div className="flex items-center justify-between font-medium">
                <span className="">Pax :</span>
                <span className="">
                  {item?.adult + " adult"}
                  {item?.child > 0 && "," + item?.child + " child"}{" "}
                  {item?.infant > 0 && "," + item?.infant + " infant"}{" "}
                </span>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span className="">Amount :</span>
                <span className="">
                  {priceConversion(
                    item?.priceWithoutPromo,
                    selectedCurrency,
                    true
                  )}
                </span>
              </div>
              {item?.isVat && (
                <>
                  <div className="flex items-center  justify-between font-medium">
                    <span className="">VAT percentage :</span>
                    <span className="">
                      {" "}
                      {item?.isVat ? item?.vat + " %" : "0 %"}{" "}
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-medium">
                    <span className="">VAT amount :</span>
                    <span className="">
                      {priceConversion(
                        item?.vat &&
                          item?.isVat &&
                          (item?.price * item?.vat) / 100,
                        selectedCurrency,
                        false
                      )}
                    </span>
                  </div>
                </>
              )}
              {item?.isB2bPromoCode ? (
                <>
                  <div className="flex gap-2 items-center justify-between font-medium text-white px-1 py-2 shadow-mn rounded bg-gradient-to-r from-orange-600 to-blue-600">
                    <span className="">Coupon applied:</span>
                    <span className="flex gap-2 items-center">
                      <p className="text-xs">Promocode :</p>
                      <input
                        className=" border-none outline-none h-4 w-4 accent-orange-600"
                        type="checkbox"
                        checked={item?.isPromoAdded}
                        onChange={(e) => {
                          dispatch(
                            customFromCart({
                              id: item?._id,
                              value: e.target.checked,
                            })
                          );
                        }}
                      />
                      <p className="text-[15px] font-semibold ">
                        {item?.b2bPromoCode}
                      </p>
                    </span>
                  </div>
                  {item?.isPromoAdded ? (
                    <div className="flex items-center justify-between font-semibold text-red-600">
                      <span className="">Coupon redeemed :</span>
                      <span className="">
                        {priceConversion(
                          Number(item.adult) *
                            Number(item?.b2bPromoAmountAdult) +
                            Number(item.child) *
                              Number(item?.b2bPromoAmountChild),
                          selectedCurrency,
                          true
                        )}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
              <div className="flex items-center justify-between font-[700] text-lightblue ">
                <span className="">Total :</span>
                <span className="">
                  {item?.isVat && item?.vat
                    ? priceConversion(
                        (item?.price * item?.vat) / 100 + item?.price,
                        selectedCurrency,
                        true
                      )
                    : priceConversion(item?.price, selectedCurrency, true)}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className=" rounded-2xl mb-20 lg:mb-0">
          <div className="p-4 border-b">
            <h1 className="text-lg font-semibold text-darktext">
              Final Payment
            </h1>
          </div>
          <div className="text-gray-400 text-sm p-4 space-y-3">
            <div className="flex items-center justify-between font-medium">
              <span className="">Total :</span>
              <span className="">
                {priceConversion(
                  finalPrices.finalPaymentWithoutPromo,
                  selectedCurrency,
                  true
                )}
              </span>
            </div>
            {finalPrices.totalPromoPrice > 0 ? (
              <div className="flex items-center justify-between font-semibold text-red-600">
                <span className="">Coupon Redeemed :</span>
                <span className="">
                  {priceConversion(
                    finalPrices.totalPromoPrice,
                    selectedCurrency,
                    true
                  )}
                </span>
              </div>
            ) : (
              ""
            )}
            {finalPrices.totalVat > 0 ? (
              <div className="flex items-center justify-between font-medium">
                <span className="">VAT Amount :</span>
                <span className="">
                  {priceConversion(
                    finalPrices.totalVat,
                    selectedCurrency,
                    true
                  )}
                </span>
              </div>
            ) : (
              ""
            )}
            <div className="flex items-center justify-between font-bold text-lg">
              <span className="">Final Payment :</span>
              <span className="">
                {priceConversion(
                  finalPrices.finalPayment,
                  selectedCurrency,
                  true
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentCardSection;
