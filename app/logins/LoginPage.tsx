// import { router } from "expo-router";
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import { shopOwnerLogin } from "../api/shopOwnerApi/shopOnwer";
// import Toast from "react-native-toast-message";

// export default function ShopLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert("Error", "Please fill in all fields!");
//       return;
//     }

//     try {
//       const response = await shopOwnerLogin({ email, password });
//       console.log("API Response:", response);

//       if (response.success) {
//         Toast.show({
//           type: "success",
//           text1: "Success",
//           text2: "Login successful",
//         });

//         // Delay navigation slightly to allow Toast to show
//         setTimeout(() => {
//           router.push("/shopOwners/shopOwnerHome");
//         }, 1000); // 1-second delay
//       } else {
//         Alert.alert("Error", response.message || "Invalid Email or Password!");
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       Alert.alert("Error", "Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Shop Login</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         keyboardType="email-address"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.link}
//         onPress={() => router.push("/shopOwners/shopOwnerHome")}
//       >
//         <Text style={styles.linkText}>Don't have an account? Register</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//     backgroundColor: "#f5f5f5",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   input: {
//     height: 50,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     marginBottom: 15,
//     borderRadius: 5,
//     paddingLeft: 10,
//   },
//   button: {
//     backgroundColor: "#FFD700", // Golden color
//     paddingVertical: 15,
//     borderRadius: 25,
//     alignItems: "center",
//   },
//   buttonText: {
//     fontSize: 18,
//     color: "#000",
//     fontWeight: "bold",
//   },
//   link: {
//     marginTop: 20,
//     alignItems: "center",
//   },
//   linkText: {
//     color: "#1e90ff", // Blue color for the link
//     fontSize: 16,
//   },
// });
import { router } from "expo-router";
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext"; // Ensure this path is correct

export default function ShopLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext); // Use login from AuthContext

  // Load stored credentials
  useEffect(() => {
    const loadStoredCredentials = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("shop_email");
        const storedPassword = await AsyncStorage.getItem("shop_password");

        if (storedEmail && storedPassword) {
          setEmail(storedEmail);
          setPassword(storedPassword);
        }
      } catch (error) {
        console.error("Failed to load stored credentials:", error);
      }
    };

    loadStoredCredentials();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    try {
      // Save credentials in AsyncStorage
      await AsyncStorage.setItem("shop_email", email);
      await AsyncStorage.setItem("shop_password", password);

      // Call login from AuthContext with "shopowner" as user type
      await login(email, password, "shopowner");

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Login successful",
      });

      // Delay navigation slightly to allow Toast to display
      setTimeout(() => {
        router.push("/shopOwners/shopOwnerHome");
      }, 1000); // 1-second delay
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shop Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => router.push("/shopOwners/shopOwnerHome")}
      >
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#1e90ff",
    fontSize: 16,
  },
});
