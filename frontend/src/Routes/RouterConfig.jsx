import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "../Pages/Login/Login";
import Layout from "../Pages/Layouts/Layout";
import StockIn from "../Pages/Stockin/StockIn";
import Register from "../Pages/Login/Register";
import Products from "../Pages/Products/Products";
import Settings from "../Pages/Settings/Settings";
import StockOut from "../Pages/StockOut/StockOut";
import LoginLayout from "../Pages/Login/LoginLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Customers from "../Pages/Customers/Customers";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginLayout />} >
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={< Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/users" element={<Customers />} />
        <Route path="/stock-in" element={<StockIn />} />
        <Route path="/stock-out" element={<StockOut />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default RouterConfig;
