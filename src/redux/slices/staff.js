/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import StaffService from "../../services/staff.service";

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};
// login
export const login = createAsyncThunk("staff/login", (data, thunkAPI) =>
  handleAsyncThunk(StaffService.login, [data], thunkAPI)
);
// getStaff
export const getStaff = createAsyncThunk("auth/getStaff", (_, thunkAPI) =>
  handleAsyncThunk(StaffService.getAll, [null], thunkAPI)
);

// createStaff

export const createStaff = createAsyncThunk(
  "auth/createStaff",
  (data, thunkAPI) =>
    handleAsyncThunk(StaffService.createStaff, [data], thunkAPI)
);

// deleteStaff
export const deleteStaff = createAsyncThunk(
  "auth/deleteStaff",
  (id, thunkAPI) => handleAsyncThunk(StaffService.deleteStaff, [id], thunkAPI)
);

// updateStaff
export const updateStaff = createAsyncThunk(
  "auth/updateStaff",
  ({ staffId, data }, thunkAPI) =>
    handleAsyncThunk(StaffService.updateStaff, [staffId, data], thunkAPI)
);

// getStaffById

export const getStaffById = createAsyncThunk(
  "auth/getStaffById",
  (id, thunkAPI) => handleAsyncThunk(StaffService.getStaffById, [id], thunkAPI)
);

export const getMe = createAsyncThunk("staff/getMe", (_, thunkAPI) =>
  handleAsyncThunk(StaffService.fetchMe, [null], thunkAPI)
);

export const resetState = createAsyncThunk(
  "state/resetState",
  async (payload, thunkAPI) => {
    return payload;
  }
);

export const logout = createAsyncThunk("staff/logout", (_, thunkAPI) =>
  handleAsyncThunk(StaffService.logout, [null], thunkAPI)
);

// forgotpassword

export const forgotpassword = createAsyncThunk(
  "auth/forgotpassword",
  (data, thunkAPI) =>
    handleAsyncThunk(StaffService.forgotpassword, [data], thunkAPI)
);

export const resetpassword = createAsyncThunk(
  "auth/resetpassword",
  (data, thunkAPI) =>
    handleAsyncThunk(StaffService.resetpassword, [data], thunkAPI)
);

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    data: [],
    status: "idle",
    statusMe: "idle",
    error: null,
    me: null,
    statusUpdate: "idle",
    statusPassword: "idle",
    statusCreate: "idle",
    deleteStatus: "idle",
    updateStatus: "idle",
    getStaffByIdStatus: "idle",
    logoutStatus: "idle",
    getMeStatus: "idle",
    forgotPasswordStatus: "idle",
    resetPasswordStatus: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.me = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getStaff.pending, (state) => {
        state.statusMe = "loading";
      })
      .addCase(getStaff.fulfilled, (state, action) => {
        state.statusMe = "success";
        state.data = action.payload;
      })
      .addCase(getStaff.rejected, (state, action) => {
        state.statusMe = "failed";
        state.error = action.payload;
      })
      .addCase(createStaff.pending, (state) => {
        state.statusCreate = "loading";
      })
      .addCase(createStaff.fulfilled, (state) => {
        state.statusCreate = "success";
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.statusCreate = "failed";
        state.error = action.payload;
      })
      .addCase(deleteStaff.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteStaff.fulfilled, (state) => {
        state.deleteStatus = "success";
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      })
      .addCase(updateStaff.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateStaff.fulfilled, (state) => {
        state.updateStatus = "success";
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      })
      .addCase(getStaffById.pending, (state) => {
        state.getStaffByIdStatus = "loading";
      })
      .addCase(getStaffById.fulfilled, (state, action) => {
        state.getStaffByIdStatus = "success";
        state.data = action.payload;
      })
      .addCase(getStaffById.rejected, (state, action) => {
        state.getStaffByIdStatus = "failed";
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.logoutStatus = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutStatus = "success";
        state.me = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutStatus = "failed";
        state.error = action.payload;
      })
      .addCase(getMe.pending, (state) => {
        state.getMeStatus = "loading";
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.getMeStatus = "success";
        state.data = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.getMeStatus = "failed";
        state.error = action.payload;
      })
      .addCase(forgotpassword.pending, (state) => {
        state.forgotPasswordStatus = "loading";
      })
      .addCase(forgotpassword.fulfilled, (state) => {
        state.forgotPasswordStatus = "success";
      })
      .addCase(forgotpassword.rejected, (state, action) => {
        state.forgotPasswordStatus = "failed";
        state.error = action.payload;
      })
      .addCase(resetpassword.pending, (state) => {
        state.resetPasswordStatus = "loading";
      })
      .addCase(resetpassword.fulfilled, (state) => {
        state.resetPasswordStatus = "success";
      })
      .addCase(resetpassword.rejected, (state, action) => {
        state.resetPasswordStatus = "failed";
        state.error = action.payload;
      })
      .addCase(resetState.fulfilled, (state, action) => {
        if (action.payload) {
          const { key, value } = action.payload;
          if (key && value !== undefined) {
            state[key] = value;
          }
        }
      });
  },
});

export default staffSlice.reducer;
