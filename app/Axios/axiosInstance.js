
import axios from 'axios';
import { AsyncStorage } from 'react-native';

// Function to retrieve token from AsyncStorage
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error('Failed to retrieve token:', error);
    return null;
  }
};

// Create an Axios instance
const Axios = axios.create({
  baseURL: 'https://bookmycuts.onrender.com/api', // Your base API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add the Bearer token dynamically to request headers using an interceptor
Axios.interceptors.request.use(
  async (config) => {
    const token = await getToken(); // Retrieve token from AsyncStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios; // Export the Axios instance
