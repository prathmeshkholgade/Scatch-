import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addProduct } from "../app/features/products/productSlice";
import { NavLink, useNavigate } from "react-router-dom";

export default function Create() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const formdata = new FormData();
      formdata.append("name", data.name);
      formdata.append("price", data.price);
      formdata.append("disCount", data.disCount);
      formdata.append("bgColor", data.bgColor);
      formdata.append("panelColor", data.panelColor);
      formdata.append("textColor", data.textColor);
      formdata.append("picture", data.picture[0]);
      const res = await dispatch(addProduct(formdata)).unwrap();
      console.log(res);
      navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full  h-[90%] flex">
      <div className="w-[20%]  h-full p-6">
        <NavLink to={"/products"} className={"block"}>
          All Product
        </NavLink>
        <NavLink className={"block"}>Create New Product</NavLink>
      </div>
      <div className=" w-full p-[5%]">
        <h2 className="mb-2">Create New Product</h2>
        <h3 className="mb-2">Product Details</h3>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <p className="mb-2">Product Image</p>
          <input
            type="file"
            {...register("picture", {
              required: {
                value: true,
                message: "Please choice this filed",
              },
            })}
          />
          <div className="mt-2 flex gap-4">
            <input
              type="text"
              className="w-1/3 py-2 pl-2 bg-slate-200 rounded-lg"
              placeholder="Product Name"
              {...register("name", {
                required: {
                  value: true,
                  message: "please enter title",
                },
              })}
            />
            <input
              type="text"
              className="w-1/3 py-2 pl-2 bg-slate-200 rounded-lg"
              placeholder="Product price"
              {...register("price", {
                required: {
                  value: true,
                  message: "please enter price",
                },
              })}
            />
          </div>
          <div className="mt-2">
            <input
              type="text"
              className="w-1/3 py-2 pl-2 bg-slate-200 rounded-lg"
              placeholder="Discount price"
              {...register("disCount", {
                required: {
                  value: true,
                  message: "please enter discount price ",
                },
              })}
            />
          </div>
          <h2 className="mt-2">Panel Details</h2>
          <div className="mt-2 flex gap-4 ">
            <input
              type="text"
              className="w-1/3 py-2 pl-2 bg-slate-200 rounded-lg"
              placeholder="bgColor"
              {...register("bgColor", {
                required: {
                  value: true,
                  message: "please enter discount price ",
                },
              })}
            />
            <input
              type="text"
              className="w-1/3 py-2 pl-2 bg-slate-200 rounded-lg"
              placeholder="Panel Color"
              {...register("panelColor", {
                required: {
                  value: true,
                  message: "please enter discount price ",
                },
              })}
            />
          </div>
          <div className="mt-2">
            <input
              type="text"
              className="w-1/3 py-2 pl-2 bg-slate-200 rounded-lg"
              placeholder="text Color"
              {...register("textColor", {
                required: {
                  value: true,
                  message: "please enter discount price ",
                },
              })}
            />
          </div>
          <button
            className="py-2 px-4 bg-blue-400 rounded-lg mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
