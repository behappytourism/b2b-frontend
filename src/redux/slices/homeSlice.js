import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

const UAE_FLAG =
  "https://cdn.jsdelivr.net/npm/svg-country-flags@1.2.10/svg/ae.svg";

const initialState = {
  loading: false,
  UAE: "",
  currencies: [],
  destinations: [],
  countries: [],
  areas: [],
  states: [],
  visaCountries: [],
  selectedCurrency: {
    isocode: "AED",
    conversionRate: 1,
    flag: UAE_FLAG,
  },
  alertSuccess: {
    status: false,
    title: "",
    text: "",
  },
  alertError: {
    status: false,
    title: "",
    text: "",
  },
  socialMedias : {}
};

// get all data for home
export const getInitialData = createAsyncThunk(
  "homeSlice/getInitialData",
  async (args, { getState }) => {
    const response = await axios.get(`/home/initial-data`);
    return response.data;
  }
);
export const getInitialVisaCountryList = createAsyncThunk(
  "homeSlice/getInitialVisaCountryList",
  async (args, { getState }) => {
    const response = await axios.get(`/b2b/visa/country/all`);

    return response.data;
  }
);

export const getSocialMedia = createAsyncThunk(
  "homeSlice/getSocialMedia",
  async (args, { getState }) => {
    const response = await axios.get(`/b2b/home/contact-details`)
    return response.data
  }
)

// export const getHotelSearchQuery = createAsyncThunk(
//   "homeSlice/getHotelSearchQuery",
//   async (args, { getState }) => {
//     const response = await axios.get(`/search/list?search=${args}`);

//     return response.data;
//   }
// );

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    changeCurrency: (state, action) => {
      state.selectedCurrency = {
        isocode: action.payload?.isocode,
        conversionRate: action.payload?.conversionRate,
        flag: action.payload?.flag,
      };
      localStorage.setItem("currency", JSON.stringify(state.selectedCurrency));
    },
    setAlertSuccess: (state, action) => {
      state.alertSuccess = {
        status: action.payload?.status,
        title: action.payload?.title,
        text: action.payload?.text,
      };
    },
    setAlertError:  (state, action) => {
      const text =  action.payload.text 
      if (text?.length > 0) {
        state.alertError = {
          status: action.payload?.status,
          title: action.payload?.title,
          text: action.payload?.text,
        };
      }
    },
  },
  extraReducers: {
    [getInitialData.pending]: (state, action) => {
      state.loading = true;
    },
    [getInitialData.fulfilled]: (state, action) => {
      state.countries = action.payload?.countries;
      state.destinations = action.payload?.destinations;
      state.currencies = action.payload?.currencies;
      state.areas = action.payload?.popularHotelCities;
      state.states = action.payload?.popularHotelStates;

      const localCurrency = localStorage.getItem("currency")
        ? JSON.parse(localStorage.getItem("currency"))
        : "";
      if (localCurrency) {
        const objIndex = state.currencies?.findIndex((currency) => {
          return (
            currency?.isocode?.toUpperCase() ===
            localCurrency?.isocode?.toUpperCase()
          );
        });
        if (objIndex !== -1) {
          state.selectedCurrency = {
            isocode: state.currencies[objIndex]?.isocode,
            conversionRate: state.currencies[objIndex]?.conversionRate,
            flag: state.currencies[objIndex]?.country?.flag,
          };
        } else {
          state.selectedCurrency = {
            isocode: "AED",
            conversionRate: 1,
            flag: UAE_FLAG,
          };
        }
      } else {
        state.selectedCurrency = {
          isocode: "AED",
          conversionRate: 1,
          flag: UAE_FLAG,
        };
      }

      state.UAE = action.payload?.countries?.find(
        (item) => item?.isocode === "AE"
      );
      state.loading = false;
    },
    [getInitialVisaCountryList.pending]: (state, action) => {
      state.loading = true;
    },
    [getInitialVisaCountryList.fulfilled]: (state, action) => {
      state.visaCountries = action.payload;
      state.loading = false;
    },

    [getSocialMedia.fulfilled] : (state, {payload}) => {
      state.socialMedias = payload
    }
  },
});

export const { changeCurrency, setAlertSuccess, setAlertError } =
  homeSlice.actions;

export default homeSlice.reducer;
