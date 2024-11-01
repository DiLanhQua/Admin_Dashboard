/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import WebConfigService from "../../services/webComfig.service";

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};

export const resetState = createAsyncThunk(
  "state/resetState",
  async (payload, thunkAPI) => {
    return payload;
  }
);

// get webConfig
export const getWebConfig = createAsyncThunk(
  "webConfig/getWebConfig",
  (_, thunkAPI) => handleAsyncThunk(WebConfigService.get, [null], thunkAPI)
);

// update webConfig

export const updateWebConfig = createAsyncThunk(
  "webConfig/updateWebConfig",
  ({ WebComfigId, data }, thunkAPI) =>
    handleAsyncThunk(WebConfigService.update, [WebComfigId, data], thunkAPI)
);

const webConfig = createSlice({
  name: "webConfig",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    // statusCreate: "idle",
    // deleteStatus: "idle",
    updateStatus: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetState.fulfilled, (state, action) => {
        if (action.payload) {
          const { key, value } = action.payload;
          if (key && value !== undefined) {
            state[key] = value;
          }
        }
      })
      .addCase(getWebConfig.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWebConfig.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getWebConfig.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateWebConfig.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateWebConfig.fulfilled, (state) => {
        state.updateStatus = "success";
      })
      .addCase(updateWebConfig.rejected, (state) => {
        state.updateStatus = "failed";
      });
  },
});

export default webConfig.reducer;
export const { resetWebConfig } = webConfig.actions;
