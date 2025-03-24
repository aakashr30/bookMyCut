// // import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import * as Google from "expo-auth-session/providers/google";
// import * as SecureStore from "expo-secure-store";
// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// const UserLogin: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [isUsingPhone, setIsUsingPhone] = useState(false);
//   const { login, logout } = useContext(AuthContext);

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     clientId:
//       Platform.OS === "ios"
//         ? "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com"
//         : "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
//   });

//   // Handle Email & Password Login
//   const handleLogin = () => {
//     login();
//     if (!email || !password) {
//       Alert.alert("Error", "Please fill in all fields.");
//       return;
//     }
//     router.push("/(tabs)/tabhome");
//   };

//   // Handle Sending OTP
//   // const handleSendOtp = async () => {
//   //   if (!phoneNumber) {
//   //     Alert.alert("Error", "Please enter a valid phone number.");
//   //     return;
//   //   }

//   //   try {
//   //     const response = await fetch("https://your-backend.com/send-otp", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ phoneNumber }),
//   //     });

//   //     const data = await response.json();

//   //     if (response.ok) {
//   //       setIsOtpSent(true);
//   //       Alert.alert("OTP Sent", `An OTP has been sent to ${phoneNumber}`);
//   //     } else {
//   //       Alert.alert("Error", data.message || "Failed to send OTP.");
//   //     }
//   //   } catch (error) {
//   //     Alert.alert("Error", "Something went wrong. Please try again.");
//   //   }
//   // };
//   const handleSendOtp = async () => {
//     if (!phoneNumber) {
//       Alert.alert("Error", "Please enter a valid phone number.");
//       return;
//     }

//     console.log("Sending OTP to:", phoneNumber); // Debugging log

//     try {
//       const response = await fetch("https://your-backend.com/send-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phoneNumber }),
//       });

//       const data = await response.json();
//       console.log("OTP API Response:", data); // Debugging log

//       if (response.ok) {
//         setIsOtpSent(true);
//         Alert.alert("OTP Sent", `An OTP has been sent to ${phoneNumber}`);
//       } else {
//         Alert.alert("Error", data.message || "Failed to send OTP.");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       Alert.alert("Error", "Something went wrong. Please try again.");
//     }
//   };

//   // const handleVerifyOtp = () => {
//   //   if (!otp) {
//   //     Alert.alert("Error", "Please enter the OTP.");
//   //     return;
//   //   }
//   //   Alert.alert("Success", "OTP Verified!");
//   //   router.push("/(tabs)/tabhome");
//   // };

//   // Handle OTP Verification
//   const handleVerifyOtp = async () => {
//     if (!otp) {
//       Alert.alert("Error", "Please enter the OTP.");
//       return;
//     }

//     try {
//       const response = await fetch("https://your-backend.com/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phoneNumber, otp }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert("Success", "OTP Verified!");
//         router.push("/(tabs)/tabhome");
//       } else {
//         Alert.alert("Error", data.message || "Invalid OTP. Try again.");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Something went wrong. Please try again.");
//     }
//   };

//   // Handle Google Login
//   const handleGoogleLogin = async () => {
//     try {
//       const result = await promptAsync();
//       if (result.type === "success") {
//         const { authentication } = result;
//         await SecureStore.setItemAsync(
//           "google_token",
//           authentication?.accessToken || ""
//         );
//         Alert.alert("Success", "Google login successful!");
//         router.push("/(tabs)/tabhome");
//       }
//     } catch (error) {
//       Alert.alert("Error", "Google login failed. Please try again.");
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <View style={styles.loginContainer}>
//         <Text style={styles.title}>Login</Text>

//         {isUsingPhone ? (
//           <>
//             <TextInput
//               placeholder="Phone Number"
//               placeholderTextColor="#aaa"
//               value={phoneNumber}
//               onChangeText={setPhoneNumber}
//               keyboardType="phone-pad"
//               style={styles.input}
//             />
//             {isOtpSent ? (
//               <>
//                 <TextInput
//                   placeholder="Enter OTP"
//                   placeholderTextColor="#aaa"
//                   value={otp}
//                   onChangeText={setOtp}
//                   keyboardType="numeric"
//                   style={styles.input}
//                 />
//                 <TouchableOpacity
//                   style={styles.button}
//                   onPress={handleVerifyOtp}
//                 >
//                   <Text style={styles.buttonText}>Verify OTP</Text>
//                 </TouchableOpacity>
//               </>
//             ) : (
//               <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
//                 <Text style={styles.buttonText}>Send OTP</Text>
//               </TouchableOpacity>
//             )}
//           </>
//         ) : (
//           <>
//             <TextInput
//               placeholder="Email"
//               placeholderTextColor="#aaa"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//               style={styles.input}
//             />
//             <TextInput
//               placeholder="Password"
//               placeholderTextColor="#aaa"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//               style={styles.input}
//             />
//             <TouchableOpacity style={styles.button} onPress={handleLogin}>
//               <Text style={styles.buttonText}>Login</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.gmailButton}
//               onPress={handleGoogleLogin}
//             >
//               <Ionicons
//                 name="logo-google"
//                 size={24}
//                 color="#fff"
//                 style={styles.icon}
//               />
//               <Text style={styles.buttonText}>Login with Google</Text>
//             </TouchableOpacity>
//           </>
//         )}

//         <TouchableOpacity
//           style={styles.toggleButton}
//           onPress={() => setIsUsingPhone(!isUsingPhone)}
//         >
//           <Text style={styles.linkText}>
//             {isUsingPhone
//               ? "Use Email & Password Instead"
//               : "Use Phone Number & OTP Instead"}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default UserLogin;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//     justifyContent: "center",
//   },
//   loginContainer: {
//     paddingHorizontal: 20,
//     alignItems: "center",
//   },
//   gmailButton: {
//     flexDirection: "row",
//     backgroundColor: "#db4437",
//     borderRadius: 10,
//     paddingVertical: 12,
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//     elevation: 5,
//     marginTop: 10,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   title: {
//     color: "#fff",
//     fontSize: 32,
//     fontWeight: "bold",
//     marginBottom: 30,
//     textTransform: "uppercase",
//   },
//   input: {
//     backgroundColor: "#222",
//     color: "#fff",
//     borderRadius: 10,
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     fontSize: 16,
//     width: "100%",
//   },
//   button: {
//     backgroundColor: "#6200ea",
//     borderRadius: 10,
//     paddingVertical: 12,
//     width: "100%",
//     alignItems: "center",
//     elevation: 5,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   toggleButton: {
//     marginTop: 15,
//   },
//   linkText: {
//     color: "#6200ea",
//     fontWeight: "bold",
//   },
// });
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Google from "expo-auth-session/providers/google";
import * as SecureStore from "expo-secure-store";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UserLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isUsingPhone, setIsUsingPhone] = useState(false);

  const { userlogin } = useContext(AuthContext); // Using AuthContext

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      Platform.OS === "ios"
        ? "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com"
        : "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
  });

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      // Use the login function from AuthContext (userType = 'user')
      await userlogin(email, password, "user");

      Alert.alert("Success", "Login successful!");
      router.push("/(tabs)/tabhome");
    } catch (error) {
      Alert.alert("Error", "Invalid credentials or something went wrong.");
    }
  };

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      Alert.alert("Error", "Please enter a valid phone number.");
      return;
    }

    try {
      // Backend API call to send OTP (this part is still custom, not in AuthContext)
      const response = await fetch("https://your-backend.com/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsOtpSent(true);
        Alert.alert("OTP Sent", `An OTP has been sent to ${phoneNumber}`);
      } else {
        Alert.alert("Error", data.message || "Failed to send OTP.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP.");
      return;
    }

    try {
      // Use `login` from AuthContext for OTP-based login
      await login(phoneNumber, otp, "user", true); // isOtpLogin = true

      Alert.alert("Success", "OTP Verified!");
      router.push("/(tabs)/tabhome");
    } catch (error) {
      Alert.alert("Error", "Invalid OTP or something went wrong.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await promptAsync();
      if (result.type === "success") {
        const { authentication } = result;
        await SecureStore.setItemAsync(
          "google_token",
          authentication?.accessToken || ""
        );
        Alert.alert("Success", "Google login successful!");
        router.push("/(tabs)/tabhome");
      }
    } catch (error) {
      Alert.alert("Error", "Google login failed. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>

        {isUsingPhone ? (
          <>
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="#aaa"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              style={styles.input}
            />
            {isOtpSent ? (
              <>
                <TextInput
                  placeholder="Enter OTP"
                  placeholderTextColor="#aaa"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="numeric"
                  style={styles.input}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleVerifyOtp}
                >
                  <Text style={styles.buttonText}>Verify OTP</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
                <Text style={styles.buttonText}>Send OTP</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.gmailButton}
              onPress={handleGoogleLogin}
            >
              <Ionicons
                name="logo-google"
                size={24}
                color="#fff"
                style={styles.icon}
              />
              <Text style={styles.buttonText}>Login with Google</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setIsUsingPhone(!isUsingPhone)}
        >
          <Text style={styles.linkText}>
            {isUsingPhone
              ? "Use Email & Password Instead"
              : "Use Phone Number & OTP Instead"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  loginContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  gmailButton: {
    flexDirection: "row",
    backgroundColor: "#db4437",
    borderRadius: 10,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    width: "100%",
  },
  button: {
    backgroundColor: "#6200ea",
    borderRadius: 10,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    elevation: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleButton: {
    marginTop: 15,
  },
  linkText: {
    color: "#6200ea",
    fontWeight: "bold",
  },
});
