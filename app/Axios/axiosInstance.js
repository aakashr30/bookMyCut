import axios from "axios";

// Create an Axios instance
const Axios = axios.create({
  // http://localhost:3002
  // baseURL: "https://bookmycuts.onrender.com/api",
  baseURL: "http://localhost:3002/api",
  headers: {
    "Content-Type": "application/json",
  },
});
// Interceptor to add token (optional if passed directly)
Axios.interceptors.request.use(
  (config) => {
    console.log("Request Config:", config);
    return config;
  },
  (error) => {
    console.error("Axios Interceptor Error:", error);
    return Promise.reject(error);
  }
);

export default Axios;
