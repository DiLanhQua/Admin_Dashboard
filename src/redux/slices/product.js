/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import ProductService from "../../services/product.service";

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

// get product

export const getProduct = createAsyncThunk(
  "product/getProduct",
  (_, thunkAPI) => handleAsyncThunk(ProductService.getAll, [null], thunkAPI)
);

export const getProducts = createAsyncThunk(
  "product/getProducts",
  ([page, limit], thunkAPI) =>
    handleAsyncThunk(ProductService.getAll, [page, limit], thunkAPI)
);

// delete product

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  (id, thunkAPI) => handleAsyncThunk(ProductService.delete, [id], thunkAPI)
);

// create product

export const createProduct = createAsyncThunk(
  "product/createProduct",
  (data, thunkAPI) => handleAsyncThunk(ProductService.create, [data], thunkAPI)
);

// get product by id

export const getProductById = createAsyncThunk(
  "product/getProductById",
  (id, thunkAPI) => handleAsyncThunk(ProductService.getById, [id], thunkAPI)
);

// update product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  ({ productId, data }, thunkAPI) =>
    handleAsyncThunk(ProductService.update, [productId, data], thunkAPI)
);
const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    statusDelete: "idle",
    statusCreate: "idle",
    statusGet: "idle",
    statusGetById: "idle",
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
      .addCase(getProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.statusDelete = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.statusDelete = "success";
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.statusDelete = "failed";
      })
      .addCase(createProduct.pending, (state) => {
        state.statusCreate = "loading";
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.statusCreate = "success";
      })
      .addCase(createProduct.rejected, (state) => {
        state.statusCreate = "failed";
      })
      .addCase(getProducts.pending, (state) => {
        state.statusGet = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.statusGet = "success";
        state.data = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.statusGet = "failed";
      })
      .addCase(getProductById.pending, (state) => {
        state.statusGetById = "loading";
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.statusGetById = "success";
        state.data = action.payload;
      })
      .addCase(getProductById.rejected, (state) => {
        state.statusGetById = "failed";
      })
      .addCase(updateProduct.pending, (state) => {
        state.statusUpdate = "loading";
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.statusUpdate = "success";
      })
      .addCase(updateProduct.rejected, (state) => {
        state.statusUpdate = "failed";
      });
  },
});

export default productSlice.reducer;
export const { resetProduct } = productSlice.actions;
