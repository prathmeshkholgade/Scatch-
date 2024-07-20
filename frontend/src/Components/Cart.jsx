import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAddtocart } from "../app/features/products/cartSlice";
import Card from "./Card";

export default function Cart() {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.Cart);
  useEffect(() => {
    dispatch(loadAddtocart());
  }, [carts]);
  return (
    <div className="w-full flex gap-8 flex-wrap">
      {carts.map((item) => (
        <Card data={item} />
      ))}
    </div>
  );
}
