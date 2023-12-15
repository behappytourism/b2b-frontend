import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  travellers: [],
  a2aEnquiry:
    localStorage.getItem("a2aEnquiry") ?
      JSON.parse(localStorage.getItem("a2aEnquiry")) :
      {},
  rows: [
    {
      title: "",
      firstName: "",
      lastName: "",
      code: "",
      phoneNumber: "",
      reference: "",
      nationality: "",
      passsportNo: "",
      isInfant: false,
      infantDetails: {
        title: "",
        firstName: "",
        lastName: "",
        passportNo: "",
      }
    }
  ]
};


const a2aSlice = createSlice({
  name: "a2a",
  initialState,
  reducers: {
    setTravellers: (state, action) => {
      state.travellers = action.payload
      let array = []
      for (let i = 0; i < Number(state.travellers.length); i++) {
        state.travellers[i].traveller = 1
        array.push(state.travellers[i])
      }
      state.travellers = array
      state.isLoading = false
    },
    setTravellerCount: (state, action) => {
      state.travellers[action.payload.index][action.payload.name] = Number(action.payload.value);
    },
    addRows: (state, action) => {
      state.a2aEnquiry = localStorage.getItem("a2aEnquiry") ? JSON.parse(localStorage.getItem("a2aEnquiry")) : {}

      state.rows = [
        {
          title: "",
          firstName: "",
          lastName: "",
          code: "",
          phoneNumber: "",
          reference: "",
          nationality: "",
          passportNo: "",
          isInfant: false,
          infantDetails: {
            title: "",
            firstName: "",
            lastName: "",
            passportNo: "",
          }
        }
      ]

      for (let i = 1; i < Number(state.a2aEnquiry?.traveller); i++) {
        state.rows.push({
          title: "",
          firstName: "",
          lastName: "",
          code: "",
          phoneNumber: "",
          reference: "",
          nationality: "",
          passportNo: "",
          isInfant: false,
          infantDetails: {
            title: "",
            firstName: "",
            lastName: "",
            passportNo: "",
          }
        })
      }
    },
    handleRowItemChange: (state, action) => {
      state.rows[action.payload.index][action.payload.name] =
        action.payload.value;
    },
    handleRowItemSubChange: (state, action) => {
      state.rows[action.payload.index].infantDetails[action.payload.name] =
        action.payload.value;
    },
    setA2aEnquiry: (state, action) => {
      state.a2aEnquiry = action.payload
    },
  }
});

export const { setTravellers, setTravellerCount, addRows, handleRowItemChange, setA2aEnquiry, handleRowItemSubChange } = a2aSlice.actions;

export default a2aSlice.reducer;
