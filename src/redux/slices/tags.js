/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import TagsService from "../../services/tags.service";

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

export const createTag = createAsyncThunk(
  "tags/createTag",
  (data, thunkAPI) =>
    handleAsyncThunk(TagsService.create, [data], thunkAPI)
)

export const updateTag = createAsyncThunk(
  "tags/updateTag",
  ({ tagId, data }, thunkAPI) =>
    handleAsyncThunk(TagsService.update, [tagId, data], thunkAPI)
);

export const getAllTags = createAsyncThunk("tags/getAllTags", (_, thunkAPI) =>
  handleAsyncThunk(TagsService.getAll, [null], thunkAPI)
);

export const deleteTag = createAsyncThunk(
  "tags/deleteTag",
  (id, thunkAPI) => handleAsyncThunk(TagsService.delete, [id], thunkAPI)
);

const tags = createSlice({
  name: "tags",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    statusCreate: "idle",
    updateStatus: "idle",
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
      .addCase(getAllTags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllTags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllTags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      }).addCase(createTag.pending, (state) => {
        state.statusCreate = "loading";
      })
      .addCase(createTag.fulfilled, (state) => {
        state.statusCreate = "success";
      })
      .addCase(createTag.rejected, (state) => {
        state.statusCreate = "failed";
      })
      .addCase(updateTag.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateTag.fulfilled, (state) => {
        state.updateStatus = "success";
      })
      .addCase(updateTag.rejected, (state) => {
        state.updateStatus = "failed";
      })
      .addCase(deleteTag.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteTag.fulfilled, (state) => {
        state.deleteStatus = "success";
      })
      .addCase(deleteTag.rejected, (state) => {
        state.deleteStatus = "failed";
      })
  },
});

export default tags.reducer;
export const { resetTagsState } = tags.actions;
