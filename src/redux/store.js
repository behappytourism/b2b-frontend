import { configureStore } from "@reduxjs/toolkit";
import {
  agentExcursionReducer,
  agentReducer,
  generalReducer,
  homeReducer,
  markupReducer,
  paymentReducer,
  resellerReducer,
  visaReducer,
  walletReducer,
  flightReducer,
  a2aReducer,
  hotelReducer,
  quotationListSliceReducer,
  quotationReducer,
  insuranceReducer,
  transferReducer
} from "./slices";

const store = configureStore({
  reducer: {
    general: generalReducer,
    payment: paymentReducer,
    home: homeReducer,
    agents: agentReducer,
    markups: markupReducer,
    resellers: resellerReducer,
    agentExcursions: agentExcursionReducer,
    wallet: walletReducer,
    visa: visaReducer,
    flight: flightReducer,
    a2a: a2aReducer,
    hotel: hotelReducer,
    quotation: quotationReducer,
    qutationList: quotationListSliceReducer,
    insurance: insuranceReducer,
    transfer: transferReducer
  },
  devTools: true,
});

export default store;
