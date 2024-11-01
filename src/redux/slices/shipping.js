import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import ShippingService from "../../services/shipping.service";


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

export const getAllShipping = createAsyncThunk("shippingUnits/getAllShipping", (_, thunkAPI) =>
    handleAsyncThunk(ShippingService.getAll, [null], thunkAPI)
);

export const createShipping = createAsyncThunk(
    "shippingUnits/createShipping",
    (data, thunkAPI) =>
        handleAsyncThunk(ShippingService.create, [data], thunkAPI)
);

export const updateShipping = createAsyncThunk(
    "shippingUnits/updateShippingUnits",
    ({ shippingId, data }, thunkAPI) =>
        handleAsyncThunk(ShippingService.update, [shippingId, data], thunkAPI)
);

export const deleteShipping = createAsyncThunk(
    "shippingUnits/deleteShippingUnits",
    (id, thunkAPI) => handleAsyncThunk(ShippingService.delete, [id], thunkAPI)
);

const shippingUnits = createSlice({
    name: "shippingUnits",
    initialState: {
        data: [],
        status: "idle",
        error: null,
        updateStatus: "idle",
        statusCreate: "idle",
        deleteStatus: "idle"
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
            .addCase(getAllShipping.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllShipping.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(getAllShipping.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            }).addCase(createShipping.pending, (state) => {
                state.statusCreate = "loading";
            })
            .addCase(createShipping.fulfilled, (state) => {
                state.statusCreate = "success";
            })
            .addCase(createShipping.rejected, (state) => {
                state.statusCreate = "failed";
            }).addCase(updateShipping.pending, (state) => {
                state.updateStatus = "loading";
            })
            .addCase(updateShipping.fulfilled, (state) => {
                state.updateStatus = "success";
            })
            .addCase(updateShipping.rejected, (state) => {
                state.updateStatus = "failed";
            })
            .addCase(deleteShipping.pending, (state) => {
                state.deleteStatus = "loading";
            })
            .addCase(deleteShipping.fulfilled, (state) => {
                state.deleteStatus = "success";
            })
            .addCase(deleteShipping.rejected, (state) => {
                state.deleteStatus = "failed";
            })
    },

});
export default shippingUnits.reducer;
export const { resetShippingUnitsState } = shippingUnits.actions;
