import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setAddBaggageForTravellers,
  setRemoveBaggageForTravellers,
  deleteBaggageWithoutCount,
} from "../../../redux/slices/flightSlice";

function FlightBaggageAddButton({
  bg,
  journeyKey,
  updateTotalLuggagePrice,
  totalLuggagePrice,
  updateTotalCount,
  segmentKey,
  deselectedAllLuggages,
  setDeselectedAllLuggages,
  baggageSegmentKeys,
  tbId,
}) {
  const [addCount, setAddCount] = useState(0);
  const [passangersKeys, setPassangersKeys] = useState();

  const { travellers, selectedAddOns } = useSelector((state) => state.flight);
  const dispatch = useDispatch();

  const localStorageKey = `mealCount_${segmentKey}_${bg?.baggageInfo}_${tbId}`;
  const initialMealCount = parseInt(localStorage.getItem(localStorageKey)) || 0;
  const [luggageCount, setLuggageCount] = useState(initialMealCount);

  // Define the clearLocalStorageForSegment function within your component
  const clearLocalStorageForSegment = (segmentKey, baggageInfo) => {
    const localStorageKey = `mealCount_${segmentKey}_${bg?.baggageInfo}_${tbId}`;
    localStorage.removeItem(localStorageKey);
  };

  const totalCountArray = () => {
    let totalCount = 0;
    for (let i = 0; i < selectedAddOns.luggage?.length; i++) {
      for (let k = 0; k < selectedAddOns.luggage[i]?.baggageKeys?.length; k++) {
        totalCount += selectedAddOns.luggage[i]?.baggageKeys[k]?.count ?? 0;
      }
    }
    return totalCount;
  };

  let check = totalCountArray();
  const totalTravellersCount = travellers?.adult + travellers?.children;
  const [totalBaggageInfo, setTotalBaggageInfo] = useState([]);
  const [allBaggagePrice, setAllBaggagePrice] = useState([]);

  const { flightFullData } = useSelector((state) => state.flight);
  const noOfAdults = flightFullData.priceQuoteResponse.noOfAdults;
  const noOfChildren = flightFullData.priceQuoteResponse.noOfChildren;
  const selectedLuggageCount = selectedAddOns.luggage.length;
  const maxMealsAllowed = noOfAdults + noOfChildren;

  const addBaggages = (passKey) => {
    const selectedLuggageCount = selectedAddOns.luggage.filter(
      (luggage) => luggage.segmentKey === segmentKey
    ).length;
    const maxMealsAllowed = noOfAdults + noOfChildren;
    const exist = passangersKeys?.baggageKeys[0]?.ssrKey;
    if (exist === passKey) {
      if (selectedLuggageCount < maxMealsAllowed) {
        const newLuggageCount = luggageCount + 1;
        setLuggageCount(newLuggageCount);
        localStorage.setItem(localStorageKey, newLuggageCount.toString());

        let count = addCount + 1;
        const newCount = addCount + 1;
        const newPrice = totalLuggagePrice + bg?.price;
        // Update the array of selected seat numbers
        setTotalBaggageInfo((prevTotalBaggageInfo) => [
          ...prevTotalBaggageInfo,
          bg.baggageInfo,
        ]);

        setAllBaggagePrice((prevAllBaggagePrice) => [
          ...prevAllBaggagePrice,
          bg.price,
        ]);
        // Call the updateTotalCount callback with the new addCount value
        updateTotalCount(count);
        // Call the updateTotalPrice function from the parent component to update the total price
        updateTotalLuggagePrice(newPrice);
        setAddCount(count);
        setPassangersKeys((prev) => ({
          ...prev,
          journeyKey: journeyKey,
          segmentKey: journeyKey,
          baggageCode: bg.baggageCode,
          baggageInfo: bg.baggageInfo,
          baggagePrice: bg.price,
          baggageKeys: [
            {
              ssrKey: passKey,
              count: count,
            },
          ],
        }));
        let data = {
          ...passangersKeys,
          journeyKey: journeyKey,
          segmentKey: journeyKey,
          baggageCode: bg.baggageCode,
          baggageInfo: bg.baggageInfo,
          baggagePrice: bg.price,
          baggageKeys: [{ ssrKey: passKey, count: count }],
        };

        dispatch(setAddBaggageForTravellers(data));
        // Dispatch was successful, reset the array of selected seat numbers
        setTotalBaggageInfo([]);
        setAllBaggagePrice([]);
      }
    } else {
      if (addCount <= totalTravellersCount) {
        const exist = passangersKeys?.baggageKeys[0]?.ssrKey;
        if (exist !== passKey) {
          let counts = 0;
          let data = counts + 1;
          // Update the array of selected seat numbers
          setTotalBaggageInfo((prevTotalBaggageInfo) => [
            ...prevTotalBaggageInfo,
            bg.baggageInfo,
          ]);
          setAllBaggagePrice((prevAllBaggagePrice) => [
            ...prevAllBaggagePrice,
            bg.price,
          ]);

          updateTotalCount(data);
          setAddCount(data);
          setPassangersKeys({
            ...passangersKeys,
            baggageCode: bg.baggageCode,
            baggageInfo: bg.baggageInfo,
            segmentKey: journeyKey,
            journeyKey: journeyKey,
            baggagePrice: bg.price,
            baggageKeys: [{ ssrKey: passKey, count: data }],
          });
          let datas = {
            ...passangersKeys,
            journeyKey: journeyKey,
            baggageCode: bg.baggageCode,
            baggageInfo: bg.baggageInfo,
            segmentKey: journeyKey,
            baggagePrice: bg.price,
            baggageKeys: [{ ssrKey: passKey, count: data }],
          };
          dispatch(setAddBaggageForTravellers(datas));
          // Dispatch was successful, reset the array of selected seat numbers
          setTotalBaggageInfo([]);
          setAllBaggagePrice([]);
        }
      }
    }
  };

  // const removeBaggages = (passKey) => {
  //   console.log("remove button", passangersKeys);
  //   const exist = passangersKeys?.baggageKeys[0]?.ssrKey;
  //   if (exist === passKey) {
  //     console.log("exist if condidtion for button page");
  //     // if(addCount <= totalTravellersCount){
  //     let count = addCount - 1;
  //     setAddCount(count);
  //     // Call the updateTotalCount callback with the new addCount value
  //     updateTotalCount(count);
  //     console.log(count, "count new minas");
  //     setPassangersKeys((prev) => ({
  //       ...prev,
  //       baggageKeys: [
  //         {
  //           ssrKey: passKey,
  //           count: count,
  //         },
  //       ],
  //     }));
  //     let data = {
  //       ...passangersKeys,
  //       baggageKeys: [{ ssrKey: passKey, count: count }],
  //     };
  //     dispatch(setRemoveBaggageForTravellers(data));
  //     dispatch(deleteBaggageWithoutCount());
  //     // Calculate the new meal count and price
  //     const newCount = addCount - 1;
  //     const newPrice = totalLuggagePrice - bg.price;
  //     // Call the updateTotalPrice function from the parent component to update the total price
  //     updateTotalLuggagePrice(newPrice);
  //     // }
  //   } else {
  //     if (addCount <= totalTravellersCount) {
  //       const exist = passangersKeys?.baggageKeys[0]?.ssrKey;
  //       if (exist !== passKey) {
  //         let counts = addCount;
  //         let data = counts - 1;
  //         // Call the updateTotalCount callback with the new addCount value
  //         updateTotalCount(data);
  //         setAddCount(data);
  //         setPassangersKeys({
  //           ...passangersKeys,
  //           journeyKey: journeyKey,
  //           segmentKey: journeyKey,
  //           baggageKeys: [{ ssrKey: passKey, count: data }],
  //         });
  //         let datas = {
  //           ...passangersKeys,
  //           journeyKey: journeyKey,
  //           segmentKey: journeyKey,
  //           baggageKeys: [{ ssrKey: passKey, count: data }],
  //         };
  //         dispatch(setRemoveBaggageForTravellers(datas));
  //         dispatch(deleteBaggageWithoutCount());
  //       }
  //     }
  //   }
  // };
  // useEffect(() => {
  //   // Remove the stored value when the component mounts
  //   localStorage.removeItem(localStorageKey);

  //   // Optionally, update the state to reflect the removal
  //   setLuggageCount(0);
  // }, []);

  const removeBaggages = (passKey) => {
    const exist = passangersKeys?.baggageKeys[0]?.ssrKey;
    // const newBaggageCount = Math.max(baggageCount - 1, 0);
    // setBaggageCount(newBaggageCount);
    // const selectedBaggageCount = selectedAddOns.baggage.filter(
    //   (baggage) => baggage.segmentKey === segmentKey
    // ).length;

    if (exist === passKey) {
      if (selectedLuggageCount > 0) {
        const newLuggageCount = luggageCount - 1;
        setLuggageCount(newLuggageCount);
        localStorage.setItem(localStorageKey, newLuggageCount.toString());
        const newCount = Math.max(addCount - 1, 0);
        const newPrice = totalLuggagePrice - bg.price;

        // Call the updateTotalPrice function from the parent component to update the total price
        updateTotalLuggagePrice(newPrice);

        setAddCount(newCount);

        // Update the array of selected baggage info and price
        setTotalBaggageInfo((prevTotalBaggageInfo) => [
          ...prevTotalBaggageInfo,
          bg.baggageInfo,
        ]);
        setAllBaggagePrice((prevAllBaggagePrice) => [
          ...prevAllBaggagePrice,
          bg.price,
        ]);

        // Update passangersKeys with baggage selection details
        setPassangersKeys((prev) => ({
          ...prev,
          journeyKey: journeyKey,
          baggageCode: bg.baggageCode,
          baggageInfo: bg.baggageInfo,
          baggagePrice: bg.price,
          segmentKey: segmentKey,
          baggageKeys: [
            {
              ssrKey: passKey,
              count: newCount,
            },
          ],
        }));

        let data = {
          ...passangersKeys,
          journeyKey: journeyKey,
          baggageCode: bg.baggageCode,
          baggageInfo: bg.baggageInfo,
          baggagePrice: bg.price,
          segmentKey: segmentKey,
          baggageKeys: [{ ssrKey: passKey, count: newCount }],
        };

        // Dispatch the baggage removal action
        dispatch(setRemoveBaggageForTravellers(data));

        // Dispatch was successful, reset the array of selected baggage info and price
        setTotalBaggageInfo([]);
        setAllBaggagePrice([]);
      }
    }
  };

  useEffect(() => {
    if (deselectedAllLuggages) {
      setAddCount(0); // Deselect the seat
      setLuggageCount(0);

      // Iterate over all possible segment keys and remove corresponding localStorage items
      baggageSegmentKeys.forEach((key) => {
        clearLocalStorageForSegment(key, bg?.baggageInfo, tbId);
      });

      localStorage.removeItem(localStorageKey);

      // Iterate over all segment keys and remove corresponding localStorage items
      // segmentKey.map((key) => {
      //   const localStorageKey = `mealCount_${key}_${ml?.mealInfo}`;
      //   localStorage.removeItem(localStorageKey);
      // });

      setDeselectedAllLuggages(false); // Reset the flag
    }
  }, [deselectedAllLuggages, setDeselectedAllLuggages]);

  return (
    <div className="flex gap-2 justify-center items-center p-2">
      <button
        type="button"
        className="flex items-center justify-center border  rounded-full p-2 text-lg w-4 h-4"
        onClick={() => {
          addBaggages(bg?.key);
        }}
      >
        +
      </button>

      {/* {
        check > 0 ? (
          <> */}
      <span className="text-sm p-2">{luggageCount}</span>

      <button
        type="button"
        className="flex items-center justify-center border  rounded-full p-2 text-lg w-4 h-4"
        onClick={() => removeBaggages(bg?.key)}
      >
        -
      </button>
      {/* </>
        ) : ""
      }
    */}
    </div>
  );
}

export default FlightBaggageAddButton;
