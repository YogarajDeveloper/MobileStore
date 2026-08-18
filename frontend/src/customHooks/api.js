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

    if (auth) {
      try {
        const { token } = JSON.parse(auth);

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Invalid auth data in sessionStorage");
        sessionStorage.removeItem("auth");
      }
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