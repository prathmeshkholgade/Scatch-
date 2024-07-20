import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const addtocarturl = import.meta.env.VITE_ADDTOCART_URL;
const showDataUrl = import.meta.env.VITE_CARTDATA_URL;

export const addToCart = createAsyncThunk(
  "product/addtocart",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${addtocarturl}/${id}`, {
        withCredentials: true,
      });
      console.log(res);
      return res.data.product;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);
export const loadAddtocart = createAsyncThunk(
  "product/loadaddtocart",
  async (thunkAPI) => {
    try {
      const res = await axios.get(showDataUrl, {
        withCredentials: true,
      });
      console.log(res);
      return res.data.cart;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    Cart: [],
    error: "",
    status: "",
  },
  reducers: {
    clearCart: (state, action) => {
      state.Cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.Cart.push(action.payload);
    });
    builder.addCase(addToCart.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(loadAddtocart.fulfilled, (state, action) => {
      state.Cart = action.payload;
    });
  },
});
export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
