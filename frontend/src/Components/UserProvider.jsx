import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../app/features/user/userSlice";

export default function UserProvider({ children }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return <div>{children}</div>;
}
