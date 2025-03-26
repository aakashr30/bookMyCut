// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import { useContext } from 'react';
// // Create an Axios instance
// const Axios = axios.create({
//   baseURL: "https://bookmycuts.onrender.com/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Modify the interceptor to accept token as a parameter
// Axios.interceptors.request.use(
//   (config) => {
//     const {token:userToken} = useContext(AuthContext);
//     // Get the token from a parameter or external function
//     const token = userToken; // You'll need to implement this function
//     console.log(token,"uyasdajsgdfsdafsgd")
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//       console.log("Final Request Headers:", config.headers);
//     } else {
//       console.warn("No Token Found - Authorization header won't be sent!");
//     }
    
//     return config;
//   },
//   (error) => {
//     console.error("Axios Interceptor Error:", error);
//     return Promise.reject(error);
//   }
// );

// export default Axios;

import axios from 'axios';

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