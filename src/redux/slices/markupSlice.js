import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";

const initialState = {
  loading: true,
  agentMarkup: {},
  clientMarkup: {},
  visaAgentMarkup: {},
  visaClientMarkup: {},
};

export const removeClientMarkup = createAsyncThunk(
    "markupSlice/removeClientMarkup",
    async (args, { getState }) => {
        const { token } = getState().agents;
        if (token) {
            const response = await axios.delete(`/b2b/resellers/client/markup/delete/${args.id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } else {
            throw Error("Cant find markups");
        }
    }
);
export const removeSubagentMarkup = createAsyncThunk(
    "markupSlice/removeSubagentMarkup",
    async (args, { getState }) => {
        const { token } = getState().agents;
        if (token) {
            const response = await axios.delete(`/b2b/resellers/subagent/markup/delete/${args.id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } else {
            throw Error("Cant find markups");
        }
    }
);
export const removeSubagentVisaMarkup = createAsyncThunk(
    "markupSlice/removeSubagentMarkup",
    async (args, { getState }) => {
        const { token } = getState().agents;
        if (token) {
            const response = await axios.delete(`/b2b/subagent/visa/markup/delete/${args.id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } else {
            throw Error("Cant find markups");
        }
    }
);
export const removeClientVisaMarkup = createAsyncThunk(
    "markupSlice/removeSubagentMarkup",
    async (args, { getState }) => {
        const { token } = getState().agents;
        if (token) {
            const response = await axios.delete(`/b2b/client/visa/markup/delete/${args.id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } else {
            throw Error("Cant find markups");
        }
    }
);

const markupSlice = createSlice({
  name: "markup",
  initialState,
  reducers: {
      setClientMarkup: (state, action) => {
          state.clientMarkup = action.payload;
      },
      setAgentMarkup: (state, action) => {
          state.agentMarkup = action.payload;
      },
      setVisaClientMarkup: (state, action) => {
          state.visaClientMarkup = action.payload;
      },
      setVisaAgentMarkup: (state, action) => {
          state.visaAgentMarkup = action.payload;
      },
      clearMarkups: (state, action) => {
        state.markups = []
      },
  },
  extraReducers: {
    [removeClientMarkup.fulfilled]: (state, action) => {
      state.clientMarkup = {
        _id: action?.payload?._id,
        name: action?.payload?.name
      }
      state.loading = false;
    },
    [removeSubagentMarkup.fulfilled]: (state, action) => {
      state.agentMarkup = {
        _id: action?.payload?._id,
        name: action?.payload?.name
      }
      state.loading = false;
    },
  },
});


export const {setClientMarkup, setAgentMarkup, clearMarkups, setVisaAgentMarkup, setVisaClientMarkup } = markupSlice.actions;

export default markupSlice.reducer;
