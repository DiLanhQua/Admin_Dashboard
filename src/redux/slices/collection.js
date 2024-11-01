/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import ServiceService from "../../services/series.service";

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

// get all collections

export const getAllCollections = createAsyncThunk(
  "collection/getAllCollections",
  (_, thunkAPI) => handleAsyncThunk(ServiceService.getAll, [null], thunkAPI)
);

// create collection

export const createCollection = createAsyncThunk(
  "collection/createCollection",
  (data, thunkAPI) => handleAsyncThunk(ServiceService.create, [data], thunkAPI)
);

// delete collection

export const deleteCollection = createAsyncThunk(
  "collection/deleteCollection",
  (id, thunkAPI) => handleAsyncThunk(ServiceService.delete, [id], thunkAPI)
);

// update collection

export const updateCollection = createAsyncThunk(
  "collection/updateCollection",
  ({ collectionId, data }, thunkAPI) =>
    handleAsyncThunk(ServiceService.update, [collectionId, data], thunkAPI)
);

const collection = createSlice({
  name: "collection",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    createStatus: "idle",
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
      .addCase(getAllCollections.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCollections.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllCollections.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createCollection.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createCollection.fulfilled, (state) => {
        state.createStatus = "succeeded";
      })
      .addCase(createCollection.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload;
      })
      .addCase(deleteCollection.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteCollection.fulfilled, (state) => {
        state.deleteStatus = "succeeded";
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      })
      .addCase(updateCollection.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateCollection.fulfilled, (state) => {
        state.updateStatus = "succeeded";
      })
      .addCase(updateCollection.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default collection.reducer;
export const { resetCollection } = collection.actions;
