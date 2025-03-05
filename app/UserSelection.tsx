import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { FontAwesome5 } from "@expo/vector-icons"; // Import FontAwesome icons
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook for navigation
import { router } from "expo-router";

export default function UserSelection() {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial fade value
  const navigation = useNavigation<any>(); // Initialize navigation with any type

  // Fade-in animation when the component mounts
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Animate to full opacity
      duration: 1500, // Duration of animation
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [fadeAnim]);

  return (
    <LinearGradient
      colors={["#000000", "#333333"]} // Black gradient effect
      style={styles.container}
    >
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Welcome to BookMyCuts</Text>
        <Text style={styles.subtitle}>Are you a User or a Shop Owner?</Text>

        <View style={styles.buttonContainer}>
          {/* User Button with Icon */}
          <TouchableOpacity
            style={[styles.button, styles.userButton]}
            // onPress={() => navigation.navigate("UserLogin")} // Navigate to UserLogin
            onPress={() => router.push("/logins/UserLogin")}
          >
            <FontAwesome5 name="user" size={24} color="white" />
            <Text style={styles.buttonText}>User</Text>
          </TouchableOpacity>

          {/* Shop Owner Button with Icon */}
          {/* Shop Owner Button */}
          <TouchableOpacity
            style={[styles.button, styles.shopOwnerButton]}
            onPress={() => router.push("/logins/LoginPage")} // Navigate to TabLayout
          >
            <FontAwesome5 name="store" size={24} color="white" />
            <Text style={styles.buttonText}>Shop Owner</Text>
          </TouchableOpacity>

          {/* Home Button with Icon */}
          {/*         <TouchableOpacity
          style={[styles.button, styles.homeButton]}
            // onPress={() => navigation.navigate("Home")} // Navigate to Home
            onPress={() => router.push("/(tabs)/tabhome")}
        >
          <FontAwesome5 name="home" size={24} color="white" />
            <Text style={styles.buttonText}>Home          </Text>
        </TouchableOpacity> */}
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center content vertically
    alignItems: "center",
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff", // White color
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#FFF",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flexDirection: "row", // Position the icon and text horizontally
    alignItems: "center", // Center content vertically inside the button
    justifyContent: "center", // Center content horizontally inside the button (optional)
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 50,
    width: 300, // Adjust the width of the button
    shadowColor: "#000", // Shadow effect
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },

  userButton: {
    backgroundColor: "#1a1a1a", // Dark black for user button
  },
  shopOwnerButton: {
    backgroundColor: "#2d2d2d", // Slightly lighter black for shop owner button
  },
  homeButton: {
    backgroundColor: "#3e3e3e", // Even lighter black for home button
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff", // White color for button text
    marginLeft: 10, // Space between icon and text
  },
});
