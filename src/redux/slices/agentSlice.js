import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

const initialState = {
  isSiteLoading: true,
  agent: {},
  token: localStorage.getItem("agent-string") || "",
  isLoggedIn: false,
  forgotPasswordEmail: "",
  agenttempLogo:null
};

const fetchAgent = createAsyncThunk(
  "agentSlice/fetchAgent",
  async (_, { getState }) => {
    const { token } = getState().agents;
    if (token) {
      const response = await axios.get("/b2b/resellers/auth/getReseller", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } else {
      throw Error("");
    }
  }
);

const logoutAgent = createAsyncThunk(
  "agentSlice/logoutAgent",
  async (dispatch, getState) => {
    // const response = await axios.get('/user/logout');
    localStorage.removeItem("agent-string");
  }
);


const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {
    setAgent: (state, action) => {
      state.agent = action.payload?.reseller;
      state.token = action.payload?.jwtToken;
      state.isLoggedIn = true;

      localStorage.setItem("agent-string", action.payload?.jwtToken);
    },
    setAgentCompanyLogo:(state,action)=>{
      console.log(action.payload,"action.payload.companyLogo");
      state.agenttempLogo=action.payload
      console.log(state.agenttempLogo,"Pokak Technologies");
    },
    setRegisterAgent: (state, action) => {
      state.agent = action.payload?.reseller;
      state.token = action.payload?.jwtToken;
      state.isLoggedIn = false;

      localStorage.setItem("agent-string", action.payload?.jwtToken);
    },
    setForgotPasswordEmail: (state, action) => {
        state.forgotPasswordEmail = action?.payload
    }
  },
  extraReducers: {
    [fetchAgent.fulfilled]: (state, action) => {
      state.agent = action.payload;
      state.isLoggedIn = true;
      state.isSiteLoading = false;
    },
    [fetchAgent.rejected]: (state, action) => {
      state.isSiteLoading = false;
      // localStorage.removeItem("agent-string");
    },
    [logoutAgent.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.agent = {};
      state.token = "";

      localStorage.removeItem("agent-string");
    },
  },
});

export { fetchAgent, logoutAgent };

export const { setAgent,setAgentCompanyLogo, setRegisterAgent, setForgotPasswordEmail } = agentSlice.actions;

export default agentSlice.reducer;
