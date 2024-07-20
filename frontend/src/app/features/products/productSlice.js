import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const createProductUrl = import.meta.env.VITE_CREATE_URL;
const productsUrl = import.meta.env.VITE_INDEX_URL;

export const addProduct = createAsyncThunk(
  "product/create",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(createProductUrl, data, {
        withCredentials: true,
      });
      console.log(res);
      return res.data.product;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);
export const loadProducts = createAsyncThunk(
  "product/addProducts",
  async (data, thunkAPI) => {
    try {
      const res = await axios.get(productsUrl, {
        withCredentials: true,
      });
      console.log(res);
      return res.data.products;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    Products: [],
    Product: null,
    error: null,
    status: null,
  },
  reducers: {
    clearProducts: (state, action) => {
      state.Products = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProduct.fulfilled, (state, action) => {
      console.log(action.payload);
      return action.payload;
    });
    builder.addCase(loadProducts.fulfilled, (state, action) => {
      state.Products = action.payload;
      state.status = "success";
    });
    builder.addCase(loadProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(loadProducts.pending, (state, action) => {
      state.status = "loading";
    });
  },
});
export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
