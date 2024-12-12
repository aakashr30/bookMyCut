import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function UserSelection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to BookMyCuts</Text>
      <Text style={styles.subtitle}>Are you a User or a Shop Owner?</Text>

      <View style={styles.buttonContainer}>
        {/* User Button */}
        <TouchableOpacity
          style={[styles.button, styles.userButton]}
          onPress={() => router.push("/screens/users/UserLogin")}
        >
          <Text style={styles.buttonText}>User</Text>
        </TouchableOpacity>

        {/* Shop Owner Button */}
        <TouchableOpacity
          style={[styles.button, styles.shopOwnerButton]}
          onPress={() => router.push("/screens/shopOwners/LoginPage")}
        >
          <Text style={styles.buttonText}>Shop Owner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700", // Golden color
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    marginHorizontal: 10,
  },
  userButton: {
    backgroundColor: "#FFD700", // Golden color for User button
  },
  shopOwnerButton: {
    backgroundColor: "#FFF", // White color for Shop Owner button
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000", // Black color for text
  },
});
