import axios from "axios";
import Toast from "react-native-toast-message";
import { AsyncStorage } from "react-native"; // Make sure to import AsyncStorage
import { jwtDecode } from "jwt-decode";
import FlashMessage, { showMessage } from "react-native-flash-message";
export const fetchUserRegister = async (data) => {
  try {
    console.log(data, "data register");
    const response = await fetch(
      "https://bookmycuts.onrender.com/api/auth/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response) {
      console.log(response, "Responce");
    }

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to register: ${errorMessage}`);
    }

    const result = await response.json(); // Get API response

    // Show success message if registration is successful
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Registration successful",
    });

    return result;
  } catch (error) {
    console.log(error);
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Registration successful",
    });
  }
};
export const userLogin = async (data) => {
  try {
    console.log(data);
    const response = await fetch(
      "https://bookmycuts.onrender.com/api/auth/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    console.log(response, "login response");
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to Login: ${errorMessage}`);
    }

    const result = await response.json(); // Get API response

    if (result.success) {
      // Show success message if login is successful
      showMessage({
        message: "Success!",
        description: "Login successful.",
        type: "success",
      });

      // Store token and userData in AsyncStorage
      await AsyncStorage.setItem("authToken", result.result.token);
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify(result.result.userData)
      );

      return {
        token: result.result.token,
        userData: result.result.userData,
        success: result.success,
      };
    } else {
      throw new Error(result.message || "Login failed");
    }
  } catch (error) {
    showMessage({
      message: "Error!",
      description: "Something went wrong.",
      type: "danger", // Correct type instead of "error"
    });
    return null; // Return null in case of failure
  }
};
// export const fetchViewAllShop = async (id, token) => {
//   try {
//     console.log(id, token, "---------");
//     const response = await axios.get(
//       "https://bookmycuts.onrender.com/api/shop/ViewAllShop",
//       { id },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log(response, "fecth my shop");
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     console.error("Error in fetchAddShop:", error?.response?.data || error);
//     return {
//       success: false,
//       message:
//         error?.response?.data?.message ||
//         "Something went wrong while Geting the shop.",
//     };
//   }
// };
