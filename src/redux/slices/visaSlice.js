import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visaLoading: false,
  visaEnquiry: {
    visaType: "",
    nationality: "",
    noOfAdult: 1,
    noOfChild: "",
  },
  childRows: [],
  rows: [
    {
      paxType: "ADT",
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      contactNo: "",
      passportNo: "",
      passportExpiry: {
        day: "",
        month: "",
        year: "",
      },
      dateOfBirth: {
        day: "",
        month: "",
        year: "",
      },
    },
  ],
  imageRows: [
    {
      passportFistPagePhoto: "",
      passportLastPagePhoto: "",
      passportSizePhoto: "",
      supportiveDoc1: "",
      supportiveDoc2: "",
    },
  ],
  visa: [],
  visaApplyResponse: {},
};

const visaSlice = createSlice({
  name: "visa",
  initialState,
  reducers: {
    addRows: (state, action) => {
      state.childRows = [];
      state.rows = [
        {
          paxType: "ADT",
          title: "",
          firstName: "",
          lastName: "",
          email: "",
          contactNo: "",
          passportNo: "",
          expiryDate: {
            day: "",
            month: "",
            year: "",
          },
          dateOfBirth: {
            day: "",
            month: "",
            year: "",
          },
        },
      ];
      state.imageRows = [
        {
          passportFistPagePhoto: "",
          passportLastPagePhoto: "",
          passportSizePhoto: "",
          supportiveDoc1: "",
          supportiveDoc2: "",
        },
      ];

      for (let i = 1; i < Number(state.visaEnquiry?.noOfAdult); i++) {
        state.rows.push({
          paxType: "ADT",
          title: "",
          firstName: "",
          lastName: "",
          email: "",
          contactNo: "",
          passportNo: "",
          expiryDate: {
            day: "",
            month: "",
            year: "",
          },
          dateOfBirth: {
            day: "",
            month: "",
            year: "",
          },
        });

        state.imageRows.push({
          passportFistPagePhoto: "",
          passportLastPagePhoto: "",
          passportSizePhoto: "",
          supportiveDoc1: "",
          supportiveDoc2: "",
        });
      }

      for (let i = 1; i <= Number(state.visaEnquiry?.noOfChild); i++) {
        state.childRows.push({
          paxType: "CHD",
          title: "",
          firstName: "",
          lastName: "",
          email: "",
          contactNo: "",
          passportNo: "",
          expiryDate: {
            day: "",
            month: "",
            year: "",
          },
          dateOfBirth: {
            day: "",
            month: "",
            year: "",
          },
        });

        state.imageRows.push({
          passportFistPagePhoto: "",
          passportLastPagePhoto: "",
          passportSizePhoto: "",
          supportiveDoc1: "",
          supportiveDoc2: "",
        });
      }
    },
    b2bhandleRowItemChange: (state, action) => {
      state.rows[action.payload.index][action.payload.name] =
        action.payload.value;
    },
    b2bhandleDOBChange: (state, action) => {
      state.rows[action.payload.index].dateOfBirth[action.payload.name] =
        action.payload.value;
    },
    b2bhandleExpiryChange: (state, action) => {
      state.rows[action.payload.index].expiryDate[action.payload.name] =
        action.payload.value;
    },
    childhandleRowItemChange: (state, action) => {
      state.childRows[action.payload.index][action.payload.name] =
        action.payload.value;
    },
    childhandleDOBChange: (state, action) => {
      state.childRows[action.payload.index].dateOfBirth[action.payload.name] =
        action.payload.value;
    },
    childhandleExpiryChange: (state, action) => {
      state.childRows[action.payload.index].expiryDate[action.payload.name] =
        action.payload.value;
    },

    setVisaEnquiry: (state, action) => {
      state.visaEnquiry = action.payload;
    },
    setOnChangeVisaEnquiry: (state, action) => {
      state.visaEnquiry[action.payload.name] = action.payload.value;
    },
    setVisaResponseData: (state, action) => {
      state.visaApplyResponse = action.payload?.visaApplication;
    },
    setVisas: (state, action) => {
      state.visa = action.payload;
    },
  },
});

export const {
  childhandleRowItemChange,
  childhandleDOBChange,
  childhandleExpiryChange,
  addRows,
  b2bhandleRowItemChange,
  setVisaEnquiry,
  b2bhandleDOBChange,
  setVisaResponseData,
  b2bhandleExpiryChange,
  setVisas,
  setOnChangeVisaEnquiry,
} = visaSlice.actions;

export default visaSlice.reducer;
