/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import AttributeService from "../../services/attributes.service";

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

// get attribute

export const getAttribute = createAsyncThunk(
  "attribute/getAttribute",
  (_, thunkAPI) => handleAsyncThunk(AttributeService.getAll, [null], thunkAPI)
);

// create attribute

export const createAttribute = createAsyncThunk(
  "attribute/createAttribute",
  (data, thunkAPI) =>
    handleAsyncThunk(AttributeService.create, [data], thunkAPI)
);

// delete attribute

export const deleteAttribute = createAsyncThunk(
  "attribute/deleteAttribute",
  (id, thunkAPI) => handleAsyncThunk(AttributeService.delete, [id], thunkAPI)
);

// upadte attribute

export const updateAttribute = createAsyncThunk(
  "attribute/updateAttribute",
  ({ attributeId, data }, thunkAPI) =>
    handleAsyncThunk(AttributeService.update, [attributeId, data], thunkAPI)
);

const attribute = createSlice({
  name: "attribute",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    statusCreate: "idle",
    deleteStatus: "idle",
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
      .addCase(getAttribute.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAttribute.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getAttribute.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createAttribute.pending, (state) => {
        state.statusCreate = "loading";
      })
      .addCase(createAttribute.fulfilled, (state) => {
        state.statusCreate = "success";
      })
      .addCase(createAttribute.rejected, (state) => {
        state.statusCreate = "failed";
      })
      .addCase(deleteAttribute.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteAttribute.fulfilled, (state) => {
        state.deleteStatus = "success";
      })
      .addCase(deleteAttribute.rejected, (state) => {
        state.deleteStatus = "failed";
      })
      .addCase(updateAttribute.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateAttribute.fulfilled, (state) => {
        state.updateStatus = "success";
      })
      .addCase(updateAttribute.rejected, (state) => {
        state.updateStatus = "failed";
      });
  },
});

export default attribute.reducer;

export const { resetAttribute } = attribute.actions;
