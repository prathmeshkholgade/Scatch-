import React from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function Authenticate() {
  return (
    // <div className="w-full h-[90%]">
      <div className="w-full h-[90%] flex p-[5%] items-center justify-evenly my-auto">
        <Signup />
        <Login />
      </div>
    // </div>
  );
}
