import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signupUser } from "../app/features/user/userSlice";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [showPassword, setshowPassword] = useState(false);
  const passwordFiled = watch("password");

  const navigate = useNavigate();
  const togglePassword = () => {
    setshowPassword((prevPassword) => !prevPassword);
  };
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const res = await dispatch(signupUser(data)).unwrap();
      console.log(res);
      navigate("/products");
    } catch (err) {
      console.log(err);
      const errorMessage = err || "An unexpected error occurred";
      setError("root", {
        type: "manual",
        message: errorMessage,
      });
      setTimeout(() => {
        clearErrors("root");
      }, 5000);
    }
  };
  return (
    <div className="w-[40%] p-8 h-[70%] flex flex-col justify-center">
      <h1 className="text-2xl">
        Welcome to <span className="text-[#6556CD] font-semibold">Scatch</span>{" "}
      </h1>
      <p className="text-lg">create your account</p>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <input
            type="text"
            {...register("fullName", {
              required: {
                value: true,
                message: "fullname is required",
              },
            })}
            className="p-2  w-full rounded-lg bg-slate-200"
            placeholder="FullName"
          />
          {errors.fullName && (
            <p className="text-red-500">{errors.fullName.message}</p>
          )}
        </div>
        <div className="mb-2">
          <input
            type="text"
            {...register("email", {
              required: {
                value: true,
                message: "email is required",
              },
            })}
            className="p-2 w-full rounded-lg bg-slate-200"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}d</p>
          )}
        </div>
        <div className="mb-2 relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: {
                value: true,
                message: "password is required",
              },
              minLength: {
                value: 8,
                message: "minman length should be 8",
              },
            })}
            className=" w-full rounded-lg bg-slate-200 p-2"
            placeholder="password"
          />
          {passwordFiled?.length > 0 && (
            <div
              className=" text-sm absolute right-0 top-0 p-2"
              onClick={togglePassword}
            >
              {showPassword ? "Hide" : "Show"}
            </div>
          )}
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        {errors.root && <p className="text-red-500">{errors.root.message}</p>}
        <button className="w-[30%] rounded-full p-2 bg-blue-400 text-white">
          Create
        </button>
      </form>
    </div>
  );
}
