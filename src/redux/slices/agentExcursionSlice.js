import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

const initialState = {
  loading: true,
  agentExcursion: {},
  agentExcursions: [],
  categories: [],
  agentRecievedActivities: [],
  agentSelectedActivities: [],
  ticketCount: 0,
  ticketStatus: false,
  favourites: localStorage.getItem("favourites")
    ? JSON.parse(localStorage.getItem("favourites")) || []
    : [],
  agentExcursionCart: localStorage.getItem("agentExcursionCart")
    ? JSON.parse(localStorage.getItem("agentExcursionCart")) || []
    : [],
};

export const getCategories = createAsyncThunk(
  "excursion/getCategories",
  async (args, { getState }) => {
    const response = await axios.get("/attractions/categories/all");
    return response.data;
  }
);

const agentExcursionSlice = createSlice({
  name: "agentExcursion",
  initialState,
  reducers: {
    setActivities: (state, action) => {
      state.agentRecievedActivities[action.payload.index][action.payload.name] =
        action.payload.value;
    },
    setSum: (state, action) => {
      state.agentRecievedActivities[action.payload.index][action.payload.sum] =
        action.payload.value;
    },
    setSelectionArray: (state, action) => {
      state.agentSelectedActivities = action.payload;
    },
    addToCart: (state, action) => {
      var excursionArray = [];
      var selectedArray = action.payload;
      excursionArray =
        JSON.parse(localStorage.getItem("agentExcursionCart")) || [];
      // merge two array
      let data = [...excursionArray, ...selectedArray];

      let array = [];
      let uniqueObj = {};
      for (let i in data) {
        let id = data[i]["_id"];
        uniqueObj[id] = data[i];
      }

      // unique object of array
      for (let i in uniqueObj) {
        array.push(uniqueObj[i]);
      }

      localStorage.setItem("agentExcursionCart", JSON.stringify(array));

      state.agentExcursionCart =
        JSON.parse(localStorage.getItem("agentExcursionCart")) || [];
    },
    customFromCart: (state, action) => {
      state.agentExcursionCart = state.agentExcursionCart.filter((item) => {
        if (item?._id === action.payload?.id) {
          item.isPromoAdded = action.payload?.value;
          if (action.payload?.value) {
            item.price =
              item?.price -
              (Number(item.adult) * Number(item?.b2bPromoAmountAdult) +
                Number(item.child) * Number(item?.b2bPromoAmountChild));
          } else {
            item.price =
              item?.price +
              (Number(item.adult) * Number(item?.b2bPromoAmountAdult) +
                Number(item.child) * Number(item?.b2bPromoAmountChild));
          }
        }
        return item;
      });
      localStorage.setItem(
        "agentExcursionCart",
        JSON.stringify(state.agentExcursionCart)
      );
    },
    removeFromCart: (state, action) => {
      state.agentExcursionCart = state.agentExcursionCart.filter((item) => {
        return item._id !== action.payload;
      });
      localStorage.setItem(
        "agentExcursionCart",
        JSON.stringify(state.agentExcursionCart)
      );
    },
    emptyCart: (state, action) => {
      state.agentExcursionCart = [];
      localStorage.setItem(
        "agentExcursionCart",
        JSON.stringify(state.agentExcursionCart)
      );
    },
    setAgentExcursion: (state, action) => {
      state.agentExcursion = action.payload?.attraction;
      state.ticketCount = action.payload?.ticketCount;
      state.ticketStatus = action.payload?.ticketStatus;
      let array = [];
      for (let i = 0; i < state.agentExcursion.activities.length; i++) {
        state.agentExcursion.activities[i].isChecked = false;
        state.agentExcursion.activities[i].date = "";
        state.agentExcursion.activities[i].transfer = "";
        state.agentExcursion.activities[i].adult = 1;
        state.agentExcursion.activities[i].child = 0;
        state.agentExcursion.activities[i].infant = 0;
        state.agentExcursion.activities[i].sum = 0;
        state.agentExcursion.activities[i].vehicle = [];
        state.agentExcursion.activities[i].selectedVehicle = [];
        if (state.agentExcursion.activities[i].base == "hourly") {
          state.agentExcursion.activities[i].hourCount = 1;
        }
        array.push(state.agentExcursion.activities[i]);
      }
      state.agentRecievedActivities = array;
    },
    setAgentAllExcursions: (state, action) => {
      state.agentExcursions = action.payload;
    },
    addToCartSingleItem: (state, action) => {
      var excursionArray = [];
      var selected = action.payload;
      excursionArray =
        JSON.parse(localStorage.getItem("agentExcursionCart")) || [];
      // merge two array
      let data = [...excursionArray, selected];

      let array = [];
      let uniqueObj = {};
      for (let i in data) {
        let id = data[i]["_id"];
        uniqueObj[id] = data[i];
      }

      // unique object of array
      for (let i in uniqueObj) {
        array.push(uniqueObj[i]);
      }

      localStorage.setItem("agentExcursionCart", JSON.stringify(array));

      state.agentExcursionCart =
        JSON.parse(localStorage.getItem("agentExcursionCart")) || [];
    },
    setFavourites: (state, action) => {
      var array = [];
      array = JSON.parse(localStorage.getItem("favourites")) || [];
      const isItemExist = array.find(
        (item) => item?._id === action.payload._id
      );
      if (isItemExist) {
        const result = array.filter((item) => item?._id !== action.payload._id);
        array = result;
        state.favourites = array;
        localStorage.setItem("favourites", JSON.stringify(array));
      } else {
        array = [action.payload, ...array];
        state.favourites = array;
        localStorage.setItem("favourites", JSON.stringify(array));
      }
    },
    stateFavourites: (state, action) => {
      state.favourites = localStorage.getItem("favourites")
        ? JSON.parse(localStorage.getItem("favourites"))
        : [];
    },
  },
  extraReducers: {
    [getCategories.pending]: (state, action) => {
      state.loading = true;
    },
    [getCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
  },
});

export const {
  setActivities,
  setSelectionArray,
  addToCart,
  removeFromCart,
  emptyCart,
  setAgentExcursion,
  setAgentAllExcursions,
  setVehicle,
  addToCartSingleItem,
  setFavourites,
  stateFavourites,
  customFromCart,
} = agentExcursionSlice.actions;

export default agentExcursionSlice.reducer;
