import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/features/products/cartSlice";

export default function Card({ data }) {
  const dispatch = useDispatch();
  return (
    <div
      className={`w-[17%] h-[41vh] flex flex-col justify-between relative `}
      style={{ backgroundColor: data.bgColor }}
    >
      <div className="p-4">
        <img
          src={data?.picture?.url}
          alt=""
          className="h-[30vh] w-full object-cover hover:scale-105"
        />
      </div>
      <div
        className={`panel  p-2 `}
        style={{ backgroundColor: data.panelColor, color: data.textColor }}
      >
        <p>{data.name}</p>
        <p>{data.price}</p>
      </div>
      <div
        className="absolute right-5 bottom-1 bg-zinc-200 text-lg rounded-full text-center w-8 h-8"
        onClick={() => {
          dispatch(addToCart(data._id));
        }}
      >
        +
      </div>
    </div>
  );
}
