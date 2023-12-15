import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  order: {},
  orderPayloadData: {},
  // passengerDetails: {},
};

export const getOrder = createAsyncThunk(
  "excursion/getOrder",
  async (args, { getState }) => {
    // const { token } = getState().user
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    const response = await axios.get("/attractions/single/63ac0a9e23d63a74a8cad48b");
    return response.data;
  }
);


const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    orderPayload: (state,action) => {
      state.orderPayloadData = action.payload
    },
    // getPassengerDetails: (state,action) => {
    //   state.passengerDetails = action.payload
    // },
  },
  extraReducers: {
    [getOrder.pending]: (state, action) => {
      state.loading = true;
    },
    [getOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
  },
});

export const {
  orderPayload,
  // getPassengerDetails,
} = paymentSlice.actions

export default paymentSlice.reducer;
