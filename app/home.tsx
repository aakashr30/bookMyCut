import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { HelloWave } from "@/components/HelloWave";

const Index = () => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial fade value

  // Fade in animation when the component mounts
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
        <Text style={styles.title}>
          {" "}
          BookMyCuts <HelloWave />
        </Text>
        <Text style={styles.subtitle}>Enjoy the best Booking Experience</Text>

        {/* "Get Started" button at the bottom-right */}
        <TouchableOpacity
          onPress={() => router.push("screens/UserSelection")}
          style={styles.getStartedButton}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
          <FontAwesome5 name="arrow-right" size={20} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center content vertically
    padding: 20,
    position: "relative",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end", // Align text to the right
  },
  title: {
    fontSize: 30,
    color: "white", // White text color
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "white", // White text color
    marginBottom: 20,
  },
  getStartedButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#333", // dark background for the button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    flexDirection: "row", // Positioning the text and icon next to each other
    alignItems: "center",
  },
  getStartedText: {
    color: "white", // White text for the button
    fontSize: 16,
    marginRight: 10, // Space between text and icon
    fontWeight: "bold",
  },
});

export default Index;
