import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useNavigation } from "@react-navigation/native"; // Import hook here

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const navigation = useNavigation(); // Initialize here, within the component

  // User or Shop Owner Login
  const login = async (email, password) => {
    const endpoint = "https://bookmycuts.onrender.com/api/auth/shop/login";
    setIsLoading(true);
    try {
      const response = await axios.post(endpoint, { email, password });
      const token = response?.data.result.token;
      console.log(token, "tokn after logiin");
      if (token) {
        setUserToken(token);
        await AsyncStorage.setItem("userToken", token);
      } else {
        alert("Invalid response from server. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error?.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };
  const userlogin = async (email, password) => {
    const endpoint = "https://bookmycuts.onrender.com/api/auth/user/login";
    setIsLoading(true);
    try {
      const response = await axios.post(endpoint, { email, password });
      const token = response?.data.result.token;
      console.log(token, "tokn after logiin");
      if (token) {
        setUserToken(token);
        await AsyncStorage.setItem("userToken", token);
      } else {
        alert("Invalid response from server. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error?.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // Logout for both user and shopowner
  const logout = async () => {
    setIsLoading(true);
    try {
      console.log("Logging out...");

      // Clear everything from AsyncStorage
      await AsyncStorage.clear();

      // Reset state values
      setUserToken(null);
      setUser(null);

      // Ensure state updates before navigating
      setTimeout(() => {
        console.log("Logout successful. Token cleared.");

        // Reset navigation stack to prevent going back
        navigation.reset({
          index: 0,
          routes: [{ name: "UserSelection" }],
        });
      }, 500);
    } catch (error) {
      console.error("Logout Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is already logged in on app launch
  const isLoggedIn = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (token) {
        setUserToken(token);
      }
    } catch (error) {
      console.error("isLoggedIn Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        userlogin,
        logout,
        isLoading,
        token: userToken, // Change this line to expose userToken as token
        user, // Make sure user is exposed
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
