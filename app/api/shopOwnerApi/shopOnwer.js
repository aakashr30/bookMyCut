import axios from "axios";
import Toast from "react-native-toast-message";
import { AsyncStorage } from "react-native"; // Make sure to import AsyncStorage

export const fetchViewAllShop = async () => {
  try {
    const response = await axios.get(
      "https://bookmycuts.onrender.com/api/shop/ViewAllShop"
    );

    if (response.status === 200) {
      return response.data;
    } else {
      Toast.show({
        type: "error",
        text1: "Error Fetching Shops",
        text2: "Unexpected response from server",
      });
      return null;
    }
  } catch (error) {
    console.error("Error fetching shops:", error);
    Toast.show({
      type: "error",
      text1: "Error Fetching Shops",
      text2: "Something went wrong",
    });
    return null;
  }
};
const handleSubmit = async () => {
  const requestData = { shop, barbers, services, timings };
  const token = userToken; // Assuming userToken is already available

  try {
    if (!token) {
      Alert.alert("Error", "Authentication token is missing.");
      return;
    }

    const response = await fetchAddShop(requestData, token);

    if (response.success) {
      Alert.alert("Success", "Shop registered successfully!");

      // Reset Form
      setShop({ name: "", address: "" });
      setBarbers([{ name: "", city: "" }]);
      setServices([{ service: "", price: "" }]);
      setTimings([""]);
    } else {
      Alert.alert("Error", response.message || "Failed to register shop.");
    }
  } catch (error) {
    Alert.alert("Error", "Something went wrong. Please try again.");
  }
};

// Update fetchAddShop to include the token in the request headers:
export const fetchAddShop = async (requestData, token) => {
  try {
    const response = await axios.post(
      "https://bookmycuts.onrender.com/api/shop/addShop",
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in fetchAddShop:", error?.response?.data || error);
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong while registering the shop.",
    };
  }
};

export const fetchaddServices = async (service, token) => {
  try {
    if (!token) {
      throw new Error("Token is missing.");
    }
    const response = await axios.post(
      "https://bookmycuts.onrender.com/api/shop/addService",
      service,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in fetchAddBarbers:", error?.response?.data || error);
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong while adding a barber.",
    };
  }
};

export const fetchViewAllBarbers = async () => {
  try {
    const response = await axios.post(
      "https://bookmycuts.onrender.com/api/shop/viewAllBarbers"
    );
    return response.data;
  } catch (error) {
    Toast.show({
      type: "error",
      type1: "Error fetch getAShop",
      text2: "something went wrong",
    });
  }
};

export const shopOwnerRegister = async (data) => {
  try {
    const response = await fetch(
      "https://bookmycuts.onrender.com/api/auth/shop/register",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

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
    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message || "Something went wrong",
    });
  }
};

export const shopOwnerLogin = async (data) => {
  try {
    const response = await fetch(
      "https://bookmycuts.onrender.com/api/auth/shop/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to Login: ${errorMessage}`);
    }

    const result = await response.json(); // Get API response

    if (result.success) {
      // Show success message if login is successful
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Login successful",
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
      };
    } else {
      throw new Error(result.message || "Login failed");
    }
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message || "Something went wrong",
    });
    return null; // Return null in case of failure
  }
};
export const fetchAddBarbers = async (newBarber, token) => {
  try {
    if (!token) {
      throw new Error("Token is missing.");
    }
    const response = await axios.post(
      "https://bookmycuts.onrender.com/api/shop/addBarber",
      newBarber,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error in fetchAddBarbers:", error?.response?.data || error);
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong while adding a barber.",
    };
  }
};
