import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../Pages/Login/Register";
import LoginLayout from "../Pages/Login/LoginLayout";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import { Layout } from "../Pages/Layouts/Layout";
import Products from "../Pages/Products/Products";
import Customers from "../Pages/Customers/Customers";
import Settings from "../Pages/Settings/Settings";
import StockIn from "../Pages/Stockin/StockIn";
import StockOut from "../Pages/StockOut/StockOut";
import LoginOptions from "../Pages/Login/LoginOptions";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginLayout />} >
        <Route index element={<LoginOptions />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={< Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/stock-in" element={<StockIn />} />
        <Route path="/stock-out" element={<StockOut />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default RouterConfig;
