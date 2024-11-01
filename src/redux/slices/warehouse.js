/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import WarehouseService from "../../services/warehouse.service";
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

// get all warehouses

export const getAllWarehouses = createAsyncThunk(
  "warehouse/getAllWarehouses",
  (_, thunkAPI) => handleAsyncThunk(WarehouseService.getAll, [null], thunkAPI)
);

// create warehouse

export const createWarehouse = createAsyncThunk(
  "warehouse/createWarehouse",
  (data, thunkAPI) =>
    handleAsyncThunk(WarehouseService.create, [data], thunkAPI)
);

// delete warehouse

export const deleteWarehouse = createAsyncThunk(
  "warehouse/deleteWarehouse",
  (id, thunkAPI) => handleAsyncThunk(WarehouseService.delete, [id], thunkAPI)
);

// update warehouse

export const updateWarehouse = createAsyncThunk(
  "warehouse/updateWarehouse",
  ({ warehouseId, data }, thunkAPI) =>
    handleAsyncThunk(WarehouseService.update, [warehouseId, data], thunkAPI)
);

const warehouse = createSlice({
  name: "warehouse",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    statusCreate: "idle",
    statusDelete: "idle",
    statusUpdate: "idle",
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
      .addCase(getAllWarehouses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllWarehouses.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getAllWarehouses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createWarehouse.pending, (state) => {
        state.statusCreate = "loading";
      })
      .addCase(createWarehouse.fulfilled, (state) => {
        state.statusCreate = "success";
      })
      .addCase(createWarehouse.rejected, (state, action) => {
        state.statusCreate = "failed";
        state.error = action.payload;
      })
      .addCase(deleteWarehouse.pending, (state) => {
        state.statusDelete = "loading";
      })
      .addCase(deleteWarehouse.fulfilled, (state) => {
        state.statusDelete = "success";
      })
      .addCase(deleteWarehouse.rejected, (state, action) => {
        state.statusDelete = "failed";
        state.error = action.payload;
      })
      .addCase(updateWarehouse.pending, (state) => {
        state.statusUpdate = "loading";
      })
      .addCase(updateWarehouse.fulfilled, (state) => {
        state.statusUpdate = "success";
      })
      .addCase(updateWarehouse.rejected, (state, action) => {
        state.statusUpdate = "failed";
        state.error = action.payload;
      });
  },
});

export default warehouse.reducer;
export const { resetWarehouseState } = warehouse.actions;
