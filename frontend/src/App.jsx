import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout";
import Authenticate from "./Components/Authenticate";
import Container from "./Components/Container";
import Create from "./Components/Create";
import { useSelector } from "react-redux";
import Cart from "./Components/Cart";

function App() {
  // const user = useSelector((state)=>state)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Authenticate /> },
        { path: "/products", element: <Container /> },
        { path: "/create", element: <Create /> },
        { path: "/cart", element: <Cart /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
