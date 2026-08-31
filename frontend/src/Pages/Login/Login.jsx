import axios from "axios";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { api } from "../../customHooks/api";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { setUser } from "../../Redux/slice/userSlice";

import TextInput from "../../CommonComponents/TextInput";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState(true);
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    fullName: "",
    mobileNumber: "",
    confirmPassword: "",
  });

  const handleOnchange = (data) => {    
    setFormdata((prev) => ({
      ...prev,
      [data.target.name]: data?.target?.value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = authMode ? { email: formdata.email, password: formdata.password}  : formdata;
      const endpoint = authMode ? "/auth/login" : "/auth/register";
      
      const response = await api.post(endpoint, payload);
      
      if (response.data?.token) {
        sessionStorage.setItem( "auth",JSON.stringify({ token: response?.data?.token }));
        dispatch(setUser({ token: response.data.token }));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col w-full justify-between gap-6 p-6 rounded-xl">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          {authMode ? "Welcome back" : "Create an Account"}
        </h2>
        <p className="text-[15px] text-slate-400 mt-1 sm:w-[80%]">
          {authMode
            ? "Access exclusive smartphone discounts"
            : "Register today to unlock benefits"}
        </p>
      </div>

      <div className="grid grid-cols-2 p-1 bg-slate-800/80 rounded-xl border border-slate-700/60">
        <button
          type="button"
          onClick={() => setAuthMode(true)}
          className={`py-2 text-xs font-bold rounded-lg transition-all ${
            authMode
              ? "bg-blue-600 text-white shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setAuthMode(false)}
          className={`py-2 text-xs font-bold rounded-lg transition-all ${
            !authMode
              ? "bg-blue-600 text-white shadow-md"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Create Account
        </button>
      </div>

      <div className="flex justify-center items-center">
        {/* ✓ Replace old button with GoogleLogin component */}
        <GoogleLogin
          onSuccess={async (credentialResponse) => {

          
            try {
              const response = await api.post(
                "/auth/google-login",
                {
                  token: credentialResponse.credential
                }
              );

              if (response.data?.token) {
                sessionStorage.setItem("auth", JSON.stringify({ token: response.data.token }));
                dispatch(setUser({ token: response.data.token }));
                navigate("/dashboard");
              }
            } catch (error) {
              console.error(error);
              alert("Google login failed: " + (error.response?.data?.message || error.message));
            }
          }}
          onError={() => alert("Google login failed")}
          theme="light"
          size="large"
        />

  
      </div>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-700/80 w-full" />
        <span className="px-3 text-xs uppercase tracking-wider text-slate-400 font-semibold bg-slate-900/40 rounded-md backdrop-blur-sm">
          or
        </span>
        <div className="border-t border-slate-700/80 w-full" />
      </div>                    

      <div className="grid grid-col gap-3">
        {!authMode && (
          <div>
            <TextInput
              label="Full Name"
              name="fullName"
              placeholder="Enter Your Full Name"
            />
          </div>
        )}
        <div>
          <TextInput
            label="Email"
            name="email"
            value={formdata.email}
            onChange={handleOnchange}
            placeholder="Enter Your Email"
          />
        </div>
        <div>
          <TextInput
            isPassword={true}
            label="Password"
            name="password"
            value={formdata.password}
            onChange={handleOnchange}
            placeholder="Enter Your Password"
          />
        </div>
        {!authMode && (
          <div>
            <TextInput
              isPassword={true}
              label="Confirm Password"
              placeholder="Enter Your Confirm Password"
            />
          </div>
        )}
        {!authMode && (
          <div>
            <TextInput
              label="Mobile Number"
              placeholder="Enter Your Mobile Number"
            />
          </div>
        )}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-3 px-4 mt-3 text-sm font-semibold rounded-xl transition-all duration-200 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          {authMode ? "Sign In" : "Create Account"}
        </button>
      </div>
    </div>
  );
};

export default Login;