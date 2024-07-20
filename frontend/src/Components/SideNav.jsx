import React from "react";
import { NavLink } from "react-router-dom";
export default function SideNav() {
  return (
    <div className="w-[20%]  h-full p-4 flex flex-col gap-12">
      <div>
        Sort By :
        <select className="bg-slate-200">
          <option value="">Popular</option>
          <option value="">New</option>
        </select>
      </div>
      <div>
        <NavLink className={"block"}>New Collection</NavLink>
        <NavLink className={"block p-2"}>All Products</NavLink>
        <NavLink className={"block"}>DisCount Products</NavLink>
      </div>
      <div>
        <p>filter by</p>
        <NavLink className={"block py-2"}>Availablity</NavLink>
        <NavLink className={"block"}>DisCount </NavLink>
      </div>
    </div>
  );
}
