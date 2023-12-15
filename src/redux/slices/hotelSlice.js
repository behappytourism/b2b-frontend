import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  enquiry: {
    locality: "",
    fromDate: "",
    toDate: "",
  },
  rows: [
    {
      noOfAdults: 1,
      noOfChildren: 0,
      childrenAges: [],
    },
  ],
  travellerDetails: [],
  numOfRooms: 1,
  submitEnquiryChildrenAges: [],
  hotelBanners: [],
  hotelPromotionOne: [],
  hotelPromotionTwo: [],
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    addNewRow: (state, action) => {
      state.rows.push({
        noOfAdults: 1,
        noOfChildren: 0,
        childrenAges: [],
      });
    },
    settingInitiallyNoOfRooms: (state, action) => {
      state.numOfRooms = state.rows.length;
    },
    addHandleNewRow: (state, action) => {
      let array = [];
      for (let i = 0; i < action.payload; i++) {
        if (state.rows[i]) {
          array[i] = state.rows[i];
        } else {
          array[i] = {
            noOfAdults: 1,
            noOfChildren: 0,
            childrenAges: [],
          };
        }
      }
      state.rows = array;
      state.numOfRooms = state.rows.length;
    },
    removeLastRow: (state, action) => {
      const filteredRow = state.rows?.filter((_, index) => {
        return index !== state.rows?.length - 1;
      });
      state.rows = filteredRow;
    },
    handleOnChange: (state, action) => {
      state.rows[action.payload.index][action.payload.name] =
        action.payload.value;
      state.rows[action.payload.index].childrenAges = state.rows[
        action.payload.index
      ].childrenAges?.slice(0, state.rows[action.payload.index]?.noOfChildren);
    },
    handleOnAgeChange: (state, action) => {
      state.rows[action.payload.index].childrenAges[action.payload.i] =
        action.payload.value;
    },
    handleOnAgeChangeSubmitEnquiry: (state, action) => {
      state.submitEnquiryChildrenAges[action.payload.index] =
        action.payload.value;
    },
    setSubmitEnquiryChildrenAges: (state, action) => {
      state.submitEnquiryChildrenAges = action.payload;
    },
    addNewTravellerDetails: (state, action) => {
      state.travellerDetails = [];
      for (let i = 0; i < action.payload.len; i++) {
        state.travellerDetails.push({
          ...action.payload.value[i],
          title: "",
          firstName: "",
          lastName: "",
        });
      }
    },
    addEnquiry: (state, action) => {
      state.enquiry.locality = action.payload.locality;
      state.enquiry.fromDate = action.payload.fromDate;
      state.enquiry.toDate = action.payload.toDate;
    },
    handleTravellerDetailOnchange: (state, action) => {
      state.travellerDetails[action.payload.index][action.payload.name] =
        action.payload.value;
    },
    detailPageInitialRowAdd: (state, action) => {
      state.rows = action.payload;
    },
    setHotelBannerImages: (state, { payload }) => {
      state.hotelBanners = payload;
    },
    setHotelPromotionOne: (state, { payload }) => {
      state.hotelPromotionOne = payload;
    },
    setHotelPromotionTwo: (state, { payload }) => {
      state.hotelPromotionTwo = payload;
    },
  },
});

export const {
  addNewRow,
  addHandleNewRow,
  handleOnChange,
  handleOnAgeChange,
  addNewTravellerDetails,
  handleTravellerDetailOnchange,
  addEnquiry,
  removeLastRow,
  detailPageInitialRowAdd,
  handleOnAgeChangeSubmitEnquiry,
  setSubmitEnquiryChildrenAges,
  settingInitiallyNoOfRooms,
  // Add new change anshid
  setHotelBannerImages,
  setHotelPromotionOne,
  setHotelPromotionTwo,
} = hotelSlice.actions;

export default hotelSlice.reducer;
