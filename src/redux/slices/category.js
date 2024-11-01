/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import CategoryService from "../../services/category.service";
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

// get category
export const getCategory = createAsyncThunk(
  "category/getCategory",
  (_, thunkAPI) => handleAsyncThunk(CategoryService.getAll, [null], thunkAPI)
);
// delete category
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  (id, thunkAPI) => handleAsyncThunk(CategoryService.delete, [id], thunkAPI)
);
// create category

export const createCategory = createAsyncThunk(
  "category/createCategory",
  (data, thunkAPI) => handleAsyncThunk(CategoryService.create, [data], thunkAPI)
);

// GET BY ID
export const getCategoryById = createAsyncThunk(
  "category/getCategoryById",
  (id, thunkAPI) => handleAsyncThunk(CategoryService.getById, [id], thunkAPI)
);

// update category
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  ({ categoryId, data }, thunkAPI) =>
    handleAsyncThunk(CategoryService.update, [categoryId, data], thunkAPI) // Pass the correct function and args
);

export const updatePosition = createAsyncThunk(
  "category/updatePosition",
  (data, thunkAPI) =>
    handleAsyncThunk(CategoryService.updatePosition, [data], thunkAPI)
);

const category = createSlice({
  name: "category",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    mes: null,
    deleteCategoryStatus: "idle",
    createCategoryStatus: "idle",
    getcategoryStatus: "idle",
    updateCategoryStatus: "idle",
    updatePositionStatus: "idle",
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
      .addCase(getCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.deleteCategoryStatus = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.deleteCategoryStatus = "success";
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.deleteCategoryStatus = "failed";
      })
      .addCase(createCategory.pending, (state) => {
        state.createCategoryStatus = "loading";
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.createCategoryStatus = "success";
      })
      .addCase(createCategory.rejected, (state) => {
        state.createCategoryStatus = "failed";
      })
      .addCase(getCategoryById.pending, (state) => {
        state.getcategoryStatus = "loading";
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.getcategoryStatus = "success";
        state.category = action.payload;
      })
      .addCase(getCategoryById.rejected, (state) => {
        state.getcategoryStatus = "failed";
      })
      .addCase(updateCategory.pending, (state) => {
        state.updateCategoryStatus = "loading";
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.updateCategoryStatus = "success";
      })
      .addCase(updateCategory.rejected, (state) => {
        state.updateCategoryStatus = "failed";
      })
      .addCase(updatePosition.pending, (state) => {
        state.updatePositionStatus = "loading";
      })
      .addCase(updatePosition.fulfilled, (state) => {
        state.updatePositionStatus = "success";
      })
      .addCase(updatePosition.rejected, (state) => {
        state.updatePositionStatus = "failed";
      });
  },
});

export default category.reducer;
export const { resetCategory } = category.actions;
