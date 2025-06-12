import { jwtDecode } from "jwt-decode";
import Axios from "../../Axios/axiosInstance"; // Import the Axios instance
import Toast from "react-native-toast-message";

export const fetchViewSingleShopBarber = async (userToken) => {
  try {
    if (!userToken) throw new Error("User token is missing.");
    const decoded = jwtDecode(userToken);
    const shopId = decoded?.id;
    if (!shopId) throw new Error("Shop ID is missing.");
    const response = await Axios.get(`/shop/viewMyBarbers/${shopId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });
    if (response?.status === 200) {
      NotificationManager.show({
        message: "Registration successful",
        type: NotificationType.SUCCESS,
      });
    }
    console.log(response, "---respose barber");

    return response.data;
  } catch (error) {
    console.error("Error fetching barbers:", error?.response?.data || error);
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong while fetching barbers.",
    };
  }
};
// export const fetchViewSingleService = async (userToken) => {
//   try {
//     if (!userToken) throw new Error("User token is missing.");

//     const decoded = jwtDecode(userToken);
//     const shopId = decoded?.id;

//     if (!shopId) throw new Error("Shop ID is missing.");
//     console.log(shopId, "shopId");
//     const response = await axios.get(
//       `http://localhost:3002/api/shop/viewMyService/${shopId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log(response,"response service");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching services:", error?.response?.data || error);
//     return {
//       success: false,
//       message:
//         error?.response?.data?.message ||
//         "Something went wrong while fetching services.",
//     };
//   }
// };

// import Toast from "react-native-toast-message";

// Fetch all shops
export const fetchViewAllShop = async () => {
  try {
    const response = await Axios.get("/shop/ViewAllShop");
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

// Add a new shop
export const fetchAddShop = async (requestData, token) => {
  try {
    const response = await Axios.post("/shop/addShop", requestData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in fetchAddShop:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to register shop.",
    };
  }
};

// // Add services to a shop
// export const fetchAddServices = async (service, userToken) => {
//   try {
//     const response = await Axios.post("/shop/addService", service);
//     return response.data;
//   } catch (error) {
//     console.error("Error in fetchAddServices:", error);
//     return {
//       success: false,
//       message:
//         error.response?.data?.message ||
//         "Something went wrong while adding a service.",
//     };
//   }
// };

// Fetch single shop details
export const fetchMyShop = async (id) => {
  try {
    const response = await Axios.post("/shop/viewSigleShop", { id });
    return response.data;
  } catch (error) {
    console.error("Error fetching shop:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to get shop details.",
    };
  }
};

// Fetch all barbers
export const fetchViewAllBarbers = async () => {
  try {
    const response = await Axios.get("/shop/viewAllBarbers");
    return response.data;
  } catch (error) {
    console.error("Error fetching barbers:", error);
    return null;
  }
};

// Fetch all services
export const fetchViewAllServices = async () => {
  try {
    const response = await Axios.get("/shop/viewAllServices");
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return null;
  }
};

// Fetch shop's barbers based on shop ID from JWT token
// export const fetchViewSingleShopBarber = async (userToken) => {
//   try {
//     const shopId = jwtDecode(userToken)?.id;
//     if (!shopId) throw new Error("Shop ID is missing.");
//     const response = await Axios.get(`/shop/viewMyBarbers/${shopId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching barbers for shop:", error);
//     return {
//       success: false,
//       message: error.response?.data?.message || "Failed to fetch barbers.",
//     };
//   }
// };

// Fetch shop's services based on shop ID from JWT token
export const fetchViewSingleService = async (userToken) => {
  try {
    if (!userToken) throw new Error("User token is missing.");
    console.log(userToken, "user token");
    const decoded = jwtDecode(userToken);
    const shopId = decoded?.id;
    console.log(shopId, "shop id");
    if (!shopId) throw new Error("Shop ID is missing.");
    console.log(shopId, "shop id");
    const response = await Axios.get(`/shop/viewMyService/${shopId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });
    if (response?.success) {
      NotificationManager.show({
        message: "Registration successful",
        type: NotificationType.SUCCESS,
      });
    }
    console.log(response, "---respose barber");

    return response.data;
  } catch (error) {
    console.error("Error fetching barbers:", error?.response?.data || error);
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong while fetching barbers.",
    };
  }
};

// Register shop owner
export const shopOwnerRegister = async (data) => {
  try {
    const response = await Axios.post("/auth/shop/register", data);
    return response.data;
  } catch (error) {
    console.error("Error registering shop owner:", error);
    Toast.show({
      type: "error",
      text1: "Registration Error",
      text2: error.message || "Failed to register shop owner.",
    });
    return null;
  }
};

// Shop owner login
export const shopOwnerLogin = async (data) => {
  try {
    const response = await Axios.post("/auth/shop/login", data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    Toast.show({
      type: "error",
      text1: "Login Error",
      text2: error.message || "Failed to login.",
    });
    return null;
  }
};
export const fetchaddService = async (serviceData, token) => {
  try {
    const response = await Axios.post(
      "/shop/addService",
      { serviceDatas: serviceData[0] },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in fetchAddService:", error?.response?.data || error);
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Something went wrong while adding a service.",
    };
  }
};
// fetchAddBarbers function
export const fetchAddBarbers = async (newBarber, token) => {
  try {
    const response = await Axios.post(
      "/shop/addBarber",
      { newBarbers: newBarber[0] },
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
