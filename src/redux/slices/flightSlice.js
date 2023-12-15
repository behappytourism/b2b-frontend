import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tripType: "oneway",
  travellerDetails: [],

  travellers: {
    adult: 1,
    children: 0,
    infant: 0,
  },

  commonDetails: {
    phoneCode: "",
    email: "",
    contactNo: "",
  },

  selectedFlight: {},
  orderDetails: {},
  selectedAddOns: {
    seats: [],
    meal: [],
    luggage: [],
  },
  flightsData: [
    {
      cityFrom: "",
      cityTo: "",
      departureDate: "",
      returnDate: "",
      class: "",
    },
  ],
  row: {
    cityFrom: "",
    cityTo: "",
    departureDate: "",
    returnDate: "",
    class: "",
  },
  flightFullData: {},
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    setTripType: (state, { payload }) => {
      state.tripType = payload;
    },
    addFlightRow: (state, action) => {
      state.flightsData = [
        ...state.flightsData,
        {
          ...state.row,
          cityFrom: state.flightsData[state.flightsData.length - 1]?.cityTo,
        },
      ];
    },
    removeFlightRow: (state, action) => {
      const prevRows = [...state.flightsData];
      if (action.payload.index === "notMultiCity") {
        state.flightsData = [prevRows[0]];
      } else {
        prevRows.splice(action.payload.index, 1);
        state.flightsData = prevRows;
      }
    },

    handleTravellersChange: (state, { payload }) => {
      state.travellers = payload.data;
    },

    handleAddDetailsRows: (state, { payload }) => {
      const totalTravellers =
        state.travellers.adult + state.travellers.children;
      const row = state.travellerDetails[0];
      const detailsRows = [row];
      if (totalTravellers > 1) {
        for (let i = 1; i < totalTravellers; i++) {
          detailsRows.push(row);
        }
      }
      state.travellerDetails = detailsRows;
    },

    handleTravellerRowChange: (state, { payload }) => {
      const { value, name, index } = payload;
      state.travellerDetails[index][name] = value;
    },

    // handleTravellerPaxIdAdd: (state, { payload }) => {
    //   const { index, paxId } = payload;
    //   state.travellerDetails[index].paxId = paxId;
    // },

    handleTravellerPaxIdAdd: (state, { payload }) => {
      const { index, paxId } = payload;

      // Make sure the index is within bounds and travellerDetails[index] is defined
      if (index >= 0 && index < state.travellerDetails.length) {
        state.travellerDetails[index].paxId = paxId;
      } else {
       // console.error("Invalid index or undefined travellerDetails object.");
      }
    },

    
    handleTravellerPaxType: (state, { payload }) => {
      const { index, passengerType } = payload;

      // Make sure the index is within bounds and travellerDetails[index] is defined
      if (index >= 0 && index < state.travellerDetails.length) {
        state.travellerDetails[index].passengerType = passengerType;
      } else {
      //  console.error("Invalid index or undefined travellerDetails object.");
      }
    },

    // handleTravellerRowDobChange: (state, { payload }) => {
    //   const { index, value, name } = payload;
    //   state.travellerDetails[index].birthDate[name] = value
    // },

    handleTravellerRowDobChange: (state, { payload }) => {
      const { index, value, name } = payload;
    
      // If birthDate is already a string, update it
      if (typeof state.travellerDetails[index].birthDate === 'string') {
        // Split the existing string to get year, month, and day
        const [year, month, day] = state.travellerDetails[index].birthDate.split('-');
    
        // Update the specific year, month, or day
        if (name === 'year') {
          state.travellerDetails[index].birthDate = `${value}-${month}-${day}`;
        } else if (name === 'month') {
          state.travellerDetails[index].birthDate = `${year}-${value}-${day}`;
        } else if (name === 'day') {
          state.travellerDetails[index].birthDate = `${year}-${month}-${value}`;
        }
      } else {
        // Convert birthDate to a string
        state.travellerDetails[index].birthDate = `${value}-01-01`;
      }
    },
    


    handleTravellerRowExpiryChange: (state, { payload }) => {
      const { index, value, name } = payload;
      state.travellerDetails[index].passportExpiry[name] = value;
      const { day, month, year } = state.travellerDetails[index].passportExpiry;
      if (day && month && year) {
        state.travellerDetails[
          index
        ].passportExpiry = `${year}-${month}-${day}`;
      }

      //  const traveller = state.travellerDetails[index];
      // traveller.expiryDate[name] = value
    },

    handleEmailPhone: (state, { payload }) => {
      const { value, name } = payload;
      state.commonDetails[name] = value;
    },

    handleinitialDetails: (state, { payload }) => {
      const { adult, children, infant } = payload;
      let noOfINF = 0;
      for (let i = 1; i <= adult; i++) {
        state.travellerDetails.push({
          paxId: "",
          gender: "",
          firstName: "",
          lastName: "",
          nationality: "",
          passengerType: "",
          passportNumber: "",
          //  isInfant: false,
          // passportExpiry: {
          //   day: "",
          //   month: "",
          //   year: "",
          // },
          birthDate: "",
        });

        if (infant === adult) {
          state.travellerDetails.push({
            gender: "",
            firstName: "",
            lastName: "",
            nationality: "",
            passengerType: "",
            passportNumber: "",
            //  isInfant: false,
            // passportExpiry: {
            //   day: "",
            //   month: "",
            //   year: "",
            // },
            birthDate: "",
          });
        } else if (infant < adult && noOfINF < infant) {
          state.travellerDetails.push({
            gender: "",
            firstName: "",
            lastName: "",
            nationality: "",
            passengerType: "",
            passportNumber: "",
            // isInfant: true,
            // passportExpiry: {
            //   day: "",
            //   month: "",
            //   year: "",
            // },
            birthDate: "",
          });
          noOfINF++;
        }
      }
      for (let i = 1; i <= children; i++) {
        state.travellerDetails.push({
          paxId: "",
          gender: "",
          firstName: "",
          lastName: "",
          nationality: "",
          passengerType: "",
          passportNumber: "",
          //isInfant: false,
          // passportExpiry: {
          //   day: "",
          //   month: "",
          //   year: "",
          // },
          birthDate: "",
        });
      }
    },

    handleFlightDeatilsChange: (state, { payload }) => {
      const currentData = [...state.flightsData];
      const { name, value, index } = payload;
      currentData[index] = { ...currentData[index], [name]: value };

      if (
        state.tripType === "multicity" &&
        index < state.flightsData?.length - 1 &&
        name === "cityTo"
      ) {
        currentData[index + 1] = { ...currentData[index + 1], cityFrom: value };
      }
      state.flightsData = currentData;
    },
    // handleFlightDetailChange whithout multicity
    handleFlightDetailChangeZeroIndex: (state, { payload }) => {
      const { name, value } = payload;
      state.flightsData[0][name] = value;
    },
    handleRecentSearchCardClick: (state, { payload }) => {
      state.flightsData = payload?.flightsData;
      state.travellers = payload?.travellers;
      state.tripType = payload?.tripType;
    },
    setSelectedFlight: (state, { payload }) => {
      state.selectedFlight = payload;
    },
    orderFlightDetails: (state, { payload }) => {
      state.orderDetails = payload;
    },
    handleFlightAddOnsChange: (state, { payload }) => {
      state.selectedAddOns = {
        ...state.selectedAddOns,
        [payload.name]: [
          ...state.selectedAddOns?.[payload?.name],
          payload?.value,
        ],
      };
    },

    handleFullData: (state, { payload }) => {
      state.flightFullData = payload;
    },

    // setAddMealsForTravellers: (state, {payload})=>{
    //   console.log("Meal Payload:", payload);
    //     if(state.selectedAddOns?.meal?.length > 0){
    //       const exist = state.selectedAddOns.meal?.map((ele)=>{
    //        return ele.mealKeys?.findIndex(
    //           (keys)=>keys?.ssrKey === payload?.mealKeys[0]?.ssrKey
    //         )
    //       })
    //       if(!exist.includes(-1)) {
    //         state.selectedAddOns.meal?.map((ele)=>{
    //           ele?.mealKeys?.map((ky)=>{
    //             if(ky?.ssrKey === payload?.mealKeys[0]?.ssrKey){
    //               ky.count = payload?.mealKeys[0]?.count
    //             }
    //           })
    //         })
    //       }else{
    //         state.selectedAddOns?.meal?.map((ele)=>{
    //           ele.mealKeys = [...ele?.mealKeys, ...payload?.mealKeys]
    //         })
    //       }
    //     }else{
    //       state.selectedAddOns?.meal?.push(payload)
    //     }
    // },

    setAddMealsForTravellers: (state, { payload }) => {
      state.selectedAddOns?.meal?.push({
        segmentKey: payload.segmentKey,
        legKey: payload.legKey,
        mealCode: payload.mealCode,
        mealInfo: payload.mealInfo,
        mealPrice: payload.mealPrice,
        from: payload.from,
        to: payload.to,
      });
    },

    // setAddMealsForTravellers: (state, { payload }) => {
    //   if (state.selectedAddOns?.meal?.length > 0) {
    //     const existingMeal = state.selectedAddOns.meal.find(
    //       (meal) => meal.legKey === payload.legKey
    //     );

    //     if (existingMeal) {
    //       const mealIndex = existingMeal.mealKeys.findIndex(
    //         (key) => key.ssrKey === payload.mealKeys[0]?.ssrKey
    //       );

    //       if (mealIndex !== -1) {
    //         existingMeal.mealKeys[mealIndex].count = payload.mealKeys[0]?.count;
    //       } else {
    //         existingMeal.mealKeys.push(payload.mealKeys[0]);
    //       }
    //     } else {
    //       state.selectedAddOns.meal.push({
    //         legKey: payload.legKey,
    //         mealKeys: payload.mealKeys,
    //       });
    //     }
    //   } else {
    //     state.selectedAddOns.meal.push({
    //       legKey: payload.legKey,
    //       mealKeys: payload.mealKeys,
    //     });
    //   }
    // },

    setRemoveMealsForTravellers: (state, { payload }) => {
      if (state.selectedAddOns && state.selectedAddOns.meal) {
        state.selectedAddOns.meal = state.selectedAddOns.meal.filter(
          (meal) =>
            meal.segmentKey !== payload.segmentKey ||
            meal.legKey !== payload.legKey ||
            meal.mealCode !== payload.mealCode ||
            meal.mealInfo !== payload.mealInfo ||
            meal.mealPrice !== payload.mealPrice
        );
      }
    },

    // setRemoveMealsForTravellers: (state, { payload }) => {
    //   const mealToRemoveIndex = state.selectedAddOns?.meal?.findIndex(
    //     (meal) => meal.mealKeys[0]?.ssrKey === payload.ssrKey
    //   );

    //   if (mealToRemoveIndex !== -1) {
    //     // Remove the meal from the array
    //     state.selectedAddOns.meal.splice(mealToRemoveIndex, 1);
    //   }

    //   // Return the updated state
    //   return state;
    // },

    // setRemoveMealsForTravellers: (state, { payload }) => {
    //   if (state.selectedAddOns?.meal?.length > 0) {
    //     const exist = state.selectedAddOns?.meal?.mealKeys?.findIndex(
    //       (keys) => keys?.ssrKey === payload?.mealKeys[0]?.ssrKey
    //     );
    //     if (exist !== -1) {
    //       state.selectedAddOns?.meal?.map((ele) => {
    //         ele.mealKeys?.map((dt) => {
    //           if (dt?.ssrKey === payload?.mealKeys[0]?.ssrKey) {
    //             dt.count = payload?.mealKeys[0]?.count;
    //           }
    //         });
    //       });
    //     } else {
    //       state.selectedAddOns?.meal?.map((ele) => {
    //         ele.mealKeys = [...ele?.mealKeys, ...payload?.mealKeys];
    //       });
    //     }
    //   } else {
    //     state.selectedAddOns?.meal?.push(payload);
    //   }
    // },

    deleteMealWithoutCount: (state, { payload }) => {
      state.selectedAddOns.meal?.map((ele) => {
        ele.mealKeys = ele?.mealKeys?.filter((dt) => dt?.count !== 0);
        if (!ele?.mealKeys.length) {
          state.selectedAddOns.meal = [];
        }
      });
    },

    // addSeateForTravellers:(state, {payload})=>{
    //   console.log("seat Payload:", payload);
    //   const totalTravellers = state.travellers?.adult + state.travellers?.children
    //   if(!state.selectedAddOns.seats.length){
    //     state.selectedAddOns.seats.push({
    //       segmentKey: payload.segmentKey,
    //       seatCode: payload.seatCode,
    //       seatNumber: payload.seatNumber,
    //       seatKeys: payload.seatKeys,
    //     })
    //   }else{
    //     let length = state.selectedAddOns.seats[0]?.seatKeys?.length
    //     console.log(length);
    //     if (length === totalTravellers) {
    //       state.selectedAddOns.seats.map((dt)=>{
    //         dt.seatKeys.pop()
    //       })
    //     }
    //     state.selectedAddOns?.seats?.map((ele)=>{
    //       ele.seatKeys = [...ele.seatKeys, ...payload.seatKeys]
    //     })
    //   }

    // },

    addSeateForTravellers: (state, { payload }) => {
      const seatExists = state.selectedAddOns.seats.some(
        (seat) =>
          seat.segmentKey === payload.segmentKey &&
          seat.seatNumber === payload.seatNumber
      );

      if (!seatExists) {
        state.selectedAddOns.seats.push({
          segmentKey: payload.segmentKey,
          seatCode: payload.seatCode,
          seatNumber: payload.seatNumber,
          seatKeys: payload.seatKeys,
          seatPrice: payload.seatPrice,
        });
      }
    },

    resetSelectedAddOns: (state) => {
      state.selectedAddOns = {
        seats: [],
        meal: [],
        luggage: [],
      };
    },

    resetSelectedAddOnsSeats: (state) => {
      state.selectedAddOns = {
        ...state.selectedAddOns,
        seats: [],
      };
    },

    resetSelectedAddOnsMeals: (state) => {
      state.selectedAddOns = {
        ...state.selectedAddOns,
        meal: [],
      };
    },

    resetSelectedAddOnsLuggages: (state) => {
      state.selectedAddOns = {
        ...state.selectedAddOns,
        luggage: [],
      };
    },

    removeSeate: (state, { payload }) => {
      if (payload.status === true) {
        state.selectedAddOns.seats = state.selectedAddOns.seats.map((seat) => {
          if (seat.seatKeys && seat.seatKeys.length > 0) {
            seat.seatKeys = seat.seatKeys.filter(
              (data) => data !== payload.passengerKey
            );
          }
          return seat;
        });
      }
    },

    removeSeatForTravellers: (state, { payload }) => {
      console.log(payload, "seat payload");
      state.selectedAddOns.seats = state.selectedAddOns.seats.filter(
        (seat) =>
          seat.segmentKey !== payload.segmentKey ||
          seat.seatCode !== payload.seatCode ||
          seat.seatNumber !== payload.seatNumber ||
          seat.seatKeys.join(",") !== payload.seatKeys.join(",") ||
          seat.seatPrice !== payload.seatPrice
      );
    },

    // setAddBaggageForTravellers:(state, {payload})=>{
    //   console.log("buggage Payload:", payload);
    //   if(state.selectedAddOns?.luggage?.length > 0){
    //     const exist = state.selectedAddOns.luggage?.map((ele)=>{
    //      return ele.baggageKeys?.findIndex(
    //         (keys)=>keys?.ssrKey === payload?.baggageKeys[0]?.ssrKey
    //       )
    //     })
    //     if(!exist.includes(-1)) {
    //       state.selectedAddOns.luggage?.map((ele)=>{
    //         ele?.baggageKeys?.map((ky)=>{
    //           if(ky?.ssrKey === payload?.baggageKeys[0]?.ssrKey){
    //             ky.count = payload?.baggageKeys[0]?.count
    //           }
    //         })
    //       })
    //     }else{
    //       state.selectedAddOns?.luggage?.map((ele)=>{
    //         ele.baggageKeys = [...ele?.baggageKeys, ...payload?.baggageKeys]
    //       })
    //     }
    //   }else{
    //     state.selectedAddOns?.luggage?.push(payload)
    //   }
    // },

    setAddBaggageForTravellers: (state, { payload }) => {
      state.selectedAddOns?.luggage?.push({
        baggageKeys: payload.journeyKey,
        segmentKey: payload.segmentKey,
        baggageCode: payload.baggageCode,
        baggageInfo: payload.baggageInfo,
        baggagePrice: payload.baggagePrice,
      });
    },

    // setAddBaggageForTravellers: (state, { payload }) => {
    //   const { journeyKey, baggageKeys } = payload.addedBaggageList[0];

    //   const existingBaggageIndex = state.selectedAddOns.luggage.findIndex(
    //     (baggage) => baggage.journeyKey === journeyKey
    //   );

    //   if (existingBaggageIndex !== -1) {
    //     const existingBaggage = state.selectedAddOns.luggage[existingBaggageIndex];
    //     const existingBaggageKeys = existingBaggage.baggageKeys;

    //     const baggageKeyIndex = existingBaggageKeys.findIndex(
    //       (key) => key.ssrKey === baggageKeys[0].ssrKey
    //     );

    //     if (baggageKeyIndex !== -1) {
    //       existingBaggageKeys[baggageKeyIndex].count = baggageKeys[0].count;
    //     } else {
    //       existingBaggageKeys.push(baggageKeys[0]);
    //     }
    //   } else {
    //     state.selectedAddOns.luggage.push({
    //       journeyKey: journeyKey,
    //       baggageKeys: baggageKeys,
    //     });
    //   }
    // },

    deleteBaggageWithoutCount: (state, { payload }) => {
      state.selectedAddOns.luggage?.map((ele) => {
        ele.baggageKeys = ele?.baggageKeys?.filter((dt) => dt?.count !== 0);
        if (!ele?.baggageKeys.length) {
          state.selectedAddOns.luggage = [];
        }
      });
    },

    setRemoveBaggageForTravellers: (state, { payload }) => {
      state.selectedAddOns.luggage = state.selectedAddOns.luggage.filter(
        // if (state.selectedAddOns && state.selectedAddOns.luggage) {
        //   state.selectedAddOns.luggage = state.selectedAddOns.luggage.filter(
        (baggage) =>
          baggage.segmentKey !== payload.segmentKey ||
          baggage.baggageCode !== payload.baggageCode ||
          // baggage.baggageKeys.join(",") !== payload.baggageKeys.join(",") ||
          baggage.baggageKeys !== payload.journeyKey ||
          baggage.baggageInfo !== payload.baggageInfo ||
          baggage.baggagePrice !== payload.baggagePrice
      );
    },

    // setRemoveMealsForTravellers: (state, { payload }) => {
    //   console.log("meal Payload:", payload);
    //   if (state.selectedAddOns && state.selectedAddOns.meal) {
    //     state.selectedAddOns.meal = state.selectedAddOns.meal.filter(
    //       (meal) =>
    //         meal.segmentKey !== payload.segmentKey ||
    //         meal.legKey !== payload.legKey ||
    //         meal.mealCode !== payload.mealCode ||
    //         meal.mealInfo !== payload.mealInfo ||
    //         meal.mealPrice !== payload.mealPrice
    //     );
    //   }
    // },

    // setRemoveBaggageForTravellers: (state, { payload }) => {
    //   if (state.selectedAddOns?.luggage?.length > 0) {
    //     const exist = state.selectedAddOns?.luggage?.baggageKeys?.findIndex(
    //       (keys) => keys?.ssrKey === payload?.baggageKeys[0]?.ssrKey
    //     );
    //     if (exist !== -1) {
    //       state.selectedAddOns?.luggage?.map((ele) => {
    //         ele.baggageKeys?.map((dt) => {
    //           if (dt?.ssrKey === payload?.baggageKeys[0]?.ssrKey) {
    //             dt.count = payload?.baggageKeys[0]?.count;
    //           }
    //         });
    //       });
    //     } else {
    //       state.selectedAddOns?.luggage?.map((ele) => {
    //         ele.baggageKeys = [...ele?.baggageKeys, ...payload?.baggageKeys];
    //       });
    //     }
    //   } else {
    //     state.selectedAddOns?.luggage?.push(payload);
    //   }
    // },
  },
});

export const {
  setTripType,
  addFlightRow,
  removeFlightRow,
  handleTravellersChange,
  handleFlightDeatilsChange,
  handleFlightAddOnsChange,
  handleTravellerRowChange,
  handleTravellerRowDobChange,
  handleTravellerRowExpiryChange,
  setSelectedFlight,
  handleRecentSearchCardClick,
  handleinitialDetails,
  handleEmailPhone,
  orderFlightDetails,
  handleFullData,
  setAddBaggageForTravellers,
  setAddMealsForTravellers,
  setRemoveBaggageForTravellers,
  setRemoveMealsForTravellers,
  removeSeate,
  deleteBaggageWithoutCount,
  addSeateForTravellers,
  deleteMealWithoutCount,
  resetSelectedAddOns,
  resetSelectedAddOnsSeats,
  resetSelectedAddOnsMeals,
  resetSelectedAddOnsLuggages,
  handleTravellerPaxIdAdd,
  handleTravellerPaxType,
  removeSeatForTravellers,

  // new
  handleFlightDetailChangeZeroIndex,
} = flightSlice.actions;

export default flightSlice.reducer;
