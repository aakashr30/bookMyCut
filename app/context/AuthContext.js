import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useNavigation } from "@react-navigation/native"; // Import hook here

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userType, setUserType] = useState(null); // Distinguish between 'user' and 'shopowner'
  const navigation = useNavigation(); // Initialize here, within the component

  // User or Shop Owner Login
  const login = async (email, password, type = "user") => {
    const endpoint =
      type === "shopowner"
        ? "https://bookmycuts.onrender.com/api/auth/shop/login"
        : "https://bookmycuts.onrender.com/api/auth/user/login";

    setIsLoading(true);
    try {
      const response = await axios.post(endpoint, { email, password });

      const token = response?.data.result.token;
      if (token) {
        setUserToken(token);
        setUserType(type); // Now `type` exists!

        await AsyncStorage.setItem("userToken", token);
        await AsyncStorage.setItem("userType", type);
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
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userType");

      setUserToken(null);
      setUserType(null);

      // Navigate to UserSelection screen
      navigation.navigate("UserSelection");
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
      const type = await AsyncStorage.getItem("userType");

      if (token && type) {
        setUserToken(token);
        setUserType(type);
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
        logout,
        isLoading,
        userToken,
        userType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
