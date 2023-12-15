import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  airports: [],
  cities: [],
  excursions: [],
  visaCountry: [],
  clientName: "Sir / Madam",
  noOfAdults: 2,
  noOfChildren: 0,
  checkInDate: "",
  checkOutDate: "",
  childrenAges: [],
  paxType: "",
  arrivalAirport: {
    id: "",
    name: "",
    iata: "",
    terminalCode: "",
    terminalId: "",
    terminalName: ""
  },
  isArrivalAirportDisabled: false,
  departureAirport: {
    id: "",
    name: "",
    iata: "",
    terminalCode: "",
    terminalId: "",
    terminalName: ""
  },
  isDepartureAirportDisabled: false,
  isHotelQuotationDisabled: false,
  isVisaQuotaionsDisabled: false,
  isTransferQuotationDisabled: false,
  isSupplimentQuotationDisabled: false,
  isExcursionQuotationDisabled: false,
  isAlreadyBooked: false,
  stays: [
    {
      hotels: [],
    },
  ],
  selectedStayIndex: 0,
  selectedHotelIndex: 0,
  transfer: [],
  selectedVisa: {},
  selectedExcursionType: [],
  selectedExcursion: [],
  selectedExcursionSuppliments: [],
  selectedExcursionTypeSuppliments: [],
  selectedVisaId: {},
  selectedHotel: {},
  selectedExcursionIds: [],
  selectedExcSupplimentsIds: [],
  excursionFiltered: [],
  excSupplimentFiltered: [],
  quotationCurrency: "AED",
  selectedVisaNationality: "",
  excursionFilteredNew:[],
  excursionSuppFilteredNew: [],
  searcheExcursions:[],
  searchExcursionSuppliments:[],
  pickUpPlaces:{
    placeId:"",
    note:""
  }
};

export const quotationsSlice = createSlice({
  name: "quotations",
  initialState,
  reducers: {
    setInitialData: (state, action) => {
      state.airports = action.payload?.airports;
      state.cities = action.payload?.cities;
      state.excursions = action.payload?.excursions;
      state.visaCountry = action.payload?.visaCountry;
      state.selectedVisa = action.payload?.visaCountry[0];
      // filtered excursion - aswin@latest
      // state.excursionFiltered = action.payload?.excursions.map((item) => ({
      //   ...item,
      //   isSelected: false,
      //   selectedExcursionType: item?.qtnActivityType === "ticket" ? "Ticket" : "TicketWithTransfer",
      // }));

      // Filtered suppliments set initial
      // state.excSupplimentFiltered = action.payload?.excursions.map((items)=>({
      //   ...items,
      //   isSelected: false,
      //   selectedExcursionType: items?.qtnActivityType === "ticket" ? "Ticket" : "TicketWithTransfer"
      // }))
    },
    // filtered excursion - aswin@latest
    setFilteredExcursion: (state, { payload }) => {
      
      const index = state.excursionFiltered.findIndex(
        (item) => item._id === payload.id
      );

      if (index !== -1) {
        state.excursionFiltered[index][payload.name] = payload.value;
      }

      if(index !== -1 && payload.value !== "Private" && state.excursionFiltered[index].selectedExcursionType !== "Private" ){
        if(state.excursionFiltered[index].vehicleType) {

          state.excursionFiltered[index].vehicleType = []
        }
      }

      if(state.selectedExcursionIds?.length){
        const index = state.selectedExcursionIds.findIndex(
          (item)=> item._id === payload.id
        )

        if(index !== -1){
          state.selectedExcursionIds[index][payload.name] = payload.value;
        }

        if(index !== -1 && payload.value !== "Private" && state.selectedExcursionIds[index].selectedExcursionType !== "Private"){
          if(state.selectedExcursionIds[index].vehicleType) {
            state.selectedExcursionIds[index].vehicleType = []
          }
        }
      }

      if(state.searcheExcursions?.length){
        const index = state.searcheExcursions.findIndex(
          (item)=> item._id === payload.id
        )

        if(index !== -1){
          state.searcheExcursions[index][payload.name] = payload.value;
        }

        if(index !== -1 && payload.value !== "Private" && state.searcheExcursions[index].selectedExcursionType !== "Private"){
          if(state.searcheExcursions[index].vehicleType) {
            state.searcheExcursions[index].vehicleType = []
          }
        }
      }
      
   
    },

    setFilteredSuppliments: (state, {payload})=>{
      const index = state.excSupplimentFiltered.findIndex(
        (items)=> items._id === payload.id
      )

      if(index !== -1) {
        state.excSupplimentFiltered[index][payload.name] = payload.value;
      }

      if(index !== -1 && payload.value !== "Private" && state.excSupplimentFiltered[index].selectedExcursionType !== "Private" ){
        if(state.excSupplimentFiltered[index].vehicleType) {

          state.excSupplimentFiltered[index].vehicleType = []
        }
      }

      if(state.selectedExcSupplimentsIds?.length){
        const index = state.selectedExcSupplimentsIds.findIndex(
          (item)=> item._id === payload.id
        )

        if(index !== -1){
          state.selectedExcSupplimentsIds[index][payload.name] = payload.value;
        }

        if(index !== -1 && payload.value !== "Private" && state.selectedExcSupplimentsIds[index].selectedExcursionType !== "Private"){
          if(state.selectedExcSupplimentsIds[index].vehicleType) {
            state.selectedExcSupplimentsIds[index].vehicleType = []
          }
        }
      }

      if(state.searchExcursionSuppliments?.length){
         const index = state.searchExcursionSuppliments.findIndex(
        (items)=> items._id === payload.id
      )

      if(index !== -1) {
        state.searchExcursionSuppliments[index][payload.name] = payload.value;
      }

      if(index !== -1 && payload.value !== "Private" && state.searchExcursionSuppliments[index].selectedExcursionType !== "Private" ){
        if(state.searchExcursionSuppliments[index].vehicleType) {

          state.searchExcursionSuppliments[index].vehicleType = []
        }
      }
      }
    
    },

    setVehicleTypeForSelectedExc:(state, {payload})=>{
      
      const index = state.excursionFiltered.findIndex(
        (item)=>item._id === payload?.excursionId
      )
      if(index !== -1){
      if(state.excursionFiltered[index]?.vehicleType?.length > 0){
          const exist = state.excursionFiltered[index].vehicleType?.findIndex(
            (items)=>items.vehicle === payload.vehicle
          )
  
          if(exist !== -1){
            // state.excursionFiltered[index].vehicleType[exist].vehicle = payload?.vehicle
            state.excursionFiltered[index].vehicleType[exist].count = payload?.count
          }else{
            state.excursionFiltered[index].vehicleType[0].vehicle = payload?.vehicle
            state.excursionFiltered[index].vehicleType[0].count = payload?.count
          }
        } else {
          state.excursionFiltered[index]?.vehicleType?.push({
            vehicle:payload?.vehicle,
            count:payload?.count
          })
        }
      }

      // excursion transfer changes for selectedExcursion choosed array
      if(state.selectedExcursionIds?.length){
        const index = state.selectedExcursionIds.findIndex(
          (item)=> item._id === payload.excursionId
        )

        if(index !== -1) {
          if(state.selectedExcursionIds[index]?.vehicleType?.length > 0) {
            const exist = state.selectedExcursionIds[index].vehicleType?.findIndex(
              (items)=> items.vehicle === payload.vehicle
            )

            if(exist !== -1){
              state.selectedExcursionIds[index].vehicleType[exist].count = payload?.count
            } else {
              state.selectedExcursionIds[index].vehicleType[0].vehicle = payload?.vehicle
              state.selectedExcursionIds[index].vehicleType[0].count = payload?.count
            }

          } else {
            state.selectedExcursionIds[index]?.vehicleType?.push({
              vehicle:payload?.vehicle,
              count:payload?.count
            })
          }
        }
      }


      // excursion transfer search array transfer changes
      if(state.searcheExcursions?.length){
        const index = state.searcheExcursions.findIndex(
          (item)=>item._id === payload?.excursionId
        )
        if(index !== -1){
        if(state.searcheExcursions[index]?.vehicleType?.length > 0){
            const exist = state.searcheExcursions[index].vehicleType?.findIndex(
              (items)=>items.vehicle === payload.vehicle
            )
    
            if(exist !== -1){
              // state.excursionFiltered[index].vehicleType[exist].vehicle = payload?.vehicle
              state.searcheExcursions[index].vehicleType[exist].count = payload?.count
            }else{
              state.searcheExcursions[index].vehicleType[0].vehicle = payload?.vehicle
              state.searcheExcursions[index].vehicleType[0].count = payload?.count
            }
          } else {
            state.searcheExcursions[index]?.vehicleType?.push({
              vehicle:payload?.vehicle,
              count:payload?.count
            })
          }
        }
      }
    },

    setVehiclTypeForEcxSuppliment:(state, {payload})=>{
      const index = state.excSupplimentFiltered.findIndex(
        (item)=>item._id === payload?.excursionId
      )
      
      if(index !== -1){
      if(state.excSupplimentFiltered[index]?.vehicleType?.length > 0){
          const exist = state.excSupplimentFiltered[index].vehicleType?.findIndex(
            (items)=>items.vehicle === payload.vehicle
          )
  
          if(exist !== -1){
            // state.excursionFiltered[index].vehicleType[exist].vehicle = payload?.vehicle
            state.excSupplimentFiltered[index].vehicleType[exist].count = payload?.count
          }else{
            state.excSupplimentFiltered[index].vehicleType[0].vehicle = payload?.vehicle
            state.excSupplimentFiltered[index].vehicleType[0].count = payload?.count
          }
        } else {
          state.excSupplimentFiltered[index]?.vehicleType?.push({
            vehicle:payload?.vehicle,
            count:payload?.count
          })
        }
      }


      if(state.selectedExcSupplimentsIds?.length){
        const index = state.selectedExcSupplimentsIds.findIndex(
          (item)=> item._id === payload.excursionId
        )

        if(index !== -1) {
          if(state.selectedExcSupplimentsIds[index]?.vehicleType?.length > 0) {
            const exist = state.selectedExcSupplimentsIds[index].vehicleType?.findIndex(
              (items)=> items.vehicle === payload.vehicle
            )

            if(exist !== -1){
              state.selectedExcSupplimentsIds[index].vehicleType[exist].count = payload?.count
            } else {
              state.selectedExcSupplimentsIds[index].vehicleType[0].vehicle = payload?.vehicle
              state.selectedExcSupplimentsIds[index].vehicleType[0].count = payload?.count
            }

          } else {
            state.selectedExcSupplimentsIds[index]?.vehicleType?.push({
              vehicle:payload?.vehicle,
              count:payload?.count
            })
          }
        }
      }


      if(state.searchExcursionSuppliments?.length){
        const index = state.searchExcursionSuppliments.findIndex(
          (item)=>item._id === payload?.excursionId
        )
        if(index !== -1){
        if(state.searchExcursionSuppliments[index]?.vehicleType?.length > 0){
            const exist = state.searchExcursionSuppliments[index].vehicleType?.findIndex(
              (items)=>items.vehicle === payload.vehicle
            )
    
            if(exist !== -1){
              // state.excursionFiltered[index].vehicleType[exist].vehicle = payload?.vehicle
              state.searchExcursionSuppliments[index].vehicleType[exist].count = payload?.count
            }else{
              state.searchExcursionSuppliments[index].vehicleType[0].vehicle = payload?.vehicle
              state.searchExcursionSuppliments[index].vehicleType[0].count = payload?.count
            }
          } else {
            state.searchExcursionSuppliments[index]?.vehicleType?.push({
              vehicle:payload?.vehicle,
              count:payload?.count
            })
          }
        }
      }

    },

    setArrivalAirport: (state, action) => {
      state.arrivalAirport.id = action.payload._id;
      state.arrivalAirport.name = action.payload.airportName;
      state.arrivalAirport.iata = action.payload.iataCode;
      state.arrivalAirport.terminalId = action.payload.terminals?._id;
      state.arrivalAirport.terminalCode = action.payload.terminals?.terminalCode;
      state.arrivalAirport.terminalName = action.payload.terminals?.terminalName
    },
    setDepartureAirport: (state, action) => {
      state.departureAirport.id = action.payload._id;
      state.departureAirport.name = action.payload.airportName;
      state.departureAirport.iata = action.payload.iataCode;
      state.departureAirport.terminalId = action.payload.terminals?._id;
      state.departureAirport.terminalCode = action.payload.terminals?.terminalCode;
      state.departureAirport.terminalName = action.payload.terminals?.terminalName
    },
    setArrivalAirportDisabled: (state, action) => {
      state.isArrivalAirportDisabled = action.payload;
    },
    setDepartureAirportDisabled: (state, action) => {
      state.isDepartureAirportDisabled = action.payload;
    },
    setArrivalDate: (state, action) => {
      state.checkInDate = action.payload;
    },
    setDepartureDate: (state, action) => {
        state.checkOutDate = action.payload;
    },
    setPaxType: (state, action) => {
      state.paxType = action.payload;
    },
    setTravellerDetails: (state, action) => {
      state.noOfAdults = action.payload.noOfAdults;
      state.noOfChildren = action.payload.noOfChildren;
      if (action.payload.noOfChildren < 1) {
        state.childrenAges = [];
      } else {
        state.childrenAges = state.childrenAges.slice(
          0,
          action.payload.noOfChildren
        );
      }
    },
    pushValueToChildrenAges: (state, action) => {
      state.childrenAges.push(4);
    },
    setChildrenAges: (state, action) => {
      state.childrenAges[action.payload.index] = action.payload.value;
    },
    setIsHotelQuotationDisabled: (state, action) => {
      state.isHotelQuotationDisabled = action.payload;
    },
    setVisaQuotationDisabled: (state, { payload }) => {
      state.isVisaQuotaionsDisabled = payload;
      state.selectedVisaId = {};
    },

    setTransferQuotationDisabled: (state, { payload }) => {
      state.isTransferQuotationDisabled = payload;
    },

    clearTransferDataSkip: (state, {payload})=>{
      if(state.transfer.length){
        state.transfer = []
      }
    },

    setExcursionDisabled: (state, { payload }) => {
      state.isExcursionQuotationDisabled = payload;
      state.selectedExcursionType = [];
    },

    clearDataDisabled: (state, { payload }) => {
      state.isExcursionQuotationDisabled = payload;
    },

    setSupplimentsDisabled: (state, { payload }) => {
      state.isSupplimentQuotationDisabled = payload;
      state.selectedExcursionTypeSuppliments = [];
    },

    setAlreadyBooked: (state, { payload }) => {
      state.isAlreadyBooked = payload;
    },

    setOptionalSuppliemtsDisabled: (state, { payload }) => {
      state.isSupplimentQuotationDisabled = payload;
      if (payload === true) {
        if (state.selectedExcursionSuppliments) {
          state.selectedExcursionSuppliments = [];
        }
      }
    },

    addStayPlusOne: (state, action) => {
      state.stays.push({
        hotels: [],
      });
    },
    selectedHotel: (state, action) => {
      state.selectedHotel = {
        hotelId: "",
        hotelDetails: "",
        checkInDate: "",
        checkOutDate: "",
        placeName: "",
        cityId: "",
        starCategory: "",
        isBreakfastIncluded: false,
        isRefundable: false,
        roomTypeName: "",
        boardTypeCode: "",
        boardTypeName: "",
        roomTypeId: "",
        hotelData: {},
      };
    },
    removeStayMinusOne: (state, action) => {
      const filteredStay = state.stays.filter(
        (_, index) => index !== action.payload
      );
      state.stays = filteredStay;
    },

    emptyHotelDetails: (state, { paload }) => {
      state.stays = [];
      state.transfer = [];
    },

    setHotelInStay: (state, action) => {
      state.selectedHotel[action.payload.name ]= action.payload.value;
    },
    setHotelToStayArray: (state, action) => {
      if (
        action.payload.hotelIndex >=
        state.stays[action.payload.stayIndex].hotels.length
      ) {
        state.stays[action.payload.stayIndex].hotels.push(state.selectedHotel);
      } else {
        state.stays[action.payload.stayIndex].hotels[
          action.payload.hotelIndex
        ] = state.selectedHotel;
      }
      state.selectedHotel = {};
    },
    editHotelStay: (state, { payload }) => {
      if (state.stays[payload.stayIndex].hotels[payload.hotelIndex]) {
        state.stays[payload.stayIndex].hotels[payload.hotelIndex][
          payload.name
        ] = payload.value;
      }
    },

    setIndexesForAssertion: (state, action) => {
      state.selectedStayIndex = action.payload.stayIndex;
      state.selectedHotelIndex = action.payload.hotelIndex;
    },

    removeHotelFromStay: (state, action) => {
      const { stayIndex, hotelIndex } = action.payload;
      // Remove the hotel from the stays array
      const filteredHotels = state.stays[stayIndex].hotels?.filter(
        (_, index) => hotelIndex !== index
      );
      state.stays[stayIndex].hotels = filteredHotels;
    },

    removeTransferEditSide: (state, { payload }) => {
      state.transfer = [];
    },

    addSuggestHotelStayPlusOne: (state, action) => {
      if (state.stays?.length > 0 && state.stays[0]?.hotels?.length < 1) {
        state.stays[0].hotels.push({
          hotelId: "",
          hotelDetails: "",
          checkInDate: "",
          checkOutDate: "",
          placeName: "",
          cityId: "",
          starCategory: "",
          isBreakfastIncluded: false,
          isRefundable: false,
          roomTypeName: "",
          boardTypeCode: "",
          boardTypeName: "",
          roomTypeId: "",
          hotelData: {},
        });
      } else {
        state.stays.push({
          hotels: [
            {
              hotelId: "",
              hotelDetails: "",
              checkInDate: "",
              checkOutDate: "",
              placeName: "",
              cityId: "",
              starCategory: "",
              isBreakfastIncluded: false,
              isRefundable: false,
              roomTypeName: "",
              boardTypeCode: "",
              boardTypeName: "",
              roomTypeId: "",
              hotelData: {},
            },
          ],
        });
      }
    },
    removeSuggestHotelStayMinusOne: (state, action) => {
      const filteredStay = state.stays.filter((_, index) => {
        return index !== action.payload;
      });
      state.stays = filteredStay;
    },
    setTransferValues: (state, action) => {
      state.transfer[action.payload?.stayIndex].stays[
        action.payload?.hotelIndex
      ][action.payload.name] = action.payload.value;
    },
    setVehiclesInVehicleTypes: (state, action) => {
      const filteredData = action.payload.value?.map((item) => {
        const data = {
          vehicle: item?.vehicle?._id,
          count: item?.count || item?.count > 0 ? item?.count : 0,
          name: item?.vehicle?.name,
        };
        return data;
      });
      state.transfer[action.payload.stayIndex].stays[
        action.payload.hotelIndex
      ].vehicleTypes = filteredData;
    },

    addCountVehicle: (state, action) => {
      for (
        let i = 0;
        i <
        state.transfer[action.payload?.stayIndex].stays[
          action.payload?.hotelIndex
        ].vehicleTypes?.length;
        i++
      ) {
        if (
          action.payload?.id ===
          state.transfer[action.payload?.stayIndex].stays[
            action.payload?.hotelIndex
          ].vehicleTypes[i]?.vehicle
        ) {
          state.transfer[action.payload?.stayIndex].stays[
            action.payload?.hotelIndex
          ].vehicleTypes[i].count = action.payload.value;
        }
      }
    },

    addCountVehicleEditSide: (state, { payload }) => {
      const { stayIndex, hotelIndex, id, value } = payload;

      const stays = state.transfer[stayIndex].stays;
      const vehicleTypes = stays[hotelIndex].vehicleTypes;

      const vehicleIndex = vehicleTypes.findIndex(
        (vehicleType) => vehicleType.vehicle === id
      );

      if (vehicleIndex !== -1) {
        vehicleTypes[vehicleIndex] = {
          ...vehicleTypes[vehicleIndex],
          count: value,
        };
      }
    },

    setInitialTransferStays: (state, action) => {
      state.transfer = [];
      for (let k = 0; k < state.stays?.length; k++) {
        state.transfer.push({
          stays: [],
          stayNo: k + 1,
        });
        for (let i = 0; i < state.stays[k].hotels?.length + 1; i++) {
          state.transfer[k]?.stays?.push({
            transferFrom: "",
            transferTo: "",
            transferType: "",
            transferFromName: "",
            transferToName: "",
            vehicleTypes: [],
          });
        }
      }
    },

    addExcursion: (state, { payload }) => {
      state.selectedExcursion = payload;
    },

    handleEditRemoveTransfer: (state, { payload }) => {
      const { _id } = payload;
      const updatedExcursionType = state.selectedExcursionType.filter(
        (excursion) => excursion.excursionId !== _id
      );

      // Update the state with the modified selectedExcursionType
      return {
        ...state,
        selectedExcursionType: updatedExcursionType,
      };
    },

    handleEditSupplimentsTranfers: (state, { payload }) => {
      const { _id } = payload;
      const updatedSupplimentsType =
        state.selectedExcursionTypeSuppliments.filter(
          (exc) => exc.excursionId !== _id
        );
      return {
        ...state,
        selectedExcursionTypeSuppliments: updatedSupplimentsType,
      };
    },

    handleSelectedExcursion: (state, { payload }) => {
      const { excursionId, value } = payload;
      const existingExcursion = state.selectedExcursionType.findIndex(
        (excursion) => excursion.excursionId === excursionId
      );

      if (existingExcursion !== -1) {
        let newValue = value;
        state.selectedExcursionType[existingExcursion].value = newValue;

        if (
          state.selectedExcursionType[existingExcursion]?.vehicleType?.count
        ) {
          state.selectedExcursionType[existingExcursion].vehicleType[0].count =
            payload.vehicleType[0].count;
        }
      } else {
        state.selectedExcursionType.push(payload);
      }
    },

    handleChangedValues: (state, { payload }) => {
      const { excursionId, value } = payload;
      const existing = state.selectedExcursionType.findIndex(
        (exc) => exc.excursionId === excursionId
      );
      if (existing !== -1) {
        state.selectedExcursionType[existing] = payload;
      }
    },

    handleChangeValueSuppliments: (state, { payload }) => {
      const { excursionId, value } = payload;
      const existing = state.selectedExcursionTypeSuppliments.findIndex(
        (exc) => exc.excursionId === excursionId
      );
      if (existing !== -1) {
        state.selectedExcursionTypeSuppliments[existing] = payload;
      }
    },

    handlechangeEmptyVehicleType: (state, { payload }) => {
      const { excursionId, value } = payload;

      const existingExcursion = state.selectedExcursionType.findIndex(
        (excursion) => excursion.excursionId === excursionId
      );
      if (existingExcursion !== -1) {
        let newValue = value;
        state.selectedExcursionType[existingExcursion].value = newValue;
        if (
          state.selectedExcursionType[existingExcursion].vehicleType &&
          value !== "Private"
        ) {
          state.selectedExcursionType[existingExcursion].vehicleType = [];
        }
      }
    },

    editExcursionPrivateCount: (state, { payload }) => {
      const { excursionId, count, vehicle } = payload;
      const existingExcursion = state.selectedExcursionType.findIndex(
        (excursion) => excursion.excursionId === excursionId
      );

      if (existingExcursion === -1) {
        if (
          state.selectedExcursionType[existingExcursion]?.vehicleType?.length >
          0
        ) {
          const existId = state.selectedExcursionType.findIndex(
            (exc) => exc?.vehicleType[0]?.vehicle === vehicle
          );
          if (existId !== -1 && existingExcursion !== -1) {
            state.selectedExcursionType[existId].vehicleType[0].count = count;
          }
        }
      }
    },

    editExcursionSupplimentsPrivateCount: (state, { payload }) => {
      const { excursionId, count, vehicle } = payload;
      const existingExcursion =
        state.selectedExcursionTypeSuppliments.findIndex(
          (excursion) => excursion.excursionId === excursionId
        );
      if (existingExcursion === -1) {
        if (
          state.selectedExcursionTypeSuppliments[existingExcursion]?.vehicleType?.length > 0
        ) {
          const existId = state.selectedExcursionTypeSuppliments.findIndex(
            (exc) => exc?.vehicleType[0]?.vehicle === vehicle
          );
          if (existId !== -1 && existingExcursion !== -1) {
            state.selectedExcursionTypeSuppliments[
              existId
            ].vehicleType[0].count = count;
          }
        }
      }
    },

    addExcursionSuppliments: (state, { payload }) => {
      state.selectedExcursionSuppliments = payload;
    },

    handleSelectedExcursionSupplimets: (state, { payload }) => {
      const { excursionId, value } = payload;
      const existingExcursion =
        state.selectedExcursionTypeSuppliments.findIndex(
          (excursion) => excursion.excursionId === excursionId
        );
      if (existingExcursion !== -1) {
        state.selectedExcursionTypeSuppliments[existingExcursion].value = value;
      } else {
        state.selectedExcursionTypeSuppliments.push(payload);
      }
    },
    handleSelectedVisaId: (state, { payload }) => {
      state.selectedVisaId = payload;
    },
    handlechangeEmptyVehicleTypeSuppliments: (state, { payload }) => {
      const { excursionId, value } = payload;

      const existingExcursion =
        state.selectedExcursionTypeSuppliments.findIndex(
          (excursion) => excursion.excursionId === excursionId
        );
      if (existingExcursion !== -1) {
        let newValue = value;
        state.selectedExcursionTypeSuppliments[existingExcursion].value =
          newValue;
        if (
          state.selectedExcursionTypeSuppliments[existingExcursion]
            .vehicleType &&
          value !== "Private"
        ) {
          state.selectedExcursionTypeSuppliments[
            existingExcursion
          ].vehicleType = [];
        }
      }
    },

    setInitialEditData: (state, { payload }) => {
      state.arrivalAirport.iata = payload?.amendment?.arrivalIataCode;
      state.arrivalAirport.id = payload?.amendment?.arrivalAirport;
      state.arrivalAirport.name = payload?.amendment?.arrivalAirportName;
      state.arrivalAirport.terminalName = payload?.amendment?.arrivalTerminalName

      state.departureAirport.iata = payload?.amendment?.departureIataCode;
      state.departureAirport.id = payload?.amendment?.departureAirport;
      state.departureAirport.name = payload?.amendment?.departureAirportName;
      state.departureAirport.terminalName = payload?.amendment?.departureTerminalName

      state.checkInDate = payload?.amendment?.checkInDate.slice(0,10);
      state.checkOutDate = payload?.amendment?.checkOutDate.slice(0, 10);

      state.paxType = payload?.amendment?.paxType;
      state.noOfAdults = payload?.amendment?.noOfAdults;
      state.noOfChildren = payload?.amendment?.noOfChildren;
      state.childrenAges = payload?.amendment?.childrenAges;
      state.isAlreadyBooked = payload?.amendment?.isAlreadyBooked;
      state.arrivalAirport.terminalCode =
        payload?.amendment?.arrivalTerminalCode;
      state.arrivalAirport.terminalId = payload?.amendment?.arrivalTerminalId;
      state.departureAirport.terminalCode =
        payload?.amendment?.departureTerminalCode;
      state.departureAirport.terminalId =
        payload?.amendment?.departureTerminalId;
        state.quotationCurrency = payload?.amendment?.quotationCurrency

      if (payload?.amendment?.hotelQuotation) {
        state.stays = payload?.amendment?.hotelQuotation?.stays;
      }

      if (payload?.amendment?.transferQuotation?.length > 0) {
        state.transfer = payload?.amendment?.transferQuotation;
      }

      state.isTransferQuotationDisabled =
        payload?.amendment?.isTransferQuotationDisabled;
      state.isArrivalAirportDisabled =
        payload?.amendment?.isArrivalAirportDisabled;
      state.isDepartureAirportDisabled =
        payload?.amendment?.isDepartureAirportDisabled;
      state.isHotelQuotationDisabled =
        payload?.amendment?.isHotelQuotationDisabled;
      state.isSupplimentQuotationDisabled =
        payload?.amendment?.isSupplimentQuotationDisabled;
      state.isExcursionQuotationDisabled =
        payload?.amendment?.isExcursionQuotationDisabled;
        state.isVisaQuotaionsDisabled =payload?.amendment?.isVisaQuotationDisabled
        state.isAlreadyBooked = payload?.amendment?.isAlreadyBooked

      if (payload?.amendment?.excursionQuotation) {
        state.selectedExcursion =
          payload?.amendment?.excursionQuotation?.excursions;
        let data = [];
        payload?.amendment?.excursionQuotation?.excursions?.map((ele) => {
          if (ele?.ticketVehicleType) {
            ele?.ticketVehicleType?.map((cnt) => {
              if (cnt?.count > 0 && ele?.value === "Private") {
                data.push({
                  excursionId: ele?._id,
                  value: ele?.value,
                  vehicleType: [
                    { count: cnt?.count, vehicle: cnt?.vehicle?._id },
                  ],
                });
              }
            });
          } else if (ele?.transferVehicleType) {
            ele?.transferVehicleType?.map((cnt) => {
              if (cnt?.count > 0 && ele?.value === "Private") {
                data.push({
                  excursionId: ele?._id,
                  value: ele?.value,
                  vehicleType: [
                    { count: cnt?.count, vehicle: cnt?.vehicle?._id },
                  ],
                });
              }
            });
          }
          if (ele?.value !== "Private") {
            data.push({ excursionId: ele?._id, value: ele?.value });
          }
          state.selectedExcursionType = data;
        });
      }

      if (payload?.amendment?.excSupplementQuotation) {
        state.selectedExcursionSuppliments =
          payload?.amendment?.excSupplementQuotation?.excursions;
        let data = [];

        payload?.amendment?.excSupplementQuotation?.excursions?.map((ele) => {
          if (ele?.ticketVehicleType) {
            ele?.ticketVehicleType?.map((cnt) => {
              if (cnt?.count > 0 && ele.value === "Private") {
                data.push({
                  excursionId: ele._id,
                  value: ele.value,
                  vehicleType: [
                    { count: cnt?.count, vehicle: cnt?.vehicle?._id },
                  ],
                });
              }
            });
          } else if (ele.transferVehicleType) {
            ele?.transferVehicleType?.map((cnt) => {
              if (cnt?.count > 0 && ele.value === "Private") {
                data.push({
                  excursionId: ele._id,
                  value: ele.value,
                  vehicleType: [
                    { count: cnt?.count, vehicle: cnt?.vehicle?._id },
                  ],
                });
              }
            });
          }

          if (ele.value !== "Private") {
            data.push({ excursionId: ele._id, value: ele.value });
          }
          state.selectedExcursionTypeSuppliments = data;
        });
      }
      state.selectedVisaId = {
        visaName: payload?.amendment?.visa?.name,
        id: payload?.amendment?.visa?.visaId._id,
        processingTime: payload.amendment?.visa?.visaId?.processingTime,
        processingTimeFormat:
          payload?.amendment?.visa?.visaId?.processingTimeFormat,
        validity: payload?.amendment?.visa?.visaId?.validity,
        validityTimeFormat:
          payload?.amendment?.visa?.visaId?.validityTimeFormat,
      };
      state.selectedVisaNationality = payload?.amendment?.visa?.nationality

      if(payload.amendment?.excursionQuotation?.excursions?.length > 0 ){

          // edit side excursion new change
          if(payload?.amendment?.excursionQuotation?.excursions?.length){
            state.excursionFiltered = payload?.amendment?.excursionQuotation?.excursions.map((item) => ({
           ...item,
           isSelected: false,
           selectedExcursionType: item?.excursionType  === "ticket" ? "Ticket" : "TicketWithTransfer",
         }));
         state.selectedExcursionIds = payload?.amendment?.excursionQuotation?.excursions.map((item) => ({
           ...item,
           isSelected: true,
           selectedExcursionType: item?.value,
           vehicleType:item?.vehicleType
         }));
          }


        if(payload?.amendment?.excSupplementQuotation?.excursions?.length){
          state.excSupplimentFiltered = payload?.amendment?.excSupplementQuotation?.excursions.map((item) => ({
            ...item,
            isSelected: false,
            selectedExcursionType: item?.excursionType  === "ticket" ? "Ticket" : "TicketWithTransfer",
          }));
          state.selectedExcSupplimentsIds = payload?.amendment?.excSupplementQuotation?.excursions.map((item) => ({
            ...item,
            isSelected: true,
            selectedExcursionType: item?.value,
            vehicleType: item?.vehicleType
          }));

        }


        payload.amendment?.excursionQuotation?.excursions.map((ele)=>{
          const index = state.excursionFiltered.findIndex(
            (items)=> items._id === ele._id
          )
  
          if(index !== -1) {
            state.excursionFiltered[index].isSelected = true
            state.excursionFiltered[index].selectedExcursionType = ele?.value === "ticket" ? "Ticket" : ele?.value === 'private' ? "Private" : ele?.value === 'shared' ? "Shared" : ele.value
            state.excursionFiltered[index].selectedExcursionId = ele?._id
          }
          if(ele?.value === 'Private'){
            if(ele?.ticketVehicleType){
              ele.ticketVehicleType.map((dt)=>{
                if(dt.count > 0){
  
                  state.excursionFiltered[index].vehicleType = [{count: dt?.count, vehicle: dt?.vehicle?._id}]
                }
              })
            } else if (ele?.transferVehicleType) {
              ele?.transferVehicleType?.map((dt)=>{
                if(dt.count > 0){
                  state.excursionFiltered[index].vehicleType = [{count: dt?.count, vehicle: dt?.vehicle?._id}]
                }
              })
            }
          
          }
        })
     
      }


      if(payload.amendment?.excSupplementQuotation?.excursions?.length > 0 && state.excSupplimentFiltered?.length > 0){
        payload.amendment?.excSupplementQuotation?.excursions.map((ele)=>{
          const index = state.excSupplimentFiltered.findIndex(
            (items)=> items._id === ele._id
          )
  
          if(index !== -1) {
            state.excSupplimentFiltered[index].isSelected = true
            state.excSupplimentFiltered[index].selectedExcursionType = ele?.value === "ticket" ? "Ticket" : ele.value === 'private' ? "Private" : ele.value === 'shared' ? 'Shared' : ele.value
            state.excSupplimentFiltered[index].selectedExcursionId = ele?._id
             
          }
          if(ele?.value === 'Private'){
            if(ele?.ticketVehicleType){
              ele.ticketVehicleType.map((dt)=>{
                if(dt.count > 0){
  
                  state.excSupplimentFiltered[index].vehicleType = [{count: dt?.count, vehicle: dt?.vehicle?._id}]
                }
              })
            } else if (ele?.transferVehicleType) {
              ele?.transferVehicleType?.map((dt)=>{
                if(dt?.count > 0) {
                  state.excSupplimentFiltered[index].vehicleType = [{count: dt?.count, vehicle: dt?.vehicle?._id}]
                }
              })
            }
          }
        })
     
      }
     
    },

    setChildrenAgesInitial: (state, { payload }) => {
      state.noOfChildren = payload;
    },
    handleClearAllStates: (state, { payload }) => {
      state.arrivalAirport = {};
      state.departureAirport = {};
      state.isArrivalAirportDisabled = false;
      state.childrenAges = [];
      state.transfer = [];
      state.selectedExcursion = [];
      state.selectedExcursionSuppliments = [];
      state.selectedExcursionType = [];
      state.selectedExcursionTypeSuppliments = [];
      state.selectedVisaId = {};
      state.isDepartureAirportDisabled = false;
      state.isHotelQuotationDisabled = false;
      state.isVisaQuotaionsDisabled = false;
      state.isTransferQuotationDisabled = false;
      state.isSupplimentQuotationDisabled = false;
      state.isExcursionQuotationDisabled = false;
      state.isAlreadyBooked = false;
      state.paxType = "";
      state.noOfChildren = 0;
      state.noOfAdults = 2;
      state.checkInDate = "";
      state.checkOutDate = "";
      if(state.stays.length){
        state.stays = [{
          hotels:[]
        }]
      }

    const selectedExcursionsSuppliments = state.excSupplimentFiltered?.filter((exc)=>exc.isSelected)
    if(selectedExcursionsSuppliments?.length){
      selectedExcursionsSuppliments.map((suppliement)=>{
        suppliement.isSelected = false
      })
    }

    const selectedExcurisions = state.excursionFiltered.filter((exc)=>exc?.isSelected)
    if(selectedExcurisions?.length){
      selectedExcurisions.map((excrusion)=>{
        excrusion.isSelected = false
      })
    }

    state.quotationCurrency = "AED"
    state.excursionFilteredNew = []
    state.selectedExcursionIds = []
    state.excursionFiltered = []

    state.excursionSuppFilteredNew = []
    state.excSupplimentFiltered = []
    state.selectedExcSupplimentsIds = []

    state.selectedVisaNationality = ""

  },

    clearStayIsEmpty: (state, { payload }) => {
      state.stays.forEach((ele) => {
        ele.hotels = ele.hotels.filter((ht) => ht.hotelId);
      });
    },

    clearArrivalEditPageOnSideClearButton: (state, { payload }) => {
      state.arrivalAirport = {
        id: "",
        name: "",
        iata: "",
        terminalCode: "",
        terminalId: "",
      };
    },

    setSelectedIds: (state, { payload }) => { 
      const exist = state.excursionFiltered.filter((exc) => exc?.isSelected);
    
      if (state.selectedExcursionIds?.length > 0) {
        exist.forEach((ele) => {
          if (!state.selectedExcursionIds.some((item) => item._id === ele._id)) {
            state.selectedExcursionIds.push(ele);
          }
        });

        if (!state.selectedExcursionIds.some((item) => item._id === payload._id)) {
          state.selectedExcursionIds.push(payload);
        }
     
      } else {
        exist.forEach((ele) => {
               if (!state.selectedExcursionIds.some((item) => item._id === ele._id)) {
            state.selectedExcursionIds.push(ele);
          }
        });
        if (!state.selectedExcursionIds.some((item) => item._id === payload._id)) {
          state.selectedExcursionIds.push(payload);
        }
     
      }
    },

    setSelectedExcSupplimentsIds:(state, {payload})=>{
     const exist = state.excSupplimentFiltered?.filter((exc)=> exc?.isSelected)

     if(state.selectedExcSupplimentsIds?.length > 0) {
      exist.forEach((ele)=>{
        if(!state.selectedExcSupplimentsIds.some((item)=>item._id === ele._id)) {
          state.selectedExcSupplimentsIds.push(ele)
        }
      })

      if (!state.selectedExcSupplimentsIds.some((item) => item._id === payload._id)) {
        state.selectedExcSupplimentsIds.push(payload);
      }

     }else {
      exist.forEach((ele)=>{
        if(!state.selectedExcSupplimentsIds.some((item)=>item._id === ele._id)) {
          state.selectedExcSupplimentsIds.push(ele)
        }
      })

      if (!state.selectedExcSupplimentsIds.some((item) => item._id === payload._id)) {
        state.selectedExcSupplimentsIds.push(payload);
      }
     }

    },

    removeIdsExc: (state, { payload }) => {
      state.selectedExcursionIds = state.selectedExcursionIds.filter(
        (id) => id?._id !== payload._id
      );
      const index = state.excursionFiltered.findIndex(
        (items)=>items._id === payload._id
      )

      if(index !== -1){
        state.excursionFiltered[index].isSelected = false
        if(state.excursionFiltered[index]?.vehicleType?.length) {
          state.excursionFiltered[index].vehicleType = []
     }
      }
    },


    removeExcSupplimentsIds: (state, { payload }) => {
      state.selectedExcSupplimentsIds = state.selectedExcSupplimentsIds.filter(
        (id) => id?._id !== payload._id
      );

      const index = state.excSupplimentFiltered.findIndex(
        (items)=>items._id === payload._id
      )

      if(index !== -1){
        state.excSupplimentFiltered[index].isSelected = false
          if(state.excSupplimentFiltered[index]?.vehicleType?.length) {
             state.excSupplimentFiltered[index].vehicleType = []
        }
      }
    },


    vehicleInitialCount:(state, {payload})=>{
      const index = state.excursionFiltered.findIndex(
        (item)=>item._id === payload?.excursionId
      )
   
      if(state.excursionFiltered[index]?.vehicleType?.length > 0){
        if(index !== -1){
          const exist = state.excursionFiltered[index].vehicleType.findIndex(
            (ele)=>ele.vehicle === payload?.vehicle
          )
          if(exist !== -1){
            if(payload.count ){
              state.excursionFiltered[index].vehicleType[0].vehicle =  payload?.vehicle
              state.excursionFiltered[index].vehicleType[0].count = payload?.count 
            }
          }else {
            if(payload.count ){
              state.excursionFiltered[index].vehicleType.push({
                vehicle: payload?.vehicle,
                count: payload?.count
              })
            }
          }
        }
      } else {
        if(payload.count ){
          state.excursionFiltered[index]?.vehicleType.push({
            vehicle: payload?.vehicle,
            count: payload?.count
          })
        }
      }


      const exists = state.selectedExcursionIds.findIndex(
        (items)=> items.selectedExcursionId === payload.excursionId
      )

      if(state.selectedExcursionIds[exists]?.vehicleType?.length > 0){
        if(exists !== -1){
          const exist = state.selectedExcursionIds[exists].vehicleType.findIndex(
            (ele)=>ele.vehicle === payload?.vehicle
          )
          if(exist !== -1){
            if(payload.count ){
              state.selectedExcursionIds[exists].vehicleType[0].vehicle =  payload?.vehicle
              state.selectedExcursionIds[exists].vehicleType[0].count = payload?.count 
            }
          }else {
            if(payload.count ){
              state.selectedExcursionIds[exists].vehicleType.push({
                vehicle: payload?.vehicle,
                count: payload?.count
              })
            }
          }
        }
      } else {
        if(payload.count ){
          state.selectedExcursionIds[exists]?.vehicleType?.push({
            vehicle: payload?.vehicle,
            count: payload?.count
          })
        }
      }


      // Searched excursion add private seats
      if(state.searcheExcursions?.length){
        const existIndex = state.searcheExcursions.findIndex(
          (items)=> items._id === payload.excursionId
        )
        if(state.searcheExcursions[existIndex]?.vehicleType?.length > 0){
          if(existIndex !== -1){
            const exist = state.searcheExcursions[existIndex].vehicleType.findIndex(
              (ele)=>ele.vehicle === payload?.vehicle
            )
            if(exist !== -1){
              if(payload.count ){
                state.searcheExcursions[existIndex].vehicleType[0].vehicle =  payload?.vehicle
                state.searcheExcursions[existIndex].vehicleType[0].count = payload?.count 
              }
            }else {
              if(payload.count ){
                state.searcheExcursions[existIndex].vehicleType.push({
                  vehicle: payload?.vehicle,
                  count: payload?.count
                })
              }
            }
          }
        } else {
          if(payload.count ){
            state.searcheExcursions[existIndex]?.vehicleType?.push({
              vehicle: payload?.vehicle,
              count: payload?.count
            })
          }
        }
      }
     

    },

    vehicleInitialCountSuppliment:(state, {payload})=>{
      const index = state.excSupplimentFiltered.findIndex(
        (item)=>item._id === payload?.excursionId
      )
   
      if(state.excSupplimentFiltered[index]?.vehicleType?.length > 0){
        if(index !== -1){
          const exist = state.excSupplimentFiltered[index].vehicleType.findIndex(
            (ele)=>ele.vehicle === payload?.vehicle
          )
          if(exist !== -1){
            if(payload.count ){
              state.excSupplimentFiltered[index].vehicleType[0].vehicle =  payload?.vehicle
              state.excSupplimentFiltered[index].vehicleType[0].count = payload?.count 
            }
          }else {
            if(payload.count ){
              state.excSupplimentFiltered[index].vehicleType.push({
                vehicle: payload?.vehicle,
                count: payload?.count
              })
            }
          }
        }
      } else {
        if(payload.count ){
          state.excSupplimentFiltered[index]?.vehicleType.push({
            vehicle: payload?.vehicle,
            count: payload?.count
          })
        }
      }


      // changes for selected suppliments
      if(state.selectedExcSupplimentsIds?.length){
        const index = state.selectedExcSupplimentsIds.findIndex(
          (item)=> item._id === payload.excursionId
        )

        if(index !== -1) {
          if(state.selectedExcSupplimentsIds[index]?.vehicleType?.length > 0) {
            const exist = state.selectedExcSupplimentsIds[index].vehicleType?.findIndex(
              (items)=> items.vehicle === payload.vehicle
            )

            if(exist !== -1){
              state.selectedExcSupplimentsIds[index].vehicleType[exist].count = payload?.count
            } else {
              state.selectedExcSupplimentsIds[index].vehicleType[0].vehicle = payload?.vehicle
              state.selectedExcSupplimentsIds[index].vehicleType[0].count = payload?.count
            }

          } else {
            state.selectedExcSupplimentsIds[index]?.vehicleType?.push({
              vehicle:payload?.vehicle,
              count:payload?.count
            })
          }
        }


      }

      // changes for searched suppliments

      if(state.searchExcursionSuppliments?.length){
        const existIndex = state.searchExcursionSuppliments.findIndex(
          (items)=> items._id === payload.excursionId
        )
        if(state.searchExcursionSuppliments[existIndex]?.vehicleType?.length > 0){
          if(existIndex !== -1){
            const exist = state.searchExcursionSuppliments[existIndex].vehicleType.findIndex(
              (ele)=>ele.vehicle === payload?.vehicle
            )
            if(exist !== -1){
              if(payload.count ){
                state.searchExcursionSuppliments[existIndex].vehicleType[0].vehicle =  payload?.vehicle
                state.searchExcursionSuppliments[existIndex].vehicleType[0].count = payload?.count 
              }
            }else {
              if(payload.count ){
                state.searchExcursionSuppliments[existIndex].vehicleType.push({
                  vehicle: payload?.vehicle,
                  count: payload?.count
                })
              }
            }
          }
        } else {
          if(payload.count ){
            state.searchExcursionSuppliments[existIndex]?.vehicleType?.push({
              vehicle: payload?.vehicle,
              count: payload?.count
            })
          }
        }
      }

      


    },

    removeMorthanOneInDate:(state, {payload})=>{
      const index = state.excursionFiltered.findIndex(
        (items) => items._id === payload._id
      )
      if(index !== -1) {
        state.excursionFiltered[index].isSelected = false
      }

     state.selectedExcursionIds = state.selectedExcursionIds.filter(
        (items)=> items._id !== payload._id
      )
    },

    removeMorthanOneInDateSuppliment:(state, {payload})=>{
      const index = state.excSupplimentFiltered.findIndex(
        (items)=> items._id === payload._id
      )

      if(index !== 1){
        state.excSupplimentFiltered[index].isSelected = false
      }

      state.selectedExcSupplimentsIds = state.selectedExcSupplimentsIds.filter(
        (item)=>item._id !== payload._id
      )
    },
    hotelAndStayRomoveIndNotRequired:(state, {payload})=>{
        if(state.stays.length) {
        state.stays = []
      }
      if(state.transfer.length){
        state.transfer = []
      }
    },

    removeWithoutHotelInAlreadyBook:(state, {payload})=>{
      if(state.stays?.length){
        state.stays.map((ele)=>{
          ele.hotels.map((ht)=>{
            if(!ht.hotelId){

              ele.hotels.filter((item)=>item.hotelId)
            }
          })
        })
      }
    },

    removeNotRequiredSupplimetsData:(state, {payload}) =>{
      const selectedExcursions = state.excSupplimentFiltered?.filter((exc)=>exc.isSelected)
        if(selectedExcursions?.length){
          selectedExcursions.map((ele)=>{
            if(ele?.isSelected === true){
              ele.isSelected = false
            }
          })
        }
      },

      setQuotationCurrency:(state, {payload})=>{
        state.quotationCurrency = payload
      },

      removeTransferFromRemoveButton: (state, {payload}) =>{
        state.transfer[payload.stayIndex].stays[payload.hotelIndex] = {
          transferFrom :"",
          transferTo :"",
          transferType :"",
          transferFromName :"",
          transferToName :"",
          vehicleTypes : []
        }
      },

      setVisaNationalityId:(state, {payload}) =>{
        state.selectedVisaNationality = payload
      },

      setExcursionsForNew:(state, {payload}) =>{
        state.excursionFiltered = payload?.map((item) => ({
          ...item,
          isSelected: false,
          selectedExcursionType: item?.excursionType  === "ticket" ? "Ticket" : "TicketWithTransfer",
        }));
      },

      setExcursionSupplimentsForNew:(state, {payload}) => {
        state.excSupplimentFiltered = payload?.map((items)=>({
          ...items,
          isSelected: false,
          selectedExcursionType: items?.excursionType  === "ticket" ? "Ticket" : "TicketWithTransfer"
        }))
      },

      setInitialEditExcursion:(state, {payload}) => {
        state.excursionFilteredNew = payload?.map((item) => ({
          ...item,
          isSelected: false,
          selectedExcursionType: item?.excursionType === "ticket" ? "Ticket" : "TicketWithTransfer",
        }));
        
        if (state.excursionFilteredNew?.length) {
          state.excursionFilteredNew.forEach((item) => {
            if (!state.excursionFiltered.some((existingItem) => existingItem._id === item._id)) {
              state.excursionFiltered.push(item);
            }
          });
        }
      },

      setInitialEditExcursionSuppliment:(state, {payload}) => {
        state.excursionSuppFilteredNew = payload?.map((item)=>({
          ...item,
          isSelected: false,
          selectedExcursionType:item?.excursionType === "ticket" ? "Ticket" : "TicketWithTransfer"
        }));

        if(state.excursionSuppFilteredNew?.length){
          state.excursionSuppFilteredNew.forEach((item)=>{
            if(!state.excSupplimentFiltered.some((existingItem)=> existingItem._id === item._id)) {
              state.excSupplimentFiltered.push(item)
            }
          })
        }
      },

      setSearchedExcursions:(state, {payload}) => {
        state.searcheExcursions = payload?.map((item) => ({
          ...item,
          isSelected: false,
          selectedExcursionType: item?.excursionType  === "ticket" ? "Ticket" : "TicketWithTransfer",
        }));
      },

      setSearchExcursionSuppliments:(state, {payload}) => {
        state.searchExcursionSuppliments = payload.map((item)=>({
          ...item,
          isSelected: false,
          selectedExcursionType: item?.excursionType  === "ticket" ? "Ticket" : "TicketWithTransfer",
        }))
      },

      setPickPlaceForWithoutHotel:(state, {payload})=>{
        if(payload.placeId){
          state.pickUpPlaces.placeId = payload.placeId
        }else if (payload.note){
          state.pickUpPlaces.note = payload.note
        }
      },

      clearPickUpLocation:(state, {payload})=>{
        state.pickUpPlaces.note = "",
        state.pickUpPlaces.placeId = ""
      }

    },
});

export const {
  setInitialData,
  setArrivalAirport,
  setArrivalAirportDisabled,
  setDepartureAirport,
  setDepartureAirportDisabled,
  setArrivalDate,
  setDepartureDate,
  setPaxType,
  setTravellerDetails,
  pushValueToChildrenAges,
  setChildrenAges,
  setIsHotelQuotationDisabled,
  addStayPlusOne,
  removeStayMinusOne,
  setHotelInStay,
  setIndexesForAssertion,
  removeHotelFromStay,
  setTransferValues,
  setInitialTransferStays,
  addCountVehicle,
  addExcursion,
  addExcursionSuppliments,
  handleSelectedExcursion,
  handleSelectedExcursionSupplimets,
  handleSelectedVisaId,
  handlechangeEmptyVehicleType,
  setVisaQuotationDisabled,
  setTransferQuotationDisabled,
  handlechangeEmptyVehicleTypeSuppliments,
  addSuggestHotelStayPlusOne,
  removeSuggestHotelStayMinusOne,
  setExcursionDisabled,
  setSupplimentsDisabled,
  emptyHotelDetails,
  editExcursionPrivateCount,
  editExcursionSupplimentsPrivateCount,
  setInitialEditData,
  setOptionalSuppliemtsDisabled,
  setAlreadyBooked,
  handleChangedValues,
  setChildrenAgesInitial,
  handleChangeValueSuppliments,
  clearDataDisabled,
  addCountVehicleEditSide,
  removeTransferEditSide,
  handleClearAllStates,
  clearStayIsEmpty,
  editHotelStay,
  clearArrivalEditPageOnSideClearButton,
  setSelectedIds,
  removeIdsExc,
  setSelectedExcSupplimentsIds,
  removeExcSupplimentsIds,
  // new added by aswin
  setVehiclesInVehicleTypes,
  handleEditRemoveTransfer,
  handleEditSupplimentsTranfers,
  setHotelToStayArray,
  setFilteredExcursion,

  // New changes anshid
  setVehicleTypeForSelectedExc,
  vehicleInitialCount,
  setFilteredSuppliments,
  setVehiclTypeForEcxSuppliment,
  vehicleInitialCountSuppliment,
  removeMorthanOneInDate,
  removeMorthanOneInDateSuppliment,
  hotelAndStayRomoveIndNotRequired,
  removeWithoutHotelInAlreadyBook,
  removeNotRequiredSupplimetsData,
  setQuotationCurrency,
  clearTransferDataSkip,
  removeTransferFromRemoveButton,

  // Visa Nationality new adds
  setVisaNationalityId,

  //new changes excursions
  setExcursionsForNew,
  setExcursionSupplimentsForNew,
  setInitialEditExcursion,
  setInitialEditExcursionSuppliment,
  setSearchedExcursions,
  setSearchExcursionSuppliments,

  // added Pickup places
  setPickPlaceForWithoutHotel,
  clearPickUpLocation
  
} = quotationsSlice.actions;

export default quotationsSlice.reducer;
