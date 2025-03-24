import { router } from "expo-router";
import { useEffect } from "react";
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  ImageBackground,
} from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import FlashMessage, { showMessage } from "react-native-flash-message";

export default function OwnerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  // Hide the header when this screen is focused
  // Instead of this:
  // useEffect(() => {
  //   router.setParams({ headerShown: false });
  // }, []);
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
    console.log("handleLogin called");

    if (!email || !password) {
      console.log("Missing fields");
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    try {
      setIsLoading(true);
      console.log("Saving credentials to AsyncStorage");
      await AsyncStorage.setItem("shop_email", email);
      await AsyncStorage.setItem("shop_password", password);

      console.log("Calling login API...");
      await login(email, password);

      console.log("Showing success toast");
      showMessage({
        message: "Success!",
        description: "Login successful.",
        type: "success",
      });

      setTimeout(() => {
        console.log("Navigating to shopOwnerHome");
        router.push("/shopOwners/shopOwnerHome");
      }, 1000);
    } catch (error) {
      console.error("Login Error:", error);
      showMessage({
        message: "Error!",
        description: "Something went wrong.",
        type: "danger", // Correct type instead of "error"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* This hides the expo-router Stack header */}
      <Stack.Screen options={{ headerShown: false }} />
      <FlashMessage position="top" />;
      <LinearGradient
        colors={["#121212", "#000000", "#1a1a1a"]}
        style={styles.container}
      >
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidView}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.logoContainer}>
              <Image
                // source={require("../assets/shop-logo.png")} // Add your logo image
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.header}>Shop Owner Login</Text>
            <Text style={styles.subheader}>
              Welcome back! Please sign in to continue
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#ccc"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                selectionColor="#FFD700"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#ccc"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                selectionColor="#FFD700"
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#ccc"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.forgotPassword}
              // onPress={() => router.push("/shopOwners/forgotPassword")}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text style={styles.buttonText}>LOGIN</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() =>
                router.push("/screens/shopOwners/shopRegisterForm")
              }
            >
              <Text style={styles.registerButtonText}>CREATE NEW ACCOUNT</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    tintColor: "#FFD700", // Makes the logo golden to stand out on dark background
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textAlign: "center",
  },
  subheader: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 55,
    fontSize: 16,
    color: "#fff",
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#FFD700",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "rgba(255, 215, 0, 0.5)",
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#ccc",
    fontSize: 14,
  },
  registerButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.5)",
  },
  registerButtonText: {
    fontSize: 16,
    color: "#FFD700",
    fontWeight: "600",
    letterSpacing: 1,
  },
});
