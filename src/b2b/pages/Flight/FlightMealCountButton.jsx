import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddMealsForTravellers,
  setRemoveMealsForTravellers,
  deleteMealWithoutCount,
} from "../../../redux/slices/flightSlice";

function FlightMealCountButton({
  ml,
  legKey,
  updateTotalPrice,
  totalMealPrice,
  resetMealCount,
  deselectedAllMeals,
  setDeselectedAllMeals,
  segmentKey,
  segmentKeys,
  mealInfos,
  tbId,
  firstKey,
  from,
  to,
}) {
  const dispatch = useDispatch();
  const { travellers, selectedAddOns } = useSelector((state) => state.flight);
  const localStorageKey = `mealCount_${segmentKey}_${ml?.mealInfo}_${tbId}`;
  const localStoragefirstKey = `mealCount_${firstKey}_Egg Omelette Breakfast With Bread and Butter_${tbId}`;
  const localStorageTwofirstKey = `mealCount_${firstKey}_Chicken Nashif wrap with water_${tbId}`;
  const localStorageThreefirstKey = `mealCount_${firstKey}_Chicken Tikka Sandwich with water_${tbId}`;
  //console.log(localStorageKey, "local storage key")
  const initialMealCount = parseInt(localStorage.getItem(localStorageKey)) || 0;
  const [mealCount, setMealCount] = useState(initialMealCount);


  const totalCountArray = () => {
    let totalCount = 0;
    for (let i = 0; i < selectedAddOns.meal?.length; i++) {
      for (let k = 0; k < selectedAddOns.meal[i]?.segmentKey?.length; k++) {
        totalCount += selectedAddOns.meal[i]?.segmentKey[k]?.count ?? 0;
      }
    }
    return totalCount;
  };
  let check = totalCountArray();

  // Define the clearLocalStorageForSegment function within your component
  const clearLocalStorageForSegment = (segmentKey, mealInfo) => {
    const localStorageKey = `mealCount_${segmentKey}_${mealInfos}_${tbId}`;
    localStorage.removeItem(localStorageKey);
    setMealCount(0);
  };

  const removeOneItemLS = (segmentKey, mealInfo, tbId) => {
    const localStorageKey = `mealCount_${segmentKey}_${ml?.mealInfo}_${tbId}`;
    localStorage.removeItem(localStorageKey);
    console.log(localStorageKey, "removed?");
  };

  const clearLocalMealInfoStorageForSegment = (mealInfo, segmentKey) => {
    const localStorageKey = `mealCount_${segmentKey}_${mealInfo}_${tbId}`;
    localStorage.removeItem(localStorageKey);
    setMealCount(0);
  };
  //console.log(segmentKeys, segmentKey, "meal segment keys")

  const totalTravellersCount = travellers?.adult + travellers?.children;
  const [addCount, setAddCount] = useState(0);
  const [passangersKeys, setPassangersKeys] = useState();
  const [totalMealInfo, setTotalMealInfo] = useState([]);
  const [allMealPrice, setAllMealPrice] = useState([]);

  // useEffect to handle deselection when deselectedAll changes
  // useEffect(() => {
  //   if (deselectedAllMeals) {
  //     setAddCount(0); // Deselect the seat
  //     setMealCount(0);
  //     localStorage.removeItem(localStorageKey);

  //     setDeselectedAllMeals(false); // Reset the flag
  //   }
  // }, [deselectedAllMeals, setDeselectedAllMeals]);

  //  useEffect(() => {
  //   // Remove the stored value when the component mounts
  //   localStorage.removeItem(localStorageKey);

  //   // Optionally, update the state to reflect the removal
  //   setMealCount(0);
  // }, []);

  useEffect(() => {
    if (deselectedAllMeals) {
      setAddCount(0); // Deselect the seat
      setMealCount(0);

      localStorage.removeItem(localStorageKey);
      localStorage.removeItem(localStoragefirstKey);
      localStorage.removeItem(localStorageTwofirstKey);
      localStorage.removeItem(localStorageThreefirstKey);

      // Iterate over all possible segment keys and remove corresponding localStorage items
      segmentKeys.forEach((key) => {
        clearLocalStorageForSegment(key, mealInfos);
        setMealCount(0);
      });

      // Iterate over all possible segment keys and remove corresponding localStorage items
      mealInfos.forEach((meal) => {
        clearLocalMealInfoStorageForSegment(meal, segmentKeys, tbId);
        setMealCount(0);
      });

      // Iterate over all segment keys and remove corresponding localStorage items
      segmentKeys.map((key) => {
        const localStorageKey = `mealCount_${key}_${ml?.mealInfo}_${tbId}`;
        localStorage.removeItem(localStorageKey);
      });

      // Iterate over all segment keys and remove corresponding localStorage items
      mealInfos.map((meal) => {
        const localStorageKey = `mealCount_${segmentKey}_${meal}_${tbId}`;
        localStorage.removeItem(localStorageKey);
      });

      setDeselectedAllMeals(false); // Reset the flag
    }
  }, [deselectedAllMeals, setDeselectedAllMeals]);

  //     // Update the total price whenever addCount changes
  // useEffect(() => {
  //   updateTotalPrice(ml.price * 1);
  // }, [addCount, ml.price, updateTotalPrice]);
  const { flightFullData } = useSelector((state) => state.flight);
  const noOfAdults = flightFullData.priceQuoteResponse.noOfAdults;
  const noOfChildren = flightFullData.priceQuoteResponse.noOfChildren;
  const selectedMealCount = selectedAddOns.meal.length;
  const maxMealsAllowed = noOfAdults + noOfChildren;

  // useEffect(() => {
  //   // Check if the current seat is already selected for the specific segment
  //   const count = selectedAddOns.meal.some(
  //     (meal) => meal.mealInfo === ml?.mealInfo && meal.segmentKey === segmentKey
  //   );
  //   // If it is, set the selected state to true
  //   if (count) {
  //     addCount(1);
  //   }
  // }, [selectedAddOns.meal, ml?.mealInfo, segmentKey]);

  const handleAddMeals = (passKey) => {
    const selectedMealCount = selectedAddOns.meal.filter(
      (meal) => meal.segmentKey === segmentKey
    ).length;
    const maxMealsAllowed = noOfAdults + noOfChildren;

    if (selectedMealCount < maxMealsAllowed) {
      const exist = passangersKeys?.mealKeys[0]?.ssrKey;
      const newMealCount = mealCount + 1;
      setMealCount(newMealCount);
      localStorage.setItem(localStorageKey, newMealCount.toString());

      if (exist === passKey) {
        if (selectedMealCount <= maxMealsAllowed) {
          // Calculate the new meal count and price
          const newCount = addCount + 1;
          const newPrice = totalMealPrice + ml.price;
          // Call the updateTotalPrice function from the parent component to update the total price
          updateTotalPrice(newPrice);
          let count = addCount + 1;
          setAddCount(count);

          // Update the array of selected meal info and price
          setTotalMealInfo((prevTotalMealInfo) => [
            ...prevTotalMealInfo,
            ml.mealInfo,
          ]);
          setAllMealPrice((prevAllMealPrice) => [
            ...prevAllMealPrice,
            ml.price,
          ]);

          // Update passangersKeys with meal selection details
          setPassangersKeys((prev) => ({
            ...prev,
            segmentKey: segmentKey,
            legKey: legKey,
            mealCode: ml.mealCode,
            mealInfo: ml.mealInfo,
            from: from,
            to: to,
            mealPrice: ml.price,
            mealKeys: [
              {
                ssrKey: passKey,
                count: count,
              },
            ],
          }));

          let data = {
            ...passangersKeys,
            segmentKey: segmentKey,
            legKey: legKey,
            mealCode: ml.mealCode,
            mealInfo: ml.mealInfo,
            from: from,
            to: to,
            mealPrice: ml.price,
            mealKeys: [{ ssrKey: passKey, count: count }],
          };

          // Dispatch the meal selection action
          dispatch(setAddMealsForTravellers(data));

          // Dispatch was successful, reset the array of selected meal info and price
          setTotalMealInfo([]);
          setAllMealPrice([]);
        }
      } else {
        if (addCount <= totalTravellersCount) {
          const exist = passangersKeys?.mealKeys[0]?.ssrKey;
          if (exist !== passKey) {
            let counts = 0;
            let data = counts + 1;

            // Update the array of selected meal info and price
            setTotalMealInfo((prevTotalMealInfo) => [
              ...prevTotalMealInfo,
              ml.mealInfo,
            ]);
            setAllMealPrice((prevAllMealPrice) => [
              ...prevAllMealPrice,
              ml.price,
            ]);

            // Update passangersKeys with meal selection details
            setPassangersKeys({
              ...passangersKeys,
              legKey: legKey,
              mealKeys: [
                {
                  ssrKey: passKey,
                  count: data,
                  segmentKey: segmentKey,
                  mealCode: ml.mealCode,
                  mealPrice: ml.price,
                  mealInfo: ml.mealInfo,
                },
              ],
            });

            let datas = {
              ...passangersKeys,
              legKey: legKey,
              segmentKey: segmentKey,
              mealCode: ml.mealCode,
              mealInfo: ml.mealInfo,
              mealPrice: ml.price,
              mealKeys: [{ ssrKey: passKey, count: data }],
            };

            // Dispatch the meal selection action
            dispatch(setAddMealsForTravellers(datas));

            // Dispatch was successful, reset the array of selected meal info and price
            setTotalMealInfo([]);
            setAllMealPrice([]);
          }
        }
      }
    }
  };

  const handleRemoveMeals = (passKey) => {
    const exist = passangersKeys?.mealKeys[0]?.ssrKey;
    const newMealCount = Math.max(mealCount - 1, 0);
    setMealCount(newMealCount);
    const selectedMealCount = selectedAddOns.meal.filter(
      (meal) => meal.segmentKey === segmentKey
    ).length;

    if (exist === passKey) {
      if (selectedMealCount > 0) {
        const newCount = Math.max(addCount - 1, 0);
        const newPrice = totalMealPrice - ml.price;

        // Call the updateTotalPrice function from the parent component to update the total price
        updateTotalPrice(newPrice);

        setAddCount(newCount);

        // Update the array of selected meal info and price
        setTotalMealInfo((prevTotalMealInfo) => [
          ...prevTotalMealInfo,
          ml.mealInfo,
        ]);
        setAllMealPrice((prevAllMealPrice) => [...prevAllMealPrice, ml.price]);

        // Update passangersKeys with meal selection details
        setPassangersKeys((prev) => ({
          ...prev,
          legKey: legKey,
          mealCode: ml.mealCode,
          mealInfo: ml.mealInfo,
          mealPrice: ml.price,
          segmentKey: segmentKey,
          mealKeys: [
            {
              ssrKey: passKey,
              count: newCount,
            },
          ],
        }));

        let data = {
          ...passangersKeys,
          legKey: legKey,
          mealCode: ml.mealCode,
          mealInfo: ml.mealInfo,
          mealPrice: ml.price,
          segmentKey: segmentKey,
          mealKeys: [{ ssrKey: passKey, count: newCount }],
        };

        // Dispatch the meal removal action
        dispatch(setRemoveMealsForTravellers(data));

        removeOneItemLS(segmentKey, ml?.mealInfo, tbId);

        // Dispatch was successful, reset the array of selected meal info and price
        setTotalMealInfo([]);
        setAllMealPrice([]);
      }
    }
  };

  // const handleRemoveMeals = (passKey) => {
  //   console.log("remove button", passangersKeys);
  //   const newPrice = totalMealPrice - passangersKeys?.mealPrice;
  //   const newMealCount = Math.max(mealCount - 1, 0);
  //   setMealCount(newMealCount);
  //   localStorage.setItem(localStorageKey, newMealCount.toString());
  //   // Call the updateTotalPrice function from the parent component to update the total price
  //   updateTotalPrice(newPrice);
  //   console.log(updateTotalPrice, "hdjshdjhsjd");
  //   const exist = passangersKeys?.mealKeys[0]?.ssrKey;
  //   // if (exist === passKey && addCount > 0) {
  //   console.log("exist if condidtion for button page");
  //   // if(addCount <= totalTravellersCount){
  //   let count = addCount - 1;
  //   setAddCount(count);
  //   console.log(count, "count new minas");

  //   setPassangersKeys((prev) => ({
  //     ...prev,
  //     mealKeys: [
  //       {
  //         ssrKey: passKey,
  //         count: count,
  //       },
  //     ],
  //   }));
  //   let data = {
  //     ...passangersKeys,
  //     mealKeys: [{ ssrKey: passKey, count: count }],
  //   };
  //   // const newPrice = totalMealPrice - passangersKeys?.mealPrice;
  //   // Call the updateTotalPrice function from the parent component to update the total price
  //   updateTotalPrice(newPrice);
  //   dispatch(setRemoveMealsForTravellers(data));
  //   dispatch(deleteMealWithoutCount());
  //   // Calculate the new meal count and price
  //   const newCount = addCount - 1;

  //   console.log(totalMealPrice, "dushjdshdjk");
  //   // } else {
  //   //   if (addCount <= totalTravellersCount) {
  //   //     const exist = passangersKeys?.mealKeys[0]?.ssrKey;
  //   //     if (exist !== passKey) {
  //   //       let counts = addCount;
  //   //       let data = counts - 1;
  //   //       setAddCount(data);
  //   //       setPassangersKeys({
  //   //         ...passangersKeys,
  //   //         legKey: legKey,
  //   //         mealKeys: [{ ssrKey: passKey, count: data }],
  //   //       });
  //   //       let datas = {
  //   //         ...passangersKeys,
  //   //         legKey: legKey,
  //   //         mealKeys: [{ ssrKey: passKey, count: data }],
  //   //       };
  //   //       const newPrice = totalMealPrice - passangersKeys?.mealPrice;
  //   //       // Call the updateTotalPrice function from the parent component to update the total price
  //   //       updateTotalPrice(newPrice);
  //   //       dispatch(setRemoveMealsForTravellers(datas));
  //   //       dispatch(deleteMealWithoutCount());
  //   //     }
  //   //   }
  //   // }
  // };

  const resetMealCountLocally = () => {
    setAddCount(0);
    localStorage.removeItem(localStorageKey);
    setMealCount(0);
    setPassangersKeys(null);
    resetMealCount(); // Call the prop function to reset meal count and total meal price in the parent component
  };

  return (
    <div className="flex gap-2 justify-center items-center p-2">
      <button
        type="button"
        className="flex items-center justify-center bg-slate-200 rounded-full p-1 text-md w-4 h-4"
        onClick={() => {
          handleAddMeals(ml?.key);
        }}
        // disabled={check == totalTravellersCount }
      >
        +
      </button>

      {/* {
        check > 0 ? (
          <> */}
      <span className="text-sm p-2">{mealCount}</span>

      <button
        type="button"
        className="flex items-center justify-center bg-slate-200 rounded-full p-1 text-md w-4 h-4"
        onClick={() => handleRemoveMeals(ml?.key)}
        // disabled={addCount == 0}
      >
        -
      </button>
      {/* </>
        ) : ""
      } */}
    </div>
  );
}

export default FlightMealCountButton;
