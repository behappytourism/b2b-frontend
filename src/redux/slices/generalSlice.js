import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
   loading: false,
   countries: [],
   airports: {},
   b2bMenuStatus: {
      attraction: true,
      visa: false,
      flight: false,
      hotel: false,
      transfer: false,
      a2a: false
   },
};


// get all countries
export const getAllCountries = createAsyncThunk(
   "general/getAllCountries",
   async (_, { getState }) => {
      const response = await axios.get("/countries/all");
      return response.data;
   }
);

export const getAllAirports = createAsyncThunk(
   "general/getAllAirports",
   async (_, { getState }) => {
      const response = await axios.get(
         "https://raw.githubusercontent.com/mwgg/Airports/master/airports.json"
      );
      const data = Object.values(response?.data)?.filter((ele) => {
         if (ele?.iata?.length > 0) return ele;
      });
      return data;
   }
);

const generalSlice = createSlice({
   name: "general",
   initialState,
   reducers: {
      setMenuStatus: (state, action) => {
         state.b2bMenuStatus = action?.payload;
      },
   },
   extraReducers: {
      [getAllCountries.pending]: (state, action) => {
         state.loading = true;
      },
      [getAllCountries.fulfilled]: (state, action) => {
         state.countries = action.payload;
      },
      [getAllAirports.pending]: (state, action) => {
         state.loading = true;
      },
      [getAllAirports.fulfilled]: (state, action) => {
         state.airports = action.payload;
      },
   },
});

export const { setMenuStatus } = generalSlice.actions;

export default generalSlice.reducer;
