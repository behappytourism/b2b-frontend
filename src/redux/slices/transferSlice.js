import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formDatas : {
        transferType:"oneway",
        pickupLocation:"",
        dropOffLocation:"",
        pickupSuggestionType:"",
        dropOffSuggestionType:"",
        noOfAdults:"1",
        noOfChildrens:"0",
        pickupDate:"",
        pickupTime:"",
        returnDate:'',
        returnTime:""
    },
    trips:[],
    selectedTransfer:{
        journys:[]
    },
    agentTransferCart: JSON.parse(localStorage.getItem("selectedTransfer")) || [],

}

export const transferSlice = createSlice({
    name: 'transfer',
    initialState,
    reducers: {

        setSearchTransfer: (state, {payload}) => {
            const {value, name} = payload
            state.formDatas[name] = value
        },

        setSearchedTrips: (state, {payload})=>{
           state.trips.push(payload) 
        },

        clearSearchTransferTrips: (state, { payload }) =>{
            state.trips = []
            state.selectedTransfer.journys = []
        },

        setSelectedTransfer: (state, { payload }) => {

            let trip = {
                transferType: payload?.element?.transferType,
                pickupLocation: payload?.trip?.transferFrom?._id,
                pickupLocationName:  payload?.trip?.transferFrom?.airportName || payload?.trip?.transferFrom?.areaName,
                dropOffLocation: payload?.trip?.transferTo?._id,
                dropOffLocationName: payload?.trip?.transferTo?.airportName || payload?.trip?.transferTo?.areaName,
                pickupSuggestionType: payload?.element?.pickupSuggestionType,
                dropOffSuggestionType: payload?.element?.dropOffSuggestionType,
                noOfAdults: payload?.element?.noOfAdults,
                noOfChildrens: payload?.element?.noOfChildrens,
                pickupDate: payload?.index === 0 ? payload?.trip?.date : "",
                pickupTime: payload?.index === 0 ? payload?.trip?.time : '',
                returnDate: payload?.index === 1 ? payload.trip.date : "",
                returnTime: payload?.index === 1 ? payload?.trip?.time: "",
                selectedVehicleTypes: [],
                selectedReturnVehicleTypes:[]
            }

            let count = {}
            count = {
                vehicle: payload.vehicle.vehicle?._id,
                _id: payload.vehicle?._id,
                price: payload.vehicle.price,
                vehicleName: payload.vehicle?.vehicle?.name,
                count: payload.value
            }
         
           if(Array.isArray(state.selectedTransfer.journys) && state.selectedTransfer.journys.length){
              if(Array.isArray(state.selectedTransfer?.journys)){
                      if(state.selectedTransfer.journys[payload.index] && payload.index === 0){
                          let exist = state.selectedTransfer.journys[payload.index].selectedVehicleTypes.findIndex((item)=> item._id === count?._id)
                          if(! state.selectedTransfer.journys[0].pickupDate &&
                           ! state.selectedTransfer.journys[0].pickupTime){
                            state.selectedTransfer.journys[0].pickupDate = payload.trip.date
                            state.selectedTransfer.journys[0].pickupTime = payload.trip.time
                           }
                          if(exist !== -1){
                              if(state.selectedTransfer.journys[payload.index].selectedVehicleTypes[exist]._id === count?._id){
                                  state.selectedTransfer.journys[payload.index].selectedVehicleTypes[exist].count = count.count
                              } else {
                                state.selectedTransfer.journys[payload.index].selectedVehicleTypes.push(count)
                              }
                          } else {
                            state.selectedTransfer.journys[payload.index].selectedVehicleTypes.push(count)
                          }
                      } else  {
                        if(state.selectedTransfer.journys[0].selectedReturnVehicleTypes.length){
                            let exist = state.selectedTransfer.journys[0].selectedReturnVehicleTypes.findIndex((item)=> item._id === count?._id)
                            if(exist !== -1){
                                if(state.selectedTransfer.journys[0].selectedReturnVehicleTypes[exist]._id === count._id){
                                    state.selectedTransfer.journys[0].selectedReturnVehicleTypes[exist].count = count.count
                                } else {
                                    state.selectedTransfer.journys[0].selectedReturnVehicleTypes.push(count)
                                }
                            } else {
                                state.selectedTransfer.journys[0].selectedReturnVehicleTypes.push(count)
                            }
                        } else {
                            state.selectedTransfer.journys[0].returnDate = payload.trip.date
                            state.selectedTransfer.journys[0].returnTime = payload.trip.time
                            state.selectedTransfer.journys[0].selectedReturnVehicleTypes.push(count)
                        }
                      }
                   }
           } else {
                    if(payload.index === 0){
                        if(Array.isArray(trip.selectedVehicleTypes)){
                            trip.selectedVehicleTypes.push(count)
                        }
                    } else if(payload.index === 1) {
                        if(Array.isArray(trip.selectedReturnVehicleTypes)){
                            trip.selectedReturnVehicleTypes.push(count)
                        }
                    }
                if(Array.isArray(state.selectedTransfer.journys)){
                    state.selectedTransfer.journys.push(trip)
                }
           }
        },

        setSelectedTransferInCart: (state, { payload }) => {

            let transferArray = [];
            let selectedTransfers = payload
            const storedTransfer = JSON.parse(localStorage.getItem("selectedTransfer"));
            if (Array.isArray(storedTransfer)) {
                transferArray = storedTransfer;
            }
            
            transferArray.push(selectedTransfers)
            
        
            localStorage.setItem("selectedTransfer", JSON.stringify(transferArray));
            state.agentTransferCart = JSON.parse(localStorage.getItem("selectedTransfer")) || [];
        },

        deleteSelectedTransferInCart: (state, { payload }) => {
            state.agentTransferCart = state.agentTransferCart.filter((_, index)=>{
                return index !== payload.index
            })

            localStorage.setItem("selectedTransfer", JSON.stringify(state.agentTransferCart))
        },

        clearCartItemsAfterPurchase: (state, { payload })=> {
            localStorage.removeItem('selectedTransfer');
            state.agentTransferCart = []
        }
        
    }
})

export const {
    setSearchTransfer,
    setSearchedTrips,
    clearSearchTransferTrips,
    setSelectedTransferInCart,
    setSelectedTransfer,
    deleteSelectedTransferInCart,
    clearCartItemsAfterPurchase
} = transferSlice.actions

export default transferSlice.reducer;