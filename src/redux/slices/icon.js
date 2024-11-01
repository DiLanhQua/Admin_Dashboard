import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import IconService from "../../services/icon.service";

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

// get icon
export const getIcon = createAsyncThunk("icon/getIcon", (_, thunkAPI) =>
  handleAsyncThunk(IconService.getAll, [null], thunkAPI)
);

const icon = createSlice({
  name: "icon",
  initialState: {
    data: [],
    status: "idle",
    error: null,
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
      .addCase(getIcon.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getIcon.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getIcon.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default icon.reducer;
export const { resetIconState } = icon.actions;
