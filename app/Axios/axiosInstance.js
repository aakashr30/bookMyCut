import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
// Create an Axios instance
const Axios = axios.create({
  baseURL: "https://bookmycuts.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Modify the interceptor to accept token as a parameter
Axios.interceptors.request.use(
  (config) => {
    const {token:userToken} = useContext(AuthContext);
    // Get the token from a parameter or external function
    const token = userToken; // You'll need to implement this function
    
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("Final Request Headers:", config.headers);
    } else {
      console.warn("No Token Found - Authorization header won't be sent!");
    }
    
    return config;
  },
  (error) => {
    console.error("Axios Interceptor Error:", error);
    return Promise.reject(error);
  }
);

export default Axios;