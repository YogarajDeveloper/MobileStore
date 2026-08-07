import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {

    const auth = sessionStorage.getItem("auth");    
    const token = JSON.parse(auth).token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      // JWT expired or invalid
      sessionStorage.removeItem("auth");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);