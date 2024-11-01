/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import CustomerService from "../../services/customer.service";

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};

// get customer
export const getCustomer = createAsyncThunk(
  "customer/getCustomer",
  (_, thunkAPI) => handleAsyncThunk(CustomerService.getAll, [null], thunkAPI)
);
export const resetState = createAsyncThunk(
  "state/resetState",
  async (payload, thunkAPI) => {
    return payload;
  }
);

// create customer
export const createCustomer = createAsyncThunk(
  "customer/createCustomer",
  (data, thunkAPI) =>
    handleAsyncThunk(CustomerService.createCustomer, [data], thunkAPI)
);

// update customer
export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  ({ customerId, data }, thunkAPI) =>
    handleAsyncThunk(
      CustomerService.updateCustomer,
      [customerId, data],
      thunkAPI
    )
);

// delete customer

export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  (id, thunkAPI) =>
    handleAsyncThunk(CustomerService.deleteCustomer, [id], thunkAPI)
);

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    me: null,
    statusUpdate: "idle",
    deleteStatus: "idle",
    createStatus: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.statusUpdate = "loading";
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.statusUpdate = "success";
        state.data = action.payload;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.statusUpdate = "failed";
        state.error = action.payload;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteCustomer.fulfilled, (state) => {
        state.deleteStatus = "success";
      })
      .addCase(deleteCustomer.rejected, (state) => {
        state.deleteStatus = "failed";
      })
      .addCase(resetState.fulfilled, (state, action) => {
        if (action.payload) {
          const { key, value } = action.payload;
          if (key && value !== undefined) {
            state[key] = value;
          }
        }
      })
      .addCase(createCustomer.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createCustomer.fulfilled, (state) => {
        state.createStatus = "success";
      })
      .addCase(createCustomer.rejected, (state) => {
        state.createStatus = "failed";
      });
  },
});
export default customerSlice.reducer;
export const { resetStateCustomer } = customerSlice.actions;
