import React, { useEffect } from "react";
import SideNav from "../Components/SideNav";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../app/features/products/productSlice";
export default function Container() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.Products);
  const loadData = async () => {
    try {
      const products = await dispatch(loadProducts()).unwrap();
      console.log(products);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="flex">
      <SideNav />
      {products &&
      <div className="w-full flex gap-8 flex-wrap">
        {products.map((item) => (
          <Card data={item} key={item._id} />
        ))}
      </div>}
    </div>
  );
}
