import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

const initialState = {
   loading: true,
   resellers: [],
   reseller: {},
   resellerWalletInfo: {
      balance: 0,
      pendingEarnings: 0,
      totalEarnings: 0,
      withdrawTotal: 0,
   },
};

export const fetchSingleReseller = createAsyncThunk(
   "resellerSlice/fetchSingleReseller",
   async (args, { getState }) => {
      const { token } = getState().agents;
      if (token) {
         const response = await axios.get(`/b2b/resellers/single/${args}`, {
            headers: {
               authorization: `Bearer ${token}`,
            },
         });
         return response.data;
      } else {
         throw Error("Cant find reseller");
      }
   }
);

const resellerSlice = createSlice({
   name: "reseller",
   initialState,
   reducers: {
      setResellers: (state, action) => {
         state.resellers = action.payload;
      },
   },
   extraReducers: {
      [fetchSingleReseller.fulfilled]: (state, action) => {
         state.reseller = action.payload?.subAgent;
         state.resellerWalletInfo = {
            balance: action.payload?.balance,
            pendingEarnings: action.payload?.pendingEarnings,
            totalEarnings: action.payload?.totalEarnings,
            withdrawTotal: action.payload?.withdrawTotal,
         };
         state.loading = false;
      },
   },
});

export const { setResellers } = resellerSlice.actions;

export default resellerSlice.reducer;
