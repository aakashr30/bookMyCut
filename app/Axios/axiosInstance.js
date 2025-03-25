import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to retrieve token from AsyncStorage
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    console.log("Retrieved Token:", token); // Debugging log
    return token;
  } catch (error) {
    console.error("Failed to retrieve token:", error);
    return null;
  }
};

// Create an Axios instance
const Axios = axios.create({
  baseURL: "https://bookmycuts.onrender.com/api", // Your base API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Bearer token dynamically to request headers using an interceptor
Axios.interceptors.request.use(
  async (config) => {
    const token = await getToken(); // Retrieve token from AsyncStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token to Authorization header
    } else {
      console.warn("No Token Found - Authorization header won't be sent!");
    }

    console.log("Final Request Headers:", config.headers); // Debugging log
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
