/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import PostService from "../../services/post.service";
const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};

// createPost
export const createPost = createAsyncThunk(
  "post/createPost",
  (data, thunkAPI) => handleAsyncThunk(PostService.createPost, [data], thunkAPI)
);

// updatePost

export const updatePost = createAsyncThunk(
  "post/updatePost",
  ({ postId, data }, thunkAPI) =>
    handleAsyncThunk(PostService.updatePost, [postId, data], thunkAPI)
);

// deletePost

export const deletePost = createAsyncThunk("post/deletePost", (id, thunkAPI) =>
  handleAsyncThunk(PostService.deletePost, [id], thunkAPI)
);

// deleteMany

export const deleteMany = createAsyncThunk(
  "post/deleteMany",
  (data, thunkAPI) => handleAsyncThunk(PostService.deleteMany, [data], thunkAPI)
);

// getAll

export const getAll = createAsyncThunk("post/getAll", (_, thunkAPI) =>
  handleAsyncThunk(PostService.getAll, [null], thunkAPI)
);

// getPostById

export const getPostById = createAsyncThunk(
  "post/getPostById",
  (id, thunkAPI) => handleAsyncThunk(PostService.getPostById, [id], thunkAPI)
);

// getPostBySlug

export const getPostBySlug = createAsyncThunk(
  "post/getPostBySlug",
  (slug, thunkAPI) =>
    handleAsyncThunk(PostService.getPostBySlug, [slug], thunkAPI)
);

export const resetState = createAsyncThunk(
  "state/resetState",
  async (payload, thunkAPI) => {
    return payload;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    post: {},
    status: "idle",
    error: null,
    updateStatus: "idle",
    deleteStatus: "idle",
    getAllStatus: "idle",
    getBySlugStatus: "idle",
    getByIdStatus: "idle",
    deleteManyStatus: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "success";
        state.me = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.updateStatus = "success";
        state.post = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.deleteStatus = "success";
      })
      .addCase(deletePost.rejected, (state) => {
        state.deleteStatus = "failed";
      })
      .addCase(deleteMany.pending, (state) => {
        state.deleteManyStatus = "loading";
      })
      .addCase(deleteMany.fulfilled, (state) => {
        state.deleteManyStatus = "success";
      })
      .addCase(deleteMany.rejected, (state) => {
        state.deleteManyStatus = "failed";
      })
      .addCase(getAll.pending, (state) => {
        state.getAllStatus = "loading";
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.getAllStatus = "success";
        state.posts = action.payload;
      })
      .addCase(getAll.rejected, (state) => {
        state.getAllStatus = "failed";
      })
      .addCase(getPostById.pending, (state) => {
        state.getByIdStatus = "loading";
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.getByIdStatus = "success";
        state.post = action.payload;
      })
      .addCase(getPostById.rejected, (state) => {
        state.getByIdStatus = "failed";
      })
      .addCase(getPostBySlug.pending, (state) => {
        state.getBySlugStatus = "loading";
      })
      .addCase(getPostBySlug.fulfilled, (state, action) => {
        state.getBySlugStatus = "success";
        state.post = action.payload;
      })
      .addCase(getPostBySlug.rejected, (state) => {
        state.getBySlugStatus = "failed";
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

export const { resetPost } = postSlice.actions;
export default postSlice.reducer;
