<<<<<<< HEAD
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const handleOnchange = (data) => {
    setFormdata((prev) => ({
      ...prev,
      [data.target.name]: data?.target?.value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        formdata,
        navigate("/dashboard")
      );
    } catch (error) {
      alert(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <br />
      <label htmlFor="email">Email:</label>
      <input
        name="email"
        value={formdata?.email}
        onChange={(e) => handleOnchange(e)}
        type="email"
        id="email"
      />
      <br />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        name="password"
        value={formdata?.password}
        onChange={(e) => handleOnchange(e)}
        type="password"
        id="password"
      />
      <br />
      <br />
      <button type="submit">LOGIN</button>
    </form>
  );
};

export default Login;
=======
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const handleOnchange = (data) => {
    setFormdata((prev) => ({
      ...prev,
      [data.target.name]: data?.target?.value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        formdata,
        navigate("/dashboard")
      );
    } catch (error) {
      alert(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <br />
      <label htmlFor="email">Email:</label>
      <input
        name="email"
        value={formdata?.email}
        onChange={(e) => handleOnchange(e)}
        type="email"
        id="email"
      />
      <br />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        name="password"
        value={formdata?.password}
        onChange={(e) => handleOnchange(e)}
        type="password"
        id="password"
      />
      <br />
      <br />
      <button type="submit">LOGIN</button>
    </form>
  );
};

export default Login;
>>>>>>> 0874c1d (custom hooke and login flow added)
