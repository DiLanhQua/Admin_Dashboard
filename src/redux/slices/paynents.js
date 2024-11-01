/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import PaymentService from "../../services/payment.service";
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

// get payment
export const getPayment = createAsyncThunk(
  "payment/getPayment",
  (_, thunkAPI) => handleAsyncThunk(PaymentService.get, [null], thunkAPI)
);

// add payment
export const addPayment = createAsyncThunk(
  "payment/addPayment",
  (data, thunkAPI) => handleAsyncThunk(PaymentService.add, [data], thunkAPI)
);

// update payment

export const updatePayment = createAsyncThunk(
  "payment/updatePayment",
  ({ paymentId, data }, thunkAPI) =>
    handleAsyncThunk(PaymentService.update, [paymentId, data], thunkAPI)
);

// delete payment

export const deletePayment = createAsyncThunk(
  "payment/deletePayment",
  (id, thunkAPI) => handleAsyncThunk(PaymentService.delete, [id], thunkAPI)
);
const payment = createSlice({
  name: "payment",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    updateStatus: "idle",
    addStatus: "idle",
    deleteStatus: "idle",
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
      .addCase(getPayment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addPayment.pending, (state) => {
        state.addStatus = "loading";
      })
      .addCase(addPayment.fulfilled, (state) => {
        state.addStatus = "succeeded";
      })
      .addCase(addPayment.rejected, (state, action) => {
        state.addStatus = "failed";
        state.error = action.payload;
      })
      .addCase(updatePayment.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updatePayment.fulfilled, (state) => {
        state.updateStatus = "succeeded";
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      })
      .addCase(deletePayment.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deletePayment.fulfilled, (state) => {
        state.deleteStatus = "succeeded";
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default payment.reducer;
export const { resetPaymentState } = payment.actions;
