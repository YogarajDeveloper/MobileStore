import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const response = await axios.post(
        "http://localhost:8080/api/users/store",
        formdata,
      );
      navigate("/login")

    } catch (error) {
      alert(error);
    }
  };

  const handleOnchange=(data)=>{
    setFormdata((prev)=>({
      ...prev,
      [data.target.name ]:data?.target?.value  
    }))
  }

  return (
    <form onSubmit={handleSubmit}><br />
      <label htmlFor="name">Username:</label>
      <input name="name" value={formdata?.name}  onChange={(e)=>handleOnchange(e)} type="text"  /> <br /><br />

      <label htmlFor="email">Email:</label>
      <input name="email" value={formdata?.email} onChange={(e)=>handleOnchange(e)} type="email" id="email" /> <br /><br />

      <label htmlFor="password">Password:</label>
      <input name="password" value={formdata?.password} onChange={(e)=>handleOnchange(e)} type="password" id="password" /> <br /><br />

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input name="confirmPassword" value={formdata?.confirmPassword} onChange={(e)=>handleOnchange(e)} type="password" id="confirmPassword" /><br /><br />

      <label htmlFor="phone">Phone:</label>
      <input name="phone" value={formdata?.phone} onChange={(e)=>handleOnchange(e)} type="tel" id="phone" /><br /><br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Register;
