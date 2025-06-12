import axios from "axios";
import Toast from "react-native-toast-message";
import { AsyncStorage } from "react-native";
import { jwtDecode } from "jwt-decode";
import FlashMessage, { showMessage } from "react-native-flash-message";
import Axios from "@/app/Axios/axiosInstance";
import { NotificationManager } from "@/app/Components/Notification/Notification";

export const fetchUserRegister = async (data) => {
  try {
    console.log(data, "data register");
    const response = await Axios.post("/auth/user/register", data);

    // Show success message if registration is successful
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Registration successful",
    });

    return response.data;
  } catch (error) {
    console.log(error);

    // Handle error response
    if (error.response) {
      showMessage({
        message: "Error!",
        description: error.response.data.message || "Registration failed",
        type: "danger",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong",
      });
    }

    throw error;
  }
};

export const userLogin = async (data) => {
  try {
    console.log(data);
    const response = await Axios.post("/auth/user/login", data);

    if (response.data.success) {
      // Show success message if login is successful
      NotificationManager.show({
        message: "Login successful",
        type: NotificationType.SUCCESS,
      });

      // Store token and userData in AsyncStorage
      await AsyncStorage.setItem("authToken", response.data.result.token);
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify(response.data.result.userData)
      );

      return {
        token: response.data.result.token,
        userData: response.data.result.userData,
        success: response.data.success,
      };
    } else {
      throw new Error(response.data.message || "Login failed");
    }
  } catch (error) {
    // Handle error response
    if (error.response) {
      showMessage({
        message: "Error!",
        description: error.response.data.message || "Something went wrong",
        type: "danger",
      });
    } else {
      showMessage({
        message: "Error!",
        description: "Network error or server unavailable",
        type: "danger",
      });
    }

    return null; // Return null in case of failure
  }
};

export const bookNowApi = async (
  barberId,
  startTime,
  endTime,
  duration,
  userToken
) => {
  try {
    const response = await Axios.post(
      "/booking/BookNow",
      {
        barberId,
        startTime,
        endTime,
        duration,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Booking failed", error?.response?.data || error.message);
    throw error;
  }
};
