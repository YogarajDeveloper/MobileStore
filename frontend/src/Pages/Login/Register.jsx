import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../customHooks/api";

const Register = () => {

  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await api.post(
        "/users/register",
        formdata,
      );
      navigate("/")

    } catch (error) {
      alert(error.response?.data?.message || error.message || error);
    }
  };

  const handleOnchange = (data) => {
    setFormdata((prev) => ({
      ...prev,
      [data.target.name]: data?.target?.value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="flex rounded-[30px] bg-white items-center justify-center p-8">

      <div className="w-[65%] flex flex-col gap-3">
        <div className="flex flex-col">
          <label htmlFor="name">Username</label>
          <input name="name" value={formdata?.name} onChange={(e) => handleOnchange(e)} type="text" className="border rounded-lg p-3 outline-none" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input name="email" value={formdata?.email} onChange={(e) => handleOnchange(e)} type="email" id="email" className="border rounded-lg p-3 outline-none" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input name="password" value={formdata?.password} onChange={(e) => handleOnchange(e)} type="password" id="password" className="border rounded-lg p-3 outline-none" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input name="confirmPassword" value={formdata?.confirmPassword} onChange={(e) => handleOnchange(e)} type="password" id="confirmPassword" className="border rounded-lg p-3 outline-none" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone">Phone</label>
          <input name="phone" value={formdata?.phone} onChange={(e) => handleOnchange(e)} type="tel" id="phone" className="border rounded-lg p-3 outline-none" />
        </div>
        <div>
          <button className=" w-[65%] rounded-xl py-3 text-white font-semibold hover:opacity-80 bg-blue-300 w-full" type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default Register;
