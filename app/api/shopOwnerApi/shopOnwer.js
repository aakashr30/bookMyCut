// import axios from "axios";
// import Toast from "react-native-toast-message";
// import { AsyncStorage } from "react-native"; // Make sure to import AsyncStorage
// import { jwtDecode } from "jwt-decode";
// import Axios from "../Axios/axiosInstance";

// export const fetchViewAllShop = async () => {
//   try {
//     const response = await axios.get(
//       "https://bookmycuts.onrender.com/api/shop/ViewAllShop"
//     );

//     if (response.status === 200) {
//       return response.data;
//     } else {
//       Toast.show({
//         type: "error",
//         text1: "Error Fetching Shops",
//         text2: "Unexpected response from server",
//       });
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching shops:", error);
//     Toast.show({
//       type: "error",
//       text1: "Error Fetching Shops",
//       text2: "Something went wrong",
//     });
//     return null;
//   }
// };
// const handleSubmit = async () => {
//   const requestData = { shop, barbers, services, timings };
//   const token = userToken; // Assuming userToken is already available

//   try {
//     if (!token) {
//       Alert.alert("Error", "Authentication token is missing.");
//       return;
//     }

//     const response = await fetchAddShop(requestData, token);

//     if (response.success) {
//       Alert.alert("Success", "Shop registered successfully!");

//       // Reset Form
//       setShop({ name: "", address: "" });
//       setBarbers([{ name: "", city: "" }]);
//       setServices([{ service: "", price: "" }]);
//       setTimings([""]);
//     } else {
//       Alert.alert("Error", response.message || "Failed to register shop.");
//     }
//   } catch (error) {
//     Alert.alert("Error", "Something went wrong. Please try again.");
//   }
// };

// // Update fetchAddShop to include the token in the request headers:
// export const fetchAddShop = async (requestData, token) => {
//   try {
//     const response = await axios.post(
//       "https://bookmycuts.onrender.com/api/shop/addShop",
//       requestData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error in fetchAddShop:", error?.response?.data || error);
//     return {
//       success: false,
//       message:
//         error?.response?.data?.message ||
//         "Something went wrong while registering the shop.",
//     };
//   }
// };

// export const fetchaddServices = async (service, token) => {
//   try {
//     if (!token) {
//       throw new Error("Token is missing.");
//     }
//     const response = await axios.post(
//       "https://bookmycuts.onrender.com/api/shop/addService",
//       service,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error in fetchAddBarbers:", error?.response?.data || error);
//     return {
//       success: false,
//       message:
//         error?.response?.data?.message ||
//         "Something went wrong while adding a barber.",
//     };
//   }
// };

// export const fetchMyShop = async (id, token) => {
//   try {
//     console.log(id, token, "---------");
//     const response = await axios.post(
//       "https://bookmycuts.onrender.com/api/shop/viewSigleShop",
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

// export const fetchViewAllBarbers = async () => {
//   try {
//     const response = await axios.get(
//       "https://bookmycuts.onrender.com/api/shop/viewAllBarbers"
//     );
//     return response.data;
//   } catch (error) {
//     Toast.show({
//       type: "error",
//       type1: "Error fetch getAShop",
//       text2: "something went wrong",
//     });
//   }
// };
// export const fetchViewAllServices = async () => {
//   try {
//     const response = await axios.get(
//       "https://bookmycuts.onrender.com/api/shop/viewAllServices"
//     );
//     return response.data;
//   } catch (error) {
//     Toast.show({
//       type: "error",
//       type1: "Error fetch getAservice",
//       text2: "something went wrong",
//     });
//   }
// };

// export const shopOwnerRegister = async (data) => {
//   try {
//     console.log(data, "data register");
//     const response = await fetch(
//       "https://bookmycuts.onrender.com/api/auth/shop/register",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     );
//     if (response) {
//       console.log(response, "Responce");
//     }

//     if (!response.ok) {
//       const errorMessage = await response.text();
//       throw new Error(`Failed to register: ${errorMessage}`);
//     }

//     const result = await response.json(); // Get API response

//     // Show success message if registration is successful
//     Toast.show({
//       type: "success",
//       text1: "Success",
//       text2: "Registration successful",
//     });

//     return result;
//   } catch (error) {
//     console.log(error);
//     showMessage({
//       message: "Error!",
//       description: "Something went wrong.",
//       type: "danger", // Correct type instead of "error"
//     });
//   }
// };

// export const shopOwnerLogin = async (data) => {
//   try {
//     console.log(data);
//     const response = await fetch(
//       "https://bookmycuts.onrender.com/api/auth/shop/login",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     );
//     console.log(response, "login response");
//     if (!response.ok) {
//       const errorMessage = await response.text();
//       throw new Error(`Failed to Login: ${errorMessage}`);
//     }

//     const result = await response.json(); // Get API response

//     if (result.success) {
//       // Show success message if login is successful
//       showMessage({
//         message: "Success!",
//         description: "Login successful.",
//         type: "success",
//       });

//       // Store token and userData in AsyncStorage
//       await AsyncStorage.setItem("authToken", result.result.token);
//       await AsyncStorage.setItem(
//         "userData",
//         JSON.stringify(result.result.userData)
//       );

//       return {
//         token: result.result.token,
//         userData: result.result.userData,
//         success: result.success,
//       };
//     } else {
//       throw new Error(result.message || "Login failed");
//     }
//   } catch (error) {
//     Toast.show({
//       type: "error",
//       text1: "Error",
//       text2: error.message || "Something went wrong",
//     });
//     return null; // Return null in case of failure
//   }
// };
// export const fetchAddBarbers = async (newBarber, token) => {
//   try {
//     if (!token) {
//       throw new Error("Token is missing.");
//     }
//     const response = await axios.post(
//       "https://bookmycuts.onrender.com/api/shop/addBarber",
//       newBarber,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return response.data;
//   } catch (error) {
//     console.error("Error in fetchAddBarbers:", error?.response?.data || error);
//     return {
//       success: false,
//       message:
//         error?.response?.data?.message ||
//         "Something went wrong while adding a barber.",
//     };
//   }
// };

// export const fetchViewSingleShopBarber = async (userToken) => {
//   try {
//     if (!userToken) throw new Error("User token is missing.");

//     const decoded = jwtDecode(userToken);
//     const shopId = decoded?.id;

//     if (!shopId) throw new Error("Shop ID is missing.");
//     console.log(shopId, "shop id");
//     const response = await axios.get(
//       `https://bookmycuts.onrender.com/api/shop/viewMyBarbers/${shopId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log(response,"---respose barber");

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching barbers:", error?.response?.data || error);
//     return {
//       success: false,
//       message:
//         error?.response?.data?.message ||
//         "Something went wrong while fetching barbers.",
//     };
//   }
// };
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
import Axios from "../../Axios/axiosInstance"; // Import the Axios instance
import Toast from 'react-native-toast-message';

// Fetch all shops
export const fetchViewAllShop = async () => {
  try {
    const response = await Axios.get('/shop/ViewAllShop');
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
export const fetchAddShop = async (requestData) => {
  try {
    const response = await Axios.post('/shop/addShop', requestData);
    return response.data;
  } catch (error) {
    console.error("Error in fetchAddShop:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to register shop.",
    };
  }
};

// Add services to a shop
export const fetchAddServices = async (service) => {
  try {
    const response = await Axios.post('/shop/addService', service);
    return response.data;
  } catch (error) {
    console.error("Error in fetchAddServices:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong while adding a service.",
    };
  }
};

// Fetch single shop details
export const fetchMyShop = async (id) => {
  try {
    const response = await Axios.post('/shop/viewSigleShop', { id });
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
    const response = await Axios.get('/shop/viewAllBarbers');
    return response.data;
  } catch (error) {
    console.error("Error fetching barbers:", error);
    return null;
  }
};

// Fetch all services
export const fetchViewAllServices = async () => {
  try {
    const response = await Axios.get('/shop/viewAllServices');
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return null;
  }
};

// Fetch shop's barbers based on shop ID from JWT token
export const fetchViewSingleShopBarber = async (userToken) => {
  try {
    const shopId = jwtDecode(userToken)?.id;
    if (!shopId) throw new Error("Shop ID is missing.");
    const response = await Axios.get(`/shop/viewMyBarbers/${shopId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching barbers for shop:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch barbers.",
    };
  }
};

// Fetch shop's services based on shop ID from JWT token
export const fetchViewSingleService = async (userToken) => {
  try {
    const shopId = jwtDecode(userToken)?.id;
    if (!shopId) throw new Error("Shop ID is missing.");
    const response = await Axios.get(`/shop/viewMyService/${shopId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching services for shop:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch services.",
    };
  }
};

// Register shop owner
export const shopOwnerRegister = async (data) => {
  try {
    const response = await Axios.post('/auth/shop/register', data);
    return response.data;
  } catch (error) {
    console.error("Error registering shop owner:", error);
    Toast.show({
      type: 'error',
      text1: 'Registration Error',
      text2: error.message || 'Failed to register shop owner.',
    });
    return null;
  }
};

// Shop owner login
export const shopOwnerLogin = async (data) => {
  try {
    const response = await Axios.post('/auth/shop/login', data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    Toast.show({
      type: 'error',
      text1: 'Login Error',
      text2: error.message || 'Failed to login.',
    });
    return null;
  }
};
