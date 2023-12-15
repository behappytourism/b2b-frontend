import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../../axios"

const initialState = {
    isLoading: true,
    quotations: [],
    filters: {
        dateFrom: "",
        dateTo: "",
        quotationNumber: "",
    },
    skip: 0,
    limit: 10,
    totalQuotations: 0,
    quotationList : [],
    quotationCreatedData: [],
    quotationStatus:{
        status: "",
        amendmentId:""
    },
};

const fetchQuotations = createAsyncThunk(
    "/user/fetchQuotations",
    async (args, { getState }) => {
        const { jwtToken } = getState().user;
        const { filters, skip, limit } = getState().quotationsList;
        const response = await axios.get(
            `/admin/quotations/all?skip=${skip}&limit=${limit}&dateFrom=${
                filters?.dateFrom
            }&dateTo=${filters?.dateTo}&quotationNumber=${
                filters?.quotationNumber
            }&agent=${args?.agentId || ""}`,
            { headers: { Authorization: `Bearer ${jwtToken}` } }
        );
        return response.data;
    }
);

const fetchAgentsQuotations = createAsyncThunk(
    "/user/fetchAgentsQuotations",
    async (_, { getState }) => {
        const { jwtToken } = getState().user;
        const { filters, skip, limit } = getState().quotationsList;
        const response = await axios.get(
            `/quotations/all?skip=${skip}&limit=${limit}&dateFrom=${filters?.dateFrom}&dateTo=${filters?.dateTo}&quotationNumber=${filters?.quotationNumber}`,
            { headers: { Authorization: `Bearer ${jwtToken}` } }
        );
        return response.data;
    }
);

export const quotationsListSlice = createSlice({
    name: "quotationsList",
    initialState,
    reducers: {
        updateIsQuotationsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        updateQuotationsFilters: (state, action) => {
            state.filters[action.payload?.name] = action.payload?.value;
            state.skip = 0;
        },
        clearQuotationsFilters: (state, action) => {
            state.filters = {
                dateFrom: "",
                dateTo: "",
                quotationNumber: "",
            };
            state.limit = 10;
            state.skip = 0;
        },
        updateQuotationsSkip: (state, action) => {
            state.skip = action.payload;
        },
        incOrDecQuotationsSkip: (state, action) => {
            state.skip += action.payload;
        },
        clearAllQuotationsData: (state, action) => {
            state.quotations = [];
            state.filters = {
                dateFrom: "",
                dateTo: "",
                quotationNumber: "",
            };
            state.limit = 10;
            state.skip = 0;
            state.isLoading = true;
        },

        handleQuotationList : (state, {payload})=>{
            state.quotationList = payload
        },

        setCreateQuotationData: (state, {payload})=>{
            state.quotationCreatedData.push(payload)
        },
        setQuotationStatus: (state, {payload}) => {
            state.quotationStatus.status = payload.status
            state.quotationStatus.amendmentId = payload.amendmentId
        },
        setInitialChangeStatus: (state, {payload}) => {
            state.quotationStatus.status = payload.status
            state.quotationStatus.amendmentId = payload.amendmentId
        }
    },
    extraReducers: {
        [fetchQuotations.fulfilled]: (state, action) => {
            state.quotations = action.payload?.quotations;
            state.totalQuotations = action.payload?.totalQuotations;
            state.isLoading = false;
        },
        [fetchAgentsQuotations.fulfilled]: (state, action) => {
            state.quotations = action.payload?.quotations;
            state.totalQuotations = action.payload?.totalQuotations;
            state.isLoading = false;
        },
    },
});

export const {
    clearQuotationsFilters,
    incOrDecQuotationsSkip,
    updateIsQuotationsLoading,
    updateQuotationsFilters,
    updateQuotationsSkip,
    clearAllQuotationsData,
    handleQuotationList,
    setCreateQuotationData,
    setQuotationStatus,
    setInitialChangeStatus
} = quotationsListSlice.actions;

export { fetchQuotations, fetchAgentsQuotations };

export default quotationsListSlice.reducer;
