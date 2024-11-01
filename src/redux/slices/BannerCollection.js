/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import BannerCollectionService from "../../services/bannerCollection.service";

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

// get banner collection

export const getBannerCollection = createAsyncThunk(
  "bannerCollection/getBannerCollection",
  (_, thunkAPI) =>
    handleAsyncThunk(BannerCollectionService.getAll, [null], thunkAPI)
);

export const createBannerCollection = createAsyncThunk(
  "bannerCollection/createBannerCollection",
  (data, thunkAPI) =>
    handleAsyncThunk(BannerCollectionService.create, [data], thunkAPI)
);

// get banner collection by id

export const getBannerCollectionById = createAsyncThunk(
  "bannerCollection/getBannerCollectionById",
  (id, thunkAPI) =>
    handleAsyncThunk(BannerCollectionService.getById, [id], thunkAPI)
);
// update banner collection

export const updateBannerCollection = createAsyncThunk(
  "bannerCollection/updateBannerCollection",
  ({ bannerId, data }, thunkAPI) =>
    handleAsyncThunk(BannerCollectionService.update, [bannerId, data], thunkAPI)
);

// delete banner collection

export const deleteBannerCollection = createAsyncThunk(
  "bannerCollection/deleteBannerCollection",
  (id, thunkAPI) =>
    handleAsyncThunk(BannerCollectionService.delete, [id], thunkAPI)
);
const bannerCollection = createSlice({
  name: "bannerCollection",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    statusCreate: "idle",
    statusUpdate: "idle",
    statusGetById: "idle",
    statusDelete: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBannerCollection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBannerCollection.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.data = payload;
      })
      .addCase(getBannerCollection.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
    builder
      .addCase(createBannerCollection.pending, (state) => {
        state.statusCreate = "loading";
      })
      .addCase(createBannerCollection.fulfilled, (state) => {
        state.statusCreate = "success";
      })
      .addCase(createBannerCollection.rejected, (state, { payload }) => {
        state.statusCreate = "failed";
        state.error = payload;
      });
    builder
      .addCase(getBannerCollectionById.pending, (state) => {
        state.statusGetById = "loading";
      })
      .addCase(getBannerCollectionById.fulfilled, (state, { payload }) => {
        state.statusGetById = "success";
        state.data = payload;
      })
      .addCase(getBannerCollectionById.rejected, (state, { payload }) => {
        state.statusGetById = "failed";
        state.error = payload;
      });
    builder
      .addCase(updateBannerCollection.pending, (state) => {
        state.statusUpdate = "loading";
      })
      .addCase(updateBannerCollection.fulfilled, (state) => {
        state.statusUpdate = "success";
      })
      .addCase(updateBannerCollection.rejected, (state, { payload }) => {
        state.statusUpdate = "failed";
        state.error = payload;
      });
    builder
      .addCase(deleteBannerCollection.pending, (state) => {
        state.statusDelete = "loading";
      })
      .addCase(deleteBannerCollection.fulfilled, (state) => {
        state.statusDelete = "success";
      })
      .addCase(deleteBannerCollection.rejected, (state, { payload }) => {
        state.statusDelete = "failed";
        state.error = payload;
      });
  },
});

export default bannerCollection.reducer;
export const { bannerCollectionReducer } = bannerCollection.actions;
