import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logOut } from "../app/features/user/userSlice";
import { clearProducts } from "../app/features/products/productSlice";
import { clearCart } from "../app/features/products/cartSlice";
export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(clearProducts());
    dispatch(clearCart());
    navigate("/");
  };
  return (
    <>
      {user && (
        <div className="h-[5%] flex justify-between items-center">
          <h1 className="text-2xl ">Scatch</h1>
          <div className="mr-12 flex gap-8">
            <NavLink to={"/products"}>Shop</NavLink>
            <NavLink to={"/cart"}>Cart</NavLink>
            <NavLink>My Account</NavLink>
            <p onClick={handleLogOut}>LogOut</p>
          </div>
        </div>
      )}
    </>
  );
}
