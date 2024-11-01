/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import BrandService from "../../services/brand.service";
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

// get brand
export const getBrand = createAsyncThunk("brand/getBrand", (_, thunkAPI) =>
  handleAsyncThunk(BrandService.getAll, [null], thunkAPI)
);

// create brand

export const createBrand = createAsyncThunk(
  "brand/createBrand",
  (data, thunkAPI) => handleAsyncThunk(BrandService.create, [data], thunkAPI)
);

// delete brand

export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  (id, thunkAPI) => handleAsyncThunk(BrandService.delete, [id], thunkAPI)
);

// update brand

export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  ({ brandId, data }, thunkAPI) =>
    handleAsyncThunk(BrandService.update, [brandId, data], thunkAPI)
);

const brand = createSlice({
  name: "brand",
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
      .addCase(getBrand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createBrand.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createBrand.fulfilled, (state) => {
        state.createStatus = "success";
      })
      .addCase(createBrand.rejected, (state) => {
        state.createStatus = "failed";
      })
      .addCase(deleteBrand.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteBrand.fulfilled, (state) => {
        state.deleteStatus = "success";
      })
      .addCase(deleteBrand.rejected, (state) => {
        state.deleteStatus = "failed";
      })
      .addCase(updateBrand.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateBrand.fulfilled, (state) => {
        state.updateStatus = "success";
      });
  },
});

export default brand.reducer;
export const { resetBrand } = brand.actions;
