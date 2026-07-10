import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../Pages/Login/Register";
import LoginLayout from "../Pages/Login/LoginLayout";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";

const RouterConfig = () => {
  return (
      <Routes>
      <Route path="/" element={<LoginLayout />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={< Dashboard/>} />

      </Routes>
  );
};

export default RouterConfig;
