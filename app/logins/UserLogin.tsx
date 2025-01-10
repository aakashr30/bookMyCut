import React, { useState } from "react";
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
import { Ionicons } from "@expo/vector-icons"; // Use 'react-native-vector-icons' if not using Expo
import { Link, router } from "expo-router";

const UserLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    // Alert.alert("Success", `Welcome back, ${email}!`);
          router.push("/(tabs)/tabhome") // Navigate to the Home screen after login
    
  };

  const handleGmailLogin = () => {
    Alert.alert(
      "Login with Gmail",
      "Gmail login functionality will be implemented here."
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login</Text>

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

        <TouchableOpacity style={styles.gmailButton} onPress={handleGmailLogin}>
          <Ionicons
            name="logo-google"
            size={24}
            color="#fff"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Login with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Alert.alert("Forgot Password", "Password recovery process.")
          }
        >
          <Text style={styles.footerText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Alert.alert("Sign Up", "Redirect to registration screen.")
          }
        >
          <Text style={styles.footerText}>
            <TouchableOpacity onPress={() => router.push("/(tabs)/tabhome")}>
              <Text style={styles.footerText}>Home</Text>
            </TouchableOpacity>
          </Text>
        </TouchableOpacity>

        {/* Register Option */}
        <TouchableOpacity
          onPress={() =>
            router.push("/screens/users/Register") // Change this to the correct path
          }
        >
          <Text style={styles.footerText}>
            Don't have an account? <Text style={styles.linkText}>Register</Text>
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
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 10,
  },
  footerText: {
    color: "#bbb",
    marginTop: 20,
    fontSize: 14,
  },
  linkText: {
    color: "#6200ea",
    fontWeight: "bold",
  },
});
