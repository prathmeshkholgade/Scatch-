import { configureStore } from "@reduxjs/toolkit";
import userReducers from "../features/user/userSlice";
import productReducers from "../features/products/productSlice";
import cartReducers from "../features/products/cartSlice";
export const store = configureStore({
  reducer: {
    user: userReducers,
    product: productReducers,
    cart: cartReducers,
  },
});
