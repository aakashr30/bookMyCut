import axios from "axios";

// Create an Axios instance
const Axios = axios.create({
  baseURL: "https://bookmycuts.onrender.com/api",
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
